import React, { useEffect, useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLenisScroll } from '../hooks';
import { roomsData } from '../data/rooms';
import { LuxuryButton } from '../components/ui/Button';
import { CONTACT_CONFIG } from '../config/contacts';
import { CanvasSequence } from '../components/ui/CanvasSequence';

export const RoomDetails = () => {
  useLenisScroll();
  const { slug } = useParams<{ slug: string }>();
  const [room, setRoom] = useState(roomsData.find(r => r.slug === slug));

  useEffect(() => {
    setRoom(roomsData.find(r => r.slug === slug));
    window.scrollTo(0, 0);
  }, [slug]);

  if (!room) {
    return <Navigate to="/rooms" replace />;
  }

  return (
    <div className="bg-pearl min-h-screen">
      
      {/* 
        ========================================================================
        IMMERSIVE CANVAS SCROLLYTELLING
        ========================================================================
        To activate the Apple-style animation:
        1. Export your video as an image sequence (001.jpg, 002.jpg...)
        2. Place them in public/images/sequence/room-name/
        3. Uncomment the CanvasSequence block below.
        ========================================================================
      */}
      
      {/* 
      <CanvasSequence 
        framesUrlPattern={`/images/sequence/${room.slug}/frame_{index}.jpg`} 
        totalFrames={150} 
      /> 
      */}

      {room.id === 'suite' ? (
        <section className="relative h-[100vh] w-full bg-navy overflow-hidden flex items-center justify-center">
          <motion.div 
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute inset-0 w-full h-full"
          >
            <img 
              src={room.images.main} 
              alt={room.name} 
              className="w-full h-full object-cover opacity-70"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/30 to-navy/10" />
          </motion.div>
          
          <div className="absolute top-32 left-4 md:left-8 z-30">
            <Link to="/rooms" className="text-gold hover:text-white transition-colors uppercase tracking-widest text-caption bg-navy/50 px-4 py-2 rounded backdrop-blur-md border border-white/10">
              ← Back to Rooms
            </Link>
          </div>
          
          <div className="relative z-20 text-center flex flex-col items-center mt-20 px-6 w-full max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="flex items-center gap-4 md:gap-6 mb-6 md:mb-8"
            >
              <div className="w-8 md:w-16 h-[1px] bg-gold" />
              <span className="font-body text-[10px] md:text-caption tracking-[0.4em] uppercase text-gold whitespace-nowrap">The Ultimate Experience</span>
              <div className="w-8 md:w-16 h-[1px] bg-gold" />
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.7 }}
              className="font-display text-[3.5rem] sm:text-[5rem] md:text-[6rem] lg:text-[8rem] text-pearl leading-[0.9] tracking-tight mb-8 md:mb-12 drop-shadow-2xl"
            >
              Suite <span className="italic text-gold font-light">Elegance</span>
            </motion.h1>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
              className="flex flex-wrap justify-center items-center gap-4 md:gap-8 text-xs md:text-body-sm uppercase tracking-widest text-pearl/90 font-medium bg-white/5 backdrop-blur-xl border border-white/10 py-4 px-6 md:px-10 rounded-full shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]"
            >
              <span className="flex items-center gap-2 md:gap-3"><span className="w-1 md:w-1.5 h-1 md:h-1.5 rounded-full bg-gold shadow-[0_0_8px_rgba(212,175,55,0.8)]" /> {room.size}</span>
              <span className="flex items-center gap-2 md:gap-3"><span className="w-1 md:w-1.5 h-1 md:h-1.5 rounded-full bg-gold shadow-[0_0_8px_rgba(212,175,55,0.8)]" /> 2 Adults + 1 Child</span>
              <span className="flex items-center gap-2 md:gap-3"><span className="w-1 md:w-1.5 h-1 md:h-1.5 rounded-full bg-gold shadow-[0_0_8px_rgba(212,175,55,0.8)]" /> {room.bedType}</span>
            </motion.div>
          </div>
          
          {/* Scroll Down Indicator */}
          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3"
          >
            <span className="font-body text-[9px] tracking-[0.3em] uppercase text-pearl/60">Discover</span>
            <div className="w-[1px] h-10 md:h-16 bg-gradient-to-b from-gold to-transparent" />
          </motion.div>
        </section>
      ) : room.id === 'deluxe' || room.id === 'executive' ? (
        <section className="relative h-screen w-full bg-navy overflow-hidden">
          <motion.div 
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute inset-0 w-full h-full"
          >
            <img 
              src={room.images.main} 
              alt={room.name} 
              className="w-full h-full object-cover opacity-80"
            />
            {/* Unique vertical gradient for these rooms */}
            <div className="absolute inset-0 bg-gradient-to-r from-navy/80 via-navy/30 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-navy via-transparent to-transparent" />
          </motion.div>
          
          <div className="absolute top-32 left-4 md:left-8 z-30">
            <Link to="/rooms" className="text-gold hover:text-white transition-colors uppercase tracking-widest text-caption bg-navy/50 px-4 py-2 rounded backdrop-blur-md border border-white/10">
              ← Back to Rooms
            </Link>
          </div>
          
          <div className="absolute inset-y-0 left-0 p-8 md:p-16 max-w-7xl mx-auto z-20 flex flex-col justify-center h-full w-full md:w-2/3">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-[1px] bg-gold" />
                <span className="font-body text-[10px] md:text-caption tracking-[0.4em] uppercase text-gold">Exclusive Selection</span>
              </div>
              
              <h1 className="font-display text-display-md md:text-display-2xl text-white mb-6 drop-shadow-2xl leading-[0.9]">
                {room.name.split(' ')[0]} <br />
                <span className="italic text-gold font-light">{room.name.split(' ').slice(1).join(' ')}</span>
              </h1>
              
              <p className="font-body text-body-lg text-white/90 mb-10 max-w-xl drop-shadow-md border-l-2 border-gold pl-6 py-2">
                {room.shortDescription}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 text-xs md:text-body-sm uppercase tracking-widest text-pearl font-medium">
                <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-6 py-3 rounded border border-white/10">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold" /> {typeof room.size === 'number' ? `${room.size} sq.ft` : room.size}
                </div>
                <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-6 py-3 rounded border border-white/10">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold" /> 2 Adults + 1 Child
                </div>
              </div>
            </motion.div>
          </div>
          
          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute bottom-8 left-8 z-20 flex items-center gap-4"
          >
            <div className="w-[1px] h-10 bg-gradient-to-b from-gold to-transparent" />
            <span className="font-body text-[9px] tracking-[0.3em] uppercase text-pearl/60" style={{ writingMode: 'vertical-rl' }}>Scroll</span>
          </motion.div>
        </section>
      ) : (
        <section className="relative h-[85vh] w-full bg-navy overflow-hidden">
          <motion.div 
            initial={{ scale: 1.05 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="absolute inset-0 w-full h-full"
          >
            <img 
              src={room.images.main} 
              alt={room.name} 
              className="w-full h-full object-cover opacity-70"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/40 to-transparent" />
          </motion.div>
          
          <div className="absolute top-32 left-4 md:left-8 z-30">
            <Link to="/rooms" className="text-gold hover:text-white transition-colors uppercase tracking-widest text-caption bg-navy/50 px-4 py-2 rounded backdrop-blur-md border border-white/10">
              ← Back to Rooms
            </Link>
          </div>
          
          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16 max-w-7xl mx-auto z-20 flex flex-col justify-end h-full">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="max-w-3xl"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-[1px] bg-gold" />
                <span className="font-body text-[10px] md:text-caption tracking-[0.3em] uppercase text-gold">Premium Accommodation</span>
              </div>
              
              <h1 className="font-display text-display-md md:text-display-xl text-white mb-4 drop-shadow-2xl">
                {room.name}
              </h1>
              
              <p className="font-body text-body-lg text-white/80 mb-8 max-w-2xl drop-shadow-md">
                {room.shortDescription}
              </p>
              
              <div className="flex flex-wrap gap-4 md:gap-8 text-xs md:text-body-sm uppercase tracking-widest text-pearl font-medium bg-black/20 backdrop-blur-md border border-white/10 py-3 px-6 rounded-full w-fit">
                <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-gold" /> {typeof room.size === 'number' ? `${room.size} sq.ft` : room.size}</span>
                <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-gold" /> 2 Adults + 1 Child</span>
                <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-gold" /> {room.bedType}</span>
              </div>
            </motion.div>
          </div>
        </section>
      )}
      {/* Content Section */}
      <section className="py-20 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-16 relative">
        
        {/* Main Details */}
        <div className="lg:col-span-2">
          <motion.div
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.8 }}
             className="mb-16"
          >
            <h2 className="font-display text-heading-lg text-navy mb-6">About this Room</h2>
            <p className="font-body text-body-lg text-navy-500/80 leading-relaxed mb-8 whitespace-pre-wrap">
              {room.description}
            </p>
          </motion.div>

          {/* Features Grid */}
          <motion.div
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.8 }}
             className="mb-16"
          >
            <h3 className="font-display text-heading-md text-navy mb-8">Room Features</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8">
              {room.features.map(feature => (
                <div key={feature} className="flex items-center gap-4 text-navy-500/80 bg-white p-4 rounded-sm shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-gold" />
                  <span className="font-body text-body-md">{feature}</span>
                </div>
              ))}
            </div>
          </motion.div>
          
           {/* Amenities Grid */}
           <motion.div
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.8 }}
          >
            <h3 className="font-display text-heading-md text-navy mb-8">Included Amenities</h3>
            <div className="flex flex-wrap gap-3">
              {room.amenities.map(amenity => (
                <span key={amenity} className="px-4 py-2 border border-navy/10 text-body-sm text-navy-500 rounded-full">
                  {amenity}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Detailed Categorized Sections */}
          {room.details && (
            <div className="space-y-16 mt-16 border-t border-navy/10 pt-16">
              
              {room.details.familyFriendly && (
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                  <h3 className="font-display text-heading-md text-navy mb-8 flex items-center gap-3">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gold"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                    Family-Friendly Amenities
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {room.details.familyFriendly.map(item => (
                      <div key={item} className="flex items-center gap-3 bg-white p-4 rounded-sm border border-navy/5">
                        <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
                        <span className="font-body text-body-md text-navy-500/80">{item}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {room.details.roomAmenities && (
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                  <h3 className="font-display text-heading-md text-navy mb-8 flex items-center gap-3">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gold"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
                    Room Amenities
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {room.details.roomAmenities.map(item => (
                      <span key={item} className="px-5 py-2.5 bg-navy-500/5 text-navy-500 font-body text-body-sm rounded-sm">
                        {item}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )}

              {room.details.includedInSuite && (
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                  <h3 className="font-display text-heading-md text-navy mb-8 flex items-center gap-3">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gold"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                    What's included in this suite?
                  </h3>
                  <ul className="space-y-4">
                    {room.details.includedInSuite.map(item => (
                      <li key={item} className="flex items-start gap-4 p-4 bg-white shadow-sm border-l-2 border-gold rounded-r-sm">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gold mt-0.5 shrink-0"><polyline points="20 6 9 17 4 12"/></svg>
                        <span className="font-body text-body-md text-navy-500">{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </div>
          )}

          {/* Room Gallery */}
          <motion.div
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.8 }}
             className="mt-20"
          >
            <h3 className="font-display text-heading-md text-navy mb-8">Room Gallery</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {room.images.gallery.map((img, idx) => (
                <div key={idx} className="relative aspect-video overflow-hidden rounded-sm group shadow-sm hover:shadow-xl transition-shadow duration-500">
                  <img 
                    src={img} 
                    alt={`${room.name} view ${idx + 1}`}
                    className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-[1.5s] ease-out" 
                  />
                  <div className="absolute inset-0 bg-navy/0 group-hover:bg-navy/10 transition-colors duration-500" />
                </div>
              ))}
            </div>
          </motion.div>

        </div>

        {/* Booking Sidebar (Sticky) */}
        <div className="lg:col-span-1">
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="sticky top-32 bg-white p-8 shadow-luxury border border-navy/5"
          >
            <div className="mb-8">
              <span className="text-body-sm uppercase tracking-widest text-navy-500/50 block mb-2">From</span>
              <div className="flex items-end gap-3">
                <span className="font-display text-display-sm text-gold leading-none">₹{room.offerPrice}</span>
                <span className="text-body-sm text-navy-500/50 mb-1 line-through">₹{room.actualPrice}</span>
              </div>
              <span className="text-caption text-navy-500/50 mt-2 block">Per night, excluding taxes</span>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex justify-between py-3 border-b border-navy/5">
                <span className="text-navy-500">Check-in</span>
                <span className="font-medium text-navy">12:00 PM</span>
              </div>
              <div className="flex justify-between py-3 border-b border-navy/5">
                <span className="text-navy-500">Check-out</span>
                <span className="font-medium text-navy">11:00 AM</span>
              </div>
            </div>

            <a 
              href={`https://wa.me/${CONTACT_CONFIG.whatsapp.replace(/[^0-9]/g, '')}?text=Hi, I would like to book the ${room.name} at ₹${room.offerPrice}/night.`} 
              target="_blank" 
              rel="noreferrer"
            >
              <LuxuryButton variant="primary" className="w-full">Reserve on WhatsApp</LuxuryButton>
            </a>
            
            <p className="text-center text-[10px] uppercase tracking-widest text-navy-500/40 mt-4 mb-6">
              Best Rate Guarantee
            </p>

            <div className="p-4 bg-navy/5 border border-navy/10 rounded-sm">
              <p className="text-body-sm text-navy mb-3 flex items-start gap-2">
                <span className="text-gold mt-1 text-xs">◆</span> 
                <span>Offer price is for <strong>2 adults and 1 child</strong>.</span>
              </p>
              <p className="text-body-sm text-navy mb-3 flex items-start gap-2">
                <span className="text-gold mt-1 text-xs">◆</span> 
                <span>Need extra beds or more persons? Customizations available! <a href={`tel:${CONTACT_CONFIG.phone}`} className="text-gold underline hover:text-gold-600 font-medium">Contact us now</a>.</span>
              </p>
              <div className="bg-gold/10 p-2.5 rounded border border-gold/30 mt-4">
                <p className="text-body-sm text-navy font-medium flex items-start gap-2">
                  <span className="text-gold mt-0.5">🍳</span> 
                  <span><strong className="text-gold-600">Breakfast</strong> is provided for just <strong>₹299</strong> only!</span>
                </p>
              </div>
            </div>
          </motion.div>
        </div>

      </section>
    </div>
  );
};

export default RoomDetails;
