import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ArrowRight, Menu, Phone, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { Logo } from '@/components/Logo';
import { WhatsAppGlyph } from '@/components/ui';
import { site, whatsappLink } from '@/config/site';
import { lockScroll } from '@/lib/smoothScroll';

const links = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/pricing', label: 'Pricing' },
  { to: '/about', label: 'About' },
  { to: '/blog', label: 'Blog' },
  { to: '/contact', label: 'Contact' },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setOpen(false), [location.pathname]);

  useEffect(() => {
    if (!open) return;
    lockScroll(true);
    return () => lockScroll(false);
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-out ${
          scrolled ? 'border-b border-mist-300/70 bg-cream/90 shadow-sm backdrop-blur-md' : 'border-b border-transparent bg-transparent'
        }`}
      >
        <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between gap-6 px-5 sm:px-6 lg:px-8">
          <Link to="/" aria-label={`${site.name} home`} className="shrink-0">
            <Logo />
          </Link>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === '/'}
                className={({ isActive }) =>
                  `relative px-4 py-2 text-sm tracking-wide transition-colors duration-300 ${isActive ? 'font-semibold text-olive-800' : 'text-olive-800/70 hover:text-sage-600'}`
                }
              >
                {({ isActive }) => (
                  <>
                    {l.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute inset-x-4 -bottom-0.5 h-[2px] rounded-full bg-sage-500"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              to="/contact#enquiry"
              className="group hidden items-center gap-2 rounded-full bg-olive-800 px-6 py-2.5 text-sm font-semibold tracking-wide text-soft-white shadow-sm transition-all duration-300 hover:bg-olive-950 hover:shadow-xl hover:shadow-olive-900/20 sm:inline-flex"
            >
              Free Consultation
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-olive-800/20 bg-cream/70 text-olive-800 backdrop-blur-sm lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div className="fixed inset-0 z-[60] lg:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="absolute inset-0 bg-olive-950/35 backdrop-blur-sm" onClick={() => setOpen(false)} />
            <motion.div
              data-lenis-prevent
              className="absolute right-0 top-0 flex h-full w-[86%] max-w-sm flex-col overflow-y-auto rounded-l-[2rem] bg-cream shadow-2xl"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 320, damping: 34 }}
            >
              <div className="flex h-[76px] items-center justify-between border-b border-mist-300 px-5">
                <Logo />
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-olive-100 text-olive-800"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <nav className="flex-1 px-3 py-4" aria-label="Mobile">
                {links.map((l, i) => (
                  <motion.div key={l.to} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 * i + 0.1 }}>
                    <NavLink
                      to={l.to}
                      end={l.to === '/'}
                      className={({ isActive }) =>
                        `block rounded-2xl px-4 py-3 font-display text-2xl font-semibold ${isActive ? 'bg-sage-50 italic text-sage-700' : 'text-olive-800 hover:bg-olive-50'}`
                      }
                    >
                      {l.label}
                    </NavLink>
                  </motion.div>
                ))}
              </nav>
              <div className="space-y-3 border-t border-mist-300 p-5">
                <Link to="/contact#enquiry" className="flex w-full items-center justify-center gap-2 rounded-full bg-olive-800 py-3 text-sm font-semibold text-soft-white">
                  Get a Free Consultation <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href={whatsappLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] py-3 text-sm font-semibold text-white"
                >
                  <WhatsAppGlyph className="h-4 w-4" /> WhatsApp Us
                </a>
                <a href={site.phoneHref} className="flex w-full items-center justify-center gap-2 rounded-full border border-olive-800/20 py-3 text-sm font-semibold text-olive-800">
                  <Phone className="h-4 w-4" /> {site.phone}
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
