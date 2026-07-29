import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { SEO_CONFIG } from '../../config/seo';
import { AGGREGATE_RATING, GUEST_REVIEWS } from '../../data/seoData';
import { roomsData } from '../../data/rooms';

// ─────────────────────────────────────────────────
// Global Schema — Hotel, Organization, WebSite, LocalBusiness
// Injected once in App.tsx
// ─────────────────────────────────────────────────

export const GlobalSchema: React.FC = () => {
  const hotelSchema = {
    '@context': 'https://schema.org',
    '@type': 'Hotel',
    '@id': `${SEO_CONFIG.siteUrl}/#hotel`,
    name: SEO_CONFIG.siteName,
    url: SEO_CONFIG.siteUrl,
    telephone: SEO_CONFIG.contact.phone,
    email: SEO_CONFIG.contact.email,
    image: SEO_CONFIG.defaultOgImage,
    description: SEO_CONFIG.defaultDescription,
    starRating: {
      '@type': 'Rating',
      ratingValue: SEO_CONFIG.business.starRating,
    },
    priceRange: SEO_CONFIG.business.priceRange,
    numberOfRooms: SEO_CONFIG.business.numberOfRooms,
    petsAllowed: SEO_CONFIG.business.petsAllowed,
    checkinTime: SEO_CONFIG.business.checkInTime,
    checkoutTime: SEO_CONFIG.business.checkOutTime,
    currenciesAccepted: SEO_CONFIG.business.currenciesAccepted,
    paymentAccepted: SEO_CONFIG.business.paymentAccepted.join(', '),
    address: {
      '@type': 'PostalAddress',
      streetAddress: SEO_CONFIG.contact.address.streetAddress,
      addressLocality: SEO_CONFIG.contact.address.addressLocality,
      addressRegion: SEO_CONFIG.contact.address.addressRegion,
      postalCode: SEO_CONFIG.contact.address.postalCode,
      addressCountry: SEO_CONFIG.contact.address.addressCountry,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: SEO_CONFIG.geo.lat,
      longitude: SEO_CONFIG.geo.lng,
    },
    amenityFeature: [
      { '@type': 'LocationFeatureSpecification', name: 'Free Wi-Fi', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Air Conditioning', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Free Parking', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Banquet Hall', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Beach Proximity', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Electric Kettle', value: true },
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: AGGREGATE_RATING.ratingValue,
      reviewCount: AGGREGATE_RATING.reviewCount,
      bestRating: AGGREGATE_RATING.bestRating,
      worstRating: AGGREGATE_RATING.worstRating,
    },
    review: GUEST_REVIEWS.slice(0, 5).map(r => ({
      '@type': 'Review',
      author: { '@type': 'Person', name: r.name },
      datePublished: r.date,
      reviewRating: { '@type': 'Rating', ratingValue: r.rating, bestRating: 5 },
      name: r.title,
      reviewBody: r.text,
    })),
    sameAs: [
      SEO_CONFIG.social.instagram,
      SEO_CONFIG.social.facebook,
      SEO_CONFIG.social.twitter,
    ],
    hasMap: 'https://maps.app.goo.gl/fGaScHSjwiaUE1nJ6',
  };

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SEO_CONFIG.siteUrl}/#organization`,
    name: SEO_CONFIG.siteName,
    url: SEO_CONFIG.siteUrl,
    logo: 'https://1zn1w7lqhv0bhjja.public.blob.vercel-storage.com/rooms/logo_tranparent.png',
    foundingDate: SEO_CONFIG.business.foundingDate,
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: SEO_CONFIG.contact.phone,
      contactType: 'reservations',
      email: SEO_CONFIG.contact.email,
      areaServed: 'IN',
      availableLanguage: ['English', 'Hindi', 'Telugu'],
    },
    sameAs: [
      SEO_CONFIG.social.instagram,
      SEO_CONFIG.social.facebook,
      SEO_CONFIG.social.twitter,
    ],
    address: {
      '@type': 'PostalAddress',
      streetAddress: SEO_CONFIG.contact.address.streetAddress,
      addressLocality: SEO_CONFIG.contact.address.addressLocality,
      addressRegion: SEO_CONFIG.contact.address.addressRegion,
      postalCode: SEO_CONFIG.contact.address.postalCode,
      addressCountry: SEO_CONFIG.contact.address.addressCountry,
    },
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SEO_CONFIG.siteUrl}/#website`,
    name: SEO_CONFIG.siteName,
    url: SEO_CONFIG.siteUrl,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SEO_CONFIG.siteUrl}/rooms?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(hotelSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(organizationSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(websiteSchema)}</script>
    </Helmet>
  );
};


