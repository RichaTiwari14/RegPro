import { Link } from 'react-router-dom';
import { Clock, Mail, MapPin, Phone } from 'lucide-react';
import { Logo } from '@/components/Logo';
import { categories, servicesByCategory } from '@/data/services';
import { site } from '@/config/site';
import { trackEvent } from '@/lib/analytics';

const quickLinks = [
  ['/about', 'About Us'],
  ['/services', 'All Services'],
  ['/pricing', 'Pricing'],
  ['/resources', 'Resources'],
  ['/faqs', 'FAQs'],
  ['/contact', 'Contact'],
];

const socials = Object.entries(site.social).filter(([, url]) => Boolean(url));

/** Navy footer with gold accents. The official logo sits on an ivory plate so its colours stay true. */
export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-navy-900 pb-24 text-white md:pb-0">
      <div className="h-px bg-gradient-to-r from-transparent via-gold-500/70 to-transparent" />
      <div className="mx-auto max-w-site px-5 pt-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1fr_1.2fr]">
          <div>
            <Link to="/" aria-label="REGPRO home" className="inline-block rounded-lg bg-ivory px-4 py-3">
              <Logo className="h-12 w-auto" />
            </Link>
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-white/60">
              Business registration, government documentation and compliance assistance for startups and businesses across India.
            </p>
            {socials.length > 0 && (
              <div className="mt-6 flex gap-3">
                {socials.map(([name, url]) => (
                  <a key={name} href={url} target="_blank" rel="noopener noreferrer" className="text-sm capitalize text-white/70 hover:text-gold-300">
                    {name}
                  </a>
                ))}
              </div>
            )}
          </div>

          {categories.map((c) => (
            <div key={c.id}>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-300">{c.title}</p>
              <ul className="mt-5 space-y-2.5">
                {servicesByCategory(c.id).map((s) => (
                  <li key={s.slug}>
                    <Link to={`/services/${s.slug}`} className="text-sm text-white/60 transition-colors hover:text-white">
                      {s.shortName}
                    </Link>
                  </li>
                ))}
              </ul>
              {c.id === 'other' && (
                <>
                  <p className="mt-10 text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-300">Quick links</p>
                  <ul className="mt-5 space-y-2.5">
                    {quickLinks.map(([to, label]) => (
                      <li key={to}>
                        <Link to={to} className="text-sm text-white/60 transition-colors hover:text-white">
                          {label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          ))}

          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-300">Contact</p>
            <ul className="mt-5 space-y-4 text-sm text-white/70">
              <li>
                <a href={site.phoneHref} onClick={() => trackEvent('phone_click', { label: 'footer' })} className="flex items-start gap-3 hover:text-white">
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold-300" /> {site.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${site.email}`} onClick={() => trackEvent('contact_click', { label: 'footer-email' })} className="flex items-start gap-3 hover:text-white">
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-gold-300" /> {site.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-300" /> {site.streetAddress || site.address}
              </li>
              <li className="flex items-start gap-3">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-gold-300" /> {site.hours}
              </li>
            </ul>
          </div>
        </div>

        <p className="mt-14 text-xs leading-relaxed text-white/40">
          {site.name} is a private professional services firm and is not affiliated with, or endorsed by, any government department. Prices shown are
          professional fees; {site.feeNote.toLowerCase()} Approvals and timelines are decided by the relevant authorities.
        </p>
        <div className="mt-6 flex flex-col gap-3 border-t border-white/10 py-6 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.legalName}. All rights reserved.
          </p>
          <p className="tracking-[0.25em] text-gold-300/80">REGISTER. COMPLY. GROW.</p>
          <div className="flex gap-5">
            <Link to="/privacy-policy" className="hover:text-white">
              Privacy Policy
            </Link>
            <Link to="/terms-and-conditions" className="hover:text-white">
              Terms &amp; Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
