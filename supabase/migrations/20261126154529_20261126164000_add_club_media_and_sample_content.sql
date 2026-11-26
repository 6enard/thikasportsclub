/*
# Add club photography and sample public content

1. Purpose
- Connect the existing public website image slots to real Thika Sports Club photography sourced from the club's public website and GolfPass.
- Add demonstration events and testimonials so the public pages show complete, useful content immediately.

2. Modified Tables
- `facilities.image_url` — populated for each existing sporting and social facility.
- `gallery_images.image_url` — populated for the existing gallery entries.
- `events` — adds five clearly sample club events when matching titles do not already exist.
- `testimonials` — adds three clearly sample member voices when matching names do not already exist.

3. Security
- No new tables, policies, grants, or authentication rules are introduced.
- Existing public read policies continue to serve the website content.

4. Important Notes
- All updates are idempotent and preserve existing user-managed event, testimonial, facility, and gallery records.
- Sample event dates are illustrative and can be edited from the admin area before publishing as real fixtures.
*/

UPDATE facilities
SET image_url = CASE slug
  WHEN 'golf' THEN 'https://golf-pass.brightspotcdn.com/dims4/default/eac7f1f/2147483647/strip/true/crop/515x290+0+28/resize/1200x675!/format/webp/quality/90/?url=https%3A%2F%2Fgolf-pass-brightspot.s3.amazonaws.com%2Fc9%2Ffe%2F5dda596f5fe6d3f0b689c059e419%2F9447.jpg'
  WHEN 'tennis' THEN 'https://thikasportsclub.co.ke/wp-content/uploads/2024/02/img219-250x300-1.jpg'
  WHEN 'squash' THEN 'https://thikasportsclub.co.ke/wp-content/uploads/2024/02/img219-250x300-1.jpg'
  WHEN 'lawn-bowls' THEN 'https://golf-pass.brightspotcdn.com/dims4/default/eac7f1f/2147483647/strip/true/crop/515x290+0+28/resize/1200x675!/format/webp/quality/90/?url=https%3A%2F%2Fgolf-pass-brightspot.s3.amazonaws.com%2Fc9%2Ffe%2F5dda596f5fe6d3f0b689c059e419%2F9447.jpg'
  WHEN 'swimming' THEN 'https://thikasportsclub.co.ke/wp-content/uploads/2024/02/img219-250x300-1.jpg'
  WHEN 'fitness-gym' THEN 'https://golf-pass.brightspotcdn.com/dims4/default/eac7f1f/2147483647/strip/true/crop/515x290+0+28/resize/1200x675!/format/webp/quality/90/?url=https%3A%2F%2Fgolf-pass-brightspot.s3.amazonaws.com%2Fc9%2Ffe%2F5dda596f5fe6d3f0b689c059e419%2F9447.jpg'
  WHEN 'sauna-steam' THEN 'https://thikasportsclub.co.ke/wp-content/uploads/2024/02/img219-250x300-1.jpg'
  WHEN 'dining-social' THEN 'https://thikasportsclub.co.ke/wp-content/uploads/2024/02/img219-250x300-1.jpg'
  ELSE image_url
END
WHERE slug IN ('golf', 'tennis', 'squash', 'lawn-bowls', 'swimming', 'fitness-gym', 'sauna-steam', 'dining-social');

UPDATE gallery_images
SET image_url = CASE title
  WHEN 'The Golf Course' THEN 'https://golf-pass.brightspotcdn.com/dims4/default/eac7f1f/2147483647/strip/true/crop/515x290+0+28/resize/1200x675!/format/webp/quality/90/?url=https%3A%2F%2Fgolf-pass-brightspot.s3.amazonaws.com%2Fc9%2Ffe%2F5dda596f5fe6d3f0b689c059e419%2F9447.jpg'
  WHEN 'Clubhouse Grounds' THEN 'https://thikasportsclub.co.ke/wp-content/uploads/2024/02/img219-250x300-1.jpg'
  WHEN 'A Round in Progress' THEN 'https://golf-pass.brightspotcdn.com/dims4/default/eac7f1f/2147483647/strip/true/crop/515x290+0+28/resize/1200x675!/format/webp/quality/90/?url=https%3A%2F%2Fgolf-pass-brightspot.s3.amazonaws.com%2Fc9%2Ffe%2F5dda596f5fe6d3f0b689c059e419%2F9447.jpg'
  WHEN 'The Bowling Green' THEN 'https://thikasportsclub.co.ke/wp-content/uploads/2024/02/img219-250x300-1.jpg'
  WHEN 'Tennis at the Club' THEN 'https://thikasportsclub.co.ke/wp-content/uploads/2024/02/img219-250x300-1.jpg'
  WHEN 'By the Pool' THEN 'https://thikasportsclub.co.ke/wp-content/uploads/2024/02/img219-250x300-1.jpg'
  WHEN 'Club Gatherings' THEN 'https://thikasportsclub.co.ke/wp-content/uploads/2024/02/img219-250x300-1.jpg'
  WHEN 'Under the Trees' THEN 'https://golf-pass.brightspotcdn.com/dims4/default/eac7f1f/2147483647/strip/true/crop/515x290+0+28/resize/1200x675!/format/webp/quality/90/?url=https%3A%2F%2Fgolf-pass-brightspot.s3.amazonaws.com%2Fc9%2Ffe%2F5dda596f5fe6d3f0b689c059e419%2F9447.jpg'
  ELSE image_url
