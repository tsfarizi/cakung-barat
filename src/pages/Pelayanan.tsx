import React, { useEffect } from 'react';
import { usePageHeader } from '../contexts/PageHeaderContext';
import { Button } from "@/components/ui/button";

const Pelayanan: React.FC = () => {
  const { setHeader } = usePageHeader();

  useEffect(() => {
    setHeader(
      'Pelayanan Online JAKEVO',
      'Urus berbagai keperluan administrasi secara online melalui platform JAKEVO.'
    );
  }, [setHeader]);

  const jakevoURL = "https://jakevo.jakarta.go.id";

  return (
    <section className="py-16 px-5 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-800">Layanan Unggulan di JAKEVO</h1>
          <p className="text-gray-600 mt-2">Semua layanan ini dapat diakses secara online melalui website resmi JAKEVO.</p>
          <p className="text-gray-700 mt-2 font-medium">Perhatian: Semua pengajuan surat kini sepenuhnya dilakukan melalui platform JAKEVO.</p>
          <Button asChild className="mt-4">
            <a 
              href={jakevoURL} 
              target="_blank" 
              rel="noopener noreferrer"
            >
              Kunjungi JAKEVO
            </a>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Item 1: Surat Pengantar Nikah (Large) */}
          <div className="md:col-span-2 bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow">
            <h3 className="text-xl font-bold text-primary mb-2">Surat Pengantar Nikah (PM1)</h3>
            <p className="text-gray-600">Pengantar untuk mengurus pernikahan di Kantor Urusan Agama (KUA).</p>
          </div>

          {/* Item 2: SKTM */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow">
            <h3 className="text-xl font-bold text-primary mb-2">SKTM</h3>
            <p className="text-gray-600">Surat Keterangan Tidak Mampu untuk berbagai keperluan sosial.</p>
          </div>

          {/* Item 3: Domisili */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow">
            <h3 className="text-xl font-bold text-primary mb-2">Surat Domisili</h3>
            <p className="text-gray-600">Bukti sah alamat tempat tinggal untuk keperluan administrasi.</p>
          </div>

          {/* Item 4: Izin Praktik */}
          <div className="md:col-span-2 bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow">
            <h3 className="text-xl font-bold text-primary mb-2">Surat Izin Praktik</h3>
            <p className="text-gray-600">Izin untuk tenaga profesional seperti dokter, bidan, dan lainnya.</p>
          </div>
          
          {/* Item 5: Kartu Pencari Kerja */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow">
            <h3 className="text-xl font-bold text-primary mb-2">Kartu Pencari Kerja</h3>
            <p className="text-gray-600">Kartu kuning (AK/1) untuk melamar pekerjaan.</p>
          </div>

          {/* Item 6: Balik Nama PBB */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow">
            <h3 className="text-xl font-bold text-primary mb-2">Balik Nama PBB</h3>
            <p className="text-gray-600">Pengantar untuk proses balik nama Pajak Bumi dan Bangunan.</p>
          </div>

          {/* Item 7: Pengantar KPR */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow">
            <h3 className="text-xl font-bold text-primary mb-2">Pengantar KPR</h3>
            <p className="text-gray-600">Surat pengantar untuk pengajuan Kredit Pemilikan Rumah.</p>
          </div>

          {/* Item 8: Panduan */}
          <div className="md:col-span-3 bg-blue-100 p-6 rounded-lg border border-blue-200">
            <h3 className="text-xl font-bold text-blue-800 mb-2">Panduan Penggunaan JAKEVO</h3>
            <ol className="list-decimal list-inside text-blue-700 space-y-1">
              <li>Buka website jakevo.jakarta.go.id</li>
              <li>Buat akun jika belum memiliki.</li>
              <li>Pilih dashboard → klik PM-1 Lurah/Camat.</li>
              <li>Pilih jenis pelayanan yang diinginkan.</li>
              <li>Isi data dan upload berkas yang dibutuhkan.</li>
              <li>Submit formulir dan tunggu notifikasi selanjutnya.</li>
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pelayanan;
