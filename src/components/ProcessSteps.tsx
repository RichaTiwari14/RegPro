import { Reveal } from '@/components/Reveal';

export function ProcessSteps({ steps, light = false }: { steps: { title: string; text: string }[]; light?: boolean }) {
  return (
    <div className="relative grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      <div
        className={`absolute left-[12%] right-[12%] top-7 hidden h-px lg:block ${light ? 'bg-white/15' : 'bg-navy-100'}`}
        aria-hidden="true"
      >
        <div className="process-line h-full bg-gradient-to-r from-gold-400 via-gold-500 to-gold-400" />
      </div>
      {steps.map((s, i) => (
        <Reveal key={s.title} delay={i * 120} className="relative">
          <div
            className={`relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl font-display text-lg font-bold shadow-lg ${
              light ? 'bg-gold-500 text-navy-950 shadow-gold-500/30' : 'bg-navy-800 text-white shadow-navy-900/20'
            }`}
          >
            {String(i + 1).padStart(2, '0')}
          </div>
          <h3 className={`mt-5 font-display text-lg font-bold ${light ? 'text-white' : 'text-navy-900'}`}>{s.title}</h3>
          <p className={`mt-2 text-sm leading-relaxed ${light ? 'text-white/65' : 'text-ink/65'}`}>{s.text}</p>
        </Reveal>
      ))}
    </div>
  );
}
