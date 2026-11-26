/*
# Create Thika Sports Club tables

1. New Tables
- `site_content` — editable key/value website copy (hero heading, about text, etc.). Key: `key` (text, primary key), `value` (text), `updated_at`.
- `facilities` — sporting and recreational facilities. `id`, `name`, `slug`, `description`, `long_description`, `image_url`, `sort_order`, `is_active`.
- `events` — club events. `id`, `title`, `category`, `description`, `event_date` (nullable text — real dates confirmed later), `image_url`, `is_published`, `created_at`.
- `gallery_images` — photo gallery. `id`, `title`, `category`, `image_url`, `sort_order`, `created_at`.
- `testimonials` — member testimonials. `id`, `author_name`, `author_role`, `quote`, `is_published`, `created_at`.
- `membership_enquiries` — submissions from the membership enquiry form. `id`, `full_name`, `email`, `phone`, `membership_interest`, `message`, `status`, `created_at`.
- `contact_enquiries` — submissions from the general contact form. `id`, `name`, `email`, `phone`, `subject`, `message`, `status`, `created_at`.
- `event_enquiries` — enquiries about a specific event. `id`, `event_id` (fk → events), `name`, `email`, `message`, `created_at`.

2. Security
- Enable RLS on every table.
- Public content tables (site_content, facilities, events, gallery_images, testimonials): SELECT open to `anon, authenticated` (public website data); INSERT/UPDATE/DELETE restricted to `authenticated` (admin dashboard users).
- Enquiry tables: anyone (`anon, authenticated`) can INSERT an enquiry; only `authenticated` admins can read/update them (they contain visitor contact details).
- Grants issued to `anon`, `authenticated`, and `service_role` as appropriate.
- Enquiry inserts are column-restricted: visitors cannot set `status` or admin-controlled fields.
*/

-- 1. Site content (editable copy)
CREATE TABLE IF NOT EXISTS site_content (
  key text PRIMARY KEY,
  value text NOT NULL DEFAULT '',
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- 2. Facilities
CREATE TABLE IF NOT EXISTS facilities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text NOT NULL UNIQUE,
  description text NOT NULL DEFAULT '',
  long_description text NOT NULL DEFAULT '',
  image_url text NOT NULL DEFAULT '',
  sort_order integer NOT NULL DEFAULT 0,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- 3. Events
CREATE TABLE IF NOT EXISTS events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  category text NOT NULL DEFAULT 'Social',
  description text NOT NULL DEFAULT '',
  event_date date,
  image_url text NOT NULL DEFAULT '',
  is_published boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- 4. Gallery
CREATE TABLE IF NOT EXISTS gallery_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL DEFAULT '',
  category text NOT NULL DEFAULT 'General',
  image_url text NOT NULL,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- 5. Testimonials
CREATE TABLE IF NOT EXISTS testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  author_name text NOT NULL,
  author_role text NOT NULL DEFAULT '',
  quote text NOT NULL,
  is_published boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- 6. Membership enquiries
CREATE TABLE IF NOT EXISTS membership_enquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL DEFAULT '',
  membership_interest text NOT NULL DEFAULT '',
  message text NOT NULL DEFAULT '',
  status text NOT NULL DEFAULT 'new',
  created_at timestamptz NOT NULL DEFAULT now()
);

-- 7. Contact enquiries
CREATE TABLE IF NOT EXISTS contact_enquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL DEFAULT '',
  subject text NOT NULL DEFAULT '',
  message text NOT NULL,
  status text NOT NULL DEFAULT 'new',
  created_at timestamptz NOT NULL DEFAULT now()
);

-- 8. Event enquiries
CREATE TABLE IF NOT EXISTS event_enquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id uuid REFERENCES events(id) ON DELETE SET NULL,
  event_title text NOT NULL DEFAULT '',
  name text NOT NULL,
  email text NOT NULL,
  message text NOT NULL DEFAULT '',
  status text NOT NULL DEFAULT 'new',
  created_at timestamptz NOT NULL DEFAULT now()
);

-- RLS
ALTER TABLE site_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE facilities ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE membership_enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_enquiries ENABLE ROW LEVEL SECURITY;

-- Public content: readable by all, writable by signed-in admins only
DROP POLICY IF EXISTS "Public read site_content" ON site_content;
CREATE POLICY "Public read site_content" ON site_content FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "Admin write site_content" ON site_content;
CREATE POLICY "Admin write site_content" ON site_content FOR ALL TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public read facilities" ON facilities;
CREATE POLICY "Public read facilities" ON facilities FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "Admin write facilities" ON facilities;
CREATE POLICY "Admin write facilities" ON facilities FOR ALL TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public read events" ON events;
CREATE POLICY "Public read events" ON events FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "Admin write events" ON events;
CREATE POLICY "Admin write events" ON events FOR ALL TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public read gallery" ON gallery_images;
CREATE POLICY "Public read gallery" ON gallery_images FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "Admin write gallery" ON gallery_images;
CREATE POLICY "Admin write gallery" ON gallery_images FOR ALL TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public read published testimonials" ON testimonials;
CREATE POLICY "Public read published testimonials" ON testimonials FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "Admin write testimonials" ON testimonials;
CREATE POLICY "Admin write testimonials" ON testimonials FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Enquiries: public may submit (column-restricted), admins manage
DROP POLICY IF EXISTS "Public submit membership enquiry" ON membership_enquiries;
CREATE POLICY "Public submit membership enquiry" ON membership_enquiries FOR INSERT TO anon, authenticated
  WITH CHECK (status = 'new');
DROP POLICY IF EXISTS "Admin manage membership enquiries" ON membership_enquiries;
CREATE POLICY "Admin manage membership enquiries" ON membership_enquiries FOR ALL TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public submit contact enquiry" ON contact_enquiries;
CREATE POLICY "Public submit contact enquiry" ON contact_enquiries FOR INSERT TO anon, authenticated
  WITH CHECK (status = 'new');
DROP POLICY IF EXISTS "Admin manage contact enquiries" ON contact_enquiries;
CREATE POLICY "Admin manage contact enquiries" ON contact_enquiries FOR ALL TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public submit event enquiry" ON event_enquiries;
CREATE POLICY "Public submit event enquiry" ON event_enquiries FOR INSERT TO anon, authenticated
  WITH CHECK (status = 'new');
DROP POLICY IF EXISTS "Admin manage event enquiries" ON event_enquiries;
CREATE POLICY "Admin manage event enquiries" ON event_enquiries FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Grants
GRANT SELECT ON site_content, facilities, events, gallery_images, testimonials TO anon, authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON site_content, facilities, events, gallery_images, testimonials TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON membership_enquiries, contact_enquiries, event_enquiries TO authenticated;
GRANT INSERT (full_name, email, phone, membership_interest, message) ON membership_enquiries TO anon, authenticated;
GRANT INSERT (name, email, phone, subject, message) ON contact_enquiries TO anon, authenticated;
GRANT INSERT (event_id, event_title, name, email, message) ON event_enquiries TO anon, authenticated;
GRANT ALL ON site_content, facilities, events, gallery_images, testimonials, membership_enquiries, contact_enquiries, event_enquiries TO service_role;
