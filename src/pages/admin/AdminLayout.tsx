import { useEffect, useState, type ReactNode } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  CalendarDays,
  Image as ImageIcon,
  Building2,
  Inbox,
  FileText,
  Settings,
  LogOut,
  Menu,
  X,
} from 'lucide-react';
import { supabase } from '@/lib/supabase';

const NAV = [
  { to: '/admin', label: 'Overview', icon: LayoutDashboard, end: true },
  { to: '/admin/events', label: 'Events', icon: CalendarDays },
  { to: '/admin/gallery', label: 'Gallery', icon: ImageIcon },
  { to: '/admin/facilities', label: 'Facilities', icon: Building2 },
  { to: '/admin/enquiries', label: 'Enquiries', icon: Inbox },
  { to: '/admin/content', label: 'Website Content', icon: FileText },
  { to: '/admin/testimonials', label: 'Testimonials', icon: Settings },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) navigate('/admin/login');
    });
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_OUT') navigate('/admin/login');
    });
    return () => subscription.unsubscribe();
  }, [navigate]);

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-ivory lg:flex">
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-forest-800 p-6 transition-transform lg:static lg:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between">
          <p className="font-display text-lg text-white">Club Admin</p>
          <button className="lg:hidden text-white" onClick={() => setOpen(false)}>
            <X size={22} />
          </button>
        </div>
        <nav className="mt-10 space-y-1">
          {NAV.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 text-sm transition-colors ${
                  isActive
                    ? 'bg-forest-600 text-gold-300'
                    : 'text-white/70 hover:bg-forest-700 hover:text-white'
                }`
              }
            >
              <Icon size={17} /> {label}
            </NavLink>
          ))}
        </nav>
        <button
          onClick={signOut}
          className="mt-10 flex w-full items-center gap-3 px-4 py-3 text-sm text-white/60 hover:text-gold-300"
        >
          <LogOut size={17} /> Sign Out
        </button>
      </aside>

      {open && (
        <div className="fixed inset-0 z-30 bg-forest-900/50 lg:hidden" onClick={() => setOpen(false)} />
      )}

      <div className="flex-1">
        <header className="flex items-center justify-between bg-white px-6 py-4 shadow-sm lg:hidden">
          <p className="font-display text-lg text-forest-800">Club Admin</p>
          <button onClick={() => setOpen(true)} className="text-forest-800">
            <Menu size={24} />
          </button>
        </header>
        <main className="p-6 lg:p-10">{children}</main>
      </div>
    </div>
  );
}
