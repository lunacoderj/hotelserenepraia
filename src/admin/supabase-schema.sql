-- Create room_types table
CREATE TABLE room_types (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  subtitle TEXT,
  description TEXT,
  amenities TEXT[], -- Array of strings
  capacity INTEGER DEFAULT 2,
  beds TEXT,
  bathrooms INTEGER DEFAULT 1,
  area TEXT,
  pricing JSONB NOT NULL DEFAULT '{"standard":0,"weekend":0,"festival":0,"seasonal":0,"holiday":0,"custom":0}'::jsonb,
  images JSONB NOT NULL DEFAULT '[]'::jsonb,
  seo_title TEXT,
  seo_description TEXT,
  seo_slug TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create inventory table (representing physical rooms)
CREATE TABLE inventory (
  id TEXT PRIMARY KEY, -- e.g., 'D101'
  room_number TEXT NOT NULL,
  room_type_id TEXT REFERENCES room_types(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'Available' CHECK (status IN ('Available', 'Occupied', 'Reserved', 'Cleaning', 'Maintenance', 'Blocked')),
  floor INTEGER,
  current_guest TEXT,
  booking_source TEXT,
  check_in TEXT,
  check_out TEXT,
  notes TEXT,
  history JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable Row Level Security (RLS) but allow anonymous access for now (since auth isn't built yet)
-- WARNING: In a real production app, secure these policies!
ALTER TABLE room_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE inventory ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access for room_types" ON room_types FOR SELECT USING (true);
CREATE POLICY "Allow public insert access for room_types" ON room_types FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update access for room_types" ON room_types FOR UPDATE USING (true);
CREATE POLICY "Allow public delete access for room_types" ON room_types FOR DELETE USING (true);

CREATE POLICY "Allow public read access for inventory" ON inventory FOR SELECT USING (true);
CREATE POLICY "Allow public insert access for inventory" ON inventory FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update access for inventory" ON inventory FOR UPDATE USING (true);
CREATE POLICY "Allow public delete access for inventory" ON inventory FOR DELETE USING (true);

-- Create a storage bucket for room images if it doesn't exist
INSERT INTO storage.buckets (id, name, public) VALUES ('hotel-images', 'hotel-images', true) ON CONFLICT DO NOTHING;

-- Allow public access to the bucket
CREATE POLICY "Allow public viewing of images" ON storage.objects FOR SELECT USING (bucket_id = 'hotel-images');
CREATE POLICY "Allow public uploading of images" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'hotel-images');
CREATE POLICY "Allow public updating of images" ON storage.objects FOR UPDATE USING (bucket_id = 'hotel-images');
CREATE POLICY "Allow public deletion of images" ON storage.objects FOR DELETE USING (bucket_id = 'hotel-images');

-- Create bookings table
CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  guest_name TEXT NOT NULL,
  guest_phone TEXT NOT NULL,
  guest_email TEXT,
  room_type_id TEXT REFERENCES room_types(id) ON DELETE SET NULL,
  check_in DATE NOT NULL,
  check_out DATE NOT NULL,
  adults INTEGER DEFAULT 2,
  children INTEGER DEFAULT 0,
  number_of_rooms INTEGER DEFAULT 1,
  special_requests TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')),
  total_price NUMERIC,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access for bookings" ON bookings FOR SELECT USING (true);
CREATE POLICY "Allow public insert access for bookings" ON bookings FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update access for bookings" ON bookings FOR UPDATE USING (true);
CREATE POLICY "Allow public delete access for bookings" ON bookings FOR DELETE USING (true);
