import React, { useEffect, useState, useRef } from 'react';
import StrukturOrganisasi from '../components/StrukturOrganisasi';
import ProfileSection from '../components/ProfileSection';
import { usePageHeader } from '../contexts/PageHeaderContext';
import { motion } from 'framer-motion';

const Profil: React.FC = () => {
  const { setHeader } = usePageHeader();
  const [isVisible, setIsVisible] = useState({
    sejarah: false,
    perubahanWilayah: false,
    strukturOrganisasi: false
  });

  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setHeader(
      'Profil Kelurahan Cakung Barat',
      'Mengenal lebih dekat Kelurahan Cakung Barat, dari Sejarah hingga Struktur Organisasi yang Melayani Masyarakat'
    );
  }, [setHeader]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            setIsVisible(prev => ({ ...prev, [id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    const sections = sectionRef.current?.querySelectorAll('.profile-section');
    if (sections) {
      sections.forEach((section) => observer.observe(section));
    }

    return () => {
      if (sections) {
        sections.forEach((section) => observer.unobserve(section));
      }
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen"
    >
      <div ref={sectionRef}>
        {/* Sejarah & Perubahan Wilayah Section - Horizontal Layout for Desktop */}
        <div className="py-16 px-5 bg-gradient-to-br from-blue-50 to-indigo-50">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <ProfileSection
                title="Sejarah Kelurahan Cakung Barat"
                description="Wilayah Cakung berada di Kota Administrasi Jakarta Timur dan memiliki peran penting dalam perkembangan wilayah Jakarta. Dahulu, Cakung Barat masih berupa lahan persawahan serta perkampungan dengan aktivitas utama pertanian. Seiring berjalannya waktu, wilayah ini berkembang menjadi kawasan padat penduduk dengan beragam fasilitas umum seperti sekolah, pasar, dan pusat pelayanan masyarakat."
                color="accent"
                isVisible={isVisible.sejarah}
                index={0}
              />
              <ProfileSection
                title="Perubahan Wilayah Administratif"
                description="Pada tahun 1981, terjadi perubahan batas wilayah di Provinsi DKI Jakarta yang menjadikan Kelurahan Cakung Barat sebagai salah satu wilayah administratif baru. Kelurahan ini berada di bawah Kecamatan Cakung, Jakarta Timur, dan terus mengalami perkembangan pesat dalam berbagai sektor pemerintahan dan pelayanan publik."
                color="primary"
                isVisible={isVisible.perubahanWilayah}
                index={1}
              />
            </div>
          </div>
        </div>

        {/* Fakta Menarik Section */}
        <section className="py-16 px-5 bg-gradient-to-br from-gray-50 to-blue-50">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-dark mb-4">Fakta Menarik Kelurahan Cakung Barat</h2>
              <div className="w-24 h-1 bg-accent mx-auto rounded-full"></div>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { 
                  title: "Luas Wilayah", 
                  value: "5.2 km²", 
                  description: "Wilayah dengan potensi pertumbuhan yang pesat di Jakarta Timur"
                },
                { 
                  title: "Jumlah RW", 
                  value: "7 RW", 
                  description: "Terdiri dari 7 Rukun Warga yang aktif dalam pemerintahan"
                },
                { 
                  title: "Jumlah Penduduk", 
                  value: "4.200+", 
                  description: "Masyarakat yang kompak dan gotong royong dalam membangun lingkungan"
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="bg-white rounded-xl p-6 shadow-lg text-center hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                    <div className="text-4xl font-bold text-accent mb-2 bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">{item.value}</div>
                    <h3 className="text-xl font-bold text-dark mb-2">{item.title}</h3>
                    <p className="text-gray-700">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* Struktur Organisasi Section */}
      <section id="strukturOrganisasi" className="py-16 px-5 bg-gradient-to-br from-blue-100 to-indigo-100 profile-section">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: isVisible.strukturOrganisasi ? 1 : 0, scale: isVisible.strukturOrganisasi ? 1 : 0.95 }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-dark mb-4">Struktur Organisasi</h2>
              <div className="w-24 h-1 bg-accent mx-auto rounded-full"></div>
              <p className="mt-4 text-gray-700 max-w-2xl mx-auto">
                Organisasi Kelurahan Cakung Barat yang terdiri dari berbagai unsur pemerintahan 
                dan masyarakat dalam melayani kebutuhan warga.
              </p>
            </div>
          </motion.div>
          <StrukturOrganisasi />
        </div>
      </section>
    </motion.div>
  );
};

export default Profil;
