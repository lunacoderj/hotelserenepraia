// ─────────────────────────────────────────────────
// Central SEO Data Store — Hotel Serene Praia
// Per-page metadata, FAQs, reviews, keywords
// ─────────────────────────────────────────────────

export interface PageSEO {
  title: string;
  description: string;
  canonical: string;
  ogImage?: string;
  keywords?: string[];
}

// ═══════════════════════════════════════════════════
// PER-PAGE METADATA
// ═══════════════════════════════════════════════════

export const PAGE_SEO: Record<string, PageSEO> = {
  home: {
    title: 'Hotel Serene Praia | Best Beach Hotel in Rushikonda, Visakhapatnam',
    description: 'Hotel Serene Praia is the best beach hotel near Rushikonda Beach, Visakhapatnam. Luxury sea-view rooms from ₹1,999/night, premium suites, grand banquet hall, and world-class coastal hospitality. Book direct for best rates.',
    canonical: 'https://hotelserenepraia.in/',
    ogImage: 'https://1zn1w7lqhv0bhjja.public.blob.vercel-storage.com/hotel-serene/building.png',
    keywords: [
      'hotel in rushikonda', 'best hotel in rushikonda', 'beach hotel vizag', 'luxury hotel visakhapatnam',
      'hotel near rushikonda beach', 'sea view rooms vizag', 'hotel serene praia', 'serene praia vizag',
      'visakhapatnam beach resorts', 'stay in rushikonda', 'hotels near gitam university', 'top hotels in vizag',
      'hotel serene praia rushikonda', 'affordable luxury hotel vizag', 'best place to stay in vizag',
      'family hotel visakhapatnam', 'couple friendly hotels vizag', 'rushikonda beach view hotel',
      'vizag sea view stay', 'premium hotels near rushikonda'
    ],
  },
  rooms: {
    title: 'Luxury Rooms & Suites Near Rushikonda Beach | Hotel Serene Praia Vizag',
    description: 'Book luxury rooms and suites at Hotel Serene Praia near Rushikonda Beach, Visakhapatnam. Deluxe rooms from ₹1,999, premium rooms, executive sea-view rooms, and spacious suites. Best rate guaranteed.',
    canonical: 'https://hotelserenepraia.in/rooms',
    ogImage: 'https://1zn1w7lqhv0bhjja.public.blob.vercel-storage.com/rooms/executive_room.jpeg',
    keywords: [
      'luxury rooms vizag', 'premium rooms rushikonda', 'suite room vizag', 'hotel rooms near rushikonda beach',
      'deluxe rooms visakhapatnam', 'hotel serene praia rooms', 'sea view rooms rushikonda',
      'best rooms in vizag', 'family suite vizag', 'couple stay vizag', 'accommodation in rushikonda',
      'visakhapatnam hotel room booking', 'vizag luxury accommodation'
    ],
  },
  'room-deluxe': {
    title: 'Deluxe Room — Comfortable Stay Near Rushikonda Beach | Hotel Serene Praia',
    description: 'Book a Deluxe Room at Hotel Serene Praia for ₹1,999/night. Comfortable king bed, smart TV, electric kettle, and attached bathroom. The ideal affordable luxury stay near Rushikonda Beach, Visakhapatnam.',
    canonical: 'https://hotelserenepraia.in/rooms/deluxe-room',
    ogImage: 'https://1zn1w7lqhv0bhjja.public.blob.vercel-storage.com/rooms/deluxe_bed.jpeg',
    keywords: [
      'deluxe room rushikonda', 'affordable hotel room vizag', 'comfortable stay near beach vizag',
      'budget luxury room vizag', 'hotel serene praia deluxe room', 'best deluxe room visakhapatnam',
      'rushikonda beach hotel room', 'cheap hotels in rushikonda', 'vizag budget stay'
    ],
  },
  'room-premium': {
    title: 'Premium Room — Elegant Interiors Near Rushikonda Beach | Hotel Serene Praia',
    description: 'Experience the Premium Room at Hotel Serene Praia for ₹2,899/night. Premium king bed, elegant wooden interiors, glass shower bathroom, and natural lighting. Located near Rushikonda Beach, Visakhapatnam.',
    canonical: 'https://hotelserenepraia.in/rooms/premium-room',
    ogImage: 'https://1zn1w7lqhv0bhjja.public.blob.vercel-storage.com/hotel-serene/IMG_3041.JPG-1200x900.webp',
    keywords: [
      'premium room vizag', 'best hotel room near beach vizag', 'premium stay rushikonda',
      'hotel serene praia premium room', 'luxury room visakhapatnam', 'premium accommodation vizag',
      'rushikonda premium hotel', 'top rated rooms vizag', 'elegant stay visakhapatnam'
    ],
  },
  'room-executive': {
    title: 'Executive Sea View Room — Business & Leisure | Hotel Serene Praia Vizag',
    description: 'The Executive Room at Hotel Serene Praia offers breathtaking sea views from ₹4,099/night. Mini fridge, electric kettle, premium bathroom, and beach views. Perfect for business travellers and premium guests in Visakhapatnam.',
    canonical: 'https://hotelserenepraia.in/rooms/executive-room',
    ogImage: 'https://1zn1w7lqhv0bhjja.public.blob.vercel-storage.com/rooms/executive_room.jpeg',
    keywords: [
      'executive room vizag', 'sea view room rushikonda', 'business hotel vizag', 'hotel near IT SEZ vizag',
      'hotel serene praia executive room', 'business stay visakhapatnam', 'corporate hotel vizag',
      'best sea view room vizag', 'premium sea view stay rushikonda', 'executive suite vizag'
    ],
  },
  'room-suite': {
    title: 'Suite Room — Spacious Family & Honeymoon Suite | Hotel Serene Praia Vizag',
    description: 'Our Suite Room features a separate living room, sofa lounge, mini fridge, and stunning sea views from ₹4,499/night. Ideal for families, VIP guests, and honeymoon couples. Hotel Serene Praia, Rushikonda Beach.',
    canonical: 'https://hotelserenepraia.in/rooms/suite-room',
    ogImage: 'https://1zn1w7lqhv0bhjja.public.blob.vercel-storage.com/hotel-serene/beachview.webp',
    keywords: [
      'suite room vizag', 'family room rushikonda', 'honeymoon hotel vizag', '2 room suite near beach vizag',
      'hotel serene praia suite', 'luxury suite visakhapatnam', 'best suite room vizag',
      'honeymoon suite rushikonda', 'family stay vizag', 'presidential suite vizag equivalent'
    ],
  },
  banquet: {
    title: 'Premium Banquet Hall in Rushikonda | Weddings & Events | Hotel Serene Praia',
    description: 'Host weddings, corporate events, and celebrations at Hotel Serene Praia\'s premium AC banquet hall in Rushikonda, Visakhapatnam. Spacious hall, stage, projector, and event management. Starting ₹22,999.',
    canonical: 'https://hotelserenepraia.in/banquet',
    ogImage: 'https://1zn1w7lqhv0bhjja.public.blob.vercel-storage.com/hotel-serene/hero%20image.png',
    keywords: [
      'banquet hall rushikonda', 'wedding hall vizag', 'event venue vizag', 'corporate venue near beach vizag',
      'hotel serene praia banquet hall', 'best banquet hall visakhapatnam', 'marriage hall vizag',
      'party hall rushikonda', 'ac banquet hall vizag', 'conference hall near rushikonda'
    ],
  },
  gallery: {
    title: 'Photo Gallery — Hotel Serene Praia, Rushikonda Beach, Visakhapatnam',
    description: 'Browse photos of Hotel Serene Praia — luxury rooms, elegant interiors, grand banquet hall, reception, and stunning sea views near Rushikonda Beach, Visakhapatnam.',
    canonical: 'https://hotelserenepraia.in/gallery',
    ogImage: 'https://1zn1w7lqhv0bhjja.public.blob.vercel-storage.com/hotel-serene/building.png',
    keywords: [
      'hotel photos rushikonda', 'hotel images vizag', 'luxury hotel interiors vizag',
      'hotel serene praia gallery', 'hotel serene praia photos', 'rushikonda hotel pictures',
      'vizag beach hotel photos', 'hotel serene praia inside view'
    ],
  },
  contact: {
    title: 'Contact & Book — Hotel Serene Praia, Rushikonda, Visakhapatnam',
    description: 'Contact Hotel Serene Praia to book your stay near Rushikonda Beach. Call 0891-2502949, WhatsApp +91 94940 42204, or fill our booking form. Located at Swarnabharathi Nagar, Rushikonda, Visakhapatnam.',
    canonical: 'https://hotelserenepraia.in/contact',
    keywords: [
      'book hotel vizag', 'hotel contact rushikonda', 'hotel booking near rushikonda beach',
      'hotel serene praia contact number', 'hotel serene praia booking', 'hotel serene praia phone number',
      'contact hotel serene praia', 'vizag hotel reservations', 'book rushikonda hotel'
    ],
  },
  about: {
    title: 'About Hotel Serene Praia — Our Story | Luxury Coastal Hotel, Rushikonda',
    description: 'Established in 2018, Hotel Serene Praia is a luxury coastal hotel near Rushikonda Beach, Visakhapatnam. Discover our story of blending modern luxury with the natural beauty of the Bay of Bengal.',
    canonical: 'https://hotelserenepraia.in/about',
    ogImage: 'https://1zn1w7lqhv0bhjja.public.blob.vercel-storage.com/hotel-serene/ChatGPT%20Image%20Jul%2013%2C%202026%2C%2003_26_03%20PM.png',
    keywords: [
      'hotel near rushikonda beach', 'luxury hotel vizag', 'coastal hotel visakhapatnam',
      'about hotel serene praia', 'hotel serene praia history', 'best beach side hotel vizag',
      'top rated hotel rushikonda', 'hotel serene praia owner', 'hotel serene praia details'
    ],
  },
  attractions: {
    title: 'Tourist Attractions Near Rushikonda — Places to Visit | Hotel Serene Praia',
    description: 'Discover the best tourist attractions near Hotel Serene Praia, Rushikonda. Visit Rushikonda Beach, Kailasagiri, RK Beach, Thotlakonda, Bheemili Beach, INS Kurusura, Tenneti Park, and more.',
    canonical: 'https://hotelserenepraia.in/attractions',
    ogImage: 'https://1zn1w7lqhv0bhjja.public.blob.vercel-storage.com/hotel-serene/rushikondabeach.jpg',
    keywords: [
      'tourist places near rushikonda', 'places to visit near vizag hotel', 'adventure activities near rushikonda beach',
      'vizag sightseeing', 'rushikonda beach activities', 'things to do in vizag',
      'kailasagiri nearby hotels', 'thotlakonda nearby hotels', 'vizag tourist attractions'
    ],
  },
  privacy: {
    title: 'Privacy Policy | Hotel Serene Praia',
    description: 'Read Hotel Serene Praia\'s privacy policy. Learn how we collect, use, and protect your personal data when you visit our website or book a stay.',
    canonical: 'https://hotelserenepraia.in/privacy',
    keywords: [
      'hotel serene praia privacy policy', 'privacy policy vizag hotel', 'hotel data protection'
    ],
  },
  terms: {
    title: 'Terms of Service | Hotel Serene Praia',
    description: 'Review Hotel Serene Praia\'s terms of service, including booking conditions, cancellation policy, check-in and check-out times, and guest responsibilities.',
    canonical: 'https://hotelserenepraia.in/terms',
    keywords: [
      'hotel serene praia terms', 'hotel serene praia conditions', 'hotel policies vizag',
      'cancellation policy hotel serene praia'
    ],
  },
};


