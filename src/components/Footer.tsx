import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Facebook, Instagram, Twitter, Youtube } from 'lucide-react';
import { Wordmark } from './Navbar';
import { useSiteContent } from './Shared';

export default function Footer() {
  const content = useSiteContent();

  return (
    <footer className="bg-forest-800 text-white/70">
      <div className="container-x py-16 grid gap-12 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Wordmark light />
          <p className="mt-5 text-sm leading-relaxed">
            A historic sporting destination in the heart of Thika, bringing
            together sport, recreation and community since 1922.
          </p>
          <div className="mt-6 flex gap-3">
            {[Facebook, Instagram, Twitter, Youtube].map((Icon, i) => (
              <a
                key={i}
                href="#"
                aria-label="Social media link"
                className="flex h-9 w-9 items-center justify-center border border-white/15 text-white/60 transition-colors hover:border-gold-400 hover:text-gold-400"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-gold-400 text-xs uppercase tracking-[0.25em]">Explore</h4>
          <ul className="mt-5 space-y-3 text-sm">
            {[
              ['/', 'Home'],
              ['/about', 'About the Club'],
              ['/facilities', 'Sports & Facilities'],
              ['/golf', 'Golf'],
              ['/membership', 'Membership'],
              ['/events', 'Events'],
              ['/contact', 'Contact'],
            ].map(([to, label]) => (
              <li key={to}>
                <Link to={to} className="transition-colors hover:text-gold-300">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-gold-400 text-xs uppercase tracking-[0.25em]">
            Sports & Facilities
          </h4>
          <ul className="mt-5 space-y-3 text-sm">
            {[
              ['Golf', '/golf'],
              ['Tennis', '/facilities#tennis'],
              ['Squash', '/facilities#squash'],
              ['Lawn Bowls', '/facilities#lawn-bowls'],
              ['Swimming', '/facilities#swimming'],
              ['Fitness and Gym', '/facilities#fitness-gym'],
              ['Sauna and Steam', '/facilities#sauna-steam'],
              ['Dining and Social', '/facilities#dining-social'],
            ].map(([label, to]) => (
              <li key={label}>
                <Link to={to} className="transition-colors hover:text-gold-300">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-gold-400 text-xs uppercase tracking-[0.25em]">Contact</h4>
          <ul className="mt-5 space-y-4 text-sm">
            <li className="flex gap-3">
              <MapPin size={16} className="mt-0.5 shrink-0 text-gold-400" />
              <span>{content.contact_address || 'Thika, Kiambu County, Kenya'}</span>
            </li>
            <li className="flex gap-3">
              <Phone size={16} className="mt-0.5 shrink-0 text-gold-400" />
              <span className="italic text-white/50">
                {content.contact_phone || '[Phone number to be confirmed]'}
              </span>
            </li>
            <li className="flex gap-3">
              <Mail size={16} className="mt-0.5 shrink-0 text-gold-400" />
              <span className="italic text-white/50">
                {content.contact_email || '[Email address to be confirmed]'}
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x flex flex-col sm:flex-row items-center justify-between gap-3 py-6 text-xs text-white/50">
          <p>© {new Date().getFullYear()} Thika Sports Club. All rights reserved.</p>
          <p className="tracking-wide">Established 1922 · Thika, Kiambu County, Kenya</p>
        </div>
      </div>
    </footer>
  );
}