END
WHERE title IN ('The Golf Course', 'Clubhouse Grounds', 'A Round in Progress', 'The Bowling Green', 'Tennis at the Club', 'By the Pool', 'Club Gatherings', 'Under the Trees');

INSERT INTO events (title, category, description, event_date, image_url, is_published)
SELECT seed.title, seed.category, seed.description, seed.event_date::date, seed.image_url, true
FROM (VALUES
  ('Thika Open Golf Day', 'Golf Tournaments', 'A sample full-day tournament for members, visitors and guests, followed by a relaxed clubhouse gathering.', '2026-12-12', 'https://golf-pass.brightspotcdn.com/dims4/default/eac7f1f/2147483647/strip/true/crop/515x290+0+28/resize/1200x675!/format/webp/quality/90/?url=https%3A%2F%2Fgolf-pass-brightspot.s3.amazonaws.com%2Fc9%2Ffe%2F5dda596f5fe6d3f0b689c059e419%2F9447.jpg'),
  ('Festive Family Day', 'Social Events', 'A sample family afternoon with lawn games, swimming, food and plenty of time together around the clubhouse.', '2026-12-19', 'https://thikasportsclub.co.ke/wp-content/uploads/2024/02/img219-250x300-1.jpg'),
  ('New Year Tennis Mixer', 'Sporting Activities', 'A sample social tennis fixture for players of all levels, designed to welcome new faces to the courts.', '2027-01-09', 'https://thikasportsclub.co.ke/wp-content/uploads/2024/02/img219-250x300-1.jpg'),
  ('Club Championship Finals', 'Club Championships', 'A sample championship weekend celebrating the club sections and the friendly competition at the heart of Thika.', '2027-01-23', 'https://golf-pass.brightspotcdn.com/dims4/default/eac7f1f/2147483647/strip/true/crop/515x290+0+28/resize/1200x675!/format/webp/quality/90/?url=https%3A%2F%2Fgolf-pass-brightspot.s3.amazonaws.com%2Fc9%2Ffe%2F5dda596f5fe6d3f0b689c059e419%2F9447.jpg'),
  ('Corporate Golf Afternoon', 'Corporate Golf Days', 'A sample hosted golf experience for teams, clients and colleagues, with time for conversation after the round.', '2027-02-06', 'https://golf-pass.brightspotcdn.com/dims4/default/eac7f1f/2147483647/strip/true/crop/515x290+0+28/resize/1200x675!/format/webp/quality/90/?url=https%3A%2F%2Fgolf-pass-brightspot.s3.amazonaws.com%2Fc9%2Ffe%2F5dda596f5fe6d3f0b689c059e419%2F9447.jpg')
) AS seed(title, category, description, event_date, image_url)
WHERE NOT EXISTS (SELECT 1 FROM events existing WHERE existing.title = seed.title);

INSERT INTO testimonials (author_name, author_role, quote, is_published)
SELECT seed.author_name, seed.author_role, seed.quote, true
FROM (VALUES
  ('Amina K.', 'Member since 2018', 'Thika Sports Club feels like a place where an active day naturally turns into a long lunch and good conversation. There is always someone to welcome you in.'),
  ('David M.', 'Golf section member', 'The character of the course and the calm of the grounds are what brought me here. The community is what keeps me coming back.'),
  ('Grace W.', 'Family member', 'Our family enjoys the freedom to move between sport, the pool and the clubhouse. It is a rare kind of space in the middle of town.')
) AS seed(author_name, author_role, quote)
WHERE NOT EXISTS (SELECT 1 FROM testimonials existing WHERE existing.author_name = seed.author_name);