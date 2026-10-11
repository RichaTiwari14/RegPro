import React from 'react';
import { ShieldCheck, HeartHandshake, Eye, Award, CheckCircle2 } from 'lucide-react';
import { SEO } from '../components/common/SEO';
import { CtaBanner } from '../components/home/CtaBanner';

interface AboutPageProps {
  onOpenConsultation: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onOpenConsultation }) => {
  const values = [
    {
      icon: Eye,
      title: 'Radical Transparency',
      desc: 'We state our professional charges upfront and clarify every statutory government fee in writing before you spend a single rupee.',
    },
    {
      icon: ShieldCheck,
      title: 'Complete Confidentiality',
      desc: 'Your Aadhaar, PAN, director proofs, and corporate agreements are handled with bank-grade encryption and strict privacy protocols.',
    },
    {
      icon: Award,
      title: 'Certified Expertise',
      desc: 'Every incorporation filing, deed, and tax petition is supervised and executed by qualified Chartered Accountants and Company Secretaries.',
    },
    {
      icon: HeartHandshake,
      title: 'End-to-End Partnership',
      desc: 'We do not stop at certificate delivery. We stand beside you for post-incorporation bank account setup, accounting, and ongoing compliance.',
    },
  ];

  return (
    <>
      <SEO
        title="About Regpro — Simplifying Business Registration & Legal Compliance"
        description="Learn how Regpro empowers entrepreneurs across India to register, document, and scale their businesses with confidence and clarity."
        keywords={[
          'about Regpro',
          'business registration experts India',
          'company incorporation consultancy Bangalore',
        ]}
      />

      <main className="py-12 sm:py-20 bg-[#FAF9F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8EFE9] text-xs font-semibold text-[#27412E] mb-3">
              <span>About Regpro</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#162A1D] mb-4">
              Your Growth. Our Support.
            </h1>
            <p className="text-base sm:text-lg text-[#526056] leading-relaxed">
              We make the bureaucratic maze of Indian government registrations, company laws, and statutory documentation straightforward, predictable, and 100% digital.
            </p>
          </div>

          {/* Mission & Story Split */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center mb-20">
            {/* Left Story (6 cols) */}
            <div className="lg:col-span-6 space-y-5">
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#162A1D]">
                Built for India&apos;s Next Generation of Entrepreneurs
              </h2>
              <p className="text-sm sm:text-base text-[#526056] leading-relaxed">
                Starting a business should be an exciting milestone, not an intimidating ordeal of legal jargon, untracked government forms, and unpredictable costs.
              </p>
              <p className="text-sm sm:text-base text-[#526056] leading-relaxed">
                Regpro was established with a singular mission: to provide founders, SMEs, and professionals across India with a single, trustworthy gateway for company formation, GST filing, trademark protection, and official licensing.
              </p>

              <div className="pt-2 space-y-2.5">
                {[
                  '100% Paperless online submissions with secure DSC handling',
                  'Clear timeline commitments for every government milestone',
                  'Dedicated compliance managers accessible via WhatsApp and phone',
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm text-[#162A1D] font-medium">
                    <CheckCircle2 className="w-4 h-4 text-[#2E6F40] shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Arched Visual (6 cols) */}
            <div className="lg:col-span-6 flex justify-center">
              <div className="w-full max-w-md h-80 sm:h-96 arch-mask-top overflow-hidden shadow-card border-4 border-white bg-slate-100">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80"
                  alt="Team of corporate professionals discussing business registration"
                  className="w-full h-full object-cover object-center"
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          {/* Values Grid */}
          <div className="mb-20">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#162A1D] mb-3">
                Our Core Principles
              </h2>
              <p className="text-sm text-[#526056]">
                The standards that define every application we submit and every client we advise.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((v, idx) => {
                const Icon = v.icon;
                return (
                  <div
                    key={idx}
                    className="bg-white p-6 rounded-2xl border border-[#E3EAE4] shadow-subtle hover:shadow-card transition-all"
                  >
                    <div className="w-12 h-12 rounded-xl bg-[#FAF1E8] text-[#C87D55] flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-serif text-lg font-bold text-[#162A1D] mb-2">
                      {v.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#526056] leading-relaxed">
                      {v.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* CTA Banner */}
          <CtaBanner onOpenConsultation={onOpenConsultation} />
        </div>
      </main>
    </>
  );
};

