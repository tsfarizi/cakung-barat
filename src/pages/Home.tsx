import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PostCard from '../components/PostCard';
import { usePageHeader } from '../contexts/PageHeaderContext';

const Home: React.FC = () => {
  const { setHeader } = usePageHeader();

  useEffect(() => {
    setHeader(
      'Selamat Datang di Kelurahan Cakung Barat',
      'Kelurahan Cakung Barat adalah bagian dari Kecamatan Cakung, Kota Jakarta Timur. Kami berkomitmen untuk memberikan pelayanan terbaik kepada masyarakat.'
    );
  }, [setHeader]);

  const posts = [
    {
      img: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=60',
      category: 'Penghargaan',
      date: '10 Nov 2025',
      title: 'Kelurahan Cakung Barat Meraih Penghargaan Pelayanan Publik Terbaik 2024',
      excerpt: 'Atas komitmen dalam memberikan pelayanan prima, Kelurahan Cakung Barat dianugerahi penghargaan "Kelurahan Terbaik" oleh Pemerintah Provinsi DKI Jakarta.'
    },
    {
      img: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=60',
      category: 'Pengumuman',
      date: '05 Nov 2025',
      title: 'Layanan Administrasi Kependudukan Kini Sepenuhnya Online via JAKEVO',
      excerpt: 'Mulai 1 Februari 2025, semua pengajuan surat dan layanan administrasi dialihkan ke platform online JAKEVO untuk kemudahan dan kecepatan.'
    },
    {
      img: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=800&q=60',
      category: 'Kegiatan',
      date: '01 Nov 2025',
      title: 'Kerja Bakti Massal di Seluruh RW: Menjaga Kebersihan Lingkungan Bersama',
      excerpt: 'Partisipasi aktif warga dalam kerja bakti serentak pada 15 Februari 2025 sangat diharapkan untuk mewujudkan lingkungan yang bersih dan sehat.'
    }
  ];

  return (
    <>
      <section className="py-16 px-5 sm:px-10 bg-white text-center">
        <div className="w-9/10 max-w-none mx-auto">
          <h2 className="text-xl mb-2.5 pl-2.5 border-l-4 border-highlight">Informasi Umum</h2>
          <p>Kelurahan Cakung Barat memiliki luas wilayah sekitar 5,2 km² dan berbatasan dengan beberapa wilayah lain. Jumlah penduduknya terus berkembang, mencerminkan dinamika masyarakat.
            Kelurahan ini memiliki fasilitas umum seperti sekolah, puskesmas, dan pasar tradisional yang mendukung kehidupan sehari-hari warga.</p>
        </div>
      </section>

      <section className="py-16 px-5 text-center bg-white">
        <div className="w-9/10 max-w-none mx-auto">
          <h2 className="text-xl mb-2.5 pl-2.5 border-l-4 border-highlight">Postingan Terbaru</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-8">
            {posts.map((post, index) => (
              <PostCard key={index} post={post} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-5 text-center bg-white">
        <div className="w-9/10 max-w-none mx-auto">
          <h2 className="text-xl mb-8 pl-2.5 border-l-4 border-highlight">Peta Wilayah & Kontak</h2>
          <div className="grid md:grid-cols-2 gap-8 text-left">
            <div className="map-container">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.797430931874!2d106.92478797499161!3d-6.161291660410169!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e698b0efb30b5e5%3A0xb0fdfd00bcdce22!2sKelurahan%20Cakung%20Barat!5e0!3m2!1sid!2sid!4v1730200000000!5m2!1sid!2sid"
                width="100%"
                height="550"
                className="border-0 rounded-lg"
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade">
              </iframe>
            </div>
            <div className="contact-info">
              <div className="mb-6">
                <div className="font-bold text-xl mb-3">Alamat Kantor</div>
                <div>
                  Jl Tipar Cakung Pool PPD Depo C RT.02/07<br />
                  Kelurahan Cakung Barat, Kecamatan Cakung<br />
                  Kota Administrasi Jakarta Timur 13910
                </div>
              </div>

              <div className="border-t border-gray-200 my-4"></div>

              <div className="mb-6">
                <div className="font-bold text-xl mb-3">Jam Operasional</div>
                <div>
                  <div className="flex justify-between py-1">
                    <span>Senin – Kamis</span>
                    <span>07.30 – 16.00 WIB</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span>Jum'at</span>
                    <span>07.30 – 16.30 WIB</span>
                  </div>
                  <div className="py-1 text-gray-500">Jam Istirahat: 12.00 – 13.00 WIB</div>
                  <div className="flex justify-between py-1">
                    <span>Sabtu – Minggu</span>
                    <span className="text-red-500">Tutup</span>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 my-4"></div>

              <div className="mb-6">
                <div className="font-bold text-xl mb-3">Alamat Email</div>
                <div className="text-blue-600">cakungbarat.64@gmail.com</div>
              </div>

              <div className="border-t border-gray-200 my-4"></div>

              <div>
                <div className="font-bold text-xl mb-4">Ikuti Kami</div>
                <div className="flex flex-wrap gap-4">
                  <a href="https://www.instagram.com/kelurahan_cakungbarat?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                      <i className="fab fa-instagram text-white text-xl"></i>
                    </div>
                  </a>
                  <a href="https://wa.me/6285710897490" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                    <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                      <i className="fab fa-whatsapp text-white text-xl"></i>
                    </div>
                  </a>
                  <a href="https://l.instagram.com/?u=https%3A%2F%2Fwww.youtube.com%2F%40kelurahancakungbarat7738%3Ffbclid%3DPAZXh0bgNhZW0CMTEAc3J0YwZhcHBfaWQMMjU2MjgxMDQwNTU4AAGnG-GCpqzlV_POALuJoHZtRdICVKI1__dqzJcQ3VWodahJl0uwt_8l6VO4CYo_aem_UQycjqOD4_P0fsPX76Sb6Q&e=AT0RKrb0tWnJ9PCpuV11dV1gkpXp6_1KEBmmO0joB-bbVbMoSgn48R7zKpe6UebF7SAfeN8Xxwne29HDqy_cFxVmzyerICNEahE0NESx-g" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                    <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center">
                      <i className="fab fa-youtube text-white text-xl"></i>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
