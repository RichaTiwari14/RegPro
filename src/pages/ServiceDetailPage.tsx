import React, { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import {
  ChevronRight,
  Clock,
  Coins,
  Headphones,
  CheckCircle2,
  FileText,
  ChevronDown,
  ArrowRight,
  FileCheck,
} from 'lucide-react';
import { SEO } from '../components/common/SEO';
import { getServiceBySlug, servicesData } from '../data/services';
import { EnquiryForm } from '../components/common/EnquiryForm';

export const ServiceDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const service = slug ? getServiceBySlug(slug) : undefined;
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  if (!service) {
    return <Navigate to="/services" replace />;
  }

  // Related services
  const related = servicesData.filter((s) => s.slug !== service.slug).slice(0, 3);

  return (
    <>
      <SEO
        title={`${service.metaTitle}`}
        description={service.metaDescription}
        keywords={service.keywords}
        canonicalUrl={`https://regpro.in/services/${service.slug}`}
      />

      <main className="py-6 sm:py-10 bg-[#FAF9F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs matching mock: Home > Services > GST Registration */}
          <nav className="flex items-center gap-2 text-xs text-[#7E9081] mb-8" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-[#162A1D] transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link to="/services" className="hover:text-[#162A1D] transition-colors">
              Services
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="font-semibold text-[#162A1D] truncate max-w-xs">{service.name}</span>
          </nav>

          {/* Hero Section matching Bottom-Right of Reference Mock */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-10">
            {/* Left Title & Intro (7 cols) */}
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8EFE9] text-xs font-semibold text-[#27412E]">
                <span>{service.category}</span>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#162A1D] leading-[1.15]">
                {service.name}
              </h1>

              <p className="text-base sm:text-lg text-[#526056] leading-relaxed max-w-xl">
                {service.shortDescription}
              </p>
            </div>

            {/* Right Arched Visual matching mock */}
            <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
              <div className="w-full max-w-sm h-56 sm:h-64 arch-mask-top overflow-hidden shadow-card border-4 border-white bg-slate-100">
                <img
                  src="https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=700&q=80"
                  alt={`${service.name} paperwork and legal registration`}
                  className="w-full h-full object-cover object-center"
                  loading="eager"
                />
              </div>
            </div>
          </div>

          {/* 3 Key Metrics Floating Bar matching mock: Processing Time, Govt Fees, Expert Support */}
          <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-[#E3EAE4] shadow-subtle mb-12">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 divide-y sm:divide-y-0 sm:divide-x divide-[#E3EAE4]">
              {/* Metric 1 */}
              <div className="flex items-center gap-3.5 sm:px-4">
                <div className="w-10 h-10 rounded-xl bg-[#FAF1E8] text-[#C87D55] flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-serif text-base sm:text-lg font-bold text-[#162A1D]">
                    {service.processingTime}
                  </div>
                  <div className="text-xs text-[#7E9081]">Processing Time</div>
                </div>
              </div>

              {/* Metric 2 */}
              <div className="flex items-center gap-3.5 pt-4 sm:pt-0 sm:px-4">
                <div className="w-10 h-10 rounded-xl bg-[#FAF1E8] text-[#C87D55] flex items-center justify-center shrink-0">
                  <Coins className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-serif text-base sm:text-lg font-bold text-[#162A1D]">
                    Government Fees
                  </div>
                  <div className="text-xs text-[#7E9081]">Extra (as applicable)</div>
                </div>
              </div>

              {/* Metric 3 */}
              <div className="flex items-center gap-3.5 pt-4 sm:pt-0 sm:px-4">
                <div className="w-10 h-10 rounded-xl bg-[#FAF1E8] text-[#C87D55] flex items-center justify-center shrink-0">
                  <Headphones className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-serif text-base sm:text-lg font-bold text-[#162A1D]">
                    Expert Support
                  </div>
                  <div className="text-xs text-[#7E9081]">End-to-End Assistance</div>
                </div>
              </div>
            </div>
          </div>

          {/* 2-Column Content Layout matching mock */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            {/* Left Content Column (7 cols) */}
            <div className="lg:col-span-7 space-y-10">
              {/* Overview */}
              <section className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E3EAE4] shadow-subtle">
                <h2 className="font-serif text-2xl font-bold text-[#162A1D] mb-4">
                  Overview
                </h2>
                <p className="text-sm sm:text-base text-[#526056] leading-relaxed">
                  {service.fullDescription}
                </p>
              </section>

              {/* Key Benefits */}
              <section className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E3EAE4] shadow-subtle">
                <h2 className="font-serif text-2xl font-bold text-[#162A1D] mb-4">
                  Key Benefits
                </h2>
                <div className="space-y-3">
                  {service.benefits.map((b, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#2E6F40] shrink-0 mt-0.5" />
                      <span className="text-sm sm:text-base text-[#162A1D] font-medium leading-relaxed">
                        {b}
                      </span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Who Needs It */}
              <section className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E3EAE4] shadow-subtle">
                <h2 className="font-serif text-2xl font-bold text-[#162A1D] mb-4">
                  Who Needs This Service?
                </h2>
                <ul className="space-y-2.5 text-sm sm:text-base text-[#526056]">
                  {service.whoNeedsIt.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#162A1D] mt-2.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Documents Required */}
              <section className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E3EAE4] shadow-subtle">
                <h2 className="font-serif text-2xl font-bold text-[#162A1D] mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-[#C87D55]" />
                  <span>Documents Required</span>
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {service.documentsRequired.map((doc, idx) => (
                    <div
                      key={idx}
                      className="bg-[#FAF9F5] p-3.5 rounded-xl border border-[#E3EAE4] text-xs sm:text-sm text-[#162A1D] flex items-center gap-2.5"
                    >
                      <span className="w-2 h-2 rounded-full bg-[#C87D55] shrink-0" />
                      <span>{doc}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Step-by-Step Process */}
              <section className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E3EAE4] shadow-subtle">
                <h2 className="font-serif text-2xl font-bold text-[#162A1D] mb-6">
                  Step-by-Step Process
                </h2>
                <div className="space-y-6 relative">
                  <div className="absolute top-4 bottom-4 left-4 w-0.5 bg-[#D4E2D6] -z-0" />

                  {service.processSteps.map((step) => (
                    <div key={step.step} className="flex items-start gap-4 relative z-10">
                      <div className="w-8 h-8 rounded-full bg-[#162A1D] text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-subtle">
                        {step.step}
                      </div>
                      <div className="pt-0.5">
                        <h3 className="font-bold text-sm sm:text-base text-[#162A1D] mb-1">
                          {step.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-[#526056] leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Pricing Box Matching Bottom-Right Mock Artwork (Pale sage card with swirl & verified seal) */}
              <div className="bg-[#EBF1ED] border border-[#D4E2D6] rounded-3xl p-8 relative overflow-hidden flex flex-col sm:flex-row items-center justify-between gap-6 shadow-card">
                {/* Background decorative swirl */}
                <svg
                  className="absolute right-12 bottom-0 w-64 h-32 pointer-events-none opacity-40 text-[#BACFBE]"
                  viewBox="0 0 200 100"
                  fill="none"
                >
                  <path
                    d="M 10 90 C 80 10, 120 120, 190 20"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>

                {/* Left Price Details */}
                <div className="text-center sm:text-left z-10">
                  <div className="inline-block px-3 py-1 bg-white/70 rounded-full text-xs font-semibold text-[#7E9081] mb-2">
                    Starting at
                  </div>
                  <div className="font-serif text-4xl sm:text-5xl font-bold text-[#162A1D] tracking-tight">
                    {service.startingPrice}
                  </div>
                  <p className="text-xs text-[#526056] mt-2 max-w-xs">
                    {service.statutoryFeeNote || 'Government fees extra, if applicable'}
                  </p>
                </div>

                {/* Right Visual Certificate graphic with verified checkmark */}
                <div className="relative z-10 flex items-center justify-center">
                  <div className="w-24 h-32 bg-white rounded-xl shadow-card border border-[#D4E2D6] flex flex-col items-center justify-between p-3 rotate-3 hover:rotate-0 transition-transform">
                    <div className="w-full flex justify-between items-center text-[8px] font-bold text-[#7E9081] uppercase">
                      <span>{service.slug.slice(0, 3).toUpperCase()}</span>
                      <FileCheck className="w-3.5 h-3.5 text-[#162A1D]" />
                    </div>
                    <div className="w-10 h-10 rounded-full bg-[#E8EFE9] flex items-center justify-center text-[#2E6F40]">
                      <CheckCircle2 className="w-6 h-6 fill-current text-[#2E6F40]" />
                    </div>
                    <div className="text-[9px] font-semibold text-[#162A1D] text-center">
                      Verified
                    </div>
                  </div>
                </div>
              </div>

              {/* Service FAQs */}
              <section className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E3EAE4] shadow-subtle">
                <h2 className="font-serif text-2xl font-bold text-[#162A1D] mb-6">
                  Frequently Asked Questions
                </h2>
                <div className="space-y-3">
                  {service.faqs.map((faq, idx) => {
                    const isOpen = openFaq === idx;
                    return (
                      <div
                        key={idx}
                        className="border border-[#E3EAE4] rounded-2xl overflow-hidden transition-all"
                      >
                        <button
                          onClick={() => setOpenFaq(isOpen ? null : idx)}
                          className="w-full px-5 py-4 text-left flex items-center justify-between gap-3 font-semibold text-xs sm:text-sm text-[#162A1D] hover:bg-[#FAF9F5]"
                        >
                          <span>{faq.question}</span>
                          <ChevronDown
                            className={`w-4 h-4 text-[#7E9081] shrink-0 transition-transform ${
                              isOpen ? 'rotate-180' : ''
                            }`}
                          />
                        </button>
                        {isOpen && (
                          <div className="px-5 pb-4 pt-1 text-xs sm:text-sm text-[#526056] leading-relaxed border-t border-[#F4EFE6]/60">
                            {faq.answer}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </section>

              {/* Related Services */}
              <section className="pt-4">
                <h3 className="font-serif text-xl font-bold text-[#162A1D] mb-4">
                  Related Compliance Services
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {related.map((rel) => (
                    <Link
                      key={rel.slug}
                      to={`/services/${rel.slug}`}
                      className="bg-white p-4 rounded-2xl border border-[#E3EAE4] hover:border-[#162A1D] shadow-subtle hover:shadow-card transition-all text-left group"
                    >
                      <div className="font-bold text-xs sm:text-sm text-[#162A1D] mb-1 group-hover:text-[#27412E]">
                        {rel.name}
                      </div>
                      <div className="text-[11px] text-[#7E9081] flex items-center justify-between mt-2">
                        <span>{rel.startingPrice}</span>
                        <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            </div>

            {/* Right Sticky Column: Consultation Form (5 cols) matching mock */}
            <div className="lg:col-span-5 sticky top-24">
              <EnquiryForm
                defaultService={service.name}
                source={`service-${service.slug}`}
                title="Get a Free Consultation"
              />
            </div>
          </div>
        </div>
      </main>
    </>
  );
};
