import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#1e5a7d] text-white py-10 px-5 mt-auto text-left">
      <div className="w-9/10 max-w-none mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 align-items-start">
        <div>
          <h4 className="mb-2.5 text-xl font-bold">Kelurahan Cakung Barat</h4>
          <p className="text-white mb-0 text-sm">Jl Tipar Cakung Pool PPD Depo C RT.02/07<br />Kecamatan Cakung, Jakarta Timur 13910</p>
        </div>
        <div>
          <h4 className="mb-2.5 text-xl font-bold">Tautan Terkait</h4>
          <ul className="list-none p-0 m-0">
            <li className="mb-2">
              <a href="https://jakarta.go.id" target="_blank" rel="noopener noreferrer" className="text-white no-underline transition-colors duration-250 hover:text-[#ffbe33]">Portal DKI Jakarta</a>
            </li>
            <li className="mb-2">
              <a href="https://timur.jakarta.go.id/kecamatan/Cakung" target="_blank" rel="noopener noreferrer" className="text-white no-underline transition-colors duration-250 hover:text-[#ffbe33]">Kecamatan Cakung</a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="mb-2.5 text-xl font-bold">Hubungi Kami</h4>
          <p className="text-white mb-0 text-sm">Email: cakungbarat.64@gmail.com<br />Telp: (021) 4601748</p>
        </div>
      </div>
      <p className="text-center text-base mt-5 text-white font-medium">© 2025 Kelurahan Cakung Barat</p>
    </footer>
  );
};

export default Footer;
