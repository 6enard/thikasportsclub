import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { AdminPage } from './shared';
import { Loader2, Save } from 'lucide-react';

const FIELDS: { key: string; label: string; multiline?: boolean }[] = [
  { key: 'hero_title', label: 'Hero Title' },
  { key: 'hero_tagline', label: 'Hero Tagline' },
  { key: 'hero_description', label: 'Hero Description', multiline: true },
  { key: 'welcome_title', label: 'Welcome Section Title' },
  { key: 'welcome_body', label: 'Welcome Section Text', multiline: true },
  { key: 'contact_address', label: 'Contact Address', multiline: true },
  { key: 'contact_phone', label: 'Contact Phone' },
  { key: 'contact_email', label: 'Contact Email' },
  { key: 'contact_hours', label: 'Opening Hours' },
];

export default function AdminContent() {
  const [values, setValues] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    supabase.from('site_content').select('key, value').then(({ data }) => {
      if (data) {
        const map: Record<string, string> = {};
        for (const row of data as { key: string; value: string }[]) map[row.key] = row.value;
        setValues(map);
      }
      setLoading(false);
    });
  }, []);

  const save = async () => {
    for (const field of FIELDS) {
      await supabase
        .from('site_content')
        .upsert({ key: field.key, value: values[field.key] ?? '' });
    }
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  if (loading) return <Loader2 className="mx-auto mt-20 animate-spin text-forest-600" />;

  return (
    <AdminPage title="Website Content">
      <div className="max-w-2xl space-y-5 border border-charcoal/10 bg-white p-8">
        {FIELDS.map((field) => (
          <label key={field.key} className="block">
            <span className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-charcoal/70">
              {field.label}
            </span>
            {field.multiline ? (
              <textarea
                className="input-field min-h-24"
                value={values[field.key] ?? ''}
                onChange={(e) => setValues({ ...values, [field.key]: e.target.value })}
              />
            ) : (
              <input
                className="input-field"
                value={values[field.key] ?? ''}
                onChange={(e) => setValues({ ...values, [field.key]: e.target.value })}
              />
            )}
          </label>
        ))}
        <button onClick={save} className="btn-primary">
          <Save size={16} /> {saved ? 'Saved' : 'Save Changes'}
        </button>
      </div>
    </AdminPage>
  );
}
