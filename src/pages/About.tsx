import { Timeline, Stats } from '@/components/sections';
import { FadeIn, SectionHeading } from '@/components/Shared';
import PageHero from '@/components/PageHero';
import { Target, HeartHandshake, Trees, Trophy } from 'lucide-react';
import { CLUB_MEDIA, handleImageError } from '@/lib/media';

const VALUES = [
  {
    icon: Trophy,
    title: 'Sporting Excellence',
    body: 'A tradition of friendly but keenly contested sport across every section of the club.',
  },
  {
    icon: HeartHandshake,
    title: 'Community & Friendship',
    body: 'The clubhouse is where matches are relived, friendships are made and generations meet.',
  },
  {
    icon: Trees,
    title: 'Our Grounds',
    body: 'Mature trees, green fairways and peaceful gardens — a retreat in the heart of Thika.',
  },
  {
    icon: Target,
    title: 'Heritage',
    body: 'Since 1922 the club has grown with Thika itself, and its history is treasured by members.',
  },
];

export default function About() {
  return (
    <>
      <PageHero label="About the Club" title="A Storied Kenyan Sporting Institution" />

      <section className="py-24">
        <div className="container-x grid items-center gap-14 lg:grid-cols-2">
          <div>
            <SectionHeading label="Our Story" title="Nearly a Century of Sport in Thika" align="left" />
            <FadeIn delay={0.15}>
              <p className="mt-8 text-base sm:text-lg leading-relaxed text-charcoal/80">
                Thika Sports Club was established in 1922, at a time when Thika
                was a growing market town surrounded by plantations. What began
                as a modest sporting ground has grown into one of Kiambu
                County's most cherished sporting and social institutions.
              </p>
              <p className="mt-5 text-base leading-relaxed text-charcoal/70">
                From the first 8-hole golf course laid out in 1932, to the
                formal opening of the course in 1947, the inauguration of the
                clubhouse in 1973 and the expansion to a full 18 holes in 1996,
                each chapter of the club's history reflects the dedication of
                its members.
              </p>
              <p className="mt-5 text-base leading-relaxed text-charcoal/70">
                Today the club welcomes golfers, tennis and squash players,
                bowlers, swimmers and families — a diverse community united by
                a love of sport and the club's warm, unhurried atmosphere.
              </p>
            </FadeIn>
          </div>
          <FadeIn delay={0.1}>
            <div className="relative">
              <div className="aspect-[4/5] w-full overflow-hidden bg-forest-800 shadow-2xl">
                <img
                  src={CLUB_MEDIA.heritage}
                  alt="Historic Thika Sports Club grounds"
                  className="h-full w-full object-cover"
                  loading="lazy"
                  onError={handleImageError}
                />
              </div>
              <div className="absolute bottom-6 left-6 right-6 border-l-2 border-gold-400 bg-forest-900/80 p-5 backdrop-blur">
                <img src={CLUB_MEDIA.logo} alt="" className="mb-4 h-16 w-16 object-contain" />
                <p className="font-display text-2xl text-white">Est. 1922</p>
                <p className="mt-1 text-xs uppercase tracking-[0.2em] text-gold-300">
                  Thika, Kiambu County
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <Stats />
      <Timeline />

      <section className="bg-white py-24">
        <div className="container-x">
          <SectionHeading label="Mission & Values" title="What the Club Stands For" />
          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((v, i) => (
              <FadeIn key={v.title} delay={i * 0.1}>
                <div className="h-full border border-charcoal/10 p-8 transition-shadow hover:shadow-lg">
                  <v.icon size={28} className="text-gold-500" />
                  <h3 className="mt-5 font-display text-xl text-forest-800">{v.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-charcoal/70">{v.body}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container-x">
          <SectionHeading label="The Clubhouse" title="Clubhouse & Grounds" />
          <FadeIn delay={0.15}>
            <p className="mx-auto mt-8 max-w-3xl text-center text-base leading-relaxed text-charcoal/75">
              The clubhouse inaugurated in 1973 remains the social heart of the
              club — a place for dining, functions and the daily gatherings of
              members. Around it, the grounds unfold into sporting facilities
              and gardens, shaded by the mature trees that make Thika famous.
            </p>
            <p className="mx-auto mt-5 max-w-3xl text-center text-sm italic text-charcoal/50">
              Note: details of current club leadership are being confirmed and
              will be published here.
            </p>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
