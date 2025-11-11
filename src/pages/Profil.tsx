import React, { useEffect } from 'react';
import StrukturOrganisasi from '../components/StrukturOrganisasi';
import { usePageHeader } from '../contexts/PageHeaderContext';

const Profil: React.FC = () => {
  const { setHeader } = usePageHeader();

  useEffect(() => {
    setHeader(
      'Profil Kelurahan Cakung Barat',
      'Mengenal lebih dekat Kelurahan Cakung Barat, dari Sejarah hingga Struktur Organisasi yang Melayani Masyarakat'
    );
  }, [setHeader]);

  return (
    <>
      <section className="py-10 px-5 bg-gray-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="relative text-2xl font-bold text-dark mb-6 pl-4 text-left border-l-4 border-accent">
            Sejarah
          </h2>
          <div className="bg-white rounded-lg p-6 shadow-md leading-7 text-justify text-gray-700">
            <p>
              Wilayah Cakung berada di Kota Administrasi Jakarta Timur dan memiliki peran penting dalam perkembangan wilayah Jakarta.
              Dahulu, Cakung Barat masih berupa lahan persawahan serta perkampungan dengan aktivitas utama pertanian.
              Seiring berjalannya waktu, wilayah ini berkembang menjadi kawasan padat penduduk dengan beragam fasilitas umum
              seperti sekolah, pasar, dan pusat pelayanan masyarakat.
            </p>
          </div>
        </div>
      </section>

      <section className="py-10 px-5 bg-gray-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="relative text-2xl font-bold text-dark mb-6 pl-4 text-left border-l-4 border-accent">
            Perubahan Wilayah Administratif
          </h2>
          <div className="bg-white rounded-lg p-6 shadow-md leading-7 text-justify text-gray-700">
            <p>
              Pada tahun 1981, terjadi perubahan batas wilayah di Provinsi DKI Jakarta yang menjadikan
              Kelurahan Cakung Barat sebagai salah satu wilayah administratif baru.
              Kelurahan ini berada di bawah Kecamatan Cakung, Jakarta Timur, dan terus mengalami perkembangan pesat
              dalam berbagai sektor pemerintahan dan pelayanan publik.
            </p>
          </div>
        </div>
      </section>

      <StrukturOrganisasi />
    </>
  );
};

export default Profil;
