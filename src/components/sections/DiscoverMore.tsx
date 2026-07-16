import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const portals = [
  {
    title: 'Rooms & Suites',
    subtitle: 'Stay',
    link: '/rooms',
    image: 'https://1zn1w7lqhv0bhjja.public.blob.vercel-storage.com/rooms/beachview.webp',
    size: 'lg:col-span-8 lg:row-span-2',
    height: 'h-[400px] lg:h-full',
  },
  {
    title: 'Exclusive Offers',
    subtitle: 'Offers',
    link: '/claim-offer/deluxe',
    image: 'https://1zn1w7lqhv0bhjja.public.blob.vercel-storage.com/rooms/poster.png',
    size: 'lg:col-span-4 lg:row-span-1',
    height: 'h-[400px]',
  },
  {
    title: 'Grand Banquet',
    subtitle: 'Events',
    link: '/banquet',
    image: 'https://1zn1w7lqhv0bhjja.public.blob.vercel-storage.com/hotel-serene/hero%20image.png',
    size: 'lg:col-span-4 lg:row-span-1',
    height: 'h-[400px]',
  },
  {
    title: 'Local Attractions',
    subtitle: 'Explore',
    link: '/attractions',
    image: 'https://1zn1w7lqhv0bhjja.public.blob.vercel-storage.com/hotel-serene/Thotlakonda-Beach.png',
    size: 'lg:col-span-4 lg:row-span-1',
    height: 'h-[400px]',
  },
  {
    title: 'Visual Journey',
    subtitle: 'Gallery',
    link: '/gallery',
    image: 'https://1zn1w7lqhv0bhjja.public.blob.vercel-storage.com/hotel-serene/building.png',
    size: 'lg:col-span-4 lg:row-span-1',
    height: 'h-[400px]',
  },
  {
    title: 'Get In Touch',
    subtitle: 'Contact',
    link: '/contact',
    image: 'https://1zn1w7lqhv0bhjja.public.blob.vercel-storage.com/rooms/reception.JPG',
    size: 'lg:col-span-4 lg:row-span-1',
    height: 'h-[400px]',
  }
];

export const DiscoverMore = () => {
  return (
    <section className="py-32 bg-navy relative overflow-hidden border-t border-white/5">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 md:mb-24"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-[1px] bg-gold" />
            <span className="font-body text-caption tracking-[0.2em] uppercase text-gold">Discover Serene Praia</span>
          </div>
          <h2 className="font-display text-heading-xl md:text-[4rem] text-pearl max-w-3xl leading-tight">
            Everything you need for an unforgettable stay.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6 auto-rows-[400px]">
          {portals.map((portal, idx) => (
            <Link 
              to={portal.link} 
              key={portal.title}
              className={`group relative overflow-hidden rounded-sm block ${portal.size} ${portal.height} lg:h-auto shadow-2xl`}
            >
              <div className="absolute inset-0 bg-navy overflow-hidden">
                {/* Blurred background layer to prevent empty space when using object-contain */}
                {(portal.title === 'Exclusive Offers' || portal.title === 'Grand Banquet') && (
                  <img 
                    src={portal.image} 
                    alt="" 
                    className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-40 scale-125"
                  />
                )}
                <img 
                  src={portal.image} 
                  alt={portal.title} 
                  className={`relative w-full h-full ${(portal.title === 'Exclusive Offers' || portal.title === 'Grand Banquet') ? 'object-contain p-4' : 'object-cover'} opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-[2s] ease-out`}
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/20 to-transparent pointer-events-none" />
              
              <div className="absolute bottom-0 left-0 p-8 md:p-10 w-full flex flex-col items-start justify-end h-full z-10 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-700 ease-out">
                <span className="font-body text-caption uppercase tracking-[0.3em] text-gold mb-3 block opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100">
                  {portal.subtitle}
                </span>
                <h3 className="font-display text-heading-lg text-pearl mb-6 group-hover:text-gold transition-colors duration-500">
                  {portal.title}
                </h3>
                <div className="flex items-center gap-4 text-white/70 group-hover:text-white transition-colors duration-300">
                  <span className="font-body text-caption uppercase tracking-widest">Explore</span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="transform group-hover:translate-x-3 transition-transform duration-500 ease-out text-gold">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
