import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { BookOpen, BadgeIndianRupee, FileText, HelpCircle, Home, LayoutGrid, MessageSquare, MoreHorizontal, Phone, Users, X } from 'lucide-react';
import { site, whatsappLink } from '@/config/site';
import { trackConversion } from '@/lib/analytics';
import { WhatsAppGlyph } from '@/components/ui';
import { lockScroll } from '@/lib/smoothScroll';

const tabs = [
  { to: '/', label: 'Home', icon: Home },
  { to: '/services', label: 'Services', icon: LayoutGrid },
  { to: '/pricing', label: 'Pricing', icon: BadgeIndianRupee },
  { to: '/contact', label: 'Contact', icon: MessageSquare },
];

const more = [
  { to: '/about', label: 'About Us', icon: Users },
  { to: '/blog', label: 'Blog', icon: BookOpen },
  { to: '/faqs', label: 'FAQs', icon: HelpCircle },
  { to: '/contact#enquiry', label: 'Enquiry form', icon: FileText },
];

/** Desktop: floating WhatsApp bubble. Mobile: app-style bottom tab bar with a "More" sheet. */
export function FloatingCTA() {
  const [sheet, setSheet] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => setSheet(false), [pathname]);
  useEffect(() => {
    if (!sheet) return;
    lockScroll(true);
    return () => lockScroll(false);
  }, [sheet]);

  const moreActive = more.some((m) => pathname.startsWith(m.to.split('#')[0]));

  return (
    <>
      <a
        href={whatsappLink()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        onClick={() => trackConversion('contact', 'whatsapp:floating')}
        className="group fixed bottom-6 right-6 z-40 hidden items-center lg:flex"
      >
        <span className="mr-3 translate-x-2 rounded-full bg-soft-white px-4 py-2 text-sm font-medium text-ink opacity-0 shadow-lg transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
          Need help? Chat with us
        </span>
        <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl shadow-[#25D366]/40 transition-transform duration-300 group-hover:scale-105">
          <span className="absolute inset-0 animate-ping-slow rounded-full bg-[#25D366]/50" />
          <WhatsAppGlyph className="relative h-7 w-7" />
        </span>
      </a>

      {/* Mobile bottom tab bar */}
      <nav
        aria-label="App navigation"
        className="fixed inset-x-0 bottom-0 z-50 border-t border-mist-300 bg-soft-white/95 px-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-1.5 shadow-[0_-10px_30px_rgba(30,34,30,0.08)] backdrop-blur-xl lg:hidden"
      >
        <div className="mx-auto grid max-w-md grid-cols-5">
          {tabs.map((t) => (
            <NavLink key={t.to} to={t.to} end={t.to === '/'} className="flex flex-col items-center gap-0.5 py-1">
              {({ isActive }) => (
                <>
                  <span className="relative flex h-8 w-14 items-center justify-center">
                    {isActive && (
                      <motion.span layoutId="tab-pill" className="absolute inset-0 rounded-full bg-olive-100" transition={{ type: 'spring', stiffness: 420, damping: 32 }} />
                    )}
                    <t.icon className={`relative h-5 w-5 ${isActive ? 'text-olive-800' : 'text-ink/55'}`} strokeWidth={isActive ? 2.2 : 1.8} />
                  </span>
                  <span className={`text-[11px] ${isActive ? 'font-semibold text-olive-800' : 'text-ink/55'}`}>{t.label}</span>
                </>
              )}
            </NavLink>
          ))}
          <button type="button" onClick={() => setSheet(true)} className="flex flex-col items-center gap-0.5 py-1" aria-haspopup="dialog">
            <span className="relative flex h-8 w-14 items-center justify-center">
              {moreActive && <motion.span layoutId="tab-pill" className="absolute inset-0 rounded-full bg-olive-100" />}
              <MoreHorizontal className={`relative h-5 w-5 ${moreActive ? 'text-olive-800' : 'text-ink/55'}`} />
            </span>
            <span className={`text-[11px] ${moreActive ? 'font-semibold text-olive-800' : 'text-ink/55'}`}>More</span>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {sheet && (
          <motion.div className="fixed inset-0 z-[60] lg:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="absolute inset-0 bg-ink/30 backdrop-blur-[2px]" onClick={() => setSheet(false)} />
            <motion.div
              role="dialog"
              aria-label="More"
              data-lenis-prevent
              className="absolute inset-x-0 bottom-0 rounded-t-[28px] bg-soft-white px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-3 shadow-2xl"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', stiffness: 340, damping: 34 }}
              drag="y"
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={{ top: 0, bottom: 0.6 }}
              onDragEnd={(_, info) => info.offset.y > 80 && setSheet(false)}
            >
              <div className="mx-auto mb-4 h-1.5 w-10 rounded-full bg-mist-300" />
              <div className="flex items-center justify-between">
                <p className="font-display text-xl text-ink">More</p>
                <button type="button" onClick={() => setSheet(false)} aria-label="Close" className="flex h-9 w-9 items-center justify-center rounded-full bg-mist-200 text-ink">
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3">
                {more.map((m) => (
                  <Link key={m.to} to={m.to} className="flex items-center gap-3 rounded-2xl border border-mist-300 bg-cream px-4 py-3.5 text-sm font-medium text-ink">
                    <m.icon className="h-5 w-5 text-olive-700" strokeWidth={1.8} /> {m.label}
                  </Link>
                ))}
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <a
                  href={whatsappLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackConversion('contact', 'whatsapp:mobile-sheet')}
                  className="flex items-center justify-center gap-2 rounded-full bg-[#25D366] py-3.5 text-sm font-semibold text-white"
                >
                  <WhatsAppGlyph className="h-4 w-4" /> WhatsApp
                </a>
                <a
                  href={site.phoneHref}
                  onClick={() => trackConversion('contact', 'call:mobile-sheet')}
                  className="flex items-center justify-center gap-2 rounded-full bg-olive-800 py-3.5 text-sm font-semibold text-soft-white"
                >
                  <Phone className="h-4 w-4" /> Call us
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
