import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { WhatsAppFloat } from './components/common/WhatsAppFloat';
import { ConsultationModal } from './components/common/ConsultationModal';

// Pages
import { HomePage } from './pages/HomePage';
import { ServicesPage } from './pages/ServicesPage';
import { ServiceDetailPage } from './pages/ServiceDetailPage';
import { PricingPage } from './pages/PricingPage';
import { AboutPage } from './pages/AboutPage';
import { FaqPage } from './pages/FaqPage';
import { ContactPage } from './pages/ContactPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsPage } from './pages/TermsPage';
import { NotFoundPage } from './pages/NotFoundPage';

// Helper to scroll window to top on route change
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

export const App: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('Free Consultation');

  const handleOpenConsultation = (serviceName?: string) => {
    if (serviceName) {
      setSelectedService(serviceName);
    } else {
      setSelectedService('Free Consultation');
    }
    setModalOpen(true);
  };

  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col bg-[#FAF9F5] text-[#1A261E]">
        {/* Sticky Header with navigation and consultation trigger */}
        <Navbar onOpenConsultation={handleOpenConsultation} />

        {/* Page Content */}
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage onOpenConsultation={handleOpenConsultation} />} />
            <Route path="/services" element={<ServicesPage onOpenConsultation={handleOpenConsultation} />} />
            <Route path="/services/:slug" element={<ServiceDetailPage />} />
            <Route path="/pricing" element={<PricingPage onOpenConsultation={handleOpenConsultation} />} />
            <Route path="/about" element={<AboutPage onOpenConsultation={() => handleOpenConsultation()} />} />
            <Route path="/faqs" element={<FaqPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/terms-and-conditions" element={<TermsPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>

        {/* Dark Olive Footer */}
        <Footer />

        {/* Floating WhatsApp and Click-to-call */}
        <WhatsAppFloat />

        {/* Site-wide Lead Consultation Modal */}
        <ConsultationModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          serviceTitle={selectedService}
        />
      </div>
    </Router>
  );
};

export default App;

