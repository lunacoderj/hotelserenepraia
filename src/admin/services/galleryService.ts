import { supabase, hasSupabaseConfig } from '../utils/supabaseClient';

export const galleryService = {
  uploadImage: async (file: File): Promise<string> => {
    if (!hasSupabaseConfig) {
      // Mock upload for now if no Supabase configured
      return new Promise(resolve => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.readAsDataURL(file);
      });
    }

    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('hotel-images')
      .upload(filePath, file);

    if (uploadError) {
      console.error('Error uploading image:', uploadError);
      throw uploadError;
    }

    const { data } = supabase.storage
      .from('hotel-images')
      .getPublicUrl(filePath);

    return data.publicUrl;
  },

  deleteImage: async (publicUrl: string): Promise<void> => {
    if (!hasSupabaseConfig) return;

    // Extract file path from URL
    // e.g. https://.../storage/v1/object/public/hotel-images/xyz_123.jpg
    const parts = publicUrl.split('/hotel-images/');
    if (parts.length < 2) return;
    
    const filePath = parts[1];

    const { error } = await supabase.storage
      .from('hotel-images')
      .remove([filePath]);

    if (error) {
      console.error('Error deleting image:', error);
      throw error;
    }
  }
};
