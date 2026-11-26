import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CalendarDays, Quote } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import type { ClubEvent, Facility, Testimonial } from '@/lib/types';
import { CLUB_MEDIA, FACILITY_MEDIA, handleImageError } from '@/lib/media';
import { FALLBACK_FACILITIES } from '@/lib/facilities';
import { FALLBACK_TESTIMONIALS } from '@/lib/testimonials';
import { FadeIn, SectionHeading } from './Shared';

export function FacilitiesGrid({ compact = false }: { compact?: boolean }) {
  const [facilities, setFacilities] = useState<Facility[]>(FALLBACK_FACILITIES);

  useEffect(() => {
    supabase
      .from('facilities')
      .select('*')
      .eq('is_active', true)
      .order('sort_order')
      .then(({ data, error }) => {
        if (error || !data?.length) {
          setFacilities(FALLBACK_FACILITIES);
          return;
        }
        setFacilities(data as Facility[]);
      });
  }, []);

  return (
    <div className="grid gap-8 md:grid-cols-2">
      {facilities.map((f, i) => (
        <FadeIn
          key={f.id}
          delay={(i % 2) * 0.1}
          className={compact && i === 0 ? 'md:col-span-2' : ''}
        >
          <Link
            to={`/facilities#${f.slug}`}
            className="group block overflow-hidden border border-charcoal/10 bg-white transition-shadow hover:shadow-xl"
          >
            <div className="relative aspect-[16/7] overflow-hidden bg-forest-800">
              <img
                src={f.image_url || FACILITY_MEDIA[f.slug] || CLUB_MEDIA.heritage}
                alt={`${f.name} at Thika Sports Club`}
                className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                loading="lazy"
                onError={handleImageError}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-900/70 via-transparent to-transparent" />
              <span className="absolute bottom-5 left-6 font-display text-2xl text-white">
                {f.name}
              </span>
            </div>
            <div className="p-7">
              <h3 className="font-display text-2xl text-forest-800 group-hover:text-gold-600 transition-colors">
                {f.name}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-charcoal/70">
                {f.description}
              </p>
              <span className="mt-5 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-gold-600">
                Explore <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </Link>
        </FadeIn>
      ))}
    </div>
  );
}

