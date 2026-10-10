import { Star, Quote } from 'lucide-react';
import { testimonials, type Testimonial } from '@/data/testimonials';

function Card({ t }: { t: Testimonial }) {
  return (
    <figure className="glass flex w-[320px] shrink-0 flex-col p-8 transition-transform duration-300 hover:-translate-y-1 sm:w-[380px]">
      <div className="flex items-center justify-between">
        <div className="flex gap-0.5">
          {Array.from({ length: t.rating }).map((_, i) => (
            <Star key={i} className="h-4 w-4 fill-olive-500 text-olive-500" />
          ))}
        </div>
        <Quote className="h-6 w-6 text-olive-800/15" />
      </div>
      <blockquote className="mt-5 flex-1 text-[15px] leading-relaxed text-olive-800/75">“{t.quote}”</blockquote>
      <figcaption className="mt-6 flex items-center gap-3 border-t border-olive-800/10 pt-5">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-sage-50 font-display text-lg text-sage-700">
          {t.name.charAt(0)}
        </span>
        <span>
          <span className="block font-display text-lg font-semibold text-olive-800">{t.name}</span>
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
