import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { LuxuryButton } from '../ui/Button';
import { Link } from 'react-router-dom';

export const RestaurantPreview = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

  return (
    <section ref={containerRef} className="py-24 bg-navy relative overflow-hidden h-[800px] flex items-center">
      <motion.div 
        style={{ y }}
        className="absolute inset-0 w-full h-[140%] -top-[20%]"
      >
        <img 
          src="https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=1974&auto=format&fit=crop" 
          alt="Restaurant Fine Dining" 
          className="w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-navy/60" />
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-[1px] bg-gold" />
              <span className="font-body text-caption tracking-[0.2em] uppercase text-gold">Culinary Journey</span>
            </div>
            <h2 className="font-display text-display-md text-pearl mb-6">Savor the <br/> Taste of Luxury</h2>
            <p className="font-body text-body-md text-pearl/70 mb-8 max-w-md">
              Indulge in a world-class dining experience. Our master chefs craft exquisite dishes using the freshest local ingredients, served in an ambiance of refined elegance overlooking the ocean.
            </p>
            <Link to="/restaurant">
              <LuxuryButton variant="primary">Discover Menu</LuxuryButton>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
