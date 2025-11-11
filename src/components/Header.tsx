import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../assets/img/logo.png';
import { Button } from "@/components/ui/button";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-[#054569] text-white py-2.5 sticky top-0 z-50 shadow-lg">
      <div className="w-9/10 max-w-none mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <img src={logo} alt="Logo" className="w-10 h-auto" />
          <span className="font-bold text-lg text-white">Cakung Barat</span>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex">
          <ul className="list-none flex gap-6 items-center">
            <li><NavLink to="/" end className={({ isActive }) => `transition-colors duration-300 ${isActive ? 'underline' : 'hover:text-accent'}`}>Beranda</NavLink></li>
            <li><NavLink to="/profil" className={({ isActive }) => `transition-colors duration-300 ${isActive ? 'underline' : 'hover:text-accent'}`}>Profil</NavLink></li>
            <li><NavLink to="/pelayanan" className={({ isActive }) => `transition-colors duration-300 ${isActive ? 'underline' : 'hover:text-accent'}`}>Pelayanan</NavLink></li>
            <li><NavLink to="/postingan" className={({ isActive }) => `transition-colors duration-300 ${isActive ? 'underline' : 'hover:text-accent'}`}>Postingan</NavLink></li>
            <li><NavLink to="/galeri" className={({ isActive }) => `transition-colors duration-300 ${isActive ? 'underline' : 'hover:text-accent'}`}>Galeri</NavLink></li>
          </ul>
        </nav>

        {/* Hamburger Button */}
        <div className="md:hidden">
          <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}></path>
            </svg>
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute top-full left-0 w-full bg-[#054569] transition-all duration-300 ease-in-out overflow-hidden ${
          isMenuOpen ? 'max-h-screen opacity-100 py-4' : 'max-h-0 opacity-0'
        }`}
      >
        <ul className="flex flex-col items-center gap-4">
          <li><NavLink to="/" end onClick={() => setIsMenuOpen(false)} className={({ isActive }) => `transition-colors duration-300 ${isActive ? 'underline' : 'hover:text-accent'}`}>Beranda</NavLink></li>
          <li><NavLink to="/profil" onClick={() => setIsMenuOpen(false)} className={({ isActive }) => `transition-colors duration-300 ${isActive ? 'underline' : 'hover:text-accent'}`}>Profil</NavLink></li>
          <li><NavLink to="/pelayanan" onClick={() => setIsMenuOpen(false)} className={({ isActive }) => `transition-colors duration-300 ${isActive ? 'underline' : 'hover:text-accent'}`}>Pelayanan</NavLink></li>
          <li><NavLink to="/postingan" onClick={() => setIsMenuOpen(false)} className={({ isActive }) => `transition-colors duration-300 ${isActive ? 'underline' : 'hover:text-accent'}`}>Postingan</NavLink></li>
          <li><NavLink to="/galeri" onClick={() => setIsMenuOpen(false)} className={({ isActive }) => `transition-colors duration-300 ${isActive ? 'underline' : 'hover:text-accent'}`}>Galeri</NavLink></li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
