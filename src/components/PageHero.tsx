import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ChevronRight } from 'lucide-react';
import { MaskedWords } from '@/components/Reveal';
import { Leaf } from '@/components/Leaf';

const EASE = [0.22, 1, 0.36, 1] as const;

/** Inner-page hero in the reference style: eyebrow with rule, Playfair title, optional arched photo with a handwritten note. */
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
  /** Words in a string `title` set in green italic. */
  highlight?: string[];
  image?: string;
  /** Short handwritten note over the photo. */
  scribble?: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-mist-300">
      {!image && <Leaf className="absolute right-[12%] top-14 hidden md:block" rotate={24} width={40} height={96} color="#97A38B" float />}
      <div
        className={`relative mx-auto grid max-w-7xl items-center gap-12 px-5 pb-16 pt-8 sm:px-6 sm:pb-20 sm:pt-12 lg:px-8 ${image ? 'lg:grid-cols-[1.1fr_0.9fr]' : ''}`}
      >
        <div className="min-w-0">
          <nav aria-label="Breadcrumb" className="mb-8 flex flex-wrap items-center gap-1.5 text-xs text-muted">
            {crumbs.map((c, i) => (
              <span key={c.path} className="flex items-center gap-1.5">
                {i > 0 && <ChevronRight className="h-3 w-3" />}
                {i < crumbs.length - 1 ? (
                  <Link to={c.path} className="hover:text-ink">
                    {c.name}
                  </Link>
                ) : (
                  <span className="text-ink">{c.name}</span>
                )}
              </span>
            ))}
          </nav>
          <div className="max-w-3xl">
            {eyebrow && (
              <motion.p className="eyebrow" initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, ease: EASE }}>
                {eyebrow}
              </motion.p>
            )}
            <h1 className="heading-cine mt-5" style={{ fontSize: 'clamp(2.6rem,5.6vw,4.6rem)', lineHeight: 1.04 }}>
              {typeof title === 'string' ? <MaskedWords text={title} delay={120} highlight={highlight} /> : title}
            </h1>
            {text && (
              <motion.p
                className="mt-6 max-w-2xl text-base leading-relaxed text-muted sm:text-[17px]"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.4, ease: EASE }}
              >
                {text}
              </motion.p>
            )}
          </div>
          {children && (
            <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.55, ease: EASE }}>
              {children}
            </motion.div>
          )}
        </div>
        {image && (
          <motion.div
            className="relative mx-auto w-full max-w-[420px] lg:mr-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.2, ease: EASE }}
          >
            <div className="aspect-[5/6] overflow-hidden rounded-t-full bg-mist-200 shadow-[0_40px_80px_-40px_rgba(30,34,30,0.45)]">
              <img src={image} alt="" className="h-full w-full object-cover" />
            </div>
            {scribble && (
              <p className="absolute -bottom-4 -left-4 whitespace-pre-line rounded-2xl bg-soft-white px-5 py-3 font-script text-2xl leading-[1.05] text-ink shadow-lg shadow-ink/10 sm:-left-10">
                {scribble}
              </p>
            )}
            <Leaf className="absolute -right-6 -top-6" rotate={28} width={40} height={96} color="#97A38B" float />
          </motion.div>
        )}
      </div>
    </section>
  );
}
