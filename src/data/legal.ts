/**
 * DRAFT legal content — editable starting point only. It is NOT legal advice and is not
 * guaranteed to be compliant. Sections marked `review: true` contain business-specific terms
 * the client and their legal advisor must confirm before publication.
 */
import { site } from '@/config/site';

export interface LegalSection {
  id: string;
  h: string;
  p: string[];
  review?: boolean;
}

export const legalUpdated = 'Draft — October 2026';

export const privacy: LegalSection[] = [
  {
    id: 'information-we-collect',
    h: 'Information we collect',
    p: [
      'Information you provide: your name, mobile number, email address, city, the service you are interested in and any message you send through our forms, WhatsApp, phone or email.',
      'Documents you share so that we can assist with an application, such as identity, address and business documents.',
      'Usage information: if you accept analytics cookies, we collect information about how you use this website (pages visited, device and browser type) through Google Analytics and Meta Pixel.',
    ],
  },
  {
    id: 'purpose',
    h: 'Why we use your information',
    p: ['To respond to your enquiry, provide the services you request, prepare and file applications with the relevant authorities, and keep you updated.', 'To improve our website and services, where you have consented to analytics.'],
  },
  {
    id: 'sharing',
    h: 'Sharing of information',
    p: [
      'We do not sell your personal information.',
      'We share information only where needed to deliver the service — for example with the government portal or authority processing your application, Certifying Authorities for DSCs, and service providers that host our systems or send email on our behalf.',
    ],
    review: true,
  },
  {
    id: 'retention',
    h: 'Data retention',
    p: ['We keep your information only as long as needed for the purposes above and to meet legal, accounting or record-keeping requirements. [Client to confirm retention periods.]'],
    review: true,
  },
  {
    id: 'cookies',
    h: 'Cookies and analytics',
    p: [
      'Analytics tools (Google Analytics 4 and Meta Pixel) are loaded only after you accept analytics cookies in the banner. You can change your choice by clearing this site’s data in your browser.',
      'Essential browser storage may be used to remember your cookie choice.',
    ],
  },
  {
    id: 'security',
    h: 'Data security',
    p: ['We take reasonable technical and organisational measures to protect your information. No method of transmission or storage is completely secure.'],
  },
  {
    id: 'your-rights',
    h: 'Your rights',
    p: [`You may ask to access, correct or delete your personal information, or withdraw consent, by writing to ${site.email}. We will respond in line with applicable law, including the Digital Personal Data Protection Act, 2023 once in force.`],
    review: true,
  },
  {
    id: 'contact',
    h: 'Contact',
    p: [`For privacy questions, contact ${site.legalName} at ${site.email} or ${site.phone}. [Client to add grievance officer details if required.]`],
    review: true,
  },
  { id: 'changes', h: 'Changes to this policy', p: ['We may update this policy from time to time. The latest version will always be available on this page.'] },
];

export const terms: LegalSection[] = [
  {
    id: 'service-scope',
    h: 'Our services',
    p: [
      `${site.name} provides professional assistance with business registrations, government documentation and compliance. We prepare applications and assist with filing; decisions on applications are made by the relevant authorities.`,
      `${site.name} is a private firm and is not affiliated with, or endorsed by, any government department.`,
    ],
  },
  {
    id: 'fees',
    h: 'Fees and payments',
    p: [
      `Prices on this website are starting professional fees. ${site.feeNote} Third-party charges, where applicable, are extra. Your final fee is confirmed before you pay.`,
      '[Client to confirm accepted payment methods and invoicing terms.]',
    ],
    review: true,
  },
  {
    id: 'refunds',
    h: 'Cancellations and refunds',
    p: ['Government and statutory fees, once paid, are generally not refundable. [Client to define the refund policy for professional fees, for example based on work completed.]'],
    review: true,
  },
  {
    id: 'approvals',
    h: 'Government approvals and timelines',
    p: [
      'Approval, rejection, objections and processing times are decided by the relevant authority. Timelines shown on this website are estimates and are not guaranteed.',
      'Delays may result from portal issues, queries, objections, inspections or changes in law outside our control.',
    ],
  },
  {
    id: 'responsibilities',
    h: 'Your responsibilities',
    p: ['You agree to provide accurate, complete and genuine information and documents, and to respond to requests in a timely manner. We are not responsible for outcomes caused by incorrect or incomplete information.'],
  },
  {
    id: 'liability',
    h: 'Limitation of liability',
    p: ['[Client and legal advisor to confirm.] To the extent permitted by law, our liability for any claim relating to a service is limited to the professional fee paid for that service.'],
    review: true,
  },
  {
    id: 'information-only',
    h: 'Website content',
    p: ['Content on this website, including articles and FAQs, is general information and not legal, tax or financial advice.'],
  },
  {
    id: 'law',
    h: 'Governing law',
    p: ['These terms are governed by the laws of India. [Client to confirm jurisdiction, e.g. courts at Bengaluru, Karnataka.]'],
    review: true,
  },
  { id: 'changes', h: 'Changes to these terms', p: ['We may update these terms from time to time. The latest version will always be available on this page.'] },
];
