import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LuxuryButton } from '../ui/Button';
import { CONTACT_CONFIG } from '../../config/contacts';
import { ChevronDown, Loader2 } from 'lucide-react';
import { supabase } from '../../admin/utils/supabaseClient';
import { useSiteStore } from '../../store/useSiteStore';

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
  const { rooms } = useSiteStore();
  
  const today = new Date().toISOString().split('T')[0];
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];
  
  const [checkIn, setCheckIn] = useState(today);
  const [checkOut, setCheckOut] = useState(tomorrow);
  const [guests, setGuests] = useState('2 Adults + 1 Child');
  const [duration, setDuration] = useState('Full Day');
  const [room, setRoom] = useState('deluxe');
  const [isChecking, setIsChecking] = useState(false);

  // Dynamic room options from the DB
  const roomOptions = rooms.length > 0 
    ? rooms.map(r => ({ value: r.seoSlug || r.id, label: r.title }))
    : [
        { value: 'deluxe', label: 'Deluxe Room' },
        { value: 'premium', label: 'Premium Room' },
        { value: 'suite', label: 'Suite Room' },
        { value: 'executive', label: 'Executive Room' },
      ];

  const selectedRoom = rooms.find(r => (r.seoSlug || r.id) === room);
  const isBanquet = selectedRoom?.title?.toLowerCase().includes('banquet') || room.includes('banquet');

  const handleBooking = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsChecking(true);
    
    try {
      const roomId = selectedRoom?.id || room;
      const queryCheckOut = isBanquet ? checkIn : checkOut;

      // 1. Get total physical inventory for this room type
      const { data: invData } = await supabase
        .from('inventory')
        .select('id')
        .eq('room_type_id', roomId)
        .neq('status', 'Maintenance');
        
      const totalInventory = invData?.length || 0;

      // 2. Get overlapping confirmed/pending bookings
      const { data: bookingsData } = await supabase
        .from('bookings')
        .select('number_of_rooms')
        .eq('room_type_id', roomId)
        .in('status', ['pending', 'confirmed'])
        .lte('check_in', queryCheckOut)
        .gte('check_out', checkIn);

      const bookedRooms = bookingsData?.reduce((sum, b) => sum + (b.number_of_rooms || 1), 0) || 0;

      const availableRooms = totalInventory - bookedRooms;

      if (availableRooms <= 0) {
        alert("Sorry, this room type is fully booked for your selected dates. Please try different dates or another room type.");
        setIsChecking(false);
        return;
      }

      // If available, proceed to WhatsApp
      let message = 'Hello Hotel Serene Praia! I would like to check availability.';
      if (isBanquet) {
        message += `\n\nDate: ${checkIn || 'Any'}`;
        message += `\nDuration: ${duration}`;
      } else {
        if (checkIn || checkOut) {
          message += `\n\nDates: ${checkIn || 'Any'} to ${checkOut || 'Any'}`;
        }
        message += `\nGuests: ${guests}`;
      }
      
      const roomName = selectedRoom?.title || `${room.charAt(0).toUpperCase() + room.slice(1)} Room`;
      message += `\nPreference: ${roomName}`;
      message += `\n\n(System shows ${availableRooms} available!)`;
      
      const encodedMessage = encodeURIComponent(message);
      const whatsappUrl = `https://wa.me/${CONTACT_CONFIG.whatsapp.replace(/[^0-9]/g, '')}?text=${encodedMessage}`;
      
      window.open(whatsappUrl, '_blank');
    } catch (err) {
      console.error(err);
      alert("Something went wrong while checking availability. Please contact us directly.");
    } finally {
      setIsChecking(false);
    }
  };

  const guestOptions = [
    { value: '2 Adults + 1 Child', label: '2 Adults + 1 Child' },
    { value: 'Custom (Contact Us)', label: 'Custom (Contact Us)' },
  ];

  const durationOptions = [
    { value: '3 Hours', label: '3 Hours' },
    { value: '6 Hours', label: '6 Hours' },
    { value: '9 Hours', label: '9 Hours' },
    { value: '12 Hours', label: '12 Hours' },
    { value: 'Full Day', label: 'Full Day' },
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
            
            {/* Check Out (Hidden for Banquets) */}
            {!isBanquet && (
              <div className="flex flex-col gap-1 border-r md:border-r border-white/10 pr-4">
                <span className="text-[10px] tracking-widest uppercase text-pearl/50 font-body">Check Out</span>
                <input 
                  type="date" 
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="bg-transparent text-body-sm text-pearl outline-none [color-scheme:dark] py-1" 
                />
              </div>
            )}
            
            {/* Dynamic Options based on type */}
            {isBanquet ? (
              <CustomDropdown 
                label="Duration" 
                options={durationOptions} 
                value={duration} 
                onChange={setDuration} 
                border={true}
              />
            ) : (
              <CustomDropdown 
                label="Guests" 
                options={guestOptions} 
                value={guests} 
                onChange={setGuests} 
                border={true}
              />
            )}
            
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
            <button 
              onClick={handleBooking}
              disabled={isChecking}
              className="w-full inline-block disabled:opacity-70"
            >
              <LuxuryButton variant="primary" className="w-full flex items-center justify-center gap-2">
                {isChecking ? <><Loader2 className="w-4 h-4 animate-spin" /> Checking...</> : 'Check Availability'}
              </LuxuryButton>
            </button>
          </div>

        </div>
        
        {/* Instant Contact Ribbon */}
        <div className="bg-navy-700/50 border-t border-white/5 p-3 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-[10px] md:text-xs font-body tracking-widest uppercase">
          <span className="text-pearl/50">Instant Reservations:</span>
          <div className="flex items-center gap-4">
            <a href={`tel:${CONTACT_CONFIG.phone}`} className="flex items-center gap-1.5 text-gold hover:text-gold-400 transition-colors">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              Landline
            </a>
            <span className="text-pearl/20">|</span>
            <a href={`https://wa.me/${CONTACT_CONFIG.whatsapp.replace(/[^0-9]/g, '')}`} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-[#25D366] hover:text-[#1ebd5a] transition-colors">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
              WhatsApp
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
