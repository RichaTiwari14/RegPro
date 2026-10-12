/**
 * Service-page details that sit alongside the core service data in services.ts:
 * page image, eligibility / key considerations, processing-time dependencies and
 * the government-fee note. Keyed by service slug.
 *
 * Keep this factual. Requirements change — have a professional review before publishing,
 * and update here (no page code needs to change).
 */
export interface ServiceDetail {
  image: string;
  imageAlt: string;
  considerations: string[];
  processingNote: string;
  govtFeeNote: string;
  /** Show "Get a quote" alongside the starting price (variable pricing). */
  quote?: boolean;
}

const img = (slug: string) => `/assets/services/${slug}.webp`;

export const serviceDetails: Record<string, ServiceDetail> = {
  'private-limited-company-registration': {
    image: img('private-limited-company-registration'),
    imageAlt: 'A modern corporate office building',
    considerations: [
      'At least 2 directors and 2 shareholders are required (the same people can be both); a private company can have up to 200 members.',
      'At least one director must be resident in India.',
      'Every director needs a Digital Signature Certificate and a Director Identification Number.',
      'The proposed name must be unique and follow the MCA naming guidelines.',
      'A registered office address in India is required; there is no minimum paid-up capital.',
    ],
    processingNote:
      'Timelines depend on MCA name approval, document verification and any resubmissions requested by the Registrar of Companies.',
    govtFeeNote: 'Government fees and stamp duty depend on the state and authorised capital, and are charged at actuals.',
  },
  'llp-registration': {
    image: img('llp-registration'),
    imageAlt: 'Two business partners discussing an LLP agreement',
    considerations: [
      'At least 2 designated partners are required, and at least one must be resident in India.',
      'Designated partners need a Digital Signature Certificate and a DIN/DPIN.',
      'The LLP agreement must be filed with the Registrar within 30 days of incorporation.',
      'There is no minimum capital contribution.',
    ],
    processingNote: 'Timelines depend on name approval and MCA processing of the incorporation form.',
    govtFeeNote: 'Government fees and stamp duty depend on the state and capital contribution, and are charged at actuals.',
  },
  'opc-registration': {
    image: img('opc-registration'),
    imageAlt: 'A solo founder working on a laptop',
    considerations: [
      'Only a natural person who is an Indian citizen can incorporate an OPC.',
      'A nominee must be named, who takes over if the member is unable to continue.',
      'A person can be a member of only one OPC at a time.',
      'The director needs a Digital Signature Certificate and a DIN.',
    ],
    processingNote: 'Timelines depend on MCA name approval and document verification.',
    govtFeeNote: 'Government fees and stamp duty depend on the state and authorised capital, and are charged at actuals.',
  },
  'partnership-firm-registration': {
    image: img('partnership-firm-registration'),
    imageAlt: 'Two business partners shaking hands',
    considerations: [
      'A partnership needs at least 2 partners and a partnership deed on stamp paper.',
      'Registration with the Registrar of Firms is optional, but an unregistered firm cannot sue third parties to enforce contractual rights.',
      'Stamp duty and the registration procedure vary from state to state.',
    ],
    processingNote: 'Registration timelines depend on the state Registrar of Firms.',
    govtFeeNote: 'Stamp duty and Registrar of Firms fees vary by state and are charged at actuals.',
  },
  'gst-registration': {
    image: img('gst-registration'),
    imageAlt: 'GST letter blocks on a desk beside a laptop and plant',
    considerations: [
      'Registration is required once aggregate turnover crosses the prescribed threshold — generally ₹40 lakh for goods and ₹20 lakh for services, with lower limits in some special-category states.',
      'Some businesses must register regardless of turnover — for example inter-state suppliers of goods and certain e-commerce sellers.',
      'A PAN is required, and promoters complete Aadhaar authentication or physical verification.',
      'Proof of the principal place of business is required.',
    ],
    processingNote:
      'Approval depends on the GST department. If Aadhaar authentication is not opted for, or the officer raises a query, it can take longer.',
    govtFeeNote: 'There is no government fee for GST registration.',
  },
  'gst-amendment': {
    image: img('gst-amendment'),
    imageAlt: 'An accountant updating business records',
    considerations: [
      'Changes should generally be applied for within 15 days of the change.',
      'Core fields (legal name, principal place of business, partners or directors) need approval from the GST officer.',
      'Non-core changes (such as contact details) are usually updated without approval.',
    ],
    processingNote: 'Core-field amendments depend on GST officer approval; queries can extend timelines.',
    govtFeeNote: 'There is no government fee for a GST amendment.',
  },
  'gst-cancellation': {
    image: img('gst-cancellation'),
    imageAlt: 'Closed ledgers and folders on a desk',
    considerations: [
      'Pending GST returns should be filed before applying for cancellation.',
      'Tax may be payable on stock held and capital goods on the date of cancellation.',
      'A final return (GSTR-10) must be filed within three months of the cancellation order.',
    ],
    processingNote: 'Timelines depend on GST officer review of the cancellation application.',
    govtFeeNote: 'There is no government fee for cancellation; any tax liability on stock is payable separately.',
  },
  'udyam-msme-registration': {
    image: img('udyam-msme-registration'),
    imageAlt: 'A small manufacturer inspecting products',
    considerations: [
      'Classification as micro, small or medium is based on investment in plant & machinery or equipment and on turnover.',
      'The Aadhaar of the proprietor, managing partner or authorised signatory is required, along with the PAN of the enterprise where applicable.',
      'Registration on the official Udyam portal is free; our fee covers assistance only.',
    ],
    processingNote: 'Udyam registration is usually quick once details and Aadhaar OTP verification are complete.',
    govtFeeNote: 'There is no government fee — registration on the official Udyam portal is free.',
  },
  'dpiit-startup-india-recognition': {
    image: img('dpiit-startup-india-recognition'),
    imageAlt: 'A startup founder presenting a growth plan to two colleagues',
    considerations: [
      'The entity must be a Private Limited Company, LLP or registered partnership firm.',
      'It must be no more than 10 years old from the date of incorporation.',
      'Annual turnover must not have exceeded ₹100 crore in any financial year.',
      'It must be working towards innovation or improvement of products, services or processes, or have a scalable business model.',
      'It must not have been formed by splitting up or reconstructing an existing business.',
    ],
    processingNote: 'Recognition depends on DPIIT review of the application and supporting write-up.',
    govtFeeNote: 'There is no government fee for DPIIT recognition.',
  },
  'iec-registration': {
    image: img('iec-registration'),
    imageAlt: 'An exporter checking cartons in a warehouse',
    considerations: [
      'An IEC is linked to the PAN of the business.',
      'A bank account in the name of the business is required.',
      'The IEC must be updated on the DGFT portal every year, even if nothing has changed.',
    ],
    processingNote: 'IEC is issued by the DGFT once the online application and payment are complete.',
    govtFeeNote: 'The DGFT application fee is payable in addition to our fee.',
  },
  'fssai-registration': {
    image: img('fssai-registration'),
    imageAlt: 'A food business owner in a commercial kitchen',
    considerations: [
      'Basic registration, a State licence or a Central licence applies depending on turnover, capacity and type of activity.',
      'Proof of premises, details of food categories and owner identity documents are required.',
      'Some categories need additional documents, such as a food safety management plan or water test report.',
    ],
    processingNote: 'Timelines depend on the licence type and whether the authority schedules an inspection.',
    govtFeeNote: 'The FSSAI government fee depends on the licence type and tenure and is charged separately.',
    quote: true,
  },
  'shop-establishment-registration': {
    image: img('shop-establishment-registration'),
    imageAlt: 'A shop owner at the counter of a retail store',
    considerations: [
      'Registration is governed by each state’s Shops & Establishments Act — rules and timelines vary by state.',
      'Fees often depend on the number of employees.',
      'Proof of the business premises and identity documents are required.',
    ],
    processingNote: 'Processing time depends on the state labour department.',
    govtFeeNote: 'State government fees vary by state and employee count, and are charged at actuals.',
    quote: true,
  },
  'pan-tan': {
    image: img('pan-tan'),
    imageAlt: 'A professional organising tax paperwork',
    considerations: [
      'A PAN is needed for the business entity to open bank accounts and file taxes.',
      'A TAN is required by anyone who deducts or collects tax at source (TDS/TCS).',
      'Proof of identity and address of the entity and its authorised signatory are required.',
    ],
    processingNote: 'Allotment timelines depend on the Income Tax Department’s processing.',
    govtFeeNote: 'The government application fee is payable in addition to our fee.',
  },
  'digital-signature-certificate': {
    image: img('digital-signature-certificate'),
    imageAlt: 'Signing a document digitally with a USB token',
    considerations: [
      'Class 3 DSCs are issued by licensed Certifying Authorities.',
      'The applicant must complete identity verification, typically with an Aadhaar-based or video process.',
      'A DSC is valid for a fixed period (commonly 1–3 years) and must be renewed.',
    ],
    processingNote: 'Issued once the Certifying Authority completes verification.',
    govtFeeNote: 'The price of the USB token, if required, may be extra.',
  },
  'trademark-registration': {
    image: img('trademark-registration'),
    imageAlt: 'A designer reviewing a brand identity board',
    considerations: [
      'A trademark is filed in one or more classes that match your goods or services.',
      'The ™ symbol can be used after filing; ® can be used only after registration.',
      'The application is examined and may receive objections or oppositions that need a response.',
      'A registered trademark is valid for 10 years and can be renewed.',
    ],
    processingNote:
      'Filing is quick, but registration depends on examination, objections and oppositions at the Trade Marks Registry and can take several months.',
    govtFeeNote: 'The government fee is per class and depends on the applicant type; it is payable in addition to our fee.',
    quote: true,
  },
};

/** Old URLs that should redirect to the current slug. */
export const legacySlugs: Record<string, string> = {
  'dpiit-startup-india-registration': 'dpiit-startup-india-recognition',
  'pan-tan-registration': 'pan-tan',
};
