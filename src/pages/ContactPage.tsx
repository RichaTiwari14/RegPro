import React from 'react';
import { Phone, Mail, MapPin, MessageSquare, Clock, ShieldCheck } from 'lucide-react';
import { SEO } from '../components/common/SEO';
import { EnquiryForm } from '../components/common/EnquiryForm';
import { companyConfig, getWhatsAppLink, getPhoneLink } from '../data/company';

export const ContactPage: React.FC = () => {
  return (
    <>
      <SEO
        title="Contact Regpro — Get in Touch with Legal & Compliance Experts"
        description="Speak with Regpro compliance advisors in Bangalore. Contact us via phone, email, WhatsApp, or request an instant callback."
        keywords={['contact Regpro', 'company registration advisor Bangalore', 'business compliance help']}
      />

      <main className="py-12 sm:py-20 bg-[#FAF9F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8EFE9] text-xs font-semibold text-[#27412E] mb-3">
              <span>Get in Touch</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#162A1D] mb-4">
              We&apos;re Here to Help Your Business Grow
            </h1>
            <p className="text-sm sm:text-base text-[#526056] leading-relaxed">
              Have a question about company incorporation, tax registration, or trademark filings? Our team of legal and tax professionals is ready to guide you.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            {/* Left Contact Information (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              {/* WhatsApp Quick Card */}
              <div className="bg-[#E8EFE9] p-6 rounded-3xl border border-[#D4E2D6] shadow-subtle">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-white text-[#2E6F40] flex items-center justify-center shadow-subtle">
                    <MessageSquare className="w-5 h-5 fill-current" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-[#162A1D]">WhatsApp Instant Support</h3>
                    <p className="text-xs text-[#526056]">Typical response in under 5 minutes</p>
                  </div>
                </div>
                <p className="text-xs text-[#526056] mb-4">
                  Chat directly with our senior compliance officers for fast clarifications on fees, documents, and status.
                </p>
                <a
                  href={getWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#162A1D] hover:bg-[#1D3525] text-white py-3 px-5 rounded-full text-xs font-semibold shadow-subtle transition-all cursor-pointer"
                >
                  <MessageSquare className="w-3.5 h-3.5 fill-current text-[#4ADE80]" />
                  <span>Start WhatsApp Chat</span>
                </a>
              </div>

              {/* Direct Details Card */}
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E3EAE4] shadow-subtle space-y-6">
                <h3 className="font-serif text-xl font-bold text-[#162A1D]">
                  Contact Information
                </h3>

                <div className="space-y-4 text-xs sm:text-sm text-[#526056]">
                  {/* Phone */}
                  <div className="flex items-start gap-3.5">
                    <div className="w-9 h-9 rounded-xl bg-[#FAF1E8] text-[#C87D55] flex items-center justify-center shrink-0">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[11px] font-bold uppercase tracking-wider text-[#7E9081]">
                        Phone / Mobile
                      </div>
                      <a href={getPhoneLink()} className="font-semibold text-[#162A1D] hover:underline">
                        {companyConfig.phoneDisplay}
                      </a>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start gap-3.5">
                    <div className="w-9 h-9 rounded-xl bg-[#FAF1E8] text-[#C87D55] flex items-center justify-center shrink-0">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[11px] font-bold uppercase tracking-wider text-[#7E9081]">
                        Email Address
                      </div>
                      <a href={`mailto:${companyConfig.email}`} className="font-semibold text-[#162A1D] hover:underline">
                        {companyConfig.email}
                      </a>
                    </div>
                  </div>

                  {/* Office Address */}
                  <div className="flex items-start gap-3.5">
                    <div className="w-9 h-9 rounded-xl bg-[#FAF1E8] text-[#C87D55] flex items-center justify-center shrink-0">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[11px] font-bold uppercase tracking-wider text-[#7E9081]">
                        Office Location
                      </div>
                      <p className="font-semibold text-[#162A1D]">
                        {companyConfig.address}, {companyConfig.city}, {companyConfig.country}
                      </p>
                    </div>
                  </div>

                  {/* Business Hours */}
                  <div className="flex items-start gap-3.5">
                    <div className="w-9 h-9 rounded-xl bg-[#FAF1E8] text-[#C87D55] flex items-center justify-center shrink-0">
                      <Clock className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[11px] font-bold uppercase tracking-wider text-[#7E9081]">
                        Working Hours
                      </div>
                      <p className="font-semibold text-[#162A1D]">
                        {companyConfig.officeHours}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#F4EFE6] flex items-center gap-2 text-xs text-[#2E6F40]">
                  <ShieldCheck className="w-4 h-4 shrink-0" />
                  <span>Strict confidentiality for all submitted details.</span>
                </div>
              </div>
            </div>

            {/* Right Consultation Form (7 cols) */}
            <div className="lg:col-span-7">
              <EnquiryForm
                title="Send Us a Message"
                source="contact-page"
              />
            </div>
          </div>
        </div>
      </main>
    </>
  );
};
