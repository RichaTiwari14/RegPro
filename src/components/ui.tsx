import type { ReactNode } from 'react';
import { Phone } from 'lucide-react';
import { motion } from 'motion/react';
import { MaskedWords } from '@/components/Reveal';
import { site, whatsappLink } from '@/config/site';
import { trackEvent } from '@/lib/analytics';
import { formatPrice } from '@/data/services';

export function Container({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-site px-5 sm:px-6 lg:px-8 ${className}`}>{children}</div>;
}

export function Eyebrow({ children, light = false, rule = true }: { children: ReactNode; light?: boolean; rule?: boolean }) {
  return (
    <motion.span
      className={`eyebrow ${rule ? 'eyebrow-rule' : ''} ${light ? '!bg-white/10 !text-white !ring-white/15' : ''}`}
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  text,
  center = false,
  light = false,
  highlight = [],
  as: Tag = 'h2',
}: {
  eyebrow?: string;
  title: ReactNode;
  text?: ReactNode;
  center?: boolean;
  light?: boolean;
  /** Words in `title` set in champagne gold. */
  highlight?: string[];
  as?: 'h1' | 'h2';
}) {
  return (
    <div className={`max-w-3xl ${center ? 'mx-auto text-center' : ''}`}>
      {eyebrow && <Eyebrow light={light} rule={!center}>{eyebrow}</Eyebrow>}
      <Tag className={`heading mt-4 ${light ? '!text-white' : ''}`} style={{ fontSize: Tag === 'h1' ? 'clamp(2.4rem,5vw,4rem)' : 'clamp(1.9rem,3.4vw,2.9rem)' }}>
        {typeof title === 'string' ? <MaskedWords text={title} delay={80} highlight={highlight} /> : title}
      </Tag>
      {text && (
        <motion.p
          className={`mt-4 text-base leading-relaxed ${light ? 'text-white/70' : 'text-muted'} ${center ? 'mx-auto max-w-2xl' : 'max-w-2xl'}`}
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '0px 0px -10% 0px' }}
          transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
        >
          {text}
        </motion.p>
      )}
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
const sizes: Record<BtnSize, string> = { md: '', lg: '!px-7 !py-3.5 !text-[15px]' };

export function WhatsAppButton({
  message,
  label = 'WhatsApp an Expert',
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
      onClick={() => trackEvent('whatsapp_click', { label: source })}
      className={`btn-whatsapp ${sizes[size]} ${className}`}
    >
      <WhatsAppGlyph className="h-4 w-4" />
      {label}
    </a>
  );
}

export function CallButton({
  label = 'Call us',
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
  const style = { outline: 'btn-outline', light: 'btn-outline-light', navy: 'btn-primary' }[variant];
  return (
    <a href={site.phoneHref} onClick={() => trackEvent('phone_click', { label: source })} className={`${style} ${sizes[size]} ${className}`}>
      <Phone className="h-4 w-4" />
      {label}
    </a>
  );
}

export function PriceTag({ price, quote = false, light = false, className = '' }: { price: number; quote?: boolean; light?: boolean; className?: string }) {
  return (
    <div className={className}>
      <span className={`text-xs uppercase tracking-[0.14em] ${light ? 'text-white/55' : 'text-subtle'}`}>Starting at</span>
      <div className={`font-display text-3xl ${light ? 'text-white' : 'text-forest-800'}`}>
        {formatPrice(price)}
        <span className={`ml-0.5 align-super text-sm ${light ? 'text-sage-300' : 'text-forest-500'}`}>*</span>
      </div>
      {quote && <span className={`text-xs ${light ? 'text-white/55' : 'text-subtle'}`}>Final quote depends on your requirement</span>}
    </div>
  );
}

export function FeeNote({ light = false, className = '' }: { light?: boolean; className?: string }) {
  return (
    <p className={`text-xs leading-relaxed ${light ? 'text-white/55' : 'text-subtle'} ${className}`}>
      * Regpro&rsquo;s professional fee. {site.feeNote} Third-party charges, where applicable, are extra.
    </p>
  );
}
