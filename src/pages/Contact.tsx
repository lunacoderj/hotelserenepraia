import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLenisScroll } from '../hooks';
import { CONTACT_CONFIG } from '../config/contacts';
import { Phone, Mail } from 'lucide-react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for React Leaflet missing icons issue
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const customMarker = new L.DivIcon({
  html: `
    <div class="flex flex-col items-center justify-center -ml-[30px] -mt-[70px] w-[60px] h-[90px] group cursor-pointer relative z-50">
      <div class="absolute -top-10 bg-navy text-pearl text-[10px] uppercase tracking-widest px-3 py-1.5 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none shadow-lg z-50">
        Hotel Serene Praia
      </div>
      <div class="w-16 h-16 rounded-full border-4 border-gold shadow-[0_10px_30px_rgba(0,0,0,0.5)] overflow-hidden bg-white relative z-10 flex-shrink-0 transition-transform duration-300 group-hover:scale-110">
        <img src='https://1zn1w7lqhv0bhjja.public.blob.vercel-storage.com/hotel-serene/building.png' class="w-full h-full object-cover object-[80%_center] scale-110" />
      </div>
      <div class="w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[16px] border-t-gold -mt-1 drop-shadow-md flex-shrink-0 z-0 transition-transform duration-300 group-hover:scale-110" />
    </div>
  `,
  className: 'custom-map-marker',
  iconSize: [0, 0],
  iconAnchor: [0, 0],
});

