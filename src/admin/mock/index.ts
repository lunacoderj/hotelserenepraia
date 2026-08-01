import { RoomType, RoomInventory, DashboardKPIs, ChartDataPoint, RecentActivity } from '../types';

export const mockRoomTypes: Record<string, RoomType> = {
  deluxe: {
    id: 'deluxe',
    title: 'Deluxe Room',
    subtitle: 'Comfort and Elegance',
    description: 'Experience comfort with our special Deluxe Room promotion. Perfect for a relaxing getaway.',
    amenities: ['Comfortable Stay', 'Electric Kettle', 'Attached Bathroom', 'Smart TV', 'Workspace'],
    capacity: 2,
    beds: '1 King Bed',
    bathrooms: 1,
    area: '35 sqm',
    pricing: {
      standard: 2700,
      weekend: 3200,
      festival: 4000,
      seasonal: 3000,
      holiday: 4500,
      custom: 2700,
    },
    images: [
      { id: 'img1', url: 'https://1zn1w7lqhv0bhjja.public.blob.vercel-storage.com/hotel-serene/deluxe_room.jpg', isFeatured: true, order: 0 }
    ],
    seoTitle: 'Deluxe Room | Hotel Serene Praia',
    seoDescription: 'Book our Deluxe Room for a comfortable stay.',
    seoSlug: 'deluxe'
  },
  premium: {
    id: 'premium',
    title: 'Premium Room',
    subtitle: 'Enhanced Luxury',
    description: 'Elevate your stay with our Premium Room. Enjoy enhanced amenities and sophisticated design.',
    amenities: ['Premium Interiors', 'Electric Kettle', 'Smart TV', 'Workspace', 'Premium Bathroom'],
    capacity: 2,
    beds: '1 King Bed',
    bathrooms: 1,
    area: '45 sqm',
    pricing: {
      standard: 4500,
      weekend: 5000,
      festival: 6000,
      seasonal: 4800,
      holiday: 6500,
      custom: 4500,
    },
    images: [
      { id: 'img2', url: 'https://1zn1w7lqhv0bhjja.public.blob.vercel-storage.com/hotel-serene/IMG_3020.JPG-1200x900.webp', isFeatured: true, order: 0 }
    ],
    seoTitle: 'Premium Room | Hotel Serene Praia',
    seoDescription: 'Book our Premium Room for a luxury stay.',
    seoSlug: 'premium'
  }
};

export const mockInventory: RoomInventory[] = [
  { id: 'D101', roomNumber: 'D101', roomTypeId: 'deluxe', status: 'Available', floor: 1 },
  { id: 'D102', roomNumber: 'D102', roomTypeId: 'deluxe', status: 'Occupied', floor: 1, currentGuest: 'John Doe', checkIn: '2026-07-29', checkOut: '2026-08-01' },
  { id: 'P201', roomNumber: 'P201', roomTypeId: 'premium', status: 'Cleaning', floor: 2 },
  { id: 'P202', roomNumber: 'P202', roomTypeId: 'premium', status: 'Reserved', floor: 2, currentGuest: 'Jane Smith', checkIn: '2026-07-31' },
  { id: 'P203', roomNumber: 'P203', roomTypeId: 'premium', status: 'Maintenance', floor: 2, notes: 'AC Repair' },
];

export const mockActivities: RecentActivity[] = [
  { id: '1', type: 'booking_created', message: 'New booking for D101 by Alice', timestamp: new Date().toISOString() },
  { id: '2', type: 'check_out', message: 'Room P202 Checked Out', timestamp: new Date(Date.now() - 3600000).toISOString() },
  { id: '3', type: 'cleaning', message: 'Room P201 is now Cleaning', timestamp: new Date(Date.now() - 7200000).toISOString() },
];
