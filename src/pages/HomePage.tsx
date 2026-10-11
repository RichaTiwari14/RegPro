import React from 'react';
import { SEO } from '../components/common/SEO';
import { HeroSection } from '../components/home/HeroSection';
import { TrustIndicators } from '../components/home/TrustIndicators';
import { ServicesGrid } from '../components/home/ServicesGrid';
import { WhyChooseUs } from '../components/home/WhyChooseUs';
import { ProcessSection } from '../components/home/ProcessSection';
import { TestimonialsSection } from '../components/home/TestimonialsSection';
import { HomeFaqSection } from '../components/home/HomeFaqSection';
import { CtaBanner } from '../components/home/CtaBanner';

interface HomePageProps {
  onOpenConsultation: (serviceName?: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onOpenConsultation }) => {
  return (
    <>
      <SEO
        title="Regpro — Start, Register and Grow Your Business with Regpro"
        description="End-to-end support for company registration, GST registration, MSME/Udyam, DPIIT Startup India, and government compliance across India."
        keywords={[
          'GST registration',
          'GST registration Bangalore',
          'MSME registration',
          'Udyam registration',
          'DPIIT registration',
          'Startup India registration',
          'Pvt Ltd company registration',
          'LLP registration',
          'DSC',
          'FSSAI registration',
          'IEC registration',
          'Trademark registration',
        ]}
      />

      <main>
        {/* 1. Hero Section matching Design V6 reference */}
        <HeroSection onOpenConsultation={() => onOpenConsultation()} />

        {/* 2. Trust Indicators 4-metric strip */}
        <TrustIndicators />

        {/* 3. Services Overview Grid */}
        <ServicesGrid />

        {/* 4. Why Choose Regpro Asymmetrical Split Section */}
        <WhyChooseUs onOpenConsultation={() => onOpenConsultation()} />

        {/* 5. Simple 4-Step Process */}
        <ProcessSection />

        {/* 6. Client Testimonials */}
        <TestimonialsSection />

        {/* 7. Frequently Asked Questions */}
        <HomeFaqSection />

        {/* 8. Lead Generation CTA Banner */}
        <CtaBanner onOpenConsultation={() => onOpenConsultation()} />
      </main>
    </>
  );
};

