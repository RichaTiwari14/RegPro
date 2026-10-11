import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, ArrowRight, MessageSquare, Sparkles } from 'lucide-react';
import { SEO } from '../components/common/SEO';
import { servicesData } from '../data/services';
import { ServiceIcon } from '../components/common/ServiceIcon';

interface ServicesPageProps {
  onOpenConsultation: (serviceName?: string) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ onOpenConsultation }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All Services');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    'All Services',
    'Business Registration',
    'Government Registration',
    'Other Services',
  ];

  const filteredServices = useMemo(() => {
    return servicesData.filter((service) => {
      const matchesCategory =
        selectedCategory === 'All Services' || service.category === selectedCategory;
      const matchesSearch =
        service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.keywords.some((k) => k.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <>
      <SEO
        title="Services Directory — Business & Government Registration | Regpro"
        description="Explore comprehensive business registration, GST, MSME, FSSAI, DPIIT, and compliance services in India with Regpro. Fast, digital, transparent."
        keywords={[
          'all business registration services',
          'company incorporation India',
          'GST registration Bangalore',
          'trademark registration',
          'FSSAI food license',
          'MSME Udyam registration',
        ]}
      />

      <main className="py-8 sm:py-14 bg-[#FAF9F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section matching Top-Right of Reference Mock */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-14">
            {/* Left Header Copy (7 cols) */}
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8EFE9] text-xs font-semibold text-[#27412E]">
                <span>Our Services</span>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#162A1D] leading-[1.15]">
                Comprehensive Business Registration &amp; Compliance Services
              </h1>

              <p className="text-sm sm:text-base text-[#526056] leading-relaxed max-w-xl">
                Choose from our wide range of services designed to help you start, grow and legally operate your business.
              </p>
            </div>

            {/* Right Arched Workspace Image with Sparkles (5 cols) matching mock */}
            <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
              <div className="absolute -top-4 -left-4 text-[#C87D55]">
                <Sparkles className="w-6 h-6 animate-pulse" />
              </div>

              <div className="w-full max-w-sm h-64 sm:h-72 arch-mask-top overflow-hidden shadow-card border-4 border-white bg-slate-100 relative">
                <img
                  src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=700&q=80"
                  alt="Modern workspace with laptop, plant and legal notebooks"
                  className="w-full h-full object-cover object-center"
                  loading="eager"
                />
              </div>
            </div>
          </div>

          {/* Filter Bar & Search */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 pb-6 border-b border-[#E3EAE4]">
            {/* Category Tabs matching design reference pills */}
            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
              {categories.map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#162A1D] text-white shadow-subtle'
                        : 'bg-white text-[#526056] border border-[#DEE8E0] hover:border-[#162A1D] hover:text-[#162A1D]'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 text-[#7E9081] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search services (e.g. GST, Pvt Ltd)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm rounded-full bg-white border border-[#DEE8E0] focus:border-[#162A1D] focus:outline-none transition-all placeholder:text-[#9DAEA2]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-[#7E9081] hover:text-[#162A1D]"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Service Cards Grid (4 columns layout matching reference image) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {filteredServices.map((service) => (
              <Link
                key={service.slug}
                to={`/services/${service.slug}`}
                className="group bg-white rounded-2xl p-6 border border-[#E8ECE8] hover:border-[#162A1D]/40 shadow-subtle hover:shadow-card transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-xl bg-[#FAF1E8] group-hover:bg-[#E8EFE9] text-[#C87D55] group-hover:text-[#162A1D] flex items-center justify-center mb-4 transition-colors">
                    <ServiceIcon name={service.iconName} className="w-6 h-6" />
                  </div>

                  {/* Title */}
                  <h2 className="font-bold text-sm sm:text-base text-[#162A1D] leading-snug mb-2 group-hover:text-[#27412E] transition-colors">
                    {service.name}
                  </h2>

                  <p className="text-xs text-[#526056] line-clamp-2 leading-relaxed mb-4">
                    {service.shortDescription}
                  </p>
                </div>

                {/* Footer price & arrow */}
                <div className="flex items-center justify-between pt-3 border-t border-[#F4EFE6]/70 mt-auto">
                  <span className="text-xs text-[#7E9081]">
                    Starting at <span className="font-semibold text-[#162A1D]">{service.startingPrice}</span>
                  </span>
                  <div className="w-7 h-7 rounded-full bg-[#FAF9F5] group-hover:bg-[#162A1D] text-[#7E9081] group-hover:text-white flex items-center justify-center transition-colors">
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}

            {/* Custom card matching mock: "Need a different service? Talk to our experts ->" */}
            <div
              onClick={() => onOpenConsultation('Custom Business Requirement')}
              className="bg-[#E8EFE9] rounded-2xl p-6 border border-[#D4E2D6] hover:border-[#162A1D] shadow-subtle hover:shadow-card transition-all duration-200 flex flex-col justify-between cursor-pointer group"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-white text-[#162A1D] flex items-center justify-center mb-4 shadow-subtle">
                  <MessageSquare className="w-6 h-6 text-[#2E6F40]" />
                </div>
                <h2 className="font-bold text-sm sm:text-base text-[#162A1D] leading-snug mb-2">
                  Need a different service?
                </h2>
                <p className="text-xs text-[#526056] leading-relaxed">
                  Have a specialized corporate structure, license, or documentation need not listed above?
                </p>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-[#D4E2D6] mt-4">
                <span className="text-xs font-semibold text-[#162A1D]">
                  Talk to our experts
                </span>
                <div className="w-7 h-7 rounded-full bg-[#162A1D] text-white flex items-center justify-center">
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </div>

          {filteredServices.length === 0 && (
            <div className="text-center py-16 bg-white rounded-2xl border border-[#E3EAE4] p-8">
              <p className="text-base font-semibold text-[#162A1D] mb-2">
                No matching services found for &ldquo;{searchQuery}&rdquo;
              </p>
              <p className="text-xs text-[#526056] mb-4">
                Try searching for keywords like GST, Pvt Ltd, Trademark, or LLP.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('All Services');
                  setSearchQuery('');
                }}
                className="px-4 py-2 bg-[#162A1D] text-white text-xs font-semibold rounded-full"
              >
                Reset Search Filters
              </button>
            </div>
          )}
        </div>
      </main>
    </>
  );
};
