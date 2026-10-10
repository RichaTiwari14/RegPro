import { motion } from 'motion/react';

/**
 * Handwritten note with a hand-drawn gold arrow that draws itself in — the script annotations from the design.
 * `arrow` picks the direction the arrow curls towards.
 */
export function Scribble({
  text,
  arrow = 'down-right',
  light = false,
  className = '',
}: {
  text: string;
  arrow?: 'down-right' | 'down-left' | 'right';
  light?: boolean;
  className?: string;
}) {
  const paths = {
    'down-right': 'M6 6 C 40 10, 70 30, 78 62 M64 52 L78 64 L86 48',
    'down-left': 'M84 6 C 50 10, 22 30, 14 62 M28 52 L14 64 L6 48',
    right: 'M4 30 C 30 8, 60 8, 88 26 M74 14 L88 26 L72 34',
  };
  return (
    <motion.div
      className={`pointer-events-none select-none ${className}`}
      initial={{ opacity: 0, rotate: -10, y: 8 }}
      whileInView={{ opacity: 1, rotate: -6, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      aria-hidden="true"
    >
      <p className={`whitespace-pre-line font-script text-2xl font-bold leading-[1.05] sm:text-[28px] ${light ? 'text-white' : 'text-navy-800'}`}>{text}</p>
      <svg viewBox="0 0 92 70" className="mt-1 h-12 w-16" fill="none">
        <motion.path
          d={paths[arrow]}
          stroke="#D6A21F"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, delay: 0.4, ease: 'easeInOut' }}
        />
      </svg>
    </motion.div>
  );
}
