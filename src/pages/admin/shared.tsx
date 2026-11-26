import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import type { MembershipEnquiry, ContactEnquiry, EventEnquiry } from '@/lib/types';

export function useAdminData<T>(table: string, order: { column: string; asc: boolean } = { column: 'created_at', asc: false }) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const refresh = () => {
    setLoading(true);
    supabase
      .from(table)
      .select('*')
      .order(order.column, { ascending: order.asc })
      .then(({ data: rows }) => {
        if (rows) setData(rows as T[]);
        setError(!rows);
        setLoading(false);
      });
  };

  useEffect(refresh, []); // eslint-disable-line react-hooks/exhaustive-deps

  return { data, loading, error, refresh };
}

export function AdminPage({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h1 className="font-display text-3xl text-forest-800">{title}</h1>
      <div className="mt-8">{children}</div>
    </div>
  );
}

export function StatCard({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="border border-charcoal/10 bg-white p-6">
      <p className="text-xs uppercase tracking-wider text-charcoal/50">{label}</p>
      <p className="mt-2 font-display text-3xl text-forest-800">{value}</p>
    </div>
  );
}

export function EnquiryTable({
  rows,
  onStatus,
}: {
  rows: (MembershipEnquiry | ContactEnquiry | EventEnquiry)[];
  onStatus: (id: string, status: string) => void;
}) {
  return (
    <div className="overflow-x-auto border border-charcoal/10 bg-white">
      <table className="w-full min-w-[720px] text-left text-sm">
        <thead>
          <tr className="border-b border-charcoal/10 bg-forest-50 text-xs uppercase tracking-wider text-charcoal/60">
            <th className="px-5 py-4">From</th>
            <th className="px-5 py-4">Details</th>
            <th className="px-5 py-4">Received</th>
            <th className="px-5 py-4">Status</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.id} className="border-b border-charcoal/5 align-top">
              <td className="px-5 py-4">
                <p className="font-medium text-forest-800">
                  {'full_name' in r ? r.full_name : r.name}
                </p>
                <p className="text-xs text-charcoal/50">{r.email}</p>
                {'phone' in r && r.phone && (
                  <p className="text-xs text-charcoal/50">{r.phone}</p>
                )}
              </td>
              <td className="max-w-md px-5 py-4 text-charcoal/75">
                {'membership_interest' in r && (
                  <p className="text-xs font-medium uppercase tracking-wider text-gold-600">
                    {r.membership_interest}
                  </p>
                )}
                {'subject' in r && r.subject && (
                  <p className="text-xs font-medium uppercase tracking-wider text-gold-600">
                    {r.subject}
                  </p>
                )}
                {'event_title' in r && r.event_title && (
                  <p className="text-xs font-medium uppercase tracking-wider text-gold-600">
                    {r.event_title}
                  </p>
                )}
                <p className="mt-1">{r.message || '—'}</p>
              </td>
              <td className="px-5 py-4 text-xs text-charcoal/50">
                {new Date(r.created_at).toLocaleDateString('en-GB', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                })}
              </td>
              <td className="px-5 py-4">
                <select
                  value={r.status}
                  onChange={(e) => onStatus(r.id, e.target.value)}
                  className={`border px-3 py-1.5 text-xs ${
                    r.status === 'new'
                      ? 'border-gold-400 bg-gold-50 text-gold-700'
                      : 'border-forest-300 bg-forest-50 text-forest-700'
                  }`}
                >
                  <option value="new">New</option>
                  <option value="in-progress">In progress</option>
                  <option value="resolved">Resolved</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {rows.length === 0 && (
        <p className="p-10 text-center text-sm italic text-charcoal/50">
          No enquiries yet. Submissions from the website will appear here.
        </p>
      )}
    </div>
  );
}
