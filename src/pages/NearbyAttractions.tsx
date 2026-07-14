import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useLenisScroll } from '../hooks';
import { attractionsData } from '../data/attractions';
import { LuxuryButton } from '../components/ui/Button';
import { Link } from 'react-router-dom';
import { AdventuresCarousel } from '../components/sections/AdventuresCarousel';

export const NearbyAttractions = () => {
  useLenisScroll();
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  
  const [selectedRoute, setSelectedRoute] = useState<{name: string, dest: string} | null>(null);

  return (
    <div className="bg-navy min-h-screen text-pearl selection:bg-gold selection:text-navy">
      
      {/* ─── CINEMATIC HERO ─── */}
      <section ref={heroRef} className="relative h-screen w-full bg-navy overflow-hidden">
        <motion.div style={{ y, scale }} className="absolute inset-0 w-full h-full">
          <img 
            src='https://1zn1w7lqhv0bhjja.public.blob.vercel-storage.com/hotel-serene/rushikondabeach.jpg' 
            alt="Visakhapatnam Coastline" 
            className="w-full h-full object-cover opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/40 to-transparent" />
          <div className="absolute inset-0 bg-navy/20" />
        </motion.div>
        
        <motion.div style={{ opacity }} className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 px-6 mt-16">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-16 h-[1px] bg-gold" />
              <span className="font-body text-caption tracking-[0.3em] uppercase text-gold">Explore the Coast</span>
              <div className="w-16 h-[1px] bg-gold" />
            </div>
            <h1 className="font-display text-display-lg md:text-[6rem] text-pearl drop-shadow-2xl mb-8 leading-[0.95]">
              Nearby <br/><span className="text-gold italic">Attractions</span>
            </h1>
            <p className="font-body text-body-lg text-pearl/80 max-w-2xl mx-auto font-light">
              Discover the rich heritage and natural beauty of Visakhapatnam. From pristine blue-flag beaches to ancient hilltop sanctuaries, your next adventure awaits.
            </p>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
        >
          <span className="font-body text-[10px] tracking-[0.3em] uppercase text-pearl/50">Scroll</span>
          <div className="w-[1px] h-8 bg-gradient-to-b from-gold to-transparent" />
        </motion.div>
      </section>

      {/* ─── STACKING CARDS SHOWCASE ─── */}
      <AdventuresCarousel onRouteSelect={setSelectedRoute} />
      <section className="relative w-full max-w-[1400px] mx-auto px-4 md:px-8 pt-24 pb-64">
        <div className="text-center mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-heading-xl md:text-[3rem] text-pearl"
          >
            Curated Destinations
          </motion.h2>
        </div>

        {attractionsData.map((attraction, i) => (
          <div 
            key={attraction.id}
            className="sticky w-full h-[70vh] md:h-[80vh] mb-12 flex flex-col justify-end rounded-sm overflow-hidden shadow-[0_-10px_40px_rgba(0,0,0,0.8)] group border border-pearl/10"
            style={{ 
              // This top calculation is the secret to the perfect stacking deck effect
              top: `calc(96px + ${i * 12}px)`,
              zIndex: 10 + i
            }}
          >
            {/* Background Image with Hover Zoom */}
            <div className="absolute inset-0 overflow-hidden flex">
              {Array.isArray(attraction.image) ? (
                attraction.image.map((img, idx) => (
                  <div key={idx} className="flex-1 h-full overflow-hidden border-r border-navy/20 last:border-r-0">
                    <img 
                      src={img} 
                      alt={`${attraction.name} - Part ${idx + 1}`} 
                      className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-[2s] ease-out"
                    />
                  </div>
                ))
              ) : (
                <img 
                  src={attraction.image as string} 
                  alt={attraction.name} 
                  className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-[2s] ease-out"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/50 to-transparent opacity-90 pointer-events-none" />
              <div className="absolute inset-0 bg-navy/10 group-hover:bg-transparent transition-colors duration-1000 pointer-events-none" />
            </div>

            {/* Content (Glassmorphic) */}
            <div className="relative z-10 w-full p-6 md:p-12 lg:p-16 flex flex-col md:flex-row items-end justify-between gap-8 md:gap-16">
              <div className="w-full md:w-2/3 max-w-4xl">
                <div className="flex items-center gap-4 mb-6">
                  <span className="font-display text-heading-md text-gold">0{i + 1}</span>
                  <div className="w-12 h-[1px] bg-gold/50" />
                  <span className="font-body text-[10px] md:text-xs tracking-[0.2em] uppercase text-pearl/90 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-sm border border-white/20">
                    {attraction.distance} • {attraction.time} Drive
                  </span>
                </div>
                
                <h3 className="font-display text-heading-xl md:text-[4rem] text-pearl mb-6 leading-tight group-hover:text-gold transition-colors duration-700">
                  {attraction.name}
                </h3>
                
                <p className="font-body text-body-lg text-pearl/80 leading-relaxed font-light mb-8 md:mb-0 max-w-2xl">
                  {attraction.description}
                </p>
              </div>

              <div className="w-full md:w-auto flex-shrink-0">
                <button 
                  onClick={() => setSelectedRoute({ name: attraction.name, dest: attraction.name + ', Visakhapatnam' })}
                  className="relative overflow-hidden bg-white/5 backdrop-blur-md border border-white/20 px-8 py-5 rounded-sm flex items-center gap-4 group/btn hover:border-gold transition-all duration-500 w-full justify-center md:w-auto"
                >
                  <span className="relative z-10 font-body text-caption uppercase tracking-widest text-pearl group-hover/btn:text-navy transition-colors font-medium">Get Directions</span>
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="relative z-10 text-gold group-hover/btn:text-navy transition-colors">
                    <path d="M1 8H15M15 8L8 1M15 8L8 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  {/* Hover fill effect */}
                  <div className="absolute inset-0 bg-gold transform scale-y-0 group-hover/btn:scale-y-100 origin-bottom transition-transform duration-500 ease-out" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </section>
      
      {/* ─── BOTTOM CTA ─── */}
      <section className="bg-pearl py-32 text-center px-6 relative z-50">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="w-16 h-[1px] bg-gold mx-auto mb-8" />
          <h2 className="font-display text-heading-lg md:text-[3.5rem] text-navy mb-8">Need Travel Assistance?</h2>
          <p className="font-body text-body-lg text-navy-500/70 max-w-2xl mx-auto mb-12 font-light leading-relaxed">
            Our concierge desk is happy to arrange customized city tours, private transportation, and professional guide services to make your sightseeing entirely effortless.
          </p>
          <Link to="/contact">
            <LuxuryButton variant="primary" size="lg">Contact Concierge</LuxuryButton>
          </Link>
        </motion.div>
      </section>

      {/* ─── FREE DIRECTIONS MODAL ─── */}
      <AnimatePresence>
        {selectedRoute && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedRoute(null)}
              className="absolute inset-0 bg-navy/90 backdrop-blur-lg cursor-pointer"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="bg-pearl w-full max-w-5xl h-[85vh] rounded-sm overflow-hidden shadow-2xl relative z-10 flex flex-col border border-gold/20"
            >
              <button 
                onClick={() => setSelectedRoute(null)}
                className="absolute top-6 right-6 w-12 h-12 bg-white shadow-xl rounded-full flex items-center justify-center text-navy hover:text-pearl hover:bg-gold hover:scale-110 z-20 transition-all duration-300 border border-navy/10"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 13L13 1M1 1L13 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              
              <div className="p-8 bg-white border-b border-navy/5 flex-shrink-0">
                <h3 className="font-display text-heading-md md:text-heading-lg text-navy mb-2">Directions to {selectedRoute.name}</h3>
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-gold animate-pulse shadow-[0_0_10px_rgba(212,175,55,0.8)]" />
                  <p className="font-body text-xs text-navy-500/80 uppercase tracking-widest font-medium">Routing from Hotel Serene Praia</p>
                </div>
              </div>
              
              <div className="w-full flex-grow relative bg-navy/5">
                <iframe 
                  width="100%" 
                  height="100%" 
                  frameBorder="0" 
                  style={{ border: 0 }}
                  src={`https://maps.google.com/maps?saddr=${encodeURIComponent('Hotel Serene Praia, Visakhapatnam')}&daddr=${encodeURIComponent(selectedRoute.dest)}&output=embed`}
                  allowFullScreen
                  title={`Directions to ${selectedRoute.name}`}
                  className="absolute inset-0 grayscale-[20%] contrast-125"
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NearbyAttractions;
