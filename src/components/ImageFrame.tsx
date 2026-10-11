import { motion } from 'motion/react';

/** Editorial image with a thin offset gold frame and a soft reveal as it scrolls in. */
export function ImageFrame({
  src,
  alt,
  className = '',
  aspect = 'aspect-[4/3]',
  priority = false,
  frame = true,
}: {
  src: string;
  alt: string;
  className?: string;
  aspect?: string;
  priority?: boolean;
  frame?: boolean;
}) {
  return (
    <div className={`relative ${className}`}>
      {frame && <span className="absolute -bottom-3 -right-3 h-full w-full rounded-xl border border-sage-300/80" aria-hidden="true" />}
      <motion.div
        className={`relative overflow-hidden rounded-xl bg-beige shadow-lift ${aspect}`}
        initial={{ clipPath: 'inset(8% 8% 8% 8% round 12px)', opacity: 0 }}
        whileInView={{ clipPath: 'inset(0% 0% 0% 0% round 12px)', opacity: 1 }}
        viewport={{ once: true, margin: '0px 0px -10% 0px' }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.img
          src={src}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          className="h-full w-full object-cover"
          initial={{ scale: 1.08 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
        />
      </motion.div>
    </div>
  );
}
