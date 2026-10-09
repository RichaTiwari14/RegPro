/** General FAQs shown on the home page and the FAQs page. Service-specific FAQs live in services.ts. */
export interface Faq {
  q: string;
  a: string;
}

export const generalFaqs: Faq[] = [
  {
    q: 'How does Regpro work?',
    a: 'Share your requirement on WhatsApp, call or the enquiry form. An expert confirms what you need, shares a document checklist and a fixed quote. Once you share the documents, we prepare, file and track your application until it is approved.',
  },
  {
    q: 'Do I need to visit any office?',
    a: 'No. The entire process is online. You can share documents on WhatsApp or email, and approvals are done digitally.',
  },
  {
    q: 'Are government fees included in your prices?',
    a: 'Our prices are our professional fees. Government or statutory fees, where applicable, are extra and shown to you upfront before you pay.',
  },
  {
    q: 'How long will my registration take?',
    a: 'Timelines depend on the service and government processing. Each service page shows an estimated processing time, and we keep you updated at every step.',
  },
  {
    q: 'Is my data safe with Regpro?',
    a: 'Yes. Your documents are used only for your application and are never shared with anyone other than the relevant government authority.',
  },
  {
    q: 'Which cities do you serve?',
    a: 'We are based in Bengaluru and serve businesses across India, since every service is handled online.',
  },
  {
    q: 'What payment methods do you accept?',
    a: 'We accept UPI, bank transfer and cards. You receive a proper invoice for every payment.',
  },
  {
    q: 'Will you help with compliance after registration?',
    a: 'Yes. We can help with GST returns, annual filings and other compliances so your business stays on the right side of the law.',
  },
];
