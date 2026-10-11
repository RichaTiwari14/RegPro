import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowRight, ChevronDown, Menu } from 'lucide-react';
import { Logo } from '@/components/Logo';
import { mainNav, resourcesNav } from '@/data/navigation';
import { categories, servicesByCategory } from '@/data/services';

type MenuId = 'services' | 'resources';

/** Sticky header with working dropdowns; gains a hairline border and shadow once the page scrolls. */
export function Header({ onOpenMenu }: { onOpenMenu: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState<MenuId | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout>>();
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setOpen(null), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(null);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const show = (id: MenuId) => {
    clearTimeout(closeTimer.current);
    setOpen(id);
  };
  const hide = () => {
    closeTimer.current = setTimeout(() => setOpen(null), 120);
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-[background-color,box-shadow,border-color] duration-300 ${
        scrolled || open ? 'border-b border-line bg-white/95 shadow-[0_8px_30px_-20px_rgba(20,48,32,0.35)] backdrop-blur-md' : 'border-b border-transparent bg-ivory/80 backdrop-blur-sm'
      }`}
    >
      <div className="mx-auto flex h-[72px] max-w-site items-center justify-between gap-6 px-5 sm:px-6 lg:h-[84px] lg:px-8">
        <Link to="/" aria-label="REGPRO home" className="shrink-0">
          <Logo className="h-11 w-auto lg:h-[54px]" priority />
        </Link>

        <nav className="hidden items-center lg:flex" aria-label="Main">
          {mainNav.map((item) =>
            item.menu ? (
              <div key={item.to} className="relative" onMouseEnter={() => show(item.menu!)} onMouseLeave={hide}>
                <button
                  type="button"
                  aria-expanded={open === item.menu}
                  aria-haspopup="true"
                  onClick={() => setOpen(open === item.menu ? null : item.menu!)}
                  className={`flex items-center gap-1 px-3.5 py-2 text-[14.5px] transition-colors ${
                    pathname.startsWith(item.to) || (item.menu === 'resources' && pathname.startsWith('/faqs')) ? 'text-forest-800' : 'text-ink/75 hover:text-forest-800'
                  }`}
                >
                  {item.label}
                  <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-300 ${open === item.menu ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {open === item.menu && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                      className={`absolute top-full pt-3 ${item.menu === 'services' ? '-left-48' : '-left-4'}`}
                    >
                      {item.menu === 'services' ? <ServicesMenu /> : <ResourcesMenu />}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) => `relative px-3.5 py-2 text-[14.5px] transition-colors ${isActive ? 'text-forest-800' : 'text-ink/75 hover:text-forest-800'}`}
              >
                {({ isActive }) => (
                  <>
                    {item.label}
                    {isActive && <motion.span layoutId="nav-active" className="absolute inset-x-3.5 -bottom-0.5 h-[2px] rounded-full bg-forest-700" />}
                  </>
                )}
              </NavLink>
            ),
          )}
        </nav>

        <div className="flex items-center gap-2">
          <Link to="/contact#enquiry" className="btn-primary hidden !rounded-full !px-5 !py-2.5 sm:inline-flex">
            Get a Free Consultation <ArrowRight className="h-4 w-4" />
          </Link>
          <button
            type="button"
            onClick={onOpenMenu}
            aria-label="Open menu"
            className="flex h-11 w-11 items-center justify-center rounded-md border border-line bg-white text-forest-800 lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
}

function ServicesMenu() {
  return (
    <div className="w-[760px] overflow-hidden rounded-xl border border-line bg-white shadow-lift">
      <div className="grid grid-cols-3 gap-6 p-7">
        {categories.map((c) => (
          <div key={c.id}>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-forest-600">{c.title}</p>
            <ul className="mt-4 space-y-1">
              {servicesByCategory(c.id).map((s) => (
                <li key={s.slug}>
                  <Link to={`/services/${s.slug}`} className="block rounded-md px-2 py-1.5 text-sm text-ink/80 transition-colors hover:bg-ivory hover:text-forest-800">
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between border-t border-line bg-ivory px-7 py-4">
        <p className="text-sm text-muted">Not sure which registration you need?</p>
        <Link to="/services" className="link-arrow">
          View all services <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}

function ResourcesMenu() {
  return (
    <div className="w-72 rounded-xl border border-line bg-white p-3 shadow-lift">
      {resourcesNav.map((r) => (
        <Link key={r.to} to={r.to} className="block rounded-lg px-3 py-3 transition-colors hover:bg-ivory">
          <span className="block text-sm font-medium text-forest-800">{r.label}</span>
          <span className="block text-xs text-muted">{r.text}</span>
        </Link>
      ))}
    </div>
  );
}
