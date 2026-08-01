-- 1. Ensure RLS is enabled
ALTER TABLE room_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE inventory ENABLE ROW LEVEL SECURITY;

-- 2. Drop any potentially conflicting read policies
DROP POLICY IF EXISTS "Allow public read access for room_types" ON room_types;
DROP POLICY IF EXISTS "Allow authenticated read access for room_types" ON room_types;
DROP POLICY IF EXISTS "Allow public read access for inventory" ON inventory;
DROP POLICY IF EXISTS "Allow authenticated read access for inventory" ON inventory;

-- 3. Explicitly create PUBLIC read access for the main website to work
CREATE POLICY "Allow public read access for room_types" ON room_types FOR SELECT USING (true);
CREATE POLICY "Allow public read access for inventory" ON inventory FOR SELECT USING (true);
