import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { LuxuryButton } from '../ui/Button';

const FloatingParticles = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          initial={{
            y: Math.random() * 100 + "%",
            x: Math.random() * 100 + "%",
            opacity: Math.random() * 0.4 + 0.1,
            scale: Math.random() * 0.5 + 0.5,
          }}
          animate={{
            y: [null, `${Math.random() * 100}%`],
            x: [null, `${Math.random() * 100}%`],
            opacity: [null, Math.random() * 0.4 + 0.1],
          }}
          transition={{
            duration: Math.random() * 20 + 20,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "linear",
          }}
          className="absolute w-1 h-1 bg-gold rounded-full"
        />
      ))}
    </div>
  );
};

export const About = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const cardY = useTransform(scrollYProgress, [0, 1], ["15%", "-15%"]);
  const badgeY = useTransform(scrollYProgress, [0, 1], ["30%", "-30%"]);

  return (
    <section id="about" ref={containerRef} className="relative w-full overflow-hidden bg-navy flex flex-col lg:block lg:h-screen">
      
      {/* Background Parallax Image */}
      <motion.div 
        style={{ y: bgY }}
        className="relative h-[60vh] lg:absolute lg:inset-0 w-full lg:h-[105%] lg:-top-[2.5%] z-0"
      >
        <img 
          src='https://1zn1w7lqhv0bhjja.public.blob.vercel-storage.com/hotel-serene/building.png' 
          alt="Hotel Serene Praia Exterior" 
          className="w-full h-full object-cover object-center"
        />
        {/* Soft overlay to ensure text readability */}
        <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-navy lg:from-navy/90 via-navy/40 lg:via-navy/40 to-transparent" />
      </motion.div>

      {/* Particles */}
      <FloatingParticles />

      <div className="max-w-7xl mx-auto px-4 lg:px-6 w-full relative z-20 flex flex-col justify-center lg:h-full -mt-24 lg:mt-0 pb-24 lg:pb-0">
        
        {/* Glassmorphic Text Card (Positioned in the Sky Area - Top Left) */}
        <motion.div 
          style={{ y: cardY }}
          className="w-full max-w-2xl bg-navy/40 backdrop-blur-xl border border-white/10 p-6 sm:p-8 md:p-14 rounded-sm shadow-[0_30px_60px_-15px_rgba(0,0,0,0.9)]"
        >
          <div className="flex items-center gap-4 mb-4 md:mb-6">
            <div className="w-8 md:w-12 h-[1px] bg-gold" />
            <span className="font-body text-[10px] md:text-caption tracking-[0.2em] uppercase text-gold">Hotel Serene Praia Rooms & Banquet Halls</span>
          </div>
          
          <h2 className="font-display text-heading-lg sm:text-heading-xl md:text-[3.5rem] text-pearl leading-[1.1] mb-4 md:mb-6">
            A Sanctuary of <br/> <span className="text-gold italic">Luxury & Tranquility</span>
          </h2>
          
          <p className="font-body text-body-md text-pearl/80 leading-relaxed mb-10 font-light">
            Nestled along the pristine coastline of Rushikonda, Hotel Serene Praia offers an unparalleled blend of architectural elegance and natural beauty. Every detail is crafted to provide a sanctuary where modern luxury meets coastal charm.
          </p>

          <div className="grid grid-cols-2 gap-4 sm:gap-8 mb-8 md:mb-10 border-t border-white/10 pt-6 md:pt-8">
            <div>
              <span className="block font-display text-heading-md sm:text-heading-lg text-pearl mb-1">4<span className="text-gold">+</span></span>
              <span className="font-body text-[8px] sm:text-[10px] uppercase tracking-widest text-pearl/60">Luxury Categories</span>
            </div>
            <div>
              <span className="block font-display text-heading-md sm:text-heading-lg text-pearl mb-1">21<span className="text-gold">+</span></span>
              <span className="font-body text-[8px] sm:text-[10px] uppercase tracking-widest text-pearl/60">Rooms</span>
            </div>
            <div>
              <span className="block font-display text-heading-md sm:text-heading-lg text-pearl mb-1">5<span className="text-gold">★★★★★</span></span>
              <span className="font-body text-[8px] sm:text-[10px] uppercase tracking-widest text-pearl/60">Service Quality</span>
            </div>
          </div>

          <Link to="/about" className="inline-block relative z-10 w-full sm:w-auto">
            <LuxuryButton variant="primary" className="w-full sm:w-auto text-center justify-center">Discover Our Story</LuxuryButton>
          </Link>
        </motion.div>

        {/* Decorative Floating Badge (Bottom Right) */}
        <motion.div 
          style={{ y: badgeY }}
          initial={{ opacity: 0, scale: 0.8, rotate: -15 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 1, type: "spring" }}
          className="absolute bottom-4 right-2 lg:bottom-12 lg:right-0 xl:-right-10 w-24 h-24 lg:w-40 lg:h-40 bg-navy/60 backdrop-blur-md rounded-full flex items-center justify-center p-1.5 lg:p-2 shadow-2xl border border-gold/30 z-30"
        >
          <div className="w-full h-full border border-gold/40 rounded-full flex flex-col items-center justify-center text-center">
            <span className="font-display text-gold text-lg lg:text-3xl leading-none">Est.</span>
            <span className="font-body text-pearl text-[8px] lg:text-xs tracking-[0.2em] uppercase mt-1 lg:mt-2">2018</span>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