export const Contact = () => {
  useLenisScroll();

  return (
    <div className="bg-pearl min-h-screen pt-32 pb-24 text-navy font-body selection:bg-gold selection:text-white overflow-hidden relative">
      {/* Background Ambience */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gold/10 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-12 h-[1px] bg-gold" />
              <span className="font-body text-caption tracking-[0.3em] uppercase text-gold">Get in Touch</span>
              <div className="w-12 h-[1px] bg-gold" />
            </div>
            <h1 className="font-display text-5xl md:text-7xl text-navy mb-6">Contact Us</h1>
            <p className="font-body text-body-lg text-navy/70 max-w-2xl mx-auto font-light">
              We are here to assist you with your reservations and inquiries. Experience the pinnacle of coastal luxury.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 mb-24 items-center">
          
          {/* Left Column: Contact Details Cards */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-6"
          >
            {/* Phone Card */}
            <a href={`tel:${CONTACT_CONFIG.phone.replace(/[^0-9+]/g, '')}`} className="group p-8 rounded-2xl bg-white border border-navy/5 shadow-xl shadow-navy/5 hover:border-gold/30 hover:shadow-2xl hover:shadow-gold/10 transition-all duration-500 flex items-start gap-6">
              <div className="p-4 rounded-full bg-gold/10 text-gold group-hover:scale-110 transition-transform duration-500">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-display text-2xl text-navy mb-2">Reservations</h3>
                <p className="text-navy/60 mb-1">Call us directly</p>
                <p className="text-gold font-medium tracking-wide">{CONTACT_CONFIG.phone}</p>
              </div>
            </a>

            {/* Email Card */}
            <a href={`mailto:${CONTACT_CONFIG.email}`} className="group p-8 rounded-2xl bg-white border border-navy/5 shadow-xl shadow-navy/5 hover:border-gold/30 hover:shadow-2xl hover:shadow-gold/10 transition-all duration-500 flex items-start gap-6">
              <div className="p-4 rounded-full bg-gold/10 text-gold group-hover:scale-110 transition-transform duration-500">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-display text-2xl text-navy mb-2">Email Inquiries</h3>
                <p className="text-navy/60 mb-1">For general questions</p>
                <p className="text-gold font-medium tracking-wide">{CONTACT_CONFIG.email}</p>
              </div>
            </a>

            {/* Social & WhatsApp */}
            <div className="grid grid-cols-2 gap-6">
              <a href={`https://wa.me/${CONTACT_CONFIG.whatsapp.replace(/[^0-9]/g, '')}`} target="_blank" rel="noreferrer" className="group p-6 rounded-2xl bg-green-50 border border-green-200 shadow-xl shadow-green-900/5 hover:border-green-400 hover:shadow-2xl transition-all duration-500 flex flex-col items-center text-center gap-4">
                <div className="w-12 h-12 rounded-full bg-green-100 text-green-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                  <Phone className="w-5 h-5" />
                </div>
                <span className="text-navy tracking-widest uppercase text-xs font-semibold">WhatsApp</span>
              </a>
              <div className="flex flex-col gap-4">
                <a href={CONTACT_CONFIG.instagram} target="_blank" rel="noreferrer" className="flex-1 flex items-center justify-center gap-3 rounded-2xl bg-white border border-navy/5 shadow-lg shadow-navy/5 hover:border-gold/30 hover:text-gold hover:shadow-xl transition-all duration-300 group">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-navy group-hover:text-gold group-hover:scale-110 transition-all"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                  <span className="uppercase tracking-widest text-xs font-medium text-navy group-hover:text-gold transition-colors">Instagram</span>
                </a>
                <a href={CONTACT_CONFIG.facebook} target="_blank" rel="noreferrer" className="flex-1 flex items-center justify-center gap-3 rounded-2xl bg-white border border-navy/5 shadow-lg shadow-navy/5 hover:border-gold/30 hover:text-gold hover:shadow-xl transition-all duration-300 group">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-navy group-hover:text-gold group-hover:scale-110 transition-all"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                  <span className="uppercase tracking-widest text-xs font-medium text-navy group-hover:text-gold transition-colors">Facebook</span>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Leaflet Map */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative h-[600px] rounded-3xl overflow-hidden group shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-navy/10 bg-white"
          >
            <div className="absolute inset-0 z-0">
              <MapContainer 
                center={[CONTACT_CONFIG.lat, CONTACT_CONFIG.lng]} 
                zoom={15} 
                className="w-full h-full"
                scrollWheelZoom={false}
              >
                {/* We use CartoDB Voyager tiles for a premium bright, colorful aesthetic */}
                <TileLayer
                  url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                  attribution='&copy; <a href="https://carto.com/attributions">CARTO</a>'
                />
                <Marker position={[CONTACT_CONFIG.lat, CONTACT_CONFIG.lng]} icon={customMarker} />
              </MapContainer>
            </div>
            
            {/* Gradient Overlay for luxury feel */}
            <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent pointer-events-none z-10" />
            
            {/* Get Directions Button */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 pointer-events-auto">
              <a 
                href={CONTACT_CONFIG.mapLink}
                target="_blank"
                rel="noreferrer"
                className="inline-block px-8 py-3 bg-gold text-navy font-bold tracking-widest uppercase text-xs rounded-full hover:bg-gold-600 hover:scale-105 transition-all duration-300 shadow-[0_10px_20px_rgba(212,175,55,0.3)]"
              >
                Open in Google Maps
              </a>
            </div>
          </motion.div>
        </div>

        {/* Booking Form Section */}
        <motion.div
          id="book"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto bg-white rounded-3xl p-8 md:p-12 shadow-2xl border border-navy/5 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 rounded-full blur-[80px] pointer-events-none" />
          
          <div className="text-center mb-10">
            <h2 className="font-display text-4xl text-navy mb-4">Book Your Stay</h2>
            <p className="font-body text-navy/60">Fill out the details below to instantly send your reservation request via WhatsApp.</p>
          </div>

          <form 
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              const data = {
                name: formData.get('name'),
                mobile: formData.get('mobile'),
                aadhaar: formData.get('aadhaar'),
                people: formData.get('people'),
                room: formData.get('room'),
                checkIn: formData.get('checkIn'),
                checkOut: formData.get('checkOut'),
              };
              
              const message = `*Reservation Request*\n\n*Name (as per Aadhaar):* ${data.name}\n*Mobile:* ${data.mobile}\n*Aadhaar No:* ${data.aadhaar}\n*Guests:* ${data.people}\n*Room Type:* ${data.room}\n*Check-In:* ${data.checkIn}\n*Check-Out:* ${data.checkOut}`;
              
              const whatsappUrl = `https://wa.me/${CONTACT_CONFIG.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;
              window.open(whatsappUrl, '_blank');
            }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10"
          >
            <div className="flex flex-col gap-2">
              <label className="text-[10px] uppercase tracking-widest text-navy/60 font-bold">Name (As per Aadhaar) *</label>
              <input required name="name" type="text" className="w-full bg-pearl border border-navy/10 rounded-lg p-4 outline-none focus:border-gold transition-colors text-navy font-medium" placeholder="Full Legal Name" />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[10px] uppercase tracking-widest text-navy/60 font-bold">Mobile Number *</label>
              <input required name="mobile" type="tel" className="w-full bg-pearl border border-navy/10 rounded-lg p-4 outline-none focus:border-gold transition-colors text-navy font-medium" placeholder="+91 XXXXX XXXXX" />
            </div>

            <div className="flex flex-col gap-2 md:col-span-2">
              <label className="text-[10px] uppercase tracking-widest text-navy/60 font-bold">Aadhaar Number *</label>
              <input required name="aadhaar" type="text" className="w-full bg-pearl border border-navy/10 rounded-lg p-4 outline-none focus:border-gold transition-colors text-navy font-medium" placeholder="XXXX XXXX XXXX" />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[10px] uppercase tracking-widest text-navy/60 font-bold">Number of People *</label>
              <select required name="people" className="w-full bg-pearl border border-navy/10 rounded-lg p-4 outline-none focus:border-gold transition-colors text-navy font-medium appearance-none cursor-pointer">
                <option value="1">1 Person</option>
                <option value="2">2 Persons</option>
                <option value="3">3 Persons</option>
              </select>
              <span className="text-[10px] text-gold font-medium mt-1">* For extra persons ({">"}3), please contact us directly via Call.</span>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[10px] uppercase tracking-widest text-navy/60 font-bold">Room Type *</label>
              <select required name="room" className="w-full bg-pearl border border-navy/10 rounded-lg p-4 outline-none focus:border-gold transition-colors text-navy font-medium appearance-none cursor-pointer">
                <option value="Deluxe Room">Deluxe Room</option>
                <option value="Premium Room">Premium Room</option>
                <option value="Executive Room">Executive Room</option>
                <option value="Suite">Suite</option>
                <option value="Banquet Hall">Banquet Hall</option>
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[10px] uppercase tracking-widest text-navy/60 font-bold">Check-in Date *</label>
              <input required name="checkIn" type="date" className="w-full bg-pearl border border-navy/10 rounded-lg p-4 outline-none focus:border-gold transition-colors text-navy font-medium" />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[10px] uppercase tracking-widest text-navy/60 font-bold">Check-out Date *</label>
              <input required name="checkOut" type="date" className="w-full bg-pearl border border-navy/10 rounded-lg p-4 outline-none focus:border-gold transition-colors text-navy font-medium" />
            </div>

            <div className="md:col-span-2 mt-4">
              <button type="submit" className="w-full bg-gold hover:bg-gold-600 text-navy font-bold tracking-widest uppercase py-5 rounded-xl transition-colors shadow-lg flex justify-center items-center gap-2">
                Send Data to WhatsApp
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
              </button>
            </div>
          </form>
        </motion.div>

      </div>
    </div>
  );
};

export default Contact;
