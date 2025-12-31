import React, { useEffect, useState } from 'react';
import { usePageHeader } from '../contexts/PageHeaderContext';
import { Button } from "@/components/ui/button";
import { ptspServices } from '@/lib/ptspServices';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import PelayananAccordion from '@/components/PelayananAccordion';

import jakevoIcon from '/JAKEVO.png';

const Pelayanan: React.FC = () => {
  const { setHeader } = usePageHeader();
  const [openService, setOpenService] = useState<number | null>(null);

  useEffect(() => {
    setHeader(
      'Pelayanan Online JAKEVO',
      'Urus berbagai keperluan administrasi secara online melalui platform JAKEVO.'
    );
  }, [setHeader]);

  const jakevoURL = "https://jakevo.jakarta.go.id";

  const toggleService = (id: number) => {
    setOpenService(openService === id ? null : id);
  };

  return (
    <section className="py-16 px-5 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-800">Layanan Unggulan di JAKEVO</h1>
          <p className="text-gray-600 mt-2">Semua layanan ini dapat diakses secara online melalui website resmi JAKEVO.</p>
          <p className="text-gray-700 mt-2 font-medium">Perhatian: Semua pengajuan surat kini sepenuhnya dilakukan melalui platform JAKEVO.</p>
          <p className="text-lg font-bold text-gray-800 mt-4">Kunjungi JAKEVO:</p>
          <Button asChild className="mt-4 px-8 py-4 text-lg bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300">
            <a
              href={jakevoURL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center"
            >
              <img src={jakevoIcon} alt="JAKEVO Icon" className="w-32 h-auto mr-2" />
            </a>
          </Button>
        </div>

        {/* Layanan PTSP - Accordion */}
        <div className="mt-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800">Layanan PTSP (Melalui JAKEVO)</h2>
            <p className="text-gray-600 mt-2">Klik pada layanan untuk melihat deskripsi lengkap.</p>
          </div>

          <div className="space-y-3">
            {ptspServices.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: index * 0.02 }}
                className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <button
                  onClick={() => toggleService(service.id)}
                  className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="shrink-0 bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
                      {service.id}
                    </div>
                    <span className="font-medium text-gray-800">{service.name}</span>
                  </div>
                  <motion.div
                    animate={{ rotate: openService === service.id ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {openService === service.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-4 pt-2 border-t border-gray-100">
                        <p className="text-gray-600 pl-12">{service.description}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Persyaratan Layanan Section */}
        <div className="mt-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800">Persyaratan Layanan</h2>
            <p className="text-gray-600 mt-2">Pilih kategori layanan untuk melihat persyaratan yang dibutuhkan.</p>
          </div>
          <PelayananAccordion />
        </div>
      </div>
    </section>
  );
};

export default Pelayanan;
