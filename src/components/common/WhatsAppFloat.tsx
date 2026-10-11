import React from 'react';
import { MessageSquare, Phone } from 'lucide-react';
import { getWhatsAppLink, getPhoneLink, companyConfig } from '../../data/company';

export const WhatsAppFloat: React.FC = () => {
  return (
    <div className="fixed bottom-6 right-5 sm:right-7 z-40 flex flex-col items-end gap-3 pointer-events-auto">
      {/* Click-to-call for Mobile and Desktop */}
      <a
        href={getPhoneLink()}
        aria-label="Call Regpro advisor"
        className="hidden sm:flex items-center gap-2.5 bg-white text-[#162A1D] border border-[#DEE8E0] hover:border-[#162A1D] px-4 py-2.5 rounded-full shadow-card hover:shadow-float text-xs font-semibold transition-all group"
      >
        <span className="w-6 h-6 rounded-full bg-[#E8EFE9] flex items-center justify-center text-[#162A1D] group-hover:bg-[#162A1D] group-hover:text-white transition-colors">
          <Phone className="w-3.5 h-3.5" />
        </span>
        <span>Call: {companyConfig.phoneDisplay}</span>
      </a>

      {/* WhatsApp Floating Button */}
      <a
        href={getWhatsAppLink()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp with Regpro team"
        className="flex items-center gap-3 bg-[#1A3324] hover:bg-[#152A1E] text-white pl-4 pr-5 py-3.5 rounded-full shadow-float hover:scale-105 active:scale-95 transition-all duration-200 group border border-[#3D5943]/40"
      >
        <div className="relative flex items-center justify-center">
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#4ADE80] rounded-full animate-ping"></span>
          <span className="relative w-2.5 h-2.5 bg-[#4ADE80] rounded-full"></span>
          <MessageSquare className="w-5 h-5 ml-1.5 fill-current text-[#4ADE80]" />
        </div>
        <div className="flex flex-col text-left">
          <span className="text-[10px] uppercase font-bold tracking-wider text-[#A3B8A8]">Expert Online</span>
          <span className="text-xs font-bold leading-tight">Chat on WhatsApp</span>
        </div>
      </a>
    </div>
  );
};

