import React from 'react';
import { motion } from 'framer-motion';
import { LuxuryButton } from '../ui/Button';
import { LuxuryCard } from '../ui/Card';
import { Link } from 'react-router-dom';

const featuredRooms = [
  {
    id: 'deluxe',
    name: 'Deluxe Room',
    image: 'https://1zn1w7lqhv0bhjja.public.blob.vercel-storage.com/rooms/deluxe_bed.jpeg',
    price: '₹1,999',
    actualPrice: '₹2,700',
    features: ['Comfortable Stay', 'Smart TV', 'Workspace'],
  },
  {
    id: 'suite',
    name: 'Suite Room',
    image: 'https://1zn1w7lqhv0bhjja.public.blob.vercel-storage.com/rooms/beachview.webp',
    price: '₹4,499',
    actualPrice: '₹6,500',
    features: ['Separate Living Room', 'Sea View', 'Mini Fridge'],
  },
  {
    id: 'executive',
    name: 'Executive Room',
    image: 'https://1zn1w7lqhv0bhjja.public.blob.vercel-storage.com/rooms/executive_room.jpeg',
    price: '₹4,099',
    actualPrice: '₹6,500',
    features: ['Executive Bedroom', 'Sea View', 'Premium Bathroom'],
  }
];

export const FeaturedRooms = () => {
  return (
    <section className="py-24 bg-sand-50 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-[1px] bg-gold" />
              <span className="font-body text-caption tracking-[0.2em] uppercase text-gold">Accommodations</span>
            </div>
            <h2 className="font-display text-heading-xl text-navy">Signature Rooms</h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Link to="/rooms">
              <LuxuryButton variant="outline">View All Rooms</LuxuryButton>
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredRooms.map((room, index) => (
            <motion.div
              key={room.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <LuxuryCard className="group h-full flex flex-col">
                <div className="relative h-72 overflow-hidden">
                  <img 
                    src={room.image} 
                    alt={room.name} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute top-4 right-4 bg-navy/90 backdrop-blur-sm px-4 py-2 text-pearl">
                    <span className="font-display text-heading-sm block leading-none">{room.price}</span>
                    <span className="font-body text-[10px] uppercase tracking-widest text-pearl/50 line-through">{room.actualPrice}</span>
                  </div>
                </div>
                <div className="p-8 flex flex-col flex-grow">
                  <h3 className="font-display text-heading-md text-navy mb-4">{room.name}</h3>
                  <ul className="flex flex-col gap-2 mb-8 flex-grow">
                    {room.features.map(feature => (
                      <li key={feature} className="text-body-sm text-navy-500/70 flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-gold" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link to="/rooms" className="mt-auto">
                    <span className="text-gold font-body text-body-sm uppercase tracking-widest hover:text-navy transition-colors flex items-center gap-2">
                      Discover More
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 8H15M15 8L8 1M15 8L8 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                  </Link>
                </div>
              </LuxuryCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
