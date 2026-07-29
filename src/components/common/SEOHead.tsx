import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { PAGE_SEO } from '../../data/seoData';
import { SEO_CONFIG } from '../../config/seo';

interface SEOHeadProps {
  page?: string;
  title?: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: string;
  noindex?: boolean;
}

export const SEOHead: React.FC<SEOHeadProps> = ({
  page,
  title,
  description,
  canonical,
  ogImage,
  ogType = 'website',
  noindex = false,
}) => {
  const location = useLocation();
  const seo = page ? PAGE_SEO[page] : undefined;

  const finalTitle = title || seo?.title || SEO_CONFIG.defaultTitle;
  const finalDescription = description || seo?.description || SEO_CONFIG.defaultDescription;
  const finalCanonical = canonical || seo?.canonical || `${SEO_CONFIG.siteUrl}${location.pathname}`;
  const finalOgImage = ogImage || seo?.ogImage || SEO_CONFIG.defaultOgImage;

  return (
    <Helmet>
      {/* Primary */}
      <title>{finalTitle}</title>
      <meta name="description" content={finalDescription} />
      <link rel="canonical" href={finalCanonical} />

      {/* Robots */}
      <meta
        name="robots"
        content={noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'}
      />

      {/* Open Graph */}
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:image" content={finalOgImage} />
      <meta property="og:url" content={finalCanonical} />
      <meta property="og:type" content={ogType} />
      <meta property="og:locale" content="en_IN" />
      <meta property="og:site_name" content={SEO_CONFIG.siteName} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={finalDescription} />
      <meta name="twitter:image" content={finalOgImage} />

      {/* Geographic */}
      <meta name="geo.region" content={SEO_CONFIG.geo.region} />
      <meta name="geo.placename" content={SEO_CONFIG.geo.placename} />
      <meta name="geo.position" content={`${SEO_CONFIG.geo.lat};${SEO_CONFIG.geo.lng}`} />
      <meta name="ICBM" content={`${SEO_CONFIG.geo.lat}, ${SEO_CONFIG.geo.lng}`} />

      {/* Author & Language */}
      <meta name="author" content={SEO_CONFIG.siteName} />
      <link rel="alternate" hrefLang="en" href={finalCanonical} />
    </Helmet>
  );
};
