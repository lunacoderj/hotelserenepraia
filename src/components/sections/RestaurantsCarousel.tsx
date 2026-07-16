import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const ORIGIN = encodeURIComponent('Hotel Serene Praia, Visakhapatnam');

const restaurantsData = [
  {
    id: 'brew-buzz',
    name: 'Brew Buzz',
    image: 'https://1zn1w7lqhv0bhjja.public.blob.vercel-storage.com/rooms/brew_buzz.png',
    mapLink: 'https://maps.app.goo.gl/dbutzyqXJSx46kni8'
  },
  {
    id: 'another-fine-day',
    name: 'Another fine day',
    image: 'https://1zn1w7lqhv0bhjja.public.blob.vercel-storage.com/rooms/another_fine_day.png',
    mapLink: 'https://maps.app.goo.gl/8esUxCwZtfKaz2h49'
  },
  {
    id: 'v-hangout',
    name: 'v-hangout',
    image: 'https://1zn1w7lqhv0bhjja.public.blob.vercel-storage.com/rooms/v-hangout.png',
    mapLink: 'https://maps.app.goo.gl/JNVXxc2AmwngSowi7'
  },
  {
    id: 'bean-board',
    name: 'Bean-Board',
    image: 'https://1zn1w7lqhv0bhjja.public.blob.vercel-storage.com/rooms/bean-board.png',
    mapLink: 'https://share.google/A4xkImpQkOVIOsDEa'
  },
  {
    id: 'gatox',
    name: 'Gatox',
    image: 'https://1zn1w7lqhv0bhjja.public.blob.vercel-storage.com/rooms/gatox.png',
    mapLink: 'https://maps.app.goo.gl/RdyXDDzuEU7Jjvqe6'
  }
];

export const RestaurantsCarousel = ({ onRouteSelect }: { onRouteSelect?: (route: {name: string, dest: string}) => void }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = window.innerWidth > 768 ? 400 : window.innerWidth * 0.85;
      scrollRef.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-24 bg-pearl relative overflow-hidden group/section z-20">
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
              <span className="font-body text-caption tracking-[0.2em] uppercase text-gold">Culinary Experiences</span>
            </div>
            <h2 className="font-display text-heading-xl text-navy">Nearby Restaurants & Cafes</h2>
          </motion.div>
        </div>

        {/* Navigation Arrows */}
        <button 
          onClick={() => scroll('left')}
          className="flex absolute left-2 md:left-4 top-[55%] md:top-[60%] -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-white/80 md:bg-white backdrop-blur-md rounded-full items-center justify-center text-navy shadow-xl border border-navy/10 hover:bg-gold hover:text-white transition-all z-20 opacity-100 lg:opacity-0 lg:group-hover/section:opacity-100 disabled:opacity-0"
        >
          <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
        </button>
        <button 
          onClick={() => scroll('right')}
          className="flex absolute right-2 md:right-4 top-[55%] md:top-[60%] -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-white/80 md:bg-white backdrop-blur-md rounded-full items-center justify-center text-navy shadow-xl border border-navy/10 hover:bg-gold hover:text-white transition-all z-20 opacity-100 lg:opacity-0 lg:group-hover/section:opacity-100 disabled:opacity-0"
        >
          <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
        </button>

        {/* Carousel */}
        <div 
          ref={scrollRef}
          className="flex overflow-x-auto gap-8 pb-12 snap-x snap-mandatory scrollbar-hide hide-scroll-bar" 
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {restaurantsData.map((restaurant, index) => (
            <motion.div
              key={restaurant.id}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="flex-none w-[85vw] sm:w-[350px] md:w-[400px] snap-center"
            >
              <div className="group relative h-[450px] overflow-hidden rounded-sm bg-navy flex shadow-lg">
                <img 
                  src={restaurant.image} 
                  alt={restaurant.name}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-90 group-hover:opacity-100"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/30 to-transparent" />
                
                <div className="absolute bottom-0 left-0 p-8 w-full z-10 flex flex-col justify-end">
                  <h3 className="font-display text-heading-md text-pearl mb-4">{restaurant.name}</h3>
                  <button 
                    onClick={() => onRouteSelect?.({ name: restaurant.name, dest: restaurant.name + ', Visakhapatnam' })}
                    className="flex items-center gap-3 text-gold uppercase tracking-widest font-body text-[11px] hover:text-white transition-colors duration-300 w-max bg-white/10 px-4 py-2 rounded backdrop-blur-sm border border-white/10"
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
