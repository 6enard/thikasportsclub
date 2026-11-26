import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const LINKS = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About the Club' },
  { to: '/facilities', label: 'Sports & Facilities' },
  { to: '/golf', label: 'Golf' },
  { to: '/membership', label: 'Membership' },
  { to: '/events', label: 'Events' },
  { to: '/contact', label: 'Contact' },
];

export function Wordmark({ light = false }: { light?: boolean }) {
  return (
    <Link to="/" className="flex items-center gap-3">
      <span
        className={`flex h-10 w-10 items-center justify-center border font-display text-xl ${
          light
            ? 'border-gold-400/70 text-gold-400'
            : 'border-forest-600/40 text-forest-600'
        }`}
      >
        T
      </span>
      <span className="leading-tight">
        <span
          className={`block font-display text-base font-semibold tracking-wide ${
            light ? 'text-white' : 'text-forest-800'
          }`}
        >
          Thika Sports Club
        </span>
        <span
          className={`block text-[10px] uppercase tracking-[0.25em] ${
            light ? 'text-gold-300' : 'text-gold-500'
          }`}
        >
          Est. 1922 · Kenya
        </span>
      </span>
    </Link>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const onDarkHero = location.pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  const solid = scrolled || !onDarkHero;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        solid ? 'bg-forest-800/95 shadow-lg backdrop-blur' : 'bg-transparent'
      }`}
    >
      <div className="container-x flex h-20 items-center justify-between">
        <Wordmark light />

        <nav className="hidden lg:flex items-center gap-7">
          {LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `text-[13px] font-medium tracking-wide transition-colors ${
                  isActive
                    ? 'text-gold-400'
                    : 'text-white/85 hover:text-gold-300'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
          <Link
            to="/membership"
            className="ml-2 bg-gold-400 px-5 py-2.5 text-[13px] font-semibold tracking-wide text-forest-800 transition-colors hover:bg-gold-300"
          >
            Become a Member
          </Link>
        </nav>

        <button
          className="lg:hidden text-white p-2"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden overflow-hidden bg-forest-800 border-t border-white/10"
          >
            <div className="container-x flex flex-col py-4">
              {LINKS.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `py-3 text-sm tracking-wide border-b border-white/5 ${
                      isActive ? 'text-gold-400' : 'text-white/85'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
              <Link
                to="/membership"
                className="my-4 bg-gold-400 px-5 py-3 text-center text-sm font-semibold text-forest-800"
              >
                Become a Member
              </Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
