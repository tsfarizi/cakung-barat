import React, { useEffect, useState, useCallback } from 'react';
import { usePageHeader } from '../contexts/PageHeaderContext';
import PostCard from '../components/PostCard';
import PostDetailModal from '../components/PostDetailModal';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Search, Filter, Calendar } from 'lucide-react';
import { getAllPosts } from '../data/posts';

const Postingan: React.FC = () => {
  const { setHeader } = usePageHeader();

  useEffect(() => {
    setHeader(
      'Postingan & Berita',
      'Ikuti berita terkini, pengumuman penting, dan kegiatan terbaru dari Kelurahan Cakung Barat.'
    );
  }, [setHeader]);

  const posts = getAllPosts();

  // State untuk search, sorting, filtering dan modal
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('newest');
  const [filterCategory, setFilterCategory] = useState('all');
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Dapatkan kategori unik untuk filtering
  const categories = ['all', ...new Set(posts.map(post => post.category))];

  // Fungsi untuk memformat tanggal
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  // Filter dan sortir postingan
  const filteredAndSortedPosts = posts
    .filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = filterCategory === 'all' || post.category === filterCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortOption === 'newest') {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      } else {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      }
    })
    .map(post => ({
      ...post,
      date: formatDate(post.date)
    }));

  // Fungsi untuk menangani klik pada postingan
  const handlePostClick = (id: string) => {
    setSelectedPostId(id);
    setIsModalOpen(true);
    // Update hash di URL dalam format yang diminta
    window.location.hash = `#/post${id}`;
  };

  // Fungsi untuk menutup modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPostId(null);
    // Hapus hash dari URL saat modal ditutup
    window.history.pushState(null, '', window.location.pathname);
  };

  // Fungsi untuk menangani perubahan hash URL
  const handleHashChange = useCallback(() => {
    const hash = window.location.hash.substring(1); // hapus karakter '#'
    if (hash.startsWith('/post')) {
      const postId = hash.replace('/post', '');
      if (postId) {
        setSelectedPostId(postId);
        setIsModalOpen(true);
      }
    }
  }, []);

  // Menangani perubahan hash URL
  useEffect(() => {
    // Tangani hash saat halaman pertama kali dimuat
    handleHashChange();

    // Tambahkan event listener untuk perubahan hash
    window.addEventListener('hashchange', handleHashChange);

    // Bersihkan event listener saat komponen di-unmount
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [handleHashChange]);

  // Dapatkan postingan yang dipilih berdasarkan ID
  const selectedPost = selectedPostId ? posts.find(post => post.id === selectedPostId) : null;

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredAndSortedPosts.length > 0 ? (
            filteredAndSortedPosts.map((post) => (
              <PostCard key={post.id} post={post} onPostClick={handlePostClick} />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <h3 className="text-lg font-medium text-gray-900">Postingan tidak ditemukan</h3>
              <p className="text-gray-500 mt-2">Coba kata kunci atau filter lainnya</p>
            </div>
          )}
        </div>

        {/* Modal Detail Postingan */}
        {selectedPost && isModalOpen && (
          <PostDetailModal 
            post={selectedPost} 
            isOpen={isModalOpen} 
            onClose={handleCloseModal} 
          />
        )}
      </div>
    </section>
  );
};

export default Postingan;