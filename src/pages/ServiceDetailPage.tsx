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
  Check,
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

  // Determine hero image: use custom GST blocks image for GST, or workspace image for other services
  const heroImageSrc =
    service.slug.includes('gst')
      ? '/images/gst-blocks.jpg'
      : '/images/workspace-laptop.jpg';

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

            {/* Right Arched Visual & Organic Shape matching mock */}
            <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
              <div className="relative w-full max-w-sm">
                {/* Organic curved shape behind arch */}
                <div
                  className="absolute -top-4 -right-4 w-56 h-56 bg-[#E8EFE9] rounded-[48%_52%_55%_45%/45%_50%_50%_55%] -z-10 transform rotate-6"
                  aria-hidden="true"
                />

                <div className="w-full h-56 sm:h-64 rounded-t-[140px] rounded-b-[28px] overflow-hidden shadow-float border-4 border-white bg-slate-100">
                  <img
                    src={heroImageSrc}
                    alt={`${service.name} documentation and registration`}
                    className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
                    loading="eager"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 3 Key Metrics Floating Bar matching mock: Processing Time, Govt Fees, Expert Support */}
          <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-[#E3EAE4] shadow-subtle mb-12">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 divide-y sm:divide-y-0 sm:divide-x divide-[#E3EAE4]">
              {/* Metric 1 */}
              <div className="flex items-center gap-3.5 sm:px-4">
                <div className="w-10 h-10 rounded-xl bg-[#FCF2EB] text-[#C87D55] flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5 stroke-[2]" />
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
                <div className="w-10 h-10 rounded-xl bg-[#FCF2EB] text-[#C87D55] flex items-center justify-center shrink-0">
                  <Coins className="w-5 h-5 stroke-[2]" />
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
                <div className="w-10 h-10 rounded-xl bg-[#FCF2EB] text-[#C87D55] flex items-center justify-center shrink-0">
                  <Headphones className="w-5 h-5 stroke-[2]" />
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
                      <div className="w-5 h-5 rounded-full bg-[#E8EFE9] text-[#2E6F40] flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
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

              {/* Pricing Box Matching Bottom-Right Mock Artwork (Pale sage card with organic swirl & verified document seal) */}
              <div className="bg-[#EBF1ED] border border-[#D4E2D6] rounded-[32px] p-8 sm:p-10 relative overflow-hidden flex flex-col sm:flex-row items-center justify-between gap-8 shadow-card">
                {/* Organic curved line doodle (wire loop) matching reference image */}
                <svg
                  className="absolute left-1/3 bottom-4 w-48 sm:w-64 h-24 pointer-events-none text-[#7E9081]/50"
                  viewBox="0 0 200 80"
                  fill="none"
                >
                  <path
                    d="M 10 50 C 60 70, 70 10, 110 30 C 130 45, 140 65, 160 50 C 180 35, 190 20, 210 25"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 100 25 C 115 15, 125 35, 110 45 C 95 55, 90 35, 105 25"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                </svg>

                {/* Left Price Details matching mock */}
                <div className="text-center sm:text-left z-10">
                  <div className="inline-block px-3 py-1 bg-white/80 rounded-full text-xs font-semibold text-[#7E9081] mb-2 shadow-subtle">
                    Starting at
                  </div>
                  <div className="font-serif text-4xl sm:text-5xl font-bold text-[#162A1D] tracking-tight">
                    {service.startingPrice}
                  </div>
                  <p className="text-xs text-[#526056] mt-2 max-w-xs">
                    {service.statutoryFeeNote || 'Government fees extra, if applicable'}
                  </p>
                </div>

                {/* Right Visual Certificate graphic with verified checkmark matching mock */}
                <div className="relative z-10 flex items-center justify-center shrink-0">
                  <div className="relative w-28 h-36 bg-white rounded-2xl shadow-float border border-[#D4E2D6] p-3.5 transform rotate-6 hover:rotate-0 transition-transform duration-300">
                    {/* Header on paper: 'GST' or service short title */}
                    <div className="font-serif font-bold text-sm text-[#162A1D] border-b border-[#E3EAE4] pb-1 mb-2">
                      {service.slug.includes('gst') ? 'GST' : 'REG'}
                    </div>

                    {/* Document simulated lines */}
                    <div className="space-y-1.5 opacity-40">
                      <div className="h-1 bg-[#162A1D] rounded w-full"></div>
                      <div className="h-1 bg-[#162A1D] rounded w-5/6"></div>
                      <div className="h-1 bg-[#162A1D] rounded w-4/6"></div>
                      <div className="h-1 bg-[#162A1D] rounded w-full"></div>
                    </div>

                    {/* Green checkmark badge overlapping bottom-right corner */}
                    <div className="absolute -bottom-3 -right-3 w-8 h-8 rounded-full bg-[#2E6F40] text-white flex items-center justify-center shadow-card border-2 border-white">
                      <CheckCircle2 className="w-5 h-5 fill-current" />
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
