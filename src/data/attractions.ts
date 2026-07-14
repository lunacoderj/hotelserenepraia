import { Attraction } from '../types';

const ORIGIN = encodeURIComponent('Hotel Serene Praia, Visakhapatnam, Andhra Pradesh');

export const attractionsData: Attraction[] = [

  {
    id: 'rushikonda-beach',
    name: 'Rushikonda Beach',
    distance: '1 km',
    time: '5 mins',
    description: 'A pristine, Blue Flag certified beach known for its golden sands and thrilling water sports. Perfect for an evening stroll, surfing, or a morning jog.',
    image: 'https://1zn1w7lqhv0bhjja.public.blob.vercel-storage.com/hotel-serene/rushikondabeach.jpg',
    mapLink: `https://www.google.com/maps/dir/?api=1&origin=${ORIGIN}&destination=${encodeURIComponent('Rushikonda Beach, Visakhapatnam')}`
  },
  {
    id: 'kailasagiri',
    name: 'Kailasagiri Park',
    distance: '8 km',
    time: '20 mins',
    description: 'A beautifully manicured hilltop park offering panoramic views of the Bay of Bengal and the city. Features a scenic ropeway and the giant Shiva-Parvati statues.',
    image: 'https://1zn1w7lqhv0bhjja.public.blob.vercel-storage.com/hotel-serene/kailasagiri.png',
    mapLink: `https://www.google.com/maps/dir/?api=1&origin=${ORIGIN}&destination=${encodeURIComponent('Kailasagiri, Visakhapatnam')}`
  },
  {
    id: 'thotlakonda',
    name: 'Thotlakonda Beach',
    distance: '6 km',
    time: '15 mins',
    description: 'A serene and scenic beach offering beautiful views of the Bay of Bengal. Perfect for a peaceful walk and experiencing the calm coastal breeze.',
    image: 'https://1zn1w7lqhv0bhjja.public.blob.vercel-storage.com/hotel-serene/Thotlakonda-Beach.png',
    mapLink: 'https://maps.app.goo.gl/YQCg9qW1jc1WPDNX6'
  },
  {
    id: 'bheemili-beach',
    name: 'Bheemili Beach',
    distance: '18 km',
    time: '35 mins',
    description: 'A historic beach town featuring rich Dutch colonial heritage, a charming 19th-century lighthouse, and vast, peaceful stretches of pristine sand.',
    image: 'https://1zn1w7lqhv0bhjja.public.blob.vercel-storage.com/hotel-serene/bheemili-beach.png',
    mapLink: `https://www.google.com/maps/dir/?api=1&origin=${ORIGIN}&destination=${encodeURIComponent('Bheemili Beach, Visakhapatnam')}`
  },
  {
    id: 'rk-beach',
    name: 'Ramakrishna (RK) Beach',
    distance: '12 km',
    time: '30 mins',
    description: 'The bustling heart of the city\'s coastline, lined with vibrant food stalls, parks, and significant cultural memorials. The perfect spot to feel the city pulse.',
    image: 'https://1zn1w7lqhv0bhjja.public.blob.vercel-storage.com/hotel-serene/rk_beach.png',
    mapLink: `https://www.google.com/maps/dir/?api=1&origin=${ORIGIN}&destination=${encodeURIComponent('RK Beach, Visakhapatnam')}`
  },
  {
    id: 'submarine-museum',
    name: 'INS Kursura Submarine Museum',
    distance: '11 km',
    time: '25 mins',
    description: 'A real decommissioned Indian Navy submarine resting on RK beach. Step inside to experience the fascinating life of submariners.',
    image: 'https://1zn1w7lqhv0bhjja.public.blob.vercel-storage.com/hotel-serene/submarine.png',
    mapLink: `https://www.google.com/maps/dir/?api=1&origin=${ORIGIN}&destination=${encodeURIComponent('INS Kursura Submarine Museum, Visakhapatnam')}`
  },
  {
    id: 'tenneti-park',
    name: 'Tenneti Park',
    distance: '9 km',
    time: '22 mins',
    description: 'One of the oldest parks in the city offering breathtaking cliffside views of the coastline. Famous as a filming location and romantic sunset spot.',
    image: 'https://1zn1w7lqhv0bhjja.public.blob.vercel-storage.com/hotel-serene/tennetipark.png',
    mapLink: `https://www.google.com/maps/dir/?api=1&origin=${ORIGIN}&destination=${encodeURIComponent('Tenneti Park, Visakhapatnam')}`
  },
  {
    id: 'palm-beach',
    name: 'Palm Beach Avenue',
    distance: '10 km',
    time: '24 mins',
    description: 'A scenic, palm-fringed stretch along the coast known for its luxury vibe and tranquil sea breeze. Ideal for a relaxing drive or seaside dining.',
    image: 'https://1zn1w7lqhv0bhjja.public.blob.vercel-storage.com/hotel-serene/plam-beach.png',
    mapLink: `https://www.google.com/maps/dir/?api=1&origin=${ORIGIN}&destination=${encodeURIComponent('Palm Beach, Visakhapatnam')}`
  },
  {
    id: 'temples-of-vizag',
    name: 'Sacred Temples of Vizag',
    distance: 'Variable',
    time: 'Flexible',
    description: 'Discover the spiritual side of Visakhapatnam by visiting ancient and beautifully crafted temples including ISKCON, Rushikonda Venkateswara Swami Temple, and the historic Simhachalam.',
    image: [
      'https://1zn1w7lqhv0bhjja.public.blob.vercel-storage.com/rooms/iskcon.png',
      'https://1zn1w7lqhv0bhjja.public.blob.vercel-storage.com/rooms/rushikonda%20Venkateswara%20swami%20temple.png',
      'https://1zn1w7lqhv0bhjja.public.blob.vercel-storage.com/rooms/simhachalam.png'
    ],
    mapLink: `https://www.google.com/maps/dir/?api=1&origin=${ORIGIN}&destination=${encodeURIComponent('Simhachalam Temple, Visakhapatnam')}`
  }
];
