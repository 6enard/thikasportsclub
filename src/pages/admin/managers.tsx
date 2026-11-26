import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import type { ClubEvent, GalleryImage, Facility, Testimonial } from '@/lib/types';
import { AdminPage } from './shared';
import { Loader2, Plus, Trash2 } from 'lucide-react';
import { useEffect } from 'react';

/* ---------------- Events manager ---------------- */

export function AdminEvents() {
  const [events, setEvents] = useState<ClubEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [draft, setDraft] = useState({ title: '', category: 'Social Events', description: '', event_date: '' });

  useEffect(() => {
    supabase.from('events').select('*').order('created_at', { ascending: false }).then(({ data }) => {
      setEvents((data as ClubEvent[]) ?? []);
      setLoading(false);
    });
  }, []);

  const add = async () => {
    if (!draft.title.trim()) return;
    const { data, error } = await supabase
      .from('events')
      .insert({ ...draft, event_date: draft.event_date || null })
      .select();
    if (!error && data) {
      setEvents([ ...(data as ClubEvent[]), ...events ]);
      setDraft({ title: '', category: 'Social Events', description: '', event_date: '' });
    }
  };

  const update = async (id: string, patch: Partial<ClubEvent>) => {
    await supabase.from('events').update(patch).eq('id', id);
    setEvents(events.map((e) => (e.id === id ? { ...e, ...patch } : e)));
  };

  const remove = async (id: string) => {
    await supabase.from('events').delete().eq('id', id);
    setEvents(events.filter((e) => e.id !== id));
  };

  if (loading) return <Loader2 className="mx-auto mt-20 animate-spin text-forest-600" />;

  return (
    <AdminPage title="Events">
      <div className="border border-charcoal/10 bg-white p-6">
        <h2 className="font-display text-xl text-forest-800">Add Event</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <input className="input-field" placeholder="Event title" value={draft.title} onChange={(e) => setDraft({ ...draft, title: e.target.value })} />
          <select className="input-field" value={draft.category} onChange={(e) => setDraft({ ...draft, category: e.target.value })}>
            {['Golf Tournaments', 'Club Championships', 'Social Events', 'Corporate Golf Days', 'Sporting Activities'].map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
          <input className="input-field" type="date" value={draft.event_date} onChange={(e) => setDraft({ ...draft, event_date: e.target.value })} />
          <input className="input-field" placeholder="Short description" value={draft.description} onChange={(e) => setDraft({ ...draft, description: e.target.value })} />
        </div>
        <button onClick={add} className="btn-primary mt-5">
          <Plus size={16} /> Add Event
        </button>
      </div>

      <div className="mt-8 space-y-4">
        {events.map((ev) => (
          <div key={ev.id} className="flex flex-wrap items-center gap-4 border border-charcoal/10 bg-white p-5">
            <div className="flex-1 min-w-48">
              <p className="font-medium text-forest-800">{ev.title}</p>
              <p className="text-xs text-charcoal/50">
                {ev.category} · {ev.event_date || 'No date set'}
              </p>
            </div>
            <label className="flex items-center gap-2 text-xs text-charcoal/60">
              <input
                type="checkbox"
                checked={ev.is_published}
                onChange={(e) => update(ev.id, { is_published: e.target.checked })}
              />
              Published
            </label>
            <button onClick={() => remove(ev.id)} className="text-charcoal/40 hover:text-red-700" aria-label="Delete event">
              <Trash2 size={17} />
            </button>
          </div>
        ))}
        {events.length === 0 && (
          <p className="p-8 text-center text-sm italic text-charcoal/50">
            No events yet. Add events here — only published events appear on the website.
          </p>
        )}
      </div>
    </AdminPage>
  );
}

/* ---------------- Gallery manager ---------------- */

export function AdminGallery() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [draft, setDraft] = useState({ title: '', category: 'General', image_url: '' });

  useEffect(() => {
    supabase.from('gallery_images').select('*').order('sort_order').then(({ data }) => {
      setImages((data as GalleryImage[]) ?? []);
      setLoading(false);
    });
  }, []);

  const add = async () => {
    if (!draft.image_url.trim()) return;
    const { data, error } = await supabase
      .from('gallery_images')
      .insert({ ...draft, sort_order: images.length + 1 })
      .select();
    if (!error && data) {
      setImages([...images, ...(data as GalleryImage[])]);
      setDraft({ title: '', category: 'General', image_url: '' });
    }
  };

  const remove = async (id: string) => {
    await supabase.from('gallery_images').delete().eq('id', id);
    setImages(images.filter((i) => i.id !== id));
  };

  if (loading) return <Loader2 className="mx-auto mt-20 animate-spin text-forest-600" />;

  return (
    <AdminPage title="Gallery">
      <div className="border border-charcoal/10 bg-white p-6">
        <h2 className="font-display text-xl text-forest-800">Add Image</h2>
        <p className="mt-1 text-xs text-charcoal/50">
          Paste an image URL (for example, an uploaded photo from club storage).
        </p>
        <div className="mt-5 grid gap-4 sm:grid-cols-3">
          <input className="input-field" placeholder="Image title" value={draft.title} onChange={(e) => setDraft({ ...draft, title: e.target.value })} />
          <select className="input-field" value={draft.category} onChange={(e) => setDraft({ ...draft, category: e.target.value })}>
            {['Golf', 'Clubhouse', 'Social', 'Tennis', 'Swimming', 'Lawn Bowls', 'Landscapes', 'General'].map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
          <input className="input-field" placeholder="https://image-url" value={draft.image_url} onChange={(e) => setDraft({ ...draft, image_url: e.target.value })} />
        </div>
        <button onClick={add} className="btn-primary mt-5">
          <Plus size={16} /> Add Image
        </button>
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-3 lg:grid-cols-4">
        {images.map((img) => (
          <div key={img.id} className="group relative border border-charcoal/10 bg-white">
            <div className="aspect-[4/3] bg-forest-100">
              {img.image_url ? (
                <img src={img.image_url} alt={img.title} className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full items-center justify-center text-xs italic text-charcoal/40">
                  Placeholder
                </div>
              )}
            </div>
            <div className="flex items-center justify-between p-3">
              <div>
                <p className="text-sm font-medium text-forest-800">{img.title}</p>
                <p className="text-xs text-charcoal/50">{img.category}</p>
              </div>
              <button onClick={() => remove(img.id)} className="text-charcoal/40 hover:text-red-700" aria-label="Delete image">
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </AdminPage>
  );
}

/* ---------------- Facilities manager ---------------- */

export function AdminFacilities() {
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.from('facilities').select('*').order('sort_order').then(({ data }) => {
      setFacilities((data as Facility[]) ?? []);
      setLoading(false);
    });
  }, []);

  const update = async (id: string, patch: Partial<Facility>) => {
    await supabase.from('facilities').update(patch).eq('id', id);
    setFacilities(facilities.map((f) => (f.id === id ? { ...f, ...patch } : f)));
  };

  if (loading) return <Loader2 className="mx-auto mt-20 animate-spin text-forest-600" />;

  return (
    <AdminPage title="Facilities">
      <div className="space-y-5">
        {facilities.map((f) => (
          <div key={f.id} className="border border-charcoal/10 bg-white p-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="font-display text-lg text-forest-800">{f.name}</p>
                <p className="text-xs text-charcoal/50">/{f.slug}</p>
              </div>
              <label className="flex items-center gap-2 text-xs text-charcoal/60">
                <input
                  type="checkbox"
                  checked={f.is_active}
                  onChange={(e) => update(f.id, { is_active: e.target.checked })}
                />
                Shown on website
              </label>
            </div>
            <textarea
              className="input-field mt-4 min-h-20"
              defaultValue={f.description}
              onBlur={(e) => update(f.id, { description: e.target.value })}
            />
            <textarea
              className="input-field mt-3 min-h-28"
              defaultValue={f.long_description}
              placeholder="Detailed description shown on the facilities page"
              onBlur={(e) => update(f.id, { long_description: e.target.value })}
            />
            <input
              className="input-field mt-3"
              defaultValue={f.image_url}
              placeholder="Image URL (optional — elegant placeholder shown until set)"
              onBlur={(e) => update(f.id, { image_url: e.target.value })}
            />
          </div>
        ))}
      </div>
    </AdminPage>
  );
}

/* ---------------- Testimonials manager ---------------- */

export function AdminTestimonials() {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [draft, setDraft] = useState({ author_name: '', author_role: '', quote: '' });

  useEffect(() => {
    supabase.from('testimonials').select('*').order('created_at', { ascending: false }).then(({ data }) => {
      setItems((data as Testimonial[]) ?? []);
      setLoading(false);
    });
  }, []);

  const add = async () => {
    if (!draft.author_name.trim() || !draft.quote.trim()) return;
    const { data, error } = await supabase.from('testimonials').insert(draft).select();
    if (!error && data) {
      setItems([...(data as Testimonial[]), ...items]);
      setDraft({ author_name: '', author_role: '', quote: '' });
    }
  };

  const toggle = async (id: string, is_published: boolean) => {
    await supabase.from('testimonials').update({ is_published }).eq('id', id);
    setItems(items.map((t) => (t.id === id ? { ...t, is_published } : t)));
  };

  const remove = async (id: string) => {
    await supabase.from('testimonials').delete().eq('id', id);
    setItems(items.filter((t) => t.id !== id));
  };

  if (loading) return <Loader2 className="mx-auto mt-20 animate-spin text-forest-600" />;

  return (
    <AdminPage title="Testimonials">
      <div className="border border-charcoal/10 bg-white p-6">
        <h2 className="font-display text-xl text-forest-800">Add Testimonial</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <input className="input-field" placeholder="Member name" value={draft.author_name} onChange={(e) => setDraft({ ...draft, author_name: e.target.value })} />
          <input className="input-field" placeholder="Role (e.g. Member since 1998)" value={draft.author_role} onChange={(e) => setDraft({ ...draft, author_role: e.target.value })} />
        </div>
        <textarea className="input-field mt-4 min-h-24" placeholder="Testimonial quote" value={draft.quote} onChange={(e) => setDraft({ ...draft, quote: e.target.value })} />
        <button onClick={add} className="btn-primary mt-5">
          <Plus size={16} /> Add Testimonial
        </button>
      </div>

      <div className="mt-8 space-y-4">
        {items.map((t) => (
          <div key={t.id} className="flex flex-wrap items-center gap-4 border border-charcoal/10 bg-white p-5">
            <div className="flex-1 min-w-48">
              <p className="font-medium text-forest-800">{t.author_name}</p>
              <p className="text-xs text-charcoal/50">{t.author_role}</p>
              <p className="mt-1 text-sm text-charcoal/70">"{t.quote}"</p>
            </div>
            <label className="flex items-center gap-2 text-xs text-charcoal/60">
              <input type="checkbox" checked={t.is_published} onChange={(e) => toggle(t.id, e.target.checked)} />
              Published
            </label>
            <button onClick={() => remove(t.id)} className="text-charcoal/40 hover:text-red-700" aria-label="Delete testimonial">
              <Trash2 size={17} />
            </button>
          </div>
        ))}
        {items.length === 0 && (
          <p className="p-8 text-center text-sm italic text-charcoal/50">
            No testimonials yet. Only published testimonials appear on the website.
          </p>
        )}
      </div>
    </AdminPage>
  );
}
