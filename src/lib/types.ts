export interface SiteContent {
  key: string;
  value: string;
}

export interface Facility {
  id: string;
  name: string;
  slug: string;
  description: string;
  long_description: string;
  image_url: string;
  sort_order: number;
  is_active: boolean;
}

export interface ClubEvent {
  id: string;
  title: string;
  category: string;
  description: string;
  event_date: string | null;
  image_url: string;
  is_published: boolean;
}

export interface GalleryImage {
  id: string;
  title: string;
  category: string;
  image_url: string;
  sort_order: number;
}

export interface Testimonial {
  id: string;
  author_name: string;
  author_role: string;
  quote: string;
  is_published: boolean;
}

export interface MembershipEnquiry {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  membership_interest: string;
  message: string;
  status: string;
  created_at: string;
}

export interface ContactEnquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: string;
  created_at: string;
}

export interface EventEnquiry {
  id: string;
  event_id: string | null;
  event_title: string;
  name: string;
  email: string;
  message: string;
  status: string;
  created_at: string;
}

export const TIMELINE = [
  { year: '1922', text: 'Thika Sports Club was established.' },
  { year: '1932', text: 'An initial 8-hole golf course was introduced.' },
  { year: '1947', text: 'The golf course was formally opened.' },
  { year: '1973', text: 'A new clubhouse was inaugurated.' },
  { year: '1996', text: 'The golf course was expanded to 18 holes.' },
];

export const EVENT_CATEGORIES = [
  'Golf Tournaments',
  'Club Championships',
  'Social Events',
  'Corporate Golf Days',
  'Sporting Activities',
];
