import type { ReactNode } from 'react';
import { motion } from 'framer-motion';

export default function PageHero({
  title,
  label,
  children,
  fullscreen = false,
}: {
  title?: string;
  label?: string;
  children?: ReactNode;
  fullscreen?: boolean;
}) {
  return (
    <section
      className={`relative flex items-center justify-center overflow-hidden bg-forest-800 ${
        fullscreen ? 'min-h-screen' : 'pt-32 pb-20'
      }`}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-forest-900 via-forest-700 to-forest-800" />
      <div className="absolute -right-24 top-0 h-80 w-80 rounded-full bg-gold-400/10 blur-3xl" />
      {children ? (
        <div className="relative z-10 w-full">{children}</div>
      ) : (
        <div className="container-x relative z-10 text-center">
          {label && (
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="section-label text-gold-300"
            >
              {label}
            </motion.p>
          )}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-4 text-4xl sm:text-5xl lg:text-6xl text-white"
          >
            {title}
          </motion.h1>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="mx-auto mt-6 h-px w-20 bg-gold-400"
          />
        </div>
      )}
    </section>
  );
}
