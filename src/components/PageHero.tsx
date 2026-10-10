import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Eyebrow } from '@/components/ui';
import { MaskedWords } from '@/components/Reveal';

/** Inner-page hero: the landing video's pale sky, drifting mist and ridges flowing into the page. */
export function PageHero({
  eyebrow,
  title,
  text,
  crumbs,
  children,
}: {
  eyebrow?: string;
  title: ReactNode;
  text?: ReactNode;
  crumbs: { name: string; path: string }[];
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-white/10 bg-black pb-16 pt-[calc(76px+3rem)] sm:pb-20 sm:pt-[calc(80px+4.5rem)]">
      <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-8 md:px-12">
        <nav aria-label="Breadcrumb" className="label-cine mb-10 flex flex-wrap items-center gap-2 text-white/50">
          {crumbs.map((c, i) => (
            <span key={c.path} className="flex items-center gap-2">
              {i > 0 && <span className="h-px w-4 bg-white/30" />}
              {i < crumbs.length - 1 ? (
                <Link to={c.path} className="hover:text-white">
                  {c.name}
                </Link>
              ) : (
                <span className="text-white/80">{c.name}</span>
              )}
            </span>
          ))}
        </nav>
        <div className="hero-in max-w-4xl">
          {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
          <h1 className="heading-cine mt-5 text-white" style={{ fontSize: 'clamp(2.1rem,5vw,4.6rem)' }}>
            {typeof title === 'string' ? <MaskedWords text={title} delay={150} /> : title}
          </h1>
          {text && <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg">{text}</p>}
        </div>
        {children}
      </div>
    </section>
  );
}