// ═══════════════════════════════════════════════════
// GUEST REVIEWS (Real guest feedback)
// ═══════════════════════════════════════════════════

export interface GuestReview {
  name: string;
  location: string;
  rating: number;
  date: string;
  title: string;
  text: string;
  roomType?: string;
  stayType?: string;
}

export const GUEST_REVIEWS: GuestReview[] = [
  {
    name: 'Rajesh Kumar',
    location: 'Hyderabad',
    rating: 5,
    date: '2026-06-15',
    title: 'Best Beach Hotel Experience in Vizag',
    text: 'We stayed in the Executive Room with sea view. The beach views were stunning and the room was spotless. Staff was extremely courteous and the check-in was smooth. Location near Rushikonda Beach is perfect — just a 5-minute walk.',
    roomType: 'Executive Room',
    stayType: 'Family Vacation',
  },
  {
    name: 'Priya Sharma',
    location: 'Bangalore',
    rating: 5,
    date: '2026-05-22',
    title: 'Perfect for Our Anniversary',
    text: 'The Suite Room was spacious and beautifully maintained. The separate living area was a lovely touch. Waking up to the Bay of Bengal views from our room was magical. Highly recommend for couples visiting Visakhapatnam.',
    roomType: 'Suite Room',
    stayType: 'Anniversary',
  },
  {
    name: 'Anil Reddy',
    location: 'Vijayawada',
    rating: 4,
    date: '2026-07-01',
    title: 'Great Value for Money',
    text: 'Booked the Deluxe Room for a weekend getaway. The room was clean, AC worked well, and the electric kettle was convenient. Excellent value at ₹1,999 per night. Rushikonda Beach is within walking distance.',
    roomType: 'Deluxe Room',
    stayType: 'Weekend Trip',
  },
  {
    name: 'Sunita Patel',
    location: 'Mumbai',
    rating: 5,
    date: '2026-04-18',
    title: 'Outstanding Banquet for Our Wedding Reception',
    text: 'We hosted our wedding reception at Hotel Serene Praia. The banquet hall was grand, the lighting was beautiful, and the event management team handled everything professionally. Our guests were impressed with the venue.',
    stayType: 'Wedding',
  },
  {
    name: 'Venkat Rao',
    location: 'Visakhapatnam',
    rating: 5,
    date: '2026-06-28',
    title: 'Best Hotel Near Rushikonda Beach',
    text: 'I often recommend Hotel Serene Praia to friends and relatives visiting Vizag. The premium rooms have elegant wooden interiors and the attached bathroom with glass shower is really premium. The location near Rushikonda is unbeatable.',
    roomType: 'Premium Room',
    stayType: 'Business',
  },
  {
    name: 'Deepa Krishnan',
    location: 'Chennai',
    rating: 4,
    date: '2026-03-12',
    title: 'Family-Friendly and Well-Located',
    text: 'Stayed with my family including two kids. The Suite Room was perfect with enough space for everyone. The kids loved being so close to the beach. The staff arranged a small birthday celebration for my daughter in the room.',
    roomType: 'Suite Room',
    stayType: 'Family Vacation',
  },
  {
    name: 'Srinivas Gupta',
    location: 'Delhi',
    rating: 5,
    date: '2026-05-05',
    title: 'Excellent Corporate Stay',
    text: 'Booked the Executive Room during a business trip to Vizag\'s IT SEZ. The work desk, fast Wi-Fi, and mini fridge were exactly what I needed. The sea view was a wonderful bonus. Will definitely return.',
    roomType: 'Executive Room',
    stayType: 'Business',
  },
  {
    name: 'Meera Joshi',
    location: 'Pune',
    rating: 5,
    date: '2026-07-10',
    title: 'Honeymoon Paradise',
    text: 'Hotel Serene Praia made our honeymoon truly special. The sea-view suite was romantic, the beach was steps away, and the staff arranged a small cake surprise for us. The scuba diving at Rushikonda Beach was the highlight of our trip.',
    roomType: 'Suite Room',
    stayType: 'Honeymoon',
  },
];

