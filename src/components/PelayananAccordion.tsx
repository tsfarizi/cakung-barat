import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';

const servicesData = [
  {
    category: 'PM-1 Administrasi PBB',
    services: [
      {
        name: 'Pecah PBB',
        requirements: [
          'KTP Pemohon Fotokopi Berwarna',
          'KK Pemohon Fotokopi Berwarna',
          'Surat Pengantar RT/RW',
          'Surat Pernyataan Penguasaan Fisik (Seporadik)',
          'KTP Para Saksi Fotokopi Berwarna',
          'AJB/Hibah/Waris/APHB/HGB/SHM (Asli / Fotokopi Berwarna)',
          'SPPT PBB Induk Terbaru Fotokopi Berwarna',
        ],
      },
      {
        name: 'Penunjuk Alamat yang Sama',
        requirements: [
          'KTP Pemohon Fotokopi Berwarna',
          'KK Pemohon Fotokopi Berwarna',
          'Surat Pengantar RT/RW',
          'Surat Pernyataan Perbedaan Alamat Form JAKEVO',
          'Surat Pernyataan Keabsahan Dokumen',
          'Dokumen yang Terdapat Perbedaan Alamat (Asli / Fotokopi Berwarna)',
          'SPPT PBB Induk Terbaru Fotokopi Berwarna',
          'Foto Objek Lokasi',
        ],
      },
      {
        name: 'Penunjuk Orang yang Sama',
        requirements: [
          'KTP Pemohon Fotokopi Berwarna',
          'KK Pemohon Fotokopi Berwarna',
          'Surat Pengantar RT/RW',
          'Surat Pernyataan Penguasaan Fisik (Seporadik)',
          'KTP Para Saksi Fotokopi Berwarna',
          'AJB/Hibah/Waris/APHB/HGB/SHM (Asli / Fotokopi Berwarna)',
          'SPPT PBB Induk Terbaru Fotokopi Berwarna',
        ],
      },
      {
        name: 'Pendaftaran Objek Pajak Baru',
        requirements: [
          'KTP Pemohon Fotokopi Berwarna',
          'KK Pemohon Fotokopi Berwarna',
          'Surat Pengantar RT/RW',
          'Surat Pernyataan Penguasaan Fisik (Seporadik)',
          'KTP Para Saksi Fotokopi Berwarna',
          'AJB/Hibah/Waris/APHB/HGB/SHM (Asli / Fotokopi Berwarna)',
          'SPPT PBB Tetangga Terbaru Fotokopi Berwarna',
        ],
      },
      {
        name: 'Perbaikan SPPT PBB',
        requirements: [
          'KTP Pemohon Fotokopi Berwarna',
          'KK Pemohon Fotokopi Berwarna',
          'Surat Pengantar RT/RW',
          'Surat Pernyataan Penguasaan Fisik (Seporadik)',
          'KTP Para Saksi Fotokopi Berwarna',
          'AJB/Hibah/Waris/APHB/HGB/SHM DAN PBB (Asli / Fotokopi Berwarna)',
          'Surat Pernyataan Umum Menyesuaikan Kebutuhan Form JAKEVO',
        ],
      },
      {
        name: 'Mutasi / Balik Nama PBB',
        requirements: [
          'KTP Pemohon Fotokopi Berwarna',
          'KK Pemohon Fotokopi Berwarna',
          'Surat Pengantar RT/RW',
          'Surat Pernyataan Penguasaan Fisik (Seporadik)',
          'KTP Para Saksi Fotokopi Berwarna',
          'AJB/Hibah/Waris/APHB/HGB/SHM DAN PBB (Asli / Fotokopi Berwarna)',
          'Surat Pernyataan Menyesuaikan Kebutuhan Form JAKEVO',
        ],
      },
    ],
  },
  {
    category: 'PM-1 Pelayanan Umum',
    services: [
      {
        name: 'Pengantar Pernikahan Pertama (N1)',
        requirements: [
          'KTP Pemohon Asli/Fotokopi Berwarna',
          'Surat Pengantar RT/RW',
          'Surat Pernyataan Belum Pernah Menikah',
          'Surat Kuasa Jika Diwakilkan',
          'KK Pemohon',
          'Akta Kelahiran Pemohon',
          'KTP dan KK Calon Istri / Suami',
          'KTP 2 Orang Saksi',
          'Sertifikat Laik Nikah dari Puskesmas Setempat',
          'KTP dan KK Orang Tua, Catatan (Jika sudah cerai lampirkan Surat Cerai jika sudah meninggal lampirkan Surat Kematian dari Rumah Sakit, Puskesmas dan Akta Kematian). Fotokopi Berwarna',
        ],
      },
      {
        name: 'Pengantar Pernikahan Kedua (N1)',
        requirements: [
          'KTP Pemohon Asli/Fotokopi Berwarna',
          'Surat Akta Cerai/Akta Kematian',
          'Surat Pengantar RT/RW',
          'Surat Pernyataan Belum Pernah Menikah',
          'Surat Kuasa Jika Diwakilkan',
          'KK Pemohon',
          'Akta Kelahiran Pemohon',
          'KTP dan KK Calon Istri / Suami',
          'KTP 2 Orang Saksi',
          'Sertifikat Laik Nikah dari Puskesmas Setempat',
          'KTP dan KK Orang Tua, Catatan (Jika sudah cerai lampirkan Surat Cerai jika sudah meninggal lampirkan Surat Kematian dari Rumah Sakit, Puskesmas dan Akta Kematian). Fotokopi Berwarna',
        ],
      },
      {
        name: 'Pengantar Perceraian',
        requirements: [
          'KTP Pemohon',
          'KK Pemohon',
          'Surat Pengantar RT/RW',
          'Surat Kuasa Jika Dikuasakan',
          'Berkas-berkas Pendukung Sesuai Kebutuhan',
          'Surat Pernyataan atau Kesepakatan Bercerai Dari Ke 2 Belah Pihak dan Disaksikan 2 Orang Saksi Serta Diketahui RT/RW',
          'Surat Pernyataan dari JAKEVO',
        ],
      },
      {
        name: 'Perceraian Goib',
        requirements: [
          'KTP Pemohon',
          'KK Pemohon',
          'Surat Pengantar RT/RW',
          'Surat Kuasa Jika Dikuasakan',
          'Berkas-berkas Pendukung Sesuai Kebutuhan',
          'Surat Keterangan Dari Kepolisian (POLRES)',
          'Surat Pernyataan Pemohon yang Menyatakan Bahwa Pasangan Suami Istri Tidak Diketahui Keberadaannya.',
        ],
      },
      {
        name: 'DOMISILI / BELUM PERNAH MENIKAH / PENGANTAR SURAT KETERANGAN KEMATIAN KE KANTOR PUSKES / PENGANTAR SURAT WALI / PENGANTAR SURAT BANTUAN KE KANTOR DMI',
        requirements: [
          'KTP Pemohon',
          'KK Pemohon',
          'Surat Pengantar RT/RW',
          'Surat Kuasa Jika Dikuasakan',
          'Berkas-berkas Pendukung Sesuai Kebutuhan',
          'Surat Pernyataan Menyesuaikan Kebutuhan Form JAKEVO',
        ],
      },
    ],
  },
  {
    category: 'PTSP (Izin Usaha)',
    services: [
      {
        name: 'Izin Usaha Mikro dan Kecil (UMK)',
        requirements: [
          'Fotokopi KTP Pemohon',
          'Pas Photo Pemohon 4x6 (2 lembar)',
          'Foto Usaha 3R',
          'Formulir dari UP PMPTSP Kelurahan',
        ],
      },
    ],
  },
  {
    category: 'PTSP (Perizinan Bangunan)',
    services: [
      {
        name: 'Izin Mendirikan Bangunan Relaksasi (IMB)',
        requirements: [
          'Fotokopi KTP Pemohon',
          'Fotokopi NPWP',
          'Fotokopi dan Asli SPPT PBB',
          'Fotokopi dan Asli Sertipikat Tanah',
        ],
      },
    ],
  },
  {
    category: 'PTSP (Izin Makam)',
    services: [
      {
        name: 'Izin Penggunaan Tanah Makam (Makam Baru)',
        requirements: [
          'Pengantar dari TPU',
          'Fotokopi KTP Ahli Waris',
          'Fotokopi KK Ahli Waris',
          'Fotokopi KTP Almarhum',
          'Fotokopi KK Almarhum',
          'Fotokopi Surat Kematian dari RS/Puskesmas',
          'Fotokopi Akte Kematian Almarhum',
        ],
      },
      {
        name: 'Izin Penggunaan Tanah Makam (Perpanjangan Makam)',
        requirements: [
          'Pengantar dari TPU',
          'Fotokopi KTP Ahli Waris',
          'Fotokopi KK Ahli Waris',
          'IPTM Asli sebelumnya/terdahulu',
        ],
      },
      {
        name: 'Izin Penggunaan Tanah Makam (Tumpangan Makam)',
        requirements: [
          'Pengantar dari TPU',
          'Fotokopi KTP Ahli Waris',
          'Fotokopi KK Ahli Waris',
          'Fotokopi KTP Almarhum',
          'Fotokopi KK Almarhum',
          'Fotokopi Surat Kematian dari RS/Puskesmas',
          'Fotokopi Akte Kematian Almarhum',
          'IPTM Asli sebelumnya/terdahulu',
        ],
      },
    ],
  },
  {
    category: 'Dukcapil',
    services: [
      {
        name: 'Perekaman KTP-el Baru (17 Tahun)',
        requirements: [
          'Mengisi dan menandatangani Formulir F-1.02',
          'Telah berusia 17 tahun',
          'Fotokopi Kartu Keluarga',
          'Fotokopi Akte Kelahiran',
          'Fotokopi Ijazah Terakhir',
        ],
      },
      {
        name: 'KTP-el Karena Pindah Datang',
        requirements: [
          'Mengisi dan menandatangani Formulir F-1.02, F-1.03',
          'Surat Keterangan Pindah dari Disdukcapil Daerah asal',
          'Fotokopi Kartu Keluarga',
        ],
      },
      {
        name: 'KTP-el Karena Adanya Perubahan Data/Biodata',
        requirements: [
          'Mengisi dan menandatangani Formulir F-1.02, F-1.06',
          'KTP-el lama.',
          'Fotokopi Kartu Keluarga',
        ],
      },
      {
        name: 'KTP-el Bagi Penduduk WNI di Luar Domisili',
        requirements: [
          'Tidak melakukan perubahan data penduduk.',
          'Fotokopi Kartu Keluarga',
        ],
      },
      {
        name: 'Kartu Identitas Anak (KIA) Baru',
        requirements: [
          'FC Kutipan Akta Kelahiran.',
          'Kartu Keluarga.',
          'Pas foto anak berwarna ukuran 2 x 3 sebanyak 2 (dua) lbr, bagi anak usia ≥ 5 tahun.',
        ],
      },
      {
        name: 'KIA karena Hilang atau Rusak',
        requirements: [
          'Surat Keterangan Kehilangan dari Kepolisian, bagi KIA yang hilang.',
          'KIA lama yang rusak, jika karena rusak.',
          'Kartu Keluarga.',
          'Pas foto anak berwarna ukuran 2x3 sebanyak 2 (dua) lbr, bagi anak berusia ≥ 5 tahun.',
        ],
      },
      {
        name: 'KIA karena Pindah Datang',
        requirements: [
          'KIA lama.',
          'Kartu Keluarga.',
          'Pas foto anak berwarna ukuran 2 x 3 sebanyak 2 (dua) lbr, bagi anak berusia ≥ 5 tahun.',
          'SKP/SKPD.',
        ],
      },
      {
        name: 'Pembuatan Kartu Keluarga (KK)',
        requirements: [
          'Fotokopi Surat Nikah Lengkap/Akte Cerai/KetKematian (Cek Status Kawin)',
          'Fotokopi Surat Keterangan Lahir (Jika ada penambahan)',
          'Fotokopi Ijazah Pendidikan Terakhir (Jika ada perubahan)',
        ],
      },
      {
        name: 'Surat Keterangan Pindah (SKP) (Dalam dan Luar Negeri)',
        requirements: [
          'Mengisi Formulir F-1.03',
          'Fotokopi KK dan KTP-el yang akan pindah (Berusia 17 Tahun keatas)',
          'Menginformasikan Alamat tujuan pindah lengkap (nama jalan, kelurahan, kecamatan, kab provinsi)',
        ],
      },
      {
        name: 'Pendatang Baru / Luar DKI (Pelayanan SKP)',
        requirements: [
          'Mengisi Formulir F-1.03',
          'Fotokopi KK dan KTP-el Penjamin',
          'Bagi Pemohon masih bersekolah/mahasiswa membuat surat keterangan dari sekolah/kampus',
          'Fotokopi surat nikah bagi yg sudah menikah',
          'Surat Cerai dari pengadilan bagi yg sudah bercerai',
        ],
      },
      {
        name: 'Pencatatan Kelahiran Anak Dibawah 17 Tahun',
        requirements: [
          'Surat keterangan lahir asli dari rumah sakit/puskesmas',
          'Fotokopi KTP dan KK asli',
          'Fotokopi KTP suami/istri',
          'Fotokopi buku nikah full 3 Hal',
          'Fotokopi KTP saksi 2 orang (diluar KK Pemohon, ber-ktp dki)',
          'Form Akta Lahir 2 Hal',
          'Surat kuasa apabila diwakilkan',
        ],
      },
      {
        name: 'Pencatatan Kelahiran Dewasa',
        requirements: [
          'Fotokopi KTP dan KK pemohon',
          'Fotokopi KTP saksi 2 orang',
          'SPTJM suami istri / FC buku nikah orang tua',
          'SPTJM Kelahiran',
        ],
      },
      {
        name: 'Akta Kematian',
        requirements: [
          'KTP dan KK asli almarhum',
          'Fotokopi KTP dan KK',
          'Surat keterangan kematian asli dari rumah sakit / puskesmas',
          'Fotokopi KTP saksi 2 orang',
          'Fc KTP dan KK pelapor (wajib ahli waris almarhum)',
          'Form Akta Kematian 2 Hal',
          'Surat kuasa dari ahli waris almarhum (jika diwakilkan orang lain)',
        ],
      },
    ],
  },
];