export function GolfFeature() {
  return (
    <section className="py-24 lg:py-32">
      <div className="container-x grid items-center gap-14 lg:grid-cols-2">
        <FadeIn>
          <div className="relative">
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-forest-800 shadow-2xl">
              <img
                src={CLUB_MEDIA.course}
                alt="The golf course at Thika Sports Club"
                className="h-full w-full object-cover"
                loading="lazy"
                onError={handleImageError}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-900/70 via-transparent to-transparent" />
            </div>
            <div className="absolute bottom-6 left-6 right-6 border-l-2 border-gold-400 bg-forest-900/80 p-5 backdrop-blur">
              <p className="font-display text-lg text-white">18 Holes · Est. 1932</p>
              <p className="mt-1 text-xs uppercase tracking-[0.2em] text-gold-300">
                The Heart of the Club
              </p>
            </div>
          </div>
        </FadeIn>
        <div>
          <SectionHeading label="Golf at Thika" title="Experience Golf at Thika" align="left" />
          <FadeIn delay={0.15}>
            <p className="mt-8 text-base sm:text-lg leading-relaxed text-charcoal/80">
              Enjoy a memorable round on the club's historic golf course,
              surrounded by beautiful greenery and the peaceful atmosphere of
              Thika.
            </p>
            <ul className="mt-8 space-y-4">
              {[
                ['Course Overview', 'A mature 18-hole layout expanded in 1996, weaving through the club\'s historic grounds.'],
                ['Golf Events', 'Tournaments and club fixtures hosted through the year — details on request.'],
                ['Visitors Welcome', 'Visiting golfers are warmly welcomed. Contact the club for visitor information.'],
              ].map(([title, body]) => (
                <li key={title} className="flex gap-4">
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-gold-400" />
                  <div>
                    <p className="font-semibold text-forest-800">{title}</p>
                    <p className="mt-0.5 text-sm text-charcoal/70">{body}</p>
                  </div>
                </li>
              ))}
            </ul>
            <Link to="/golf" className="btn-primary mt-9">
              Enquire About Golf <ArrowRight size={16} />
            </Link>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

export function MembershipPromo() {
  return (
    <section className="relative overflow-hidden bg-forest-800 py-24">
      <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-gold-400/10 blur-3xl" />
      <div className="container-x relative text-center">
        <SectionHeading light label="Membership" title="Become Part of the Club" />
        <FadeIn delay={0.15}>
          <p className="mx-auto mt-8 max-w-2xl text-base sm:text-lg leading-relaxed text-white/75">
            Discover a community built around sport, friendship and a shared
            appreciation for the club's heritage.
          </p>
        </FadeIn>
        <div className="mx-auto mt-12 grid max-w-4xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ['Sporting Facilities', 'Access to the club\'s golf, tennis, squash, bowls, swimming and fitness facilities.'],
            ['Social Activities', 'Regular social occasions at the clubhouse, at the centre of club life.'],
            ['Club Events', 'Tournaments, championships and gatherings throughout the year.'],
            ['Community & Networking', 'A welcoming community of members spanning generations.'],
          ].map(([title, body], i) => (
            <FadeIn key={title} delay={i * 0.1}>
              <div className="h-full border border-white/10 bg-forest-700/50 p-6 text-left transition-colors hover:border-gold-400/40">
                <p className="font-display text-lg text-gold-300">{title}</p>
                <p className="mt-2 text-sm leading-relaxed text-white/70">{body}</p>
              </div>
            </FadeIn>
          ))}
        </div>
        <FadeIn delay={0.3}>
          <Link to="/membership" className="btn-gold mt-12">
            Enquire About Membership <ArrowRight size={16} />
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}

export function EventsPreview() {
  const [events, setEvents] = useState<ClubEvent[]>([]);

  useEffect(() => {
    supabase
      .from('events')
      .select('*')
      .eq('is_published', true)
      .order('event_date', { ascending: true })
      .limit(3)
      .then(({ data }) => setEvents((data as ClubEvent[]) ?? []));
  }, []);

  return (
    <section className="bg-white py-24 lg:py-32">
      <div className="container-x">
        <SectionHeading label="What's On" title="Club Events" />
        {events.length > 0 && (
          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {events.map((event, i) => (
              <FadeIn key={event.id} delay={i * 0.1}>
                <article className="group h-full overflow-hidden border border-charcoal/10 bg-ivory transition-shadow hover:shadow-xl">
                  <div className="relative aspect-[16/9] overflow-hidden bg-forest-800">
                    <img
                      src={event.image_url || CLUB_MEDIA.heritage}
                      alt={event.title}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                      loading="lazy"
                      onError={handleImageError}
                    />
                    <span className="absolute left-4 top-4 bg-gold-400 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-forest-900">
                      {event.category}
                    </span>
                  </div>
                  <div className="p-6">
                    <p className="flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-gold-600">
                      <CalendarDays size={14} />
                      {event.event_date
                        ? new Date(event.event_date).toLocaleDateString('en-KE', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                          })
                        : 'Date to be confirmed'}
                    </p>
                    <h3 className="mt-3 font-display text-xl text-forest-800">{event.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-charcoal/70">{event.description}</p>
                  </div>
                </article>
              </FadeIn>
            ))}
          </div>
        )}
        <FadeIn delay={0.2} className="mt-10 text-center">
          <Link to="/events" className="btn-outline-dark">
            View All Events <ArrowRight size={16} />
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}

export function TestimonialsSection() {
  const [items, setItems] = useState<Testimonial[]>(FALLBACK_TESTIMONIALS);

  useEffect(() => {
    supabase
      .from('testimonials')
      .select('*')
      .eq('is_published', true)
      .then(({ data, error }) => {
        if (!error && data?.length) setItems(data as Testimonial[]);
      });
  }, []);

  return (
    <section className="py-24">
      <div className="container-x">
        <SectionHeading label="Our Members" title="Voices of the Club" />
        {items.length > 0 ? (
          <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {items.map((t, i) => (
              <FadeIn key={t.id} delay={i * 0.1}>
                <figure className="h-full border border-charcoal/10 bg-white p-8">
                  <Quote size={24} className="text-gold-400" />
                  <blockquote className="mt-4 text-sm leading-relaxed text-charcoal/80">
                    {t.quote}
                  </blockquote>
                  <figcaption className="mt-6">
                    <p className="font-semibold text-forest-800">{t.author_name}</p>
                    <p className="text-xs uppercase tracking-wider text-charcoal/50">
                      {t.author_role}
                    </p>
                  </figcaption>
                </figure>
              </FadeIn>
            ))}
          </div>
        ) : (
          <FadeIn delay={0.15}>
            <p className="mx-auto mt-12 max-w-xl text-center text-sm italic text-charcoal/50">
              Member testimonials will appear here soon. The club is gathering
              stories from its community — check back shortly.
            </p>
          </FadeIn>
        )}
      </div>
    </section>
  );
}
