import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { RoomType, RoomInventory } from '../types';
import { roomService } from '../services/roomService';

interface RoomStore {
  roomTypes: RoomType[];
  inventory: RoomInventory[];
  isLoading: boolean;
  fetchRoomTypes: () => Promise<void>;
  fetchInventory: () => Promise<void>;
  updateRoomType: (id: string, data: Partial<RoomType>) => Promise<void>;
}

export const useRoomStore = create<RoomStore>()(
  persist(
    (set, get) => ({
  roomTypes: [],
  inventory: [],
  isLoading: false,

  fetchRoomTypes: async () => {
    set({ isLoading: true });
    try {
      const types = await roomService.getRoomTypes();
      set({ roomTypes: types });
    } catch (err) {
      console.error("Failed to fetch room types (possibly offline)", err);
    } finally {
      set({ isLoading: false });
    }
  },

  fetchInventory: async () => {
    set({ isLoading: true });
    try {
      const inv = await roomService.getInventory();
      set({ inventory: inv });
    } catch (err) {
      console.error("Failed to fetch room inventory (possibly offline)", err);
    } finally {
      set({ isLoading: false });
    }
  },

  updateRoomType: async (id, data) => {
    set({ isLoading: true });
    try {
      const updated = await roomService.updateRoomType(id, data);
      set({ 
        roomTypes: get().roomTypes.map(rt => rt.id === id ? (updated as RoomType) : rt)
      });
    } catch (err) {
      console.error("Failed to update room type (possibly offline)", err);
    } finally {
      set({ isLoading: false });
    }
  }
    }),
    {
      name: 'hsp-room-storage', // name of the item in the storage (must be unique)
      partialize: (state) => ({ 
        roomTypes: state.roomTypes, 
        inventory: state.inventory 
      }),
    }
  )
);
