import { ServiceItem } from '../types';

export const servicesData: ServiceItem[] = [
  // ==========================================
  // BUSINESS REGISTRATIONS
  // ==========================================
  {
    slug: 'private-limited-company-registration',
    name: 'Private Limited Company Registration',
    category: 'Business Registration',
    shortDescription: 'The most popular corporate structure for startups and fast-growing businesses looking to raise funding.',
    fullDescription: 'A Private Limited Company (Pvt Ltd) is the preferred choice for entrepreneurs in India who plan to raise venture capital, protect personal assets through limited liability, and establish a separate legal corporate entity with high market credibility.',
    startingPrice: '₹9,999',
    processingTime: '7-10 Working Days',
    statutoryFeeNote: 'Government & ROC statutory filing fees extra as per authorized capital.',
    iconName: 'Building2',
    featuredOnHome: true,
    metaTitle: 'Private Limited Company Registration in India | Regpro',
    metaDescription: 'Incorporate your Private Limited Company hassle-free with Regpro. Fast SPICe+ filing, DIN, DSC, PAN, TAN, and MOA/AOA drafted by professional CAs & CS.',
    keywords: [
      'Pvt Ltd company registration',
      'Private limited registration India',
      'company incorporation Bangalore',
      'SPICe+ MCA filing',
      'startup incorporation'
    ],
    benefits: [
      'Separate Legal Identity and unlimited succession',
      'Limited liability protection for shareholders and founders',
      'High credibility among investors, venture capitalists, and banks',
      'Ability to issue ESOPs and raise institutional equity funding',
      'Tax advantages and eligibility for Startup India tax exemptions'
    ],
    whoNeedsIt: [
      'Startups planning to raise angel or venture capital funding',
      'Co-founders seeking well-defined equity splits and liability protection',
      'Businesses requiring institutional trust and cross-border partnerships',
      'Tech companies, D2C brands, and scalable product enterprises'
    ],
    documentsRequired: [
      'PAN Card and Aadhaar Card of all proposed directors',
      'Passport size photographs and valid email & mobile numbers',
      'Proof of identity (Passport / Voter ID / Driving License)',
      'Bank statement or utility bill (not older than 2 months) for directors',
      'Registered office address proof (Electricity bill / Rent agreement + NOC)'
    ],
    processSteps: [
      {
        step: 1,
        title: 'Name Approval & DSC',
        description: 'We draft 2 unique company name choices for MCA RUN reservation and generate Class 3 DSCs for directors.'
      },
      {
        step: 2,
        title: 'Drafting Charter Documents',
        description: 'Our corporate legal team drafts the tailored Memorandum of Association (MOA) and Articles of Association (AOA).'
      },
      {
        step: 3,
        title: 'SPICe+ Incorporation Filing',
        description: 'Filing unified SPICe+ Part B with MCA, including DIN allotment, PAN, TAN, EPFO, ESIC, and bank account setup.'
      },
      {
        step: 4,
        title: 'Certificate of Incorporation',
        description: 'Receive the MCA Certificate of Incorporation (COI) with CIN, digital PAN, and TAN issued straight to your inbox.'
      }
    ],
    faqs: [
      {
        question: 'How many directors are required for a Private Limited Company?',
        answer: 'A minimum of two directors and two shareholders are required. A single person can be both a director and a shareholder.'
      },
      {
        question: 'Is physical presence required at any government office?',
        answer: 'No, the entire process is 100% digital and conducted online via MCA portal with DSC authentication.'
      },
      {
        question: 'What is the minimum capital required to start?',
        answer: 'There is no minimum authorized capital requirement. You can start with as little as ₹1,000 or ₹10,000 paid-up capital.'
      }
    ],
    relatedServices: ['gst-registration', 'trademark-registration', 'dpiit-startup-india-recognition', 'udyam-msme-registration']
  },
  {
    slug: 'llp-registration',
    name: 'LLP Registration',
    category: 'Business Registration',
    shortDescription: 'Ideal blend of partnership flexibility and corporate limited liability with low annual compliance burdens.',
    fullDescription: 'Limited Liability Partnership (LLP) offers the operational simplicity of a partnership firm combined with the safety of limited corporate liability. It is ideal for professional consulting firms, service agencies, and small enterprises.',
    startingPrice: '₹8,999',
    processingTime: '7-10 Working Days',
    statutoryFeeNote: 'ROC statutory registration stamp duty extra as per state norms.',
    iconName: 'Scale',
    featuredOnHome: true,
    metaTitle: 'LLP Registration in India — Limited Liability Partnership | Regpro',
    metaDescription: 'Register your Limited Liability Partnership (LLP) in India online. End-to-end guidance, name reservation, LLP agreement drafting, and compliance assistance.',
    keywords: ['LLP registration', 'limited liability partnership', 'LLP agreement drafting', 'LLP vs Pvt Ltd'],
    benefits: [
      'No minimum capital requirement to get started',
      'No audit requirement if annual turnover is under ₹40 Lakhs and capital is under ₹25 Lakhs',
      'Partners are not liable for another partner’s independent wrongful acts',
      'Significantly lower compliance burden compared to Pvt Ltd companies',
      'Flexible internal governance based on custom LLP Agreement'
    ],
    whoNeedsIt: [
      'Professional service firms (Lawyers, Architects, Digital Agencies, Consultants)',
      'Family businesses wanting liability protection without complex compliance',
      'Small and medium enterprises funded through internal capital'
    ],
    documentsRequired: [
      'PAN Card and Aadhaar Card of all designated partners',
      'Address proof of partners (Voter ID / Passport / Driving License)',
      'Bank statement (latest 2 months) of partners',
      'Proof of registered office (Electricity bill + Rent agreement with NOC)'
    ],
    processSteps: [
      {
        step: 1,
        title: 'Class 3 DSC & DPIN',
        description: 'Obtain digital signatures and partner identification numbers for all designated partners.'
      },
      {
        step: 2,
        title: 'LLP Name Reservation',
        description: 'Submit Form RUN-LLP on MCA portal for formal business name clearance.'
      },
      {
        step: 3,
        title: 'FiLLiP Incorporation Filing',
        description: 'File incorporation documents and statutory affidavits with the Registrar of Companies.'
      },
      {
        step: 4,
        title: 'Drafting & Filing LLP Agreement',
        description: 'Draft the mutual partnership agreement and file Form 3 within 30 days of incorporation.'
      }
    ],
    faqs: [
      {
        question: 'Can an LLP raise venture capital like a Pvt Ltd?',
        answer: 'LLPs cannot issue equity shares or stock options (ESOPs), which makes them less suitable for institutional VC funding, but perfect for self-funded partnerships.'
      },
      {
        question: 'How many partners can an LLP have?',
        answer: 'An LLP needs at least 2 designated partners. Unlike traditional partnerships, there is no upper limit on the number of partners.'
      }
    ],
    relatedServices: ['gst-registration', 'trademark-registration', 'pan-tan']
  },
  {
    slug: 'opc-registration',
    name: 'OPC Registration',
    category: 'Business Registration',
    shortDescription: 'Enjoy all benefits of a private limited company with 100% single founder ownership and full control.',
    fullDescription: 'One Person Company (OPC) is designed specifically for solo entrepreneurs who want the credibility and limited liability of a corporate entity without needing a secondary co-founder or co-director.',
    startingPrice: '₹8,999',
    processingTime: '7-10 Working Days',
    statutoryFeeNote: 'Government MCA filing charges extra based on capital tier.',
    iconName: 'UserCheck',
    featuredOnHome: true,
    metaTitle: 'One Person Company (OPC) Registration India | Regpro',
    metaDescription: 'Start your One Person Company in India with complete ownership, limited liability, and corporate credibility. Complete legal registration handled by Regpro.',
    keywords: ['OPC registration', 'One Person Company registration India', 'solo founder incorporation'],
    benefits: [
      'Complete 100% control with single shareholder ownership',
      'Limited liability shield protecting personal real estate and savings',
      'Legal corporate status to execute government and enterprise contracts',
      'Seamless conversion to Private Limited as business expands'
    ],
    whoNeedsIt: [
      'Solo founders, consultants, and independent tech creators',
      'Sole proprietorship owners seeking formal corporate shielding'
    ],
    documentsRequired: [
      'PAN Card and Aadhaar Card of Founder and Nominee',
      'Identity and address proofs of Director and Nominee',
      'Registered office premises proof (Utility bill & Rent NOC)'
    ],
    processSteps: [
      { step: 1, title: 'Name Approval & DSC', description: 'Procure DSC for the founder and reserve proposed name on MCA.' },
      { step: 2, title: 'Nominee Consent', description: 'Appoint a statutory nominee with Form INC-3 consent documentation.' },
      { step: 3, title: 'SPICe+ Incorporation', description: 'Submit MOA, AOA, and digital PAN/TAN applications.' },
      { step: 4, title: 'Certificate Delivery', description: 'Receive MCA Certificate of Incorporation with official CIN.' }
    ],
    faqs: [
      { question: 'Why is a nominee required in an OPC?', answer: 'The Companies Act mandates a nominee who steps in to maintain corporate succession in case of the sole member’s demise or incapacity.' }
    ],
    relatedServices: ['gst-registration', 'trademark-registration', 'udyam-msme-registration']
  },
  {
    slug: 'partnership-firm-registration',
    name: 'Partnership Firm Registration',
    category: 'Business Registration',
    shortDescription: 'Traditional and cost-effective multi-owner business structure governed by the Indian Partnership Act, 1932.',
    fullDescription: 'Partnership firm registration is ideal for traditional traders, small manufacturing units, and family ventures seeking simple mutual contracts without elaborate annual compliance.',
    startingPrice: '₹6,999',
    processingTime: '5-7 Working Days',
    statutoryFeeNote: 'State Registrar of Firms (ROF) stamp duty and notary fees extra.',
    iconName: 'Users',
    featuredOnHome: true,
    metaTitle: 'Partnership Firm Registration & Deed Drafting | Regpro',
    metaDescription: 'Register your Partnership Firm with the Registrar of Firms. Customized partnership deed drafting, notary, PAN, and bank documentation by Regpro experts.',
    keywords: ['Partnership firm registration', 'Partnership deed drafting', 'Registrar of firms ROF'],
    benefits: [
      'Easy formation with custom partnership deed terms',
      'Minimal ongoing corporate compliance',
      'Shared capital, responsibilities, and decision making'
    ],
    whoNeedsIt: [
      'Retail merchants, local wholesalers, and joint trade shops',
      'Small enterprises wanting quick operational start'
    ],
    documentsRequired: [
      'PAN and Aadhaar of all partners',
      'Address proof of partners and firm office',
      'Draft partnership deed printed on appropriate stamp paper'
    ],
    processSteps: [
      { step: 1, title: 'Deed Drafting', description: 'Our legal counsel drafts a comprehensive partnership deed.' },
      { step: 2, title: 'Stamp Duty & Notarization', description: 'Execute deed on non-judicial stamp paper with partner signatures.' },
      { step: 3, title: 'ROF Filing', description: 'File Form 1 with Registrar of Firms along with notarized deed copy.' },
      { step: 4, title: 'PAN & Bank Setup', description: 'Obtain firm PAN and assist in dedicated current account setup.' }
    ],
    faqs: [
      { question: 'Is ROF registration mandatory for partnerships?', answer: 'While unregistered firms are legally permissible, registered firms gain enforceable rights in civil court to sue third parties for dues.' }
    ],
    relatedServices: ['gst-registration', 'pan-tan', 'udyam-msme-registration']
  },

  // ==========================================
  // GOVERNMENT REGISTRATIONS
  // ==========================================
  {
    slug: 'gst-registration',
    name: 'GST Registration',
    category: 'Government Registration',
    shortDescription: 'Mandatory Goods and Services Tax identification for interstate commerce, e-commerce, and statutory turnover thresholds.',
    fullDescription: 'GST registration is mandatory for businesses exceeding the prescribed turnover limit (₹40 Lakhs for goods, ₹20 Lakhs for services, or ₹10-20 Lakhs for special category states). It enables you to collect tax legally, claim input tax credit (ITC), and sell seamlessly across India.',
    startingPrice: '₹2,999',
    processingTime: '3-7 Working Days',
    statutoryFeeNote: 'Nil government filing fee; expert consultation and application filing fee only.',
    iconName: 'Receipt',
    featuredOnHome: true,
    metaTitle: 'GST Registration Online — Fast & Error-Free Filing | Regpro',
    metaDescription: 'Get your GST registration done quickly with expert assistance. 100% digital filing, HSN/SAC code selection, and guaranteed ARN tracking with Regpro Bangalore.',
    keywords: [
      'GST registration',
      'GST registration Bangalore',
      'GST certificate online',
      'new GST application',
      'Input Tax Credit GST'
    ],
    benefits: [
      'Legal recognition and credibility across India',
      'Eligible to claim Input Tax Credit (ITC) on all business purchases',
      'Operate freely across state borders without tax hurdles',
      'Build trust with corporate clients, B2B buyers, and large vendors',
      'Required for e-commerce selling on Amazon, Flipkart, Blinkit, and Meesho'
    ],
    whoNeedsIt: [
      'Businesses crossing statutory threshold turnover (₹20L/₹40L)',
      'Anyone selling online via e-commerce marketplaces',
      'Entities supplying goods or services to other states (interstate supply)',
      'Service providers wishing to pass ITC benefits to corporate clients'
    ],
    documentsRequired: [
      'PAN Card and Aadhaar Card of the proprietor/directors/partners',
      'Passport size photograph of the primary applicant',
      'Proof of business address (Electricity bill / Property tax receipt)',
      'Rent agreement and Landlord No Objection Certificate (NOC)',
      'Bank account proof (Cancelled cheque or latest bank statement with IFSC)'
    ],
    processSteps: [
      {
        step: 1,
        title: 'Document Verification',
        description: 'Our tax experts review your KYC and premise documents to eliminate potential Aadhaar/address queries.'
      },
      {
        step: 2,
        title: 'GST Portal Application (TRN/ARN)',
        description: 'Creation of Temporary Reference Number (TRN) and submission of Form GST REG-01 with exact HSN/SAC codes.'
      },
      {
        step: 3,
        title: 'Aadhaar Biometric/OTP Authentication',
        description: 'Quick OTP-based Aadhaar verification of authorized signatory to speed up department approval.'
      },
      {
        step: 4,
        title: 'GST Certificate Issuance',
        description: 'Receive your 15-digit GSTIN and official Form GST REG-06 Certificate within 3-7 working days.'
      }
    ],
    faqs: [
      {
        question: 'Is GST mandatory if I sell goods through Amazon or Flipkart?',
        answer: 'Yes, section 24 of the CGST Act mandates compulsory GST registration for all e-commerce suppliers regardless of annual turnover.'
      },
      {
        question: 'What happens if a clarification notice is issued by the GST officer?',
        answer: 'Our experienced tax team handles notices (REG-03) and submits professional clarifications (REG-04) at no additional charge.'
      },
      {
        question: 'How long does GST registration take?',
        answer: 'With Aadhaar authentication, GSTIN is usually issued within 3-7 working days, subject to jurisdictional officer review.'
      }
    ],
    relatedServices: ['gst-amendment', 'gst-cancellation', 'udyam-msme-registration', 'private-limited-company-registration']
  },
  {
    slug: 'gst-amendment',
    name: 'GST Amendment',
    category: 'Government Registration',
    shortDescription: 'Update your registered business address, add branches, change partners/directors, or modify HSN codes on GST portal.',
    fullDescription: 'Businesses frequently need to update their core and non-core registration particulars. Regpro ensures prompt amendment filing with proper documentary evidence to prevent department show-cause notices.',
    startingPrice: '₹1,999',
    processingTime: '3-5 Working Days',
    statutoryFeeNote: 'Nil government charges.',
    iconName: 'FileEdit',
    featuredOnHome: false,
    metaTitle: 'GST Amendment Online — Core & Non-Core Field Update | Regpro',
    metaDescription: 'Update business address, add additional place of business, change authorized signatory or HSN codes with Regpro GST Amendment services.',
    keywords: ['GST amendment', 'change GST address', 'add branch GST', 'GST update online'],
    benefits: [
      'Avoid statutory penalties for conducting business from unrecorded premises',
      'Smooth addition of warehouses, branches, and retail outlets',
      'Updated tax invoices complying with latest GST rules'
    ],
    whoNeedsIt: [
      'Businesses shifting office or expanding to new branches',
      'Companies changing directors, partners, or authorized representatives'
    ],
    documentsRequired: [
      'Existing GST Certificate (REG-06)',
      'Proof of new address (Electricity bill, Rent agreement, NOC)',
      'Board resolution or authorization letter for changes'
    ],
    processSteps: [
      { step: 1, title: 'Document Collation', description: 'Collect and verify supporting evidence for core/non-core changes.' },
      { step: 2, title: 'Filing Form GST REG-14', description: 'Draft and upload amendment application on GST common portal.' },
      { step: 3, title: 'Department Approval', description: 'Track ARN and obtain revised GST certificate with new details.' }
    ],
    faqs: [
      { question: 'What is the difference between core and non-core amendment?', answer: 'Core amendments (business name, principal place of business, partners/directors) require tax officer approval; non-core amendments are auto-approved.' }
    ],
    relatedServices: ['gst-registration', 'gst-cancellation']
  },
  {
    slug: 'gst-cancellation',
    name: 'GST Cancellation',
    category: 'Government Registration',
    shortDescription: 'Legally surrender or cancel your inactive GST registration to stop monthly return filing and non-compliance fines.',
    fullDescription: 'If you have discontinued business operations or fallen below mandatory thresholds, keeping an active GSTIN incurs continuous late fees on monthly returns. Regpro helps you surrender your GSTIN smoothly with final GSTR-10 support.',
    startingPrice: '₹2,499',
    processingTime: '7-14 Working Days',
    statutoryFeeNote: 'Any outstanding departmental dues or input tax reversal extra.',
    iconName: 'FileX',
    featuredOnHome: false,
    metaTitle: 'GST Cancellation & Surrender Online | Regpro',
    metaDescription: 'Close your GST registration lawfully and avoid monthly late fees. File Form GST REG-16 with Regpro compliance specialists.',
    keywords: ['GST cancellation', 'surrender GST number', 'close GST registration'],
    benefits: [
      'Eliminate recurring late fees on nil monthly return filings',
      'Clean statutory record without pending department demand notices',
      'Complete legal closure of the business tax footprint'
    ],
    whoNeedsIt: [
      'Closed businesses or halted commercial operations',
      'Businesses switching to an alternate legal structure (e.g. Proprietorship to Pvt Ltd)'
    ],
    documentsRequired: [
      'GSTIN login credentials',
      'Stock summary and capital goods inventory details for input tax reversal',
      'Bank statement reflecting cessation of commercial turnover'
    ],
    processSteps: [
      { step: 1, title: 'Reconciliation', description: 'Review pending return filings and calculate input tax reversals on existing stock.' },
      { step: 2, title: 'Filing Form GST REG-16', description: 'Submit cancellation application with exact reasons and supporting proof.' },
      { step: 3, title: 'Cancellation Order', description: 'Obtain department order Form GST REG-19 confirming cancellation.' }
    ],
    faqs: [
      { question: 'Do I still need to file GSTR-10 final return after cancellation?', answer: 'Yes, a final return (Form GSTR-10) must be filed within 3 months of the cancellation order date.' }
    ],
    relatedServices: ['gst-registration']
  },
  {
    slug: 'udyam-msme-registration',
    name: 'Udyam / MSME Registration',
    category: 'Government Registration',
    shortDescription: 'Unlock government subsidies, priority sector bank loans, lower interest rates, and 50% discount on trademarks.',
    fullDescription: 'Udyam Registration is the official Indian government certificate recognizing Micro, Small, and Medium Enterprises. It grants key benefits including collateral-free bank loans under CGTMSE, protection against delayed payments under MSME Samadhaan, and massive statutory fee concessions.',
    startingPrice: '₹1,999',
    processingTime: '1-2 Working Days',
    statutoryFeeNote: 'Nil government registration fee.',
    iconName: 'Award',
    featuredOnHome: true,
    metaTitle: 'Udyam MSME Registration Online — Fast Certificate | Regpro',
    metaDescription: 'Register your business for Udyam MSME in India. Enjoy collateral-free loan eligibility, delayed payment protection, and 50% trademark fee discount.',
    keywords: ['Udyam registration', 'MSME registration', 'MSME certificate Bangalore', 'Udyam certificate download'],
    benefits: [
      '50% discount on government trademark filing fees',
      'Priority sector bank lending with lower interest rates',
      'Protection against delayed payments under MSME Samadhaan (compulsory interest)',
      'Subsidies on patent registration and ISO certification expenses',
      'Concession on electricity bills and tender security deposits'
    ],
    whoNeedsIt: [
      'All micro, small, and medium service providers and manufacturing enterprises',
      'D2C brands, freelancers, agencies, and retail shops'
    ],
    documentsRequired: [
      'Aadhaar Card of proprietor / director',
      'PAN Card of the applicant entity or proprietor',
      'Bank Account details (Account number and IFSC)',
      'NIC business activity classification & number of employees'
    ],
    processSteps: [
      { step: 1, title: 'Information Verification', description: 'Verify Aadhaar linked mobile and NIC 4-digit/5-digit activity codes.' },
      { step: 2, title: 'Udyam Portal Submission', description: 'Submit online application integrating enterprise investment and turnover records.' },
      { step: 3, title: 'Certificate Delivery', description: 'Immediate issuance of lifetime Udyam Registration Certificate with QR verification.' }
    ],
    faqs: [
      { question: 'Is Udyam registration valid for a lifetime?', answer: 'Yes, Udyam Registration is valid for a lifetime and does not require periodic renewal.' }
    ],
    relatedServices: ['trademark-registration', 'gst-registration', 'dpiit-startup-india-recognition']
  },
  {
    slug: 'dpiit-startup-india-recognition',
    name: 'DPIIT / Startup India Recognition',
    category: 'Government Registration',
    shortDescription: 'Official recognition under Startup India for Section 80-IAC 3-year tax holidays, angel tax exemption, and seed fund eligibility.',
    fullDescription: 'Department for Promotion of Industry and Internal Trade (DPIIT) recognition gives innovative startups access to government funding schemes, incubation support, self-certification under 9 environmental & labor laws, and 80-IAC income tax exemptions.',
    startingPrice: '₹2,999',
    processingTime: '5-7 Working Days',
    statutoryFeeNote: 'Nil government charges.',
    iconName: 'Rocket',
    featuredOnHome: true,
    metaTitle: 'DPIIT Startup India Recognition Certificate | Regpro',
    metaDescription: 'Get your DPIIT recognition certificate under Startup India initiative. Qualify for 3-year income tax holiday, Seed Fund Scheme, and fast-track IPR.',
    keywords: ['DPIIT registration', 'Startup India recognition', '80 IAC tax exemption', 'Startup India certificate'],
    benefits: [
      'Eligibility for 3-year complete income tax holiday under Section 80-IAC',
      'Exemption from Angel Tax under Section 56(2)(viib)',
      'Fast-track patent applications with 80% government fee rebate',
      'Access to Startup India Seed Fund Scheme (SISFS) grants and debt',
      'Relaxation in public procurement norms (prior experience & turnover waived)'
    ],
    whoNeedsIt: [
      'Private Limited Companies and LLPs incorporated within the last 10 years',
      'Startups with an innovative, scalable product, service, or business model'
    ],
    documentsRequired: [
      'Certificate of Incorporation / Registration',
      'Brief presentation / Pitch Deck on business scalability and innovation',
      'Website or product demo link',
      'Founder brief and list of awards / patent filings if any'
    ],
    processSteps: [
      { step: 1, title: 'Eligibility Screening', description: 'Evaluate innovation criteria, scalability quotient, and entity incorporation timeline.' },
      { step: 2, title: 'Application Dossier Drafting', description: 'Draft comprehensive innovation brief, market problem statement, and employment potential.' },
      { step: 3, title: 'DPIIT Submission', description: 'Submit via National Startup Portal and track evaluation.' },
      { step: 4, title: 'Certificate Delivery', description: 'Receive official DPIIT Recognition Certificate with unique DIPP number.' }
    ],
    faqs: [
      { question: 'Can a Sole Proprietorship apply for DPIIT recognition?', answer: 'No. DPIIT recognition is strictly restricted to Private Limited Companies, LLPs, and Registered Partnership Firms.' }
    ],
    relatedServices: ['private-limited-company-registration', 'trademark-registration', 'udyam-msme-registration']
  },
  {
    slug: 'iec-registration',
    name: 'IEC Registration',
    category: 'Government Registration',
    shortDescription: 'Mandatory 10-digit Import Export Code issued by DGFT to conduct international trade and receive foreign remittances.',
    fullDescription: 'Import Export Code (IEC) is mandatory for any commercial entity exporting goods or services outside India or importing goods. Issued by the Directorate General of Foreign Trade (DGFT), it has lifetime validity with simple annual digital updation.',
    startingPrice: '₹2,499',
    processingTime: '1-3 Working Days',
    statutoryFeeNote: 'DGFT government filing fee ₹500 extra.',
    iconName: 'Globe',
    featuredOnHome: false,
    metaTitle: 'IEC Registration Online — Import Export Code DGFT | Regpro',
    metaDescription: 'Apply for Import Export Code (IEC) with DGFT online. Fast verification, lifetime validity, and expert assistance for exporters and importers.',
    keywords: ['IEC registration', 'Import export code online', 'DGFT IEC application Bangalore'],
    benefits: [
      'Lifetime validity with no recurring renewal fees',
      'Mandatory for opening foreign currency EEFC accounts and receiving global payments',
      'Eligible for export promotion schemes (RoDTEP, EPCG)',
      'No compliance filings except quick annual confirmation'
    ],
    whoNeedsIt: [
      'Exporters of goods and cross-border software/consulting services',
      'Importers of raw materials, electronics, and machinery'
    ],
    documentsRequired: [
      'PAN Card and Aadhaar Card of Proprietor/Director',
      'Bank Certificate or pre-printed Cancelled Cheque',
      'Business address proof (Electricity bill or lease deed)'
    ],
    processSteps: [
      { step: 1, title: 'DGFT Profile Setup', description: 'Create authorized entity profile on DGFT digital portal.' },
      { step: 2, title: 'ANF 2A Filing', description: 'Upload verified KYC, bank account details, and pay statutory fee.' },
      { step: 3, title: 'Instant e-IEC Issuance', description: 'Download your digital IEC certificate recognized across Indian customs.' }
    ],
    faqs: [
      { question: 'Do software service exporters need an IEC code?', answer: 'Yes, an IEC is required if you are availing export incentives or when banks request your IEC for processing inward foreign remittances (FIRC).' }
    ],
    relatedServices: ['gst-registration', 'fssai-registration', 'trademark-registration']
  },
  {
    slug: 'fssai-registration',
    name: 'FSSAI Registration',
    category: 'Government Registration',
    shortDescription: '14-digit food safety license mandatory for all food business operators, clouds kitchens, restaurants, and packaged food brands.',
    fullDescription: 'Food Safety and Standards Authority of India (FSSAI) registration/license is compulsory for any business handling, processing, packaging, manufacturing, or selling food items. It ensures consumer safety, builds market credibility, and is mandatory for Swiggy, Zomato, and retail distribution.',
    startingPrice: '₹4,999',
    processingTime: '5-10 Working Days',
    statutoryFeeNote: 'Government FSSAI statutory fees extra as per category (Basic / State / Central).',
    iconName: 'Utensils',
    featuredOnHome: true,
    metaTitle: 'FSSAI Food License Registration Online | Regpro',
    metaDescription: 'Apply for FSSAI registration and food license online. 100% compliance for restaurants, cloud kitchens, D2C food brands, and grocery stores with Regpro.',
    keywords: ['FSSAI registration', 'food license online', 'FSSAI food license Bangalore', 'FSSAI certificate for Swiggy Zomato'],
    benefits: [
      'Mandatory for onboarding on Swiggy, Zomato, Blinkit, and Zepto',
      'Display official 14-digit FSSAI logo to build customer trust',
      'Avoid severe penalties and shop closure notices under Food Safety Act',
      'Expansion into large supermarket shelves and export channels'
    ],
    whoNeedsIt: [
      'Restaurants, cafes, cloud kitchens, and bakery owners',
      'D2C packaged snack and beverage brands',
      'Wholesalers, food distributors, and dairy operators'
    ],
    documentsRequired: [
      'Photo identity proof of food business operator',
      'Proof of business location premises (Rent agreement & Electricity bill)',
      'Food safety management plan & list of food product categories',
      'Water testing report (for manufacturing/beverage units)'
    ],
    processSteps: [
      { step: 1, title: 'Category Classification', description: 'Determine whether your business requires Basic, State, or Central license.' },
      { step: 2, title: 'FoSCoS Portal Submission', description: 'File Form A/B on the Food Safety Compliance System with product breakdown.' },
      { step: 3, title: 'Inspection & Approval', description: 'Liaise with food safety officers and obtain 14-digit registration certificate.' }
    ],
    faqs: [
      { question: 'What is the validity period of an FSSAI license?', answer: 'You can choose validity from 1 to 5 years. It can be easily renewed before expiration.' }
    ],
    relatedServices: ['gst-registration', 'shop-and-establishment-registration', 'trademark-registration']
  },
  {
    slug: 'shop-and-establishment-registration',
    name: 'Shop & Establishment Registration',
    category: 'Government Registration',
    shortDescription: 'State labor department registration mandatory for commercial offices, shops, and establishment premises (Gumasta / Trade License).',
    fullDescription: 'The Shop and Establishment Act certificate is mandatory for every commercial office, retail outlet, and tech agency. It regulates working hours, employee welfare, and serves as vital basic legal proof for opening current bank accounts.',
    startingPrice: '₹2,499',
    processingTime: '3-5 Working Days',
    statutoryFeeNote: 'State government labor department challan fees extra.',
    iconName: 'Store',
    featuredOnHome: false,
    metaTitle: 'Shop and Establishment Registration Online (Gumasta) | Regpro',
    metaDescription: 'Get Shop & Establishment Act registration for your office or shop. Fast labor department filing for commercial banks and local licenses with Regpro.',
    keywords: ['Shop and establishment registration', 'Gumasta license', 'trade license Bangalore', 'e-karmika registration'],
    benefits: [
      'Mandatory legal proof to open a commercial current bank account',
      'Proof of legal establishment for local municipal authorities',
      'Allows business to operate seamlessly within city labor regulations'
    ],
    whoNeedsIt: [
      'Physical retail shops, corporate offices, warehouses, and IT studios',
      'Proprietors who need commercial business proof for banking'
    ],
    documentsRequired: [
      'PAN and Aadhaar Card of employer',
      'Rental agreement and utility bill of commercial address',
      'Details of employees and working hours',
      'Name board photograph of the business in English and regional language'
    ],
    processSteps: [
      { step: 1, title: 'State Portal Filing', description: 'Submit applicant details, employee count, and premise photographs on state labor portal.' },
      { step: 2, title: 'Fee Payment & Scrutiny', description: 'Pay state treasury challan and clear inspector verification.' },
      { step: 3, title: 'Certificate Download', description: 'Download authenticated Shop & Establishment certificate.' }
    ],
    faqs: [
      { question: 'Is it required even if I work from home or have zero employees?', answer: 'Yes, most states mandate registration for commercial operations even with zero employees.' }
    ],
    relatedServices: ['gst-registration', 'pan-tan', 'udyam-msme-registration']
  },
  {
    slug: 'pan-tan',
    name: 'PAN / TAN',
    category: 'Government Registration',
    shortDescription: 'Permanent Account Number and Tax Deduction Account Number application and correction for businesses and individuals.',
    fullDescription: 'PAN is essential for financial identity and tax filing in India. TAN is mandatory for any business entity that deducts tax at source (TDS) on salaries, contractor payments, or rent.',
    startingPrice: '₹1,499',
    processingTime: '2-4 Working Days',
    statutoryFeeNote: 'NSDL / UTI statutory processing fee extra.',
    iconName: 'CreditCard',
    featuredOnHome: false,
    metaTitle: 'PAN & TAN Registration Online for Businesses | Regpro',
    metaDescription: 'Apply for business PAN and TAN online. Fast NSDL/UTIITSL processing, paperless Aadhaar verification, and corporate tax compliance support by Regpro.',
    keywords: ['PAN application online', 'TAN registration India', 'TDS TAN number application'],
    benefits: [
      'Comply with TDS deduction and quarterly filing requirements',
      'Avoid high penalty of ₹10,000 under section 272BB for non-possession of TAN',
      'Essential for corporate bank accounts, investments, and government tenders'
    ],
    whoNeedsIt: [
      'Businesses paying employee salaries, consultant fees, or property rent exceeding TDS limits',
      'New partnership firms, trusts, and commercial entities'
    ],
    documentsRequired: [
      'Identity and address proof of applicant / entity registration deed',
      'Authorized signatory authorization letter and PAN'
    ],
    processSteps: [
      { step: 1, title: 'Form 49A / 49B Drafting', description: 'Accurate data compilation and category classification.' },
      { step: 2, title: 'NSDL / UTI Filing', description: 'Submit digital application with statutory fees.' },
      { step: 3, title: 'Allotment', description: 'Allotment of 10-digit alphanumeric PAN / TAN within 2-4 working days.' }
    ],
    faqs: [
      { question: 'Why do I need TAN if I already have PAN?', answer: 'PAN is for paying direct income tax, while TAN is exclusively for deducting tax at source (TDS) and issuing Form 16/16A.' }
    ],
    relatedServices: ['gst-registration', 'partnership-firm-registration']
  },
  {
    slug: 'digital-signature-certificate-dsc',
    name: 'Digital Signature Certificate (DSC)',
    category: 'Government Registration',
    shortDescription: 'Class 3 Digital Signature Certificate with secure USB cryptographic e-token for MCA, GST, Income Tax, and e-Tendering.',
    fullDescription: 'A Class 3 Digital Signature Certificate (DSC) provides the highest level of cryptographic security for signing electronic documents, filing MCA company forms, signing GST returns, and submitting e-Tenders.',
    startingPrice: '₹1,999',
    processingTime: 'Same Day / 24 Hours',
    statutoryFeeNote: 'Includes high-security USB cryptographic token and 2-year validity.',
    iconName: 'Key',
    featuredOnHome: false,
    metaTitle: 'Class 3 DSC Online — Digital Signature Certificate | Regpro',
    metaDescription: 'Buy Class 3 Digital Signature Certificate (DSC) with USB Token online. Fast video KYC verification, same-day approval for MCA, GST, and e-Tenders.',
    keywords: ['Class 3 DSC online', 'Digital signature certificate Bangalore', 'e-token DSC buy online'],
    benefits: [
      'Mandatory for all MCA company incorporations and statutory filings',
      'High-security encryption legally recognized under the Information Technology Act',
      'Compatible with Income Tax, GST, EPFO, and Government e-Procurement portals',
      'High-durability FIPS-certified USB crypto token included'
    ],
    whoNeedsIt: [
      'Directors, Partners, Company Secretaries, and Chartered Accountants',
      'Government contractors and vendors participating in e-tendering'
    ],
    documentsRequired: [
      'PAN Card and Aadhaar Card',
      'Mobile number linked with Aadhaar for OTP verification',
      '30-second video recording for instant e-KYC verification'
    ],
    processSteps: [
      { step: 1, title: 'Paperless e-KYC', description: 'Submit Aadhaar OTP or paperless offline XML.' },
      { step: 2, title: 'Quick Video Verification', description: 'Record a quick 30-second mobile video verification.' },
      { step: 3, title: 'Token Dispatch / Delivery', description: 'DSC certificate downloaded into crypto token and couriered to your door.' }
    ],
    faqs: [
      { question: 'What is the validity of the DSC?', answer: 'We issue Class 3 DSCs with 2-year validity, which can be effortlessly renewed thereafter.' }
    ],
    relatedServices: ['private-limited-company-registration', 'llp-registration']
  },

  // ==========================================
  // OTHER SERVICES
  // ==========================================
  {
    slug: 'trademark-registration',
    name: 'Trademark Registration',
    category: 'Other Services',
    shortDescription: 'Protect your brand name, logo, and slogan with exclusive legal rights and use the prestigious ™ and ® symbols.',
    fullDescription: 'Your brand name and logo are your most valuable corporate assets. Trademark registration grants you exclusive legal ownership across India, prevents copycats from profiting off your reputation, and allows you to use the respected ™ and ® symbols.',
    startingPrice: '₹4,999',
    processingTime: '24-48 Hours (Application)',
    statutoryFeeNote: 'Government filing fee ₹4,500 (for MSME/Individuals) or ₹9,000 (for others) charged separately.',
    iconName: 'ShieldCheck',
    featuredOnHome: true,
    metaTitle: 'Trademark Registration Online India — Brand Protection | Regpro',
    metaDescription: 'Register your brand name & logo online with Regpro. Comprehensive trademark search, Vienna codification, Class 1-45 filing, and objection handling.',
    keywords: [
      'trademark registration',
      'brand registration India',
      'logo trademark Bangalore',
      'trademark search report',
      'trademark filing online'
    ],
    benefits: [
      'Exclusive ownership and nationwide protection against infringers',
      'Start using the prestigious ™ symbol within 24 hours of filing',
      '50% discount on government fees when combined with our Udyam MSME certificate',
      'Crucial for Brand Registry on Amazon, Flipkart, and digital marketplaces',
      'Valuable intellectual property that increases company enterprise valuation'
    ],
    whoNeedsIt: [
      'Any startup, business, or creator launching a unique brand name or logo',
      'E-commerce sellers protecting private label products from hijackers'
    ],
    documentsRequired: [
      'Brand name, logo artwork, or slogan',
      'PAN and Aadhaar of the applicant',
      'Udyam MSME Certificate (to avail 50% government fee concession)',
      'Signed Form TM-48 (Authorization of Trademark Attorney)'
    ],
    processSteps: [
      {
        step: 1,
        title: 'Comprehensive Trademark Search',
        description: 'We run deep searches on the official IP India registry across relevant Nice classes to ensure zero conflicts.'
      },
      {
        step: 2,
        title: 'Class Selection & Drafting',
        description: 'Our IP attorneys classify your products/services under appropriate classes (1 to 45) and draft user affidavit.'
      },
      {
        step: 3,
        title: 'Online Filing (Form TM-A)',
        description: 'Instant submission on the Controller General of Patents, Designs and Trademarks portal.'
      },
      {
        step: 4,
        title: 'Instant TM Application Number',
        description: 'Get your official application number and start using ™ next to your brand name immediately.'
      }
    ],
    faqs: [
      {
        question: 'When can I start using the ™ symbol?',
        answer: 'You can legally use the ™ symbol immediately upon getting the application receipt number (within 24 hours). The ® symbol is used after official registration certificate issuance.'
      },
      {
        question: 'How does Udyam MSME save money on trademark registration?',
        answer: 'The statutory government fee for corporate entities is ₹9,000 per class, but with an Udyam certificate, the government fee drops by 50% to just ₹4,500.'
      }
    ],
    relatedServices: ['udyam-msme-registration', 'private-limited-company-registration', 'gst-registration']
  }
];

export const getServiceBySlug = (slug: string): ServiceItem | undefined => {
  return servicesData.find(service => service.slug === slug);
};

export const getServicesByCategory = (category: string): ServiceItem[] => {
  if (category === 'All Services') return servicesData;
  return servicesData.filter(service => service.category === category);
};

export const getFeaturedServices = (): ServiceItem[] => {
  return servicesData.filter(service => service.featuredOnHome);
};

