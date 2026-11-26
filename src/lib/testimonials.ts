import type { Testimonial } from '@/lib/types';

export const FALLBACK_TESTIMONIALS: Testimonial[] = [
  {
    id: 'fallback-amina',
    author_name: 'Amina K.',
    author_role: 'Member since 2018',
    quote: 'Thika Sports Club feels like a place where an active day naturally turns into a long lunch and good conversation. There is always someone to welcome you in.',
    is_published: true,
  },
  {
    id: 'fallback-david',
    author_name: 'David M.',
    author_role: 'Golf section member',
    quote: 'The character of the course and the calm of the grounds are what brought me here. The community is what keeps me coming back.',
    is_published: true,
  },
  {
    id: 'fallback-grace',
    author_name: 'Grace W.',
    author_role: 'Family member',
    quote: 'Our family enjoys the freedom to move between sport, the pool and the clubhouse. It is a rare kind of space in the middle of town.',
    is_published: true,
  },
];
