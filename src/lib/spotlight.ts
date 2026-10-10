/** One pointer listener drives the hover spotlight on every `.glass` card (see index.css). */
export function initSpotlight() {
  if (typeof window === 'undefined' || !window.matchMedia('(hover: hover)').matches) return;
  let raf = 0;
  let last: PointerEvent | null = null;
  window.addEventListener(
    'pointermove',
    (e) => {
      last = e;
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const card = (last?.target as HTMLElement | null)?.closest?.('.glass') as HTMLElement | null;
        if (!card || !last) return;
        const r = card.getBoundingClientRect();
        card.style.setProperty('--mx', `${last.clientX - r.left}px`);
        card.style.setProperty('--my', `${last.clientY - r.top}px`);
      });
    },
    { passive: true },
  );
}
