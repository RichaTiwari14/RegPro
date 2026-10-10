import { motion } from 'motion/react';

/**
 * Hand-drawn botanical leaf (from the Cozy-Café reference). `float` gives it a slow,
 * random-feeling bob and sway — the floating leaves around the hero and section headers.
 */
export function Leaf({
  className = '',
  width = 44,
  height = 104,
  color = '#97A38B',
  vein = '#FBF9F5',
  rotate = 0,
  flip = false,
  opacity = 1,
  float = false,
  delay = 0,
}: {
  className?: string;
  width?: number;
  height?: number;
  color?: string;
  vein?: string;
  rotate?: number;
  flip?: boolean;
  opacity?: number;
  float?: boolean;
  delay?: number;
}) {
  const svg = (
    <svg width={width} height={height} viewBox="0 0 60 140" fill="none" style={{ transform: flip ? 'scaleX(-1)' : undefined }}>
      <path d="M15 136 C 14 120 17 95 24 65 C 32 32 44 12 50 4 C 52 16 52 35 46 68 C 40 98 32 124 20 137 C 18 139 16 138 15 136 Z" fill={color} />
      <path d="M17 132 C 24 100 34 65 44 26" stroke={vein} strokeWidth="2.8" strokeLinecap="round" opacity="0.85" />
    </svg>
  );
  return (
    <motion.div
      className={`pointer-events-none select-none ${className}`}
      style={{ opacity }}
      aria-hidden="true"
      initial={{ rotate, y: 0 }}
      animate={float ? { y: [0, -9, 4, 0], rotate: [rotate, rotate + 5, rotate - 3, rotate] } : undefined}
      transition={float ? { duration: 7 + delay, repeat: Infinity, ease: 'easeInOut', delay } : undefined}
    >
      {svg}
    </motion.div>
  );
}

/** Small three-leaf sprig used as a section ornament. */
export function Sprig({ className = '', color = '#7E8E74' }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" aria-hidden="true">
      <path d="M50 14 C56 26 58 42 50 64 C42 42 44 26 50 14 Z" fill={color} />
      <path d="M48 64 C32 58 20 48 24 36 C36 34 46 48 48 64 Z" fill="#97A38B" />
      <path d="M52 64 C68 58 80 48 76 36 C64 34 54 48 52 64 Z" fill="#97A38B" />
      <path d="M50 64 C48 74 52 82 50 88" stroke="#3A5742" strokeWidth="3.5" strokeLinecap="round" />
    </svg>
  );
}
