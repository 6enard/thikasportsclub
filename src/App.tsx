import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Home from '@/pages/Home';
import About from '@/pages/About';
import Facilities from '@/pages/Facilities';
import Golf from '@/pages/Golf';
import Membership from '@/pages/Membership';
import Events from '@/pages/Events';
import Contact from '@/pages/Contact';
import Gallery from '@/pages/Gallery';
import AdminLayout from '@/pages/admin/AdminLayout';
import AdminLogin from '@/pages/admin/AdminLogin';
import AdminOverview from '@/pages/admin/AdminOverview';
import { AdminEnquiries } from '@/pages/admin/AdminEnquiries';
import AdminContent from '@/pages/admin/AdminContent';
import { AdminEvents, AdminGallery, AdminFacilities, AdminTestimonials } from '@/pages/admin/managers';

const TITLES: Record<string, string> = {
  '/': 'Thika Sports Club | Where Heritage Meets Sport',
  '/about': 'About the Club | Thika Sports Club',
  '/facilities': 'Sports & Facilities | Thika Sports Club',
  '/golf': 'Golf | Thika Sports Club',
  '/membership': 'Membership | Thika Sports Club',
  '/events': 'Events | Thika Sports Club',
  '/contact': 'Contact | Thika Sports Club',
  '/gallery': 'Gallery | Thika Sports Club',
};

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    if (!window.location.hash) window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function PublicShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

export default function App() {
  const { pathname } = useLocation();
  useEffect(() => {
    document.title = TITLES[pathname] ?? 'Thika Sports Club | Where Heritage Meets Sport';
  }, [pathname]);

  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<PublicShell><Home /></PublicShell>} />
        <Route path="/about" element={<PublicShell><About /></PublicShell>} />
        <Route path="/facilities" element={<PublicShell><Facilities /></PublicShell>} />
        <Route path="/golf" element={<PublicShell><Golf /></PublicShell>} />
        <Route path="/membership" element={<PublicShell><Membership /></PublicShell>} />
        <Route path="/events" element={<PublicShell><Events /></PublicShell>} />
        <Route path="/contact" element={<PublicShell><Contact /></PublicShell>} />
        <Route path="/gallery" element={<PublicShell><Gallery /></PublicShell>} />

        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminLayout><AdminOverview /></AdminLayout>} />
        <Route path="/admin/events" element={<AdminLayout><AdminEvents /></AdminLayout>} />
        <Route path="/admin/gallery" element={<AdminLayout><AdminGallery /></AdminLayout>} />
        <Route path="/admin/facilities" element={<AdminLayout><AdminFacilities /></AdminLayout>} />
        <Route path="/admin/enquiries" element={<AdminLayout><AdminEnquiries /></AdminLayout>} />
        <Route path="/admin/content" element={<AdminLayout><AdminContent /></AdminLayout>} />
        <Route path="/admin/testimonials" element={<AdminLayout><AdminTestimonials /></AdminLayout>} />
      </Routes>
    </>
  );
}
