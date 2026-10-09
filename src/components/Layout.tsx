import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { FloatingCTA } from '@/components/FloatingCTA';
import { initAnalytics, trackPageView } from '@/lib/analytics';

export function Layout() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    initAnalytics();
  }, []);

  useEffect(() => {
    if (hash) {
      document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    }
    trackPageView(pathname);
  }, [pathname, hash]);

  return (
    <div className="flex min-h-screen flex-col overflow-x-clip">
      <Header overlay={pathname === '/'} />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer overlap={pathname === '/'} />
      <FloatingCTA overlay={pathname === '/'} />
    </div>
  );
}
