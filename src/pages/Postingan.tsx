import React, { useEffect, useState, useCallback } from 'react';
import { usePageHeader } from '../contexts/PageHeaderContext';
import PostCard from '../components/PostCard';
import PostDetailModal from '../components/PostDetailModal';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Search, Filter, Calendar } from 'lucide-react';
import { usePosting } from '../contexts/PostingContext';
import { assetService } from '../services/asset.service';
import type { Post } from '../api/dto/posting.dto';

const Postingan: React.FC = () => {
  const { setHeader } = usePageHeader();
  const { posts, loading, error, fetchPosts } = usePosting();

  console.log('[POSTINGAN] Component state:', {
    postsCount: posts.length,
    loading,
    error,
    posts: posts.map(p => ({ id: p.id, title: p.title, folder_id: p.folder_id }))
  });

  useEffect(() => {
    console.log('[POSTINGAN] Header useEffect triggered');
    setHeader(
      'Postingan & Berita',
      'Ikuti berita terkini, pengumuman penting, dan kegiatan terbaru dari Kelurahan Cakung Barat.'
    );
  }, [setHeader]);


  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('newest');
  const [filterCategory, setFilterCategory] = useState('all');
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);


  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);


  const categories = ['all', ...new Set(posts.map(post => post.category))];


  const formatDate = (dateString: string | null | undefined) => {
    if (!dateString) return '';
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  const filteredAndSortedPosts = posts
    .filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = filterCategory === 'all' || post.category === filterCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortOption === 'newest') {
        const dateA = a.created_at ? new Date(a.created_at) : a.date ? new Date(a.date) : new Date(0);
        const dateB = b.created_at ? new Date(b.created_at) : b.date ? new Date(b.date) : new Date(0);
        return dateB.getTime() - dateA.getTime();
      } else {
        const dateA = a.created_at ? new Date(a.created_at) : a.date ? new Date(a.date) : new Date(0);
        const dateB = b.created_at ? new Date(b.created_at) : b.date ? new Date(b.date) : new Date(0);
        return dateA.getTime() - dateB.getTime();
      }
    })
    .map(post => ({
      ...post,
      date: formatDate(post.date)
    }));


  const handlePostClick = (id: string) => {
    setSelectedPostId(id);
    setIsModalOpen(true);
  };


  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPostId(null);

    window.history.pushState(null, '', window.location.pathname);
  };


  const handleHashChange = useCallback(() => {
    const hash = window.location.hash.substring(1);
    if (hash.startsWith('/post')) {
      const postId = hash.replace('/post', '');
      if (postId) {
        setSelectedPostId(postId);
        setIsModalOpen(true);
      }
    }
  }, []);


  useEffect(() => {
    handleHashChange();

    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [handleHashChange]);


  const selectedPost = selectedPostId ? posts.find(post => post.id === selectedPostId) : null;


  const [postImages, setPostImages] = useState<Record<string, string[]>>({});
  const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8080';

  useEffect(() => {
    // Fetch images for all posts
    const fetchImages = async () => {
      console.log('[POSTINGAN] 🖼️ Starting fetchImages');
      console.log('[POSTINGAN] API_BASE_URL:', API_BASE_URL);
      console.log('[POSTINGAN] Posts to process:', posts.length);
      const imageMap: Record<string, string[]> = {};

      for (const post of posts) {
        console.log('[POSTINGAN] ---Processing post---');
        console.log('[POSTINGAN] Post ID:', post.id);
        console.log('[POSTINGAN] Post Title:', post.title);
        console.log('[POSTINGAN] Folder ID:', post.folder_id);

        if (post.folder_id) {
          try {
            console.log('[POSTINGAN] Fetching assets from folder:', post.folder_id);
            const assets = await assetService.listFolder(post.folder_id);
            console.log('[POSTINGAN] ✅ Assets fetched successfully:', assets.length, 'assets');

            if (assets && assets.length > 0) {
              // Convert relative URLs to absolute URLs and store ALL images
              const fullUrls = assets.map(asset => {
                const fullUrl = `${API_BASE_URL}${asset.url}`;
                console.log('[POSTINGAN] Asset URL conversion:', {
                  original: asset.url,
                  full: fullUrl,
                  filename: asset.filename
                });
                return fullUrl;
              });

              imageMap[post.id] = fullUrls;
              console.log('[POSTINGAN] ✅ Stored', fullUrls.length, 'images for post', post.id);
            } else {
              console.warn('[POSTINGAN] ⚠️ No assets found for post', post.id);
            }
          } catch (error) {
            console.error('[POSTINGAN] ❌ Failed to fetch assets for post', post.id, ':', error);
          }
        } else {
          console.warn('[POSTINGAN] ⚠️ Post', post.id, 'has no folder_id');
        }
      }

      console.log('[POSTINGAN] 🎯 Final image map:', imageMap);
      console.log('[POSTINGAN] 🎯 Total posts with images:', Object.keys(imageMap).length);
      setPostImages(imageMap);
      console.log('[POSTINGAN] ✅ fetchImages completed');
    };

    if (posts.length > 0) {
      console.log('[POSTINGAN] Triggering fetchImages because posts changed');
      fetchImages();
    } else {
      console.log('[POSTINGAN] No posts to fetch images for');
    }
  }, [posts, API_BASE_URL]);

  const convertApiPostToCardPost = (apiPost: Post) => {
    // Use the first image from the post's images array, or placeholder
    const images = postImages[apiPost.id] || [];
    const hasNoFolder = !apiPost.folder_id;
    const isLoadingImage = Boolean(apiPost.folder_id && images.length === 0);
    const img = images[0] || (hasNoFolder ? 'https://placehold.co/400x200?text=No+Image' : 'https://placehold.co/400x200?text=Loading');

    console.log('[POSTINGAN] convertApiPostToCardPost:', {
      postId: apiPost.id,
      imagesAvailable: images.length,
      selectedImage: img,
      isLoadingImage,
      hasNoFolder
    });

    const date = apiPost.date || formatDate(apiPost.created_at) || 'Tanggal tidak tersedia';

    return {
      ...apiPost,
      img,
      images, // Pass all images for carousel
      date,
      isLoadingImage,
      hasNoFolder
    };
  };

  const selectedPostForModal = selectedPost ? convertApiPostToCardPost(selectedPost) : null;

  return (
    <section className="py-16 px-5 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        {/* Filter dan Search Section */}
        <div className="mb-12">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Search Bar */}
              <div className="flex flex-col space-y-2">
                <label htmlFor="search" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Search className="w-4 h-4" />
                  Cari Postingan
                </label>
                <Input
                  id="search"
                  placeholder="Cari judul atau isi postingan..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full"
                />
              </div>

              {/* Category Filter */}
              <div className="flex flex-col space-y-2">
                <label htmlFor="category" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Filter className="w-4 h-4" />
                  Filter Kategori
                </label>
                <Select
                  id="category"
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="w-full"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category === 'all' ? 'Semua Kategori' : category}
                    </option>
                  ))}
                </Select>
              </div>

              {/* Sorting */}
              <div className="flex flex-col space-y-2">
                <label htmlFor="sort" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Urutkan Berdasarkan
                </label>
                <Select
                  id="sort"
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className="w-full"
                >
                  <option value="newest">Terbaru</option>
                  <option value="oldest">Terlama</option>
                </Select>
              </div>
            </div>

            {/* Jumlah postingan yang ditemukan */}
            <div className="mt-4 text-sm text-gray-600">
              Ditemukan {filteredAndSortedPosts.length} postingan
            </div>
          </div>
        </div>

        {/* Posts Grid */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Memuat postingan...</p>
            </div>
          </div>
        ) : error ? (
          <div className="col-span-full text-center py-12">
            <h3 className="text-lg font-medium text-gray-900">Terjadi Kesalahan</h3>
            <p className="text-gray-500 mt-2">{error}</p>
          </div>
        ) : posts.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <h3 className="text-lg font-medium text-gray-900">Belum ada postingan</h3>
            <p className="text-gray-500 mt-2">Postingan akan muncul di sini ketika sudah tersedia</p>
          </div>
        ) : filteredAndSortedPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredAndSortedPosts.map((post) => (
              <PostCard
                key={post.id}
                post={convertApiPostToCardPost(post)}
                onPostClick={handlePostClick}
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="col-span-full text-center py-12">
              <h3 className="text-lg font-medium text-gray-900">Postingan tidak ditemukan</h3>
              <p className="text-gray-500 mt-2">Coba kata kunci atau filter lainnya</p>
            </div>
          </div>
        )}

        {/* Modal Detail Postingan */}
        {selectedPostForModal && isModalOpen && (
          <PostDetailModal
            post={selectedPostForModal}
            isOpen={isModalOpen}
            onClose={handleCloseModal}
          />
        )}
      </div>
    </section>
  );
};

export default Postingan;