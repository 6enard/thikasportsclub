import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { AdminPage, EnquiryTable } from './shared';
import type { MembershipEnquiry, ContactEnquiry, EventEnquiry } from '@/lib/types';

export function AdminEnquiries() {
  const [tab, setTab] = useState<'membership' | 'contact' | 'events'>('membership');
  const [rows, setRows] = useState<(MembershipEnquiry | ContactEnquiry | EventEnquiry)[]>([]);
  const [loading, setLoading] = useState(true);

  const table = tab === 'membership' ? 'membership_enquiries' : tab === 'contact' ? 'contact_enquiries' : 'event_enquiries';

  useEffect(() => {
    setLoading(true);
    supabase
      .from(table)
      .select('*')
      .order('created_at', { ascending: false })
      .then(({ data }) => {
        setRows((data as (MembershipEnquiry | ContactEnquiry | EventEnquiry)[]) ?? []);
        setLoading(false);
      });
  }, [table]);

  const setStatus = async (id: string, status: string) => {
    await supabase.from(table).update({ status }).eq('id', id);
    setRows(rows.map((r) => (r.id === id ? { ...r, status } : r)));
  };

  return (
    <AdminPage title="Enquiries">
      <div className="flex gap-2">
        {(
          [
            ['membership', 'Membership'],
            ['contact', 'Contact'],
            ['events', 'Event Enquiries'],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            className={`px-5 py-2.5 text-xs font-medium uppercase tracking-wider border transition-colors ${
              tab === id
                ? 'border-forest-600 bg-forest-600 text-white'
                : 'border-charcoal/20 text-charcoal/70 hover:border-forest-600'
            }`}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="mt-8">
        {loading ? (
          <p className="p-10 text-center text-sm text-charcoal/50">Loading…</p>
        ) : (
          <EnquiryTable rows={rows} onStatus={setStatus} />
        )}
      </div>
    </AdminPage>
  );
}
