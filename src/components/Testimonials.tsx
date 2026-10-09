import { Star, Quote } from 'lucide-react';
import { testimonials, type Testimonial } from '@/data/testimonials';

function Card({ t }: { t: Testimonial }) {
  return (
    <figure className="flex w-[320px] shrink-0 flex-col rounded-3xl border border-navy-100 bg-white p-6 shadow-sm sm:w-[380px]">
      <div className="flex items-center justify-between">
        <div className="flex gap-0.5">
          {Array.from({ length: t.rating }).map((_, i) => (
            <Star key={i} className="h-4 w-4 fill-gold-500 text-gold-500" />
          ))}
        </div>
        <Quote className="h-6 w-6 text-navy-100" />
      </div>
      <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-ink/80">“{t.quote}”</blockquote>
      <figcaption className="mt-6 flex items-center gap-3 border-t border-navy-50 pt-5">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-navy-700 to-navy-900 font-display text-sm font-bold text-white">
          {t.name.charAt(0)}
        </span>
        <span>
          <span className="block text-sm font-semibold text-navy-900">{t.name}</span>
          <span className="block text-xs text-ink/55">
            {t.role} · {t.service}
          </span>
        </span>
      </figcaption>
    </figure>
  );
}

/** Two rows of testimonials drifting in opposite directions; pauses on hover. */
export function Testimonials() {
  const half = Math.ceil(testimonials.length / 2);
  const rows = [testimonials.slice(0, half), testimonials.slice(half)];
  return (
    <div className="marquee-mask space-y-5">
      {rows.map((row, r) => (
        <div key={r} className="group flex overflow-hidden">
          <div className={`flex gap-5 pr-5 ${r === 0 ? 'animate-marquee' : 'animate-marquee-reverse'} group-hover:[animation-play-state:paused]`}>
            {[...row, ...row, ...row].map((t, i) => (
              <Card key={`${t.name}-${i}`} t={t} />
            ))}
          </div>
          <div
            className={`flex gap-5 pr-5 ${r === 0 ? 'animate-marquee' : 'animate-marquee-reverse'} group-hover:[animation-play-state:paused]`}
            aria-hidden="true"
          >
            {[...row, ...row, ...row].map((t, i) => (
              <Card key={`${t.name}-dup-${i}`} t={t} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
