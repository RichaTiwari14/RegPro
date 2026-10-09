import { Reveal } from '@/components/Reveal';

/** Steps joined by a gold horizon line that draws in as the steps reveal. */
export function ProcessSteps({ steps, light = false }: { steps: { title: string; text: string }[]; light?: boolean }) {
  return (
    <div className="relative grid gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
      <div className={`absolute left-6 right-[12%] top-6 hidden h-px lg:block ${light ? 'bg-white/10' : 'bg-navy-800/10'}`} aria-hidden="true">
        <div className="process-line h-full bg-gradient-to-r from-gold-500 via-gold-400 to-transparent" />
      </div>
      {steps.map((s, i) => (
        <Reveal key={s.title} delay={i * 140} className="relative">
          <div
            className={`relative z-10 flex h-12 w-12 items-center justify-center rounded-full border text-sm tracking-[0.1em] backdrop-blur ${
              light ? 'border-gold-400/70 bg-navy-900/60 text-gold-300' : 'border-navy-800/30 bg-mist-100/80 text-navy-800'
            }`}
          >
            {String(i + 1).padStart(2, '0')}
          </div>
          <h3 className={`mt-6 text-sm font-medium uppercase tracking-[0.14em] ${light ? 'text-white' : 'text-navy-800'}`}>{s.title}</h3>
          <p className={`mt-3 text-sm leading-relaxed ${light ? 'text-white/60' : 'text-ink/65'}`}>{s.text}</p>
        </Reveal>
      ))}
    </div>
  );
}
