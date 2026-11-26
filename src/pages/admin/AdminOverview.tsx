import { useAdminData, AdminPage, StatCard } from './shared';
import type { MembershipEnquiry, ContactEnquiry, EventEnquiry, ClubEvent, GalleryImage, Facility } from '@/lib/types';

export default function AdminOverview() {
  const membership = useAdminData<MembershipEnquiry>('membership_enquiries');
  const contact = useAdminData<ContactEnquiry>('contact_enquiries');
  const events = useAdminData<ClubEvent>('events', { column: 'created_at', asc: false });
  const gallery = useAdminData<GalleryImage>('gallery_images', { column: 'created_at', asc: false });
  const facilities = useAdminData<Facility>('facilities', { column: 'created_at', asc: false });

  const newMembership = membership.data.filter((e) => e.status === 'new').length;
  const newContact = contact.data.filter((e) => e.status === 'new').length;

  return (
    <AdminPage title="Overview">
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard label="New Membership Enquiries" value={newMembership} />
        <StatCard label="New Contact Messages" value={newContact} />
        <StatCard label="Published Events" value={events.data.filter((e) => e.is_published).length} />
        <StatCard label="Gallery Images" value={gallery.data.length} />
        <StatCard label="Active Facilities" value={facilities.data.filter((f) => f.is_active).length} />
        <StatCard label="Total Enquiries" value={membership.data.length + contact.data.length} />
      </div>
      <p className="mt-10 max-w-2xl text-sm leading-relaxed text-charcoal/60">
        Use the sidebar to manage events, gallery images, facilities, website
        content and enquiries. Enquiry statuses marked "new" are highlighted for
        follow-up.
      </p>
    </AdminPage>
  );
}
