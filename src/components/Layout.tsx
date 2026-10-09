import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { FloatingCTA } from '@/components/FloatingCTA';
import { initAnalytics, trackPageView } from '@/lib/analytics';
import { initSmoothScroll, scrollToTarget } from '@/lib/smoothScroll';

export function Layout() {
  const { pathname, hash } = useLocation();

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
    <div className="flex min-h-screen flex-col overflow-x-clip">
      <Header overlay={pathname === '/'} />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <FloatingCTA overlay={pathname === '/'} />
    </div>
  );
}
