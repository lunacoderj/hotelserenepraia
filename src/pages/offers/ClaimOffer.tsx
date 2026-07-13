import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Wifi, Tv, Wind, Coffee, Bath, Car, Utensils, Music, Waves, Check } from 'lucide-react';
import { offersData } from '../../data/offers';
import { roomsData } from '../../data/rooms';
import { CONTACT_CONFIG } from '../../config/contacts';

const getIconForAmenity = (feature: string) => {
  const text = feature.toLowerCase();
  if (text.includes('wifi') || text.includes('wi-fi')) return <Wifi className="w-5 h-5" />;
  if (text.includes('tv') || text.includes('smart led')) return <Tv className="w-5 h-5" />;
  if (text.includes('ac') || text.includes('air condition')) return <Wind className="w-5 h-5" />;
  if (text.includes('kettle') || text.includes('breakfast')) return <Coffee className="w-5 h-5" />;
  if (text.includes('bath') || text.includes('shower')) return <Bath className="w-5 h-5" />;
  if (text.includes('park')) return <Car className="w-5 h-5" />;
  if (text.includes('restaurant')) return <Utensils className="w-5 h-5" />;
  if (text.includes('banquet')) return <Music className="w-5 h-5" />;
  if (text.includes('beach') || text.includes('sea view')) return <Waves className="w-5 h-5" />;
  return <Check className="w-5 h-5" />;
};

// Golden Particles Background Component
const GoldenParticles = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
    {Array.from({ length: 30 }).map((_, i) => (
      <motion.div
        key={i}
        className="absolute rounded-full bg-gold/60"
        style={{
          width: Math.random() * 4 + 2 + 'px',
          height: Math.random() * 4 + 2 + 'px',
          boxShadow: '0 0 10px rgba(212, 175, 55, 0.8)',
        }}
        initial={{
          opacity: 0,
          y: '100vh',
          x: Math.random() * 100 + 'vw',
        }}
        animate={{
          opacity: [0, 1, 1, 0],
          y: '-20vh',
          x: `calc(${Math.random() * 100}vw + ${Math.random() * 50 - 25}px)`,
        }}
        transition={{
          duration: Math.random() * 5 + 5,
          repeat: Infinity,
          delay: Math.random() * 5,
          ease: 'linear',
        }}
      />
    ))}
  </div>
);

