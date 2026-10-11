import React from 'react';
import { MessageSquare, FileText, Cpu, Award } from 'lucide-react';

export const ProcessSection: React.FC = () => {
  const steps = [
    {
      num: '1',
      title: 'Share Your Details',
      desc: 'Tell us what you need.',
      icon: MessageSquare,
    },
    {
      num: '2',
      title: 'Document Submission',
      desc: 'Upload required documents online.',
      icon: FileText,
    },
    {
      num: '3',
      title: 'Processing',
      desc: 'We handle the entire government process.',
      icon: Cpu,
    },
    {
      num: '4',
      title: 'Get Your Registration',
      desc: 'Receive your certificate and start your business.',
      icon: Award,
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-[#FAF9F5] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8EFE9] text-xs font-semibold text-[#27412E] mb-3">
            <span>Our Process</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#162A1D] tracking-tight mb-3">
            Simple 4-Step Process
          </h2>
          <p className="text-sm sm:text-base text-[#526056]">
            Get your business registered in just a few simple steps.
          </p>
        </div>

        {/* 4 Steps with exact dotted timeline connector matching mock */}
        <div className="relative">
          {/* Dashed connector line with subtle arrows between nodes for desktop */}
          <div className="hidden lg:flex items-center justify-between absolute top-7 left-24 right-24 pointer-events-none -z-0">
            <div className="flex-1 border-t-2 border-dashed border-[#D4E2D6] relative">
              <span className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[#E8EFE9] border-2 border-[#BACFBE]"></span>
            </div>
            <div className="w-16"></div>
            <div className="flex-1 border-t-2 border-dashed border-[#D4E2D6] relative">
              <span className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[#E8EFE9] border-2 border-[#BACFBE]"></span>
            </div>
            <div className="w-16"></div>
            <div className="flex-1 border-t-2 border-dashed border-[#D4E2D6] relative">
              <span className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[#E8EFE9] border-2 border-[#BACFBE]"></span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 relative z-10">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div key={idx} className="flex flex-col items-center text-center">
                  {/* Step Icon Badge matching mock: Rounded square in warm peach tint with terracotta icon */}
                  <div className="w-14 h-14 rounded-2xl bg-[#FCF2EB] border border-[#F4DEC9] text-[#C87D55] flex items-center justify-center shadow-subtle mb-5 relative group transition-transform hover:scale-105">
                    <Icon className="w-6 h-6 stroke-[1.8]" />
                  </div>

                  {/* Step Title & Description */}
                  <h3 className="font-bold text-sm sm:text-base text-[#162A1D] mb-1.5">
                    {step.num}. {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#526056] leading-relaxed max-w-xs">
                    {step.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
