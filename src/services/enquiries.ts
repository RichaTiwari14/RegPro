import { integrations, site } from '@/config/site';

/** Payload sent to the backend. Field names match a typical Django REST Framework serializer. */
export interface Enquiry {
  full_name: string;
  mobile: string;
  email: string;
  service: string;
  city?: string;
  message?: string;
  consent: boolean;
  page: string;
}

export type SubmitResult = { ok: true } | { ok: false; reason: 'not-configured' | 'network' | 'server'; message: string };

export const enquiryEndpoint = () => (integrations.apiBaseUrl ? `${integrations.apiBaseUrl}/api/enquiries/` : '');

/**
 * Posts an enquiry to the configured backend. Success is reported ONLY when the server
 * confirms with a 2xx response — nothing is faked when the API is missing or fails.
 */
export async function submitEnquiry(data: Enquiry, idempotencyKey: string): Promise<SubmitResult> {
  const url = enquiryEndpoint();
  if (!url) {
    return {
      ok: false,
      reason: 'not-configured',
      message: 'Online enquiries are not connected yet. Please reach us on WhatsApp or call — we will respond right away.',
    };
  }
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json', 'Idempotency-Key': idempotencyKey },
      body: JSON.stringify(data),
    });
    if (res.ok) return { ok: true };
    const body = (await res.json().catch(() => ({}))) as { detail?: string };
    return { ok: false, reason: 'server', message: body.detail || 'We could not submit your enquiry. Please try again or WhatsApp us.' };
  } catch {
    return { ok: false, reason: 'network', message: 'Network error — please check your connection, or reach us on WhatsApp.' };
  }
}

export const enquiryWhatsappMessage = (e: Pick<Enquiry, 'full_name' | 'service' | 'city'>) =>
  [`Hi ${site.name}, I just sent an enquiry on your website.`, `Name: ${e.full_name}`, `Service: ${e.service || 'Not sure yet'}`, e.city ? `City: ${e.city}` : '']
    .filter(Boolean)
    .join('\n');
