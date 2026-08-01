import { DashboardKPIs, ChartDataPoint, RecentActivity } from '../types';
import { mockActivities } from '../mock';
import { supabase, hasSupabaseConfig } from '../utils/supabaseClient';

export const dashboardService = {
  getKPIs: async (): Promise<DashboardKPIs> => {
    if (!hasSupabaseConfig) {
      return {
        occupancyRate: 0,
        availableRooms: 0,
        availableBanquets: 0,
        checkInsToday: 0,
        checkOutsToday: 0,
        pendingBookings: 0,
        cancelledBookings: 0,
        revenueToday: 0,
        revenueMonthly: 0
      };
    }

    // Fetch Inventory
    const { data: inventory } = await supabase.from('inventory').select('status, room_type_id');
    
    const rooms = inventory?.filter(r => r.room_type_id !== 'banquet') || [];
    const banquets = inventory?.filter(r => r.room_type_id === 'banquet') || [];

    const totalRooms = rooms.length;
    const occupiedRooms = rooms.filter(r => r.status === 'Occupied').length;
    const availableRooms = rooms.filter(r => r.status === 'Available').length;
    const availableBanquets = banquets.filter(r => r.status === 'Available').length;
    
    const occupancyRate = totalRooms > 0 ? Math.round((occupiedRooms / totalRooms) * 100) : 0;

    // Fetch Bookings
    const today = new Date().toISOString().split('T')[0];
    const { data: bookings } = await supabase.from('bookings').select('status, check_in, check_out');
    
    const pendingBookings = bookings?.filter(b => b.status === 'pending').length || 0;
    const cancelledBookings = bookings?.filter(b => b.status === 'cancelled').length || 0;
    const checkInsToday = bookings?.filter(b => b.check_in === today && b.status === 'confirmed').length || 0;
    const checkOutsToday = bookings?.filter(b => b.check_out === today && b.status === 'confirmed').length || 0;

    return {
      occupancyRate,
      availableRooms,
      availableBanquets,
      checkInsToday,
      checkOutsToday,
      pendingBookings,
      cancelledBookings,
      revenueToday: 0, 
      revenueMonthly: 0 
    };
  },

  getRevenueData: async (): Promise<ChartDataPoint[]> => {
    // Returns zeroed placeholder data. 
    return [
      { name: 'Mon', value: 0 },
      { name: 'Tue', value: 0 },
      { name: 'Wed', value: 0 },
      { name: 'Thu', value: 0 },
      { name: 'Fri', value: 0 },
      { name: 'Sat', value: 0 },
      { name: 'Sun', value: 0 },
    ];
  },

  getRecentActivity: async (): Promise<RecentActivity[]> => {
    if (!hasSupabaseConfig) return [];
    
    // Fetch real recent bookings
    const { data: recentBookings } = await supabase
      .from('bookings')
      .select('id, guest_name, created_at, status')
      .order('created_at', { ascending: false })
      .limit(5);

    if (!recentBookings) return [];

    return recentBookings.map((b: any) => ({
      id: b.id,
      type: b.status === 'pending' ? 'booking_created' : 'booking_cancelled',
      message: `${b.guest_name} - ${b.status}`,
      timestamp: new Date(b.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }));
  },

  getSearchConsoleData: async () => {
    if (!hasSupabaseConfig) return null;
    
    try {
      const { data, error } = await supabase.functions.invoke('analytics');
      if (error) {
        console.error('Error invoking analytics function:', error);
        return null;
      }
      
      if (data && data.error) {
        console.error('Google Search Console API Error:', data.error);
        return null;
      }
      
      return data;
    } catch (err) {
      console.error('Failed to fetch analytics:', err);
      return null;
    }
  }
};
