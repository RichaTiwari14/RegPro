import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { Container, Eyebrow } from '@/components/ui';

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
    <section className="relative overflow-hidden bg-navy-900 pb-16 pt-10 text-white sm:pb-20">
      <div className="grid-pattern pointer-events-none absolute inset-0 opacity-40" />
      <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-gold-500/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 left-0 h-96 w-96 rounded-full bg-navy-400/25 blur-3xl" />
      <Container className="relative">
        <nav aria-label="Breadcrumb" className="mb-8 flex flex-wrap items-center gap-1 text-xs text-white/55">
          {crumbs.map((c, i) => (
            <span key={c.path} className="flex items-center gap-1">
              {i > 0 && <ChevronRight className="h-3 w-3" />}
              {i < crumbs.length - 1 ? (
                <Link to={c.path} className="hover:text-white">
                  {c.name}
                </Link>
              ) : (
                <span className="text-white/85">{c.name}</span>
              )}
            </span>
          ))}
        </nav>
        <div className="hero-in max-w-3xl">
          {eyebrow && <Eyebrow light>{eyebrow}</Eyebrow>}
          <h1 className="mt-4 font-display text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl">{title}</h1>
          {text && <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg">{text}</p>}
        </div>
        {children}
      </Container>
    </section>
  );
}
