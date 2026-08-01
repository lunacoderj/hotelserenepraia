import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { supabase } from '../utils/supabaseClient';
import { Booking } from '../types';

interface BookingsStore {
  bookings: Booking[];
  isLoading: boolean;
  fetchBookings: () => Promise<void>;
}

export const useBookingsStore = create<BookingsStore>()(
  persist(
    (set) => ({
      bookings: [],
      isLoading: false,

      fetchBookings: async () => {
        set({ isLoading: true });
        try {
          const { data, error } = await supabase
            .from('bookings')
            .select('*')
            .order('created_at', { ascending: false });

          if (error) throw error;
          
          const formatted = data.map((b: any) => ({
            id: b.id,
            guestName: b.guest_name,
            guestPhone: b.guest_phone,
            guestEmail: b.guest_email,
            roomTypeId: b.room_type_id,
            checkIn: b.check_in,
            checkOut: b.check_out,
            adults: b.adults,
            children: b.children,
            numberOfRooms: b.number_of_rooms,
            specialRequests: b.special_requests,
            status: b.status,
            totalPrice: b.total_price,
            createdAt: b.created_at,
            updatedAt: b.updated_at
          })) as Booking[];

          set({ bookings: formatted });
        } catch (err) {
          console.error("Failed to fetch bookings (possibly offline)", err);
        } finally {
          set({ isLoading: false });
        }
      },
    }),
    {
      name: 'hsp-bookings-storage',
      partialize: (state) => ({ 
        bookings: state.bookings
      }),
    }
  )
);
