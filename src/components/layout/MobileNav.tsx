import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { BadgeIndianRupee, ChevronDown, Home, LayoutGrid, Mail, Menu, Phone, X } from 'lucide-react';
import { Logo } from '@/components/Logo';
import { WhatsAppGlyph } from '@/components/ui';
import { mainNav, resourcesNav } from '@/data/navigation';
import { categories, servicesByCategory } from '@/data/services';
import { site, whatsappLink } from '@/config/site';
import { trackEvent } from '@/lib/analytics';
import { lockScroll } from '@/lib/smoothScroll';

/** Slide-out menu used on tablets and phones. */
export function MobileDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [section, setSection] = useState<string | null>(null);
  const { pathname } = useLocation();

  useEffect(() => onClose(), [pathname]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (!open) return;
    lockScroll(true);
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => {
      lockScroll(false);
      window.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-[70] lg:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <div className="absolute inset-0 bg-forest-950/45 backdrop-blur-[2px]" onClick={onClose} />
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            data-lenis-prevent
            className="absolute right-0 top-0 flex h-full w-[88%] max-w-sm flex-col overflow-y-auto bg-ivory shadow-2xl"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 320, damping: 34 }}
          >
            <div className="flex h-[72px] items-center justify-between border-b border-line px-5">
              <Logo className="h-10 w-auto" />
              <button type="button" onClick={onClose} aria-label="Close menu" className="flex h-10 w-10 items-center justify-center rounded-md border border-line bg-white text-forest-800">
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="flex-1 px-3 py-4" aria-label="Mobile">
              {mainNav.map((item, i) => (
                <motion.div key={item.to} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.06 * i + 0.08 }} className="border-b border-line/70">
                  {item.menu ? (
                    <>
                      <button
                        type="button"
                        onClick={() => setSection(section === item.menu ? null : item.menu!)}
                        aria-expanded={section === item.menu}
                        className="flex w-full items-center justify-between px-3 py-4 font-display text-xl text-forest-800"
                      >
                        {item.label}
                        <ChevronDown className={`h-4 w-4 text-forest-600 transition-transform ${section === item.menu ? 'rotate-180' : ''}`} />
                      </button>
                      <AnimatePresence initial={false}>
                        {section === item.menu && (
                          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                            <div className="space-y-4 px-3 pb-4">
                              {item.menu === 'services' ? (
                                <>
                                  {categories.map((c) => (
                                    <div key={c.id}>
                                      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-forest-600">{c.title}</p>
                                      <ul className="mt-2">
                                        {servicesByCategory(c.id).map((s) => (
                                          <li key={s.slug}>
                                            <Link to={`/services/${s.slug}`} className="block py-1.5 text-[15px] text-ink/80">
                                              {s.name}
                                            </Link>
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  ))}
                                  <Link to="/services" className="link-arrow">
                                    All services →
                                  </Link>
                                </>
                              ) : (
                                resourcesNav.map((r) => (
                                  <Link key={r.to} to={r.to} className="block text-[15px] text-ink/80">
                                    {r.label}
                                  </Link>
                                ))
                              )}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <NavLink to={item.to} end={item.to === '/'} className={({ isActive }) => `block px-3 py-4 font-display text-xl ${isActive ? 'text-forest-500' : 'text-forest-800'}`}>
                      {item.label}
                    </NavLink>
                  )}
                </motion.div>
              ))}
            </nav>
            <div className="space-y-3 border-t border-line p-5">
              <Link to="/contact#enquiry" className="btn-primary w-full">
                Talk to an Expert
              </Link>
              <div className="grid grid-cols-2 gap-3">
                <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" onClick={() => trackEvent('whatsapp_click', { label: 'drawer' })} className="btn-whatsapp">
                  <WhatsAppGlyph className="h-4 w-4" /> WhatsApp
                </a>
                <a href={site.phoneHref} onClick={() => trackEvent('phone_click', { label: 'drawer' })} className="btn-outline">
                  <Phone className="h-4 w-4" /> Call
                </a>
              </div>
              <a href={`mailto:${site.email}`} onClick={() => trackEvent('contact_click', { label: 'drawer-email' })} className="flex items-center justify-center gap-2 pt-1 text-sm text-muted">
                <Mail className="h-4 w-4" /> {site.email}
              </a>
            </div>
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/** App-style bottom bar on phones, with a raised WhatsApp button in the middle. */
export function TabBar({ onOpenMenu }: { onOpenMenu: () => void }) {
  const tabs = [
    { to: '/', label: 'Home', icon: Home },
    { to: '/services', label: 'Services', icon: LayoutGrid },
    null,
    { to: '/pricing', label: 'Pricing', icon: BadgeIndianRupee },
  ];
  return (
    <nav
      aria-label="Quick navigation"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-line bg-white/95 px-2 pb-[max(0.4rem,env(safe-area-inset-bottom))] pt-1 shadow-[0_-10px_30px_rgba(20,48,32,0.08)] backdrop-blur-xl md:hidden"
    >
      <div className="mx-auto grid max-w-md grid-cols-5 items-end">
        {tabs.map((t) =>
          t ? (
            <NavLink key={t.to} to={t.to} end={t.to === '/'} className="flex flex-col items-center gap-0.5 py-1.5">
              {({ isActive }) => (
                <>
                  <span className="relative flex h-7 w-12 items-center justify-center">
                    {isActive && <motion.span layoutId="tab-pill" className="absolute inset-0 rounded-full bg-forest-50" transition={{ type: 'spring', stiffness: 420, damping: 32 }} />}
                    <t.icon className={`relative h-5 w-5 ${isActive ? 'text-forest-800' : 'text-ink/50'}`} strokeWidth={isActive ? 2.1 : 1.8} />
                  </span>
                  <span className={`text-[10.5px] ${isActive ? 'font-semibold text-forest-800' : 'text-ink/55'}`}>{t.label}</span>
                </>
              )}
            </NavLink>
          ) : (
            <a
              key="wa"
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent('whatsapp_click', { label: 'tab-bar' })}
              className="flex flex-col items-center gap-0.5"
              aria-label="Chat on WhatsApp"
            >
              <span className="-mt-6 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-[#25D366]/40 ring-4 ring-white">
                <WhatsAppGlyph className="h-6 w-6" />
              </span>
              <span className="pb-1.5 text-[10.5px] text-ink/55">WhatsApp</span>
            </a>
          ),
        )}
        <button type="button" onClick={onOpenMenu} className="flex flex-col items-center gap-0.5 py-1.5" aria-label="Open menu">
          <span className="flex h-7 w-12 items-center justify-center">
            <Menu className="h-5 w-5 text-ink/50" />
          </span>
          <span className="text-[10.5px] text-ink/55">Menu</span>
        </button>
      </div>
    </nav>
  );
}

/** Floating WhatsApp button for tablet and desktop. */
export function FloatingWhatsApp() {
  return (
    <a
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      onClick={() => trackEvent('whatsapp_click', { label: 'floating' })}
      className="group fixed bottom-6 right-6 z-40 hidden items-center md:flex"
    >
      <span className="mr-3 translate-x-2 rounded-full bg-white px-4 py-2 text-sm text-forest-800 opacity-0 shadow-lg transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
        Questions? Chat with an expert
      </span>
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl shadow-[#25D366]/35 transition-transform duration-300 group-hover:scale-105">
        <WhatsAppGlyph className="h-7 w-7" />
      </span>
    </a>
  );
}
