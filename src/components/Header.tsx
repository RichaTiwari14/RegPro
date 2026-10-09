import { Fragment, useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { LogoMark } from '@/components/Logo';
import { WhatsAppGlyph } from '@/components/ui';
import { categories, servicesByCategory } from '@/data/services';
import { site, whatsappLink } from '@/config/site';
import { lockScroll } from '@/lib/smoothScroll';

const links = [
  { to: '/services', label: 'Services' },
  { to: '/pricing', label: 'Pricing' },
  { to: '/about', label: 'About' },
  { to: '/faqs', label: 'FAQs' },
];

const mobileLinks = [{ to: '/', label: 'Home' }, ...links, { to: '/blog', label: 'Blog' }, { to: '/contact', label: 'Contact' }];

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setIsMobileMenuOpen(false), [location.pathname]);

  useEffect(() => {
    if (!isMobileMenuOpen) return;
    lockScroll(true);
    return () => lockScroll(false);
  }, [isMobileMenuOpen]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 flex flex-row items-center justify-between px-5 py-4 transition-[background-color,box-shadow] duration-300 sm:px-8 sm:py-5 ${
          scrolled && !isMobileMenuOpen ? 'bg-white/90 shadow-[0_1px_0_rgba(16,24,40,0.06)] backdrop-blur' : 'bg-transparent'
        }`}
      >
        {/* Logo */}
        <Link to="/" aria-label={`${site.name} home`} className="flex items-center gap-3">
          <span className="select-none text-[21px] font-medium tracking-tight text-black sm:text-[26px]">Regpro&reg;</span>
          <LogoMark className="mb-1 h-[25px] w-auto select-none sm:h-[30px]" />
        </Link>

        {/* Desktop links */}
        <nav className="hidden flex-row text-[23px] text-black md:flex" aria-label="Main">
          {links.map((l, i) => (
            <Fragment key={l.to}>
              {i > 0 && <span className="opacity-40">,&nbsp;</span>}
              <NavLink
                to={l.to}
                className={({ isActive }) =>
                  `transition-opacity hover:opacity-60 ${isActive ? 'underline decoration-gold-500 decoration-2 underline-offset-[6px]' : ''}`
                }
              >
                {l.label}
              </NavLink>
            </Fragment>
          ))}
        </nav>

        {/* Desktop CTA */}
        <Link to="/contact" className="hidden text-[23px] text-black underline underline-offset-2 transition-opacity hover:opacity-60 md:block">
          Get in touch
        </Link>

        {/* Mobile burger */}
        <button
          type="button"
          onClick={() => setIsMobileMenuOpen((v) => !v)}
          aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMobileMenuOpen}
          className="relative z-20 flex flex-col gap-[5px] md:hidden"
        >
          <span className={`block h-[2px] w-6 bg-black transition-all duration-300 ${isMobileMenuOpen ? 'translate-y-[7px] rotate-45' : ''}`} />
          <span className={`block h-[2px] w-6 bg-black transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
          <span className={`block h-[2px] w-6 bg-black transition-all duration-300 ${isMobileMenuOpen ? '-translate-y-[7px] -rotate-45' : ''}`} />
        </button>
      </header>

      {/* Mobile navigation overlay */}
      <div
        data-lenis-prevent
        className={`fixed inset-0 z-[45] overflow-y-auto bg-white/95 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          isMobileMenuOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
        aria-hidden={!isMobileMenuOpen}
      >
        <div className="flex min-h-full flex-col px-6 pb-10 pt-28">
          <nav className="flex flex-col" aria-label="Mobile">
            {mobileLinks.map((l) => (
              <Link key={l.to} to={l.to} className="py-2 text-[34px] leading-tight tracking-tight text-black transition-opacity hover:opacity-60">
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="mt-10 grid gap-6 border-t border-mist-200 pt-8">
            {categories.map((cat) => (
              <div key={cat.id}>
                <p className="text-sm text-subtle">{cat.title}</p>
                <p className="mt-2 text-[15px] leading-relaxed text-ink">
                  {servicesByCategory(cat.id).map((s, i, all) => (
                    <Fragment key={s.slug}>
                      <Link to={`/services/${s.slug}`} className="hover:opacity-60">
                        {s.shortName}
                      </Link>
                      {i < all.length - 1 && <span className="opacity-40">, </span>}
                    </Fragment>
                  ))}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-auto flex flex-col gap-3 pt-10">
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-full bg-[#25D366] py-3.5 text-sm font-medium text-white"
            >
              <WhatsAppGlyph className="h-4 w-4" /> Chat on WhatsApp
            </a>
            <a href={site.phoneHref} className="text-center text-sm text-muted underline underline-offset-2">
              Call {site.phone}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
