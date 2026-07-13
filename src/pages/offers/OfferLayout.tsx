import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLenisScroll } from '../../hooks';
import { offersData } from '../../data/offers';
import { Countdown } from '../../components/offers/Countdown';
import { LuxuryButton } from '../../components/ui/Button';
import { CONTACT_CONFIG } from '../../config/contacts';

export const OfferLayout = () => {
  useLenisScroll();
  const { slug } = useParams<{ slug: string }>();
  const offer = offersData.find((o: any) => o.slug === slug);

  if (!offer) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="bg-pearl min-h-screen">
      
      {/* Hero Section */}
      <section className="relative h-[80vh] w-full bg-navy pt-24">
        <img 
          src={offer.image} 
          alt={offer.title} 
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/50 to-transparent" />
        
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto w-full"
          >
            <div className="inline-block bg-gold/10 border border-gold/30 px-6 py-2 rounded-full mb-8 backdrop-blur-md">
              <span className="font-body text-caption tracking-widest uppercase text-gold">Limited Time Offer</span>
            </div>
            
            <h1 className="font-display text-display-md md:text-display-lg text-pearl mb-12 drop-shadow-lg">
              {offer.title}
            </h1>

            <Countdown targetDate={offer.validUntil} />
          </motion.div>
        </div>
      </section>

      {/* Offer Details */}
      <section className="py-24 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-16 relative">
        
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-display text-heading-lg text-navy mb-6">Offer Details</h2>
            <p className="font-body text-body-lg text-navy-500/80 leading-relaxed mb-12">
              {offer.description}
            </p>

            <h3 className="font-display text-heading-md text-navy mb-6">What's Included</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 mb-12">
              {offer.features.map((feature: string) => (
                <li key={feature} className="flex items-center gap-3 text-navy-500">
                  <svg className="w-5 h-5 text-gold shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <h3 className="font-display text-heading-md text-navy mb-4">Terms & Conditions</h3>
            <ul className="list-disc pl-5 space-y-2 text-body-sm text-navy-500/70">
              {offer.terms.map((term: string, i: number) => (
                <li key={i}>{term}</li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Pricing Sidebar */}
        <div className="lg:col-span-1">
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="sticky top-32 bg-white p-8 shadow-luxury border border-navy/5"
          >
            <div className="text-center mb-8 pb-8 border-b border-navy/5">
              <span className="text-body-sm uppercase tracking-widest text-navy-500/50 block mb-4">Exclusive Price</span>
              <div className="flex flex-col items-center justify-center gap-2">
                <span className="text-heading-md text-navy-500/50 line-through">₹{offer.actualPrice}</span>
                <span className="font-display text-display-md text-gold leading-none">₹{offer.offerPrice}</span>
              </div>
              <span className="text-caption text-navy-500/50 mt-4 block">Inclusive of taxes & fees</span>
            </div>

            <a 
              href={`https://wa.me/${CONTACT_CONFIG.whatsapp.replace(/[^0-9]/g, '')}?text=Hi, I want to claim the ${offer.title} for ₹${offer.offerPrice}.`} 
              target="_blank" 
              rel="noreferrer"
            >
              <LuxuryButton variant="primary" className="w-full">Claim Offer Now</LuxuryButton>
            </a>
            
            <p className="text-center text-[10px] uppercase tracking-widest text-navy-500/40 mt-6">
              Offer expires when timer reaches zero
            </p>
          </motion.div>
        </div>

      </section>
    </div>
  );
};

export default OfferLayout;
