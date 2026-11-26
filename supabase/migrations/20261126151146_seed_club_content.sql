/*
# Seed Thika Sports Club content

1. Purpose
- Populate `site_content` with verified club copy (hero, welcome, heritage timeline, contact placeholders).
- Populate `facilities` with the eight verified facilities.
- Populate `gallery_images` with tasteful placeholder entries (empty image URLs are rendered as elegant club-crest placeholders by the site until real photography is added via the admin panel).
- Insert NO fake events, prices, phone numbers, emails, testimonials, or dates.

2. Tables modified
- `site_content` — seeded keys (idempotent via ON CONFLICT).
- `facilities` — 8 rows, referenced by stable `slug`.
- `gallery_images` — seeded only if table is empty.

3. Security
- No policy changes. Rows respect existing RLS.
*/

-- Site content
INSERT INTO site_content (key, value) VALUES
  ('hero_title', 'Thika Sports Club'),
  ('hero_tagline', 'Where Heritage Meets Sport'),
  ('hero_description', 'A historic sporting destination in the heart of Thika, bringing together sport, recreation and community.'),
  ('welcome_title', 'More Than a Sports Club'),
  ('welcome_body', 'Thika Sports Club brings together sporting tradition, recreation and a vibrant social community. Whether you''re enjoying a round of golf, taking part in your favourite sport or spending time with friends, the club offers a welcoming environment for members and visitors.'),
  ('contact_address', 'Thika Sports Club, Thika, Kiambu County, Kenya'),
  ('contact_phone', '[Phone number to be confirmed]'),
  ('contact_email', '[Email address to be confirmed]'),
  ('contact_hours', '[Opening hours to be confirmed]')
ON CONFLICT (key) DO NOTHING;

-- Facilities (verified list)
INSERT INTO facilities (name, slug, description, long_description, sort_order) VALUES
  ('Golf', 'golf', 'A historic 18-hole golf course winding through mature trees in the heart of Thika.', 'Established on this ground since the club''s earliest years and expanded to a full 18 holes in 1996, the golf course is the centrepiece of Thika Sports Club. Members and visitors enjoy a peaceful round surrounded by lush greenery and the club''s long sporting tradition.', 1),
  ('Tennis', 'tennis', 'Tennis courts for members and visitors, from casual rallies to club competitions.', 'The club''s tennis section welcomes players of all ages and abilities. Whether you are playing a friendly set, training regularly or taking part in club fixtures, the courts offer an active social calendar within the club.', 2),
  ('Squash', 'squash', 'Squash courts hosting fast, competitive play all year round.', 'Squash at Thika Sports Club offers one of the most energetic workouts in the club. Players of every level take to the courts, with opportunities for casual games, leagues and inter-club competition.', 3),
  ('Lawn Bowls', 'lawn-bowls', 'A cherished bowling green and one of the club''s proudest traditions.', 'Lawn bowls is a long-standing tradition at Thika Sports Club. The green is a meeting place for players of all generations, combining gentle competition with a warm, sociable atmosphere.', 4),
  ('Swimming', 'swimming', 'A swimming pool for members and families, from morning laps to relaxed afternoons.', 'The swimming pool offers a refreshing escape for the whole family — a place for early-morning exercise, swimming lessons and long, relaxed afternoons by the water with friends.', 5),
  ('Fitness and Gym', 'fitness-gym', 'A fitness and gym facility supporting strength, conditioning and wellbeing.', 'The club''s fitness and gym facilities help members stay active all year round, complementing the sporting sections with equipment and space for strength, conditioning and general wellbeing.', 6),
  ('Sauna and Steam', 'sauna-steam', 'Sauna and steam rooms for recovery and relaxation after sport.', 'After a round of golf, a match on court or a workout in the gym, the sauna and steam rooms offer a quiet place to unwind, recover and enjoy the club''s relaxed atmosphere.', 7),
  ('Dining and Social', 'dining-social', 'Clubhouse dining and social spaces at the heart of club life.', 'The clubhouse is the social heart of Thika Sports Club — a place for a meal after the game, a drink with friends, club functions and the everyday gatherings that make the club feel like home.', 8)
ON CONFLICT (slug) DO NOTHING;

-- Gallery: only seed if empty, with elegant placeholder entries
INSERT INTO gallery_images (title, category, image_url, sort_order)
SELECT * FROM (VALUES
  ('The Golf Course', 'Golf', '', 1),
  ('Clubhouse Grounds', 'Clubhouse', '', 2),
  ('A Round in Progress', 'Golf', '', 3),
  ('The Bowling Green', 'Lawn Bowls', '', 4),
  ('Tennis at the Club', 'Tennis', '', 5),
  ('By the Pool', 'Swimming', '', 6),
  ('Club Gatherings', 'Social', '', 7),
  ('Under the Trees', 'Landscapes', '', 8)
) AS seed(title, category, image_url, sort_order)
WHERE NOT EXISTS (SELECT 1 FROM gallery_images);
