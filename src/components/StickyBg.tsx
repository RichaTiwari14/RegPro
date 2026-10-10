import type { ReactNode } from 'react';

/**
 * Section whose background image stays fixed while the page scrolls over it.
 * clip-path confines the fixed layer to this section (works on iOS, unlike background-attachment: fixed).
 */
export function StickyBg({
  image,
  overlay = 'bg-olive-950/70',
  className = '',
  rounded = '',
  children,
}: {
  image: string;
  overlay?: string;
  className?: string;
  /** e.g. '2rem' to keep the fixed image inside rounded corners */
  rounded?: string;
  children: ReactNode;
}) {
  return (
    <div className={`relative overflow-hidden ${className}`} style={{ clipPath: rounded ? `inset(0 round ${rounded})` : 'inset(0)', borderRadius: rounded || undefined }}>
      <div className="fixed inset-0 z-0" aria-hidden="true">
        <img src={image} alt="" className="h-full w-full object-cover" loading="lazy" decoding="async" />
        <div className={`absolute inset-0 ${overlay}`} />
      </div>
      <div className="relative z-10">{children}</div>
    </div>
  );
}
