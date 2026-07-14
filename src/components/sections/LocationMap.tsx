import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { CONTACT_CONFIG } from '../../config/contacts';

// Fix for React Leaflet missing icons issue
if (typeof window !== 'undefined') {
  delete (L.Icon.Default.prototype as any)._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  });
}

// Custom Icons
const createCustomIcon = (imageUrl: string, label: string, imageClass: string = "object-cover") => new L.DivIcon({
  html: `
    <div class="flex flex-col items-center justify-center -ml-[30px] -mt-[70px] w-[60px] h-[90px] group cursor-pointer relative z-50">
      <div class="absolute -top-10 bg-navy text-pearl text-[10px] uppercase tracking-widest px-3 py-1.5 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none shadow-lg z-50">
        ${label}
      </div>
      <div class="w-16 h-16 rounded-full border-4 border-gold shadow-[0_10px_30px_rgba(0,0,0,0.5)] overflow-hidden bg-white relative z-10 flex-shrink-0 transition-transform duration-300 group-hover:scale-110">
        <img src="${imageUrl}" class="w-full h-full ${imageClass} scale-110" />
      </div>
      <div class="w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[16px] border-t-gold -mt-1 drop-shadow-md flex-shrink-0 z-0 transition-transform duration-300 group-hover:scale-110" />
    </div>
  `,
  className: 'custom-map-marker',
  iconSize: [0, 0],
  iconAnchor: [0, 0],
});

const hotelIcon = createCustomIcon('https://1zn1w7lqhv0bhjja.public.blob.vercel-storage.com/hotel-serene/building.png', 'Hotel Serene Praia', 'object-cover object-[80%_center]');
const rushikondaIcon = createCustomIcon('https://1zn1w7lqhv0bhjja.public.blob.vercel-storage.com/hotel-serene/rushikondabeach.jpg', 'Rushikonda Beach');
const thotlakondaIcon = createCustomIcon('https://1zn1w7lqhv0bhjja.public.blob.vercel-storage.com/hotel-serene/Thotlakonda-Beach.png', 'Thotlakonda Beach');

export const LocationMap = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return <div className="h-[600px] w-full bg-navy/5 animate-pulse rounded-3xl" />;

  return (
    <section className="py-24 bg-pearl relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="w-12 h-[1px] bg-gold" />
              <span className="font-body text-caption tracking-[0.2em] uppercase text-gold">Location</span>
              <div className="w-12 h-[1px] bg-gold" />
            </div>
            <h2 className="font-display text-4xl md:text-5xl text-navy mb-4">Our Premium Coastal Location</h2>
            <p className="font-body text-body-md text-navy-500/70 max-w-2xl mx-auto">
              Strategically located in Rushikonda, offering seamless access to major beaches and coastal attractions.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative h-[600px] rounded-3xl overflow-hidden group shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-navy/10 bg-white"
        >
          <div className="absolute inset-0 z-0">
            <MapContainer 
              center={[17.803, 83.399]} 
              zoom={13} 
              className="w-full h-full"
              scrollWheelZoom={false}
            >
              <TileLayer
                url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                attribution='&copy; CARTO'
              />
              <Marker position={[CONTACT_CONFIG.lat, CONTACT_CONFIG.lng]} icon={hotelIcon}>
                <Popup className="font-body text-sm text-navy"><strong>Hotel Serene Praia</strong><br/>Your luxury destination</Popup>
              </Marker>
              <Marker position={[17.7820, 83.3855]} icon={rushikondaIcon}>
                <Popup className="font-body text-sm text-navy"><strong>Rushikonda Beach</strong><br/>Famous tourist spot</Popup>
              </Marker>
              <Marker position={[17.8219666, 83.4159344]} icon={thotlakondaIcon}>
                <Popup className="font-body text-sm text-navy"><strong>Thotlakonda Beach</strong><br/>Serene coastal views</Popup>
              </Marker>
            </MapContainer>
          </div>
          
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent pointer-events-none z-10" />
          
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
    </section>
  );
};