// ─────────────────────────────────────────────────
// Breadcrumb Schema
// ─────────────────────────────────────────────────

interface BreadcrumbItem {
  name: string;
  url: string;
}

export const BreadcrumbSchema: React.FC<{ items: BreadcrumbItem[] }> = ({ items }) => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
};


// ─────────────────────────────────────────────────
// FAQ Schema
// ─────────────────────────────────────────────────

interface FAQItem {
  question: string;
  answer: string;
}

export const FAQSchema: React.FC<{ faqs: FAQItem[] }> = ({ faqs }) => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
};


// ─────────────────────────────────────────────────
// HotelRoom + Offer Schema (for individual room pages)
// ─────────────────────────────────────────────────

interface RoomSchemaProps {
  roomSlug: string;
}

export const RoomSchema: React.FC<RoomSchemaProps> = ({ roomSlug }) => {
  const room = roomsData.find(r => r.slug === roomSlug);
  if (!room) return null;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'HotelRoom',
    name: `${room.name} at ${SEO_CONFIG.siteName}`,
    description: room.description,
    image: room.images.main,
    bed: {
      '@type': 'BedDetails',
      typeOfBed: room.bedType,
      numberOfBeds: 1,
    },
    occupancy: {
      '@type': 'QuantitativeValue',
      value: room.capacity,
      unitText: 'persons',
    },
    amenityFeature: room.amenities.map(a => ({
      '@type': 'LocationFeatureSpecification',
      name: a,
      value: true,
    })),
    offers: {
      '@type': 'Offer',
      name: `${room.name} — Best Rate`,
      price: room.offerPrice,
      priceCurrency: 'INR',
      availability: 'https://schema.org/InStock',
      validFrom: new Date().toISOString().split('T')[0],
      url: `${SEO_CONFIG.siteUrl}/rooms/${room.slug}`,
      priceValidUntil: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    },
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
};


// ─────────────────────────────────────────────────
// ItemList Schema (for rooms listing page)
// ─────────────────────────────────────────────────

export const RoomsListSchema: React.FC = () => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Rooms & Suites at Hotel Serene Praia',
    numberOfItems: roomsData.length,
    itemListElement: roomsData.map((room, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      url: `${SEO_CONFIG.siteUrl}/rooms/${room.slug}`,
      name: room.name,
      image: room.images.main,
    })),
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
};


// ─────────────────────────────────────────────────
// EventVenue Schema (for banquet page)
// ─────────────────────────────────────────────────

export const EventVenueSchema: React.FC = () => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'EventVenue',
    name: `${SEO_CONFIG.siteName} — Banquet Hall`,
    url: `${SEO_CONFIG.siteUrl}/banquet`,
    image: 'https://1zn1w7lqhv0bhjja.public.blob.vercel-storage.com/hotel-serene/hero%20image.png',
    description: 'Premium AC banquet hall for weddings, corporate events, and celebrations in Rushikonda, Visakhapatnam. Spacious hall with stage, projector, and event management. Starting ₹22,999.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: SEO_CONFIG.contact.address.streetAddress,
      addressLocality: SEO_CONFIG.contact.address.addressLocality,
      addressRegion: SEO_CONFIG.contact.address.addressRegion,
      postalCode: SEO_CONFIG.contact.address.postalCode,
      addressCountry: SEO_CONFIG.contact.address.addressCountry,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: SEO_CONFIG.geo.lat,
      longitude: SEO_CONFIG.geo.lng,
    },
    telephone: SEO_CONFIG.contact.phone,
    maximumAttendeeCapacity: 200,
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '00:00',
      closes: '23:59',
    },
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
};


// ─────────────────────────────────────────────────
// VideoObject Schema (for hero video)
// ─────────────────────────────────────────────────

