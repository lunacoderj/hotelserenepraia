import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useLenisScroll } from '../hooks';
import { LuxuryButton } from '../components/ui/Button';
import { CONTACT_CONFIG } from '../config/contacts';
import { Link } from 'react-router-dom';

const amenities = [
  { icon: "🏛️", label: "Spacious Hall", detail: "Large Guest Capacity" },
  { icon: "🎤", label: "Premium Stage", detail: "Elevated event platform" },
  { icon: "🪑", label: "Comfortable Seating", detail: "Flexible arrangement" },
  { icon: "❄️", label: "Air Conditioned", detail: "Climate controlled hall" },
  { icon: "✨", label: "Elegant Lighting", detail: "Modern ceiling design" },
  { icon: "🛋️", label: "Waiting Area", detail: "Dedicated pre-function space" },
  { icon: "🚻", label: "Washrooms", detail: "Separate automated washrooms" },
  { icon: "🚪", label: "Easy Entrance", detail: "Accessible ground access" },
];

export const Banquet = () => {
  useLenisScroll();
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <div className="bg-pearl min-h-screen">

      {/* ─── CINEMATIC PARALLAX HERO ─── */}
      <section ref={heroRef} className="relative h-[110vh] w-full bg-navy overflow-hidden">
        <motion.div style={{ y: heroY }} className="absolute inset-0 w-full h-[100%]">
          <img 
            src='https://1zn1w7lqhv0bhjja.public.blob.vercel-storage.com/hotel-serene/hero%20image.png' 
            alt="Grand Banquet Hall" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/40 to-transparent" />
        </motion.div>
        
        <motion.div 
          style={{ opacity: heroOpacity }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 px-6"
        >
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-16 h-[1px] bg-gold" />
              <span className="font-body text-caption tracking-[0.3em] uppercase text-gold">Events & Celebrations</span>
              <div className="w-16 h-[1px] bg-gold" />
            </div>
            <h1 className="font-display text-display-lg md:text-[5rem] lg:text-[6rem] text-pearl mb-6 leading-[0.95]">
              The Grand <br/><span className="text-gold italic">Banquet Hall</span>
            </h1>
            <p className="font-body text-body-lg text-pearl/70 max-w-2xl mx-auto mb-10 font-light">
              An exquisite venue where every celebration becomes an unforgettable masterpiece. From grand weddings to prestigious corporate galas.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href={`https://wa.me/${CONTACT_CONFIG.whatsapp.replace(/[^0-9]/g, '')}?text=Hi, I am interested in booking the Banquet Hall. Could you provide more details?`} 
                target="_blank" rel="noreferrer"
              >
                <LuxuryButton variant="primary" size="lg">Book Your Event</LuxuryButton>
              </a>
              <Link to="/offers">
                <LuxuryButton variant="outline" size="lg">View Offers</LuxuryButton>
              </Link>
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
        >
          <span className="font-body text-[10px] tracking-[0.3em] uppercase text-pearl/50">Scroll</span>
          <div className="w-[1px] h-8 bg-gradient-to-b from-gold to-transparent" />
        </motion.div>
      </section>

      {/* ─── VENUE AT A GLANCE ─── */}
      <section className="py-24 md:py-32 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center mb-32">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="font-body text-caption uppercase tracking-widest text-gold mb-4 block">The Venue</span>
            <h2 className="font-display text-heading-xl md:text-[3rem] text-navy mb-8 leading-tight">
              Where Dreams <br/>Become <span className="text-gold italic">Reality</span>
            </h2>
            <p className="font-body text-body-lg text-navy-500/80 leading-relaxed mb-6">
              Our spacious and elegantly decorated banquet hall is designed to host grand weddings, birthday celebrations, engagement ceremonies, anniversary parties, and professional corporate functions.
            </p>
            <p className="font-body text-body-md text-navy-500/70 leading-relaxed mb-8">
              With customizable layouts, a dedicated elevated stage area, professional-grade lighting rigs, and state-of-the-art audiovisual facilities, we ensure your event is executed flawlessly. Our dedicated in-house event managers coordinate every detail — from gourmet catering to floral arrangements — so you can focus on making memories.
            </p>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
              {[
                { value: "Grand", label: "Events" },
                { value: "Premium", label: "Stage" },
                { value: "Easy", label: "Entrance" },
                { value: "₹23K", label: "Starting" },
              ].map((stat, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white p-5 border border-navy/5 shadow-sm text-center"
                >
                  <span className="block font-display text-heading-md text-gold mb-1">{stat.value}</span>
                  <span className="font-body text-[9px] uppercase tracking-[0.2em] text-navy-500/60">{stat.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Bento Grid */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="h-[500px] md:h-[650px] overflow-hidden rounded-sm grid grid-rows-2 gap-3"
          >
            <div className="relative overflow-hidden group">
              <img src='https://1zn1w7lqhv0bhjja.public.blob.vercel-storage.com/hotel-serene/marriage.png' alt="Wedding Setup" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
              <div className="absolute inset-0 bg-navy/0 group-hover:bg-navy/20 transition-colors duration-500" />
              <div className="absolute bottom-4 left-4 bg-navy/70 backdrop-blur-sm px-4 py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <span className="font-body text-xs text-pearl tracking-widest uppercase">Weddings</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="relative overflow-hidden group">
                <img src='https://1zn1w7lqhv0bhjja.public.blob.vercel-storage.com/hotel-serene/awardevent.png' alt="Award Ceremony" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                <div className="absolute inset-0 bg-navy/0 group-hover:bg-navy/20 transition-colors duration-500" />
                <div className="absolute bottom-4 left-4 bg-navy/70 backdrop-blur-sm px-4 py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <span className="font-body text-xs text-pearl tracking-widest uppercase">Corporate</span>
                </div>
              </div>
              <div className="relative overflow-hidden group">
                <img src='https://1zn1w7lqhv0bhjja.public.blob.vercel-storage.com/hotel-serene/birthday%20celebrations.png' alt="Birthday Celebration" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                <div className="absolute inset-0 bg-navy/0 group-hover:bg-navy/20 transition-colors duration-500" />
                <div className="absolute bottom-4 left-4 bg-navy/70 backdrop-blur-sm px-4 py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <span className="font-body text-xs text-pearl tracking-widest uppercase">Birthdays</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ─── AMENITIES RIBBON ─── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-32"
        >
          <div className="text-center mb-16">
            <span className="font-body text-caption uppercase tracking-widest text-gold mb-4 block">World-Class Facilities</span>
            <h3 className="font-display text-heading-xl text-navy">Amenities & Features</h3>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-6">
            {amenities.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-white border border-navy/5 p-6 md:p-8 text-center group hover:bg-navy hover:border-navy transition-all duration-500 shadow-sm hover:shadow-xl"
              >
                <span className="text-3xl md:text-4xl block mb-4 group-hover:scale-110 transition-transform duration-300">{item.icon}</span>
                <h4 className="font-display text-body-md md:text-heading-sm text-navy group-hover:text-pearl mb-2 transition-colors duration-500">{item.label}</h4>
                <p className="font-body text-[10px] md:text-xs text-navy-500/60 group-hover:text-pearl/60 uppercase tracking-widest transition-colors duration-500">{item.detail}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ─── EXCLUSIVE OFFER ─── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-32 relative overflow-hidden"
        >
          <div className="bg-navy p-10 md:p-20 flex flex-col lg:flex-row items-center gap-12 lg:gap-20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gold/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
            <div className="absolute -bottom-10 -left-10 w-80 h-80 border border-gold/10 rounded-full pointer-events-none" />
            <div className="absolute -bottom-20 -left-20 w-96 h-96 border border-gold/5 rounded-full pointer-events-none" />

            <div className="relative z-10 lg:w-3/5">
              <span className="inline-flex items-center gap-2 px-5 py-2 bg-gold/10 text-gold text-xs font-bold tracking-[0.2em] uppercase mb-8 border border-gold/20 rounded-full">
                <span className="w-2 h-2 bg-gold rounded-full animate-pulse" />
                Limited Time Offer
              </span>
              <h3 className="font-display text-heading-xl md:text-[2.5rem] text-pearl mb-6 leading-tight">
                The Grand <br className="hidden md:block" />Celebration Package
              </h3>
              <p className="font-body text-body-lg text-pearl/80 mb-6 leading-relaxed font-light">
                Book your event 30 days in advance and receive a complimentary welcome drink reception for all guests, plus a <strong className="text-gold font-semibold">15% discount</strong> on our premium catering packages.
              </p>
              <ul className="space-y-3 mb-8">
                {["Complimentary welcome drinks & appetizers", "15% off premium catering menu", "Free stage & podium decoration", "Priority valet parking for VIP guests"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 font-body text-body-sm text-pearl/70">
                    <span className="w-1.5 h-1.5 bg-gold rounded-full flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="font-body text-xs text-pearl/40 italic mb-8">* Valid for bookings of 100+ guests. Terms and conditions apply.</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/offers">
                  <LuxuryButton variant="primary" size="lg">Claim Offer</LuxuryButton>
                </Link>
                <a 
                  href={`https://wa.me/${CONTACT_CONFIG.whatsapp.replace(/[^0-9]/g, '')}?text=Hi, I'd like to know more about the Grand Celebration Package for the Banquet Hall.`}
                  target="_blank" rel="noreferrer"
                >
                  <LuxuryButton variant="primary" size="lg">Ask on WhatsApp</LuxuryButton>
                </a>
              </div>
            </div>
            <div className="relative z-10 lg:w-2/5 flex flex-col items-center justify-center text-center">
              <div className="w-56 h-56 md:w-72 md:h-72 border-2 border-gold/20 rounded-full flex items-center justify-center relative">
                <div className="absolute inset-4 border border-gold/10 rounded-full" />
                <div className="text-center">
                  <span className="block font-display text-[4rem] md:text-[5rem] text-gold leading-none">15<span className="text-[2rem] md:text-[2.5rem]">%</span></span>
                  <span className="block font-body text-xs md:text-sm text-pearl/60 tracking-[0.3em] uppercase mt-2">Discount</span>
                </div>
              </div>
              <p className="font-body text-pearl/40 text-xs tracking-widest uppercase mt-6">Starting from ₹23,000</p>
            </div>
          </div>
        </motion.div>

        {/* ─── IMMERSIVE WALKTHROUGH ─── */}
        <div className="mb-32">
          <div className="text-center mb-20">
            <span className="font-body text-caption uppercase tracking-widest text-gold mb-4 block">Immersive Walkthrough</span>
            <h3 className="font-display text-heading-xl text-navy mb-4">Explore Every Detail</h3>
            <p className="font-body text-body-md text-navy-500/60 max-w-2xl mx-auto">Take a virtual tour through our meticulously crafted venue and discover why Hotel Serene Praia is the preferred choice for life's most important events.</p>
          </div>

          <div className="flex flex-col gap-24 md:gap-32">
            {[
              {
                image: 'https://1zn1w7lqhv0bhjja.public.blob.vercel-storage.com/hotel-serene/leftside.png', 
                title: "Expansive & Climate Controlled", 
                desc: "Walk into a vast, meticulously designed space offering a pillarless floor plan for uninterrupted views. Equipped with centralized, high-tonnage Air Conditioning, the hall remains perfectly chilled even at full capacity. The elegant, customizable ambient decor is ready to adapt to any aesthetic theme.",
                highlights: ["Pillarless Architecture", "Centralized AC", "Adaptive Lighting"]
              },
              {
                image: 'https://1zn1w7lqhv0bhjja.public.blob.vercel-storage.com/hotel-serene/backview.png', 
                title: "Cinematic Acoustics & Visuals", 
                desc: "Engineered for both grand presentations and immersive entertainment. The hall features built-in 4K ceiling projectors, hidden motorized drop-down screens, and state-of-the-art surround sound acoustic treatment that guarantees crystal clear audio, whether for a corporate speech or a wedding DJ.",
                highlights: ["4K Laser Projectors", "Surround Sound", "Motorized Screens"]
              },
              {
                image: 'https://1zn1w7lqhv0bhjja.public.blob.vercel-storage.com/hotel-serene/rightside.png', 
                title: "Uncompromising Comfort", 
                desc: "We sweat the minor details. Guests are seated in plush, ergonomically designed premium banquet chairs. The facility also features expansive, ultra-hygienic automated washrooms, dedicated VIP green rooms for the hosts, and seamless wheelchair accessibility throughout.",
                highlights: ["Ergonomic Chairs", "VIP Green Rooms", "Automated Washrooms"]
              },
              {
                image: 'https://1zn1w7lqhv0bhjja.public.blob.vercel-storage.com/rooms/hall.JPG', 
                title: "Premium VIP Waiting Lounges", 
                desc: "Arrive in style and relax before the grand event. Our dedicated waiting halls and VIP green rooms offer a serene, private space for hosts and special guests to prepare and unwind, complete with plush seating and ambient lighting.",
                highlights: ["Private Lounges", "Plush Seating", "Ambient Lighting"]
              },
              {
                image: 'https://1zn1w7lqhv0bhjja.public.blob.vercel-storage.com/hotel-serene/washroom.JPG', 
                title: "Impeccable Hygiene & Facilities", 
                desc: "We believe luxury is in the details. The banquet hall is equipped with pristine, highly-maintained washrooms and automated facilities that guarantee the utmost hygiene and comfort for all your guests throughout the event.",
                highlights: ["Automated Facilities", "Pristine Maintenance", "High Capacity"]
              },
              {
                image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=2074&auto=format&fit=crop", 
                title: "Advanced Projection & Thematic Decor", 
                desc: "Take your event to the next level. Alongside our built-in laser projectors, we provide dynamic, customizable LED wash lighting that instantly changes the mood of the room. Our elite in-house decorators can seamlessly transform the ambiance from a crisp, professional corporate summit to a breathtaking romantic gala.",
                highlights: ["LED Wash Lighting", "Elite Decorators", "Theme Customization"]
              }
            ].map((section, i) => (
              <div key={i} className={`flex flex-col ${i % 2 !== 0 ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-12 md:gap-20`}>
                <motion.div 
                  initial={{ opacity: 0, x: i % 2 !== 0 ? 50 : -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full md:w-1/2"
                >
                  <div className="aspect-[4/3] rounded-sm overflow-hidden shadow-2xl relative group">
                    <div className="absolute inset-0 bg-gold/10 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-1000 ease-in-out z-10 pointer-events-none" />
                    <img 
                      src={section.image} 
                      alt={section.title} 
                      className="w-full h-full object-cover scale-100 group-hover:scale-105 transition-transform duration-[1.5s] ease-out" 
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-navy/80 to-transparent z-20">
                      <span className="font-display text-pearl text-heading-sm">0{i + 1}</span>
                    </div>
                  </div>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="w-full md:w-1/2 flex flex-col justify-center"
                >
                  <span className="font-body text-[10px] tracking-[0.3em] uppercase text-gold mb-4">Step 0{i + 1}</span>
                  <h4 className="font-display text-heading-lg text-navy mb-6 leading-tight">{section.title}</h4>
                  <p className="font-body text-body-md text-navy-500/80 leading-relaxed font-light mb-8">
                    {section.desc}
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {section.highlights.map((tag, j) => (
                      <span key={j} className="px-4 py-2 bg-navy/5 text-navy-500 font-body text-[10px] tracking-[0.15em] uppercase rounded-full border border-navy/10">
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>

        {/* ─── FINAL CTA ─── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-navy p-12 md:p-20 text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 opacity-10">
            <img src='https://1zn1w7lqhv0bhjja.public.blob.vercel-storage.com/hotel-serene/hero%20image.png' alt="" className="w-full h-full object-cover" />
          </div>
          <div className="relative z-10">
            <div className="w-12 h-[1px] bg-gold mx-auto mb-8" />
            <h2 className="font-display text-heading-lg md:text-display-sm text-pearl mb-6">Plan Your Next Event With Us</h2>
            <p className="font-body text-body-md text-pearl/70 max-w-2xl mx-auto mb-10">
              Our dedicated event planning team is ready to assist you with every detail — from gourmet catering menus and floral arrangements to audiovisual setup and guest accommodation. Let us bring your vision to life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href={`https://wa.me/${CONTACT_CONFIG.whatsapp.replace(/[^0-9]/g, '')}?text=Hi, I am interested in booking the Banquet Hall. Could you provide more details?`} 
                target="_blank" rel="noreferrer"
              >
                <LuxuryButton variant="primary" size="lg">Enquire Now</LuxuryButton>
              </a>
              <Link to="/contact">
                <LuxuryButton variant="outline" size="lg">Contact Us</LuxuryButton>
              </Link>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Banquet;
