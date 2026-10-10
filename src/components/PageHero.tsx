import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ChevronRight } from 'lucide-react';
import { Eyebrow } from '@/components/ui';
import { MaskedWords } from '@/components/Reveal';
import { Scribble } from '@/components/Scribble';

const EASE = [0.16, 1, 0.3, 1] as const;

/** Inner-page hero: cream band with a dotted grid, word-by-word title and an optional framed image + handwritten note. */
export function PageHero({
  eyebrow,
  title,
  text,
  crumbs,
  highlight = [],
  image,
  scribble,
  children,
}: {
  eyebrow?: string;
  title: ReactNode;
  text?: ReactNode;
  crumbs: { name: string; path: string }[];
  /** Words in a string `title` to paint gold. */
  highlight?: string[];
  image?: string;
  scribble?: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-cream">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage: 'radial-gradient(rgba(11,42,91,0.12) 1px, transparent 1px)',
          backgroundSize: '26px 26px',
          maskImage: 'linear-gradient(to bottom, black, transparent 85%)',
          WebkitMaskImage: 'linear-gradient(to bottom, black, transparent 85%)',
        }}
      />
      <div
        className="pointer-events-none absolute -right-40 -top-40 h-[560px] w-[560px] rounded-full"
        style={{ background: 'radial-gradient(closest-side, rgba(214,162,31,0.13), rgba(214,162,31,0))' }}
      />
      <div className={`relative z-10 mx-auto grid max-w-7xl items-center gap-14 px-5 pb-16 pt-10 sm:px-6 sm:pb-20 sm:pt-14 lg:px-8 ${image ? 'lg:grid-cols-[1.1fr_0.9fr]' : ''}`}>
        <div className="min-w-0">
          <nav aria-label="Breadcrumb" className="mb-8 flex flex-wrap items-center gap-1.5 text-xs font-medium text-subtle">
            {crumbs.map((c, i) => (
              <span key={c.path} className="flex items-center gap-1.5">
                {i > 0 && <ChevronRight className="h-3 w-3 text-gold-500" />}
                {i < crumbs.length - 1 ? (
                  <Link to={c.path} className="hover:text-navy-800">
                    {c.name}
                  </Link>
                ) : (
                  <span className="text-navy-800">{c.name}</span>
                )}
              </span>
            ))}
          </nav>
          <div className="max-w-3xl">
            {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
            <h1 className="heading-cine mt-5 !font-extrabold" style={{ fontSize: 'clamp(2.2rem,4.8vw,4rem)' }}>
              {typeof title === 'string' ? <MaskedWords text={title} delay={120} highlight={highlight} /> : title}
            </h1>
            {text && (
              <motion.p
                className="mt-6 max-w-2xl text-base leading-relaxed text-muted sm:text-lg"
                initial={{ opacity: 0, y: 14, filter: 'blur(6px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 1, delay: 0.45, ease: EASE }}
              >
                {text}
              </motion.p>
            )}
          </div>
          {children && (
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.6, ease: EASE }}>
              {children}
            </motion.div>
          )}
        </div>
        {image && (
          <div className={`relative mx-auto w-full max-w-[460px] lg:mr-0 ${scribble ? 'mt-10 lg:mt-16' : ''}`}>
            <motion.div
              className="relative aspect-[5/4] overflow-hidden rounded-[2rem] shadow-[0_40px_80px_-30px_rgba(11,42,91,0.45)]"
              initial={{ opacity: 0, scale: 0.94, rotate: 2 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1.3, delay: 0.2, ease: EASE }}
            >
              <img src={image} alt="" className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/40 to-transparent" />
            </motion.div>
            <div className="absolute -bottom-4 -left-4 -z-10 h-full w-full rounded-[2rem] border-2 border-gold-300/60" aria-hidden="true" />
            {scribble && <Scribble text={scribble} arrow="down-right" className="absolute -left-10 -top-16 hidden sm:block lg:-left-28" />}
          </div>
        )}
      </div>
    </section>
  );
}
