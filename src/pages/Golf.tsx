import { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { CLUB_MEDIA } from '@/lib/media';
import PageHero from '@/components/PageHero';
import { FadeIn, SectionHeading } from '@/components/Shared';
import { Field, FormSuccess, FormError, SubmitButton, useEnquiryForm, validateEmail, ErrorText } from '@/components/forms';

export default function Golf() {
  const { state, errorMsg, submit } = useEnquiryForm('contact_enquiries');
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: 'Golf enquiry', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [k]: e.target.value });

  const onSubmit = () => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = 'Please enter your name.';
    if (!validateEmail(form.email)) errs.email = 'Please enter a valid email address.';
    if (!form.message.trim()) errs.message = 'Please enter your message.';
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      submit(form, () => setForm({ name: '', email: '', phone: '', subject: 'Golf enquiry', message: '' }));
    }
  };

  return (
    <>
      <PageHero label="Golf" title="Experience Golf at Thika" />

      <section className="py-24">
        <div className="container-x grid items-center gap-14 lg:grid-cols-2">
          <FadeIn>
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-forest-800 shadow-xl">
              <img
                src={CLUB_MEDIA.course}
                alt="Thika Sports Club golf course"
                className="h-full w-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-900/60 via-transparent to-transparent" />
            </div>
          </FadeIn>
          <div>
            <SectionHeading label="The Course" title="A Historic 18-Hole Course" align="left" />
            <FadeIn delay={0.15}>
              <p className="mt-8 text-base sm:text-lg leading-relaxed text-charcoal/80">
                Enjoy a memorable round on the club's historic golf course,
                surrounded by beautiful greenery and the peaceful atmosphere of
                Thika.
              </p>
              <p className="mt-5 text-base leading-relaxed text-charcoal/70">
                First laid out as 8 holes in 1932 and formally opened in 1947,
                the course was expanded to a full 18 holes in 1996. Mature
                trees line the fairways, making for a round that rewards
                accuracy and offers a quiet escape from the town just beyond
                the gates.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="container-x">
          <SectionHeading label="On the Course" title="Course & Facilities" />
          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ['18 Holes', 'A full-length course expanded to 18 holes in 1996.'],
              ['Clubhouse', 'Dining and social facilities steps from the 18th green.'],
              ['Golf Events', 'Tournaments and club fixtures through the year.'],
              ['Visitors', 'Visiting golfers warmly welcomed — enquire below.'],
            ].map(([t, b], i) => (
              <FadeIn key={t} delay={i * 0.1}>
                <div className="h-full border border-charcoal/10 p-7">
                  <p className="font-display text-xl text-forest-800">{t}</p>
                  <p className="mt-3 text-sm leading-relaxed text-charcoal/70">{b}</p>
                </div>
              </FadeIn>
            ))}
          </div>
          <FadeIn delay={0.2}>
            <p className="mx-auto mt-10 max-w-2xl text-center text-xs italic text-charcoal/50">
              Green fees and tee-time availability are not published online.
              Please enquire directly with the club for current visitor rates
              and booking information.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="py-24" id="enquire">
        <div className="container-x max-w-3xl">
          <SectionHeading label="Golf Enquiry" title="Enquire About Golf" />
          <FadeIn delay={0.15} className="mt-12">
            {state === 'sent' ? (
              <FormSuccess
                title="Thank you for your enquiry"
                message="The club's golf section will get back to you as soon as possible."
              />
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }} className="space-y-6 border border-charcoal/10 bg-white p-8 sm:p-10 shadow-sm">
                <div className="grid gap-6 sm:grid-cols-2">
                  <Field label="Name" required error={errors.name}>
                    <input className="input-field" value={form.name} onChange={set('name')} placeholder="Your name" />
                  </Field>
                  <Field label="Email" required error={errors.email}>
                    <input className="input-field" type="email" value={form.email} onChange={set('email')} placeholder="you@example.com" />
                  </Field>
                </div>
                <Field label="Phone">
                  <input className="input-field" value={form.phone} onChange={set('phone')} placeholder="Phone number (optional)" />
                </Field>
                <input type="hidden" value={form.subject} />
                <Field label="Message" required error={errors.message}>
                  <textarea className="input-field min-h-32" value={form.message} onChange={set('message')} placeholder="How can we help with your visit or membership of the golf section?" />
                </Field>
                {errorMsg && <FormError message={errorMsg} />}
                <SubmitButton state={state} label="Send Enquiry" />
              </form>
            )}
          </FadeIn>
        </div>
      </section>
    </>
  );
}
