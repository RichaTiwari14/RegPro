import React from 'react';
import { CheckCircle2, ArrowRight } from 'lucide-react';

interface WhyChooseUsProps {
  onOpenConsultation: () => void;
}

export const WhyChooseUs: React.FC<WhyChooseUsProps> = ({ onOpenConsultation }) => {
  const benefits = [
    'Expert Guidance & Support',
    'Transparent Pricing',
    '100% Secure & Confidential',
    'Timely Updates',
    'End-to-End Assistance',
  ];

  return (
    <section className="py-16 sm:py-24 bg-[#FAF9F5] overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Deep Olive Green Card (7 cols) matching reference */}
          <div className="lg:col-span-7 bg-[#162A1D] rounded-[32px] sm:rounded-4xl p-8 sm:p-12 lg:p-14 text-white shadow-card relative overflow-hidden z-10">
            {/* Subtle organic light accent inside card */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-2xl pointer-events-none" />

            <div className="relative z-10 space-y-6">
              <div>
                <h2 className="font-serif text-3xl sm:text-4xl lg:text-4xl font-bold tracking-tight text-white mb-3">
                  Why Choose Regpro?
                </h2>
                <p className="text-sm sm:text-base text-[#A8BCAE] leading-relaxed max-w-md">
                  Your trusted partner for business registration and compliance.
                </p>
              </div>

              {/* Checklist */}
              <div className="space-y-4 pt-2">
                {benefits.map((benefit, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-white/10 text-[#52B788] flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-4 h-4 fill-current text-[#4ADE80]" />
                    </div>
                    <span className="text-sm sm:text-base font-medium text-[#E8EFE9]">
                      {benefit}
                    </span>
                  </div>
                ))}
              </div>

              {/* Get Started Button */}
              <div className="pt-4">
                <button
                  onClick={onOpenConsultation}
                  className="inline-flex items-center gap-2 bg-[#FAF9F5] hover:bg-white text-[#162A1D] px-6 py-3.5 rounded-full font-semibold text-sm shadow-subtle hover:shadow-card transition-all duration-200 group cursor-pointer"
                >
                  <span>Get Started</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Arched Workspace Photo & Exact Organic Shapes (5 cols) */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-sm sm:max-w-md">
              {/* Organic sand/beige curved arc shape wrapping the top-right */}
              <div
                className="absolute -top-6 -right-6 w-64 sm:w-72 h-72 sm:h-80 bg-[#E8DFD3] rounded-[45%_55%_65%_35%/50%_45%_55%_50%] -z-10 transform rotate-6"
                aria-hidden="true"
              />

              {/* Deep olive green accent curve in the top right corner matching mock */}
              <div
                className="absolute -top-10 right-2 w-36 h-36 bg-[#213B2A] rounded-[60%_40%_50%_50%/50%_60%_40%_50%] -z-20 opacity-90 transform -rotate-12"
                aria-hidden="true"
              />

              {/* Arched Photo Frame with generated workspace photo */}
              <div className="w-full h-[380px] sm:h-[450px] rounded-t-[170px] rounded-b-[32px] overflow-hidden shadow-float border-4 border-white bg-[#FAF9F5]">
                <img
                  src="/images/workspace-laptop.jpg"
                  alt="Modern clean workspace with laptop and healthy green plant"
                  className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
