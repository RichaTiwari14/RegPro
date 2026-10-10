import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ChevronRight } from 'lucide-react';
import { Eyebrow } from '@/components/ui';
import { MaskedWords } from '@/components/Reveal';
import { Leaf } from '@/components/Leaf';

const EASE = [0.215, 0.61, 0.355, 1] as const;

/** Inner-page hero: soft white band with floating leaves, serif title and an optional framed image. */
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
  /** Words in a string `title` set in sage italic. */
  highlight?: string[];
  image?: string;
  /** Short italic note shown on the image card. */
  scribble?: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-cream">
      <div
        className="pointer-events-none absolute -right-40 -top-40 h-[560px] w-[560px] rounded-full"
        style={{ background: 'radial-gradient(closest-side, rgba(110,144,148,0.18), rgba(110,144,148,0))' }}
      />
      <Leaf className="absolute left-6 top-28 hidden lg:block" rotate={-20} opacity={0.35} float />
      {!image && <Leaf className="absolute bottom-10 right-[10%] hidden md:block" rotate={28} flip color="#6E9094" opacity={0.45} float delay={1.2} />}

      <div
        className={`relative z-10 mx-auto grid max-w-7xl items-center gap-14 px-5 pb-20 pt-[calc(76px+2.5rem)] sm:px-6 sm:pb-24 sm:pt-[calc(76px+3.5rem)] lg:px-8 ${
          image ? 'lg:grid-cols-[1.1fr_0.9fr]' : ''
        }`}
      >
        <div className="min-w-0">
          <nav aria-label="Breadcrumb" className="mb-8 flex flex-wrap items-center gap-1.5 text-xs font-medium text-subtle">
            {crumbs.map((c, i) => (
              <span key={c.path} className="flex items-center gap-1.5">
                {i > 0 && <ChevronRight className="h-3 w-3 text-sage-500" />}
                {i < crumbs.length - 1 ? (
                  <Link to={c.path} className="hover:text-olive-800">
                    {c.name}
                  </Link>
                ) : (
                  <span className="text-olive-800">{c.name}</span>
                )}
              </span>
            ))}
          </nav>
          <div className="max-w-3xl">
            {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
            <h1 className="heading-cine mt-5" style={{ fontSize: 'clamp(2.8rem,6vw,5rem)' }}>
              {typeof title === 'string' ? <MaskedWords text={title} delay={120} highlight={highlight} /> : title}
            </h1>
            {text && (
              <motion.p
                className="mt-6 max-w-2xl text-base leading-relaxed text-muted sm:text-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.45, ease: EASE }}
              >
                {text}
              </motion.p>
            )}
          </div>
          {children && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.6, ease: EASE }}>
              {children}
            </motion.div>
          )}
        </div>
        {image && (
          <motion.div
            className="relative mx-auto w-full max-w-[440px] lg:mr-0"
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.3, ease: EASE }}
          >
            <Leaf className="absolute -left-5 -top-7 z-10" rotate={-25} color="#65733F" opacity={0.85} float />
            <div className="relative aspect-[5/4] overflow-hidden rounded-3xl shadow-2xl shadow-olive-900/15">
              <img src={image} alt="" className="h-full w-full object-cover" />
            </div>
            {scribble && (
              <motion.div
                className="absolute -bottom-6 -right-3 rounded-2xl border border-mist-300/60 bg-soft-white px-5 py-4 shadow-xl shadow-olive-900/10 lg:-right-8"
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1, ease: [0.34, 1.56, 0.64, 1] }}
              >
                <p className="whitespace-pre-line font-display text-xl italic leading-snug text-olive-800">{scribble}</p>
              </motion.div>
            )}
          </motion.div>
        )}
      </div>
    </section>
  );
}
