import { useEffect, useRef } from 'react';

/**
 * Atmospheric graphics taken from the cinematic landing video:
 * drifting mist, layered mountain ridges (with gentle scroll parallax) and a gold horizon glow from the logo.
 */

export function Mist({ tone = 'light', className = '' }: { tone?: 'light' | 'dark'; className?: string }) {
  const blob = tone === 'light' ? 'bg-white' : 'bg-navy-300';
  const op = tone === 'light' ? 'opacity-70' : 'opacity-[0.08]';
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      <div className={`absolute -left-[10%] top-[8%] h-[45%] w-[55%] animate-drift rounded-full blur-3xl ${blob} ${op}`} />
      <div className={`absolute right-[-15%] top-[30%] h-[40%] w-[60%] animate-drift-slow rounded-full blur-3xl ${blob} ${op}`} />
      <div className={`absolute bottom-[5%] left-[20%] h-[35%] w-[50%] animate-drift rounded-full blur-3xl ${blob} ${op}`} style={{ animationDelay: '-12s' }} />
    </div>
  );
}

/** Sets --py on the element to its distance from the viewport top, so children can parallax with pure CSS. */
function useParallaxVar<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let raf = 0;
    let visible = false;
    const update = () => {
      raf = 0;
      el.style.setProperty('--py', String(Math.round(el.getBoundingClientRect().top)));
    };
    const onScroll = () => {
      if (visible && !raf) raf = requestAnimationFrame(update);
    };
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible) onScroll();
    });
    io.observe(el);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);
  return ref;
}

const RIDGES = {
  far: 'M0 214 L110 178 L210 198 L330 128 L450 182 L560 146 L690 70 L815 150 L935 112 L1060 168 L1180 96 L1300 158 L1440 118 L1440 320 L0 320Z',
  mid: 'M0 252 L140 204 L262 238 L398 176 L520 230 L662 184 L782 238 L902 194 L1040 248 L1162 204 L1300 238 L1440 210 L1440 320 L0 320Z',
  near: 'M0 292 L180 254 L322 282 L482 244 L642 286 L800 258 L962 290 L1122 262 L1282 290 L1440 268 L1440 320 L0 320Z',
};

/**
 * Low-poly mountain silhouettes. `to` is the colour of the nearest ridge — set it to the next
 * section's background so one section flows into the next without a hard edge.
 */
export function Mountains({
  tone = 'light',
  to,
  className = '',
}: {
  tone?: 'light' | 'dark';
  to: string;
  className?: string;
}) {
  const ref = useParallaxVar<HTMLDivElement>();
  const far = tone === 'light' ? '#C9D4DE' : '#1A3D78';
  const mid = tone === 'light' ? '#B4C3D1' : '#0F2F63';
  const layer = (speed: number) => ({ transform: `translate3d(0, calc(var(--py, 0) * ${speed} * 1px), 0)` });
  return (
    <div ref={ref} className={`pointer-events-none absolute inset-x-0 bottom-0 z-0 h-[clamp(140px,22vw,320px)] ${className}`} aria-hidden="true">
      <svg viewBox="0 0 1440 320" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" style={layer(0.06)}>
        <path d={RIDGES.far} fill={far} opacity={tone === 'light' ? 0.7 : 0.55} />
      </svg>
      <svg viewBox="0 0 1440 320" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" style={layer(0.03)}>
        <path d={RIDGES.mid} fill={mid} opacity={tone === 'light' ? 0.85 : 0.8} />
      </svg>
      <svg viewBox="0 0 1440 320" preserveAspectRatio="none" className="absolute inset-0 h-[101%] w-full">
        <path d={RIDGES.near} fill={to} />
      </svg>
    </div>
  );
}

/** Warm gold glow on the horizon — the logo's gold rising like first light over dark ridges. */
export function GoldGlow({ className = '' }: { className?: string }) {
  return (
    <div
      className={`pointer-events-none absolute inset-x-0 bottom-0 h-2/3 ${className}`}
      style={{ background: 'radial-gradient(60% 55% at 50% 100%, rgba(214,162,31,0.22) 0%, rgba(214,162,31,0.06) 45%, transparent 75%)' }}
      aria-hidden="true"
    />
  );
}

/** Thin gold horizon line that fades out at both ends. */
export function Horizon({ className = '' }: { className?: string }) {
  return (
    <div
      className={`h-px w-full ${className}`}
      style={{ background: 'linear-gradient(90deg, transparent, rgba(214,162,31,0.7), transparent)' }}
      aria-hidden="true"
    />
  );
}
