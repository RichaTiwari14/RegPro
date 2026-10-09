import { useState } from 'react';
import { Plus } from 'lucide-react';

export function FaqList({ faqs, light = false }: { faqs: { q: string; a: string }[]; light?: boolean }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="space-y-3">
      {faqs.map((f, i) => {
        const isOpen = open === i;
        return (
          <div
            key={f.q}
            className={`overflow-hidden rounded-2xl border transition-colors duration-300 ${
              light
                ? 'border-white/10 bg-white/5'
                : isOpen
                  ? 'border-navy-200 bg-white shadow-lg shadow-navy-900/5'
                  : 'border-navy-100 bg-white'
            }`}
          >
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6"
            >
              <span className={`font-semibold ${light ? 'text-white' : 'text-navy-900'}`}>{f.q}</span>
              <span
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
                  isOpen ? 'rotate-45 bg-gold-500 text-white' : light ? 'bg-white/10 text-white' : 'bg-navy-50 text-navy-800'
                }`}
              >
                <Plus className="h-4 w-4" />
              </span>
            </button>
            <div className={`grid transition-all duration-300 ease-out ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
              <div className="overflow-hidden">
                <p className={`px-5 pb-5 text-sm leading-relaxed sm:px-6 ${light ? 'text-white/70' : 'text-ink/70'}`}>{f.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