export const ClaimOffer = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [phase, setPhase] = useState<'loading' | 'hero' | 'form' | 'success'>('loading');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    checkIn: '',
    checkOut: '',
    arrivalTime: '',
    adults: '2',
    children: '0',
    rooms: '1',
    specialRequest: ''
  });

  const offer = offersData.find(o => o.id === id);
  const roomDetails = roomsData.find(r => r.id === id);
  
  const amenities = roomDetails ? roomDetails.amenities : offer?.features || [];
  const gallery = roomDetails?.images?.gallery || (offer ? [offer.image] : []);

  useEffect(() => {
    if (!offer) {
      navigate('/');
      return;
    }
    const timer = setTimeout(() => {
      setPhase('hero');
    }, 3500); // Cinematic sequence length
    return () => clearTimeout(timer);
  }, [offer, navigate]);

  if (!offer) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setPhase('success');
    
    setTimeout(() => {
      const text = `Hello Hotel Serene Praia,\n\nI would like to claim the Instagram Exclusive Offer.\n\nRoom: ${offer.title}\n\nName: ${formData.name}\nPhone: ${formData.phone}\nGuests: ${formData.adults} Adults, ${formData.children} Children\nRooms: ${formData.rooms}\nCheck-in: ${formData.checkIn}\nCheck-out: ${formData.checkOut}\nArrival Time: ${formData.arrivalTime}\nSpecial Request: ${formData.specialRequest || 'None'}\n\nPlease confirm availability.\n\nThank you.`;
      const whatsappUrl = `https://wa.me/${CONTACT_CONFIG.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(text)}`;
      window.location.href = whatsappUrl;
    }, 2500);
  };

  const calcNights = () => {
    if (!formData.checkIn || !formData.checkOut) return 1;
    const diffTime = Math.abs(new Date(formData.checkOut).getTime() - new Date(formData.checkIn).getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;
  };

  const nights = calcNights();

  return (
    <div className="min-h-screen bg-[#050B14] text-pearl font-body overflow-x-hidden selection:bg-gold selection:text-navy">
      <AnimatePresence mode="wait">
        {/* PHASE 1: LOADING */}
        {phase === 'loading' && (
          <motion.div
            key="loading"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#02050A]"
          >
            <GoldenParticles />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="mb-8"
            >
              <h1 className="font-display text-4xl text-pearl tracking-widest uppercase">
                Hotel Serene Praia
              </h1>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 1 }}
              className="relative p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 text-center shadow-[0_0_50px_rgba(212,175,55,0.1)]"
            >
              <p className="text-gold tracking-[0.2em] text-sm uppercase mb-2">Exclusive Offer</p>
              <h2 className="font-display text-2xl text-pearl">You've unlocked VIP Access</h2>
            </motion.div>
          </motion.div>
        )}

        {/* PHASE 2 & 3: HERO & FORM */}
        {(phase === 'hero' || phase === 'form') && (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative min-h-screen"
          >
            {/* Background Parallax */}
            <div className="fixed inset-0 z-0 pointer-events-none">
              <motion.img 
                src={offer.image} 
                alt="Room" 
                className="w-full h-full object-cover"
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 10, ease: "linear" }}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-[#050B14]/80 via-[#050B14]/60 to-[#050B14]/95 backdrop-blur-sm" />
            </div>
            
            <GoldenParticles />

            <div className="relative z-10 max-w-7xl mx-auto px-4 py-12 md:py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
              
              {/* Left Column: Offer Details */}
              <div className="flex flex-col justify-center">
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                >
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/10 border border-gold/30 text-gold text-xs uppercase tracking-widest mb-6 animate-pulse">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold shadow-[0_0_5px_#d4af37]"></span>
                    Instagram Exclusive
                  </div>
                  
                  <h1 className="font-display text-5xl md:text-7xl mb-4 leading-none">{offer.title}</h1>
                  
                  <div className="flex items-baseline gap-4 mb-8">
                    <span className="text-4xl md:text-5xl font-display text-gold">₹{offer.offerPrice}</span>
                    <span className="text-lg md:text-xl text-white/40 line-through">₹{offer.actualPrice}</span>
                  </div>
                </motion.div>

                {/* Auto Sliding Gallery */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                  className="mb-10 rounded-2xl overflow-hidden h-64 md:h-80 relative shadow-2xl border border-white/10"
                >
                  <motion.div 
                    className="flex h-full w-max"
                    animate={{ x: ["0%", `-${(gallery.length - 1) * 100 / gallery.length}%`] }}
                    transition={{ repeat: Infinity, duration: gallery.length * 3, ease: "linear", repeatType: "reverse" }}
                  >
                    {gallery.map((img, i) => (
                      <div key={i} className="h-full" style={{ width: '100vw', maxWidth: '600px' }}>
                        <img src={img} className="w-full h-full object-cover" alt="" />
                      </div>
                    ))}
                  </motion.div>
                </motion.div>

                {/* Amenities */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="grid grid-cols-2 md:grid-cols-3 gap-4"
                >
                  {amenities.map((item, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-gold/30 transition-all hover:-translate-y-1 group">
                      <div className="text-gold/70 group-hover:text-gold transition-colors">{getIconForAmenity(item)}</div>
                      <span className="text-sm text-pearl/80">{item}</span>
                    </div>
                  ))}
                </motion.div>
              </div>

              {/* Right Column: Booking Form */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="flex items-center"
              >
                <div className="w-full bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 md:p-10 shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-gold/10 rounded-full blur-[80px] -z-10 transform translate-x-1/2 -translate-y-1/2" />
                  
                  <h3 className="font-display text-3xl mb-6 text-gold">Claim & Book</h3>
                  
                  <form onSubmit={handleBooking} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="col-span-2">
                        <label className="text-xs uppercase tracking-widest text-white/50 mb-1 block">Full Name</label>
                        <input required type="text" name="name" onChange={handleInputChange} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold/50 transition-colors" />
                      </div>
                      <div className="col-span-2">
                        <label className="text-xs uppercase tracking-widest text-white/50 mb-1 block">Phone Number</label>
                        <input required type="tel" name="phone" onChange={handleInputChange} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold/50 transition-colors" />
                      </div>
                      <div>
                        <label className="text-xs uppercase tracking-widest text-white/50 mb-1 block">Check-in</label>
                        <input required type="date" name="checkIn" onChange={handleInputChange} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold/50 transition-colors [color-scheme:dark]" />
                      </div>
                      <div>
                        <label className="text-xs uppercase tracking-widest text-white/50 mb-1 block">Check-out</label>
                        <input required type="date" name="checkOut" onChange={handleInputChange} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold/50 transition-colors [color-scheme:dark]" />
                      </div>
                      <div>
                        <label className="text-xs uppercase tracking-widest text-white/50 mb-1 block">Adults</label>
                        <select name="adults" onChange={handleInputChange} value={formData.adults} className="w-full bg-[#1A1F29] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold/50 transition-colors">
                          {[1,2,3,4,5].map(n => <option key={n} value={n}>{n}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="text-xs uppercase tracking-widest text-white/50 mb-1 block">Rooms</label>
                        <select name="rooms" onChange={handleInputChange} value={formData.rooms} className="w-full bg-[#1A1F29] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold/50 transition-colors">
                          {[1,2,3,4].map(n => <option key={n} value={n}>{n}</option>)}
                        </select>
                      </div>
                    </div>

                    {/* Summary Card */}
                    <div className="mt-6 p-4 rounded-xl bg-gold/10 border border-gold/20 flex flex-wrap justify-between items-center gap-4">
                      <div>
                        <p className="text-[10px] uppercase tracking-widest text-gold/70">Total Summary</p>
                        <p className="font-display text-lg">{formData.rooms}x {offer.title}</p>
                        <p className="text-xs text-white/70">{formData.adults} Guests • {nights} Nights</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] uppercase tracking-widest text-gold/70">Total Rate / Night</p>
                        <p className="font-display text-2xl text-gold">₹{offer.offerPrice * Number(formData.rooms)}</p>
                      </div>
                    </div>

                    <button type="submit" className="w-full mt-4 py-4 rounded-xl bg-gradient-to-r from-gold to-yellow-600 text-[#050B14] font-bold tracking-widest uppercase text-sm hover:scale-[1.02] active:scale-[0.98] transition-transform shadow-[0_10px_20px_rgba(212,175,55,0.3)] relative overflow-hidden group">
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        Claim Offer & Book via WhatsApp
                      </span>
                      <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity" />
                    </button>
                  </form>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* PHASE 4: SUCCESS */}
        {phase === 'success' && (
          <motion.div
            key="success"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#050B14]"
          >
            <GoldenParticles />
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", damping: 15 }}
              className="w-24 h-24 rounded-full bg-gold/20 flex items-center justify-center mb-6 border border-gold"
            >
              <Check className="w-12 h-12 text-gold" />
            </motion.div>
            <h2 className="font-display text-3xl mb-2">Offer Claimed!</h2>
            <p className="text-white/60">Opening WhatsApp to confirm your booking...</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
