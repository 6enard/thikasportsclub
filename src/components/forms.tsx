import { useState, type FormEvent, type ReactNode } from 'react';
import { CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function Field({
  label,
  children,
  error,
  required = false,
}: {
  label: string;
  children: ReactNode;
  error?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-charcoal/70">
        {label} {required && <span className="text-gold-600">*</span>}
      </span>
      {children}
      {error && <span className="mt-1 block text-xs text-red-700">{error}</span>}
    </label>
  );
}

type State = 'idle' | 'sending' | 'sent' | 'error';

export function FormSuccess({ title, message }: { title: string; message: string }) {
  return (
    <div className="flex items-start gap-3 border border-forest-600/30 bg-forest-50 p-5">
      <CheckCircle2 size={22} className="mt-0.5 shrink-0 text-forest-600" />
      <div>
        <p className="font-display text-lg text-forest-800">{title}</p>
        <p className="mt-1 text-sm text-charcoal/75">{message}</p>
      </div>
    </div>
  );
}

export function FormError({ message }: { message: string }) {
  return (
    <div className="flex items-start gap-3 border border-red-300 bg-red-50 p-4">
      <AlertCircle size={20} className="mt-0.5 shrink-0 text-red-700" />
      <p className="text-sm text-red-800">{message}</p>
    </div>
  );
}

export function SubmitButton({ state, label }: { state: State; label: string }) {
  return (
    <button
      type="submit"
      disabled={state === 'sending'}
      className="btn-primary disabled:opacity-60"
    >
      {state === 'sending' && <Loader2 size={16} className="animate-spin" />}
      {state === 'sending' ? 'Sending…' : label}
    </button>
  );
}

export function useEnquiryForm(
  table: 'membership_enquiries' | 'contact_enquiries' | 'event_enquiries',
) {
  const [state, setState] = useState<State>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const submit = async (
    payload: Record<string, string>,
    reset: () => void,
  ): Promise<boolean> => {
    setState('sending');
    setErrorMsg('');
    const { error } = await supabase.from(table).insert(payload);
    if (error) {
      setErrorMsg(
        'We could not send your enquiry right now. Please try again, or reach the club directly once contact details are confirmed.',
      );
      setState('error');
      return false;
    }
    reset();
    setState('sent');
    return true;
  };

  return { state, errorMsg, submit, setState };
}

export function validateEmail(email: string): boolean {
  return EMAIL_RE.test(email);
}

export function ErrorText({ text }: { text: string }) {
  return <span className="mt-1 block text-xs text-red-700">{text}</span>;
}

export function handleFormEvent(
  e: FormEvent,
  fn: () => void,
): void {
  e.preventDefault();
  fn();
}
