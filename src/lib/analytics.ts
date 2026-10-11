import { integrations } from '@/config/site';

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: ((...args: unknown[]) => void) & { callMethod?: unknown; queue?: unknown[]; loaded?: boolean; version?: string; push?: unknown };
    _fbq?: unknown;
  }
}

export type AnalyticsEvent = 'generate_lead' | 'contact_click' | 'whatsapp_click' | 'phone_click' | 'view_service' | 'view_pricing';

const CONSENT_KEY = 'rp-consent';
export type Consent = 'granted' | 'denied' | null;

export const analyticsConfigured = () => Boolean(integrations.gaId || integrations.metaPixelId);

export function getConsent(): Consent {
  try {
    const v = localStorage.getItem(CONSENT_KEY);
    return v === 'granted' || v === 'denied' ? v : null;
  } catch {
    return null;
  }
}

export function setConsent(value: 'granted' | 'denied') {
  try {
    localStorage.setItem(CONSENT_KEY, value);
  } catch {
    /* storage blocked — treat as session-only */
  }
  if (value === 'granted') initAnalytics();
}

let started = false;

function loadScript(src: string) {
  const s = document.createElement('script');
  s.async = true;
  s.src = src;
  document.head.appendChild(s);
}

/** Loads GA4 and Meta Pixel — only when an ID is configured AND the visitor has consented. */
export function initAnalytics() {
  if (started || typeof window === 'undefined' || getConsent() !== 'granted') return;
  const { gaId, metaPixelId } = integrations;
  if (!gaId && !metaPixelId) return;
  started = true;

  if (gaId) {
    loadScript(`https://www.googletagmanager.com/gtag/js?id=${gaId}`);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() {
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer!.push(arguments);
    };
    window.gtag('js', new Date());
    window.gtag('config', gaId, { send_page_view: false });
  }

  if (metaPixelId) {
    const fbq = function (...args: unknown[]) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const f = fbq as any;
      if (f.callMethod) f.callMethod(...args);
      else f.queue.push(args);
    } as NonNullable<Window['fbq']>;
    fbq.push = fbq;
    fbq.loaded = true;
    fbq.version = '2.0';
    fbq.queue = [];
    window.fbq = fbq;
    window._fbq = fbq;
    loadScript('https://connect.facebook.net/en_US/fbevents.js');
    window.fbq('init', metaPixelId);
  }
  trackPageView(window.location.pathname);
}

let lastPage = '';
export function trackPageView(path: string) {
  if (!started || path === lastPage) return;
  lastPage = path;
  window.gtag?.('event', 'page_view', { page_path: path, page_location: window.location.href });
  window.fbq?.('track', 'PageView');
}

const pixelMap: Partial<Record<AnalyticsEvent, string>> = {
  generate_lead: 'Lead',
  contact_click: 'Contact',
  whatsapp_click: 'Contact',
  phone_click: 'Contact',
  view_service: 'ViewContent',
  view_pricing: 'ViewContent',
};

const recent = new Map<string, number>();

/** Sends one event to GA4 and Meta Pixel. Identical events within 1.5 s are dropped (double clicks, StrictMode). */
export function trackEvent(name: AnalyticsEvent, params: Record<string, string> = {}) {
  if (!started) return;
  const key = `${name}:${JSON.stringify(params)}`;
  const now = Date.now();
  if (now - (recent.get(key) ?? 0) < 1500) return;
  recent.set(key, now);
  window.gtag?.('event', name, params);
  const px = pixelMap[name];
  if (px) window.fbq?.('track', px, { content_name: params.label || params.service || name });
}

/** Back-compat helper used by buttons: 'contact' labels starting with whatsapp:/call: map to the right event. */
export function trackConversion(kind: 'lead' | 'contact', label: string) {
  if (kind === 'lead') return trackEvent('generate_lead', { service: label });
  if (label.startsWith('whatsapp')) return trackEvent('whatsapp_click', { label });
  if (label.startsWith('call')) return trackEvent('phone_click', { label });
  trackEvent('contact_click', { label });
}
