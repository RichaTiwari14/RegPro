import React, { useState } from 'react';
import { ChevronDown, HelpCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { homepageFAQs } from '../../data/faqs';

export const HomeFaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 sm:py-24 bg-[#FAF9F5] border-t border-[#E8ECE8]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8EFE9] text-xs font-semibold text-[#27412E] mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-[#C87D55]" />
            <span>Frequently Asked Questions</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#162A1D] tracking-tight mb-3">
            Common Questions, Clear Answers
          </h2>
          <p className="text-sm sm:text-base text-[#526056]">
            Everything you need to know about starting, registering, and staying compliant.
          </p>
        </div>

        {/* Accordions */}
        <div className="space-y-3.5">
          {homepageFAQs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-[#E3EAE4] overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => toggleAccordion(idx)}
                  className="w-full px-6 py-4.5 text-left flex items-center justify-between gap-4 font-semibold text-sm sm:text-base text-[#162A1D] hover:bg-[#FAF9F5] transition-colors"
                >
                  <span>{faq.question}</span>
                  <div
                    className={`w-7 h-7 rounded-full bg-[#FAF9F5] flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 bg-[#E8EFE9]' : ''
                    }`}
                  >
                    <ChevronDown className="w-4 h-4 text-[#526056]" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-[#526056] leading-relaxed border-t border-[#F4EFE6]/60">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Link to full FAQs */}
        <div className="mt-8 text-center">
          <Link
            to="/faqs"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#162A1D] hover:text-[#27412E] transition-colors"
          >
            <span>Have more questions? Browse our complete FAQ directory</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

