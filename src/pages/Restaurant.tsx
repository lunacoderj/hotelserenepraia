import React from 'react';
import { motion } from 'framer-motion';
import { useLenisScroll } from '../hooks';
import { LuxuryButton } from '../components/ui/Button';
import { CONTACT_CONFIG } from '../config/contacts';

const menuHighlights = [
  { name: 'Grilled Sea Bass', desc: 'Fresh local catch with lemon butter sauce.', price: '₹950' },
  { name: 'Lobster Thermidor', desc: 'Classic French dish with rich cream sauce.', price: '₹1,800' },
  { name: 'Mushroom Risotto', desc: 'Arborio rice with wild mushrooms and truffle oil.', price: '₹650' },
  { name: 'Andhra Chicken Curry', desc: 'Spicy, authentic local delicacy with parotta.', price: '₹550' },
];

export const Restaurant = () => {
  useLenisScroll();

  return (
    <div className="bg-pearl min-h-screen">
      <section className="relative h-[60vh] w-full bg-navy">
        <img 
          src="https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=1974&auto=format&fit=crop" 
          alt="Restaurant Fine Dining" 
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-pearl via-transparent to-transparent" />
        
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16 max-w-7xl mx-auto z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-8 h-[1px] bg-gold" />
              <span className="font-body text-caption tracking-[0.2em] uppercase text-gold">Dining</span>
            </div>
            <h1 className="font-display text-display-lg md:text-display-xl text-navy mb-4 drop-shadow-lg">Ocean View Restaurant</h1>
            <p className="text-body-md text-navy-500 max-w-2xl font-medium">
              Experience culinary excellence with breathtaking views of the Bay of Bengal.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-display text-heading-xl text-navy mb-6">A Symphony of Flavors</h2>
            <p className="font-body text-body-lg text-navy-500/80 leading-relaxed mb-8">
              Our executive chef crafts each dish as a masterpiece, blending local ingredients with international culinary techniques. Whether you crave authentic Andhra spices, fresh coastal seafood, or continental classics, our menu promises an unforgettable journey for your palate.
            </p>
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div>
                <span className="block font-body text-caption uppercase tracking-widest text-navy-500/50 mb-1">Breakfast</span>
                <span className="font-medium text-navy">7:00 AM - 10:30 AM</span>
              </div>
              <div>
                <span className="block font-body text-caption uppercase tracking-widest text-navy-500/50 mb-1">Dinner</span>
                <span className="font-medium text-navy">7:00 PM - 11:00 PM</span>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="h-[500px] overflow-hidden rounded-sm"
          >
            <img 
              src="https://images.unsplash.com/photo-1414235077428-338988a2e8c0?q=80&w=2070&auto=format&fit=crop" 
              alt="Culinary Creation" 
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-white p-8 md:p-12 shadow-luxury border border-navy/5"
        >
          <div className="text-center mb-12">
            <h2 className="font-display text-heading-lg text-navy mb-4">Chef's Signatures</h2>
            <p className="text-body-sm text-navy-500/70">A glimpse into our curated menu.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-8">
            {menuHighlights.map((item, i) => (
              <div key={i} className="flex justify-between border-b border-navy/5 pb-4">
                <div>
                  <h4 className="font-display text-heading-sm text-navy mb-1">{item.name}</h4>
                  <p className="font-body text-caption text-navy-500/60">{item.desc}</p>
                </div>
                <span className="font-medium text-gold">{item.price}</span>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
             <a 
              href={`https://wa.me/${CONTACT_CONFIG.whatsapp.replace(/[^0-9]/g, '')}?text=Hi, I would like to reserve a table at the restaurant.`} 
              target="_blank" 
              rel="noreferrer"
            >
              <LuxuryButton variant="primary">Reserve a Table</LuxuryButton>
            </a>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Restaurant;
