import { useState } from 'react';
import PageHero from '@/components/PageHero';
import { FadeIn, SectionHeading } from '@/components/Shared';
import { Field, FormSuccess, FormError, SubmitButton, useEnquiryForm, validateEmail } from '@/components/forms';
import { CheckCircle2 } from 'lucide-react';

const BENEFITS = [
  ['Access to Sporting Facilities', 'Golf, tennis, squash, lawn bowls, swimming, gym, sauna and steam.'],
  ['Social Activities', 'Regular occasions at the clubhouse, at the centre of club life.'],
  ['Club Events', 'Tournaments, championships and gatherings throughout the year.'],
  ['Community & Networking', 'A welcoming membership spanning generations of Thika families.'],
];

const FAQS = [
  {
    q: 'How do I become a member?',
    a: 'Submit the enquiry form on this page and the club will contact you with current membership categories, requirements and the joining procedure.',
  },
  {
    q: 'What membership categories are available?',
    a: 'Membership categories and fees are confirmed by the club directly. Submit an enquiry and the club will share the latest information with you.',
  },
  {
    q: 'Can visitors use the facilities?',
    a: 'Visitors are warmly welcomed at Thika Sports Club, particularly on the golf course. Contact the club to arrange your visit.',
  },
  {
    q: 'Is the club family-friendly?',
    a: 'Yes — the swimming pool, grounds and social facilities make the club a popular destination for members and their families.',
  },
];

export default function Membership() {
  const { state, errorMsg, submit } = useEnquiryForm('membership_enquiries');
  const [form, setForm] = useState({
    full_name: '',
    email: '',
    phone: '',
    membership_interest: 'General enquiry',
    message: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const set =
    (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm({ ...form, [k]: e.target.value });

  const onSubmit = () => {
    const errs: Record<string, string> = {};
    if (!form.full_name.trim()) errs.full_name = 'Please enter your full name.';
    if (!validateEmail(form.email)) errs.email = 'Please enter a valid email address.';
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      submit(
        form,
        () =>
          setForm({
            full_name: '',
            email: '',
            phone: '',
            membership_interest: 'General enquiry',
            message: '',
          }),
      );
    }
  };

  return (
    <>
      <PageHero label="Membership" title="Become Part of the Club" />

      <section className="py-24">
        <div className="container-x">
          <SectionHeading label="Join Us" title="A Community Built on Sport & Friendship" />
          <FadeIn delay={0.15}>
            <p className="mx-auto mt-8 max-w-2xl text-center text-base sm:text-lg leading-relaxed text-charcoal/75">
              Discover a community built around sport, friendship and a shared
              appreciation for the club's heritage.
            </p>
          </FadeIn>
          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {BENEFITS.map(([t, b], i) => (
              <FadeIn key={t} delay={i * 0.1}>
                <div className="h-full border border-charcoal/10 bg-white p-7 transition-shadow hover:shadow-lg">
                  <CheckCircle2 size={22} className="text-gold-500" />
                  <h3 className="mt-4 font-display text-lg text-forest-800">{t}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-charcoal/70">{b}</p>
                </div>
              </FadeIn>
            ))}
          </div>
          <FadeIn delay={0.2}>
            <p className="mx-auto mt-10 max-w-2xl text-center text-xs italic text-charcoal/50">
              Membership categories, fees and joining requirements are confirmed
              by the club directly — please use the enquiry form below.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="bg-white py-24" id="enquire">
        <div className="container-x max-w-3xl">
          <SectionHeading label="Membership Enquiry" title="Enquire About Membership" />
          <FadeIn delay={0.15} className="mt-12">
            {state === 'sent' ? (
              <FormSuccess
                title="Thank you for your enquiry"
                message="Your enquiry has been received. The club will be in touch to discuss membership."
              />
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  onSubmit();
                }}
                className="space-y-6 border border-charcoal/10 p-8 sm:p-10 shadow-sm"
              >
                <div className="grid gap-6 sm:grid-cols-2">
                  <Field label="Full Name" required error={errors.full_name}>
                    <input className="input-field" value={form.full_name} onChange={set('full_name')} placeholder="Your full name" />
                  </Field>
                  <Field label="Email" required error={errors.email}>
                    <input className="input-field" type="email" value={form.email} onChange={set('email')} placeholder="you@example.com" />
                  </Field>
                </div>
                <div className="grid gap-6 sm:grid-cols-2">
                  <Field label="Phone Number">
                    <input className="input-field" value={form.phone} onChange={set('phone')} placeholder="Phone number" />
                  </Field>
                  <Field label="Membership Interest">
                    <select className="input-field" value={form.membership_interest} onChange={set('membership_interest')}>
                      <option>General enquiry</option>
                      <option>Full membership</option>
                      <option>Family membership</option>
                      <option>Corporate membership</option>
                      <option>Student / junior</option>
                      <option>Golf section</option>
                    </select>
                  </Field>
                </div>
                <Field label="Message">
                  <textarea className="input-field min-h-32" value={form.message} onChange={set('message')} placeholder="Tell us a little about yourself and your interest in the club" />
                </Field>
                {errorMsg && <FormError message={errorMsg} />}
                <SubmitButton state={state} label="Send Enquiry" />
              </form>
            )}
          </FadeIn>
        </div>
      </section>

      <section className="py-24">
        <div className="container-x max-w-3xl">
          <SectionHeading label="FAQ" title="Frequently Asked Questions" />
          <div className="mt-12 space-y-4">
            {FAQS.map((f, i) => (
              <FadeIn key={f.q} delay={i * 0.08}>
                <details className="group border border-charcoal/10 bg-white open:shadow-md">
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