const AccordionItem: React.FC<{
  category: string;
  services: { name: string; requirements: string[] }[];
  isOpen: boolean;
  onClick: () => void;
}> = ({ category, services, isOpen, onClick }) => {
  const [openServiceIndex, setOpenServiceIndex] = useState<number | null>(null);

  const handleServiceClick = (index: number) => {
    setOpenServiceIndex(openServiceIndex === index ? null : index);
  };

  return (
    <Card className="mb-4 overflow-hidden">
      <div className="p-4 cursor-pointer bg-gray-100 hover:bg-gray-200" onClick={onClick}>
        <h3 className="text-lg font-semibold text-gray-800">{category}</h3>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <CardContent className="p-4">
              {services.map((service, serviceIndex) => (
                <div key={serviceIndex} className="mb-4 border border-gray-200 rounded-md overflow-hidden">
                  <div 
                    className="p-3 cursor-pointer bg-gray-50 hover:bg-gray-100"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleServiceClick(serviceIndex);
                    }}
                  >
                    <h4 className="font-bold text-md text-gray-700">{service.name}</h4>
                  </div>
                  <AnimatePresence>
                    {openServiceIndex === serviceIndex && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="p-3 bg-white"
                      >
                        <ul className="list-disc list-inside space-y-1 text-gray-600">
                          {service.requirements.map((req, reqIndex) => (
                            <li key={reqIndex}>{req}</li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </CardContent>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
};

const PelayananAccordion: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleClick = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-4xl mx-auto">
      {servicesData.map((item, index) => (
        <AccordionItem
          key={index}
          category={item.category}
          services={item.services}
          isOpen={openIndex === index}
          onClick={() => handleClick(index)}
        />
      ))}
    </div>
  );
};

export default PelayananAccordion;
