import React from 'react';
import { motion } from 'framer-motion';

const ServiceTooltip: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8, y: 10 }}
      className="absolute bottom-20 right-0 bg-white rounded-xl shadow-2xl p-3 w-[220px] sm:w-[260px] sm:p-4 sm:rounded-2xl"
      style={{
        background: 'linear-gradient(135deg, #ffffff, #f8fafc)',
        border: '1px solid rgba(59, 130, 246, 0.2)',
        boxShadow: '0 10px 40px rgba(59, 130, 246, 0.15)'
      }}
    >
      <div className="text-xs sm:text-sm font-bold text-gray-800 mb-2 sm:mb-3 flex items-center gap-2">
        <span className="text-base sm:text-lg">📄</span> Ajukan Surat Online
      </div>
      <div className="space-y-1.5 sm:space-y-2">
        {/* SKTM */}
        <div className="flex items-center gap-2 p-1.5 sm:p-2 bg-blue-50 rounded-lg">
          <span className="px-1.5 sm:px-2 py-0.5 bg-blue-500 text-white rounded text-[9px] sm:text-[10px] font-bold shrink-0">
            SKTM
          </span>
          <p className="text-[10px] sm:text-[11px] text-gray-600 leading-tight">
            Surat Keterangan Tidak Mampu
          </p>
        </div>
        {/* KPR */}
        <div className="flex items-center gap-2 p-1.5 sm:p-2 bg-green-50 rounded-lg">
          <span className="px-1.5 sm:px-2 py-0.5 bg-green-500 text-white rounded text-[9px] sm:text-[10px] font-bold shrink-0">
            KPR
          </span>
          <p className="text-[10px] sm:text-[11px] text-gray-600 leading-tight">
            Surat Pengantar RT
          </p>
        </div>
        {/* NIB/NPWP */}
        <div className="flex items-center gap-2 p-1.5 sm:p-2 bg-purple-50 rounded-lg">
          <span className="px-1.5 sm:px-2 py-0.5 bg-purple-500 text-white rounded text-[9px] sm:text-[10px] font-bold shrink-0">
            NIB
          </span>
          <p className="text-[10px] sm:text-[11px] text-gray-600 leading-tight">
            Surat NIB/NPWP Usaha
          </p>
        </div>
      </div>
      <p className="text-[9px] sm:text-[10px] text-gray-400 mt-2 sm:mt-3 text-center italic">
        Klik untuk mulai mengajukan
      </p>
      {/* Arrow pointer */}
      <div
        className="absolute -bottom-2 right-5 sm:right-6 w-3 h-3 sm:w-4 sm:h-4 rotate-45"
        style={{
          background: '#f8fafc',
          borderRight: '1px solid rgba(59, 130, 246, 0.2)',
          borderBottom: '1px solid rgba(59, 130, 246, 0.2)'
        }}
      />
    </motion.div>
  );
};

export default ServiceTooltip;
