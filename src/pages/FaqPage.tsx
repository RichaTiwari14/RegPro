import React, { useState } from 'react';
import { Search, ChevronDown, MessageSquare } from 'lucide-react';
import { SEO } from '../components/common/SEO';
import { globalFAQs } from '../data/faqs';
import { getWhatsAppLink } from '../data/company';

export const FaqPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [openItems, setOpenItems] = useState<{ [key: string]: boolean }>({ '0-0': true });

  const toggle = (id: string) => {
    setOpenItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredCategories = globalFAQs
    .map((cat, catIdx) => {
      const filtered = cat.items.filter(
        (item) =>
          item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.answer.toLowerCase().includes(searchQuery.toLowerCase())
      );
      return { ...cat, items: filtered, catIdx };
    })
    .filter((cat) => cat.items.length > 0);

  return (
    <>
      <SEO
        title="Frequently Asked Questions — Legal & Registration FAQs | Regpro"
        description="Get instant answers about company incorporation, GST registrations, MSME certificates, government timelines, and statutory fees."
        keywords={['business registration FAQs', 'GST questions', 'Pvt ltd registration FAQ']}
      />

      <main className="py-12 sm:py-20 bg-[#FAF9F5]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8EFE9] text-xs font-semibold text-[#27412E] mb-3">
              <span>Knowledge Base</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#162A1D] mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-sm sm:text-base text-[#526056] leading-relaxed max-w-xl mx-auto">
              Find detailed explanations regarding statutory compliance, legal incorporation processes, and government fees in India.
            </p>

            {/* Search Box */}
            <div className="relative max-w-lg mx-auto mt-8">
              <Search className="w-5 h-5 text-[#7E9081] absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search questions (e.g. GST, capital, LLP, documents)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 rounded-full bg-white border border-[#DEE8E0] shadow-subtle focus:border-[#162A1D] focus:outline-none transition-all text-sm"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-[#7E9081] hover:text-[#162A1D]"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Categorized FAQs */}
          <div className="space-y-10">
            {filteredCategories.map((category) => (
              <div key={category.category} className="space-y-4">
                <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#162A1D] border-b border-[#E3EAE4] pb-2">
                  {category.category}
                </h2>

                <div className="space-y-3">
                  {category.items.map((faq, itemIdx) => {
                    const id = `${category.catIdx}-${itemIdx}`;
                    const isOpen = !!openItems[id];

                    return (
                      <div
                        key={itemIdx}
                        className="bg-white rounded-2xl border border-[#E3EAE4] overflow-hidden shadow-subtle"
                      >
                        <button
                          onClick={() => toggle(id)}
                          className="w-full px-6 py-4.5 text-left flex items-center justify-between gap-4 font-semibold text-sm sm:text-base text-[#162A1D] hover:bg-[#FAF9F5] transition-colors"
                        >
                          <span>{faq.question}</span>
                          <div
                            className={`w-7 h-7 rounded-full bg-[#FAF9F5] flex items-center justify-center shrink-0 transition-transform ${
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
              </div>
            ))}

            {filteredCategories.length === 0 && (
              <div className="text-center py-12 bg-white rounded-2xl border border-[#E3EAE4] p-8">
                <p className="text-base font-semibold text-[#162A1D] mb-2">
                  No matching answers found for &ldquo;{searchQuery}&rdquo;
                </p>
                <p className="text-xs text-[#526056] mb-4">
                  Have a specific question? Ask our advisors on WhatsApp directly!
                </p>
                <a
                  href={getWhatsAppLink(`Hi Regpro, I have a question: ${searchQuery}`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#162A1D] text-white text-xs font-semibold rounded-full shadow-subtle"
                >
                  <MessageSquare className="w-4 h-4 fill-current text-[#4ADE80]" />
                  <span>Ask Us on WhatsApp</span>
                </a>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
};
