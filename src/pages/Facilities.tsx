import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import type { Facility } from '@/lib/types';
import PageHero from '@/components/PageHero';
import { FadeIn, SectionHeading } from '@/components/Shared';
import { handleImageError, CLUB_MEDIA, FACILITY_MEDIA } from '@/lib/media';
import { FALLBACK_FACILITIES } from '@/lib/facilities';

export default function Facilities() {
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
    <>
      <PageHero label="Sports & Facilities" title="Eight Ways to Be Active" />
      <section className="py-24">
        <div className="container-x space-y-24">
          {facilities.map((f, i) => (
            <article
              key={f.id}
              id={f.slug}
              className={`grid items-center gap-12 lg:grid-cols-2 scroll-mt-28 ${
                i % 2 === 1 ? 'lg:[&>*:first-child]:order-2' : ''
              }`}
            >
              <FadeIn>
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-forest-800 shadow-xl">
                  <img
                    src={f.image_url || FACILITY_MEDIA[f.slug] || CLUB_MEDIA.heritage}
                    alt={`${f.name} at Thika Sports Club`}
                    className="h-full w-full object-cover transition duration-700 hover:scale-105"
                    loading="lazy"
                    onError={handleImageError}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-forest-900/60 via-transparent to-transparent" />
                </div>
              </FadeIn>
              <div>
                <FadeIn delay={0.1}>
                  <p className="section-label">{`0${i + 1}`}</p>
                  <h2 className="mt-3 text-3xl sm:text-4xl text-forest-800">{f.name}</h2>
                  <div className="mt-4 h-px w-14 bg-gold-400" />
                  <p className="mt-6 text-base leading-relaxed text-charcoal/80">
                    {f.long_description || f.description}
                  </p>
                  <div className="mt-8 flex flex-wrap gap-4">
                    <Link to="/contact" className="btn-primary">
                      Enquire <ArrowRight size={16} />
                    </Link>
                    {f.slug === 'golf' && (
                      <Link to="/golf" className="btn-outline-dark">
                        Visit the Golf Page
                      </Link>
                    )}
                  </div>
                </FadeIn>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
