import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useLenisScroll } from '../hooks';
import { LuxuryCard } from '../components/ui/Card';
import { LuxuryButton } from '../components/ui/Button';
import { roomsData } from '../data/rooms';

export const Rooms = () => {
  useLenisScroll();

  return (
    <div className="bg-pearl min-h-screen pt-32 pb-24">
      <Helmet>
        <title>Luxury Rooms & Suites | Hotel Serene Praia Visakhapatnam</title>
        <meta name="description" content="Book premium rooms and executive suites near Rushikonda Beach, Vizag. Enjoy sea view rooms, deluxe double rooms, and affordable luxury accommodation in Visakhapatnam." />
        <meta name="keywords" content="Premium rooms in Rushikonda Vizag, Deluxe double rooms in Visakhapatnam, Executive suites near Rushikonda Beach, Sea view suites in Vizag, Luxury room booking near Vizag Beach Road, Best family rooms in Rushikonda, Affordable AC rooms near Rushikonda, King bed hotel rooms in Visakhapatnam" />
      </Helmet>
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="w-8 h-[1px] bg-gold" />
              <span className="font-body text-caption tracking-[0.2em] uppercase text-gold">Accommodations</span>
              <div className="w-8 h-[1px] bg-gold" />
            </div>
            <h1 className="font-display text-display-md text-navy mb-6">Our Luxury Rooms</h1>
            <p className="font-body text-body-md text-navy-500/70 max-w-2xl mx-auto">
              Experience the perfect blend of comfort and coastal elegance. Each of our rooms is meticulously designed to provide a serene sanctuary during your stay in Visakhapatnam.
            </p>
          </motion.div>
        </div>

        {/* Room Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {roomsData.map((room, index) => (
            <motion.div
              key={room.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <LuxuryCard className="group h-full flex flex-col">
                <div className="relative h-[400px] overflow-hidden">
                  <img 
                    src={room.images.main} 
                    alt={room.name} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Price Tag */}
                  <div className="absolute top-6 right-6 bg-navy/90 backdrop-blur-sm px-6 py-3 text-pearl shadow-xl">
                    <span className="font-display text-heading-md block leading-none text-gold">₹{room.offerPrice}</span>
                    <span className="font-body text-[10px] uppercase tracking-widest text-pearl/50 line-through">₹{room.actualPrice}</span>
                  </div>
                </div>
                
                <div className="p-8 md:p-10 flex flex-col flex-grow bg-white relative z-10 -mt-4 mx-4 shadow-luxury">
                  <div className="flex justify-between items-end mb-4">
                    <h3 className="font-display text-heading-lg text-navy">{room.name}</h3>
                    <div className="flex gap-4 text-caption uppercase tracking-widest text-navy-500/50 font-body">
                      <span>{room.capacity} Guests</span>
                    </div>
                  </div>
                  
                  <p className="font-body text-body-md text-navy-500/70 mb-8 flex-grow">
                    {room.shortDescription}
                  </p>
                  
                  <ul className="grid grid-cols-2 gap-y-3 gap-x-4 mb-8">
                    {room.features.slice(0, 4).map(feature => (
                      <li key={feature} className="text-body-sm text-navy-500/70 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
                        <span className="truncate">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="pt-6 border-t border-navy/5 flex gap-4">
                    <Link to={`/rooms/${room.slug}`} className="flex-1">
                      <LuxuryButton variant="primary" className="w-full">Explore Room</LuxuryButton>
                    </Link>
                  </div>
                </div>
              </LuxuryCard>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Rooms;
