import React from 'react';
import { motion } from 'framer-motion';

const amenities = [
  { icon: '🌊', title: 'Beach Proximity', desc: 'Located beautifully near the pristine beach.' },
  { icon: '📶', title: 'High-Speed Wi-Fi', desc: 'Complimentary high-speed internet across the property.' },
  { icon: '❄️', title: 'Air-Conditioned', desc: 'Fully air-conditioned rooms for your comfort.' },
  { icon: '🛎️', title: 'Professional Hospitality', desc: 'Dedicated staff ensuring a perfect stay.' },
  { icon: '🛋️', title: 'Waiting Lounge', desc: 'Comfortable reception and waiting areas.' },
  { icon: '🛁', title: 'Modern Bathrooms', desc: 'Premium, hygienic, and modern attached bathrooms.' },
];

export const Amenities = () => {
  return (
    <section className="py-24 bg-pearl relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-8 h-[1px] bg-gold" />
            <span className="font-body text-caption tracking-[0.2em] uppercase text-gold">Resort Features</span>
            <div className="w-8 h-[1px] bg-gold" />
          </div>
          <h2 className="font-display text-heading-xl text-navy">Curated Amenities</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {amenities.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-8 rounded-sm border border-navy/5 hover:border-gold/30 hover:shadow-luxury transition-all duration-300 group"
            >
              <div className="text-display-md mb-6 transform group-hover:scale-110 transition-transform duration-300">
                {item.icon}
              </div>
              <h3 className="font-display text-heading-md text-navy mb-3">{item.title}</h3>
              <p className="font-body text-body-sm text-navy-500/70">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
