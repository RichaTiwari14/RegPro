import { useState, type FormEvent } from 'react';
import { useLocation } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Loader2, ShieldCheck } from 'lucide-react';
import { categories, servicesByCategory } from '@/data/services';
import { submitLead, leadWhatsappMessage, type Lead } from '@/lib/lead';
import { trackConversion } from '@/lib/analytics';
import { whatsappLink } from '@/config/site';
import { WhatsAppButton } from '@/components/ui';

type Status = 'idle' | 'sending' | 'done' | 'error';

export function LeadForm({
  defaultService = '',
  title = 'Get a free consultation',
  subtitle = 'Share your details — an expert will call you back within working hours.',
  compact = false,
  solid = false,
  className = '',
}: {
  defaultService?: string;
  title?: string;
  subtitle?: string;
  compact?: boolean;
  /** Opaque white card instead of frosted glass — for use over images. */
  solid?: boolean;
  className?: string;
}) {
  const location = useLocation();
  const surface = solid ? 'border border-white bg-white/[0.04] shadow-2xl shadow-black/40' : 'glass';
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');
  const [lead, setLead] = useState<Lead | null>(null);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data: Lead = {
      name: String(fd.get('name') || '').trim(),
      phone: String(fd.get('phone') || '').replace(/\D/g, ''),
      email: String(fd.get('email') || '').trim(),
      service: String(fd.get('service') || ''),
      city: String(fd.get('city') || '').trim(),
      message: String(fd.get('message') || '').trim(),
      page: location.pathname,
    };

    if (data.name.length < 2) return setError('Please enter your name.');
    const phone = data.phone.length === 12 && data.phone.startsWith('91') ? data.phone.slice(2) : data.phone;
    if (!/^[6-9]\d{9}$/.test(phone)) return setError('Please enter a valid 10-digit mobile number.');
    data.phone = phone;
    if (String(fd.get('company') || '')) return; // honeypot

    setError('');
    setStatus('sending');
    try {
      const result = await submitLead(data);
      trackConversion('lead', data.service || 'general');
      setLead(data);
      setStatus('done');
      if (result === 'whatsapp') window.open(whatsappLink(leadWhatsappMessage(data)), '_blank', 'noopener');
    } catch {
      setStatus('error');
      setError('Something went wrong. Please try again or reach us on WhatsApp.');
    }
  };

  if (status === 'done' && lead) {
    return (
      <div className={`${surface} rounded-[1.75rem] p-6 text-center sm:p-8 ${className}`}>
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50">
          <CheckCircle2 className="h-8 w-8 text-emerald-500" />
        </div>
        <h3 className="heading-cine mt-4 text-xl text-white">Thank you, {lead.name.split(' ')[0]}!</h3>
        <p className="mt-2 text-sm text-white/70">
          We’ve received your enquiry. For a faster response, continue the conversation with our expert on WhatsApp.
        </p>
        <WhatsAppButton
          message={leadWhatsappMessage(lead)}
          label="Continue on WhatsApp"
          size="lg"
          className="mt-6 w-full"
          source="after-form"
        />
      </div>
    );
  }

  const field =
    'w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none transition focus:border-white/40 focus:bg-white/[0.07] focus:ring-4 focus:ring-white/5';

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className={`${surface} rounded-[1.75rem] p-6 sm:p-8 ${className}`}
    >
      <h3 className="heading-cine text-xl text-white">{title}</h3>
      {subtitle && <p className="mt-1.5 text-sm text-white/60">{subtitle}</p>}

      <div className={`mt-5 grid gap-3 ${compact ? '' : 'sm:grid-cols-2'}`}>
        <label className="sr-only" htmlFor="lf-name">Full name</label>
        <input id="lf-name" name="name" autoComplete="name" placeholder="Full name *" className={field} />

        <label className="sr-only" htmlFor="lf-phone">Mobile number</label>
        <input id="lf-phone" name="phone" type="tel" inputMode="numeric" autoComplete="tel" placeholder="Mobile number *" className={field} />

        {!compact && (
          <>
            <label className="sr-only" htmlFor="lf-email">Email</label>
            <input id="lf-email" name="email" type="email" autoComplete="email" placeholder="Email (optional)" className={field} />
            <label className="sr-only" htmlFor="lf-city">City</label>
            <input id="lf-city" name="city" autoComplete="address-level2" placeholder="City" className={field} />
          </>
        )}

        <label className="sr-only" htmlFor="lf-service">Service</label>
        <select
          id="lf-service"
          name="service"
          defaultValue={defaultService}
          className={`${field} ${compact ? '' : 'sm:col-span-2'} appearance-none`}
        >
          <option value="">Select a service</option>
          {categories.map((c) => (
            <optgroup key={c.id} label={c.title}>
              {servicesByCategory(c.id).map((s) => (
                <option key={s.slug} value={s.name}>
                  {s.name}
                </option>
              ))}
            </optgroup>
          ))}
          <option value="Other / Not sure">Other / Not sure</option>
        </select>

        {!compact && (
          <>
            <label className="sr-only" htmlFor="lf-message">Message</label>
            <textarea id="lf-message" name="message" rows={3} placeholder="Tell us briefly what you need (optional)" className={`${field} sm:col-span-2 resize-none`} />
          </>
        )}

        <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      </div>

      {error && (
        <p className="mt-3 text-sm text-red-600" role="alert">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'sending'}
        className="group mt-6 flex w-full items-center justify-center gap-2.5 rounded-lg bg-white px-6 py-4 text-[15px] font-medium tracking-tight text-black shadow-lg shadow-black/40 transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-100 disabled:opacity-70"
      >
        {status === 'sending' ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" /> Sending…
          </>
        ) : (
          <>
            Get free callback
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </>
        )}
      </button>

      <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-white/50">
        <ShieldCheck className="h-3.5 w-3.5" /> Your details are safe. No spam, ever.
      </p>
    </form>
  );
}
