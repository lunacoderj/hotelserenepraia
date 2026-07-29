import React from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Navigation, Clock, Info, CheckCircle2 } from 'lucide-react';
import { nearbyLocations } from '../data/nearbyData';
import { useLenisScroll } from '../hooks';
import { SEOHead } from '../components/common/SEOHead';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { TouristAttractionsSchema } from '../components/common/SchemaMarkup';
import { FAQSection } from '../components/sections/FAQSection';
import { LuxuryButton } from '../components/ui/Button';

export const NearbyLanding = () => {
  useLenisScroll();
  const { slug } = useParams<{ slug: string }>();
  
  const location = nearbyLocations.find(loc => loc.slug === slug);

  if (!location) {
    return <Navigate to="/attractions" replace />;
  }

  return (
    <div className="bg-pearl min-h-screen">
      <SEOHead 
        title={location.metaTitle}
        description={location.metaDescription}
        ogImage={location.heroImage}
      />
      <TouristAttractionsSchema 
        attractions={[{
          name: location.name,
          description: location.metaDescription,
          image: location.heroImage
        }]}
      />

      <div className="absolute top-0 left-0 w-full z-50 pt-20">
        <Breadcrumbs 
          items={[
            { label: 'Attractions', path: '/attractions' },
            { label: location.name, path: `/nearby/${location.slug}` }
          ]} 
        />
      </div>

      {/* Hero Section */}
      <section className="relative h-[70vh] w-full bg-navy pt-24">
        <img 
          src={location.heroImage} 
          alt={location.name} 
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-pearl via-transparent to-transparent" />
        
        <div className="relative z-10 h-full flex flex-col items-center justify-end text-center px-4 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto w-full"
          >
            <h1 className="font-display text-display-md md:text-display-lg text-navy drop-shadow-lg mb-6">
              {location.h1}
            </h1>
            
            <div className="flex flex-wrap justify-center gap-6 text-navy-500 font-medium">
              <span className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full">
                <MapPin className="w-5 h-5 text-gold" />
                {location.distance} from Hotel
              </span>
              <span className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full">
                <Clock className="w-5 h-5 text-gold" />
                {location.driveTime}
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          
          <div className="lg:col-span-2 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="prose prose-lg prose-headings:font-display prose-headings:text-navy text-navy-500/80 max-w-none"
            >
              {location.content.map((paragraph, idx) => (
                <p key={idx} className="leading-relaxed mb-6 font-body text-body-lg">
                  {paragraph}
                </p>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-white p-8 border border-navy/5 shadow-luxury rounded-sm"
            >
              <h2 className="font-display text-heading-md text-navy mb-6 flex items-center gap-3">
                <Info className="w-6 h-6 text-gold" />
                Highlights of {location.name}
              </h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {location.highlights.map((highlight, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-navy-500">
                    <CheckCircle2 className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          <div className="lg:col-span-1 space-y-8">
            {/* Map Integration */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-white p-6 border border-navy/5 shadow-luxury rounded-sm"
            >
              <h3 className="font-display text-heading-sm text-navy mb-4 flex items-center gap-2">
                <Navigation className="w-5 h-5 text-gold" />
                Directions from Hotel
              </h3>
              <div className="w-full h-64 bg-navy/5 rounded-sm overflow-hidden mb-4">
                <iframe
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  style={{ border: 0 }}
                  src={`https://www.google.com/maps/embed/v1/directions?key=YOUR_API_KEY&origin=Hotel+Serene+Praia,+Visakhapatnam&destination=${location.mapEmbedQuery}&mode=driving`}
                  allowFullScreen
                  title={`Map directions to ${location.name}`}
                ></iframe>
              </div>
              <Link to="/rooms">
                <LuxuryButton variant="primary" className="w-full">
                  Book Your Stay Now
                </LuxuryButton>
              </Link>
            </motion.div>

            {/* Related Attractions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-navy p-6 rounded-sm text-pearl"
            >
              <h3 className="font-display text-heading-sm mb-4">Also Nearby</h3>
              <ul className="space-y-3">
                {location.relatedAttractions.map((attraction, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-pearl/80 hover:text-gold transition-colors">
                    <div className="w-1.5 h-1.5 rounded-full bg-gold" />
                    <span>{attraction}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      {location.faqs && location.faqs.length > 0 && (
        <section className="bg-navy/5 py-24">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="font-display text-heading-lg text-center text-navy mb-12">
              Frequently Asked Questions
            </h2>
            <FAQSection faqs={location.faqs} />
          </div>
        </section>
      )}
    </div>
  );
};

export default NearbyLanding;
