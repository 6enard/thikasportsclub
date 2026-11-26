import { useEffect, useState, type ReactNode } from 'react';
import { motion } from 'framer-motion';

export function FadeIn({
  children,
  delay = 0,
  className,
  y = 24,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  y?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function useSiteContent() {
  const [content, setContent] = useState<Record<string, string>>({});

  useEffect(() => {
    import('@/lib/supabase').then(({ supabase }) => {
      supabase
        .from('site_content')
        .select('key, value')
        .then(({ data }) => {
          if (data) {
            const map: Record<string, string> = {};
            for (const row of data as { key: string; value: string }[]) map[row.key] = row.value;
            setContent(map);
          }
        });
    });
  }, []);

  return content;
}

export function SectionHeading({
  label,
  title,
  align = 'center',
  light = false,
}: {
  label: string;
  title: string;
  align?: 'center' | 'left';
  light?: boolean;
}) {
  return (
    <FadeIn className={align === 'center' ? 'text-center' : 'text-left'}>
      <p className="section-label">{label}</p>
      <h2
        className={`mt-3 text-3xl sm:text-4xl lg:text-5xl leading-tight ${
          light ? 'text-ivory' : 'text-forest-800'
        }`}
      >
        {title}
      </h2>
      <div
        className={`mt-5 h-px w-16 bg-gold-400 ${align === 'center' ? 'mx-auto' : ''}`}
      />
    </FadeIn>
  );
}
