import { Fragment, useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { LogoMark } from '@/components/Logo';
import { WhatsAppGlyph } from '@/components/ui';
import { categories, servicesByCategory } from '@/data/services';
import { site, whatsappLink } from '@/config/site';
import { lockScroll } from '@/lib/smoothScroll';
import { trackConversion } from '@/lib/analytics';

const links = [
  { to: '/services', label: 'Services' },
  { to: '/pricing', label: 'Pricing' },
  { to: '/about', label: 'About' },
  { to: '/faqs', label: 'FAQs' },
];

const mobileLinks = [{ to: '/', label: 'Home' }, ...links, { to: '/blog', label: 'Blog' }, { to: '/contact', label: 'Contact' }];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => setMenuOpen(false), [location.pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    lockScroll(true);
    return () => lockScroll(false);
  }, [menuOpen]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 px-6 pt-6 md:px-12 lg:px-16">
        <nav className="liquid-glass flex items-center justify-between rounded-xl px-4 py-2" aria-label="Main">
          <Link to="/" aria-label={`${site.name} home`} className="flex items-center gap-2">
            <LogoMark className="h-6 w-auto" />
            <span className="text-2xl font-semibold tracking-tight">Regpro</span>
          </Link>

          <div className="hidden items-center gap-8 text-sm md:flex">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) => `transition-colors hover:text-gray-300 ${isActive ? 'text-white' : 'text-white/85'}`}
              >
                {l.label}
              </NavLink>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackConversion('contact', 'whatsapp:navbar')}
              className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-black transition-colors hover:bg-gray-100 sm:px-6"
            >
              Start a Chat
            </a>
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              className="flex h-9 w-9 items-center justify-center rounded-lg text-white transition-colors hover:bg-white/10 md:hidden"
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile menu */}
      <div
        data-lenis-prevent
        className={`fixed inset-0 z-[45] overflow-y-auto bg-black/95 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          menuOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
        aria-hidden={!menuOpen}
      >
        <div className="flex min-h-full flex-col px-6 pb-10 pt-28">
          <nav className="flex flex-col" aria-label="Mobile">
            {mobileLinks.map((l) => (
              <Link key={l.to} to={l.to} className="py-2 text-[34px] leading-tight text-white transition-colors hover:text-gray-300" style={{ letterSpacing: '-0.04em' }}>
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="mt-10 grid gap-6 border-t border-white/10 pt-8">
            {categories.map((cat) => (
              <div key={cat.id}>
                <p className="text-sm text-gray-400">{cat.title}</p>
                <p className="mt-2 text-[15px] leading-relaxed text-gray-300">
                  {servicesByCategory(cat.id).map((s, i, all) => (
                    <Fragment key={s.slug}>
                      <Link to={`/services/${s.slug}`} className="hover:text-white">
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
              className="flex items-center justify-center gap-2 rounded-lg bg-white py-3.5 text-sm font-medium text-black"
            >
              <WhatsAppGlyph className="h-4 w-4 text-[#25D366]" /> Chat on WhatsApp
            </a>
            <a href={site.phoneHref} className="text-center text-sm text-gray-300 underline underline-offset-2">
              Call {site.phone}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
