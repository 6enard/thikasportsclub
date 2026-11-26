import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { ChevronDown, ArrowRight, Flag, MapPin, CalendarDays } from 'lucide-react';
import { FadeIn, SectionHeading, useSiteContent } from './Shared';
import { TIMELINE } from '@/lib/types';

export function CountUp({ target, suffix = '' }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1400;
    const start = performance.now();
    let frame: number;
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      setValue(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, target]);

  return (
    <span ref={ref}>
      {value}
      {suffix}
    </span>
  );
}

export function Hero() {
  const content = useSiteContent();

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-forest-800">
      {/* Layered scenic treatment — replaced by a real course photograph once club photography is supplied */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-forest-900 via-forest-700 to-forest-800" />
        <div className="absolute -left-32 top-1/4 h-[32rem] w-[32rem] rounded-full bg-forest-500/20 blur-3xl" />
        <div className="absolute -right-24 bottom-0 h-[28rem] w-[28rem] rounded-full bg-gold-400/10 blur-3xl" />
        <svg
          className="absolute bottom-0 left-0 w-full text-forest-900/60"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            fill="currentColor"
            d="M0,224L80,208C160,192,320,160,480,165.3C640,171,800,213,960,224C1120,235,1280,213,1360,202.7L1440,192L1440,320L0,320Z"
          />
        </svg>
      </div>

      <div className="container-x relative z-10 py-32 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="section-label text-gold-300"
        >
          Est. 1922 · Thika, Kenya
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="mx-auto mt-6 max-w-4xl text-5xl sm:text-6xl lg:text-7xl leading-[1.08] text-white"
        >
          {content.hero_title || 'Thika Sports Club'}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.65 }}
          className="mt-5 font-display text-xl sm:text-2xl italic text-gold-300"
        >
          {content.hero_tagline || '"Where Heritage Meets Sport"'}
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.85 }}
          className="mx-auto mt-6 max-w-2xl text-base sm:text-lg leading-relaxed text-white/80"
        >
          {content.hero_description ||
            'A historic sporting destination in the heart of Thika, bringing together sport, recreation and community.'}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.05 }}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Link to="/about" className="btn-gold">
            Explore the Club <ArrowRight size={16} />
          </Link>
          <Link to="/membership" className="btn-outline">
            Discover Membership
          </Link>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{
          opacity: { delay: 1.5, duration: 1 },
          y: { repeat: Infinity, duration: 1.8, ease: 'easeInOut' },
        }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/70"
      >
        <ChevronDown size={30} />
      </motion.div>
    </section>
  );
}

export function Welcome() {
  const content = useSiteContent();

  return (
    <section className="py-24 lg:py-32">
      <div className="container-x grid items-center gap-14 lg:grid-cols-2">
        <FadeIn>
          <div className="relative">
            <div className="aspect-[4/3] w-full bg-gradient-to-br from-forest-500 via-forest-600 to-forest-800 shadow-2xl" />
            <div className="absolute -bottom-5 -right-5 hidden h-40 w-40 border-4 border-gold-400 sm:block" />
            <div className="absolute -top-5 -left-5 hidden h-24 w-24 border-4 border-forest-600/30 sm:block" />
          </div>
        </FadeIn>
        <div>
          <SectionHeading label="Welcome to Thika" title={content.welcome_title || 'More Than a Sports Club'} align="left" />
          <FadeIn delay={0.15}>
            <p className="mt-8 text-base sm:text-lg leading-relaxed text-charcoal/80">
              {content.welcome_body ||
                'Thika Sports Club brings together sporting tradition, recreation and a vibrant social community. Whether you\'re enjoying a round of golf, taking part in your favourite sport or spending time with friends, the club offers a welcoming environment for members and visitors.'}
            </p>
            <p className="mt-5 text-base leading-relaxed text-charcoal/70">
              Founded in 1922, the club has grown alongside the town of Thika
              itself — a green retreat of mature trees, playing fields and a
              clubhouse that has welcomed generations of sportspeople and
              friends.
            </p>
            <Link to="/about" className="btn-outline-dark mt-8">
              Our Story <ArrowRight size={16} />
            </Link>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

export function Stats() {
  const stats = [
    { icon: Flag, value: 1922, suffix: '', label: 'Established', plain: true },
    { icon: Flag, value: 18, suffix: '-hole', label: 'Golf Course', plain: false },
    { icon: MapPin, value: 1, suffix: '', label: 'Location: Thika, Kenya', plain: false },
  ];

  return (
    <section className="bg-forest-800 py-20">
      <div className="container-x grid gap-12 text-center sm:grid-cols-3">
        {stats.map((stat, i) => (
          <FadeIn key={stat.label} delay={i * 0.12}>
            <stat.icon size={28} className="mx-auto text-gold-400" />
            <p className="mt-4 font-display text-4xl sm:text-5xl text-white">
              {stat.plain ? String(stat.value) : <CountUp target={stat.value} suffix={stat.suffix} />}
            </p>
            <p className="mt-2 text-xs uppercase tracking-[0.25em] text-white/60">
              {stat.label}
            </p>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

export function Timeline() {
  return (
    <section className="py-24 lg:py-32">
      <div className="container-x">
        <SectionHeading label="Our Heritage" title="A Century of Sport" />
        <div className="relative mt-16">
          <div className="absolute left-4 top-0 h-full w-px bg-forest-600/20 md:left-1/2" />
          <div className="space-y-12">
            {TIMELINE.map((item, i) => (
              <FadeIn
                key={item.year}
                delay={i * 0.08}
                className={`relative pl-14 md:w-1/2 md:pl-0 ${
                  i % 2 === 0 ? 'md:pr-14 md:text-right' : 'md:ml-auto md:pl-14'
                }`}
              >
                <span
                  className={`absolute top-1.5 left-2.5 h-3 w-3 rounded-full bg-gold-400 ring-4 ring-gold-100 md:left-auto ${
                    i % 2 === 0 ? 'md:-right-1.5' : 'md:-left-1.5'
                  }`}
                />
                <p className="font-display text-3xl text-gold-500">{item.year}</p>
                <p className="mt-2 text-charcoal/80">{item.text}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function NoEventsNotice() {
  return (
    <div className="mx-auto max-w-2xl border border-forest-600/20 bg-white p-10 text-center">
      <CalendarDays size={32} className="mx-auto text-gold-500" />
      <p className="mt-4 font-display text-xl text-forest-800">
        The latest event calendar is being prepared
      </p>
      <p className="mt-3 text-sm leading-relaxed text-charcoal/70">
        Upcoming golf tournaments, club championships and social events will be
        published here. In the meantime, please contact the club for the latest
        event calendar.
      </p>
      <Link to="/contact" className="btn-primary mt-7">
        Contact the Club
      </Link>
    </div>
  );
}
