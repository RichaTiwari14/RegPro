import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ArrowRight, ChevronDown, Phone, X } from 'lucide-react';
import { LogoMark } from '@/components/Logo';
import { ServiceIcon } from '@/components/ServiceIcon';
import { WhatsAppGlyph } from '@/components/ui';
import { categories, servicesByCategory, formatPrice } from '@/data/services';
import { offer } from '@/data/offers';
import { site, whatsappLink } from '@/config/site';
import { usePastScene } from '@/lib/usePastScene';
import { trackConversion } from '@/lib/analytics';
import { lockScroll } from '@/lib/smoothScroll';

const EASE = 'cubic-bezier(0.16,1,0.3,1)';

const links = [
  { to: '/about', label: 'About' },
  { to: '/pricing', label: 'Pricing' },
  { to: '/faqs', label: 'FAQs' },
  { to: '/blog', label: 'Blog' },
  { to: '/contact', label: 'Contact' },
];

const menuLinks = [{ to: '/', label: 'Home' }, { to: '/services', label: 'Services' }, ...links];

/** Full-screen navy menu — same as the landing scene's menu. */
function MenuOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { pathname } = useLocation();
  return (
    <div
      className={`dusk fixed inset-0 z-[100] transition-all duration-500 ${open ? 'visible opacity-100' : 'invisible opacity-0'}`}
      style={{ transitionTimingFunction: 'cubic-bezier(0.4,0,0.2,1)' }}
      aria-hidden={!open}
    >
      <div
        data-lenis-prevent
        className={`flex h-full flex-col overflow-y-auto transition-transform duration-500 ${open ? 'translate-y-0' : '-translate-y-8'}`}
        style={{ transitionTimingFunction: 'cubic-bezier(0.4,0,0.2,1)' }}
      >
        <div className="flex items-center justify-between px-6 pt-8 sm:px-8 sm:pt-12 md:px-12">
          <LogoMark light className="h-9 w-auto" />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 text-white transition-colors hover:border-white"
          >
            <X size={18} />
          </button>
        </div>

        <div className="grid flex-1 content-center gap-10 px-8 py-10 sm:px-12 lg:grid-cols-[1fr_1.2fr] lg:px-24">
          <nav className="flex flex-col">
            {menuLinks.map((l, i) => {
              const active = l.to === '/' ? pathname === '/' : pathname.startsWith(l.to);
              return (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={onClose}
                  className={`py-2.5 text-2xl font-light uppercase tracking-wide sm:text-3xl ${
                    active ? 'text-white' : 'text-white/55 hover:text-white'
                  }`}
                  style={{
                    opacity: open ? 1 : 0,
                    transform: open ? 'translateY(0)' : 'translateY(20px)',
                    transition: `opacity 0.6s ${EASE} ${i * 60}ms, transform 0.6s ${EASE} ${i * 60}ms, color 0.3s`,
                  }}
                >
                  {l.label}
                </Link>
              );
            })}
          </nav>
          <div className="hidden gap-8 sm:grid sm:grid-cols-2">
            {categories.map((cat) => (
              <div key={cat.id}>
                <p className="label-cine text-gold-400">{cat.title}</p>
                <ul className="mt-4 space-y-2">
                  {servicesByCategory(cat.id).map((s) => (
                    <li key={s.slug}>
                      <Link to={`/services/${s.slug}`} onClick={onClose} className="text-sm text-white/60 transition-colors hover:text-white">
                        {s.shortName}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-x-8 gap-y-3 px-8 pb-10 text-xs uppercase tracking-[0.2em] text-white/60 sm:px-12 lg:px-24">
          <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="hover:text-white">
            WhatsApp
          </a>
          <a href={site.phoneHref} className="hover:text-white">
            Call {site.phone}
          </a>
          <a href={`mailto:${site.email}`} className="hover:text-white">
            {site.email}
          </a>
        </div>
      </div>
    </div>
  );
}

export function Header({ overlay = false }: { overlay?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  // On the home page the header stays hidden over the cinematic scene and slides in after it.
  const pastScene = usePastScene(overlay);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setMegaOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    lockScroll(true);
    return () => lockScroll(false);
  }, [menuOpen]);

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `relative text-[11px] font-medium uppercase tracking-[0.15em] transition-opacity hover:opacity-70 ${
      isActive ? 'text-navy-800' : 'text-navy-800/70'
    }`;
  const underline = <span className="absolute -bottom-2.5 left-0 h-[2px] w-full bg-gold-500" />;

  return (
    <>
      <div
        className={
          overlay
            ? `fixed inset-x-0 top-0 z-40 transition-[transform,visibility] duration-500 ${pastScene ? 'visible translate-y-0' : 'invisible -translate-y-full'}`
            : 'contents'
        }
      >
        {offer.active && (
          <div className="relative z-50 bg-navy-900 text-white">
            <div className="mx-auto flex max-w-7xl items-center justify-center gap-4 px-5 py-2 text-center text-[11px] uppercase tracking-[0.18em]">
              <span className="text-white/75">{offer.text}</span>
              <a
                href={whatsappLink(offer.message)}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden shrink-0 text-gold-400 hover:text-gold-300 sm:inline"
              >
                {offer.cta} →
              </a>
            </div>
          </div>
        )}

        <header
          className={`${overlay ? 'relative' : 'sticky top-0'} z-40 transition-all duration-500 ${
            scrolled || overlay
              ? 'border-b border-white/60 bg-mist-100/70 shadow-[0_10px_40px_-20px_rgba(11,42,91,0.25)] backdrop-blur-xl'
              : 'border-b border-transparent bg-transparent'
          }`}
        >
          <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between gap-6 px-6 sm:px-8 md:px-12">
            {/* Hamburger (mobile) */}
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              className="flex flex-col gap-[5px] lg:hidden"
            >
              <span className="block h-[2px] w-6 bg-navy-800" />
              <span className="block h-[2px] w-6 bg-navy-800" />
              <span className="block h-[2px] w-4 bg-navy-800" />
            </button>

            <div className="flex items-center gap-10 xl:gap-14">
              <Link to="/" aria-label={`${site.name} home`} className="flex items-center gap-2 text-navy-800">
                <LogoMark className="h-7 w-auto" />
                <span className="text-sm font-medium tracking-[0.3em]">REGPRO</span>
              </Link>

              <nav className="hidden items-center gap-8 lg:flex xl:gap-10" aria-label="Main">
                <NavLink to="/" end className={linkClass}>
                  {({ isActive }) => (
                    <>
                      Home
                      {isActive && underline}
                    </>
                  )}
                </NavLink>

                <div className="relative" onMouseEnter={() => setMegaOpen(true)} onMouseLeave={() => setMegaOpen(false)}>
                  <button
                    type="button"
                    onClick={() => setMegaOpen((v) => !v)}
                    aria-expanded={megaOpen}
                    className={`relative flex items-center gap-1 text-[11px] font-medium uppercase tracking-[0.15em] transition-opacity hover:opacity-70 ${
                      location.pathname.startsWith('/services') ? 'text-navy-800' : 'text-navy-800/70'
                    }`}
                  >
                    Services
                    <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-300 ${megaOpen ? 'rotate-180' : ''}`} />
                    {location.pathname.startsWith('/services') && underline}
                  </button>

                  <div
                    className={`absolute left-1/2 top-full w-[920px] -translate-x-1/2 pt-6 transition-all duration-300 ${
                      megaOpen ? 'visible translate-y-0 opacity-100' : 'invisible translate-y-2 opacity-0'
                    }`}
                  >
                    <div className="glass grid grid-cols-[1fr_1fr_0.85fr] gap-6 rounded-3xl p-6">
                      {categories.map((cat) => (
                        <div key={cat.id}>
                          <p className="label-cine mb-3 text-gold-700">{cat.title}</p>
                          <ul className="space-y-0.5">
                            {servicesByCategory(cat.id).map((s) => (
                              <li key={s.slug}>
                                <Link
                                  to={`/services/${s.slug}`}
                                  className="group flex items-center gap-3 rounded-xl px-2 py-2 transition-colors hover:bg-white/70"
                                >
                                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-navy-800/15 text-navy-700 transition-colors group-hover:border-navy-800 group-hover:bg-navy-800 group-hover:text-gold-400">
                                    <ServiceIcon name={s.icon} className="h-4 w-4" />
                                  </span>
                                  <span className="flex-1 text-sm text-ink/85 group-hover:text-navy-900">{s.shortName}</span>
                                  <span className="text-xs text-ink/45">{formatPrice(s.price)}</span>
                                </Link>
                              </li>
                            ))}
                          </ul>
                          {cat.id === 'other' && (
                            <div className="dusk relative mt-5 overflow-hidden rounded-2xl p-5 text-white">
                              <p className="text-sm uppercase tracking-[0.12em]">Not sure what you need?</p>
                              <p className="mt-1 text-xs text-white/65">Talk to an expert — free consultation.</p>
                              <a
                                href={whatsappLink('Hi Regpro, I need help choosing the right registration.')}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-3 inline-flex items-center gap-1 text-[11px] uppercase tracking-[0.18em] text-gold-400"
                              >
                                Ask on WhatsApp <ArrowRight className="h-3.5 w-3.5" />
                              </a>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {links.map((l) => (
                  <NavLink key={l.to} to={l.to} className={linkClass}>
                    {({ isActive }) => (
                      <>
                        {l.label}
                        {isActive && underline}
                      </>
                    )}
                  </NavLink>
                ))}
              </nav>
            </div>

            <div className="flex items-center gap-6 sm:gap-8">
              <a href={site.phoneHref} className="hidden items-center gap-2 text-[11px] font-medium uppercase tracking-[0.15em] text-navy-800 hover:opacity-70 xl:flex">
                <Phone className="h-3.5 w-3.5" /> {site.phone}
              </a>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackConversion('contact', 'whatsapp:header')}
                className="hidden items-center gap-2 text-[11px] font-medium uppercase tracking-[0.2em] text-navy-800 hover:opacity-70 sm:flex"
              >
                WhatsApp
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-navy-800 text-white">
                  <WhatsAppGlyph className="h-[10px] w-[10px]" />
                </span>
              </a>
              <button
                type="button"
                onClick={() => setMenuOpen(true)}
                className="hidden text-[11px] font-medium uppercase tracking-[0.2em] text-navy-800 hover:opacity-70 lg:block"
              >
                Menu
              </button>
            </div>
          </div>
        </header>
      </div>

      <MenuOverlay open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
