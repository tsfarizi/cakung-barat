import React, { useEffect, useState, useCallback } from 'react';
import PostCard from '../components/PostCard';
import PostDetailModal from '../components/PostDetailModal';
import { usePageHeader } from '../contexts/PageHeaderContext';
import { apiService } from '../api';
import type { Post } from '../api/dto/posting.dto';

const Home: React.FC = () => {
  const { setHeader } = usePageHeader();
  const [isLoaded, setIsLoaded] = useState(false);

  // State untuk modal dan detail postingan
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setHeader(
      'Selamat Datang di Kelurahan Cakung Barat',
      'Kelurahan Cakung Barat adalah bagian dari Kecamatan Cakung, Kota Jakarta Timur. Kami berkomitmen untuk memberikan pelayanan terbaik kepada masyarakat.'
    );

    // Trigger the animation after a short delay to ensure everything is rendered
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, [setHeader]);

  // State to store posts
  const [allPosts, setAllPosts] = useState<Post[]>([]);
  const [latestPosts, setLatestPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch posts from API
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const fetchedPosts = await apiService.getAllPostings();
        setAllPosts(fetchedPosts);
        
        // Sort by date (newest first) and take the latest 3
        const sortedPosts = [...fetchedPosts]
          .sort((a, b) => {
            // If created_at exists, use that; otherwise, use date
            const dateA = a.created_at ? new Date(a.created_at) : a.date ? new Date(a.date) : new Date(0);
            const dateB = b.created_at ? new Date(b.created_at) : b.date ? new Date(b.date) : new Date(0);
            return dateB.getTime() - dateA.getTime(); // Descending order (newest first)
          })
          .slice(0, 3);
        
        setLatestPosts(sortedPosts);
        setError(null);
      } catch (err) {
        console.error('Error fetching posts:', err);
        setError('Gagal memuat postingan terbaru. Silakan coba lagi nanti.');
        setLatestPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Fungsi untuk menangani klik pada postingan di home
  const handlePostClick = (id: string) => {
    setSelectedPostId(id);
    setIsModalOpen(true);
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

  // Function to convert API post to the format expected by PostCard
  const convertApiPostToCardPost = (apiPost: Post) => {
    // If img is an array of UUIDs, create a placeholder URL or use the first image
    const img = apiPost.img && apiPost.img.length > 0 
      ? `https://via.placeholder.com/400x200?text=Image+${apiPost.img[0]}` 
      : 'https://via.placeholder.com/400x200?text=No+Image';
    
    // Ensure date is a string
    const date = apiPost.date || formatDate(apiPost.created_at) || 'Tanggal tidak tersedia';
    
    return {
      ...apiPost,
      img,
      date
    };
  };

  // Function to format date
  const formatDate = (dateString: string | null | undefined) => {
    if (!dateString) return '';
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  // Get the selected post for modal
  const selectedPost = selectedPostId ? allPosts.find(post => post.id === selectedPostId) : null;
  const selectedPostForModal = selectedPost ? convertApiPostToCardPost(selectedPost) : null;

  return (
    <>
      <section className="py-16 px-5 bg-linear-to-br from-blue-50 to-indigo-50">
        <div className="w-9/10 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start bg-white rounded-2xl p-10 shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 transform hover:-translate-y-1">
            <div className="text-center lg:text-left">
              <div className="inline-block bg-blue-100 text-blue-800 text-sm font-semibold px-4 py-1 rounded-full mb-4">
                Sejak 1972
              </div>
              <h2 className="text-3xl font-bold mb-6 text-gray-800">Tentang Kelurahan Cakung Barat</h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                Kelurahan Cakung Barat merupakan salah satu kelurahan di Kecamatan Cakung,
                Kota Administrasi Jakarta Timur. Wilayah kami dikenal dengan masyarakatnya
                yang gotong royong dan kompak dalam membangun lingkungan yang harmonis dan sejahtera.
                Dengan luas wilayah sekitar 5,2 km², Cakung Barat memiliki potensi yang besar dalam
                pengembangan berbagai aspek kehidupan masyarakat.
              </p>
            </div>
            <div className="text-center lg:text-left">
              <div className="bg-linear-to-r from-blue-500 to-indigo-600 text-white rounded-xl p-6 mb-6 shadow-lg">
                <h3 className="font-bold text-lg mb-2">Komitmen Kami</h3>
                <p className="text-blue-100">
                  Kami berkomitmen untuk terus memberikan pelayanan terbaik kepada masyarakat,
                  memfasilitasi berbagai kebutuhan administrasi, serta menjaga keamanan dan ketertiban
                  di wilayah kami. Melalui inovasi dan teknologi, kami berusaha mempermudah akses
                  pelayanan publik bagi seluruh warga Cakung Barat.
                </p>
              </div>
              <a
                href="/#/profil"
                className="flex items-center justify-center lg:justify-start bg-linear-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:-translate-y-0.5"
              >
                <span className="text-lg">Lihat Profill Lengkap</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 ml-2 transition-transform duration-300 group-hover:translate-x-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-5 bg-linear-to-b from-white to-blue-50">
        <div className="w-9/10 max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Postingan Terbaru</h2>
            <div className="w-24 h-1 bg-linear-to-r from-blue-500 to-indigo-600 mx-auto rounded-full"></div>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              Temukan informasi terkini seputar kegiatan, pengumuman, dan berita dari Kelurahan Cakung Barat
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
            {loading ? (
              <div className="col-span-full text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-4 text-gray-600">Memuat postingan terbaru...</p>
              </div>
            ) : error ? (
              <div className="col-span-full text-center py-12">
                <h3 className="text-lg font-medium text-gray-900">Terjadi Kesalahan</h3>
                <p className="text-gray-500 mt-2">{error}</p>
              </div>
            ) : latestPosts.length > 0 ? (
              latestPosts.map((post, index) => (
                <div
                  key={post.id}
                  className="transform transition-all duration-700 hover:-translate-y-3"
                  style={{
                    opacity: isLoaded ? 1 : 0,
                    transform: isLoaded ? 'translateX(0)' : 'translateX(-20px)',
                    transitionDelay: `${index * 100}ms`,
                    transitionProperty: 'opacity, transform',
                    transitionDuration: '700ms',
                    transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                >
                  <PostCard post={convertApiPostToCardPost(post)} onPostClick={handlePostClick} />
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <h3 className="text-lg font-medium text-gray-900">Belum ada postingan terbaru</h3>
                <p className="text-gray-500 mt-2">Postingan terbaru akan muncul di sini ketika tersedia</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="py-20 px-5 bg-linear-to-b from-blue-50 to-white">
        <div className="w-9/10 max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Peta Wilayah & Kontak</h2>
            <div className="w-24 h-1 bg-linear-to-r from-blue-500 to-indigo-600 mx-auto rounded-full"></div>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              Temukan lokasi kami dan hubungi kami melalui berbagai channel komunikasi
            </p>
          </div>
          <div
            className="grid md:grid-cols-2 gap-8"
            style={{
              opacity: isLoaded ? 1 : 0,
              transform: isLoaded ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 700ms ease, transform 700ms ease',
              transitionDelay: '300ms'
            }}
          >
            <div className="map-container rounded-xl overflow-hidden shadow-lg border border-gray-200 flex flex-col">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.797430931874!2d106.92478797499161!3d-6.161291660410169!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e698b0efb30b5e5%3A0xb0fdfd00bcdce22!2sKelurahan%20Cakung%20Barat!5e0!3m2!1sid!2sid!4v1730200000000!5m2!1sid!2sid"
                width="100%"
                height="100%"
                className="border-0 min-h-[400px] md:min-h-[550px]"
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade">
              </iframe>
            </div>
            <div className="contact-info bg-white rounded-xl p-8 shadow-lg border border-gray-200">
              <div className="mb-6">
                <div className="font-bold text-xl mb-3 text-gray-800">Alamat Kantor</div>
                <div className="text-gray-600">
                  Jl Tipar Cakung Pool PPD Depo C RT.02/07<br />
                  Kelurahan Cakung Barat, Kecamatan Cakung<br />
                  Kota Administrasi Jakarta Timur 13910
                </div>
              </div>

              <div className="border-t border-gray-200 my-4"></div>

              <div className="mb-6">
                <div className="font-bold text-xl mb-3 text-gray-800">Jam Operasional</div>
                <div>
                  <div className="flex justify-between py-1 text-gray-700">
                    <span>Senin – Kamis</span>
                    <span>07.30 – 16.00 WIB</span>
                  </div>
                  <div className="flex justify-between py-1 text-gray-700">
                    <span>Jum'at</span>
                    <span>07.30 – 16.30 WIB</span>
                  </div>
                  <div className="py-1 text-gray-500">Jam Istirahat: 12.00 – 13.00 WIB</div>
                  <div className="flex justify-between py-1 text-gray-700">
                    <span>Sabtu – Minggu</span>
                    <span className="text-red-500">Tutup</span>
                  </div>
                </div>
                <div className="mt-4 p-3 rounded-lg bg-linear-to-r from-blue-50 to-indigo-50 border border-blue-200">
                  <div className="text-sm text-gray-700">
                    <span className="font-medium">Status Saat Ini: </span>
                    <span id="current-status" className={new Date().getHours() >= 7 && new Date().getHours() < 17 && [1,2,3,4,5].includes(new Date().getDay()) && !(new Date().getHours() >= 12 && new Date().getHours() < 13) ? 'text-green-600 font-semibold' : 'text-red-600 font-semibold'}>
                      {new Date().getHours() >= 7 && new Date().getHours() < 17 && [1,2,3,4,5].includes(new Date().getDay()) && !(new Date().getHours() >= 12 && new Date().getHours() < 13) ? 'Buka' : 'Tutup'}
                    </span>
                    <span className="ml-2">| Waktu Saat Ini: </span>
                    <span className="font-mono">{new Date().toLocaleTimeString('id-ID', { timeZone: 'Asia/Jakarta' })}</span>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 my-4"></div>

              <div className="mb-6">
                <div className="font-bold text-xl mb-3 text-gray-800">Alamat Email</div>
                <div className="text-blue-600 font-medium">cakungbarat.64@gmail.com</div>
              </div>

              <div className="border-t border-gray-200 my-4"></div>

              <div>
                <div className="font-bold text-xl mb-4 text-gray-800">Ikuti Kami</div>
                <div className="flex flex-wrap gap-4">
                  <a href="https://www.instagram.com/kelurahan_cakungbarat?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="transform transition-transform duration-300 hover:scale-110">
                    <div className="w-12 h-12 rounded-full bg-linear-to-r from-purple-500 to-pink-500 flex items-center justify-center shadow-md">
                      <i className="fab fa-instagram text-white text-xl"></i>
                    </div>
                  </a>
                  <a href="https://wa.me/6285710897490" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="transform transition-transform duration-300 hover:scale-110">
                    <div className="w-12 h-12 rounded-full bg-linear-to-r from-green-500 to-green-600 flex items-center justify-center shadow-md">
                      <i className="fab fa-whatsapp text-white text-xl"></i>
                    </div>
                  </a>
                  <a href="https://l.instagram.com/?u=https%3A%2F%2Fwww.youtube.com%2F%40kelurahancakungbarat7738%3Ffbclid%3DPAZXh0bgNhZW0CMTEAc3J0YwZhcHBfaWQMMjU2MjgxMDQwNTU4AAGnG-GCpqzlV_POALuJoHZtRdICVKI1__dqzJcQ3VWodahJl0uwt_8l6VO4CYo_aem_UQycjqOD4_P0fsPX76Sb6Q&e=AT0RKrb0tWnJ9PCpuV11dV1gkpXp6_1KEBmmO0joB-bbVbMoSgn48R7zKpe6UebF7SAfeN8Xxwne29HDqy_cFxVmzyerICNEahE0NESx-g" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="transform transition-transform duration-300 hover:scale-110">
                    <div className="w-12 h-12 rounded-full bg-linear-to-r from-red-600 to-red-700 flex items-center justify-center shadow-md">
                      <i className="fab fa-youtube text-white text-xl"></i>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 bg-linear-to-r from-blue-500 to-indigo-600 rounded-xl p-6 text-white">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-3xl font-bold">5.2 km²</div>
                <div className="text-blue-100">Luas Wilayah</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">7 RW</div>
                <div className="text-blue-100">Jumlah Rukun Warga</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">4.200+</div>
                <div className="text-blue-100">Jumlah Penduduk</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modal Detail Postingan */}
      {selectedPostForModal && isModalOpen && (
        <PostDetailModal
          post={selectedPostForModal}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
};

export default Home;