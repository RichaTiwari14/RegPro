import React from 'react';
import { SEO } from '../components/common/SEO';
import { companyConfig } from '../data/company';

export const PrivacyPolicyPage: React.FC = () => {
  return (
    <>
      <SEO
        title="Privacy Policy | Regpro"
        description="Regpro Privacy Policy regarding client documents, data handling, and statutory filings."
      />

      <main className="py-12 sm:py-20 bg-[#FAF9F5]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white p-8 sm:p-12 rounded-3xl border border-[#E3EAE4] shadow-subtle space-y-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#7E9081]">
                Legal &bull; Updated October 2026
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#162A1D] mt-2 mb-4">
                Privacy Policy
              </h1>
              <p className="text-sm text-[#526056] leading-relaxed">
                At {companyConfig.name}, we are committed to safeguarding the privacy and security of the personal and corporate information shared by our clients, website visitors, and partners.
              </p>
            </div>

            <section className="space-y-3">
              <h2 className="font-serif text-xl font-bold text-[#162A1D]">
                1. Information We Collect
              </h2>
              <p className="text-sm text-[#526056] leading-relaxed">
                When you engage Regpro for business registration, government documentation, and statutory compliance, we collect necessary KYC documents (such as PAN cards, Aadhaar cards, passport copies, utility bills, rent agreements) and corporate records required by Indian statutory authorities including the Ministry of Corporate Affairs (MCA), the GST Network (GSTN), DGFT, and the Trademark Registry.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-xl font-bold text-[#162A1D]">
                2. How We Use Your Information
              </h2>
              <p className="text-sm text-[#526056] leading-relaxed">
                Your information is strictly utilized to:
              </p>
              <ul className="list-disc list-inside text-sm text-[#526056] space-y-1.5 pl-2">
                <li>Prepare and submit official registration and compliance applications to government portals.</li>
                <li>Communicate progress, milestone updates, and queries through WhatsApp, email, or telephone.</li>
                <li>Maintain statutory compliance records as required by professional accounting and secretarial guidelines.</li>
                <li>Process payments and provide official tax invoices for professional services rendered.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-xl font-bold text-[#162A1D]">
                3. Zero Unauthorized Data Sharing
              </h2>
              <p className="text-sm text-[#526056] leading-relaxed">
                We never sell, rent, or trade your personal or business data to third-party marketing companies. Data is only transmitted to authorized government portals (MCA, GSTN, Income Tax Department, IP India) as part of your explicit filing instructions.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-xl font-bold text-[#162A1D]">
                4. Data Security & Encryption
              </h2>
              <p className="text-sm text-[#526056] leading-relaxed">
                We implement strict physical, electronic, and procedural safeguards. Sensitive identification data and Digital Signature Certificates (DSC) are handled only by authorized chartered accountants, company secretaries, and legal associates under strict nondisclosure terms.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-xl font-bold text-[#162A1D]">
                5. Contact Us Regarding Privacy
              </h2>
              <p className="text-sm text-[#526056] leading-relaxed">
                If you have questions or requests regarding your personal information, please contact our data privacy officer at <a href={`mailto:${companyConfig.email}`} className="text-[#162A1D] font-semibold underline">{companyConfig.email}</a>.
              </p>
            </section>
          </div>
        </div>
      </main>
    </>
  );
};
