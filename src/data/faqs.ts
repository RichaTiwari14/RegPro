export interface CategorizedFAQ {
  category: string;
  items: {
    question: string;
    answer: string;
  }[];
}

export const globalFAQs: CategorizedFAQ[] = [
  {
    category: 'General & Getting Started',
    items: [
      {
        question: 'What is Regpro and how do you help businesses in India?',
        answer: 'Regpro is a dedicated business registration, government documentation, and compliance assistance platform. We help startups, entrepreneurs, professionals, and SMEs across India incorporate corporate entities, obtain tax registrations like GST, protect trademarks, and maintain full statutory compliance with ease.'
      },
      {
        question: 'Do I need to visit any government office in person?',
        answer: 'No, not at all! 100% of our registration processes are handled digitally. You only need to share scanned copies or photographs of your documents online through our secure portal or WhatsApp. Our licensed team handles all government filings and delivers your certificates digitally.'
      },
      {
        question: 'How do I track the status of my application?',
        answer: 'You receive timely real-time updates directly on WhatsApp and email at every milestone (e.g. Name Approval, Application Submission, ARN generation, and Certificate Issuance).'
      }
    ]
  },
  {
    category: 'Business Registration (Pvt Ltd, LLP, OPC)',
    items: [
      {
        question: 'What is the main difference between Private Limited and LLP?',
        answer: 'A Private Limited Company has share capital and is required if you plan to raise angel or venture capital funding, issue employee stock options (ESOPs), or build a scalable startup. An LLP is more suited for professional service businesses, consulting firms, and partners who want limited liability with significantly lower annual compliance requirements and zero mandatory statutory audits if turnover is under ₹40 Lakhs.'
      },
      {
        question: 'Can I start a company from a rented residential address?',
        answer: 'Yes! A commercial office is not required for incorporation. You can register your company using a rented residential apartment or even your own home, provided you have a recent electricity bill, rent agreement, and an NOC from the landlord.'
      },
      {
        question: 'How long does company incorporation usually take?',
        answer: 'Typically 7 to 10 working days, provided all KYC identity documents and name choices are readily available and approved by the Ministry of Corporate Affairs (MCA).'
      }
    ]
  },
  {
    category: 'GST & Government Registrations',
    items: [
      {
        question: 'When is GST registration mandatory?',
        answer: 'GST registration is legally mandatory if your annual turnover exceeds ₹40 Lakhs for goods (₹20 Lakhs for services in regular states), or if you sell products/services interstate, or if you sell through e-commerce marketplaces like Amazon, Flipkart, Swiggy, or Zomato, irrespective of turnover.'
      },
      {
        question: 'What is Udyam MSME registration and why should I get it?',
        answer: 'Udyam Registration is the official recognition given by the Ministry of MSME. It is 100% free from government charges and gives you massive benefits such as priority sector collateral-free bank loans, 50% discount on government trademark filing fees, and protection against client delayed payments.'
      },
      {
        question: 'Can I get DPIIT Startup India recognition for an existing partnership firm?',
        answer: 'Only registered entities (Private Limited Company, LLP, or Registered Partnership Firm) incorporated within the last 10 years with an innovative product or scalable model are eligible for DPIIT Startup India recognition.'
      }
    ]
  },
  {
    category: 'Pricing & Government Statutory Fees',
    items: [
      {
        question: 'Are government statutory fees included in the starting prices shown?',
        answer: 'Our displayed prices are transparent starting estimates for professional consultation, drafting, documentation, and filing. Government and statutory fees (such as MCA stamp duties, ROF fees, or Trademark government fees) vary based on state, entity type, and authorized capital, and are charged separately with zero markup.'
      },
      {
        question: 'Are there any hidden charges?',
        answer: 'None! We believe in 100% transparent pricing. Before initiating any filing, our advisors provide you with an exact written breakdown of professional charges and exact statutory government fees.'
      }
    ]
  }
];

export const homepageFAQs = globalFAQs.flatMap(cat => cat.items).slice(0, 6);

