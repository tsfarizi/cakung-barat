export interface Post {
  id: string;
  img: string;
  category: string;
  date: string; // format: YYYY-MM-DD
  title: string;
  excerpt: string;
}

export const allPosts: Post[] = [
  {
    id: '1',
    img: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=60',
    category: 'Penghargaan',
    date: '2025-11-10',
    title: 'Kelurahan Cakung Barat Meraih Penghargaan Pelayanan Publik Terbaik 2024',
    excerpt: 'Atas komitmen dalam memberikan pelayanan prima, Kelurahan Cakung Barat dianugerahi penghargaan "Kelurahan Terbaik" oleh Pemerintah Provinsi DKI Jakarta.'
  },
  {
    id: '2',
    img: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=60',
    category: 'Pengumuman',
    date: '2025-11-05',
    title: 'Layanan Administrasi Kependudukan Kini Sepenuhnya Online via JAKEVO',
    excerpt: 'Mulai 1 Februari 2025, semua pengajuan surat dan layanan administrasi dialihkan ke platform online JAKEVO untuk kemudahan dan kecepatan.'
  },
  {
    id: '3',
    img: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=800&q=60',
    category: 'Kegiatan',
    date: '2025-11-01',
    title: 'Kerja Bakti Massal di Seluruh RW: Menjaga Kebersihan Lingkungan Bersama',
    excerpt: 'Partisipasi aktif warga dalam kerja bakti serentak pada 15 Februari 2025 sangat diharapkan untuk mewujudkan lingkungan yang bersih dan sehat.'
  },
  {
    id: '4',
    img: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=60',
    category: 'Pengumuman',
    date: '2025-10-25',
    title: 'Pembaruan Jadwal Pelayanan pada Libur Nasional',
    excerpt: 'Mohon perhatian warga bahwa selama periode libur nasional, jam pelayanan administrasi akan mengalami penyesuaian. Silakan cek informasi lengkap di website resmi.'
  },
  {
    id: '5',
    img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=60',
    category: 'Kegiatan',
    date: '2025-10-15',
    title: 'Sosialisasi Pengelolaan Sampah Terpadu di Lingkungan Warga',
    excerpt: 'Dinas Lingkungan Hidup akan menggelar sosialisasi pengelolaan sampah terpadu pada tanggal 20 Oktober 2025 di Balai RW 007. Partisipasi warga sangat diharapkan.'
  },
  {
    id: '6',
    img: 'https://images.unsplash.com/photo-1579546929662-711aa81148cf?auto=format&fit=crop&w=800&q=60',
    category: 'Penghargaan',
    date: '2025-09-20',
    title: 'Dukungan Penuh untuk Program Jakarta Bebas Banjir',
    excerpt: 'Kelurahan Cakung Barat dinyatakan sebagai salah satu wilayah dengan partisipasi terbaik dalam program Jakarta Bebas Banjir tahun 2025.'
  }
];

export const getLatestPosts = (count: number = 3): Post[] => {
  return [...allPosts]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, count);
};

export const getAllPosts = (): Post[] => {
  return [...allPosts]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};