export const VideoSchema: React.FC = () => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: 'Hotel Serene Praia — Luxury Beach Hotel Experience',
    description: 'Take a virtual tour of Hotel Serene Praia, a luxury beach hotel near Rushikonda Beach, Visakhapatnam. Discover our sea-view rooms, premium suites, banquet hall, and stunning coastal setting.',
    thumbnailUrl: SEO_CONFIG.defaultOgImage,
    uploadDate: '2026-01-01',
    contentUrl: 'https://1zn1w7lqhv0bhjja.public.blob.vercel-storage.com/hotel-serene/No_camera_movement_no_zoom_n.mp4',
    embedUrl: 'https://1zn1w7lqhv0bhjja.public.blob.vercel-storage.com/hotel-serene/No_camera_movement_no_zoom_n.mp4',
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
};


// ─────────────────────────────────────────────────
// ImageGallery Schema (for gallery page)
// ─────────────────────────────────────────────────

export const ImageGallerySchema: React.FC<{ images: { src: string; alt: string }[] }> = ({ images }) => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ImageGallery',
    name: `Photo Gallery — ${SEO_CONFIG.siteName}`,
    url: `${SEO_CONFIG.siteUrl}/gallery`,
    about: {
      '@type': 'Hotel',
      name: SEO_CONFIG.siteName,
    },
    image: images.map(img => ({
      '@type': 'ImageObject',
      url: img.src,
      name: img.alt,
      description: img.alt,
    })),
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
};


// ─────────────────────────────────────────────────
// TouristAttraction Schema
// ─────────────────────────────────────────────────

interface AttractionSchemaItem {
  name: string;
  description: string;
  image: string;
}

export const TouristAttractionsSchema: React.FC<{ attractions: AttractionSchemaItem[] }> = ({ attractions }) => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Tourist Attractions Near Hotel Serene Praia, Visakhapatnam',
    itemListElement: attractions.map((a, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'TouristAttraction',
        name: a.name,
        description: a.description,
        image: a.image,
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Visakhapatnam',
          addressRegion: 'Andhra Pradesh',
          addressCountry: 'IN',
        },
      },
    })),
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
};


// ─────────────────────────────────────────────────
// SiteNavigationElement Schema
// ─────────────────────────────────────────────────

export const SiteNavigationSchema: React.FC = () => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'SiteNavigationElement',
    name: 'Main Navigation',
    url: SEO_CONFIG.siteUrl,
    hasPart: [
      { '@type': 'WebPage', name: 'Home', url: `${SEO_CONFIG.siteUrl}/` },
      { '@type': 'WebPage', name: 'Rooms', url: `${SEO_CONFIG.siteUrl}/rooms` },
      { '@type': 'WebPage', name: 'Banquet', url: `${SEO_CONFIG.siteUrl}/banquet` },
      { '@type': 'WebPage', name: 'Attractions', url: `${SEO_CONFIG.siteUrl}/attractions` },
      { '@type': 'WebPage', name: 'Gallery', url: `${SEO_CONFIG.siteUrl}/gallery` },
      { '@type': 'WebPage', name: 'About', url: `${SEO_CONFIG.siteUrl}/about` },
      { '@type': 'WebPage', name: 'Contact', url: `${SEO_CONFIG.siteUrl}/contact` },
    ],
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
};

// ─────────────────────────────────────────────────
// Restaurant Schema (for dining page)
// ─────────────────────────────────────────────────

export const RestaurantSchema: React.FC = () => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    name: `Ocean View Restaurant at ${SEO_CONFIG.siteName}`,
    url: `${SEO_CONFIG.siteUrl}/restaurant`,
    image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=1974&auto=format&fit=crop',
    description: 'Experience culinary excellence with breathtaking views of the Bay of Bengal. Authentic Andhra spices, fresh coastal seafood, and continental classics.',
    servesCuisine: ['Indian', 'Continental', 'Seafood'],
    priceRange: '₹₹',
    address: {
      '@type': 'PostalAddress',
      streetAddress: SEO_CONFIG.contact.address.streetAddress,
      addressLocality: SEO_CONFIG.contact.address.addressLocality,
      addressRegion: SEO_CONFIG.contact.address.addressRegion,
      postalCode: SEO_CONFIG.contact.address.postalCode,
      addressCountry: SEO_CONFIG.contact.address.addressCountry,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: SEO_CONFIG.geo.lat,
      longitude: SEO_CONFIG.geo.lng,
    },
    telephone: SEO_CONFIG.contact.phone,
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
};
