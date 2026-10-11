/** General FAQs (home page + FAQs page). Service-specific FAQs live in services.ts. */
export interface Faq {
  q: string;
  a: string;
}

export const faqGroups: { id: string; title: string; faqs: Faq[] }[] = [
  {
    id: 'getting-started',
    title: 'Getting started',
    faqs: [
      {
        q: 'How do I choose the right registration for my business?',
        a: 'It depends on what you do, who owns the business and your plans for growth or funding. Share a few details with us and an expert will explain the options — for example, Private Limited, LLP or OPC — and what each involves.',
      },
      {
        q: 'How does the Regpro process work?',
        a: 'Choose a service or tell us your requirement, share your details, and we confirm the documents needed and the fee. Our team then prepares and files the application and keeps you updated until the authority decides on it.',
      },
      {
        q: 'Do I need to visit an office?',
        a: 'Most services we assist with can be completed online. If an authority requires physical verification or an in-person step, we will tell you in advance.',
      },
    ],
  },
  {
    id: 'documents',
    title: 'Documents',
    faqs: [
      {
        q: 'What documents will I need?',
        a: 'It varies by service. Commonly needed documents include PAN, Aadhaar, photographs, proof of business address and bank details. Each service page lists the typical documents, and we share a personalised checklist.',
      },
      {
        q: 'How do I share my documents?',
        a: 'We will tell you the secure way to share documents once your enquiry is confirmed. Documents are used only for your application.',
      },
    ],
  },
  {
    id: 'pricing',
    title: 'Pricing & fees',
    faqs: [
      {
        q: 'What does the price on the website include?',
        a: 'The price shown is Regpro’s starting professional fee. The exact inclusions are listed on each service page, and the final quote is confirmed before you pay.',
      },
      {
        q: 'Are government fees included?',
        a: 'No. Government or statutory fees, and any third-party charges, are extra where applicable. We tell you about them upfront.',
      },
    ],
  },
  {
    id: 'timelines',
    title: 'Timelines & approvals',
    faqs: [
      {
        q: 'How long will my registration take?',
        a: 'Each service page shows a typical timeline. Actual processing depends on the government authority, document verification and any queries raised, so timelines cannot be guaranteed.',
      },
      {
        q: 'Can you guarantee approval?',
        a: 'No. Approvals are decided by the relevant government authority. We help you prepare a complete and accurate application and respond to any queries.',
      },
      {
        q: 'Is Regpro a government agency?',
        a: 'No. Regpro is a private professional services firm that assists with registrations and compliance. We are not affiliated with any government department.',
      },
    ],
  },
];

export const generalFaqs: Faq[] = faqGroups.flatMap((g) => g.faqs);
