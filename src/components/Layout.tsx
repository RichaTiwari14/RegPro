import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { FloatingCTA } from '@/components/FloatingCTA';
import { initAnalytics, trackPageView } from '@/lib/analytics';
import { initSmoothScroll, scrollToTarget } from '@/lib/smoothScroll';
import { initSpotlight } from '@/lib/spotlight';
import { MotionConfig } from 'motion/react';

export function Layout() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    initAnalytics();
    initSmoothScroll();
    initSpotlight();
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
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <FloatingCTA />
    </div>
    </MotionConfig>
  );
}
