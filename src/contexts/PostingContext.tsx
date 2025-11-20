import React, { createContext, useContext, useState, useCallback } from 'react';
import type { Post, CreatePostingRequest, UpdatePostingRequest } from '../api/dto/posting.dto';
import { postingService } from '../services/posting.service';

interface PostingContextType {
    posts: Post[];
    loading: boolean;
    error: string | null;
    fetchPosts: () => Promise<void>;
    getPostById: (id: string) => Promise<Post | null>;
    createPost: (request: CreatePostingRequest) => Promise<Post | null>;
    updatePost: (id: string, request: UpdatePostingRequest) => Promise<Post | null>;
    deletePost: (id: string) => Promise<void>;
}

const PostingContext = createContext<PostingContextType | undefined>(undefined);

export const PostingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchPosts = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const fetchedPosts = await postingService.getAllPostings();
            setPosts(fetchedPosts);
        } catch (err) {
            console.error('Error fetching posts:', err);
            setError('Gagal memuat postingan. Silakan coba lagi nanti.');
        } finally {
            setLoading(false);
        }
    }, []);

    const getPostById = useCallback(async (id: string): Promise<Post | null> => {
        try {
            return await postingService.getPostingById(id);
        } catch (err) {
            console.error(`Error fetching post ${id}:`, err);
            return null;
        }
    }, []);

    const createPost = useCallback(async (request: CreatePostingRequest): Promise<Post | null> => {
        setLoading(true);
        try {
            const newPost = await postingService.createPosting(request);
            setPosts(prev => [newPost, ...prev]);
            return newPost;
        } catch (err) {
            console.error('Error creating post:', err);
            setError('Gagal membuat postingan.');
            return null;
        } finally {
            setLoading(false);
        }
    }, []);

    const updatePost = useCallback(async (id: string, request: UpdatePostingRequest): Promise<Post | null> => {
        setLoading(true);
        try {
            const updatedPost = await postingService.updatePosting(id, request);
            setPosts(prev => prev.map(post => post.id === id ? updatedPost : post));
            return updatedPost;
        } catch (err) {
            console.error(`Error updating post ${id}:`, err);
            setError('Gagal memperbarui postingan.');
            return null;
        } finally {
            setLoading(false);
        }
    }, []);

    const deletePost = useCallback(async (id: string): Promise<void> => {
        setLoading(true);
        try {
            await postingService.deletePosting(id);
            setPosts(prev => prev.filter(post => post.id !== id));
        } catch (err) {
            console.error(`Error deleting post ${id}:`, err);
            setError('Gagal menghapus postingan.');
        } finally {
            setLoading(false);
        }
    }, []);

    return (
        <PostingContext.Provider value={{
            posts,
            loading,
            error,
            fetchPosts,
            getPostById,
            createPost,
            updatePost,
            deletePost
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
