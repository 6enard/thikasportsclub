import { useEffect, useMemo, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import type { GalleryImage } from '@/lib/types';
import PageHero from '@/components/PageHero';
import { FadeIn } from '@/components/Shared';
import { CLUB_MEDIA, handleImageError } from '@/lib/media';

export default function Gallery() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [filter, setFilter] = useState('All');
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    supabase
      .from('gallery_images')
      .select('*')
      .order('sort_order')
      .then(({ data }) => {
        const list = (data as GalleryImage[]) ?? [];
        setImages(list);
        setCategories([...new Set(list.map((i) => i.category))]);
      });
  }, []);

  const visible = useMemo(
    () => (filter === 'All' ? images : images.filter((i) => i.category === filter)),
    [images, filter],
  );

  const next = useCallback(
    () => setActive((a) => (a === null ? null : (a + 1) % visible.length)),
    [visible.length],
  );
  const prev = useCallback(
    () => setActive((a) => (a === null ? null : (a - 1 + visible.length) % visible.length)),
    [visible.length],
  );

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActive(null);
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [active, next, prev]);

  return (
    <>
      <PageHero label="Gallery" title="Life at the Club" />
      <section className="py-24">
        <div className="container-x">
          {categories.length > 1 && (
            <div className="flex flex-wrap justify-center gap-3">
              {['All', ...categories].map((c) => (
                <button
                  key={c}
                  onClick={() => {
                    setFilter(c);
                    setActive(null);
                  }}
                  className={`px-5 py-2 text-xs font-medium uppercase tracking-wider border transition-colors ${
                    filter === c
                      ? 'border-forest-600 bg-forest-600 text-white'
                      : 'border-charcoal/20 text-charcoal/70 hover:border-forest-600 hover:text-forest-600'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          )}

          {visible.length === 0 ? (
            <p className="mx-auto mt-14 max-w-xl text-center text-sm italic text-charcoal/50">
              Club photography is being prepared and will appear here soon.
            </p>
          ) : (
            <div className="mt-14 columns-1 gap-5 sm:columns-2 lg:columns-3 [&>*]:mb-5">
              {visible.map((img, i) => (
                <FadeIn key={img.id} delay={(i % 3) * 0.08}>
                  <button
                    onClick={() => setActive(i)}
                    className="group relative block w-full overflow-hidden text-left break-inside-avoid"
                  >
                    <div
                      className={`relative w-full overflow-hidden bg-forest-800 ${i % 5 === 0 ? 'aspect-[3/4]' : i % 3 === 0 ? 'aspect-square' : 'aspect-[4/3]'}`}
                    >
                      <img
                        src={img.image_url || CLUB_MEDIA.heritage}
                        alt={img.title || 'Thika Sports Club photograph'}
                        className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                        loading="lazy"
                        onError={handleImageError}
                      />
                      <div className="absolute inset-0 bg-forest-900/10 transition group-hover:bg-transparent" />
                    </div>
                    <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-forest-900/80 to-transparent p-4 pt-10 text-sm font-medium text-white opacity-0 transition-opacity group-hover:opacity-100">
                      {img.title}
                    </span>
                  </button>
                </FadeIn>
              ))}
            </div>
          )}
        </div>
      </section>

      <AnimatePresence>
        {active !== null && visible[active] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex items-center justify-center bg-forest-900/90 p-4"
            onClick={() => setActive(null)}
          >
            <button
              className="absolute top-5 right-5 text-white/70 hover:text-white"
              onClick={() => setActive(null)}
              aria-label="Close"
            >
              <X size={30} />
            </button>
            <button
              className="absolute left-4 text-white/70 hover:text-white"
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              aria-label="Previous image"
            >
              <ChevronLeft size={40} />
            </button>
            <motion.figure
              key={visible[active].id}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-4xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex aspect-[16/10] w-[80vw] max-w-4xl items-center justify-center bg-gradient-to-br from-forest-600 to-forest-900">
                {visible[active].image_url ? (
                  <img
                    src={visible[active].image_url}
                    alt={visible[active].title || 'Club photograph'}
                    className="h-full w-full object-contain"
                    loading="lazy"
                    onError={handleImageError}
                  />
                ) : (
                  <span className="font-display text-2xl text-white/40">
                    {visible[active].title || 'Club photograph'}
                  </span>
                )}
              </div>
              <figcaption className="mt-4 text-center text-sm text-white/70">
                {visible[active].title} · {active + 1} / {visible.length}
              </figcaption>
            </motion.figure>
            <button
              className="absolute right-4 text-white/70 hover:text-white"
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              aria-label="Next image"
            >
              <ChevronRight size={40} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
