import { useId } from 'react';

/** Vector recreation of the Regpro mark: three rising bars with a tick-arrow (deep olive + sage blue). */
export function LogoMark({ className = '', animated = false, light = false }: { className?: string; animated?: boolean; light?: boolean }) {
  const clipId = `regpro-bars-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`;
  return (
    <svg viewBox="0 0 120 100" className={className} aria-hidden="true">
      <defs>
        <clipPath id={clipId}>
          <polygon points="0,0 100,0 100,13 30,79 0,51" />
        </clipPath>
      </defs>
      <g clipPath={`url(#${clipId})`} fill={light ? '#FFFFFF' : '#353F22'}>
        <rect x="22" y="40" width="10" height="60" className={animated ? 'bar-rise' : ''} style={{ animationDelay: '0.1s' }} />
        <rect x="36" y="28" width="10" height="72" className={animated ? 'bar-rise' : ''} style={{ animationDelay: '0.22s' }} />
        <rect x="50" y="16" width="10" height="84" className={animated ? 'bar-rise' : ''} style={{ animationDelay: '0.34s' }} />
      </g>
      <polyline
        points="6,66 30,88 98,24"
        fill="none"
        stroke="#6E9094"
        strokeWidth="10"
        strokeLinejoin="miter"
        className={animated ? 'tick-draw' : ''}
      />
      <polygon points="110,12 92.2,14.2 107.8,29.8" fill="#6E9094" className={animated ? 'tick-head' : ''} />
    </svg>
  );
}

export function Logo({ light = false, className = '' }: { light?: boolean; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark light={light} className="h-9 w-auto" />
      <span className="flex flex-col leading-none">
        <span className={`font-display text-[1.7rem] font-semibold tracking-wide ${light ? 'text-soft-white' : 'text-olive-800'}`}>Regpro</span>
        <span className={`mt-0.5 text-[0.5rem] font-semibold uppercase tracking-[0.3em] ${light ? 'text-sage-200' : 'text-sage-600'}`}>
          Register · Comply · Grow
        </span>
      </span>
    </span>
  );
}
