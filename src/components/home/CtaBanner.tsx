import React from 'react';
import { Send, MessageSquare, Phone } from 'lucide-react';
import { getWhatsAppLink } from '../../data/company';

interface CtaBannerProps {
  onOpenConsultation: () => void;
}

export const CtaBanner: React.FC<CtaBannerProps> = ({ onOpenConsultation }) => {
  return (
    <section className="py-12 sm:py-16 bg-[#FAF9F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#EBF1ED] border border-[#D4E2D6] rounded-[32px] sm:rounded-[40px] p-8 sm:p-12 relative overflow-hidden shadow-subtle">
          {/* Organic soft curved blob inside banner matching reference */}
          <div
            className="absolute -top-16 -right-16 w-72 h-72 bg-[#DDE8DF] rounded-[45%_55%_60%_40%/40%_60%_50%_50%] pointer-events-none -z-0"
            aria-hidden="true"
          />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            {/* Left: Round Badge & Text */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-5">
              <div className="w-14 h-14 rounded-full bg-white border border-[#D4E2D6] text-[#162A1D] flex items-center justify-center shrink-0 shadow-subtle">
                <Send className="w-6 h-6 text-[#162A1D] -translate-x-0.5 translate-y-0.5" />
              </div>

              <div>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#162A1D] mb-1.5">
                  Have Questions? Let&apos;s Talk!
                </h3>
                <p className="text-sm text-[#526056] max-w-lg">
                  Get expert advice on your business registration and compliance needs.
                </p>
              </div>
            </div>

            {/* Right: Dual CTAs matching reference */}
            <div className="flex flex-wrap items-center justify-center gap-3.5 shrink-0">
              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#162A1D] hover:bg-[#1D3525] text-white px-6 py-3.5 rounded-full text-xs sm:text-sm font-semibold shadow-card hover:shadow-float transition-all cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 fill-current text-[#4ADE80]" />
                <span>Chat on WhatsApp</span>
              </a>

              <button
                onClick={onOpenConsultation}
                className="inline-flex items-center gap-2 bg-white hover:bg-[#FAF9F5] text-[#162A1D] border border-[#DEE8E0] px-6 py-3.5 rounded-full text-xs sm:text-sm font-semibold shadow-subtle hover:shadow-card transition-all cursor-pointer"
              >
                <Phone className="w-4 h-4 text-[#162A1D]" />
                <span>Request a Call</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
