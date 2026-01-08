import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import type { Post } from '../api/dto/posting.dto';
import { postingService } from '../services/posting.service';

interface PostingContextType {
    posts: Post[];
    loading: boolean;
    error: string | null;
    fetchPosts: () => Promise<void>;
    getPostById: (id: string) => Promise<Post | null>;
}

const PostingContext = createContext<PostingContextType | undefined>(undefined);

export const PostingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [hasFetched, setHasFetched] = useState(false);

    // Load from sessionStorage on mount
    useEffect(() => {
        const cached = sessionStorage.getItem('posts_cache');
        if (cached) {
            try {
                const cachedPosts = JSON.parse(cached);
                console.log('[POSTING] Loaded', cachedPosts.length, 'posts from cache');
                setPosts(cachedPosts);
                setHasFetched(true);
            } catch (e) {
                console.error('[POSTING] Failed to parse cached posts:', e);
            }
        }
    }, []);

    const fetchPosts = useCallback(async () => {
        // Skip if already fetched in this session
        if (hasFetched && posts.length > 0) {
            console.log('[POSTING] Using cached posts, skipping fetch');
            return;
        }

        console.log('[POSTING] Starting fetchPosts');
        setLoading(true);
        setError(null);

        try {
            console.log('[POSTING] Calling postingService.getAllPostings()');
            const data = await postingService.getAllPostings(1, 100);
            console.log('[POSTING] ✅ Posts received:', {
                count: data.length,
                posts: data.map(p => ({ id: p.id, title: p.title, folder_id: p.folder_id }))
            });
            setPosts(data);
            setHasFetched(true);

            // Save to sessionStorage
            sessionStorage.setItem('posts_cache', JSON.stringify(data));
            console.log('[POSTING] Saved posts to session cache');
        } catch (err) {
            console.error('[POSTING] ❌ Error fetching posts:', err);
            setError('Failed to fetch posts');
        } finally {
            setLoading(false);
            console.log('[POSTING] fetchPosts completed');
        }
    }, [hasFetched, posts.length]);

    const getPostById = useCallback(async (id: string): Promise<Post | null> => {
        try {
            return await postingService.getPostingById(id);
        } catch (err) {
            console.error(`Error fetching post ${id}:`, err);
            return null;
        }
    }, []);

    return (
        <PostingContext.Provider value={{
            posts,
            loading,
            error,
            fetchPosts,
            getPostById
        }}>
            {children}
        </PostingContext.Provider>
    );
};

export const usePosting = () => {
    const context = useContext(PostingContext);
    if (context === undefined) {
        throw new Error('usePosting must be used within a PostingProvider');
    }
    return context;
};
