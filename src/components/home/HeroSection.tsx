import React from 'react';
import { MessageSquare, Phone, ShieldCheck, Sparkles } from 'lucide-react';
import { getWhatsAppLink } from '../../data/company';

interface HeroSectionProps {
  onOpenConsultation: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenConsultation }) => {
  return (
    <section className="relative pt-6 pb-16 lg:pt-14 lg:pb-24 overflow-hidden bg-[#FAF9F5]">
      {/* Organic Background Curves across hero */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        {/* Soft sage curved ambient wave from top right */}
        <svg
          className="absolute -top-12 -right-24 w-[650px] h-[650px] text-[#E8EFE9] opacity-70"
          viewBox="0 0 600 600"
          fill="none"
        >
          <path
            d="M300,50 C450,40 550,150 560,300 C570,450 440,560 300,550 C160,540 50,440 40,300 C30,160 150,60 300,50 Z"
            fill="currentColor"
          />
        </svg>

        {/* Faint warm cream organic curve on left */}
        <svg
          className="absolute top-1/3 -left-32 w-[500px] h-[500px] text-[#F5EFE6] opacity-60"
          viewBox="0 0 500 500"
          fill="none"
        >
          <path
            d="M250,40 C380,30 460,130 470,250 C480,370 380,470 250,460 C120,450 40,360 30,250 C20,140 120,50 250,40 Z"
            fill="currentColor"
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Editorial Headline & Copy (7 cols) */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8 z-10">
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
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-1">
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

          {/* Right Column: Architectural Skyscraper Visual & Exact Organic Shapes (5 cols) */}
          <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[340px] sm:max-w-[400px]">
              {/* 1. Organic Sage Green Shape curving behind top-right of the building */}
              <div
                className="absolute -top-7 -right-6 w-56 sm:w-64 h-72 sm:h-80 bg-[#B2C4B5]/80 rounded-[48%_52%_60%_40%/42%_45%_55%_58%] -z-10 transform rotate-12 transition-transform duration-700 hover:rotate-6"
                aria-hidden="true"
              />

              {/* 2. Organic Warm Sand/Cream Blob at bottom-left */}
              <div
                className="absolute -bottom-6 -left-8 w-44 sm:w-52 h-44 sm:h-52 bg-[#EFEBE1] rounded-[55%_45%_40%_60%/50%_60%_40%_50%] -z-10"
                aria-hidden="true"
              />

              {/* 3. Main Arched Skyscraper Image Frame matching exact reference */}
              <div className="relative w-full h-[430px] sm:h-[490px] rounded-t-[190px] rounded-b-[32px] overflow-hidden shadow-float border-4 border-white bg-[#E8EFE9]">
                <img
                  src="/images/hero-skyscrapers.jpg"
                  alt="Modern corporate glass skyscrapers reaching into the sky"
                  className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
                  loading="eager"
                />

                {/* Overlapping Floating Trust Card on bottom-right matching reference */}
                <div className="absolute bottom-6 right-5 sm:right-6 bg-white/95 backdrop-blur-md px-5 py-3 rounded-2xl shadow-float border border-[#DEE8E0] flex items-center gap-3 z-20">
                  <div className="w-9 h-9 rounded-xl bg-[#FAF1E8] flex items-center justify-center text-[#C87D55] shrink-0">
                    <ShieldCheck className="w-5 h-5 text-[#C87D55]" />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase font-bold tracking-wider text-[#7E9081]">
                      Trusted by
                    </div>
                    <div className="font-serif text-sm sm:text-base font-bold text-[#162A1D] leading-tight">
                      5,000+ Businesses
                    </div>
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
