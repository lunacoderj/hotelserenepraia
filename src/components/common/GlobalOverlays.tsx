import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, X, ArrowUp, Phone, MessageCircle, Calendar, Sparkles, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { CONTACT_CONFIG } from '../../config/contacts';

const OFFERS = [
  {
    id: 'deluxe-offer',
    label: 'Deluxe',
    tagline: 'Comfortable stay + kettle',
    actual: 2700,
    offer: 1999,
    image: 'https://1zn1w7lqhv0bhjja.public.blob.vercel-storage.com/hotel-serene/deluxe_room.jpg',
  },
  {
    id: 'premium-offer',
    label: 'Premium',
    tagline: 'Premium interiors + kettle',
    actual: 4500,
    offer: 2899,
    image: 'https://1zn1w7lqhv0bhjja.public.blob.vercel-storage.com/hotel-serene/IMG_3020.JPG-1200x900.webp',
  },
  {
    id: 'executive-offer',
    label: 'Executive',
    tagline: 'Executive stay + sea view',
    actual: 6500,
    offer: 4099,
    image: 'https://1zn1w7lqhv0bhjja.public.blob.vercel-storage.com/hotel-serene/poster.png',
  },
  {
    id: 'suite-offer',
    label: 'Suite',
    tagline: '2 rooms, living area + sea view',
    actual: 6500,
    offer: 4499,
    image: 'https://1zn1w7lqhv0bhjja.public.blob.vercel-storage.com/hotel-serene/beachview.webp',
  },
  {
    id: 'banquet-offer',
    label: 'Banquet',
    tagline: 'Celebrations & Events',
    actual: 30000,
    offer: 22999,
    image: 'https://1zn1w7lqhv0bhjja.public.blob.vercel-storage.com/hotel-serene/hero%20image.png',
  },
];

