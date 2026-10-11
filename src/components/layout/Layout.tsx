import { useCallback, useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { MotionConfig } from 'motion/react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { MobileDrawer, TabBar, FloatingWhatsApp } from '@/components/layout/MobileNav';
import { ConsentBanner } from '@/components/layout/ConsentBanner';
import { initAnalytics, trackPageView } from '@/lib/analytics';
import { initSmoothScroll, scrollToTarget } from '@/lib/smoothScroll';

export function Layout() {
  const { pathname, hash } = useLocation();
  const [menu, setMenu] = useState(false);
  const openMenu = useCallback(() => setMenu(true), []);
  const closeMenu = useCallback(() => setMenu(false), []);

  useEffect(() => {
    initAnalytics();
    initSmoothScroll();
  }, []);

  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1));
      if (el) scrollToTarget(el);
    } else {
      scrollToTarget(0, { immediate: true });
    }
    trackPageView(pathname);
  }, [pathname, hash]);

  return (
    <MotionConfig reducedMotion="user">
      <div className="flex min-h-screen flex-col overflow-x-clip">
        <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[80] focus:rounded focus:bg-white focus:px-4 focus:py-2">
          Skip to content
        </a>
        <Header onOpenMenu={openMenu} />
        <main id="main" className="flex-1">
          <Outlet />
        </main>
        <Footer />
        <FloatingWhatsApp />
        <TabBar onOpenMenu={openMenu} />
        <MobileDrawer open={menu} onClose={closeMenu} />
        <ConsentBanner />
      </div>
    </MotionConfig>
  );
}
