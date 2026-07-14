import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LuxuryButton } from '../ui/Button';
import { CONTACT_CONFIG } from '../../config/contacts';

export const QuickBooking = () => {
  const today = new Date().toISOString().split('T')[0];
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];
  
  const [checkIn, setCheckIn] = useState(today);
  const [checkOut, setCheckOut] = useState(tomorrow);
  const [guests, setGuests] = useState('2');
  const [room, setRoom] = useState('deluxe');

  const handleBooking = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    
    let message = 'Hello Hotel Serene Praia! I would like to check availability.';
    
    if (checkIn || checkOut) {
      message += `\n\nDates: ${checkIn || 'Any'} to ${checkOut || 'Any'}`;
    }
    
    const roomName = `${room.charAt(0).toUpperCase() + room.slice(1)} Room`;
    message += `\nGuests: ${guests}`;
    message += `\nPreference: ${roomName}`;
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${CONTACT_CONFIG.whatsapp.replace(/[^0-9]/g, '')}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section className="relative z-20 -mt-16 sm:-mt-24 px-4 sm:px-6 max-w-6xl mx-auto w-full">
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="glass rounded-sm p-2 shadow-luxury-lg"
      >
        <div className="bg-navy-600 border border-white/5 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          
          <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
            <div className="flex flex-col gap-1 border-r border-white/10 pr-4">
              <span className="text-[10px] tracking-widest uppercase text-pearl/50 font-body">Check In</span>
              <input 
                type="date" 
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="bg-transparent text-body-sm text-pearl outline-none [color-scheme:dark]" 
              />
            </div>
            <div className="flex flex-col gap-1 md:border-r border-white/10 pr-4">
              <span className="text-[10px] tracking-widest uppercase text-pearl/50 font-body">Check Out</span>
              <input 
                type="date" 
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="bg-transparent text-body-sm text-pearl outline-none [color-scheme:dark]" 
              />
            </div>
            <div className="flex flex-col gap-1 border-r border-white/10 pr-4">
              <span className="text-[10px] tracking-widest uppercase text-pearl/50 font-body">Guests</span>
              <select 
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                className="bg-transparent text-body-sm text-pearl outline-none appearance-none cursor-pointer"
              >
                <option value="2" className="text-navy">2 Guests</option>
                <option value="3" className="text-navy">3 Guests</option>
                <option value="4" className="text-navy">4 Guests</option>
              </select>
            </div>
            <div className="flex flex-col gap-1 pr-4">
              <span className="text-[10px] tracking-widest uppercase text-pearl/50 font-body">Room</span>
              <select 
                value={room}
                onChange={(e) => setRoom(e.target.value)}
                className="bg-transparent text-body-sm text-pearl outline-none appearance-none cursor-pointer"
              >
                <option value="deluxe" className="text-navy">Deluxe Room</option>
                <option value="premium" className="text-navy">Premium Room</option>
                <option value="suite" className="text-navy">Suite Room</option>
                <option value="executive" className="text-navy">Executive Room</option>
              </select>
            </div>
          </div>

          <div className="w-full md:w-auto">
            <a 
              href="#" 
              onClick={handleBooking}
              className="w-full inline-block"
            >
              <LuxuryButton variant="primary" className="w-full">Check Availability</LuxuryButton>
            </a>
          </div>

        </div>
      </motion.div>
    </section>
  );
};
