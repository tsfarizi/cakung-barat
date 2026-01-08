import React, { useEffect, useState, useRef } from 'react';
import StrukturOrganisasi from '../components/StrukturOrganisasi';
import { usePageHeader } from '../contexts/PageHeaderContext';
import { motion } from 'framer-motion';

const Profil: React.FC = () => {
  const { setHeader } = usePageHeader();
  const [isVisible, setIsVisible] = useState({
    sejarah: false,
    perubahanWilayah: false,
    fakta: false,
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
      className="min-h-screen bg-linear-to-b from-gray-50 to-blue-50"
    >
      <div ref={sectionRef}>
        {/* Introduction Section */}
        <div className="py-16 px-5 bg-white">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <h2 className="text-3xl font-bold text-dark mb-4">Tentang Kelurahan Cakung Barat</h2>
              <div className="w-24 h-1 bg-accent mx-auto rounded-full mb-6"></div>
              <p className="text-lg text-gray-700 leading-relaxed">
                Kelurahan Cakung Barat merupakan salah satu kelurahan di Kecamatan Cakung,
                Kota Administrasi Jakarta Timur. Wilayah ini memiliki sejarah yang kaya
                serta perubahan administratif yang signifikan dalam perkembangan Jakarta Timur.
                Di sini kami menyajikan informasi menyeluruh tentang sejarah, struktur organisasi,
                dan berbagai fakta menarik seputar Kelurahan Cakung Barat.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Sejarah & Perubahan Wilayah Section */}
        <div className="py-16 px-5 bg-linear-to-b from-white to-blue-50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-3xl font-bold text-dark mb-4"
              >
                Sejarah & Perubahan Wilayah
              </motion.h2>
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: 96 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="h-1 bg-accent mx-auto rounded-full"
              ></motion.div>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="mt-6 text-gray-600 max-w-3xl mx-auto"
              >
                Mengenal perjalanan sejarah dan perubahan wilayah Kelurahan Cakung Barat dari masa ke masa
              </motion.p>
            </div>

            <div className="relative">
              {/* Vertical timeline */}
              <div className="hidden md:block absolute left-1/2 transform -translate-x-px h-full w-1 bg-linear-to-b from-accent to-primary"></div>

              {/* Timeline items */}
              <div className="space-y-12">
                {/* Sejarah */}
                <motion.div
                  className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <div className="order-1 md:order-1">
                    <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                      <h3 className="text-2xl font-bold text-primary mb-4 flex items-center">
                        <span className="mr-3 bg-primary text-white w-10 h-10 rounded-full flex items-center justify-center">1</span>
                        Sejarah Kelurahan Cakung Barat
                      </h3>
                      <p className="text-gray-700 leading-relaxed">
                        Wilayah Cakung berada di Kota Administrasi Jakarta Timur dan memiliki peran penting dalam perkembangan wilayah Jakarta. Dahulu, Cakung Barat masih berupa lahan persawahan serta perkampungan dengan aktivitas utama pertanian. Seiring berjalannya waktu, wilayah ini berkembang menjadi kawasan padat penduduk dengan beragam fasilitas umum seperti sekolah, pasar, dan pusat pelayanan masyarakat.
                      </p>
                    </div>
                  </div>

                  <div className="order-2 md:order-2 flex justify-center">
                    <div className="relative w-full max-w-sm">
                      <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-64 md:h-80 flex items-center justify-center text-gray-500">
                        Gambar Sejarah Cakung
                      </div>
                      <div className="absolute -bottom-4 -right-4 bg-primary text-white py-2 px-4 rounded-full font-bold shadow-lg">
                        1970-an
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Perubahan Wilayah */}
                <motion.div
                  className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <div className="order-2 md:order-1 flex justify-center">
                    <div className="relative w-full max-w-sm">
                      <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-64 md:h-80 flex items-center justify-center text-gray-500">
                        Gambar Perubahan Wilayah
                      </div>
                      <div className="absolute -top-4 -left-4 bg-primary text-white py-2 px-4 rounded-full font-bold shadow-lg">
                        1981
                      </div>
                    </div>
                  </div>

                  <div className="order-1 md:order-2">
                    <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                      <h3 className="text-2xl font-bold text-primary mb-4 flex items-center">
                        <span className="mr-3 bg-primary text-white w-10 h-10 rounded-full flex items-center justify-center">2</span>
                        Perubahan Wilayah Administratif
                      </h3>
                      <p className="text-gray-700 leading-relaxed">
                        Pada tahun 1981, terjadi perubahan batas wilayah di Provinsi DKI Jakarta yang menjadikan Kelurahan Cakung Barat sebagai salah satu wilayah administratif baru. Kelurahan ini berada di bawah Kecamatan Cakung, Jakarta Timur, dan terus mengalami perkembangan pesat dalam berbagai sektor pemerintahan dan pelayanan publik.
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>

        {/* Fakta Menarik Section */}
        <section
          id="fakta"
          className="py-20 px-5 bg-linear-to-br from-blue-50 to-indigo-50 profile-section"
        >
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
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
                  className="group"
                >
                  <div className="bg-white rounded-2xl p-8 shadow-lg text-center hover:shadow-2xl transition-all duration-300 border border-gray-100 h-full">
                    <div className="flex justify-center mb-4">
                      <div className="w-16 h-16 rounded-full bg-linear-to-r from-accent to-primary flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <span className="text-2xl font-bold text-white">{index + 1}</span>
                      </div>
                    </div>
                    <div className="text-4xl font-bold text-transparent mb-4 bg-linear-to-r from-accent to-primary bg-clip-text">{item.value}</div>
                    <h3 className="text-xl font-bold text-dark mb-3">{item.title}</h3>
                    <p className="text-gray-700">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* Struktur Organisasi Section */}
      <section id="strukturOrganisasi" className="py-20 px-5 bg-linear-to-br profile-section">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: isVisible.strukturOrganisasi ? 1 : 0, scale: isVisible.strukturOrganisasi ? 1 : 0.95 }}
            transition={{ duration: 0.6 }}
          >
          </motion.div>
          <StrukturOrganisasi />
        </div>
      </section>
    </motion.div>
  );
};

export default Profil;