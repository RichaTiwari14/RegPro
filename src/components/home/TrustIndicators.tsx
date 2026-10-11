import React from 'react';
import { companyConfig } from '../../data/company';

export const TrustIndicators: React.FC = () => {
  return (
    <section className="py-8 sm:py-12 border-y border-[#E3EAE4] bg-[#FAF9F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 divide-y sm:divide-y-0 sm:divide-x divide-[#E3EAE4]">
          {companyConfig.trustStats.map((stat, idx) => (
            <div
              key={idx}
              className={`text-center ${idx > 0 ? 'pt-4 sm:pt-0 sm:pl-6' : ''}`}
            >
              <div className="font-serif text-3xl sm:text-4xl font-bold text-[#162A1D] tracking-tight">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm font-semibold text-[#162A1D] mt-1">
                {stat.label}
              </div>
              <div className="text-[11px] text-[#7E9081] mt-0.5 hidden sm:block">
                {stat.caption}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

