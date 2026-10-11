import React from 'react';
import { MessageSquare, Phone, ShieldCheck, Sparkles } from 'lucide-react';
import { getWhatsAppLink } from '../../data/company';

interface HeroSectionProps {
  onOpenConsultation: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenConsultation }) => {
  return (
    <section className="relative pt-6 pb-16 lg:pt-12 lg:pb-24 overflow-hidden">
      {/* Subtle organic background decoration */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none -z-10">
        <div className="absolute -top-10 right-10 w-96 h-96 bg-[#E8EFE9]/60 rounded-full blur-3xl" />
        <div className="absolute top-40 left-10 w-80 h-80 bg-[#FAF1E8]/50 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Editorial Headline & Copy (7 cols) */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            {/* Tag / Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E8EFE9] border border-[#D4E2D6] text-xs font-semibold text-[#27412E]">
              <Sparkles className="w-3.5 h-3.5 text-[#C87D55]" />
              <span>Business Registration &amp; Compliance Made Simple</span>
            </div>

            {/* Main Heading in Serif */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#162A1D] leading-[1.12]">
              Start, Register <br className="hidden sm:inline" />
              and Grow Your <br className="hidden sm:inline" />
              Business with Regpro
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-[#526056] leading-relaxed max-w-xl">
              End-to-end support for company registration, government documentation and compliance needs — so you can focus on building your business.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2">
              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 bg-[#162A1D] hover:bg-[#1D3525] text-white px-6 sm:px-7 py-3.5 rounded-full font-semibold text-sm sm:text-base shadow-card hover:shadow-float transition-all duration-200 group cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 fill-current text-[#4ADE80]" />
                <span>Chat on WhatsApp</span>
              </a>

              <button
                onClick={onOpenConsultation}
                className="inline-flex items-center justify-center gap-2.5 bg-white hover:bg-[#FAF9F5] text-[#162A1D] border border-[#DEE8E0] hover:border-[#162A1D] px-6 sm:px-7 py-3.5 rounded-full font-semibold text-sm sm:text-base shadow-subtle hover:shadow-card transition-all duration-200 cursor-pointer"
              >
                <Phone className="w-4 h-4 text-[#162A1D]" />
                <span>Request a Call</span>
              </button>
            </div>

            {/* Trust Mini Bullets */}
            <div className="pt-2 flex flex-wrap items-center gap-6 text-xs text-[#6B796F]">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2E6F40]"></span>
                <span>Verified CA &amp; CS Experts</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2E6F40]"></span>
                <span>100% Online Paperless Process</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2E6F40]"></span>
                <span>No Hidden Fees</span>
              </div>
            </div>
          </div>

          {/* Right Column: Architectural Skyscraper Visual & Floating Trust Card (5 cols) */}
          <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
            {/* Decorative organic background shape behind arch */}
            <div className="absolute -top-6 -right-6 w-72 h-80 bg-[#E8EFE9] rounded-[48px] -z-10 transform rotate-3" />
            <div className="absolute -bottom-6 -left-6 w-60 h-60 bg-[#F4EFE6] rounded-full -z-10" />

            {/* Main Arched Architectural Image Frame */}
            <div className="relative w-full max-w-sm sm:max-w-md h-[420px] sm:h-[480px] arch-mask-top overflow-hidden shadow-card border-4 border-white bg-slate-200">
              <img
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80"
                alt="Modern corporate glass skyscrapers representing corporate growth"
                className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
                loading="eager"
              />

              {/* Floating Trust Card over Image - Exactly matching design reference */}
              <div className="absolute bottom-6 right-6 bg-white/95 backdrop-blur-md px-5 py-3.5 rounded-2xl shadow-float border border-[#DEE8E0] flex items-center gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className="w-10 h-10 rounded-xl bg-[#FAF1E8] flex items-center justify-center text-[#C87D55] shrink-0">
                  <ShieldCheck className="w-5 h-5 text-[#C87D55]" />
                </div>
                <div>
                  <div className="text-[10px] uppercase font-bold tracking-wider text-[#7E9081]">
                    Trusted by
                  </div>
                  <div className="font-serif text-base font-bold text-[#162A1D] leading-tight">
                    5,000+ Businesses
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

