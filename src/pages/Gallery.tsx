import React from 'react';
import { motion } from 'framer-motion';
import { useLenisScroll } from '../hooks';

const galleryImages = [
  { src: 'https://1zn1w7lqhv0bhjja.public.blob.vercel-storage.com/hotel-serene/building.png', span: 'col-span-1 md:col-span-2 row-span-2' },
  { src: '/images/gallery/reception.JPG', span: 'col-span-1 md:col-span-1 row-span-1' },
  { src: '/images/gallery/entrance.JPG', span: 'col-span-1 md:col-span-1 row-span-1' },
  { src: 'https://1zn1w7lqhv0bhjja.public.blob.vercel-storage.com/hotel-serene/beachview.webp', span: 'col-span-1 md:col-span-2 row-span-1' },
  { src: 'https://1zn1w7lqhv0bhjja.public.blob.vercel-storage.com/hotel-serene/hero%20image.png', span: 'col-span-1 md:col-span-2 row-span-2' },
  { src: 'https://1zn1w7lqhv0bhjja.public.blob.vercel-storage.com/hotel-serene/HERO.png', span: 'col-span-1 md:col-span-1 row-span-1' },
  { src: 'https://1zn1w7lqhv0bhjja.public.blob.vercel-storage.com/hotel-serene/washroom.webp', span: 'col-span-1 md:col-span-1 row-span-2' },
  { src: 'https://1zn1w7lqhv0bhjja.public.blob.vercel-storage.com/hotel-serene/deluxe_room.jpg', span: 'col-span-1 md:col-span-1 row-span-1' },
  { src: 'https://1zn1w7lqhv0bhjja.public.blob.vercel-storage.com/hotel-serene/waiting_hall.JPG', span: 'col-span-1 md:col-span-1 row-span-1' },
  { src: 'https://1zn1w7lqhv0bhjja.public.blob.vercel-storage.com/hotel-serene/marriage.png', span: 'col-span-1 md:col-span-2 row-span-1' },
  { src: 'https://1zn1w7lqhv0bhjja.public.blob.vercel-storage.com/hotel-serene/sofaset.webp', span: 'col-span-1 md:col-span-1 row-span-1' },
  { src: '/images/gallery/amanaties.JPG', span: 'col-span-1 md:col-span-1 row-span-1' },
];

export const Gallery = () => {
  useLenisScroll();

  return (
    <div className="bg-pearl min-h-screen pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="w-8 h-[1px] bg-gold" />
              <span className="font-body text-caption tracking-[0.2em] uppercase text-gold">Visual Journey</span>
              <div className="w-8 h-[1px] bg-gold" />
            </div>
            <h1 className="font-display text-display-md text-navy mb-6">Our Masterpiece</h1>
            <p className="font-body text-body-lg text-navy-500/70 max-w-2xl mx-auto">
              Explore the architectural elegance, luxurious interiors, and stunning surroundings that define Hotel Serene Praia.
            </p>
          </motion.div>
        </div>

        {/* Unique Asymmetrical Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[250px]">
          {galleryImages.map((image, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: (idx % 4) * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
              className={`relative overflow-hidden group cursor-pointer ${image.span} rounded-sm shadow-md`}
            >
              <img 
                src={image.src} 
                alt={`Gallery visual ${idx + 1}`} 
                className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-navy/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                <span className="text-white border border-white/50 px-6 py-2 rounded-full text-caption uppercase tracking-widest backdrop-blur-md transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  Enlarge
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
