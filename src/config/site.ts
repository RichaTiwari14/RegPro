/**
 * Central business details. Update phone, email, address and links here —
 * every page, button and SEO tag reads from this file.
 */
export const site = {
  name: 'Regpro',
  legalName: 'Regpro',
  tagline: 'Register. Comply. Grow.',
  url: 'https://regpro.in',
  description:
    'Regpro helps startups, entrepreneurs and small businesses in India with company registration, GST, MSME/Udyam, DPIIT, FSSAI, IEC, trademark and compliance — 100% online, with transparent pricing.',

  phone: '+91 96060 30573',
  phoneHref: 'tel:+919606030573',
  whatsappNumber: '919606030573',
  // TODO (client): confirm the business email address before launch.
  email: 'hello@regpro.in',
  // TODO (client): add the full registered office address once verified. Only the city is shown until then.
  address: 'Bengaluru, Karnataka, India',
  /** Full street address — leave empty until verified; the map and address schema stay hidden while empty. */
  streetAddress: '',
  city: 'Bengaluru',
  hours: 'Mon – Sat, 10:00 AM – 7:00 PM',

  social: {
    instagram: '',
    linkedin: '',
    facebook: '',
  },

  /** Shown under every price. */
  feeNote: 'Government / statutory fees, if applicable, are extra.',
};

export const whatsappLink = (message = 'Hi Regpro, I would like to know more about your services.') =>
  `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`;

/**
 * Environment-based configuration (see .env.example). Never put secret keys here — everything
 * prefixed VITE_ ends up in the public JavaScript bundle.
 *  VITE_API_BASE_URL   – base URL of the backend that receives enquiries (POST /api/enquiries/).
 *  VITE_GA_ID          – Google Analytics 4 measurement ID (G-XXXXXXX). Leave empty to disable.
 *  VITE_META_PIXEL_ID  – Meta Pixel ID. Leave empty to disable.
 */
export const integrations = {
  apiBaseUrl: (import.meta.env.VITE_API_BASE_URL as string | undefined)?.replace(/\/$/, '') || '',
  gaId: import.meta.env.VITE_GA_ID as string | undefined,
  metaPixelId: import.meta.env.VITE_META_PIXEL_ID as string | undefined,
};

/** Show draft resources (articles awaiting review). Drafts are always excluded from the sitemap. */
export const showDraftContent = true;
