import React, { useState, useEffect } from 'react';
import { Compass, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-nature-900/90 backdrop-blur-md py-4 shadow-lg text-white'
          : 'bg-transparent py-6 text-white'
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-2 cursor-pointer">
          <Compass className="w-8 h-8 text-sand-400" />
          <span className="font-serif text-2xl font-bold tracking-wide">Travel App</span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 items-center font-sans font-medium">
          <a href="#home" className="hover:text-sand-400 transition-colors">Beranda</a>
          <a href="#destinations" className="hover:text-sand-400 transition-colors">Destinasi</a>
          <a href="#planner" className="hover:text-sand-400 transition-colors">AI Planner</a>
          <a href="#about" className="hover:text-sand-400 transition-colors">Tentang</a>
          <button className="px-6 py-2 bg-sand-500 text-nature-900 rounded-full font-bold hover:bg-sand-400 transition-all transform hover:scale-105">
            Mulai Sekarang
          </button>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden">
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-full left-0 w-full bg-nature-900 text-white shadow-xl py-6 px-6 flex flex-col gap-6"
          >
            <a href="#home" onClick={() => setIsMobileMenuOpen(false)}>Beranda</a>
            <a href="#destinations" onClick={() => setIsMobileMenuOpen(false)}>Destinasi</a>
            <a href="#planner" onClick={() => setIsMobileMenuOpen(false)}>AI Planner</a>
            <a href="#about" onClick={() => setIsMobileMenuOpen(false)}>Tentang</a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;