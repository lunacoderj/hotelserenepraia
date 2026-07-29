import React from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, User, ChevronRight } from 'lucide-react';
import { guidesData } from '../data/guidesData';
import { useLenisScroll } from '../hooks';
import { SEOHead } from '../components/common/SEOHead';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { FAQSection } from '../components/sections/FAQSection';

// Note: In a real app we'd likely have a separate Article schema, 
// but we'll use Helmet directly or a custom schema for GuidePage here.
import { Helmet } from 'react-helmet-async';

export const GuidePage = () => {
  useLenisScroll();
  const { slug } = useParams<{ slug: string }>();
  
  const guide = guidesData.find(g => g.slug === slug);

  if (!guide) {
    return <Navigate to="/" replace />;
  }

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: guide.metaTitle,
    description: guide.metaDescription,
    image: guide.heroImage,
    author: {
      '@type': 'Organization',
      name: guide.author,
    },
    datePublished: guide.publishedDate,
    publisher: {
      '@type': 'Organization',
      name: 'Hotel Serene Praia',
      logo: {
        '@type': 'ImageObject',
        url: 'https://1zn1w7lqhv0bhjja.public.blob.vercel-storage.com/rooms/logo_tranparent.png'
      }
    }
  };

  return (
    <div className="bg-pearl min-h-screen">
      <SEOHead 
        title={guide.metaTitle}
        description={guide.metaDescription}
        ogImage={guide.heroImage}
        ogType="article"
      />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
      </Helmet>

      <div className="absolute top-0 left-0 w-full z-50 pt-20">
        <Breadcrumbs 
          items={[
            { label: 'Guides', path: '/guide' },
            { label: guide.title, path: `/guide/${guide.slug}` }
          ]} 
        />
      </div>

      {/* Hero Section */}
      <section className="relative h-[60vh] w-full bg-navy pt-24">
        <img 
          src={guide.heroImage} 
          alt={guide.title} 
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-pearl via-navy/50 to-transparent" />
        
        <div className="relative z-10 h-full flex flex-col items-center justify-end text-center px-4 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto w-full"
          >
            <h1 className="font-display text-display-md md:text-display-lg text-navy drop-shadow-lg mb-6 leading-tight">
              {guide.title}
            </h1>
            
            <div className="flex flex-wrap justify-center gap-6 text-navy-500 font-medium text-sm uppercase tracking-widest">
              <span className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full">
                <User className="w-4 h-4 text-gold" />
                {guide.author}
              </span>
              <span className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full">
                <Calendar className="w-4 h-4 text-gold" />
                {new Date(guide.publishedDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="prose prose-lg prose-headings:font-display prose-headings:text-navy text-navy-500/90 max-w-none mb-16"
        >
          {/* Introduction */}
          <div className="mb-12">
            {guide.content.map((p, idx) => (
              <p key={idx} className="font-body text-body-lg leading-relaxed mb-6">
                {p}
              </p>
            ))}
          </div>

          {/* Sections */}
          {guide.sections.map((section, idx) => (
            <div key={idx} className="mb-12">
              <h2 className="font-display text-heading-lg text-navy mb-6">{section.title}</h2>
              {section.content.map((p, pIdx) => (
                <p key={pIdx} className="font-body text-body-lg leading-relaxed mb-6">
                  {p}
                </p>
              ))}
            </div>
          ))}
        </motion.div>
      </section>

      {/* FAQs */}
      {guide.faqs && guide.faqs.length > 0 && (
        <section className="bg-white py-24 border-t border-navy/10">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="font-display text-heading-lg text-center text-navy mb-12">
              Frequently Asked Questions
            </h2>
            <FAQSection faqs={guide.faqs} />
          </div>
        </section>
      )}

      {/* Related Guides */}
      {guide.relatedGuides && guide.relatedGuides.length > 0 && (
        <section className="bg-navy/5 py-24">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="font-display text-heading-lg text-navy mb-12 text-center">
              More Travel Guides
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {guide.relatedGuides.map(relatedSlug => {
                const related = guidesData.find(g => g.slug === relatedSlug);
                if (!related) return null;
                return (
                  <Link 
                    key={relatedSlug} 
                    to={`/guide/${relatedSlug}`}
                    className="group bg-white rounded-sm overflow-hidden shadow-luxury border border-navy/5 hover:border-gold/30 transition-colors"
                  >
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={related.heroImage} 
                        alt={related.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="font-display text-heading-sm text-navy mb-3 line-clamp-2 group-hover:text-gold transition-colors">
                        {related.title}
                      </h3>
                      <p className="text-body-sm text-navy-500/70 line-clamp-2 mb-4">
                        {related.metaDescription}
                      </p>
                      <span className="inline-flex items-center gap-1 text-gold text-sm font-medium uppercase tracking-widest">
                        Read Guide <ChevronRight className="w-4 h-4" />
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default GuidePage;
