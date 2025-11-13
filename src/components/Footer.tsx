import React from 'react';
import { motion } from 'framer-motion';

const Footer: React.FC = () => {
  return (
    <motion.footer 
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="bg-[#1e5a7d] text-white py-10 px-5 mt-auto text-left rounded-t-3xl"
    >
      <div className="w-9/10 max-w-none mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 align-items-start">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h4 className="mb-2.5 text-xl font-bold">Kelurahan Cakung Barat</h4>
          <p className="text-white mb-0 text-sm">Jl Tipar Cakung Pool PPD Depo C RT.02/07<br />Kecamatan Cakung, Jakarta Timur 13910</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h4 className="mb-2.5 text-xl font-bold">Tautan Terkait</h4>
          <ul className="list-none p-0 m-0">
            <li className="mb-2">
              <motion.a
                href="https://jakarta.go.id"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white no-underline transition-colors duration-250 hover:text-[#ffbe33]"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Portal DKI Jakarta
              </motion.a>
            </li>
            <li className="mb-2">
              <motion.a
                href="https://timur.jakarta.go.id/kecamatan/Cakung"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white no-underline transition-colors duration-250 hover:text-[#ffbe33]"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Kecamatan Cakung
              </motion.a>
            </li>
          </ul>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <h4 className="mb-2.5 text-xl font-bold">Hubungi Kami</h4>
          <p className="text-white mb-0 text-sm">Email: cakungbarat.64@gmail.com<br />Telp: (021) 4601748</p>
        </motion.div>
      </div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="text-center text-base mt-5 text-white font-medium"
      >
        © 2025 Kelurahan Cakung Barat
      </motion.p>
    </motion.footer>
  );
};

export default Footer;
