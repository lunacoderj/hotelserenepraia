import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const adventureData = [
  {
    id: 'vihang',
    name: 'Vihang Adventures',
    distance: 'Variable',
    time: 'Flexible',
    image: 'https://1zn1w7lqhv0bhjja.public.blob.vercel-storage.com/rooms/para_gliding.png',
    mapLink: 'https://maps.app.goo.gl/r4Riwgdmr6Hk6CF28'
  },
  {
    id: 'fun-adventures',
    name: 'Fun Adventures',
    distance: 'Variable',
    time: 'Flexible',
    image: 'https://1zn1w7lqhv0bhjja.public.blob.vercel-storage.com/rooms/funadvanture.png',
    mapLink: 'https://maps.app.goo.gl/Ma4dib5MJvWn1MQC7'
  },
  {
    id: 'livein-adventures',
    name: 'Livein Adventures',
    distance: 'Variable',
    time: 'Flexible',
    image: 'https://1zn1w7lqhv0bhjja.public.blob.vercel-storage.com/rooms/Screenshot%202026-07-14%20223212.png',
    mapLink: 'https://maps.app.goo.gl/cBzfA8GqxKqCnmgk9'
  },
  {
    id: 'ap-tourism',
    name: 'AP Tourism - Boating',
    distance: 'Variable',
    time: 'Flexible',
    image: 'https://1zn1w7lqhv0bhjja.public.blob.vercel-storage.com/rooms/AP%20Tourism%20-%20Boating%20control%20Room.png',
    mapLink: 'https://maps.app.goo.gl/fVhv4qTZ1stnvHH57'
  }
];

export const AdventuresCarousel = ({ onRouteSelect }: { onRouteSelect?: (route: {name: string, dest: string}) => void }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = window.innerWidth > 768 ? 400 : window.innerWidth * 0.85;
      scrollRef.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="pt-24 pb-12 bg-navy relative overflow-hidden group/section z-20">
      <div className="max-w-[1400px] mx-auto px-6 relative">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-[1px] bg-gold" />
              <span className="font-body text-caption tracking-[0.2em] uppercase text-gold">Thrill Seekers</span>
            </div>
            <h2 className="font-display text-heading-xl text-pearl">Adventure & Nature Views</h2>
          </motion.div>
        </div>

        {/* Navigation Arrows */}
        <button 
          onClick={() => scroll('left')}
          className="hidden md:flex absolute left-2 top-[60%] -translate-y-1/2 w-12 h-12 bg-white/10 backdrop-blur-md rounded-full items-center justify-center text-pearl shadow-xl border border-white/5 hover:bg-gold hover:text-navy transition-all z-20 opacity-0 group-hover/section:opacity-100 disabled:opacity-0"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button 
          onClick={() => scroll('right')}
          className="hidden md:flex absolute right-2 top-[60%] -translate-y-1/2 w-12 h-12 bg-white/10 backdrop-blur-md rounded-full items-center justify-center text-pearl shadow-xl border border-white/5 hover:bg-gold hover:text-navy transition-all z-20 opacity-0 group-hover/section:opacity-100 disabled:opacity-0"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Carousel */}
        <div 
          ref={scrollRef}
          className="flex overflow-x-auto gap-8 pb-12 snap-x snap-mandatory scrollbar-hide hide-scroll-bar" 
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {adventureData.map((attraction, index) => (
            <motion.div
              key={attraction.id}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="flex-none w-[85vw] sm:w-[350px] md:w-[400px] snap-center"
            >
              <div className="group relative h-[450px] overflow-hidden rounded-sm bg-navy flex">
                <img 
                  src={attraction.image} 
                  alt={attraction.name}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/30 to-transparent" />
                
                <div className="absolute bottom-0 left-0 p-8 w-full z-10 flex flex-col justify-end">
                  <h3 className="font-display text-heading-md text-pearl mb-4">{attraction.name}</h3>
                  <button 
                    onClick={() => onRouteSelect?.({ name: attraction.name, dest: attraction.name + ', Visakhapatnam' })}
                    className="flex items-center gap-3 text-gold uppercase tracking-widest font-body text-[11px] hover:text-white transition-colors duration-300 w-max"
                  >
                    <span>Get Directions</span>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="transform group-hover:translate-x-1 transition-transform duration-300">
                      <line x1="2" y1="8" x2="14" y2="8" />
                      <polyline points="10 4 14 8 10 12" />
                    </svg>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
