import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { attractionsData } from '../../data/attractions';
import { LuxuryButton } from '../ui/Button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const AttractionsCarousel = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = window.innerWidth > 768 ? 400 : window.innerWidth * 0.85;
      scrollRef.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-24 bg-pearl relative overflow-hidden group/section">
      <div className="max-w-[1400px] mx-auto px-6 relative">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-[1px] bg-gold" />
              <span className="font-body text-caption tracking-[0.2em] uppercase text-gold">Explore Local</span>
            </div>
            <h2 className="font-display text-heading-xl text-navy">Nearby Attractions</h2>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Link to="/attractions">
              <LuxuryButton variant="outline">View All</LuxuryButton>
            </Link>
          </motion.div>
        </div>

        {/* Navigation Arrows */}
        <button 
          onClick={() => scroll('left')}
          className="hidden md:flex absolute left-2 top-[60%] -translate-y-1/2 w-12 h-12 bg-white/80 backdrop-blur-md rounded-full items-center justify-center text-navy shadow-xl border border-navy/5 hover:bg-gold hover:text-white transition-all z-20 opacity-0 group-hover/section:opacity-100 disabled:opacity-0"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button 
          onClick={() => scroll('right')}
          className="hidden md:flex absolute right-2 top-[60%] -translate-y-1/2 w-12 h-12 bg-white/80 backdrop-blur-md rounded-full items-center justify-center text-navy shadow-xl border border-navy/5 hover:bg-gold hover:text-white transition-all z-20 opacity-0 group-hover/section:opacity-100 disabled:opacity-0"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Carousel */}
        <div 
          ref={scrollRef}
          className="flex overflow-x-auto gap-8 pb-12 snap-x snap-mandatory scrollbar-hide hide-scroll-bar" 
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {attractionsData.map((attraction, index) => (
            <motion.div
              key={attraction.id}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="flex-none w-[85vw] sm:w-[350px] md:w-[400px] snap-center"
            >
              <div className="group relative h-[450px] overflow-hidden rounded-sm bg-navy flex">
                {Array.isArray(attraction.image) ? (
                  <>
                    <div className="w-1/2 h-full overflow-hidden border-r border-navy/20">
                      <img 
                        src={attraction.image[0]} 
                        alt={attraction.name}
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                      />
                    </div>
                    <div className="w-1/2 h-full overflow-hidden">
                      <img 
                        src={attraction.image[1]} 
                        alt={attraction.name}
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                      />
                    </div>
                  </>
                ) : (
                  <img 
                    src={attraction.image as string} 
                    alt={attraction.name}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                  />
                )}
                
                <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/30 to-transparent" />
                
                <div className="absolute bottom-0 left-0 p-8 w-full z-10">
                  <div className="flex justify-between items-end mb-4">
                    <h3 className="font-display text-heading-md text-pearl">{attraction.name}</h3>
                  </div>
                  <div className="flex items-center gap-4 text-pearl/70 text-caption uppercase tracking-widest font-body mb-6">
                    <span>{attraction.distance}</span>
                    <span className="w-1 h-1 rounded-full bg-gold" />
                    <span>{attraction.time}</span>
                  </div>
                  
                  <Link to="/attractions">
                    <div className="flex items-center gap-3 text-gold uppercase tracking-widest font-body text-[11px] group-hover:text-white transition-colors duration-300">
                      <span>Learn More</span>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="transform group-hover:translate-x-2 transition-transform duration-300">
                        <line x1="2" y1="8" x2="14" y2="8" />
                        <polyline points="10 4 14 8 10 12" />
                      </svg>
                    </div>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
