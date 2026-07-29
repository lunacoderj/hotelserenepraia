import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, ArrowLeft } from 'lucide-react';
import { useLenisScroll } from '../hooks';
import { SEOHead } from '../components/common/SEOHead';
import { LuxuryButton } from '../components/ui/Button';

export const NotFound = () => {
  useLenisScroll();

  return (
    <div className="bg-pearl min-h-screen flex items-center justify-center px-6 pt-24 pb-16">
      <SEOHead
        title="Page Not Found — Hotel Serene Praia"
        description="The page you are looking for does not exist. Return to Hotel Serene Praia to explore our rooms, offers, and attractions near Rushikonda Beach, Visakhapatnam."
        noindex={true}
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-2xl"
      >
        <div className="font-display text-[8rem] md:text-[12rem] leading-none text-navy/10 select-none mb-4">
          404
        </div>

        <h1 className="font-display text-heading-xl text-navy mb-4 -mt-12">
          Page Not Found
        </h1>

        <p className="font-body text-body-lg text-navy-500/70 mb-12 max-w-lg mx-auto">
          The page you are looking for may have been moved or no longer exists. 
          Explore our premium rooms, nearby attractions, and exclusive offers instead.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/">
            <LuxuryButton variant="primary" className="flex items-center gap-2">
              <Home className="w-4 h-4" />
              Back to Home
            </LuxuryButton>
          </Link>
          <Link to="/rooms">
            <LuxuryButton variant="outline" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              View Rooms
            </LuxuryButton>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;
