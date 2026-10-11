import { CompanyConfig } from '../types';

export const companyConfig: CompanyConfig = {
  name: 'Regpro',
  tagline: 'Start, Register and Grow Your Business with Regpro',
  subtagline: 'Your Growth. Our Support.',
  // Placeholders that can be overridden via environment variables or easily modified here
  phone: '+919606030573',
  phoneDisplay: '+91 96060 30573',
  whatsappNumber: '919606030573',
  whatsappMessage: 'Hi Regpro! I would like to get a free consultation for business registration and compliance services.',
  email: 'hello@regpro.in',
  address: 'Indiranagar, 100 Feet Road',
  city: 'Bangalore',
  country: 'India',
  officeHours: 'Monday - Saturday: 9:00 AM - 7:00 PM IST',
  
  // Tracking integration hooks (set your measurement IDs when ready)
  googleAnalyticsId: import.meta.env.VITE_GA_TRACKING_ID || 'G-PLACEHOLDER',
  metaPixelId: import.meta.env.VITE_META_PIXEL_ID || 'PIXEL-PLACEHOLDER',

  // Verified trust metrics as shown in design reference
  trustStats: [
    {
      value: '5,000+',
      label: 'Businesses Supported',
      caption: 'Trusted by founders across India',
    },
    {
      value: '99%',
      label: 'Client Satisfaction',
      caption: 'Consistently rated 5 stars for transparency',
    },
    {
      value: '24/7',
      label: 'Expert Support',
      caption: 'Dedicated CA & CS assistance throughout',
    },
    {
      value: 'India-wide',
      label: 'Service Availability',
      caption: '100% digital paperwork across all states',
    },
  ],
};

export const getWhatsAppLink = (customText?: string) => {
  const text = customText || companyConfig.whatsappMessage;
  return `https://wa.me/${companyConfig.whatsappNumber}?text=${encodeURIComponent(text)}`;
};

export const getPhoneLink = () => {
  return `tel:${companyConfig.phone}`;
};

