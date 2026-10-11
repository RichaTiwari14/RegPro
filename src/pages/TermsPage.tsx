import React from 'react';
import { SEO } from '../components/common/SEO';
import { companyConfig } from '../data/company';

export const TermsPage: React.FC = () => {
  return (
    <>
      <SEO
        title="Terms & Conditions | Regpro"
        description="Regpro Terms and Conditions for business registration, government documentation, and compliance services."
      />

      <main className="py-12 sm:py-20 bg-[#FAF9F5]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white p-8 sm:p-12 rounded-3xl border border-[#E3EAE4] shadow-subtle space-y-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#7E9081]">
                Legal &bull; Updated October 2026
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#162A1D] mt-2 mb-4">
                Terms &amp; Conditions
              </h1>
              <p className="text-sm text-[#526056] leading-relaxed">
                Please review these Terms and Conditions carefully before retaining {companyConfig.name} for business registration, government filings, or advisory services.
              </p>
            </div>

            <section className="space-y-3">
              <h2 className="font-serif text-xl font-bold text-[#162A1D]">
                1. Scope of Services
              </h2>
              <p className="text-sm text-[#526056] leading-relaxed">
                Regpro provides technology-assisted professional consultancy for business formation, taxation registrations, and intellectual property documentation. While our network includes practicing Chartered Accountants, Company Secretaries, and Advocates, official approvals, registrations, and issuance of certificates rest entirely under the jurisdiction of the respective Indian government ministries and regulatory authorities.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-xl font-bold text-[#162A1D]">
                2. Professional Fees &amp; Statutory Government Dues
              </h2>
              <p className="text-sm text-[#526056] leading-relaxed">
                All listed service prices are starting estimates for professional drafting, consultation, and filing support. Statutory government fees, stamp duties, MCA portal fees, and notary expenses are determined by statutory norms and charged separately without markup.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-xl font-bold text-[#162A1D]">
                3. Client Responsibilities
              </h2>
              <p className="text-sm text-[#526056] leading-relaxed">
                Clients are responsible for providing authentic, legally valid, and unaltered documents and information. Regpro is not liable for rejections, delays, or penalties arising from fabricated documents, identity mismatches, or false representations provided by the applicant.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-xl font-bold text-[#162A1D]">
                4. Processing Timelines &amp; Government Delays
              </h2>
              <p className="text-sm text-[#526056] leading-relaxed">
                Estimated turnaround times (e.g., 3-7 days for GST, 7-10 days for Private Limited) reflect standard processing under normal operational conditions. Regpro is not responsible for unforeseen delays caused by government server downtimes, public holidays, regional officer backlogs, or unexpected statutory policy amendments.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-xl font-bold text-[#162A1D]">
                5. Governing Law &amp; Jurisdiction
              </h2>
              <p className="text-sm text-[#526056] leading-relaxed">
                These terms shall be governed by and construed in accordance with the laws of India. Any disputes arising hereunder shall be subject to the exclusive jurisdiction of the competent courts in Bangalore, Karnataka.
              </p>
            </section>
          </div>
        </div>
      </main>
    </>
  );
};
