import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ChevronDown, Menu, Phone, Sparkles, X, ArrowRight } from 'lucide-react';
import { Logo } from '@/components/Logo';
import { ServiceIcon } from '@/components/ServiceIcon';
import { Container, WhatsAppButton } from '@/components/ui';
import { categories, servicesByCategory, formatPrice } from '@/data/services';
import { offer } from '@/data/offers';
import { site, whatsappLink } from '@/config/site';
import { usePastScene } from '@/lib/usePastScene';

const links = [
  { to: '/about', label: 'About' },
  { to: '/pricing', label: 'Pricing' },
  { to: '/faqs', label: 'FAQs' },
  { to: '/blog', label: 'Blog' },
  { to: '/contact', label: 'Contact' },
];

export function Header({ overlay = false }: { overlay?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  // On the home page the header stays hidden over the cinematic scene and slides in after it.
  const pastScene = usePastScene(overlay);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileServices, setMobileServices] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setMegaOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `relative rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
      isActive ? 'text-navy-900' : 'text-ink/70 hover:text-navy-900'
    }`;

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
          <Container className="flex items-center justify-center gap-3 py-2 text-center text-xs sm:text-sm">
            <Sparkles className="hidden h-4 w-4 shrink-0 text-gold-400 sm:block" />
            <span className="text-white/85">{offer.text}</span>
            <a
              href={whatsappLink(offer.message)}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden shrink-0 font-semibold text-gold-400 underline-offset-4 hover:underline sm:inline"
            >
              {offer.cta} →
            </a>
          </Container>
        </div>
      )}

      <header
        className={`${overlay ? 'relative' : 'sticky top-0'} z-40 transition-all duration-300 ${
          scrolled ? 'bg-white/85 shadow-[0_8px_30px_-12px_rgba(11,42,91,0.18)] backdrop-blur-xl' : 'bg-white'
        }`}
      >
        <Container className="flex h-[72px] items-center justify-between gap-6">
          <Link to="/" aria-label={`${site.name} home`} className="shrink-0">
            <Logo />
          </Link>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
            <NavLink to="/" end className={navLinkClass}>
              Home
            </NavLink>

            <div className="relative" onMouseEnter={() => setMegaOpen(true)} onMouseLeave={() => setMegaOpen(false)}>
              <button
                type="button"
                onClick={() => setMegaOpen((v) => !v)}
                aria-expanded={megaOpen}
                className={`flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  location.pathname.startsWith('/services') ? 'text-navy-900' : 'text-ink/70 hover:text-navy-900'
                }`}
              >
                Services
                <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${megaOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Mega menu */}
              <div
                className={`absolute left-1/2 top-full w-[920px] -translate-x-1/2 pt-3 transition-all duration-300 ${
                  megaOpen ? 'visible translate-y-0 opacity-100' : 'invisible translate-y-2 opacity-0'
                }`}
              >
                <div className="grid grid-cols-[1fr_1fr_0.8fr] gap-6 overflow-hidden rounded-2xl border border-navy-100 bg-white p-6 shadow-2xl shadow-navy-900/10">
                  {categories.map((cat) => (
                    <div key={cat.id}>
                      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-gold-600">{cat.title}</p>
                      <ul className="space-y-0.5">
                        {servicesByCategory(cat.id).map((s) => (
                          <li key={s.slug}>
                            <Link
                              to={`/services/${s.slug}`}
                              className="group flex items-center gap-3 rounded-lg px-2 py-2 transition-colors hover:bg-navy-50"
                            >
                              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-navy-50 text-navy-700 transition-colors group-hover:bg-navy-800 group-hover:text-white">
                                <ServiceIcon name={s.icon} className="h-4 w-4" />
                              </span>
                              <span className="flex-1 text-sm font-medium text-ink/85 group-hover:text-navy-900">{s.shortName}</span>
                              <span className="text-xs text-ink/45">{formatPrice(s.price)}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                      {cat.id === 'other' && (
                        <div className="mt-5 rounded-xl bg-gradient-to-br from-navy-800 to-navy-950 p-4 text-white">
                          <p className="text-sm font-semibold">Not sure what you need?</p>
                          <p className="mt-1 text-xs text-white/70">Talk to an expert — free consultation.</p>
                          <a
                            href={whatsappLink('Hi Regpro, I need help choosing the right registration.')}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-gold-400"
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
              <NavLink key={l.to} to={l.to} className={navLinkClass}>
                {l.label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <a href={site.phoneHref} className="flex items-center gap-2 text-sm font-semibold text-navy-800 hover:text-navy-950">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-navy-50">
                <Phone className="h-4 w-4" />
              </span>
              {site.phone}
            </a>
            <WhatsAppButton label="Talk to Expert" source="header" />
          </div>

          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-navy-100 text-navy-900 lg:hidden"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </Container>
      </header>
      </div>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-[60] lg:hidden ${mobileOpen ? 'visible' : 'invisible'}`}
        aria-hidden={!mobileOpen}
      >
        <div
          className={`absolute inset-0 bg-navy-950/50 backdrop-blur-sm transition-opacity duration-300 ${mobileOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setMobileOpen(false)}
        />
        <div
          className={`absolute right-0 top-0 flex h-full w-[88%] max-w-sm flex-col bg-white shadow-2xl transition-transform duration-300 ease-out ${
            mobileOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex h-[72px] items-center justify-between border-b border-navy-50 px-5">
            <Logo />
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-navy-100"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto px-3 py-4" aria-label="Mobile">
            <Link to="/" className="block rounded-xl px-3 py-3 font-medium text-navy-900 hover:bg-navy-50">
              Home
            </Link>
            <button
              type="button"
              onClick={() => setMobileServices((v) => !v)}
              className="flex w-full items-center justify-between rounded-xl px-3 py-3 font-medium text-navy-900 hover:bg-navy-50"
            >
              Services
              <ChevronDown className={`h-4 w-4 transition-transform ${mobileServices ? 'rotate-180' : ''}`} />
            </button>
            {mobileServices && (
              <div className="mb-2 space-y-3 px-3 pb-2">
                <Link to="/services" className="block text-sm font-semibold text-gold-600">
                  View all services →
                </Link>
                {categories.map((cat) => (
                  <div key={cat.id}>
                    <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink/45">{cat.title}</p>
                    {servicesByCategory(cat.id).map((s) => (
                      <Link
                        key={s.slug}
                        to={`/services/${s.slug}`}
                        className="flex items-center justify-between rounded-lg py-2 text-sm text-ink/80"
                      >
                        {s.shortName}
                        <span className="text-xs text-ink/45">{formatPrice(s.price)}</span>
                      </Link>
                    ))}
                  </div>
                ))}
              </div>
            )}
            {links.map((l) => (
              <Link key={l.to} to={l.to} className="block rounded-xl px-3 py-3 font-medium text-navy-900 hover:bg-navy-50">
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="space-y-3 border-t border-navy-50 p-5">
            <WhatsAppButton label="Chat on WhatsApp" className="w-full" source="mobile-menu" />
            <a
              href={site.phoneHref}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-navy-200 py-3 text-sm font-semibold text-navy-800"
            >
              <Phone className="h-4 w-4" /> {site.phone}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
