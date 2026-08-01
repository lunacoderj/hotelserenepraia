import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Check if valid config exists (not just placeholder text)
export const hasSupabaseConfig = Boolean(
  supabaseUrl && 
  supabaseUrl.startsWith('http') && 
  supabaseAnonKey && 
  supabaseAnonKey !== 'your_supabase_anon_key_here'
);

// Create a singleton Supabase client with a guaranteed valid URL structure for the fallback
export const supabase = createClient(
  hasSupabaseConfig ? supabaseUrl : 'https://placeholder.supabase.co',
  hasSupabaseConfig ? supabaseAnonKey : 'placeholder_anon_key'
);
