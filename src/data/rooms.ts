import { Room } from '../types';

export const roomsData: Room[] = [
  {
    id: 'deluxe',
    name: 'Deluxe Room',
    slug: 'deluxe-room',
    actualPrice: 2700,
    offerPrice: 1999,
    shortDescription: 'Ideal for Solo Travelers, Couples, & Business Travelers',
    description: 'Our Deluxe Room offers a cozy and well-appointed space with a Comfortable King Size Bed, Premium Mattress, and Fresh Linen. Complete with a Smart LED TV, Wooden TV Unit, and a Dedicated Work Desk. Enjoy natural daylight through large windows in a space perfectly designed for short stays.',
    capacity: 2,
    size: 'Spacious',
    bedType: 'Comfortable King Size Bed',
    features: ['Premium Mattress & Fresh Linen', 'Upholstered Headboard', 'Bedside Tables', 'Warm Ambient Lighting', 'Wooden TV Unit', 'Smart LED TV', 'Dedicated Work Desk', 'Chair', 'Spacious Wardrobe', 'Electric Kettle', 'Complimentary Drinking Water', 'Air Conditioning', 'Large Window', 'Natural Daylight'],
    amenities: ['Air Conditioning', 'Smart TV', 'Electric Kettle', 'Work Desk', 'Wardrobe', 'Attached Bathroom', 'High-Speed Wi-Fi'],
    details: {
      roomAmenities: ['Air Conditioning', 'Smart TV', 'Electric Kettle', 'Work Desk', 'Wardrobe', 'Attached Bathroom', 'High-Speed Wi-Fi'],
      includedInSuite: [
        'Attached Bathroom',
        'Glass Shower Partition',
        'Modern Wash Basin',
        'Vanity Mirror',
        'Western Toilet',
        'Hot & Cold Water',
        'Fresh Towels'
      ]
    },
    images: {
      main: 'https://1zn1w7lqhv0bhjja.public.blob.vercel-storage.com/rooms/deluxe_bed.jpeg',
      gallery: [
        'https://1zn1w7lqhv0bhjja.public.blob.vercel-storage.com/rooms/deluxe_bed.jpeg',
        'https://1zn1w7lqhv0bhjja.public.blob.vercel-storage.com/hotel-serene/deluxe_thumbnail.png',
        'https://1zn1w7lqhv0bhjja.public.blob.vercel-storage.com/hotel-serene/deluxe_room.jpg',
        'https://1zn1w7lqhv0bhjja.public.blob.vercel-storage.com/hotel-serene/bedroom.png',
        'https://1zn1w7lqhv0bhjja.public.blob.vercel-storage.com/hotel-serene/bedroombcakview.png',
        'https://1zn1w7lqhv0bhjja.public.blob.vercel-storage.com/hotel-serene/deluxe_bathroom.png'
      ]
    }
  },
  {
    id: 'premium',
    name: 'Premium Room',
    slug: 'premium-room',
    actualPrice: 4500,
    offerPrice: 2899,
    shortDescription: 'Elevated luxury for Couples & Premium Travelers',
    description: 'Experience elevated luxury with our Premium Room featuring a Premium King Size Bed and Elegant Wooden Interior. Refresh yourself in the Premium Attached Bathroom with a Glass Shower Area, and stay productive at the Dedicated Work Desk with Natural Lighting.',
    capacity: 2,
    size: 'Spacious',
    bedType: 'Premium King Size Bed',
    features: ['Premium Upholstered Headboard', 'Elegant Wooden Interior', 'Wooden TV Panel', 'Smart LED TV', 'Dedicated Work Desk', 'Comfortable Chair', 'Spacious Wardrobe', 'Electric Kettle', 'Complimentary Drinking Water', 'Air Conditioning', 'Large Window', 'Natural Lighting'],
    amenities: ['Air Conditioning', 'Smart TV', 'Electric Kettle', 'Work Desk', 'Wardrobe', 'Attached Bathroom', 'High-Speed Wi-Fi'],
    details: {
      roomAmenities: ['Air Conditioning', 'Smart TV', 'Electric Kettle', 'Work Desk', 'Wardrobe', 'Attached Bathroom', 'High-Speed Wi-Fi'],
      includedInSuite: [
        'Premium Attached Bathroom',
        'Glass Shower Area',
        'Premium Wash Basin',
        'Vanity Mirror',
        'Western Toilet',
        'Hot & Cold Water',
        'Fresh Towels'
      ]
    },
    images: {
      main: 'https://1zn1w7lqhv0bhjja.public.blob.vercel-storage.com/hotel-serene/IMG_3041.JPG-1200x900.webp',
      gallery: [
        'https://1zn1w7lqhv0bhjja.public.blob.vercel-storage.com/hotel-serene/IMG_3020.JPG-1200x900.webp',
        'https://1zn1w7lqhv0bhjja.public.blob.vercel-storage.com/hotel-serene/IMG_3041.JPG-1200x900.webp',
        'https://1zn1w7lqhv0bhjja.public.blob.vercel-storage.com/rooms/premium_washroom.jpeg',
        'https://1zn1w7lqhv0bhjja.public.blob.vercel-storage.com/hotel-serene/WhatsApp-Image-2026-05-23-at-19.50.34-1200x900.webp'
      ]
    }
  },
  {
    id: 'executive',
    name: 'Executive Room',
    slug: 'executive-room',
    actualPrice: 6500,
    offerPrice: 4499,
    shortDescription: 'Executive luxury with stunning Beach Views',
    description: 'Designed for Business Executives and Premium Travelers, the Executive Room represents the pinnacle of luxury. Wake up to breathtaking Beach Views right from your Executive King Size Bed. Enjoy the convenience of a Mini Fridge, Electric Kettle, and a Premium Attached Bathroom with a Glass Shower Area.',
    capacity: 2,
    size: 'Spacious',
    bedType: 'Executive King Size Bed',
    features: ['Premium Upholstered Headboard', 'Beach View', 'Smart LED TV', 'Dedicated Work Desk', 'Comfortable Chair', 'Spacious Wardrobe', 'Mini Fridge', 'Electric Kettle', 'Complimentary Drinking Water', 'Air Conditioning', 'Large Window', 'Natural Lighting'],
    amenities: ['Beach View', 'Mini Fridge', 'Electric Kettle', 'Smart TV', 'Air Conditioning', 'Work Desk', 'Wardrobe', 'Attached Bathroom', 'High-Speed Wi-Fi'],
    details: {
      roomAmenities: ['Beach View', 'Mini Fridge', 'Electric Kettle', 'Smart TV', 'Air Conditioning', 'Work Desk', 'Wardrobe', 'Attached Bathroom', 'High-Speed Wi-Fi'],
      includedInSuite: [
        'Premium Attached Bathroom',
        'Glass Shower Area',
        'Premium Wash Basin',
        'Vanity Mirror',
        'Western Toilet',
        'Hot & Cold Water',
        'Fresh Towels'
      ]
    },
    images: {
      main: 'https://1zn1w7lqhv0bhjja.public.blob.vercel-storage.com/rooms/executive_room.jpeg',
      gallery: [
        'https://1zn1w7lqhv0bhjja.public.blob.vercel-storage.com/rooms/executive_room.jpeg',
        'https://1zn1w7lqhv0bhjja.public.blob.vercel-storage.com/hotel-serene/HERO.png',
        'https://1zn1w7lqhv0bhjja.public.blob.vercel-storage.com/hotel-serene/image1.png',
        'https://1zn1w7lqhv0bhjja.public.blob.vercel-storage.com/hotel-serene/image2.png',
        'https://1zn1w7lqhv0bhjja.public.blob.vercel-storage.com/hotel-serene/image3.png',
        'https://1zn1w7lqhv0bhjja.public.blob.vercel-storage.com/hotel-serene/image4.png',
        'https://1zn1w7lqhv0bhjja.public.blob.vercel-storage.com/hotel-serene/image5.png',
        'https://1zn1w7lqhv0bhjja.public.blob.vercel-storage.com/hotel-serene/poster.png'
      ]
    }
  },
  {
    id: 'suite',
    name: 'Suite Room',
    slug: 'suite-room',
    actualPrice: 6500,
    offerPrice: 4399,
    shortDescription: 'One Bedroom & Separate Living Room with Beach Views',
    description: 'Our Suite Room defines spacious elegance, perfectly suited for Families, VIP Guests, and Honeymoon Couples. It features a Premium King Size Bed in a master bedroom and a Separate Living Room with a Comfortable Sofa Set. Enjoy breathtaking Beach Views and a fully equipped Premium Bathroom.',
    capacity: 4,
    size: 'Extra Spacious',
    bedType: 'Premium King Size Bed',
    features: ['One Spacious Bedroom', 'One Separate Living Room', 'Dedicated Sitting Area', 'Sofa Lounge', 'Upholstered Headboard', 'Smart LED TV', 'Spacious Wardrobe', 'Dedicated Work Desk', 'Air Conditioning', 'Beach View', 'Comfortable Sofa Set', 'Coffee Table', 'Bright Interior'],
    amenities: ['Beach View', 'Separate Living Room', 'Sofa Lounge', 'Mini Fridge', 'Electric Kettle', 'Smart TV', 'Air Conditioning', 'Work Desk', 'Wardrobe', 'Attached Bathroom', 'High-Speed Wi-Fi'],
    details: {
      roomAmenities: ['Beach View', 'Separate Living Room', 'Sofa Lounge', 'Mini Fridge', 'Electric Kettle', 'Smart TV', 'Air Conditioning', 'Work Desk', 'Wardrobe', 'Attached Bathroom', 'High-Speed Wi-Fi'],
      includedInSuite: [
        'Premium Attached Bathroom',
        'Glass Shower Area',
        'Premium Wash Basin',
        'Vanity Mirror',
        'Western Toilet',
        'Hot & Cold Water',
        'Fresh Towels'
      ]
    },
    images: {
      main: 'https://1zn1w7lqhv0bhjja.public.blob.vercel-storage.com/hotel-serene/beachview.webp',
      gallery: [
        'https://1zn1w7lqhv0bhjja.public.blob.vercel-storage.com/hotel-serene/beachview.webp',
        'https://1zn1w7lqhv0bhjja.public.blob.vercel-storage.com/hotel-serene/WhatsApp-Image-2026-04-28-at-20.50.00-1200x900.webp',
        'https://1zn1w7lqhv0bhjja.public.blob.vercel-storage.com/hotel-serene/sofaset.webp',
        'https://1zn1w7lqhv0bhjja.public.blob.vercel-storage.com/hotel-serene/washroom.webp'
      ]
    }
  }
];
