import React, { useEffect } from 'react';
import { usePageHeader } from '../contexts/PageHeaderContext';
import PostCard from '../components/PostCard';

const Postingan: React.FC = () => {
  const { setHeader } = usePageHeader();

  useEffect(() => {
    setHeader(
      'Postingan & Berita',
      'Ikuti berita terkini, pengumuman penting, dan kegiatan terbaru dari Kelurahan Cakung Barat.'
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
    <section className="py-16 px-5 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <PostCard key={index} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Postingan;
