export type RoomStatus = 'Available' | 'Occupied' | 'Reserved' | 'Cleaning' | 'Maintenance' | 'Blocked';

export interface RoomInventory {
  id: string;
  roomNumber: string;
  roomTypeId: string;
  status: RoomStatus;
  floor: number;
  currentGuest?: string;
  bookingSource?: string;
  checkIn?: string;
  checkOut?: string;
  notes?: string;
  history?: Array<{
    date: string;
    action: string;
    user: string;
  }>;
}

export interface RoomPricing {
  standard: number;
  weekend: number;
  festival: number;
  seasonal: number;
  holiday: number;
  custom: number;
}

export interface RoomImage {
  id: string;
  url: string;
  isFeatured: boolean;
  order: number;
}

export interface RoomType {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  amenities: string[];
  capacity: number;
  beds: string;
  bathrooms: number;
  area: string; // e.g. "45 sqm"
  pricing: RoomPricing;
  images: RoomImage[];
  seoTitle?: string;
  seoDescription?: string;
  seoSlug?: string;
}

export interface DashboardKPIs {
  occupancyRate: number;
  availableRooms: number;
  availableBanquets: number;
  checkInsToday: number;
  checkOutsToday: number;
  pendingBookings: number;
  cancelledBookings: number;
  revenueToday: number;
  revenueMonthly: number;
}

export interface ChartDataPoint {
  name: string;
  value: number;
}

export interface RecentActivity {
  id: string;
  type: 'booking_created' | 'booking_cancelled' | 'check_in' | 'check_out' | 'cleaning' | 'maintenance';
  message: string;
  timestamp: string;
}

export interface Booking {
  id: string;
  guestName: string;
  guestPhone: string;
  guestEmail?: string;
  roomTypeId: string;
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
  numberOfRooms: number;
  specialRequests?: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  totalPrice?: number;
  createdAt: string;
  updatedAt: string;
}
