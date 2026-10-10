import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { MessageCircle, Phone } from 'lucide-react';
import { motion } from 'motion/react';
import { Logo } from '@/components/Logo';
import { WhatsAppGlyph } from '@/components/ui';
import { site, whatsappLink } from '@/config/site';
import { trackConversion } from '@/lib/analytics';

export const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/pricing', label: 'Pricing' },
  { to: '/about', label: 'About' },
  { to: '/blog', label: 'Blog' },
  { to: '/contact', label: 'Contact' },
];

/** Solid beige bar (reference style). On mobile the links live in the bottom tab bar instead. */
export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-all duration-300 ${
        scrolled ? 'border-mist-300 bg-cream/90 backdrop-blur-md' : 'border-mist-300/60 bg-cream'
      }`}
    >
      <div className="mx-auto flex h-[68px] max-w-7xl items-center justify-between gap-6 px-5 sm:h-[76px] sm:px-6 lg:px-8">
        <Link to="/" aria-label={`${site.name} home`} className="shrink-0">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
          {navLinks.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === '/'}
              className={({ isActive }) => `relative px-4 py-2 text-[15px] transition-colors ${isActive ? 'font-medium text-ink' : 'text-ink/75 hover:text-ink'}`}
            >
              {({ isActive }) => (
                <>
                  {l.label}
                  {isActive && (
                    <motion.span layoutId="nav-underline" className="absolute inset-x-4 -bottom-0.5 h-[1.5px] bg-ink" transition={{ type: 'spring', stiffness: 380, damping: 30 }} />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link to="/contact#enquiry" className="hidden items-center gap-2 rounded-full bg-olive-800 px-5 py-2.5 text-sm font-medium text-soft-white transition-colors hover:bg-olive-900 sm:inline-flex">
            <MessageCircle className="h-4 w-4" /> Free Consultation
          </Link>
          <a
            href={site.phoneHref}
            onClick={() => trackConversion('contact', 'call:header')}
            aria-label={`Call ${site.phone}`}
            className="flex h-10 w-10 items-center justify-center rounded-full text-ink transition-colors hover:bg-mist-200"
          >
            <Phone className="h-[18px] w-[18px]" />
          </a>
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackConversion('contact', 'whatsapp:header')}
            aria-label="Chat on WhatsApp"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-[#25D366] text-white sm:hidden"
          >
            <WhatsAppGlyph className="h-5 w-5" />
          </a>
        </div>
      </div>
    </header>
  );
}
