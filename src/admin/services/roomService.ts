import { supabase, hasSupabaseConfig } from '../utils/supabaseClient';
import { RoomType, RoomInventory } from '../types';

export const roomService = {
  getRoomTypes: async (): Promise<RoomType[]> => {
    if (!hasSupabaseConfig) return [];
    
    const { data, error } = await supabase
      .from('room_types')
      .select('*')
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Error fetching room types:', error);
      return [];
    }
    
    // Transform snake_case from DB back to camelCase for frontend
    return data.map(d => ({
      ...d,
      seoTitle: d.seo_title,
      seoDescription: d.seo_description,
      seoSlug: d.seo_slug
    })) as RoomType[];
  },
  
  getInventory: async (): Promise<RoomInventory[]> => {
    if (!hasSupabaseConfig) return [];

    const { data, error } = await supabase
      .from('inventory')
      .select('*')
      .order('room_number', { ascending: true });

    if (error) {
      console.error('Error fetching inventory:', error);
      return [];
    }

    // Transform snake_case from DB back to camelCase for frontend
    return data.map(d => ({
      ...d,
      roomNumber: d.room_number,
      roomTypeId: d.room_type_id,
      currentGuest: d.current_guest,
      bookingSource: d.booking_source,
      checkIn: d.check_in,
      checkOut: d.check_out,
    })) as RoomInventory[];
  },

  updateRoomType: async (id: string, updates: Partial<RoomType>): Promise<RoomType | null> => {
    if (!hasSupabaseConfig) return null;

    // Transform camelCase back to snake_case for DB
    const dbPayload: any = { ...updates };
    if (updates.seoTitle !== undefined) { dbPayload.seo_title = updates.seoTitle; delete dbPayload.seoTitle; }
    if (updates.seoDescription !== undefined) { dbPayload.seo_description = updates.seoDescription; delete dbPayload.seoDescription; }
    if (updates.seoSlug !== undefined) { dbPayload.seo_slug = updates.seoSlug; delete dbPayload.seoSlug; }

    const { data, error } = await supabase
      .from('room_types')
      .update(dbPayload)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating room type:', error);
      throw error;
    }

    return {
      ...data,
      seoTitle: data.seo_title,
      seoDescription: data.seo_description,
      seoSlug: data.seo_slug
    } as RoomType;
  },

  updateInventoryStatus: async (id: string, status: RoomInventory['status']): Promise<void> => {
    if (!hasSupabaseConfig) return;
    
    const { error } = await supabase
      .from('inventory')
      .update({ status })
      .eq('id', id);

    if (error) throw error;
  }
};
