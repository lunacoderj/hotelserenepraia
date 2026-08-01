-- Drop all vulnerable public policies
DROP POLICY IF EXISTS "Allow public insert access for room_types" ON room_types;
DROP POLICY IF EXISTS "Allow public update access for room_types" ON room_types;
DROP POLICY IF EXISTS "Allow public delete access for room_types" ON room_types;


DROP POLICY IF EXISTS "Allow public insert access for inventory" ON inventory;
DROP POLICY IF EXISTS "Allow public update access for inventory" ON inventory;
DROP POLICY IF EXISTS "Allow public delete access for inventory" ON inventory;

DROP POLICY IF EXISTS "Allow public uploading of images" ON storage.objects;
DROP POLICY IF EXISTS "Allow public updating of images" ON storage.objects;
DROP POLICY IF EXISTS "Allow public deletion of images" ON storage.objects;

DROP POLICY IF EXISTS "Allow public read access for bookings" ON bookings;
DROP POLICY IF EXISTS "Allow public update access for bookings" ON bookings;
DROP POLICY IF EXISTS "Allow public delete access for bookings" ON bookings;

-- Create secure authenticated policies
CREATE POLICY "Allow authenticated insert access for room_types" ON room_types FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Allow authenticated update access for room_types" ON room_types FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Allow authenticated delete access for room_types" ON room_types FOR DELETE TO authenticated USING (true);

CREATE POLICY "Allow public read access for inventory" ON inventory FOR SELECT USING (true);
CREATE POLICY "Allow authenticated insert access for inventory" ON inventory FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Allow authenticated update access for inventory" ON inventory FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Allow authenticated delete access for inventory" ON inventory FOR DELETE TO authenticated USING (true);

CREATE POLICY "Allow authenticated uploading of images" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'hotel-images');
CREATE POLICY "Allow authenticated updating of images" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'hotel-images');
CREATE POLICY "Allow authenticated deletion of images" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'hotel-images');

CREATE POLICY "Allow authenticated read access for bookings" ON bookings FOR SELECT TO authenticated USING (true);
CREATE POLICY "Allow authenticated update access for bookings" ON bookings FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Allow authenticated delete access for bookings" ON bookings FOR DELETE TO authenticated USING (true);
