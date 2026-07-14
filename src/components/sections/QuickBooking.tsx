import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LuxuryButton } from '../ui/Button';
import { CONTACT_CONFIG } from '../../config/contacts';
import { ChevronDown } from 'lucide-react';

const CustomDropdown = ({ label, options, value, onChange, border = true }: { label: string, options: {value: string, label: string}[], value: string, onChange: (val: string) => void, border?: boolean }) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedOption = options.find(o => o.value === value) || options[0];

  return (
    <div className={`flex flex-col gap-1 pr-4 relative w-full ${border ? 'md:border-r border-white/10' : ''}`} ref={ref}>
      <span className="text-[10px] tracking-widest uppercase text-pearl/50 font-body">{label}</span>
      <button 
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full text-left bg-transparent text-body-sm text-pearl group py-1 outline-none"
      >
        <span className="relative">
          {selectedOption.label}
          <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-gold group-hover:w-full transition-all duration-300"></span>
        </span>
        <ChevronDown className={`w-4 h-4 text-pearl/50 group-hover:text-gold transition-all duration-300 ${isOpen ? 'rotate-180 text-gold' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-full left-0 mt-4 w-48 bg-[#0a1120] border border-gold/20 rounded-xl shadow-[0_20px_40px_rgba(0,0,0,0.5)] overflow-hidden z-50 backdrop-blur-xl"
          >
            {options.map((opt) => (
              <button
                key={opt.value}
                onClick={() => { onChange(opt.value); setIsOpen(false); }}
                className={`w-full text-left px-5 py-3.5 text-sm transition-all duration-300 ${
                  value === opt.value ? 'bg-gold/10 text-gold font-medium border-l-2 border-gold' : 'text-pearl/80 hover:bg-white/5 hover:text-pearl border-l-2 border-transparent hover:border-gold/30'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

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

  const guestOptions = [
    { value: '2', label: '2 Guests' },
    { value: '3', label: '3 Guests' },
    { value: '4', label: '4 Guests' },
  ];

  const roomOptions = [
    { value: 'deluxe', label: 'Deluxe Room' },
    { value: 'premium', label: 'Premium Room' },
    { value: 'suite', label: 'Suite Room' },
    { value: 'executive', label: 'Executive Room' },
  ];

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
            {/* Check In */}
            <div className="flex flex-col gap-1 border-r border-white/10 pr-4">
              <span className="text-[10px] tracking-widest uppercase text-pearl/50 font-body">Check In</span>
              <input 
                type="date" 
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="bg-transparent text-body-sm text-pearl outline-none [color-scheme:dark] py-1" 
              />
            </div>
            
            {/* Check Out */}
            <div className="flex flex-col gap-1 border-r md:border-r border-white/10 pr-4">
              <span className="text-[10px] tracking-widest uppercase text-pearl/50 font-body">Check Out</span>
              <input 
                type="date" 
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="bg-transparent text-body-sm text-pearl outline-none [color-scheme:dark] py-1" 
              />
            </div>
            
            {/* Guests Custom Dropdown */}
            <CustomDropdown 
              label="Guests" 
              options={guestOptions} 
              value={guests} 
              onChange={setGuests} 
              border={true}
            />
            
            {/* Room Custom Dropdown */}
            <CustomDropdown 
              label="Room" 
              options={roomOptions} 
              value={room} 
              onChange={setRoom} 
              border={false}
            />
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
