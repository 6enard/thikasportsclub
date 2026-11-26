import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, ExternalLink } from 'lucide-react';
import PageHero from '@/components/PageHero';
import { FadeIn, SectionHeading, useSiteContent } from '@/components/Shared';
import { Field, FormSuccess, FormError, SubmitButton, useEnquiryForm, validateEmail } from '@/components/forms';

const FAQS = [
  {
    q: 'How do I get to the club?',
    a: 'The club is located in Thika, Kiambu County, Kenya — easily reached from Thika town. A map link is provided below.',
  },
  {
    q: 'Can visitors play golf?',
    a: 'Yes, visiting golfers are welcome. Please use the enquiry form or contact the club to arrange your round.',
  },
  {
    q: 'How do I find out about upcoming events?',
    a: 'The latest event calendar is available from the club directly — send a message and the club will share what is coming up.',
  },
];

export default function Contact() {
  const content = useSiteContent();
  const { state, errorMsg, submit } = useEnquiryForm('contact_enquiries');
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const set =
    (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm({ ...form, [k]: e.target.value });

  const onSubmit = () => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = 'Please enter your name.';
    if (!validateEmail(form.email)) errs.email = 'Please enter a valid email address.';
    if (!form.message.trim()) errs.message = 'Please enter your message.';
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      submit(
        form,
        () => setForm({ name: '', email: '', phone: '', subject: '', message: '' }),
      );
    }
  };

  return (
    <>
      <PageHero label="Contact" title="Get in Touch" />

      <section className="py-24">
        <div className="container-x grid gap-16 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <SectionHeading label="Club Information" title="Visit Us" align="left" />
            <div className="mt-10 space-y-6">
              <div className="flex gap-4">
                <MapPin size={20} className="mt-0.5 shrink-0 text-gold-500" />
                <div>
                  <p className="font-medium text-forest-800">Location</p>
                  <p className="mt-1 text-sm text-charcoal/70">
                    {content.contact_address || 'Thika, Kiambu County, Kenya'}
                  </p>
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=Thika+Sports+Club"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-gold-600 hover:text-forest-600"
                  >
                    Open in Google Maps <ExternalLink size={13} />
                  </a>
                </div>
              </div>
              <div className="flex gap-4">
                <Phone size={20} className="mt-0.5 shrink-0 text-gold-500" />
                <div>
                  <p className="font-medium text-forest-800">Phone</p>
                  <p className="mt-1 text-sm italic text-charcoal/50">
                    {content.contact_phone || '[Phone number to be confirmed]'}
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <Mail size={20} className="mt-0.5 shrink-0 text-gold-500" />
                <div>
                  <p className="font-medium text-forest-800">Email</p>
                  <p className="mt-1 text-sm italic text-charcoal/50">
                    {content.contact_email || '[Email address to be confirmed]'}
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <Clock size={20} className="mt-0.5 shrink-0 text-gold-500" />
                <div>
                  <p className="font-medium text-forest-800">Opening Hours</p>
                  <p className="mt-1 text-sm italic text-charcoal/50">
                    {content.contact_hours || '[Opening hours to be confirmed]'}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-10 aspect-[4/3] w-full bg-forest-100 border border-forest-600/20 flex items-center justify-center">
              <a
                href="https://www.google.com/maps/search/?api=1&query=Thika+Sports+Club"
                target="_blank"
                rel="noopener noreferrer"
                className="text-center p-6"
              >
                <MapPin size={32} className="mx-auto text-forest-600" />
                <p className="mt-3 text-sm font-medium text-forest-800">
                  Thika Sports Club on Google Maps
                </p>
                <p className="mt-1 text-xs text-charcoal/50">
                  Interactive map opens in a new tab
                </p>
              </a>
            </div>
          </div>

          <div className="lg:col-span-3">
            <SectionHeading label="Contact Form" title="Send Us a Message" align="left" />
            <FadeIn delay={0.15} className="mt-10">
              {state === 'sent' ? (
                <FormSuccess
                  title="Message sent"
                  message="Thank you for contacting Thika Sports Club. We will respond to your message as soon as possible."
                />
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    onSubmit();
                  }}
                  className="space-y-6 border border-charcoal/10 bg-white p-8 sm:p-10 shadow-sm"
                >
                  <div className="grid gap-6 sm:grid-cols-2">
                    <Field label="Name" required error={errors.name}>
                      <input className="input-field" value={form.name} onChange={set('name')} placeholder="Your name" />
                    </Field>
                    <Field label="Email" required error={errors.email}>
                      <input className="input-field" type="email" value={form.email} onChange={set('email')} placeholder="you@example.com" />
                    </Field>
                  </div>
                  <div className="grid gap-6 sm:grid-cols-2">
                    <Field label="Phone">
                      <input className="input-field" value={form.phone} onChange={set('phone')} placeholder="Phone number (optional)" />
                    </Field>
                    <Field label="Subject">
                      <input className="input-field" value={form.subject} onChange={set('subject')} placeholder="What is your message about?" />
                    </Field>
                  </div>
                  <Field label="Message" required error={errors.message}>
                    <textarea className="input-field min-h-36" value={form.message} onChange={set('message')} placeholder="Your message" />
                  </Field>
                  {errorMsg && <FormError message={errorMsg} />}
                  <SubmitButton state={state} label="Send Message" />
                </form>
              )}
            </FadeIn>
          </div>
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="container-x max-w-3xl">
          <SectionHeading label="FAQ" title="Frequently Asked Questions" />
          <div className="mt-12 space-y-4">
            {FAQS.map((f, i) => (
              <FadeIn key={f.q} delay={i * 0.08}>
                <details className="group border border-charcoal/10 open:shadow-md">
                  <summary className="cursor-pointer list-none p-6 font-medium text-forest-800 flex items-center justify-between">
                    {f.q}
                    <span className="text-gold-500 transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <p className="px-6 pb-6 text-sm leading-relaxed text-charcoal/70">{f.a}</p>
                </details>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
