import type { ReactNode } from 'react';
import { motion } from 'motion/react';
import { MaskedWords } from '@/components/Reveal';
import { Breadcrumbs, type Crumb } from '@/components/Breadcrumbs';
import { Blob, Sparkle } from '@/components/Shapes';

const EASE = [0.22, 1, 0.36, 1] as const;

/** Inner-page hero: ivory band, breadcrumb, gold eyebrow, serif title (selected words in gold), optional framed image. */
export function PageHero({
  eyebrow,
  title,
  text,
  crumbs,
  highlight = [],
  image,
  imageAlt = '',
  children,
}: {
  eyebrow?: string;
  title: string;
  text?: ReactNode;
  crumbs: Crumb[];
  highlight?: string[];
  image?: string;
  imageAlt?: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-ivory">
      {image && <Blob variant="b" color="#E3EAD9" className="pointer-events-none absolute -right-40 -top-32 hidden h-[620px] w-[620px] md:block" float />}
      <div className={`relative mx-auto grid max-w-site items-center gap-12 px-5 pb-14 pt-8 sm:px-6 sm:pb-20 sm:pt-10 lg:px-8 ${image ? 'lg:grid-cols-[1.1fr_0.9fr]' : ''}`}>
        <div className="min-w-0">
          <Breadcrumbs crumbs={crumbs} />
          {eyebrow && (
            <motion.p className="eyebrow mt-8" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, ease: EASE }}>
              {eyebrow}
            </motion.p>
          )}
          <h1 className="heading mt-4" style={{ fontSize: 'clamp(2.3rem,4.8vw,3.9rem)' }}>
            <MaskedWords text={title} delay={100} highlight={highlight} />
          </h1>
          {text && (
            <motion.p
              className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-[17px]"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.35, ease: EASE }}
            >
              {text}
            </motion.p>
          )}
          {children && (
            <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.5, ease: EASE }}>
              {children}
            </motion.div>
          )}
        </div>
        {image && (
          <div className="relative mx-auto w-full max-w-[520px] lg:mr-0">
            <Sparkle className="absolute -left-8 top-6 hidden h-6 w-6 sm:block" />
            <motion.div
              initial={{ opacity: 0, x: 30, borderRadius: '28px' }}
              animate={{ opacity: 1, x: 0, borderRadius: '160px 24px 24px 160px' }}
              transition={{ duration: 1.2, delay: 0.15, ease: EASE }}
              className="relative aspect-[16/11] overflow-hidden bg-sage-100 shadow-lift"
            >
              <img src={image} alt={imageAlt} className="h-full w-full object-cover" />
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
}
