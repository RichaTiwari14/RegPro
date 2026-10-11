import { motion } from 'motion/react';

/** Organic blob paths (viewBox 0 0 600 600). */
const blobs = {
  a: 'M421 61c69 37 124 109 132 189 9 80-29 168-91 227-62 60-148 91-231 77C148 540 69 481 37 403 5 325 20 228 69 157 118 86 201 41 283 33c47-5 93 6 138 28Z',
  b: 'M455 92c56 52 96 130 83 203-13 72-80 140-157 181-77 42-164 57-229 22C87 463 43 378 41 297 39 216 79 139 141 89 203 39 287 16 354 26c40 6 72 37 101 66Z',
  c: 'M498 130c48 66 66 156 36 230-29 74-106 132-190 155-84 22-174 9-231-45-57-53-80-147-58-226 23-80 90-145 168-165 78-21 227-15 275 51Z',
};

export function Blob({
  variant = 'a',
  className = '',
  color = '#D6DFCB',
  float = false,
  delay = 0,
}: {
  variant?: keyof typeof blobs;
  className?: string;
  color?: string;
  float?: boolean;
  delay?: number;
}) {
  return (
    <motion.svg
      viewBox="0 0 600 600"
      className={`pointer-events-none select-none ${className}`}
      aria-hidden="true"
      animate={float ? { rotate: [0, 4, -2, 0], scale: [1, 1.03, 0.99, 1] } : undefined}
      transition={float ? { duration: 16, repeat: Infinity, ease: 'easeInOut', delay } : undefined}
    >
      <path d={blobs[variant]} fill={color} />
    </motion.svg>
  );
}

/** Four-point sparkle ✦ from the reference. */
export function Sparkle({ className = '', color = '#3E6B48' }: { className?: string; color?: string }) {
  return (
    <motion.svg
      viewBox="0 0 24 24"
      className={`pointer-events-none ${className}`}
      aria-hidden="true"
      animate={{ rotate: [0, 90, 90, 180], scale: [1, 0.8, 1, 1] }}
      transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
    >
      <path d="M12 0c.6 6.2 5.8 11.4 12 12-6.2.6-11.4 5.8-12 12-.6-6.2-5.8-11.4-12-12C6.2 11.4 11.4 6.2 12 0Z" fill={color} />
    </motion.svg>
  );
}

/** Faint botanical branch used as a watermark at section edges. */
export function LeafBranch({ className = '', color = '#C9D4BD' }: { className?: string; color?: string }) {
  const leaves = [
    [120, 260, -40],
    [150, 215, -55],
    [185, 175, -35],
    [222, 140, -60],
    [96, 205, -120],
    [128, 160, -110],
    [165, 120, -125],
    [205, 90, -100],
  ];
  return (
    <svg viewBox="0 0 300 320" className={`pointer-events-none select-none ${className}`} aria-hidden="true">
      <path d="M40 320 C90 250 150 170 250 60" stroke={color} strokeWidth="4" fill="none" strokeLinecap="round" />
      {leaves.map(([x, y, r], i) => (
        <ellipse key={i} cx={x} cy={y} rx="34" ry="12" transform={`rotate(${r} ${x} ${y})`} fill={color} />
      ))}
    </svg>
  );
}

/** Thin hand-drawn curve accent (gold-ish line in the reference). */
export function CurveLine({ className = '', color = '#A2B492' }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 400 200" className={`pointer-events-none ${className}`} fill="none" aria-hidden="true">
      <motion.path
        d="M4 180 C 80 60, 200 20, 396 40"
        stroke={color}
        strokeWidth="1.5"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.8, ease: 'easeInOut' }}
      />
    </svg>
  );
}

/** Loose dotted connector with an arrow head (process steps). */
export function DottedArrow({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 12" className={`pointer-events-none ${className}`} fill="none" aria-hidden="true">
      <motion.path
        d="M2 6 H110"
        stroke="#A2B492"
        strokeWidth="2"
        strokeDasharray="3 6"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2 }}
      />
      <path d="M108 1 l8 5 -8 5" stroke="#A2B492" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
