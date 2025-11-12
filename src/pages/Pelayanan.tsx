import React, { useEffect } from 'react';
import { usePageHeader } from '../contexts/PageHeaderContext';
import { Button } from "@/components/ui/button";
import ServiceItem from '@/components/ServiceItem';
import { ptspServices } from '@/lib/ptspServices';

import PelayananAccordion from '@/components/PelayananAccordion';

import jakevoIcon from '/JAKEVO.png';

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

        {/* PTSP Services Section with Bento Box Layout */}
        <div className="mt-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800">Layanan PTSP (Melalui JAKEVO)</h2>
            <p className="text-gray-600 mt-2">Berikut adalah daftar layanan PTSP (Pelayanan Terpadu Satu Pintu) yang dapat diajukan melalui platform JAKEVO:</p>
          </div>

          <div className="space-y-6">
            {(() => {
              const rows = [];
              let currentIndex = 0;
              
              while (currentIndex < ptspServices.length) {
                // Determine how many items in this row (3, then 2, alternating)
                const isOddRow = Math.floor(currentIndex / 3) % 2 === 0; // First row (0) is odd for 3 items
                let itemsInRow = isOddRow ? 
                  Math.min(3, ptspServices.length - currentIndex) : 
                  Math.min(2, ptspServices.length - currentIndex);
                
                // If only 1 item is left, make it span the entire row
                if (ptspServices.length - currentIndex === 1) {
                  itemsInRow = 1;
                }
                
                // Create a row element
                let rowClass = '';
                if (itemsInRow === 3) {
                  rowClass = 'grid grid-cols-1 md:grid-cols-3 gap-6';
                } else if (itemsInRow === 2) {
                  rowClass = 'grid grid-cols-1 md:grid-cols-2 gap-6';
                } else { // itemsInRow === 1
                  rowClass = 'grid grid-cols-1 md:grid-cols-3 gap-6';
                }
                
                rows.push(
                  <div 
                    key={`row-${currentIndex}`} 
                    className={rowClass}
                  >
                    {ptspServices.slice(currentIndex, currentIndex + itemsInRow).map((service, serviceIndex) => {
                      const globalIndex = currentIndex + serviceIndex;
                      return (
                        <div key={service.id} className={itemsInRow === 1 ? 'md:col-span-3' : ''}>
                          <ServiceItem
                            number={service.id}
                            title={service.name}
                            description={service.description}
                            index={globalIndex}
                          />
                        </div>
                      );
                    })}
                  </div>
                );
                
                currentIndex += itemsInRow;
              }
              
              return rows;
            })()}
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
