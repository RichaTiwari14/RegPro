/** The official REGPRO logo (supplied artwork, background removed — not redrawn). */
export function Logo({ className = 'h-12 w-auto', priority = false }: { className?: string; priority?: boolean }) {
  return (
    <img
      src="/assets/brand/regpro-logo.png"
      alt="REGPRO — Register. Comply. Grow."
      width={784}
      height={528}
      className={className}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
    />
  );
}

/** The bars-and-arrow mark on its own, cropped from the official logo. */
export function LogoMark({ className = 'h-8 w-auto' }: { className?: string }) {
  return <img src="/assets/brand/regpro-mark.png" alt="" width={623} height={338} className={className} loading="lazy" decoding="async" />;
}
