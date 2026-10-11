import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { getFeaturedServices } from '../../data/services';
import { ServiceIcon } from '../common/ServiceIcon';

export const ServicesGrid: React.FC = () => {
  const featuredServices = getFeaturedServices();

  return (
    <section className="py-16 sm:py-24 bg-[#FAF9F5] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header matching design reference */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8EFE9] text-xs font-semibold text-[#27412E] mb-3">
            <span>Our Services</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#162A1D] tracking-tight mb-3">
            Everything You Need for Business Growth
          </h2>
          <p className="text-sm sm:text-base text-[#526056]">
            From company registration to government compliance, we&apos;ve got you covered.
          </p>
        </div>

        {/* 4 columns x 2 rows cards grid matching reference image */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          {featuredServices.map((service) => (
            <Link
              key={service.slug}
              to={`/services/${service.slug}`}
              className="group bg-white rounded-2xl p-6 border border-[#E8ECE8] hover:border-[#162A1D]/30 shadow-subtle hover:shadow-card transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                {/* Icon Container matching mock subtle peach/terracotta tint */}
                <div className="w-12 h-12 rounded-xl bg-[#FCF2EB] group-hover:bg-[#E8EFE9] text-[#C87D55] group-hover:text-[#162A1D] flex items-center justify-center mb-5 transition-colors">
                  <ServiceIcon name={service.iconName} className="w-6 h-6 stroke-[1.8]" />
                </div>

                {/* Service Title */}
                <h3 className="font-bold text-sm sm:text-base text-[#162A1D] leading-snug mb-3 group-hover:text-[#27412E] transition-colors">
                  {service.name}
                </h3>
              </div>

              {/* Price & Arrow */}
              <div className="flex items-center justify-between pt-4 border-t border-[#F4EFE6]/60 mt-4">
                <span className="text-xs text-[#7E9081]">
                  Starting at <span className="font-semibold text-[#162A1D]">{service.startingPrice}</span>
                </span>
                <div className="w-7 h-7 rounded-full bg-[#FAF9F5] group-hover:bg-[#162A1D] text-[#7E9081] group-hover:text-white flex items-center justify-center transition-colors">
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom CTA to all services matching mock */}
        <div className="mt-12 text-center">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[#DEE8E0] hover:border-[#162A1D] bg-white text-xs sm:text-sm font-semibold text-[#162A1D] hover:bg-[#FAF9F5] shadow-subtle hover:shadow-card transition-all"
          >
            <span>Explore All Services</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};
