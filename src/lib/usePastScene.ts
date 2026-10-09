import { useEffect, useState } from 'react';

/** True once the home-page scroll scene (#scroll-scene) has scrolled out of view. Always true when `enabled` is false. */
export function usePastScene(enabled: boolean) {
  const [past, setPast] = useState(!enabled);
  useEffect(() => {
    if (!enabled) {
      setPast(true);
      return;
    }
    const check = () => {
      const scene = document.getElementById('scroll-scene');
      setPast(!scene || scene.getBoundingClientRect().bottom <= 1);
    };
    check();
    window.addEventListener('scroll', check, { passive: true });
    window.addEventListener('resize', check);
    return () => {
      window.removeEventListener('scroll', check);
      window.removeEventListener('resize', check);
    };
  }, [enabled]);
  return past;
}
