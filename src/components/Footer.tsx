import { Link } from 'react-router-dom';
import { Clock, Mail, MapPin, Phone } from 'lucide-react';
import { LogoMark } from '@/components/Logo';
import { WhatsAppGlyph } from '@/components/ui';
import { GoldGlow, Mist } from '@/components/Atmosphere';
import { categories, servicesByCategory } from '@/data/services';
import { site, whatsappLink } from '@/config/site';

const RIDGE = 'M0 120 L110 84 L210 104 L330 34 L450 88 L560 52 L690 0 L815 56 L935 18 L1060 74 L1180 6 L1300 64 L1440 24 L1440 160 L0 160Z';

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative text-white">
      {/* Ridge silhouette rising out of the page into the night-navy footer */}
      <svg viewBox="0 0 1440 160" preserveAspectRatio="none" className="block h-[clamp(60px,10vw,140px)] w-full" aria-hidden="true">
        <path d={RIDGE} fill="#0B2A5B" />
      </svg>
      <div className="dusk relative -mt-px overflow-hidden">
        <Mist tone="dark" />
        <GoldGlow className="opacity-70" />
        <div className="relative mx-auto max-w-7xl px-6 pb-28 pt-12 sm:px-8 md:px-12 lg:pb-12">
          <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr_1fr_1fr_1.1fr]">
            <div>
              <Link to="/" aria-label={`${site.name} home`} className="flex items-center gap-2">
                <LogoMark light className="h-8 w-auto" />
                <span className="text-sm font-medium tracking-[0.3em]">REGPRO</span>
              </Link>
              <p className="mt-6 max-w-xs text-sm leading-relaxed text-white/55">
                Business registration, government documentation and compliance assistance for startups and small businesses across India.
              </p>
              <p className="label-cine mt-6 text-gold-400">Register. Comply. Grow.</p>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 text-[11px] font-medium uppercase tracking-[0.18em] text-white"
              >
                <WhatsAppGlyph className="h-4 w-4" /> WhatsApp us
              </a>
            </div>

            {categories.map((cat) => (
              <div key={cat.id}>
                <p className="label-cine text-gold-400">{cat.title}</p>
                <ul className="mt-5 space-y-2.5">
                  {servicesByCategory(cat.id).map((s) => (
                    <li key={s.slug}>
                      <Link to={`/services/${s.slug}`} className="text-sm text-white/55 transition-colors hover:text-white">
                        {s.shortName}
                      </Link>
                    </li>
                  ))}
                </ul>
                {cat.id === 'other' && (
                  <>
                    <p className="label-cine mt-10 text-gold-400">Company</p>
                    <ul className="mt-5 space-y-2.5">
                      {[
                        ['/about', 'About Us'],
                        ['/pricing', 'Pricing'],
                        ['/faqs', 'FAQs'],
                        ['/blog', 'Blog'],
                        ['/contact', 'Contact Us'],
                      ].map(([to, label]) => (
                        <li key={to}>
                          <Link to={to} className="text-sm text-white/55 transition-colors hover:text-white">
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
              <p className="label-cine text-gold-400">Get in touch</p>
              <ul className="mt-5 space-y-4 text-sm text-white/65">
                <li>
                  <a href={site.phoneHref} className="flex items-start gap-3 hover:text-white">
                    <Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" /> {site.phone}
                  </a>
                </li>
                <li>
                  <a href={`mailto:${site.email}`} className="flex items-start gap-3 hover:text-white">
                    <Mail className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" /> {site.email}
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" /> {site.address}
                </li>
                <li className="flex items-start gap-3">
                  <Clock className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" /> {site.hours}
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-16 border-t border-white/10 pt-6">
            <p className="text-xs leading-relaxed text-white/40">
              Disclaimer: {site.name} is a private professional services firm and is not affiliated with any government department.
              Prices shown are professional fees; {site.feeNote.toLowerCase()}
            </p>
            <div className="mt-4 flex flex-col gap-3 text-[11px] uppercase tracking-[0.15em] text-white/45 sm:flex-row sm:items-center sm:justify-between">
              <p>© {year} {site.legalName}. All rights reserved.</p>
              <div className="flex gap-6">
                <Link to="/privacy-policy" className="hover:text-white">Privacy Policy</Link>
                <Link to="/terms-and-conditions" className="hover:text-white">Terms & Conditions</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
