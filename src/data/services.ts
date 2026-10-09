/**
 * All services, prices and service-page content live here.
 * To change a price, edit `price` (a number in ₹). To add a service, copy an entry,
 * give it a unique `slug`, and it automatically gets a page, menu link and sitemap entry.
 *
 * TODO: prices below are indicative placeholders — replace with the client's final pricing.
 */

export type CategoryId = 'business' | 'government' | 'other';

export interface Category {
  id: CategoryId;
  title: string;
  short: string;
  description: string;
}

export interface Service {
  slug: string;
  category: CategoryId;
  name: string;
  shortName: string;
  icon: string; // lucide icon name, see components/ServiceIcon.tsx
  price: number;
  timeline: string;
  popular?: boolean;
  summary: string;
  intro: string;
  seoTitle: string;
  seoDescription: string;
  whoNeeds: string[];
  benefits: { title: string; text: string }[];
  documents: string[];
  process: { title: string; text: string }[];
  includes: string[];
  faqs: { q: string; a: string }[];
}

export const categories: Category[] = [
  {
    id: 'business',
    title: 'Business Registrations',
    short: 'Start a business',
    description: 'Incorporate the right legal structure for your business — company, LLP, OPC or partnership.',
  },
  {
    id: 'government',
    title: 'Government Registrations',
    short: 'Licences & registrations',
    description: 'GST, MSME, Startup India, FSSAI, IEC and every registration your business needs to operate.',
  },
  {
    id: 'other',
    title: 'Other Services',
    short: 'Protect & grow',
    description: 'Protect your brand and keep your documentation in order as you grow.',
  },
];