export const GlobalOverlays = () => {
  const [showOfferPopup, setShowOfferPopup] = useState(false);
  const [isOfferDismissed, setIsOfferDismissed] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState('deluxe-offer');
  const navigate = useNavigate();

  useEffect(() => {
    // Show offer popup after 1 minute (60000ms)
    const timer = setTimeout(() => {
      setShowOfferPopup(true);
    }, 60000);

    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (showOfferPopup) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showOfferPopup]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleClaimOffer = () => {
    setShowOfferPopup(false);
    setIsOfferDismissed(true);
    const baseId = selectedOffer.replace('-offer', '');
    navigate(`/claim-offer/${baseId}`);
  };

  const dismissOffer = () => {
    setShowOfferPopup(false);
    setIsOfferDismissed(true);
  };

  const reviveOffer = () => {
    setIsOfferDismissed(false);
    setShowOfferPopup(true);
  };

  const activeOffer = OFFERS.find(o => o.id === selectedOffer) || OFFERS[0];

  return (
    <>
      {/* 1. Persistent CTA Bar (Vertical on Right Side) */}
      <div 
        className={`fixed right-0 md:right-2 z-[70] flex flex-col gap-2 p-2 transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
          showOfferPopup 
            ? 'top-24 translate-y-0 scale-90 opacity-90'
            : 'top-1/2 -translate-y-1/2 scale-100 opacity-100'
        }`}
      >
        <a 
          href={`tel:${CONTACT_CONFIG.phone}`} 
          className="group flex flex-col items-center justify-center w-12 h-12 md:w-14 md:h-14 bg-navy hover:bg-navy-400 transition-colors rounded-xl shadow-lg border border-white/10 relative"
          aria-label="Call Us"
        >
          <Phone size={20} className="text-white" />
          <span className="absolute right-full mr-4 bg-navy text-white text-[10px] uppercase tracking-widest py-1.5 px-3 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl border border-white/10">
            Call
            <div className="absolute top-1/2 -right-1 -translate-y-1/2 border-y-4 border-y-transparent border-l-4 border-l-navy" />
          </span>
        </a>
        
        <a 
          href={`https://wa.me/${CONTACT_CONFIG.whatsapp.replace(/[^0-9]/g, '')}`}
          target="_blank"
          rel="noreferrer"
          className="group flex flex-col items-center justify-center w-12 h-12 md:w-14 md:h-14 bg-[#25D366] hover:bg-[#1ebd5a] transition-colors rounded-xl shadow-lg border border-white/10 relative"
          aria-label="WhatsApp"
        >
          <MessageCircle size={20} className="text-white" />
          <span className="absolute right-full mr-4 bg-[#25D366] text-white text-[10px] uppercase tracking-widest py-1.5 px-3 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl border border-white/10">
            WhatsApp
            <div className="absolute top-1/2 -right-1 -translate-y-1/2 border-y-4 border-y-transparent border-l-4 border-l-[#25D366]" />
          </span>
        </a>
        
        <a 
          href="/contact"
          onClick={(e) => {
            e.preventDefault();
            navigate('/contact');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="group flex flex-col items-center justify-center w-12 h-12 md:w-14 md:h-14 bg-gold hover:bg-gold-400 transition-colors rounded-xl shadow-lg border border-white/10 relative"
          aria-label="Book Now"
        >
          <Calendar size={20} className="text-white" />
          <span className="absolute right-full mr-4 bg-gold text-white text-[10px] uppercase tracking-widest py-1.5 px-3 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl border border-white/10">
            Book Now
            <div className="absolute top-1/2 -right-1 -translate-y-1/2 border-y-4 border-y-transparent border-l-4 border-l-gold" />
          </span>
        </a>
      </div>

      {/* 2. Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            onClick={scrollToTop}
            className="fixed bottom-20 md:bottom-6 right-4 md:right-6 z-50 w-12 h-12 bg-navy text-white rounded-full shadow-xl flex items-center justify-center hover:bg-navy-400 transition-colors border border-white/10"
            aria-label="Scroll to top"
          >
            <ArrowUp size={20} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* 3. Premium Full-Screen Offer Modal */}
      <AnimatePresence>
        {showOfferPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8"
          >
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={dismissOffer}
              className="absolute inset-0 bg-navy/80 backdrop-blur-md"
            />

            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, y: 60, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.95 }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              className="relative z-10 w-full max-w-lg bg-white rounded-2xl shadow-[0_40px_100px_rgba(0,0,0,0.4)] overflow-hidden max-h-[90vh] flex flex-col"
            >
              {/* Header with selected offer image preview */}
              <div className="relative h-36 md:h-44 overflow-hidden shrink-0">
                <AnimatePresence mode="wait">
                  <motion.img 
                    key={activeOffer.id}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    src={activeOffer.image} 
                    alt={activeOffer.label}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </AnimatePresence>
                <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/60 to-navy/20" />
                
                {/* Header Content */}
                <div className="absolute bottom-0 left-0 right-0 p-5 flex items-end justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Sparkles size={14} className="text-gold" />
                      <span className="font-body text-[9px] tracking-[0.3em] uppercase text-gold">Exclusive Offers</span>
                    </div>
                    <h3 className="font-display text-2xl md:text-3xl text-white leading-tight">Choose Your <span className="text-gold italic">Experience</span></h3>
                  </div>
                </div>

                {/* Close Button */}
                <button 
                  onClick={dismissOffer}
                  className="absolute top-4 right-4 w-8 h-8 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white/80 hover:text-white hover:bg-white/20 transition-all border border-white/10"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Offer Cards Grid */}
              <div className="p-4 md:p-5 overflow-y-scroll overscroll-contain flex-1 min-h-0 custom-scrollbar pr-2 md:pr-3">
                <div className="grid grid-cols-1 gap-2.5">
                  {OFFERS.map((offer, idx) => {
                    const discount = Math.round(((offer.actual - offer.offer) / offer.actual) * 100);
                    const isSelected = selectedOffer === offer.id;
                    
                    return (
                      <motion.button
                        key={offer.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.06, duration: 0.4 }}
                        onClick={() => setSelectedOffer(offer.id)}
                        className={`group relative w-full flex items-center gap-4 p-3 rounded-xl text-left transition-all duration-300 border-2 ${
                          isSelected 
                            ? 'border-gold bg-gold/5 shadow-lg shadow-gold/10' 
                            : 'border-transparent bg-pearl/60 hover:bg-pearl hover:border-navy/10'
                        }`}
                      >
                        {/* Room Thumbnail */}
                        <div className={`relative w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden shrink-0 transition-all duration-300 ${isSelected ? 'ring-2 ring-gold ring-offset-2' : ''}`}>
                          <img src={offer.image} alt={offer.label} className="w-full h-full object-cover" />
                          {isSelected && (
                            <motion.div 
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              className="absolute inset-0 bg-gold/20 flex items-center justify-center"
                            >
                              <div className="w-5 h-5 bg-gold rounded-full flex items-center justify-center">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                              </div>
                            </motion.div>
                          )}
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-0.5">
                            <span className={`font-display text-base md:text-lg leading-tight ${isSelected ? 'text-navy' : 'text-navy/80'}`}>
                              {offer.label} {offer.id === 'banquet-offer' ? 'Hall' : 'Room'}
                            </span>
                          </div>
                          <span className="text-[10px] uppercase tracking-widest text-navy/40 font-body">{offer.tagline}</span>
                          <div className="flex items-center gap-2 mt-1.5">
                            <span className={`font-display text-lg ${isSelected ? 'text-gold' : 'text-navy/70'}`}>₹{offer.offer.toLocaleString()}</span>
                            <span className="text-xs text-navy/30 line-through">₹{offer.actual.toLocaleString()}</span>
                          </div>
                        </div>

                        {/* Discount Badge */}
                        <div className={`shrink-0 px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider ${
                          isSelected ? 'bg-gold text-white' : 'bg-navy/5 text-navy/50'
                        }`}>
                          {discount}% off
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              {/* CTA Footer */}
              <div className="p-4 md:p-5 border-t border-navy/5 bg-pearl/30 shrink-0">
                <button 
                  onClick={handleClaimOffer}
                  className="w-full bg-navy hover:bg-navy-400 text-white font-bold uppercase tracking-widest text-xs py-4 rounded-xl transition-colors shadow-lg flex items-center justify-center gap-3 group"
                >
                  <Gift size={16} />
                  Claim {activeOffer.label} Offer
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
                <p className="text-center text-[9px] uppercase tracking-widest text-navy/30 mt-3 font-body">
                  Select any offer above · You can change anytime
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 4. Shaking Gift Icon (when popup is dismissed) */}
      <AnimatePresence>
        {isOfferDismissed && !showOfferPopup && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            onClick={reviveOffer}
            className="fixed bottom-36 md:bottom-24 right-4 md:right-6 z-50 w-14 h-14 bg-gold text-white rounded-full shadow-[0_0_20px_rgba(212,175,55,0.4)] flex items-center justify-center hover:bg-gold-600 transition-colors group"
            style={{ animation: 'shake 5s ease-in-out infinite' }}
          >
            <Gift size={24} className="group-hover:scale-110 transition-transform" />
            
            {/* Pulse ring */}
            <span className="absolute inset-0 rounded-full border-2 border-gold/40 animate-ping pointer-events-none" style={{ animationDuration: '3s' }} />
            
            {/* Tooltip */}
            <div className="absolute right-full mr-4 bg-navy text-white text-[10px] uppercase tracking-widest py-1.5 px-3 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              View Offers
              <div className="absolute top-1/2 -right-1 -translate-y-1/2 border-y-4 border-y-transparent border-l-4 border-l-navy" />
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: rotate(0deg); }
          2% { transform: rotate(10deg); }
          4% { transform: rotate(-10deg); }
          6% { transform: rotate(10deg); }
          8% { transform: rotate(-10deg); }
          10% { transform: rotate(0deg); }
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(0,0,0,0.03);
          border-radius: 99px;
          margin: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(212, 175, 55, 0.4);
          border-radius: 99px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(212, 175, 55, 0.8);
        }
      `}</style>
    </>
  );
};
