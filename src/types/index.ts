export type ServiceCategory = 
  | 'Business Registration' 
  | 'Government Registration' 
  | 'Other Services';

export interface ProcessStep {
  step: number;
  title: string;
  description: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface ServiceItem {
  slug: string;
  name: string;
  category: ServiceCategory;
  shortDescription: string;
  fullDescription: string;
  startingPrice: string;
  processingTime: string;
  statutoryFeeNote?: string;
  iconName: string;
  featuredOnHome?: boolean;
  benefits: string[];
  whoNeedsIt: string[];
  documentsRequired: string[];
  processSteps: ProcessStep[];
  faqs: FAQItem[];
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  relatedServices?: string[];
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  company?: string;
  rating: number;
  quote: string;
  avatarUrl: string;
}

export interface CompanyConfig {
  name: string;
  tagline: string;
  subtagline: string;
  phone: string;
  phoneDisplay: string;
  whatsappNumber: string;
  whatsappMessage: string;
  email: string;
  address: string;
  city: string;
  country: string;
  officeHours: string;
  googleAnalyticsId: string;
  metaPixelId: string;
  trustStats: {
    label: string;
    value: string;
    caption: string;
  }[];
}

