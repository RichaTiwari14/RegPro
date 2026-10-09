import Lenis from 'lenis';

/**
 * Site-wide inertial smooth scrolling (desktop wheel/trackpad; touch keeps native momentum).
 * Disabled for visitors who prefer reduced motion — everything falls back to native scrolling.
 */
let lenis: Lenis | null = null;

const HEADER_OFFSET = -100;

export function initSmoothScroll() {
  if (lenis || typeof window === 'undefined') return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  lenis = new Lenis({
    duration: 1.1,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    autoRaf: true,
  });

  // Hold still while the intro loader is on screen.
  if (document.documentElement.classList.contains('rp-loading')) {
    lenis.stop();
    window.addEventListener('rp:loaded', () => lenis?.start(), { once: true });
  }

  // Same-page anchor links (#section) glide to their target below the sticky header.
  document.addEventListener('click', (e) => {
    const link = (e.target as HTMLElement | null)?.closest?.('a[href^="#"]') as HTMLAnchorElement | null;
    if (!link || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey) return;
    const id = decodeURIComponent(link.getAttribute('href')!.slice(1));
    const el = id && document.getElementById(id);
    if (!el) return;
    e.preventDefault();
    scrollToTarget(el);
  });
}

/** Pause/resume page scrolling (e.g. while a full-screen menu is open). */
export function lockScroll(locked: boolean) {
  document.body.style.overflow = locked ? 'hidden' : '';
  if (locked) lenis?.stop();
  else lenis?.start();
}

/** Scroll to a y-position or element, smoothly unless `immediate`. */
export function scrollToTarget(target: number | HTMLElement, { immediate = false, offset = HEADER_OFFSET } = {}) {
  const y =
    typeof target === 'number' ? target : Math.max(0, target.getBoundingClientRect().top + window.scrollY + offset);
  if (lenis) lenis.scrollTo(y, { immediate, force: true });
  else window.scrollTo({ top: y, behavior: immediate ? ('instant' as ScrollBehavior) : 'smooth' });
}
