import { Offer } from '../types';

// Let's set the target date to 7 days from now for the demo
const nextWeek = new Date();
nextWeek.setDate(nextWeek.getDate() + 7);
const targetDateString = nextWeek.toISOString();

export const offersData: Offer[] = [
  {
    id: 'deluxe',
    title: 'Deluxe Room Offer',
    slug: 'deluxe-offer',
    description: 'Experience comfort with our special Deluxe Room promotion. Perfect for a relaxing getaway.',
    validUntil: targetDateString,
    actualPrice: 2700,
    offerPrice: 1999,
    features: ['Comfortable Stay', 'Electric Kettle', 'Attached Bathroom', 'Smart TV', 'Workspace'],
    terms: ['Valid for bookings made before the timer expires.', 'Subject to availability.', 'Non-refundable.'],
    image: 'https://1zn1w7lqhv0bhjja.public.blob.vercel-storage.com/hotel-serene/deluxe_room.jpg'
  },
  {
    id: 'premium',
    title: 'Premium Room Offer',
    slug: 'premium-offer',
    description: 'Elevate your stay with our Premium Room. Enjoy enhanced amenities and sophisticated design.',
    validUntil: targetDateString,
    actualPrice: 4500,
    offerPrice: 2899,
    features: ['Premium Interiors', 'Electric Kettle', 'Smart TV', 'Workspace', 'Premium Bathroom'],
    terms: ['Valid for bookings made before the timer expires.', 'Subject to availability.', 'Non-refundable.'],
    image: 'https://1zn1w7lqhv0bhjja.public.blob.vercel-storage.com/hotel-serene/IMG_3020.JPG-1200x900.webp'
  },
  {
    id: 'suite',
    title: 'Suite Room Offer',
    slug: 'suite-offer',
    description: 'Indulge in spacious elegance. Our Suite Room offers a separate living area and breathtaking sea views.',
    validUntil: targetDateString,
    actualPrice: 6500,
    offerPrice: 4499,
    features: ['2 Rooms', 'Living Area & Sofa', 'Mini Fridge', 'Electric Kettle', 'Sea View'],
    terms: ['Valid for bookings made before the timer expires.', 'Subject to availability.', 'Non-refundable.'],
    image: 'https://1zn1w7lqhv0bhjja.public.blob.vercel-storage.com/hotel-serene/beachview.webp'
  },
  {
    id: 'executive',
    title: 'Executive Room Offer',
    slug: 'executive-offer',
    description: 'The pinnacle of luxury. Breathtaking views and premium amenities await in our Executive Room.',
    validUntil: targetDateString,
    actualPrice: 6500,
    offerPrice: 4099,
    features: ['Premium Executive Stay', 'Mini Fridge', 'Electric Kettle', 'Sea View', 'Premium Bathroom'],
    terms: ['Valid for bookings made before the timer expires.', 'Subject to availability.', 'Non-refundable.'],
    image: 'https://1zn1w7lqhv0bhjja.public.blob.vercel-storage.com/hotel-serene/poster.png'
  },
  {
    id: 'banquet',
    title: 'Grand Banquet Offer',
    slug: 'banquet-offer',
    description: 'Host your unforgettable event in our grand banquet hall. Perfect for weddings and corporate events.',
    validUntil: targetDateString,
    actualPrice: 30000,
    offerPrice: 22999,
    features: ['Celebrations', 'Parties', 'Functions', 'Corporate Events', 'Weddings', 'Birthdays'],
    terms: ['Valid for events booked before the timer expires.', 'Subject to availability.', 'Advance booking required.'],
    image: 'https://1zn1w7lqhv0bhjja.public.blob.vercel-storage.com/hotel-serene/hero%20image.png'
  }
];
