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
  // TODO: replace with the client's final email address.
  email: 'hello@regpro.in',
  // TODO: replace with the client's registered office address.
  address: 'Bengaluru, Karnataka, India',
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
 * Third-party keys come from environment variables (set them in Vercel → Project → Settings → Environment Variables).
 *  VITE_WEB3FORMS_KEY  – Web3Forms access key; enquiries are emailed to the address registered with it.
 *  VITE_GA_ID          – Google Analytics 4 measurement ID (G-XXXXXXX).
 *  VITE_META_PIXEL_ID  – Meta Pixel ID.
 */
export const integrations = {
  web3formsKey: import.meta.env.VITE_WEB3FORMS_KEY as string | undefined,
  gaId: import.meta.env.VITE_GA_ID as string | undefined,
  metaPixelId: import.meta.env.VITE_META_PIXEL_ID as string | undefined,
};
