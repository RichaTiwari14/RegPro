import React, { useState } from 'react';
import { Check, ArrowRight, Shield, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/common/SEO';
import { pricingData, pricingDisclaimer } from '../data/pricing';

interface PricingPageProps {
  onOpenConsultation: (serviceName?: string) => void;
}

export const PricingPage: React.FC<PricingPageProps> = ({ onOpenConsultation }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = [
    'All',
    'Business Registration',
    'Government Registration',
    'Other Services',
  ];

  const filteredPricing = pricingData.filter((item) => {
    if (activeCategory === 'All') return true;
    return item.category === activeCategory;
  });

  return (
    <>
      <SEO
        title="Transparent Pricing & Starting Estimates | Regpro"
        description="Clear, honest pricing for company registrations, GST, MSME, DSC, and trademarks in India. No hidden fees or surprise markups."
        keywords={[
          'company registration cost',
          'Pvt Ltd registration price India',
          'GST registration charges',
          'trademark registration fees Bangalore',
        ]}
      />

      <main className="py-12 sm:py-20 bg-[#FAF9F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8EFE9] text-xs font-semibold text-[#27412E] mb-3">
              <span>Transparent &amp; Fair Pricing</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#162A1D] mb-4">
              Clear Pricing for Every Business Milestone
            </h1>
            <p className="text-sm sm:text-base text-[#526056] leading-relaxed">
              We believe in complete pricing transparency. No surprises, no hidden surcharges — just expert guidance with predictable costs.
            </p>
          </div>

          {/* Statutory Disclaimer Alert */}
          <div className="max-w-3xl mx-auto mb-10 p-4 rounded-2xl bg-[#E8EFE9] border border-[#D4E2D6] flex items-center gap-3 text-xs sm:text-sm text-[#27412E]">
            <AlertCircle className="w-5 h-5 text-[#C87D55] shrink-0" />
            <span>
              <strong>Note:</strong> {pricingDisclaimer}
            </span>
          </div>

          {/* Category Tabs */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex flex-wrap items-center gap-2 bg-[#FAF9F5] p-1.5 rounded-full border border-[#DEE8E0]">
              {categories.map((cat) => {
                const isActive = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#162A1D] text-white shadow-subtle'
                        : 'text-[#526056] hover:text-[#162A1D]'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Pricing Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredPricing.map((item) => (
              <div
                key={item.slug}
                className={`bg-white rounded-3xl p-7 border transition-all duration-200 flex flex-col justify-between ${
                  item.popular
                    ? 'border-[#162A1D] shadow-card ring-1 ring-[#162A1D]'
                    : 'border-[#E3EAE4] shadow-subtle hover:shadow-card'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#7E9081]">
                      {item.category}
                    </span>
                    {item.popular && (
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-[#FAF1E8] text-[#C87D55] px-2.5 py-0.5 rounded-full">
                        Most Popular
                      </span>
                    )}
                  </div>

                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#162A1D] mb-4">
                    {item.name}
                  </h3>

                  {/* Starting Price */}
                  <div className="mb-6 pb-6 border-b border-[#F4EFE6]">
                    <div className="text-xs text-[#7E9081] mb-1">Starting at</div>
                    <div className="font-serif text-3xl sm:text-4xl font-bold text-[#162A1D]">
                      {item.startingPrice}
                    </div>
                    <div className="text-xs text-[#7E9081] mt-1">
                      {item.priceNote} &bull; Turnaround: {item.turnaround}
                    </div>
                  </div>

                  {/* Features List */}
                  <div className="space-y-3 mb-6">
                    <p className="text-xs font-bold uppercase tracking-wider text-[#162A1D]">
                      What&apos;s Included:
                    </p>
                    {item.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#526056]">
                        <Check className="w-4 h-4 text-[#2E6F40] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-[11px] text-[#7E9081] italic mb-5">
                    *{item.statutoryFeeText}
                  </p>

                  <div className="space-y-2">
                    <button
                      onClick={() => onOpenConsultation(item.name)}
                      className="w-full bg-[#162A1D] hover:bg-[#1D3525] text-white py-3 px-5 rounded-full text-xs sm:text-sm font-semibold transition-all shadow-subtle hover:shadow-card flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>Enquire for {item.name}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    <Link
                      to={`/services/${item.slug}`}
                      className="w-full text-center block text-xs font-semibold text-[#526056] hover:text-[#162A1D] py-1 transition-colors"
                    >
                      View Service Details &rarr;
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Custom Quote Box */}
          <div className="mt-16 bg-[#FAF9F5] border border-[#DEE8E0] rounded-3xl p-8 sm:p-10 text-center max-w-3xl mx-auto shadow-subtle">
            <Shield className="w-8 h-8 text-[#162A1D] mx-auto mb-3" />
            <h3 className="font-serif text-2xl font-bold text-[#162A1D] mb-2">
              Looking for a Custom Enterprise or Multi-Entity Package?
            </h3>
            <p className="text-sm text-[#526056] max-w-xl mx-auto mb-6">
              Incorporating multiple companies, opening regional branches, or seeking custom annual compliance retainer packages? We offer flexible custom fee structures.
            </p>
            <button
              onClick={() => onOpenConsultation('Custom Enterprise Plan')}
              className="px-6 py-3 bg-[#162A1D] text-white rounded-full text-xs sm:text-sm font-semibold hover:bg-[#1D3525] transition-all cursor-pointer"
            >
              Get Custom Quote
            </button>
          </div>
        </div>
      </main>
    </>
  );
};
