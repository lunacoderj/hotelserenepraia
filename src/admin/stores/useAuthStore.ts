import { create } from 'zustand';
import { supabase } from '../utils/supabaseClient';
import { User, Session } from '@supabase/supabase-js';

interface AuthState {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  initialize: () => Promise<void>;
  signOut: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  session: null,
  isLoading: true,
  initialize: async () => {
    // Get initial session
    const { data: { session }, error } = await supabase.auth.getSession();
    
    set({ 
      session, 
      user: session?.user || null,
      isLoading: false 
    });

    // Listen for auth changes
    supabase.auth.onAuthStateChange((_event, newSession) => {
      set({ 
        session: newSession, 
        user: newSession?.user || null 
      });
    });
  },
  signOut: async () => {
    await supabase.auth.signOut();
    set({ user: null, session: null });
  }
}));
