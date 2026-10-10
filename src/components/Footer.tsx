import { Link } from 'react-router-dom';
import { Clock, Mail, MapPin, Phone } from 'lucide-react';
import { LogoMark } from '@/components/Logo';
import { WhatsAppGlyph } from '@/components/ui';
import { categories, servicesByCategory } from '@/data/services';
import { site, whatsappLink } from '@/config/site';


/** `overlap` pulls the ridge up over the section above (used on home, where that section is the dark backdrop). */
export function Footer({ overlap = false }: { overlap?: boolean }) {
  const year = new Date().getFullYear();
  return (
    <footer className={`relative z-10 text-white ${overlap ? '-mt-[clamp(60px,10vw,140px)]' : ''}`}>
      <div className="dusk relative overflow-hidden">
        <div className="relative mx-auto max-w-7xl px-6 pb-28 pt-12 sm:px-8 md:px-12 lg:pb-12">
          <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr_1fr_1fr_1.1fr]">
            <div>
              <Link to="/" aria-label={`${site.name} home`} className="flex items-center gap-2">
                <LogoMark light className="h-8 w-auto" />
                <span className="font-display text-xl font-extrabold tracking-tight">REGPRO</span>
              </Link>
              <p className="mt-6 max-w-xs text-sm leading-relaxed text-white/55">
                Business registration, government documentation and compliance assistance for startups and small businesses across India.
              </p>
              <p className="label-cine mt-6 text-gold-400">Register. Comply. Grow.</p>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 text-sm font-semibold text-white transition hover:-translate-y-0.5"
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
            <div className="mt-4 flex flex-col gap-3 text-[11px] tracking-tight text-white/45 sm:flex-row sm:items-center sm:justify-between">
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
