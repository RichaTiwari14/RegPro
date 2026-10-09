import { integrations, site, whatsappLink } from '@/config/site';

export interface Lead {
  name: string;
  phone: string;
  email: string;
  service: string;
  city: string;
  message: string;
  page: string;
}

export const leadWhatsappMessage = (l: Lead) =>
  [
    `Hi ${site.name}, I just submitted an enquiry.`,
    `Name: ${l.name}`,
    `Service: ${l.service || 'Not sure yet'}`,
    l.city ? `City: ${l.city}` : '',
    l.message ? `Message: ${l.message}` : '',
  ]
    .filter(Boolean)
    .join('\n');

/**
 * Sends the enquiry to the business email via Web3Forms.
 * Returns 'sent', 'whatsapp' (no email key configured — caller should open WhatsApp), or throws.
 */
export async function submitLead(lead: Lead): Promise<'sent' | 'whatsapp'> {
  if (!integrations.web3formsKey) return 'whatsapp';

  const res = await fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      access_key: integrations.web3formsKey,
      subject: `New enquiry: ${lead.service || 'General'} — ${lead.name}`,
      from_name: `${site.name} Website`,
      ...lead,
    }),
  });
  const json = (await res.json().catch(() => ({}))) as { success?: boolean };
  if (!res.ok || !json.success) throw new Error('Submission failed');
  return 'sent';
}

export { whatsappLink };
