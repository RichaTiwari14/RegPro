import { useState } from 'react';
import { Plus } from 'lucide-react';

/** Hairline accordion in the landing page's minimal style. */
export function FaqList({ faqs, light = false }: { faqs: { q: string; a: string }[]; light?: boolean }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className={`border-t ${light ? 'border-white/15' : 'border-white/15'}`}>
      {faqs.map((f, i) => {
        const isOpen = open === i;
        return (
          <div key={f.q} className={`border-b ${light ? 'border-white/15' : 'border-white/15'}`}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="group flex w-full items-center justify-between gap-6 py-5 text-left"
            >
              <span className={`text-base sm:text-lg ${light ? 'text-white' : 'text-white'}`}>{f.q}</span>
              <span
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all duration-500 ${
                  isOpen
                    ? 'rotate-45 border-gold-500 bg-gold-500 text-white'
                    : light
                      ? 'border-white/30 text-white'
                      : 'border-white/25 text-white group-hover:border-white/60'
                }`}
              >
                <Plus className="h-4 w-4" />
              </span>
            </button>
            <div className={`grid transition-all duration-500 ease-out ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
              <div className="overflow-hidden">
                <p className={`pb-6 pr-14 text-sm leading-relaxed ${light ? 'text-white/65' : 'text-white/65'}`}>{f.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
