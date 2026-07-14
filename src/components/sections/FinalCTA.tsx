import React from 'react';
import { motion } from 'framer-motion';
import { LuxuryButton } from '../ui/Button';
import { CONTACT_CONFIG } from '../../config/contacts';

export const FinalCTA = () => {
  return (
    <section className="relative py-32 bg-navy overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full opacity-40">
        <img 
          src="https://1zn1w7lqhv0bhjja.public.blob.vercel-storage.com/rooms/poster.png" 
          alt="Night View" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/80 to-transparent" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="font-body text-caption tracking-[0.3em] uppercase text-gold block mb-6">
            Begin Your Journey
          </span>
          <h2 className="font-display text-display-md text-pearl mb-8 leading-tight">
            Ready for an Unforgettable <br className="hidden sm:block"/> Coastal Experience?
          </h2>
          <p className="font-body text-body-md text-pearl/70 mb-12 max-w-2xl mx-auto">
            Book your stay directly with us via WhatsApp to receive the best rates, exclusive offers, and priority service.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
            <a href={`https://wa.me/${CONTACT_CONFIG.whatsapp.replace(/[^0-9]/g, '')}?text=I would like to book a stay at Hotel Serene Praia.`} target="_blank" rel="noreferrer">
              <LuxuryButton size="xl" variant="primary">Book via WhatsApp</LuxuryButton>
            </a>
            <a href={`tel:${CONTACT_CONFIG.phone.replace(/[^0-9+]/g, '')}`}>
              <LuxuryButton size="xl" variant="primary">Call Reservations</LuxuryButton>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