export const services: Service[] = [
  // ───────────────────────── Business registrations ─────────────────────────
  {
    slug: 'private-limited-company-registration',
    category: 'business',
    name: 'Private Limited Company Registration',
    shortName: 'Pvt Ltd Company',
    icon: 'Building2',
    price: 6999,
    timeline: '7–10 working days',
    popular: true,
    summary: 'The preferred structure for startups planning to raise funds and scale.',
    intro:
      'A Private Limited Company is a separate legal entity with limited liability for its shareholders. It is the most trusted structure for startups and growing businesses that want to raise investment, issue ESOPs and build credibility with customers and banks.',
    seoTitle: 'Private Limited Company Registration Online in India',
    seoDescription:
      'Register your Private Limited Company online with Regpro. Name approval, DSC, DIN, MoA/AoA, PAN, TAN and incorporation certificate — expert-assisted, transparent pricing.',
    whoNeeds: [
      'Startups planning to raise funding from angels or VCs',
      'Founders who want limited liability protection',
      'Businesses that want to issue ESOPs to employees',
      'Companies bidding for corporate or government contracts',
    ],
    benefits: [
      { title: 'Limited liability', text: 'Personal assets of shareholders are protected from business debts.' },
      { title: 'Easy fundraising', text: 'Investors can be issued equity shares — the standard for VC funding.' },
      { title: 'Separate legal entity', text: 'The company can own property, sign contracts and sue in its own name.' },
      { title: 'Higher credibility', text: 'Banks, clients and vendors prefer dealing with registered companies.' },
    ],
    documents: [
      'PAN card of all directors and shareholders',
      'Aadhaar card of all directors and shareholders',
      'Passport-size photographs',
      'Email ID and mobile number of each director',
      'Proof of registered office (electricity bill / property tax receipt)',
      'Rent agreement and NOC from owner (if rented)',
    ],
    process: [
      { title: 'Free consultation', text: 'We understand your business and confirm the right structure.' },
      { title: 'DSC & name approval', text: 'We obtain Digital Signatures and reserve your company name via SPICe+.' },
      { title: 'Drafting & filing', text: 'We draft the MoA & AoA and file the incorporation forms with the MCA.' },
      { title: 'Incorporation', text: 'You receive the Certificate of Incorporation with PAN & TAN.' },
    ],
    includes: [
      '2 Digital Signature Certificates',
      'Name reservation',
      'MoA & AoA drafting',
      'Certificate of Incorporation',
      'Company PAN & TAN',
      'Bank account opening support',
    ],
    faqs: [
      {
        q: 'How many people are needed to start a Private Limited Company?',
        a: 'You need a minimum of 2 directors and 2 shareholders (the same people can be both). At least one director must be resident in India.',
      },
      {
        q: 'Is there a minimum capital requirement?',
        a: 'No. There is no minimum paid-up capital requirement for a Private Limited Company in India.',
      },
      {
        q: 'Can I register a company at my residential address?',
        a: 'Yes. A residential address can be used as the registered office with valid address proof and an NOC from the owner.',
      },
      {
        q: 'What compliances apply after incorporation?',
        a: 'Annual ROC filings, statutory audit, income-tax returns and board meetings are mandatory. We can help you stay on track.',
      },
    ],
  },
  {
    slug: 'llp-registration',
    category: 'business',
    name: 'LLP Registration',
    shortName: 'LLP',
    icon: 'Handshake',
    price: 4999,
    timeline: '10–15 working days',
    summary: 'Partnership flexibility with limited liability and lower compliance.',
    intro:
      'A Limited Liability Partnership (LLP) combines the flexibility of a partnership with the limited liability of a company. It is ideal for professional firms, consultancies and small businesses that want legal protection with fewer compliances.',
    seoTitle: 'LLP Registration Online in India',
    seoDescription:
      'Register a Limited Liability Partnership online. DSC, name approval, LLP agreement and incorporation handled end-to-end by Regpro experts.',
    whoNeeds: [
      'Professional firms — CAs, lawyers, architects, consultants',
      'Small and medium businesses run by two or more partners',
      'Family businesses wanting limited liability',
      'Businesses not planning equity fundraising in the near term',
    ],
    benefits: [
      { title: 'Limited liability', text: 'Partners are not personally liable for the LLP’s debts.' },
      { title: 'Lower compliance', text: 'No mandatory audit below turnover/contribution thresholds.' },
      { title: 'No minimum capital', text: 'Start with any amount of partner contribution.' },
      { title: 'Flexible management', text: 'Rights and duties are set by your LLP agreement.' },
    ],
    documents: [
      'PAN and Aadhaar of all partners',
      'Passport-size photographs',
      'Email ID and mobile number of each partner',
      'Proof of registered office address',
      'NOC from property owner (if rented)',
    ],
    process: [
      { title: 'Consultation', text: 'We confirm partners, contribution and profit sharing.' },
      { title: 'DSC & name', text: 'Digital Signatures are issued and the LLP name is reserved.' },
      { title: 'Incorporation', text: 'We file FiLLiP with the MCA and obtain the incorporation certificate.' },
      { title: 'LLP agreement', text: 'We draft and file your LLP agreement within the due date.' },
    ],
    includes: ['2 Digital Signature Certificates', 'Name reservation', 'Certificate of Incorporation', 'LLP PAN & TAN', 'LLP agreement drafting & filing'],
    faqs: [
      { q: 'How many partners are required for an LLP?', a: 'A minimum of 2 designated partners is required, at least one of whom must be resident in India.' },
      { q: 'Can an LLP be converted to a company later?', a: 'Yes, an LLP can be converted into a Private Limited Company when you are ready to raise equity funding.' },
      { q: 'Is audit mandatory for an LLP?', a: 'Audit is required only if turnover exceeds ₹40 lakh or contribution exceeds ₹25 lakh in a financial year.' },
    ],
  },
  {
    slug: 'opc-registration',
    category: 'business',
    name: 'One Person Company (OPC) Registration',
    shortName: 'OPC',
    icon: 'UserRound',
    price: 5999,
    timeline: '7–10 working days',
    summary: 'Company benefits for solo founders — with limited liability.',
    intro:
      'A One Person Company lets a single founder enjoy the benefits of a company — separate legal identity and limited liability — without needing a co-founder. It is a great fit for solo entrepreneurs and professionals.',
    seoTitle: 'One Person Company (OPC) Registration Online',
    seoDescription:
      'Register a One Person Company online with Regpro. Ideal for solo founders — limited liability, separate legal entity and complete incorporation support.',
    whoNeeds: [
      'Solo founders and freelancers',
      'Proprietors who want limited liability',
      'Professionals building a personal brand business',
    ],
    benefits: [
      { title: 'Single owner', text: 'Full control with just one member and one director.' },
      { title: 'Limited liability', text: 'Your personal assets are protected.' },
      { title: 'Corporate identity', text: 'Better credibility than a sole proprietorship.' },
      { title: 'Easy conversion', text: 'Convert to a Private Limited Company as you grow.' },
    ],
    documents: [
      'PAN and Aadhaar of the member/director',
      'PAN and Aadhaar of the nominee',
      'Passport-size photograph',
      'Proof of registered office address',
      'NOC from property owner (if rented)',
    ],
    process: [
      { title: 'Consultation', text: 'We confirm eligibility and your nominee details.' },
      { title: 'DSC & name', text: 'Digital Signature is issued and the company name is reserved.' },
      { title: 'Filing', text: 'MoA & AoA are drafted and SPICe+ is filed with the MCA.' },
      { title: 'Incorporation', text: 'You receive the Certificate of Incorporation with PAN & TAN.' },
    ],
    includes: ['1 Digital Signature Certificate', 'Name reservation', 'MoA & AoA drafting', 'Certificate of Incorporation', 'PAN & TAN'],
    faqs: [
      { q: 'Who can form an OPC?', a: 'Any Indian citizen who is resident in India can form a One Person Company.' },
      { q: 'What is a nominee?', a: 'A nominee is a person who will become the member of the OPC in case of the death or incapacity of the sole member.' },
      { q: 'Can an OPC raise funding?', a: 'An OPC cannot issue shares to multiple investors. You can convert it to a Private Limited Company to raise funds.' },
    ],
  },
  {
    slug: 'partnership-firm-registration',
    category: 'business',
    name: 'Partnership Firm Registration',
    shortName: 'Partnership Firm',
    icon: 'Users',
    price: 2999,
    timeline: '7–15 working days',
    summary: 'A simple, low-cost structure for two or more partners.',
    intro:
      'A Partnership Firm is one of the simplest ways for two or more people to start a business together. Registering the firm with the Registrar of Firms gives it legal standing to enforce contracts and resolve disputes.',
    seoTitle: 'Partnership Firm Registration Online',
    seoDescription:
      'Register your Partnership Firm with Regpro. Partnership deed drafting, registration with the Registrar of Firms and PAN for the firm.',
    whoNeeds: ['Small businesses run by friends or family', 'Traders and local service businesses', 'Businesses wanting a low-cost, simple structure'],
    benefits: [
      { title: 'Easy to start', text: 'Minimal paperwork and low formation cost.' },
      { title: 'Shared responsibility', text: 'Capital, skills and workload are shared between partners.' },
      { title: 'Legal standing', text: 'A registered firm can file suits to enforce its contracts.' },
      { title: 'Minimal compliance', text: 'Fewer annual filings compared to companies.' },
    ],
    documents: ['PAN and Aadhaar of all partners', 'Passport-size photographs', 'Address proof of business place', 'Rent agreement / NOC (if rented)'],
    process: [
      { title: 'Consultation', text: 'We understand partner roles, capital and profit ratios.' },
      { title: 'Deed drafting', text: 'We draft your partnership deed for review and signing.' },
      { title: 'Registration', text: 'The deed is notarised and filed with the Registrar of Firms.' },
      { title: 'Firm PAN', text: 'We apply for the firm’s PAN to open a bank account.' },
    ],
    includes: ['Partnership deed drafting', 'Registration with Registrar of Firms', 'Firm PAN application'],
    faqs: [
      { q: 'Is registration of a partnership firm mandatory?', a: 'It is not mandatory, but an unregistered firm cannot file a suit to enforce its contracts. Registration is strongly recommended.' },
      { q: 'Do partners have limited liability?', a: 'No. Partners in a partnership firm have unlimited liability. Consider an LLP if limited liability is important.' },
    ],
  },

  // ───────────────────────── Government registrations ─────────────────────────
  {
    slug: 'gst-registration',
    category: 'government',
    name: 'GST Registration',
    shortName: 'GST Registration',
    icon: 'ReceiptIndianRupee',
    price: 999,
    timeline: '3–7 working days',
    popular: true,
    summary: 'Get your GSTIN to collect tax, claim input credit and sell online.',
    intro:
      'GST registration gives your business a unique GSTIN, allowing you to collect GST, claim input tax credit and sell across states and on marketplaces. We handle GST registration for businesses in Bengaluru and across India — entirely online.',
    seoTitle: 'GST Registration Online in Bangalore & Across India',
    seoDescription:
      'Apply for GST registration online in Bangalore and anywhere in India. Expert-assisted GSTIN application with document review and ARN tracking — starting at ₹999.',
    whoNeeds: [
      'Businesses with turnover above ₹40 lakh (goods) or ₹20 lakh (services)',
      'Anyone selling on Amazon, Flipkart or other e-commerce platforms',
      'Businesses making inter-state supplies',
      'Exporters, importers and casual taxable persons',
    ],
    benefits: [
      { title: 'Input tax credit', text: 'Claim credit for GST paid on your purchases.' },
      { title: 'Sell anywhere', text: 'Supply across states and on online marketplaces.' },
      { title: 'Business credibility', text: 'A GSTIN builds trust with B2B clients.' },
      { title: 'Legal compliance', text: 'Avoid penalties for operating without registration.' },
    ],
    documents: [
      'PAN card of the business / proprietor',
      'Aadhaar card of proprietor / partners / directors',
      'Photograph of proprietor / partners / directors',
      'Proof of business address (electricity bill / property tax receipt)',
      'Rent agreement and NOC (if rented)',
      'Bank account details (cancelled cheque / statement)',
      'Certificate of incorporation / partnership deed (if applicable)',
    ],
    process: [
      { title: 'Share details', text: 'Send your documents on WhatsApp or upload them securely.' },
      { title: 'Document review', text: 'Our experts verify documents to avoid rejection.' },
      { title: 'Application filing', text: 'We file the GST REG-01 application and share the ARN.' },
      { title: 'GSTIN issued', text: 'You receive your GST certificate once approved.' },
    ],
    includes: ['Eligibility consultation', 'Document review', 'GST application filing', 'ARN tracking & follow-ups', 'GST certificate'],
    faqs: [
      { q: 'Is GST registration free?', a: 'There is no government fee for GST registration. Our fee covers expert preparation, filing and follow-ups.' },
      { q: 'How long does GST registration take?', a: 'Usually 3–7 working days, depending on Aadhaar authentication and whether the officer raises a query.' },
      { q: 'Can I get GST registration for a home-based business?', a: 'Yes. You can use your residential address with valid address proof.' },
      { q: 'Do you provide GST registration in Bangalore?', a: 'Yes. We work with businesses across Bengaluru and Karnataka, and anywhere in India — the process is fully online.' },
    ],
  },
  {
    slug: 'gst-amendment',
    category: 'government',
    name: 'GST Amendment',
    shortName: 'GST Amendment',
    icon: 'FilePen',
    price: 799,
    timeline: '3–7 working days',
    summary: 'Update business name, address, partners or other GST details.',
    intro:
      'If any detail in your GST registration changes — business name, address, additional place of business, partners/directors or contact details — the registration must be amended. We file the correct amendment form with supporting documents.',
    seoTitle: 'GST Amendment Online — Change GST Registration Details',
    seoDescription: 'Change your GST registration details online — name, address, partners or contact details. Expert-assisted GST amendment by Regpro.',
    whoNeeds: ['Businesses that moved to a new address', 'Firms adding or removing partners / directors', 'Businesses adding a new place of business or changing trade name'],
    benefits: [
      { title: 'Stay compliant', text: 'Keep your GST records accurate to avoid notices.' },
      { title: 'Correct invoices', text: 'Ensure invoices reflect your current details.' },
      { title: 'Right form, first time', text: 'We identify core vs non-core amendments correctly.' },
      { title: 'Quick turnaround', text: 'We track the application until approval.' },
    ],
    documents: ['GST login credentials', 'Proof of the change (new address proof, deed, board resolution, etc.)', 'Identity proof of new partners / directors (if applicable)'],
    process: [
      { title: 'Tell us what changed', text: 'Share the details that need updating.' },
      { title: 'Document review', text: 'We confirm the supporting documents required.' },
      { title: 'Filing', text: 'We file the amendment application on the GST portal.' },
      { title: 'Approval', text: 'Your updated registration is approved and confirmed.' },
    ],
    includes: ['Consultation', 'Amendment application filing', 'Follow-up on queries', 'Updated registration certificate'],
    faqs: [
      { q: 'What is a core amendment?', a: 'Changes to legal name, principal or additional place of business, and partners/directors are core amendments and need officer approval.' },
      { q: 'Can I change my PAN in GST registration?', a: 'No. A change of PAN requires a fresh GST registration.' },
    ],
  },
  {
    slug: 'gst-cancellation',
    category: 'government',
    name: 'GST Cancellation',
    shortName: 'GST Cancellation',
    icon: 'FileX2',
    price: 999,
    timeline: '7–15 working days',
    summary: 'Close your GST registration properly when it is no longer required.',
    intro:
      'If your business has closed, been transferred, or your turnover is below the threshold, you can apply to cancel your GST registration. Proper cancellation stops future return-filing obligations and penalties.',
    seoTitle: 'GST Cancellation Online — Surrender GST Registration',
    seoDescription: 'Cancel or surrender your GST registration online with Regpro. Final return guidance and complete filing support.',
    whoNeeds: ['Businesses that have shut down', 'Businesses below the GST threshold that registered voluntarily', 'Businesses transferred, merged or converted to a new entity'],
    benefits: [
      { title: 'Stop late fees', text: 'Avoid ongoing return obligations and late fees.' },
      { title: 'Clean closure', text: 'Close your tax registration the right way.' },
      { title: 'Final return help', text: 'We guide you on filing GSTR-10 (final return).' },
      { title: 'Expert support', text: 'We respond to any officer queries for you.' },
    ],
    documents: ['GST login credentials', 'Reason for cancellation', 'Details of closing stock (if any)', 'Latest returns filed'],
    process: [
      { title: 'Review', text: 'We check pending returns and liabilities.' },
      { title: 'Application', text: 'We file the cancellation application (REG-16).' },
      { title: 'Follow-up', text: 'We respond to queries raised by the officer.' },
      { title: 'Cancellation order', text: 'You receive the cancellation order; we guide on the final return.' },
    ],
    includes: ['Pending-return review', 'Cancellation application', 'Query handling', 'Final return guidance'],
    faqs: [
      { q: 'Do I need to file returns before cancellation?', a: 'Yes. All pending returns must be filed before the cancellation can be processed.' },
      { q: 'What is GSTR-10?', a: 'GSTR-10 is the final return to be filed within three months of the cancellation order.' },
    ],
  },
  {
    slug: 'udyam-msme-registration',
    category: 'government',
    name: 'Udyam / MSME Registration',
    shortName: 'Udyam / MSME',
    icon: 'Factory',
    price: 499,
    timeline: '1–2 working days',
    popular: true,
    summary: 'Unlock MSME benefits — collateral-free loans, subsidies and more.',
    intro:
      'Udyam Registration is the government’s official MSME registration. It gives micro, small and medium enterprises access to priority-sector lending, subsidies, protection against delayed payments and preference in government tenders.',
    seoTitle: 'Udyam / MSME Registration Online',
    seoDescription:
      'Get your Udyam (MSME) registration certificate online in 1–2 days. Access collateral-free loans, subsidies and government tender benefits.',
    whoNeeds: ['Manufacturers and service providers of any size up to medium', 'Proprietors, partnerships, LLPs and companies', 'Businesses applying for bank loans or government tenders'],
    benefits: [
      { title: 'Easier loans', text: 'Priority-sector lending and collateral-free loan schemes.' },
      { title: 'Delayed-payment protection', text: 'Buyers must pay MSMEs within 45 days.' },
      { title: 'Subsidies', text: 'Access to various central and state government schemes.' },
      { title: 'Tender benefits', text: 'Preference and fee exemptions in government tenders.' },
    ],
    documents: ['Aadhaar of proprietor / partner / director', 'PAN of the business', 'GSTIN (if applicable)', 'Bank account details', 'Business activity and investment/turnover details'],
    process: [
      { title: 'Share details', text: 'Send Aadhaar, PAN and business details.' },
      { title: 'Classification', text: 'We classify your enterprise and NIC codes correctly.' },
      { title: 'Filing', text: 'We file the Udyam application with OTP verification.' },
      { title: 'Certificate', text: 'You receive your Udyam Registration Certificate.' },
    ],
    includes: ['NIC code selection', 'Udyam application filing', 'Udyam certificate'],
    faqs: [
      { q: 'Is there a government fee for Udyam registration?', a: 'No. Udyam registration is free on the government portal. Our fee is for expert assistance.' },
      { q: 'Is Udyam registration valid for life?', a: 'Yes, it does not expire. You only need to update details when they change.' },
    ],
  },
  {
    slug: 'dpiit-startup-india-registration',
    category: 'government',
    name: 'DPIIT / Startup India Recognition',
    shortName: 'DPIIT / Startup India',
    icon: 'Rocket',
    price: 2999,
    timeline: '10–20 working days',
    popular: true,
    summary: 'Get recognised as a startup for tax benefits and easier compliance.',
    intro:
      'DPIIT recognition under the Startup India initiative gives eligible startups access to tax exemptions, self-certification under labour and environment laws, faster patent processing and government funding schemes.',
    seoTitle: 'DPIIT Registration & Startup India Recognition Online',
    seoDescription:
      'Get DPIIT startup recognition under Startup India. We prepare your application and innovation write-up to maximise approval chances.',
    whoNeeds: [
      'Private Limited Companies, LLPs and registered partnerships',
      'Entities less than 10 years old with turnover under ₹100 crore',
      'Businesses working on innovation, improvement or a scalable model',
    ],
    benefits: [
      { title: 'Tax exemption', text: 'Eligible startups can apply for a 3-year income-tax holiday (Sec 80-IAC).' },
      { title: 'Funding access', text: 'Eligibility for Fund of Funds and Startup India Seed Fund.' },
      { title: 'Easier compliance', text: 'Self-certification under labour and environmental laws.' },
      { title: 'IP benefits', text: 'Fast-tracked patent examination and fee rebates.' },
    ],
    documents: [
      'Certificate of incorporation / registration',
      'PAN of the entity',
      'Brief write-up on innovation and scalability',
      'Pitch deck or website / product link',
      'Director / partner details',
    ],
    process: [
      { title: 'Eligibility check', text: 'We confirm your entity qualifies for recognition.' },
      { title: 'Write-up', text: 'We help draft a clear innovation and scalability description.' },
      { title: 'Application', text: 'We file the application on the Startup India portal.' },
      { title: 'Recognition', text: 'You receive your DPIIT recognition certificate.' },
    ],
    includes: ['Eligibility review', 'Innovation write-up support', 'Startup India application', 'Query handling', 'Recognition certificate'],
    faqs: [
      { q: 'Can a proprietorship get DPIIT recognition?', a: 'No. Only Private Limited Companies, LLPs and registered partnership firms are eligible.' },
      { q: 'Is there a government fee?', a: 'No, DPIIT recognition has no government fee.' },
    ],
  },
  {
    slug: 'iec-registration',
    category: 'government',
    name: 'IEC Registration',
    shortName: 'IEC (Import Export Code)',
    icon: 'Ship',
    price: 1499,
    timeline: '1–3 working days',
    summary: 'The mandatory 10-digit code to import or export from India.',
    intro:
      'The Importer Exporter Code (IEC), issued by the DGFT, is mandatory for any business that imports or exports goods or services from India. It is a one-time registration with lifetime validity (subject to annual updation).',
    seoTitle: 'IEC Registration Online — Import Export Code',
    seoDescription: 'Apply for your Import Export Code (IEC) online with Regpro. Fast DGFT filing with complete document support.',
    whoNeeds: ['Importers and exporters of goods', 'Exporters of services claiming benefits', 'E-commerce sellers shipping internationally'],
    benefits: [
      { title: 'Go global', text: 'Legally import and export goods and services.' },
      { title: 'Export benefits', text: 'Claim export incentives and schemes from DGFT.' },
      { title: 'Lifetime validity', text: 'One-time registration with annual updation.' },
      { title: 'No returns', text: 'No periodic return filing for IEC.' },
    ],
    documents: ['PAN of the business / proprietor', 'Aadhaar of proprietor / authorised person', 'Address proof of business', 'Cancelled cheque or bank certificate'],
    process: [
      { title: 'Share documents', text: 'Send PAN, Aadhaar, address and bank proof.' },
      { title: 'Review', text: 'We verify details to match DGFT requirements.' },
      { title: 'Filing', text: 'We file the application on the DGFT portal.' },
      { title: 'IEC issued', text: 'You receive your IEC certificate.' },
    ],
    includes: ['Document review', 'DGFT application filing', 'IEC certificate'],
    faqs: [
      { q: 'What is the government fee for IEC?', a: 'The DGFT fee is ₹500, which is payable in addition to our professional fee.' },
      { q: 'Does IEC need renewal?', a: 'IEC does not expire, but details must be updated on the DGFT portal every year.' },
    ],
  },
  {
    slug: 'fssai-registration',
    category: 'government',
    name: 'FSSAI Registration',
    shortName: 'FSSAI Licence',
    icon: 'UtensilsCrossed',
    price: 1499,
    timeline: '7–30 working days',
    summary: 'Food licence for restaurants, cloud kitchens, manufacturers and sellers.',
    intro:
      'Every food business in India — from home bakers and cloud kitchens to manufacturers and distributors — needs an FSSAI registration or licence. The type (Basic, State or Central) depends on your turnover and activity.',
    seoTitle: 'FSSAI Registration & Food Licence Online',
    seoDescription: 'Apply for FSSAI Basic registration, State or Central food licence online. Correct category selection and complete filing by Regpro.',
    whoNeeds: ['Restaurants, cafés and cloud kitchens', 'Home bakers and food startups', 'Food manufacturers, traders and distributors', 'Sellers listing on Swiggy, Zomato or e-commerce'],
    benefits: [
      { title: 'Legal operation', text: 'Operate your food business without penalties.' },
      { title: 'Customer trust', text: 'Display your FSSAI number on packaging and menus.' },
      { title: 'Platform onboarding', text: 'Required by food delivery and e-commerce platforms.' },
      { title: 'Right category', text: 'We choose Basic, State or Central licence correctly.' },
    ],
    documents: ['Photo ID and photograph of the proprietor / partners', 'Proof of business premises', 'List of food products / categories', 'Form-B and other documents for State/Central licence'],
    process: [
      { title: 'Category check', text: 'We identify the right licence type for your business.' },
      { title: 'Documents', text: 'We prepare and verify your application documents.' },
      { title: 'Filing', text: 'We file on FoSCoS and pay the government fee.' },
      { title: 'Licence issued', text: 'You receive your FSSAI registration / licence.' },
    ],
    includes: ['Licence category selection', 'Application filing on FoSCoS', 'Query handling', 'FSSAI certificate'],
    faqs: [
      { q: 'Which FSSAI licence do I need?', a: 'Basic registration for turnover up to ₹12 lakh, State licence up to ₹20 crore, and Central licence above that or for specific activities like import.' },
      { q: 'Is the government fee included?', a: 'No. The FSSAI government fee depends on licence type and tenure and is charged separately.' },
    ],
  },
  {
    slug: 'shop-establishment-registration',
    category: 'government',
    name: 'Shop & Establishment Registration',
    shortName: 'Shop & Establishment',
    icon: 'Store',
    price: 1499,
    timeline: '5–10 working days',
    summary: 'State licence for shops, offices and commercial establishments.',
    intro:
      'The Shop & Establishment registration is issued under the respective state’s Shops and Establishments Act. It is required for shops, offices, restaurants and other commercial establishments and is often needed to open a current account.',
    seoTitle: 'Shop & Establishment Registration Online',
    seoDescription: 'Get your Shop & Establishment licence online with Regpro. State-specific filing for shops, offices and commercial establishments.',
    whoNeeds: ['Retail shops and showrooms', 'Offices and co-working businesses', 'Restaurants, salons and service establishments'],
    benefits: [
      { title: 'Legal compliance', text: 'Meet your state’s labour law requirements.' },
      { title: 'Bank account', text: 'Commonly accepted proof for opening a current account.' },
      { title: 'Business proof', text: 'Serves as a valid proof of business existence.' },
      { title: 'State expertise', text: 'We handle state-specific forms and portals.' },
    ],
    documents: ['PAN and Aadhaar of owner', 'Photograph of owner', 'Address proof of the establishment', 'Photo of the shop with name board', 'Number of employees'],
    process: [
      { title: 'Share details', text: 'Send owner, premises and employee details.' },
      { title: 'Preparation', text: 'We prepare the state-specific application.' },
      { title: 'Filing', text: 'We file the application and pay the government fee.' },
      { title: 'Certificate', text: 'You receive your registration certificate.' },
    ],
    includes: ['State-specific application', 'Filing & follow-up', 'Registration certificate'],
    faqs: [
      { q: 'Is Shop & Establishment registration the same in every state?', a: 'No. Each state has its own Act, forms and fee structure. We handle the process for your state.' },
      { q: 'Do I need it if I work from home?', a: 'Requirements vary by state. Speak to us and we will advise based on your location and activity.' },
    ],
  },
  {
    slug: 'pan-tan-registration',
    category: 'government',
    name: 'PAN / TAN Application',
    shortName: 'PAN / TAN',
    icon: 'CreditCard',
    price: 499,
    timeline: '7–15 working days',
    summary: 'PAN and TAN for businesses, firms and individuals.',
    intro:
      'PAN is required for every taxpayer and business, while TAN is mandatory for anyone deducting or collecting tax at source (TDS/TCS). We help you apply for new PAN / TAN or correct existing details.',
    seoTitle: 'PAN & TAN Application Online for Business',
    seoDescription: 'Apply for PAN or TAN for your business, firm or LLP online. Corrections and new applications handled by Regpro.',
    whoNeeds: ['Partnership firms, LLPs, trusts and societies', 'Businesses that deduct TDS on salary, rent or contracts', 'Individuals needing PAN corrections'],
    benefits: [
      { title: 'Bank & tax ready', text: 'Open bank accounts and file tax returns.' },
      { title: 'TDS compliance', text: 'TAN is mandatory to deduct and deposit TDS.' },
      { title: 'Error-free', text: 'Avoid mismatches that cause delays.' },
      { title: 'Quick filing', text: 'Online filing with e-PAN delivery.' },
    ],
    documents: ['Proof of identity and address', 'Certificate of registration / deed (for entities)', 'Photograph and signature (for individuals)'],
    process: [
      { title: 'Share details', text: 'Send the applicant’s details and documents.' },
      { title: 'Application', text: 'We prepare and file the PAN / TAN form.' },
      { title: 'Verification', text: 'Application is verified by the Income Tax Department.' },
      { title: 'Allotment', text: 'PAN / TAN is allotted and shared with you.' },
    ],
    includes: ['Application preparation', 'Online filing', 'Status tracking'],
    faqs: [{ q: 'Who needs a TAN?', a: 'Any person or business required to deduct or collect tax at source must obtain a TAN.' }],
  },
  {
    slug: 'digital-signature-certificate',
    category: 'government',
    name: 'Digital Signature Certificate (DSC)',
    shortName: 'Digital Signature (DSC)',
    icon: 'PenTool',
    price: 1499,
    timeline: '1–2 working days',
    summary: 'Class 3 DSC for MCA, GST, income tax and e-tender filings.',
    intro:
      'A Digital Signature Certificate (DSC) is the electronic equivalent of a physical signature. It is required for company and LLP incorporation, MCA filings, income-tax and GST filings, and e-tenders.',
    seoTitle: 'Digital Signature Certificate (DSC) Online — Class 3',
    seoDescription: 'Get a Class 3 Digital Signature Certificate (DSC) online with Regpro. Paperless video verification, USB token and fast issuance.',
    whoNeeds: ['Company directors and LLP partners', 'Professionals filing on MCA, GST and income-tax portals', 'Businesses participating in e-tenders'],
    benefits: [
      { title: 'Paperless', text: 'Aadhaar/PAN-based eKYC with video verification.' },
      { title: 'Secure', text: 'Legally valid under the IT Act, 2000.' },
      { title: 'Fast', text: 'Issued usually within 1–2 working days.' },
      { title: 'Multi-use', text: 'Use for MCA, GST, ITR and tender portals.' },
    ],
    documents: ['PAN card', 'Aadhaar card', 'Passport-size photograph', 'Email ID and mobile number'],
    process: [
      { title: 'Apply', text: 'Share your PAN, Aadhaar and contact details.' },
      { title: 'Verify', text: 'Complete OTP and short video verification.' },
      { title: 'Issue', text: 'The certifying authority issues your DSC.' },
      { title: 'Deliver', text: 'DSC is downloaded to your USB token.' },
    ],
    includes: ['Class 3 DSC (2-year validity)', 'eKYC and video verification support', 'USB token'],
    faqs: [{ q: 'What is the validity of a DSC?', a: 'DSCs are typically issued with 1, 2 or 3 years validity. Our standard package includes 2 years.' }],
  },

  // ───────────────────────── Other services ─────────────────────────
  {
    slug: 'trademark-registration',
    category: 'other',
    name: 'Trademark Registration',
    shortName: 'Trademark',
    icon: 'BadgeCheck',
    price: 4999,
    timeline: 'Filing in 1–2 days',
    popular: true,
    summary: 'Protect your brand name and logo across India.',
    intro:
      'A registered trademark gives you the exclusive right to use your brand name or logo for your goods and services. Once filed, you can use the ™ symbol, and ® after registration — protecting your brand from copycats.',
    seoTitle: 'Trademark Registration Online in India',
    seoDescription: 'Register your brand name or logo as a trademark. Free trademark search, class selection and filing with Regpro — use ™ from day one.',
    whoNeeds: ['Startups and businesses building a brand', 'D2C and e-commerce sellers', 'Anyone with a unique product name or logo'],
    benefits: [
      { title: 'Exclusive rights', text: 'Legal ownership of your brand name and logo.' },
      { title: 'Use ™ immediately', text: 'Start using the ™ symbol once the application is filed.' },
      { title: 'Brand asset', text: 'A trademark can be licensed, sold or franchised.' },
      { title: 'Legal protection', text: 'Take action against infringement and copycats.' },
    ],
    documents: ['Brand name and / or logo', 'Applicant details (individual / company / LLP)', 'Description of goods / services', 'Signed authorisation (Form TM-48)', 'MSME / Startup certificate for fee concession (if any)'],
    process: [
      { title: 'Free search', text: 'We check for similar existing trademarks.' },
      { title: 'Class selection', text: 'We pick the right classes for your goods / services.' },
      { title: 'Filing', text: 'We file your application and share the TM number.' },
      { title: 'Tracking', text: 'We track examination and guide you till registration.' },
    ],
    includes: ['Trademark search', 'Class selection', 'Application drafting & filing', 'TM application number'],
    faqs: [
      { q: 'What is the government fee for trademark?', a: 'The government fee is ₹4,500 per class for individuals, startups and MSMEs, and ₹9,000 per class for others — payable in addition to our fee.' },
      { q: 'How long does trademark registration take?', a: 'Filing happens in 1–2 days. Final registration may take several months depending on examination and objections.' },
    ],
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);
export const servicesByCategory = (id: CategoryId) => services.filter((s) => s.category === id);
export const popularServices = services.filter((s) => s.popular);

export const formatPrice = (n: number) => `₹${n.toLocaleString('en-IN')}`;
