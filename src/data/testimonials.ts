/**
 * TODO: these are placeholder testimonials for the design review.
 * Replace them with genuine customer reviews before the site goes live.
 */
export interface Testimonial {
  name: string;
  role: string;
  service: string;
  quote: string;
  rating: number;
}

export const testimonials: Testimonial[] = [
  {
    name: 'Ananya R.',
    role: 'Founder, D2C skincare brand',
    service: 'Private Limited Company',
    quote:
      'They explained every step on WhatsApp and kept me updated till the incorporation certificate arrived. No running around, no surprises in the bill.',
    rating: 5,
  },
  {
    name: 'Mohammed S.',
    role: 'Owner, cloud kitchen',
    service: 'FSSAI & GST',
    quote:
      'Got my FSSAI licence and GST done together. The document checklist they shared upfront saved a lot of back and forth.',
    rating: 5,
  },
  {
    name: 'Karthik V.',
    role: 'Co-founder, SaaS startup',
    service: 'DPIIT Recognition',
    quote:
      'The team helped us prepare the innovation write-up for DPIIT properly. Very clear about what the government fee was and what their fee was.',
    rating: 5,
  },
  {
    name: 'Priya M.',
    role: 'Freelance designer',
    service: 'Udyam Registration',
    quote: 'Quick and simple. Shared my Aadhaar and PAN details and had the Udyam certificate the same day.',
    rating: 5,
  },
  {
    name: 'Rahul & Neha',
    role: 'Partners, export business',
    service: 'LLP & IEC',
    quote:
      'We registered our LLP and IEC with Regpro. Responsive team, transparent pricing and they followed up with every department for us.',
    rating: 5,
  },
  {
    name: 'Sandeep K.',
    role: 'Retail store owner',
    service: 'Shop & Establishment',
    quote: 'Polite, patient and professional. They also reminded me about the GST filing I had missed.',
    rating: 5,
  },
];
