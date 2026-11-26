export const CLUB_MEDIA = {
  logo: '/images/Thika_Sports_Club_Golf_Crest_logo.png',
  course:
    'https://golf-pass.brightspotcdn.com/dims4/default/eac7f1f/2147483647/strip/true/crop/515x290+0+28/resize/1200x675!/format/webp/quality/90/?url=https%3A%2F%2Fgolf-pass-brightspot.s3.amazonaws.com%2Fc9%2Ffe%2F5dda596f5fe6d3f0b689c059e419%2F9447.jpg',
  heritage:
    'https://thikasportsclub.co.ke/wp-content/uploads/2024/02/img219-250x300-1.jpg',
} as const;

export const FACILITY_MEDIA: Record<string, string> = {
  golf: CLUB_MEDIA.course,
  tennis: CLUB_MEDIA.heritage,
  squash: CLUB_MEDIA.heritage,
  'lawn-bowls': CLUB_MEDIA.course,
  swimming: CLUB_MEDIA.heritage,
  'fitness-gym': CLUB_MEDIA.course,
  'sauna-steam': CLUB_MEDIA.heritage,
  'dining-social': CLUB_MEDIA.heritage,
};
