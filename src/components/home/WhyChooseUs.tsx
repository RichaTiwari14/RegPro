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
    <section className="py-16 sm:py-24 bg-[#FAF9F5] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Deep Olive Green Card (7 cols) matching mock */}
          <div className="lg:col-span-7 bg-[#162A1D] rounded-3xl sm:rounded-4xl p-8 sm:p-12 lg:p-14 text-white shadow-card relative overflow-hidden">
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

          {/* Right Arched Workspace Photo (5 cols) matching mock */}
          <div className="lg:col-span-5 relative flex justify-center">
            {/* Background organic shape */}
            <div className="absolute inset-0 bg-[#E8EFE9] rounded-3xl transform rotate-2 -z-10 hidden sm:block" />

            {/* Arched Photo Frame with desk, laptop, and plant */}
            <div className="w-full max-w-md h-[360px] sm:h-[440px] arch-mask-top overflow-hidden shadow-card border-4 border-white bg-slate-100">
              <img
                src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=800&q=80"
                alt="Professional desk setup with laptop, notebook and potted green plant"
                className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

