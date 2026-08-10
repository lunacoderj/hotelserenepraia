export const SEO_CONFIG = {
  siteName: 'Hotel Serene Praia',
  siteUrl: 'https://hotelserenepraia.in',
  defaultTitle: 'Hotel Serene Praia | Best Beach Hotel in Rushikonda, Visakhapatnam',
  defaultDescription: 'Hotel Serene Praia is the best beach hotel near Rushikonda Beach, Visakhapatnam. Enjoy luxury sea-view rooms, premium suites, grand banquet hall, and world-class coastal hospitality. Book online or via WhatsApp.',
  defaultOgImage: 'https://1zn1w7lqhv0bhjja.public.blob.vercel-storage.com/hotel-serene/building.png',
  keywords: [
    'hotel in rushikonda', 'best hotel in rushikonda', 'beach hotel vizag', 'luxury hotel visakhapatnam',
    'sea view rooms vizag', 'hotel near rushikonda beach', 'hotel serene praia', 'serene praia vizag',
    'affordable luxury hotel vizag', 'best stay near beach vizag', 'vizag beach resorts', 'hotels near gitam university vizag',
    'couple friendly hotels vizag', 'family hotel visakhapatnam', 'hotel serene praia rushikonda', 'premium stay vizag',
    'banquet hall rushikonda', 'vizag tourist stay', 'hotel booking vizag', 'accommodation near rushikonda',
    'budget hotels near rushikonda beach', 'luxury suites vizag'
  ],

  geo: {
    lat: 17.7941591,
    lng: 83.389136,
    region: 'IN-AP',
    placename: 'Rushikonda, Visakhapatnam',
    postalCode: '530045',
  },

  business: {
    foundingDate: '2018',
    starRating: 3,
    priceRange: '₹1,999 - ₹4,499',
    currenciesAccepted: 'INR',
    paymentAccepted: ['Cash', 'Credit Card', 'Debit Card', 'UPI', 'Net Banking'],
    checkInTime: '12:00',
    checkOutTime: '11:00',
    openingHours: 'Mo-Su 00:00-23:59',
    numberOfRooms: 21,
    petsAllowed: false,
  },

  social: {
    instagram: 'https://instagram.com/hotelserenepraia',
    facebook: 'https://facebook.com/hotelserenepraia',
    twitter: 'https://twitter.com/hotelserenepraia',
  },

  contact: {
    phone: '08912502949',
    whatsapp: '+919494042204',
    email: 'hotelserenepraia@gmail.com',
    address: {
      streetAddress: 'Swarnabharathi Nagar, Rushikonda',
      addressLocality: 'Visakhapatnam',
      addressRegion: 'Andhra Pradesh',
      postalCode: '530045',
      addressCountry: 'IN',
    },
  },
} as const;
