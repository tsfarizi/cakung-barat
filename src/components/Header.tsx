import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion';

// Type definition for NodeJS.Timeout to resolve TypeScript error
declare global {
  namespace NodeJS {
    interface Timeout {
      ref(): void;
      unref(): void;
    }
  }
}

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);

  // Import logo image
  const logoImg = '/cakung-barat/logo.png';

  // Handle scroll effect for trailing animation
  useEffect(() => {
    let timeoutId: number | null = null;

    const handleScroll = () => {
      setIsScrolling(true);
      
      // Clear the timeout if it exists
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      // Set a new timeout to remove the scrolling class after 300ms delay (for trailing effect)
      timeoutId = window.setTimeout(() => {
        setIsScrolling(false);
      }, 300);
    };

    window.addEventListener('scroll', handleScroll);

    // Cleanup the event listener
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (timeoutId) {
        window.clearTimeout(timeoutId);
      }
    };
  }, []);

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`bg-[#054569] text-white py-2.5 sticky top-0 z-50 shadow-lg rounded-full w-4/5 max-w-6xl mx-auto transition-all duration-500 border-2 border-white ${isScrolling ? 'opacity-90 -translate-y-1' : 'opacity-100'}`}
    >
      <div className="w-full mx-auto flex items-center justify-between px-4">
        <motion.div 
          className="flex items-center gap-2.5"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <img 
            src={logoImg} 
            alt="Logo" 
            className="w-10 h-auto" 
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24"><rect width="24" height="24" fill="%231E90FF"/><text x="12" y="16" font-family="Arial" font-size="14" fill="white" text-anchor="middle">CB</text></svg>';
            }} 
          />
          <span className="font-bold text-lg text-white">Cakung Barat</span>
        </motion.div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex">
          <ul className="list-none flex gap-6 items-center">
            <motion.li 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <NavLink to="/" end className={({ isActive }) => `transition-colors duration-300 ${isActive ? 'underline' : 'hover:text-accent'}`}>Beranda</NavLink>
            </motion.li>
            <motion.li 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <NavLink to="/profil" className={({ isActive }) => `transition-colors duration-300 ${isActive ? 'underline' : 'hover:text-accent'}`}>Profil</NavLink>
            </motion.li>
            <motion.li 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <NavLink to="/pelayanan" className={({ isActive }) => `transition-colors duration-300 ${isActive ? 'underline' : 'hover:text-accent'}`}>Pelayanan</NavLink>
            </motion.li>
            <motion.li 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <NavLink to="/postingan" className={({ isActive }) => `transition-colors duration-300 ${isActive ? 'underline' : 'hover:text-accent'}`}>Postingan</NavLink>
            </motion.li>
          </ul>
        </nav>

        {/* Hamburger Button */}
        <div className="md:hidden">
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white focus:outline-none">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}></path>
              </svg>
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute top-full left-0 w-full bg-[#054569] transition-all duration-300 ease-in-out overflow-hidden rounded-b-2xl ${
          isMenuOpen ? 'max-h-screen opacity-100 py-4' : 'max-h-0 opacity-0'
        }`}
      >
        <ul className="flex flex-col items-center gap-4">
          {isMenuOpen && (
            <>
              <motion.li 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <NavLink to="/" end onClick={() => setIsMenuOpen(false)} className={({ isActive }) => `transition-colors duration-300 ${isActive ? 'underline' : 'hover:text-accent'}`}>Beranda</NavLink>
              </motion.li>
              <motion.li 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <NavLink to="/profil" onClick={() => setIsMenuOpen(false)} className={({ isActive }) => `transition-colors duration-300 ${isActive ? 'underline' : 'hover:text-accent'}`}>Profil</NavLink>
              </motion.li>
              <motion.li 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.3 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <NavLink to="/pelayanan" onClick={() => setIsMenuOpen(false)} className={({ isActive }) => `transition-colors duration-300 ${isActive ? 'underline' : 'hover:text-accent'}`}>Pelayanan</NavLink>
              </motion.li>
              <motion.li 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.4 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <NavLink to="/postingan" onClick={() => setIsMenuOpen(false)} className={({ isActive }) => `transition-colors duration-300 ${isActive ? 'underline' : 'hover:text-accent'}`}>Postingan</NavLink>
              </motion.li>
            </>
          )}
        </ul>
      </div>
    </motion.header>
  );
};

export default Header;