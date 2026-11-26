import { useEffect, useState } from 'react';
import { CalendarDays, Info } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import type { ClubEvent } from '@/lib/types';
import PageHero from '@/components/PageHero';
import { FadeIn, SectionHeading } from '@/components/Shared';
import { NoEventsNotice } from '@/components/sections';
import { CLUB_MEDIA, handleImageError } from '@/lib/media';
import { Field, FormSuccess, FormError, SubmitButton, useEnquiryForm, validateEmail } from '@/components/forms';

export default function Events() {
  const [events, setEvents] = useState<ClubEvent[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [filter, setFilter] = useState('All');
  const [selected, setSelected] = useState<ClubEvent | null>(null);

  useEffect(() => {
    supabase
      .from('events')
      .select('*')
      .eq('is_published', true)
      .order('event_date', { ascending: true })
      .then(({ data }) => {
        const list = (data as ClubEvent[]) ?? [];
        setEvents(list);
        setCategories([...new Set(list.map((e) => e.category))]);
      });
  }, []);

  const visible = filter === 'All' ? events : events.filter((e) => e.category === filter);

  return (
    <>
      <PageHero label="Events" title="Club Events" />
      <section className="py-24">
        <div className="container-x">
          {events.length > 0 ? (
            <>
              <div className="flex flex-wrap justify-center gap-3">
                {['All', ...categories].map((c) => (
                  <button
                    key={c}
                    onClick={() => setFilter(c)}
                    className={`px-5 py-2 text-xs font-medium uppercase tracking-wider border transition-colors ${
                      filter === c
                        ? 'border-forest-600 bg-forest-600 text-white'
                        : 'border-charcoal/20 text-charcoal/70 hover:border-forest-600 hover:text-forest-600'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
              <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {visible.map((ev, i) => (
                  <FadeIn key={ev.id} delay={(i % 3) * 0.1}>
                    <article className="group h-full border border-charcoal/10 bg-white transition-shadow hover:shadow-xl">
                      <div className="relative aspect-[16/9] overflow-hidden bg-forest-800">
                        <img
                          src={ev.image_url || CLUB_MEDIA.heritage}
                          alt={ev.title}
                          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                          loading="lazy"
                          onError={handleImageError}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-forest-900/60 via-transparent to-transparent" />
                      </div>
                      <div className="p-7">
                        <p className="text-xs uppercase tracking-[0.2em] text-gold-600">{ev.category}</p>
                        <h3 className="mt-3 font-display text-xl text-forest-800">{ev.title}</h3>
                        {ev.event_date && (
                          <p className="mt-2 flex items-center gap-2 text-sm text-charcoal/60">
                            <CalendarDays size={14} />
                            {ev.event_date}
                          </p>
                        )}
                        <p className="mt-3 text-sm leading-relaxed text-charcoal/70">{ev.description}</p>
                        <button
                          onClick={() => setSelected(ev)}
                          className="mt-5 text-xs font-semibold uppercase tracking-[0.2em] text-gold-600 hover:text-forest-600"
                        >
                          Event Details
                        </button>
                      </div>
                    </article>
                  </FadeIn>
                ))}
              </div>
            </>
          ) : (
            <SectionHeading label="What's On" title="Upcoming Events" />
          )}
          {events.length === 0 && (
            <FadeIn delay={0.15} className="mt-14">
              <NoEventsNotice />
            </FadeIn>
          )}
        </div>
      </section>

      {selected && (
        <EventEnquiryModal event={selected} onClose={() => setSelected(null)} />
      )}
    </>
  );
}

function EventEnquiryModal({ event, onClose }: { event: ClubEvent; onClose: () => void }) {
  const { state, errorMsg, submit } = useEnquiryForm('event_enquiries');
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const onSubmit = () => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = 'Please enter your name.';
    if (!validateEmail(form.email)) errs.email = 'Please enter a valid email address.';
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      submit(
        { ...form, event_id: event.id, event_title: event.title },
        () => setForm({ name: '', email: '', message: '' }),
      );
    }
  };

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-forest-900/70 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg bg-white p-8 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="text-xs uppercase tracking-[0.2em] text-gold-600">{event.category}</p>
        <h3 className="mt-2 font-display text-2xl text-forest-800">{event.title}</h3>
        {event.event_date && (
          <p className="mt-2 flex items-center gap-2 text-sm text-charcoal/60">
            <CalendarDays size={14} /> {event.event_date}
          </p>
        )}
        <p className="mt-4 text-sm leading-relaxed text-charcoal/75">{event.description}</p>
        <div className="mt-6 border-t border-charcoal/10 pt-6">
          {state === 'sent' ? (
            <FormSuccess
              title="Enquiry received"
              message="Thank you — the club will get back to you about this event."
            />
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                onSubmit();
              }}
              className="space-y-4"
            >
              <p className="flex items-center gap-2 text-sm font-medium text-forest-800">
                <Info size={15} className="text-gold-500" /> Enquire about this event
              </p>
              <Field label="Name" required error={errors.name}>
                <input className="input-field" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              </Field>
              <Field label="Email" required error={errors.email}>
                <input className="input-field" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
              </Field>
              <Field label="Message">
                <textarea className="input-field" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
              </Field>
              {errorMsg && <FormError message={errorMsg} />}
              <SubmitButton state={state} label="Send Enquiry" />
            </form>
          )}
        </div>
        <button
          onClick={onClose}
          className="mt-6 w-full text-xs uppercase tracking-[0.2em] text-charcoal/50 hover:text-forest-600"
        >
          Close
        </button>
      </div>
    </div>
  );
}
