import { useId, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { AlertCircle, ArrowRight, CheckCircle2, Loader2, Phone, ShieldCheck } from 'lucide-react';
import { categories, servicesByCategory } from '@/data/services';
import { site, whatsappLink } from '@/config/site';
import { submitEnquiry, enquiryWhatsappMessage } from '@/services/enquiries';
import { trackEvent } from '@/lib/analytics';
import { WhatsAppGlyph } from '@/components/ui';

const schema = z.object({
  full_name: z.string().trim().min(2, 'Please enter your full name.').max(80, 'Name is too long.'),
  mobile: z
    .string()
    .trim()
    .transform((v) => v.replace(/[\s-]/g, '').replace(/^(\+91|91|0)(?=\d{10}$)/, ''))
    .refine((v) => /^[6-9]\d{9}$/.test(v), 'Enter a valid 10-digit Indian mobile number.'),
  email: z.string().trim().email('Enter a valid email address.'),
  service: z.string().min(1, 'Please choose a service.'),
  city: z.string().trim().max(60).optional(),
  message: z.string().trim().max(1000, 'Please keep the message under 1000 characters.').optional(),
  consent: z.literal(true, { errorMap: () => ({ message: 'Please accept the privacy policy to continue.' }) }),
  company: z.string().max(0).optional(), // honeypot
});

type FormIn = z.input<typeof schema>;
type FormOut = z.output<typeof schema>;

type Status = { kind: 'idle' } | { kind: 'success'; name: string; service: string; city?: string } | { kind: 'error'; message: string; notConfigured: boolean };

const newKey = () => (typeof crypto !== 'undefined' && 'randomUUID' in crypto ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`);

export function EnquiryForm({
  defaultService = '',
  title = 'Send us an enquiry',
  subtitle = 'Share your details and an expert will get back to you within working hours.',
  compact = false,
  className = '',
}: {
  defaultService?: string;
  title?: string;
  subtitle?: string;
  compact?: boolean;
  className?: string;
}) {
  const uid = useId();
  const { pathname } = useLocation();
  const [status, setStatus] = useState<Status>({ kind: 'idle' });
  const inFlight = useRef(false);
  const key = useRef(newKey());
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormIn, unknown, FormOut>({ resolver: zodResolver(schema), defaultValues: { service: defaultService, city: '', message: '' } });

  const onSubmit = async (v: FormOut) => {
    if (inFlight.current) return; // guard against double submission
    inFlight.current = true;
    setStatus({ kind: 'idle' });
    if (v.company) {
      inFlight.current = false;
      return;
    }
    const res = await submitEnquiry(
      { full_name: v.full_name, mobile: v.mobile, email: v.email, service: v.service, city: v.city, message: v.message, consent: v.consent, page: pathname },
      key.current,
    );
    inFlight.current = false;
    if (res.ok) {
      trackEvent('generate_lead', { service: v.service });
      setStatus({ kind: 'success', name: v.full_name, service: v.service, city: v.city });
      key.current = newKey();
      reset({ service: defaultService, city: '', message: '' });
    } else {
      setStatus({ kind: 'error', message: res.message, notConfigured: res.reason === 'not-configured' });
    }
  };

  const id = (n: string) => `${uid}-${n}`;
  const field =
    'w-full rounded-lg border bg-white px-4 py-3 text-[15px] text-ink placeholder:text-subtle outline-none transition focus:border-navy-800 focus:ring-4 focus:ring-navy-800/10';
  const border = (bad?: unknown) => (bad ? 'border-red-400' : 'border-line');
  const label = 'mb-1.5 block text-[13px] font-medium text-ink';
  const err = (m?: string) => (m ? <p className="mt-1.5 text-xs text-red-600">{m}</p> : null);

  if (status.kind === 'success') {
    return (
      <div className={`rounded-2xl border border-line bg-white p-7 text-center shadow-card sm:p-9 ${className}`} role="status" aria-live="polite">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50">
          <CheckCircle2 className="h-7 w-7 text-emerald-600" />
        </span>
        <h3 className="mt-5 font-display text-2xl text-ink">Thank you, {status.name.split(' ')[0]}.</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          We have received your enquiry{status.service ? ` about ${status.service}` : ''}. Our team will contact you within working hours ({site.hours}).
        </p>
        <a
          href={whatsappLink(enquiryWhatsappMessage({ full_name: status.name, service: status.service, city: status.city }))}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackEvent('whatsapp_click', { label: 'after-enquiry' })}
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-sm font-medium text-white"
        >
          <WhatsAppGlyph className="h-4 w-4" /> Continue on WhatsApp (optional)
        </a>
        <button type="button" onClick={() => setStatus({ kind: 'idle' })} className="mt-4 block w-full text-sm text-muted underline-offset-4 hover:underline">
          Send another enquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className={`rounded-2xl border border-line bg-white p-6 shadow-card sm:p-8 ${className}`} aria-busy={isSubmitting}>
      <h3 className="font-display text-2xl text-ink">{title}</h3>
      {subtitle && <p className="mt-1.5 text-sm text-muted">{subtitle}</p>}
      <span className="mt-4 block h-px w-12 bg-gold-500" aria-hidden="true" />

      <div className={`mt-6 grid gap-4 ${compact ? '' : 'sm:grid-cols-2'}`}>
        <div>
          <label htmlFor={id('name')} className={label}>
            Full name <span className="text-gold-600">*</span>
          </label>
          <input id={id('name')} autoComplete="name" placeholder="Your full name" aria-invalid={!!errors.full_name} className={`${field} ${border(errors.full_name)}`} {...register('full_name')} />
          {err(errors.full_name?.message)}
        </div>
        <div>
          <label htmlFor={id('mobile')} className={label}>
            Mobile number <span className="text-gold-600">*</span>
          </label>
          <div className="flex">
            <span className="flex items-center rounded-l-lg border border-r-0 border-line bg-ivory px-3 text-sm text-muted">+91</span>
            <input
              id={id('mobile')}
              type="tel"
              inputMode="numeric"
              autoComplete="tel-national"
              placeholder="10-digit mobile"
              aria-invalid={!!errors.mobile}
              className={`${field} ${border(errors.mobile)} rounded-l-none`}
              {...register('mobile')}
            />
          </div>
          {err(errors.mobile?.message)}
        </div>
        <div>
          <label htmlFor={id('email')} className={label}>
            Email address <span className="text-gold-600">*</span>
          </label>
          <input id={id('email')} type="email" autoComplete="email" placeholder="you@example.com" aria-invalid={!!errors.email} className={`${field} ${border(errors.email)}`} {...register('email')} />
          {err(errors.email?.message)}
        </div>
        <div>
          <label htmlFor={id('service')} className={label}>
            Service required <span className="text-gold-600">*</span>
          </label>
          <select id={id('service')} aria-invalid={!!errors.service} className={`${field} ${border(errors.service)} appearance-none bg-[length:16px] bg-[right_1rem_center] bg-no-repeat pr-10`} style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2368717D' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")" }} {...register('service')}>
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
            <option value="Not sure — need guidance">Not sure — need guidance</option>
          </select>
          {err(errors.service?.message)}
        </div>
        {!compact && (
          <>
            <div className="sm:col-span-2">
              <label htmlFor={id('city')} className={label}>
                City <span className="font-normal text-subtle">(optional)</span>
              </label>
              <input id={id('city')} autoComplete="address-level2" placeholder="Your city" className={`${field} ${border()}`} {...register('city')} />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor={id('message')} className={label}>
                Message <span className="font-normal text-subtle">(optional)</span>
              </label>
              <textarea id={id('message')} rows={3} placeholder="Tell us briefly what you need" className={`${field} ${border(errors.message)} resize-none`} {...register('message')} />
              {err(errors.message?.message)}
            </div>
          </>
        )}
        <input type="text" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" {...register('company')} />
      </div>

      <label className="mt-5 flex cursor-pointer items-start gap-3 text-sm text-muted">
        <input type="checkbox" className="mt-0.5 h-4 w-4 shrink-0 rounded border-line accent-navy-800" aria-invalid={!!errors.consent} {...register('consent')} />
        <span>
          I agree to the{' '}
          <Link to="/privacy-policy" className="text-navy-800 underline underline-offset-2">
            Privacy Policy
          </Link>{' '}
          and consent to Regpro contacting me about this enquiry.
        </span>
      </label>
      {err(errors.consent?.message)}

      {status.kind === 'error' && (
        <div className="mt-5 rounded-xl border border-gold-200 bg-gold-50 p-4 text-sm text-ink" role="alert">
          <p className="flex items-start gap-2">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-gold-700" /> {status.message}
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" onClick={() => trackEvent('whatsapp_click', { label: 'form-fallback' })} className="inline-flex items-center gap-1.5 rounded-full bg-[#25D366] px-4 py-2 text-xs font-medium text-white">
              <WhatsAppGlyph className="h-3.5 w-3.5" /> WhatsApp us
            </a>
            <a href={site.phoneHref} onClick={() => trackEvent('phone_click', { label: 'form-fallback' })} className="inline-flex items-center gap-1.5 rounded-full border border-navy-800/20 px-4 py-2 text-xs font-medium text-navy-800">
              <Phone className="h-3.5 w-3.5" /> Call {site.phone}
            </a>
          </div>
        </div>
      )}

      <button type="submit" disabled={isSubmitting} className="btn-navy mt-6 w-full disabled:cursor-wait disabled:opacity-70">
        {isSubmitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" /> Submitting…
          </>
        ) : (
          <>
            Submit enquiry <ArrowRight className="h-4 w-4" />
          </>
        )}
      </button>
      <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-subtle">
        <ShieldCheck className="h-3.5 w-3.5" /> Your details are used only to respond to your enquiry.
      </p>
    </form>
  );
}
