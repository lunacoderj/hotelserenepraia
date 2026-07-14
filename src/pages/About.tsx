import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useLenisScroll } from '../hooks';
import { LuxuryButton } from '../components/ui/Button';
import { Link } from 'react-router-dom';

export const About = () => {
  useLenisScroll();
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <div className="bg-pearl min-h-screen">
      
      {/* Parallax Hero */}
      <section ref={containerRef} className="relative w-full aspect-video md:h-screen bg-navy overflow-hidden">
        <motion.div 
          style={{ y }} 
          className="absolute inset-0 w-full h-[115%]"
        >
          <img 
            src='https://1zn1w7lqhv0bhjja.public.blob.vercel-storage.com/hotel-serene/ChatGPT%20Image%20Jul%2013%2C%202026%2C%2003_26_03%20PM.png' 
            alt="Hotel Serene Praia Building" 
            className="w-full h-full object-cover object-center"
          />
        </motion.div>
        
        {/* Screen Reader Only Text for SEO since image has text */}
        <h1 className="sr-only">Hotel Serene Praia - Our Story</h1>
      </section>

      {/* Unique Content Reveal */}
      <section className="relative z-20 -mt-24 max-w-7xl mx-auto px-6 mb-32">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="bg-white p-12 md:p-20 shadow-luxury border border-navy/5 flex flex-col lg:flex-row gap-16"
        >
          <div className="lg:w-1/2 flex flex-col justify-center">
            <h2 className="font-display text-heading-xl text-navy mb-8 leading-tight">
              A Legacy of <br/> <span className="text-gold italic">Coastal Elegance</span>
            </h2>
            <div className="w-16 h-[2px] bg-gold mb-8" />
            <p className="font-body text-body-lg text-navy-500/80 leading-relaxed mb-6 font-light">
              Nestled near the pristine Rushikonda beach in Visakhapatnam, Hotel Serene Praia was founded with a singular vision: to create a sanctuary where modern luxury seamlessly blends with the natural beauty of the Bay of Bengal.
            </p>
            <p className="font-body text-body-lg text-navy-500/80 leading-relaxed mb-12 font-light">
              Our architecture draws inspiration from the gentle coastal waves, while our interiors are designed to evoke a sense of calm and exclusivity. We pride ourselves on offering bespoke hospitality that caters to the discerning traveler, whether you're here for a rejuvenating retreat or a high-profile corporate event.
            </p>
            <div>
              <Link to="/rooms">
                <LuxuryButton variant="primary" size="lg">Experience Our Hospitality</LuxuryButton>
              </Link>
            </div>
          </div>

          <div className="lg:w-1/2 flex">
            <div className="relative w-full h-[300px] lg:h-full min-h-[400px] rounded-sm group overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-gold/10 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-1000 ease-in-out z-10" />
              <img 
                src="https://1zn1w7lqhv0bhjja.public.blob.vercel-storage.com/rooms/ChatGPT%20Image%20Jul%209%2C%202026%2C%2009_07_23%20PM.png" 
                alt="A Legacy of Coastal Elegance" 
                className="w-full h-full object-cover scale-100 group-hover:scale-105 transition-transform duration-1000 ease-out"
              />
            </div>
          </div>
        </motion.div>
      </section>

      {/* Our Philosophy Grid */}
      <section className="py-24 bg-navy text-pearl relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://1zn1w7lqhv0bhjja.public.blob.vercel-storage.com/hotel-serene/building.png')] bg-cover bg-center opacity-5" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <span className="font-body text-caption uppercase tracking-widest text-gold mb-4 block">The Serene Standard</span>
            <h2 className="font-display text-heading-lg md:text-display-sm text-pearl">Our Philosophy</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Coastal Harmony",
                desc: "Every inch of our resort is designed to harmonize with the rhythmic waves of the Bay of Bengal, offering uninterrupted panoramic views and an atmosphere of profound peace."
              },
              {
                title: "Bespoke Hospitality",
                desc: "We anticipate your needs before you do. Our dedicated staff is trained to provide intuitive, unobtrusive service that turns a simple stay into a memorable experience."
              },
              {
                title: "Opulent Comfort",
                desc: "From 400-thread-count Egyptian cotton linens to curated bespoke furnishings, every element in our rooms is selected to provide the pinnacle of physical and aesthetic comfort."
              },
              {
                title: "Culinary Excellence",
                desc: "While we focus purely on your stay, we partner with the finest local establishments to ensure your gastronomic desires are met with the same level of excellence as your accommodation."
              },
              {
                title: "Event Mastery",
                desc: "Our state-of-the-art banquet facilities and meticulously manicured lawns provide the perfect canvas for your most important life events, ensuring they are executed flawlessly."
              },
              {
                title: "Sustainable Luxury",
                desc: "We believe in preserving the beauty that surrounds us. Our operations integrate eco-friendly practices to ensure the Rushikonda coast remains pristine for generations to come."
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-navy-600/50 p-8 border border-gold/10 hover:border-gold/30 transition-colors"
              >
                <div className="w-8 h-[2px] bg-gold mb-6" />
                <h3 className="font-display text-heading-sm text-pearl mb-4">{item.title}</h3>
                <p className="font-body text-body-sm text-pearl/70 font-light leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 bg-pearl text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto flex flex-col items-center"
        >
          <div className="w-12 h-[1px] bg-gold mb-6" />
          <h2 className="font-display text-heading-lg text-navy mb-8 leading-tight">
            Ready to experience the <br/> Serene difference?
          </h2>
          <Link to="/rooms">
            <LuxuryButton variant="primary" size="lg">View Accommodations</LuxuryButton>
          </Link>
        </motion.div>
      </section>

    </div>
  );
};

export default About;
