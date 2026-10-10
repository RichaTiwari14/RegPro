import { useState, type ReactNode } from 'react';
import { motion } from 'motion/react';

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Scroll-into-view entrance: rises, sharpens from a soft blur and settles (Framer Motion).
 * Adds `is-visible` once shown so CSS-driven details inside (tracker, process line) can start too.
 */
export function Reveal({
  children,
  delay = 0,
  className = '',
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const [shown, setShown] = useState(false);
  return (
    <motion.div
      className={`reveal ${shown ? 'is-visible' : ''} ${className}`}
      initial={{ opacity: 0, y: 40, scale: 0.985, filter: 'blur(8px)' }}
      whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', transitionEnd: { filter: 'none' } }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 1, ease: EASE, delay: delay / 1000 }}
      onViewportEnter={() => setShown(true)}
    >
      {children}
    </motion.div>
  );
}

/** Headline that reveals word by word, each word rising out of a mask. */
export function MaskedWords({
  text,
  className = '',
  delay = 0,
  highlight = [],
}: {
  text: string;
  className?: string;
  delay?: number;
  /** Words (exact match) to paint in the logo gold. */
  highlight?: string[];
}) {
  const words = text.split(' ');
  return (
    <motion.span
      className={className}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ staggerChildren: 0.06, delayChildren: delay / 1000 }}
      aria-label={text}
    >
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.12em] align-top -mb-[0.12em]" aria-hidden="true">
          <motion.span
            className={`inline-block ${highlight.includes(w.replace(/[.,!?]$/, '')) ? 'text-gold-500' : ''}`}
            variants={{ hidden: { y: '110%', rotate: 4 }, shown: { y: '0%', rotate: 0 } }}
            transition={{ duration: 0.9, ease: EASE }}
          >
            {w}
            {i < words.length - 1 && ' '}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