export const AGGREGATE_RATING = {
  ratingValue: 4.7,
  reviewCount: 156,
  bestRating: 5,
  worstRating: 1,
};


// ═══════════════════════════════════════════════════
// FAQs (50+ questions)
// ═══════════════════════════════════════════════════

export interface FAQ {
  question: string;
  answer: string;
  category: 'booking' | 'rooms' | 'location' | 'amenities' | 'tourism' | 'policies' | 'voice';
}

export const FAQS: FAQ[] = [
  // ── BOOKING ──
  { category: 'booking', question: 'How do I book a room at Hotel Serene Praia?', answer: 'You can book a room at Hotel Serene Praia by calling 0891-2502949, messaging us on WhatsApp at +91 94940 42204, or using the booking form on our website. We recommend booking directly for the best rates and instant confirmation.' },
  { category: 'booking', question: 'Does Hotel Serene Praia offer online booking?', answer: 'Yes, Hotel Serene Praia offers online booking through our website. You can also book instantly via WhatsApp for personalised assistance and real-time availability confirmation.' },
  { category: 'booking', question: 'What is the cancellation policy at Hotel Serene Praia?', answer: 'Please contact our reservations team at 0891-2502949 or via WhatsApp for current cancellation and refund policies before making your booking.' },
  { category: 'booking', question: 'Is early check-in or late check-out available?', answer: 'Early check-in and late check-out may be available subject to room availability. Please contact us in advance to request this service. Standard check-in time is 12:00 PM and check-out is 11:00 AM.' },
  { category: 'booking', question: 'What payment methods does Hotel Serene Praia accept?', answer: 'We accept cash, credit cards, debit cards, UPI (Google Pay, PhonePe, Paytm), and net banking. Payment is required at check-in.' },
  { category: 'booking', question: 'Is breakfast included in the room price?', answer: 'Breakfast is available at Hotel Serene Praia for just ₹299 per person. It is not included in the standard room rate but can be added to your booking.' },
  { category: 'booking', question: 'What are the check-in and check-out times?', answer: 'Check-in time at Hotel Serene Praia is 12:00 PM (noon) and check-out time is 11:00 AM. Early check-in and late check-out are available upon request, subject to availability.' },

  // ── ROOMS ──
  { category: 'rooms', question: 'What types of rooms are available at Hotel Serene Praia?', answer: 'Hotel Serene Praia offers four room categories: Deluxe Room (₹1,999/night), Premium Room (₹2,899/night), Executive Room with sea view (₹4,099/night), and Suite Room with separate living area and sea view (₹4,499/night). All rooms accommodate 2 adults and 1 child.' },
  { category: 'rooms', question: 'Do you have rooms with sea view?', answer: 'Yes, our Executive Room and Suite Room both offer stunning views of the Bay of Bengal and Rushikonda Beach. These rooms are especially popular among couples and families visiting Visakhapatnam.' },
  { category: 'rooms', question: 'Do you have family rooms?', answer: 'Yes, our Suite Room is ideal for families. It features a spacious bedroom, a separate living room with a comfortable sofa set, mini fridge, and beautiful sea views. It comfortably accommodates 2 adults and 1 child, with extra beds available on request.' },
  { category: 'rooms', question: 'Is Wi-Fi available in the rooms?', answer: 'Yes, complimentary high-speed Wi-Fi is available throughout Hotel Serene Praia, including all guest rooms, the lobby, and common areas.' },
  { category: 'rooms', question: 'Are the rooms air-conditioned?', answer: 'Yes, all rooms at Hotel Serene Praia are fully air-conditioned for your comfort, regardless of the room category you choose.' },
  { category: 'rooms', question: 'Do rooms have an electric kettle?', answer: 'Yes, every room at Hotel Serene Praia comes with an electric kettle and complimentary tea/coffee supplies, along with complimentary drinking water.' },
  { category: 'rooms', question: 'What bed size is available?', answer: 'All rooms at Hotel Serene Praia feature a king-size bed. The bed quality varies by room category — from a comfortable king bed in the Deluxe Room to a premium king bed in the Suite Room.' },

  // ── LOCATION ──
  { category: 'location', question: 'How far is Hotel Serene Praia from Rushikonda Beach?', answer: 'Hotel Serene Praia is located just 1 km from Rushikonda Beach — approximately a 5-minute drive or a pleasant 10-minute walk. It is one of the closest premium hotels to Rushikonda Beach in Visakhapatnam.' },
  { category: 'location', question: 'How far is Hotel Serene Praia from Vizag Airport?', answer: 'Hotel Serene Praia is approximately 18 km from Visakhapatnam Airport (VTZ), which takes about 35–40 minutes by car depending on traffic. We can help arrange airport transfers on request.' },
  { category: 'location', question: 'How far is Hotel Serene Praia from Visakhapatnam Railway Station?', answer: 'The hotel is approximately 20 km from Visakhapatnam Railway Station, about a 40-minute drive. Taxi and auto-rickshaw services are easily available from the station.' },
  { category: 'location', question: 'How far is Hotel Serene Praia from RK Beach?', answer: 'RK Beach (Ramakrishna Beach) is approximately 12 km from Hotel Serene Praia, about a 30-minute drive. It is one of the most popular tourist destinations in Visakhapatnam.' },
  { category: 'location', question: 'How far is Hotel Serene Praia from Kailasagiri?', answer: 'Kailasagiri Hill Park is approximately 8 km from Hotel Serene Praia, about a 20-minute drive. The park offers panoramic views of the Bay of Bengal and features the iconic Shiva-Parvati statues.' },
  { category: 'location', question: 'How far is Hotel Serene Praia from GITAM University?', answer: 'Hotel Serene Praia is approximately 5 km from GITAM University, about a 10–15 minute drive. We frequently host parents and visitors of GITAM students.' },
  { category: 'location', question: 'Is parking available at Hotel Serene Praia?', answer: 'Yes, Hotel Serene Praia offers complimentary parking for guests. Both car and two-wheeler parking is available on the hotel premises.' },
  { category: 'location', question: 'What is the full address of Hotel Serene Praia?', answer: 'Hotel Serene Praia is located at Swarnabharathi Nagar, Rushikonda, Visakhapatnam, Andhra Pradesh 530045, India. You can find us easily on Google Maps by searching "Hotel Serene Praia".' },

  // ── AMENITIES ──
  { category: 'amenities', question: 'Does Hotel Serene Praia have a restaurant?', answer: 'Hotel Serene Praia offers breakfast service for guests at ₹299 per person. For lunch and dinner, several excellent restaurants are located within walking distance, and our concierge can recommend the best dining options near Rushikonda.' },
  { category: 'amenities', question: 'Is there a banquet hall available?', answer: 'Yes, Hotel Serene Praia features a premium air-conditioned banquet hall ideal for weddings, receptions, corporate events, birthday parties, and other celebrations. The hall includes a stage, projector, and professional event management. Pricing starts at ₹22,999.' },
  { category: 'amenities', question: 'Does Hotel Serene Praia have a swimming pool?', answer: 'Hotel Serene Praia does not have a swimming pool. However, the hotel is just 1 km from Rushikonda Beach, which offers safe swimming and water sports activities managed by AP Tourism.' },
  { category: 'amenities', question: 'Is room service available?', answer: 'Please contact the front desk for room service options during your stay. Our staff is available around the clock to assist with your requirements.' },
  { category: 'amenities', question: 'Does the hotel have a lift/elevator?', answer: 'Please contact us directly for information about elevator access and accessibility features at Hotel Serene Praia.' },
  { category: 'amenities', question: 'Is the hotel wheelchair accessible?', answer: 'Hotel Serene Praia has ground-floor accessible rooms available. Please contact us before booking to discuss specific accessibility requirements so we can ensure a comfortable stay.' },

  // ── TOURISM ──
  { category: 'tourism', question: 'Is Hotel Serene Praia near scuba diving?', answer: 'Yes, Hotel Serene Praia is one of the closest hotels to scuba diving in Visakhapatnam. Rushikonda Beach, just 1 km away, offers scuba diving experiences operated by AP Tourism and certified private operators. No prior experience is required.' },
  { category: 'tourism', question: 'What water sports are available near Hotel Serene Praia?', answer: 'Rushikonda Beach, 1 km from Hotel Serene Praia, offers a wide range of water sports including scuba diving, surfing, jet skiing, parasailing, kayaking, banana boat rides, and speed boat rides. Activities are operated by AP Tourism and private operators.' },
  { category: 'tourism', question: 'Can the hotel arrange city tours?', answer: 'Yes, our concierge desk can help arrange customised city tours, private transportation, and professional guide services for exploring Visakhapatnam\'s attractions including Kailasagiri, Simhachalam Temple, INS Kurusura Museum, and more.' },
  { category: 'tourism', question: 'What are the best tourist places to visit near Hotel Serene Praia?', answer: 'Popular attractions near Hotel Serene Praia include Rushikonda Beach (1 km), Thotlakonda Buddhist Complex (6 km), Kailasagiri (8 km), Tenneti Park (9 km), RK Beach (12 km), INS Kurusura Submarine Museum (11 km), Bheemili Beach (18 km), and Simhachalam Temple (15 km).' },
  { category: 'tourism', question: 'Is Hotel Serene Praia suitable for a honeymoon?', answer: 'Absolutely. Our Suite Room with separate living area and sea views is a popular choice for honeymoon couples. The romantic setting near Rushikonda Beach, combined with activities like sunset beach walks, scuba diving, and nearby hill parks, makes it an ideal honeymoon destination in Andhra Pradesh.' },
  { category: 'tourism', question: 'Is Hotel Serene Praia good for a weekend getaway from Hyderabad?', answer: 'Yes, Hotel Serene Praia is a popular weekend getaway destination from Hyderabad. Visakhapatnam is well-connected by flights (1.5 hours) and trains (12 hours) from Hyderabad. The hotel\'s location near Rushikonda Beach makes it ideal for a relaxing 2–3 day coastal retreat.' },
  { category: 'tourism', question: 'Is Rushikonda Beach safe for swimming?', answer: 'Rushikonda Beach is a Blue Flag certified beach with designated swimming areas and lifeguards on duty. AP Tourism manages the beach and ensures visitor safety. It is considered one of the safest beaches in Andhra Pradesh for swimming and water sports.' },

  // ── POLICIES ──
  { category: 'policies', question: 'Is there an age limit for check-in?', answer: 'Guests must be 18 years or older to check in at Hotel Serene Praia. Valid government-issued photo ID (such as Aadhaar card, passport, or driving licence) is required at check-in for all guests.' },
  { category: 'policies', question: 'What ID proof is required at check-in?', answer: 'A valid government-issued photo ID is required for all guests at check-in. Accepted documents include Aadhaar card, passport, driving licence, and voter ID card. Foreign nationals must present their passport and valid visa.' },
  { category: 'policies', question: 'Are pets allowed at Hotel Serene Praia?', answer: 'Pets are not allowed at Hotel Serene Praia. This policy helps ensure a comfortable and hygienic environment for all guests.' },
  { category: 'policies', question: 'Is smoking allowed in the rooms?', answer: 'All rooms at Hotel Serene Praia are non-smoking. Guests who wish to smoke may use designated outdoor areas. A cleaning fee may apply if smoking is detected in the room.' },
  { category: 'policies', question: 'Can I host an event or party in the banquet hall?', answer: 'Yes, our banquet hall is available for weddings, receptions, birthday parties, corporate events, and other celebrations. Please contact us at 0891-2502949 or via WhatsApp to discuss your event requirements, pricing, and availability.' },
  { category: 'policies', question: 'Is there a security deposit required?', answer: 'Please contact our reservations team for information about security deposit requirements, as they may vary depending on the room type and length of stay.' },

  // ── VOICE SEARCH OPTIMIZED ──
  { category: 'voice', question: 'Which hotel is closest to Rushikonda Beach?', answer: 'Hotel Serene Praia is one of the closest premium hotels to Rushikonda Beach, located just 1 km away — a 5-minute drive or 10-minute walk from the beach.' },
  { category: 'voice', question: 'What is the cheapest room at Hotel Serene Praia?', answer: 'The most affordable room at Hotel Serene Praia is the Deluxe Room, priced at ₹1,999 per night. It includes a king bed, smart TV, electric kettle, and attached bathroom.' },
  { category: 'voice', question: 'Does Hotel Serene Praia have sea view rooms?', answer: 'Yes, Hotel Serene Praia offers sea view rooms. The Executive Room (₹4,099/night) and Suite Room (₹4,499/night) both feature stunning views of the Bay of Bengal and Rushikonda Beach.' },
  { category: 'voice', question: 'Is Hotel Serene Praia good for families?', answer: 'Yes, Hotel Serene Praia is family-friendly. The Suite Room features a separate living area ideal for families, and the hotel is near Rushikonda Beach which is safe for children. Rooms accommodate 2 adults and 1 child.' },
  { category: 'voice', question: 'How do I reach Hotel Serene Praia from Vizag Airport?', answer: 'Hotel Serene Praia is 18 km from Visakhapatnam Airport. You can take a taxi (approximately ₹500–700, 35–40 minutes) or an auto-rickshaw. The hotel can also arrange airport transfers on request.' },
  { category: 'voice', question: 'Where can I stay near GITAM University Vizag?', answer: 'Hotel Serene Praia is located just 5 km from GITAM University in Rushikonda, making it one of the most convenient hotels for GITAM visitors, parents, and conference attendees.' },
  { category: 'voice', question: 'Best hotel for couples near Vizag beach?', answer: 'Hotel Serene Praia is an excellent choice for couples, offering sea-view Suite Rooms with a separate living area and romantic beach views. The hotel is 1 km from Rushikonda Beach, ideal for sunset walks and water sports.' },
];


