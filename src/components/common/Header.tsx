import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { LuxuryButton } from '../ui/Button';
import { CONTACT_CONFIG } from '../../config/contacts';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Rooms', path: '/rooms' },
  { name: 'Banquet', path: '/banquet' },
  { name: 'Attractions', path: '/attractions' },
  { name: 'Gallery', path: '/gallery' },
  { name: 'Contact', path: '/contact' },
];

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={`fixed top-0 left-0 right-0 z-[100] transition-colors duration-500 ${
          isScrolled ? 'bg-navy/95 backdrop-blur-md shadow-luxury' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-22 flex items-center justify-between">
          <Link to="/" className="relative z-10 flex items-center h-full">
            <img 
              src="https://1zn1w7lqhv0bhjja.public.blob.vercel-storage.com/rooms/logo_tranparent.png" 
              alt="Hotel Serene Praia" 
              className="h-16 w-auto object-contain"
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`font-body text-body-sm uppercase tracking-widest transition-colors hover:text-gold ${
                  location.pathname === link.path ? 'text-gold' : 'text-pearl'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-4">
            <Link to="/contact" onClick={() => { setTimeout(() => { const el = document.getElementById('book'); if(el) el.scrollIntoView({ behavior: 'smooth' }); }, 100); }}>
              <LuxuryButton variant="primary" size="sm">Book Now</LuxuryButton>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden relative z-[110] w-10 h-10 flex flex-col justify-center items-center gap-1.5"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <span className={`block w-6 h-0.5 bg-gold transition-transform duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-6 h-0.5 bg-gold transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-6 h-0.5 bg-gold transition-transform duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] bg-navy flex flex-col justify-start items-center pt-32 pb-12 overflow-y-auto"
          >
            <nav className="flex flex-col items-center gap-8">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                >
                  <Link
                    to={link.path}
                    className="font-display text-display-sm text-pearl hover:text-gold transition-colors"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.1, duration: 0.5 }}
                className="mt-8 flex flex-col gap-4 w-64"
              >
                <Link to="/contact" className="w-full" onClick={() => { setIsMobileMenuOpen(false); setTimeout(() => { const el = document.getElementById('book'); if(el) el.scrollIntoView({ behavior: 'smooth' }); }, 100); }}>
                  <LuxuryButton variant="primary" className="w-full">Book Now</LuxuryButton>
                </Link>
                <a href={`tel:${CONTACT_CONFIG.phone.replace(/[^0-9+]/g, '')}`} className="w-full">
                  <LuxuryButton variant="outline" className="w-full">Call Us</LuxuryButton>
                </a>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
