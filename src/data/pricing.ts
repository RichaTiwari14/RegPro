export interface PricingCard {
  slug: string;
  name: string;
  category: 'Business Registration' | 'Government Registration' | 'Other Services';
  startingPrice: string;
  priceNote: string;
  turnaround: string;
  popular?: boolean;
  features: string[];
  statutoryFeeText: string;
}

export const pricingDisclaimer = "Prices are starting estimates. Government and statutory fees, where applicable, are charged separately.";

export const pricingData: PricingCard[] = [
  // Business Registrations
  {
    slug: 'private-limited-company-registration',
    name: 'Private Limited Company',
    category: 'Business Registration',
    startingPrice: '₹9,999',
    priceNote: 'Professional fee',
    turnaround: '7-10 Working Days',
    popular: true,
    features: [
      '2 Director DIN & Class 3 DSC included',
      'Name Approval (RUN) reservation',
      'MOA & AOA customized drafting',
      'SPICe+ Part A & Part B MCA filing',
      'Company PAN, TAN & Bank A/C assistance',
      'PF, ESIC & Professional Tax registration'
    ],
    statutoryFeeText: 'ROC filing fee and state stamp duty extra as applicable.'
  },
  {
    slug: 'llp-registration',
    name: 'LLP Registration',
    category: 'Business Registration',
    startingPrice: '₹8,999',
    priceNote: 'Professional fee',
    turnaround: '7-10 Working Days',
    features: [
      '2 Designated Partner DSCs',
      'Name reservation via RUN-LLP',
      'FiLLiP incorporation filing',
      'Customized LLP Agreement drafting',
      'Filing Form 3 with ROC',
      'LLP PAN & TAN generation'
    ],
    statutoryFeeText: 'State stamp duty for agreement extra.'
  },
  {
    slug: 'opc-registration',
    name: 'One Person Company (OPC)',
    category: 'Business Registration',
    startingPrice: '₹8,999',
    priceNote: 'Professional fee',
    turnaround: '7-10 Working Days',
    features: [
      '1 Founder DSC & DIN',
      'Nominee consent legal documentation',
      'Name reservation with MCA',
      'SPICe+ incorporation submission',
      'PAN, TAN & incorporation certificate'
    ],
    statutoryFeeText: 'Government stamp duty based on state.'
  },
  {
    slug: 'partnership-firm-registration',
    name: 'Partnership Firm',
    category: 'Business Registration',
    startingPrice: '₹6,999',
    priceNote: 'Professional fee',
    turnaround: '5-7 Working Days',
    features: [
      'Comprehensive Partnership Deed drafting',
      'Stamp paper & notary guidance',
      'Registrar of Firms (ROF) application',
      'Partnership PAN application',
      'Bank current account resolution'
    ],
    statutoryFeeText: 'Stamp duty and ROF fees extra.'
  },

  // Government Registrations
  {
    slug: 'gst-registration',
    name: 'GST Registration',
    category: 'Government Registration',
    startingPrice: '₹2,999',
    priceNote: 'All-inclusive expert fee',
    turnaround: '3-7 Working Days',
    popular: true,
    features: [
      '100% online application filing',
      'HSN / SAC classification guidance',
      'Aadhaar biometric / OTP authentication',
      'Dedicated handling of officer clarifications (REG-03/04)',
      'GSTIN Certificate issuance (REG-06)'
    ],
    statutoryFeeText: 'Nil government charges.'
  },
  {
    slug: 'udyam-msme-registration',
    name: 'Udyam / MSME Registration',
    category: 'Government Registration',
    startingPrice: '₹1,999',
    priceNote: 'All-inclusive expert fee',
    turnaround: '1-2 Working Days',
    features: [
      'NIC 4-digit / 5-digit classification',
      'Udyam portal digital filing',
      'Priority sector loan qualification',
      '50% discount on trademark fees unlocked',
      'Lifetime certificate with QR code'
    ],
    statutoryFeeText: 'Nil government charges.'
  },
  {
    slug: 'dpiit-startup-india-recognition',
    name: 'DPIIT / Startup India',
    category: 'Government Registration',
    startingPrice: '₹2,999',
    priceNote: 'Professional fee',
    turnaround: '5-7 Working Days',
    features: [
      'Eligibility & innovation assessment',
      'Pitch brief & application dossier drafting',
      'National Startup Portal filing',
      '80-IAC tax holiday assistance',
      'Official DIPP certificate delivery'
    ],
    statutoryFeeText: 'Nil government charges.'
  },
  {
    slug: 'fssai-registration',
    name: 'FSSAI Food License',
    category: 'Government Registration',
    startingPrice: '₹4,999',
    priceNote: 'Consultancy fee',
    turnaround: '5-10 Working Days',
    features: [
      'Basic / State license determination',
      'FoSCoS portal application filing',
      'Food category mapping & safety documentation',
      'Officer query liaison',
      'Official 14-digit FSSAI number'
    ],
    statutoryFeeText: 'Statutory FSSAI fee extra based on tier.'
  },
  {
    slug: 'gst-amendment',
    name: 'GST Amendment',
    category: 'Government Registration',
    startingPrice: '₹1,999',
    priceNote: 'Professional fee',
    turnaround: '3-5 Working Days',
    features: [
      'Address change or branch addition',
      'Core & non-core fields update',
      'Form GST REG-14 filing',
      'Revised GST certificate generation'
    ],
    statutoryFeeText: 'Nil government charges.'
  },
  {
    slug: 'gst-cancellation',
    name: 'GST Cancellation',
    category: 'Government Registration',
    startingPrice: '₹2,499',
    priceNote: 'Professional fee',
    turnaround: '7-14 Working Days',
    features: [
      'Filing Form GST REG-16 surrender',
      'Review of pending returns',
      'ITC reversal calculation assistance',
      'GSTR-10 final return filing guidance'
    ],
    statutoryFeeText: 'Statutory tax dues extra if any.'
  },
  {
    slug: 'iec-registration',
    name: 'IEC Registration (DGFT)',
    category: 'Government Registration',
    startingPrice: '₹2,499',
    priceNote: 'Professional fee',
    turnaround: '1-3 Working Days',
    features: [
      'DGFT digital profile creation',
      'ANF 2A electronic filing',
      'Bank verification assistance',
      'Lifetime IEC certificate issuance'
    ],
    statutoryFeeText: 'DGFT statutory fee ₹500 extra.'
  },
  {
    slug: 'shop-and-establishment-registration',
    name: 'Shop & Establishment',
    category: 'Government Registration',
    startingPrice: '₹2,499',
    priceNote: 'Professional fee',
    turnaround: '3-5 Working Days',
    features: [
      'State labor department filing',
      'Documentation review for premises',
      'Essential for commercial bank account',
      'Labor compliance certificate delivery'
    ],
    statutoryFeeText: 'State treasury fee extra.'
  },
  {
    slug: 'digital-signature-certificate-dsc',
    name: 'Class 3 DSC (with USB Token)',
    category: 'Government Registration',
    startingPrice: '₹1,999',
    priceNote: 'Inclusive of physical token',
    turnaround: 'Same Day / 24 Hours',
    features: [
      'Class 3 Signing certificate (2 Years)',
      'FIPS-compliant cryptographic USB e-token',
      'Paperless paperless video e-KYC',
      'Valid for MCA, GST, Income Tax & Tenders'
    ],
    statutoryFeeText: 'Courier delivery included.'
  },
  {
    slug: 'pan-tan',
    name: 'PAN / TAN Registration',
    category: 'Government Registration',
    startingPrice: '₹1,499',
    priceNote: 'Professional fee',
    turnaround: '2-4 Working Days',
    features: [
      'Form 49A / 49B submission',
      'NSDL / UTI processing',
      'TDS deduction compliance',
      'Digital e-PAN / TAN generation'
    ],
    statutoryFeeText: 'NSDL processing fee extra.'
  },

  // Other Services
  {
    slug: 'trademark-registration',
    name: 'Trademark Registration',
    category: 'Other Services',
    startingPrice: '₹4,999',
    priceNote: 'Attorney & filing fee',
    turnaround: '24-48 Hours (Filing)',
    popular: true,
    features: [
      'Pre-filing trademark conflict search',
      'Appropriate Nice class identification',
      'Form TM-A filing on IP India',
      'Immediate legal use of ™ symbol',
      'Objection monitoring & advice'
    ],
    statutoryFeeText: 'Govt fee ₹4,500 (MSME) or ₹9,000 (others) extra.'
  }
];

