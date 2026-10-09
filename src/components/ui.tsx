import type { ReactNode } from 'react';
import { ArrowRight, Phone } from 'lucide-react';
import { site, whatsappLink } from '@/config/site';
import { trackConversion } from '@/lib/analytics';
import { formatPrice } from '@/data/services';

export function Container({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8 ${className}`}>{children}</div>;
}

export function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <span className={`label-cine inline-flex items-center gap-3 ${light ? 'text-gold-300' : 'text-gold-700'}`}>
      <span className={`h-px w-8 ${light ? 'bg-gold-400' : 'bg-gold-500'}`} />
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  text,
  center = false,
  light = false,
}: {
  eyebrow?: string;
  title: ReactNode;
  text?: ReactNode;
  center?: boolean;
  light?: boolean;
}) {
  return (
    <div className={`max-w-3xl ${center ? 'mx-auto text-center' : ''}`}>
      {eyebrow && <Eyebrow light={light}>{eyebrow}</Eyebrow>}
      <h2
        className={`heading-cine mt-5 ${light ? 'text-white' : 'text-navy-800'}`}
        style={{ fontSize: 'clamp(2rem,3.8vw,3.4rem)' }}
      >
        {title}
      </h2>
      {text && <p className={`mt-5 text-base leading-relaxed sm:text-lg ${light ? 'text-white/65' : 'text-ink/65'}`}>{text}</p>}
    </div>
  );
}

export function WhatsAppGlyph({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.79-1.47-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.75-.72 2-1.41.25-.69.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35M12.05 21.5h-.01a9.43 9.43 0 0 1-4.8-1.32l-.35-.2-3.57.94.95-3.48-.22-.36a9.4 9.4 0 0 1-1.44-5.02c0-5.2 4.24-9.44 9.45-9.44 2.52 0 4.89.99 6.67 2.77a9.37 9.37 0 0 1 2.76 6.68c0 5.2-4.24 9.43-9.44 9.43M20.08 3.9A11.32 11.32 0 0 0 12.05.58C5.79.58.7 5.67.7 11.92c0 2 .52 3.95 1.52 5.67L.6 23.5l6.05-1.59a11.3 11.3 0 0 0 5.4 1.38h.01c6.25 0 11.34-5.09 11.35-11.35 0-3.03-1.18-5.88-3.33-8.03" />
    </svg>
  );
}

type BtnSize = 'md' | 'lg';
const sizes: Record<BtnSize, string> = {
  md: 'px-5 py-3 text-sm',
  lg: 'px-7 py-4 text-[15px]',
};

export function WhatsAppButton({
  message,
  label = 'Chat on WhatsApp',
  size = 'md',
  className = '',
  source = 'button',
}: {
  message?: string;
  label?: string;
  size?: BtnSize;
  className?: string;
  source?: string;
}) {
  return (
    <a
      href={whatsappLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackConversion('contact', `whatsapp:${source}`)}
      className={`group inline-flex items-center justify-center gap-2.5 rounded-full bg-[#25D366] font-medium tracking-tight text-white shadow-lg shadow-[#25D366]/25 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#1fbe5a] hover:shadow-xl hover:shadow-[#25D366]/30 ${sizes[size]} ${className}`}
    >
      <WhatsAppGlyph className="h-4 w-4" />
      {label}
    </a>
  );
}

export function CallButton({
  label = 'Call now',
  size = 'md',
  variant = 'outline',
  className = '',
  source = 'button',
}: {
  label?: string;
  size?: BtnSize;
  variant?: 'outline' | 'light' | 'navy';
  className?: string;
  source?: string;
}) {
  const styles = {
    outline: 'border border-navy-800/30 bg-white/50 text-navy-800 hover:border-navy-800',
    light: 'border border-white/35 bg-white/10 text-white hover:border-white',
    navy: 'bg-navy-800 text-white hover:bg-navy-900',
  }[variant];
  return (
    <a
      href={site.phoneHref}
      onClick={() => trackConversion('contact', `call:${source}`)}
      className={`inline-flex items-center justify-center gap-2.5 rounded-full font-medium tracking-tight transition-all duration-300 hover:-translate-y-0.5 ${styles} ${sizes[size]} ${className}`}
    >
      <Phone className="h-3.5 w-3.5" />
      {label}
    </a>
  );
}

export function PriceTag({ price, light = false, className = '' }: { price: number; light?: boolean; className?: string }) {
  return (
    <div className={className}>
      <span className={`text-[13px] ${light ? 'text-white/60' : 'text-ink/50'}`}>Starting at</span>
      <div className={`font-display text-2xl font-light ${light ? 'text-white' : 'text-navy-800'}`}>
        {formatPrice(price)}
        <span className={`ml-1 align-super text-xs font-semibold ${light ? 'text-gold-300' : 'text-gold-600'}`}>*</span>
      </div>
    </div>
  );
}

export function FeeNote({ light = false, className = '' }: { light?: boolean; className?: string }) {
  return (
    <p className={`text-xs ${light ? 'text-white/55' : 'text-ink/55'} ${className}`}>
      * Professional fee. {site.feeNote}
    </p>
  );
}

/** Outline circle with an arrow — the landing page's signature control. */
export function CircleArrow({
  icon: Icon = ArrowRight,
  light = false,
  size = 'md',
  className = '',
}: {
  icon?: typeof ArrowRight;
  light?: boolean;
  size?: 'sm' | 'md';
  className?: string;
}) {
  return (
    <span
      className={`flex shrink-0 items-center justify-center rounded-full border transition-all duration-500 ${
        size === 'sm' ? 'h-10 w-10' : 'h-12 w-12'
      } ${light ? 'border-white/40 text-white' : 'border-navy-800/30 text-navy-800'} ${className}`}
    >
      <Icon size={size === 'sm' ? 16 : 18} />
    </span>
  );
}
