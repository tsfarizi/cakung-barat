import React, { useEffect, useState } from 'react';
import { usePageHeader } from '../contexts/PageHeaderContext';

interface GalleryItem {
  img: string;
  title: string;
  desc: string;
}

interface ApiAsset {
  url: string;
  name: string;
  description: string;
}

const Galeri: React.FC = () => {
  const { setHeader } = usePageHeader();
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const API_BASE_URL = 'https://cakung-barat-server-1065513777845.asia-southeast1.run.app';
  const driveURL = "https://drive.google.com/drive/folders/1M_knB8yRSrRHlhDW3HSxuV8aYTjZGL47?usp=drive_link";

  useEffect(() => {
    setHeader(
      'Galeri Kegiatan',
      'Dokumentasi visual dari berbagai kegiatan dan acara yang diselenggarakan di lingkungan Kelurahan Cakung Barat.'
    );
  }, [setHeader]);

  useEffect(() => {
    const fetchGalleryFromAPI = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/postings`, {
          method: 'GET',
          headers: {
            'Accept': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        if (data && data.assets && data.assets.length > 0) {
          const apiItems: GalleryItem[] = data.assets.map((item: ApiAsset) => ({
            img: item.url || 'https://via.placeholder.com/400x300',
            title: item.name || 'Tanpa Judul',
            desc: item.description || 'Tidak ada deskripsi'
          }));
          setGalleryItems(prevItems => [...prevItems, ...apiItems]);
        }
      } catch (error) {
        console.error('Error fetching gallery:', error);
      }
    };

    const galleryData = JSON.parse(localStorage.getItem('galleryData') || '[]');
    if (galleryData.length > 0) {
      setGalleryItems(galleryData);
    }

    fetchGalleryFromAPI();
  }, []);

  return (
    <section className="py-16 px-5 bg-light flex justify-center">
      <div className="w-full max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          <div 
            className="bg-white rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:-translate-y-2 cursor-pointer"
            onClick={() => window.open(driveURL, '_blank')}
          >
            <div 
              className="w-full h-52 bg-cover bg-center"
              style={{ backgroundImage: `url('https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80')` }}
            />
            <div className="p-5 text-center">
              <h3 className="text-lg text-primary mb-2">Kerja Bakti RW 05</h3>
              <p className="text-sm text-gray-600">Warga RW 05 membersihkan lingkungan dan menjaga kebersihan area publik.</p>
            </div>
          </div>

          <div 
            className="bg-white rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:-translate-y-2 cursor-pointer"
            onClick={() => window.open(driveURL, '_blank')}
          >
            <div 
              className="w-full h-52 bg-cover bg-center"
              style={{ backgroundImage: `url('https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80')` }}
            />
            <div className="p-5 text-center">
              <h3 className="text-lg text-primary mb-2">Vaksinasi Massal</h3>
              <p className="text-sm text-gray-600">Program kesehatan masyarakat untuk meningkatkan imun warga.</p>
            </div>
          </div>

          <div 
            className="bg-white rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:-translate-y-2 cursor-pointer"
            onClick={() => window.open(driveURL, '_blank')}
          >
            <div 
              className="w-full h-52 bg-cover bg-center"
              style={{ backgroundImage: `url('https://images.unsplash.com/photo-1593115057322-e94b77572f20?auto=format&fit=crop&w=800&q=80')` }}
            />
            <div className="p-5 text-center">
              <h3 className="text-lg text-primary mb-2">Peringatan HUT RI</h3>
              <p className="text-sm text-gray-600">Acara lomba dan upacara memperingati Hari Kemerdekaan Indonesia.</p>
            </div>
          </div>
          {galleryItems.map((item, index) => (
            <div 
              className="bg-white rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:-translate-y-2 cursor-pointer"
              key={index}
              onClick={() => window.open(driveURL, '_blank')}
            >
              <div 
                className="w-full h-52 bg-cover bg-center"
                style={{ backgroundImage: `url('${item.img}')` }}
              />
              <div className="p-5 text-center">
                <h3 className="text-lg text-primary mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Galeri;
