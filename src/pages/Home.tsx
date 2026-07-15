import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollTrigger, useLenisScroll } from '../hooks';
import { Hero } from '../components/sections/Hero';
import { QuickBooking } from '../components/sections/QuickBooking';
import { About } from '../components/sections/About';
import { LocationMap } from '../components/sections/LocationMap';
import { FeaturedRooms } from '../components/sections/FeaturedRooms';
import { Amenities } from '../components/sections/Amenities';
import { DiscoverMore } from '../components/sections/DiscoverMore';
import { AttractionsCarousel } from '../components/sections/AttractionsCarousel';
import { RestaurantsCarousel } from '../components/sections/RestaurantsCarousel';
import { FinalCTA } from '../components/sections/FinalCTA';

export const Home = () => {
  useLenisScroll();
  useScrollTrigger();
  const [selectedRoute, setSelectedRoute] = useState<{name: string, dest: string} | null>(null);

  return (
    <div className="bg-pearl min-h-screen">
      <Helmet>
        <title>Hotel Serene Praia Visakhapatnam | Beachfront hotels in Rushikonda</title>
        <meta name="description" content="Looking for beachfront hotels in Visakhapatnam? Hotel Serene Praia is the best 3-star hotel in Rushikonda, offering sea-view rooms and luxury suites near Rushikonda Beach and GITAM University Vizag." />
        <meta name="keywords" content="Hotel Serene Praia Visakhapatnam, Serene Praia Hotel Vizag, Best beach hotels in Visakhapatnam, Beachfront hotels in Visakhapatnam, Sea view rooms in Vizag, Top places to stay near Rushikonda Beach, Budget beach hotels in Rushikonda, Premium inns in Visakhapatnam, 3-star hotels in Pedda Rushikonda, Hotels near GITAM University Vizag, Best oceanfront accommodation in Andhra Pradesh" />
      </Helmet>
      <Hero />
      <QuickBooking />
      <About />
      <LocationMap />
      <FeaturedRooms />
      <Amenities />
      <DiscoverMore />
      <AttractionsCarousel />
      <RestaurantsCarousel onRouteSelect={setSelectedRoute} />
      <FinalCTA />

      {/* ─── FREE DIRECTIONS MODAL ─── */}
      <AnimatePresence>
        {selectedRoute && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedRoute(null)}
              className="absolute inset-0 bg-navy/90 backdrop-blur-lg cursor-pointer"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="bg-pearl w-full max-w-5xl h-[85vh] rounded-sm overflow-hidden shadow-2xl relative z-10 flex flex-col border border-gold/20"
            >
              <button 
                onClick={() => setSelectedRoute(null)}
                className="absolute top-6 right-6 w-12 h-12 bg-white shadow-xl rounded-full flex items-center justify-center text-navy hover:text-pearl hover:bg-gold hover:scale-110 z-20 transition-all duration-300 border border-navy/10"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 13L13 1M1 1L13 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              
              <div className="p-8 bg-white border-b border-navy/5 flex-shrink-0">
                <h3 className="font-display text-heading-md md:text-heading-lg text-navy mb-2">Directions to {selectedRoute.name}</h3>
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-gold animate-pulse shadow-[0_0_10px_rgba(212,175,55,0.8)]" />
                  <p className="font-body text-xs text-navy-500/80 uppercase tracking-widest font-medium">Routing from Hotel Serene Praia</p>
                </div>
              </div>
              
              <div className="w-full flex-grow relative bg-navy/5">
                <iframe 
                  width="100%" 
                  height="100%" 
                  frameBorder="0" 
                  style={{ border: 0 }}
                  src={`https://maps.google.com/maps?saddr=${encodeURIComponent('Hotel Serene Praia, Visakhapatnam')}&daddr=${encodeURIComponent(selectedRoute.dest)}&output=embed`}
                  allowFullScreen
                  title={`Directions to ${selectedRoute.name}`}
                  className="absolute inset-0 grayscale-[20%] contrast-125"
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Home;
