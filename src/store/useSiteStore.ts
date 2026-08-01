import { create } from 'zustand';
import { supabase, hasSupabaseConfig } from '../admin/utils/supabaseClient';
import { RoomType } from '../admin/types';

interface SiteStore {
  rooms: RoomType[];
  isLoading: boolean;
  error: string | null;
  fetchRooms: () => Promise<void>;
}

export const useSiteStore = create<SiteStore>((set) => ({
  rooms: [],
  isLoading: true,
  error: null,
  
  fetchRooms: async () => {
    set({ isLoading: true, error: null });
    
    if (!hasSupabaseConfig) {
      set({ 
        rooms: [], 
        isLoading: false, 
        error: 'Supabase is not configured. Please add your keys to .env and run the Seed Database tool in the Admin Settings.' 
      });
      return;
    }

    try {
      const { data, error } = await supabase
        .from('room_types')
        .select('*')
        .order('created_at', { ascending: true });

      if (error) throw error;

      // Transform snake_case from DB back to camelCase for the frontend
      const formattedRooms = data.map(d => ({
        ...d,
        seoTitle: d.seo_title,
        seoDescription: d.seo_description,
        seoSlug: d.seo_slug
      })) as RoomType[];

      set({ rooms: formattedRooms, isLoading: false });
    } catch (err: any) {
      console.error('Error fetching rooms:', err);
      set({ error: err.message, isLoading: false, rooms: [] });
    }
  }
}));