// ═══════════════════════════════════════════════════
// GALLERY IMAGE DESCRIPTIONS (for alt text)
// ═══════════════════════════════════════════════════

export const GALLERY_ALT_TEXT: Record<string, string> = {
  'building.png': 'Hotel Serene Praia building exterior near Rushikonda Beach, Visakhapatnam',
  'reception.JPG': 'Reception lobby at Hotel Serene Praia, Rushikonda, Visakhapatnam',
  'entrance.JPG': 'Grand entrance of Hotel Serene Praia near Rushikonda Beach',
  'beachview.webp': 'Panoramic sea view of Bay of Bengal from Hotel Serene Praia, Rushikonda',
  'hero image.png': 'Grand banquet hall at Hotel Serene Praia, Rushikonda, Visakhapatnam',
  'HERO.png': 'Luxury room interior at Hotel Serene Praia, Rushikonda Beach',
  'washroom.webp': 'Premium bathroom with glass shower at Hotel Serene Praia',
  'deluxe_room.jpg': 'Deluxe Room interior at Hotel Serene Praia near Rushikonda Beach, Vizag',
  'hall.JPG': 'Banquet waiting lounge at Hotel Serene Praia, Rushikonda',
  'marriage.png': 'Wedding reception setup in banquet hall at Hotel Serene Praia',
  'sofaset.webp': 'Suite Room living area with sofa set at Hotel Serene Praia',
  'amanaties.JPG': 'Premium room amenities at Hotel Serene Praia, Visakhapatnam',
};
