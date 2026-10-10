import { Link } from 'react-router-dom';
import { Clock, Mail, MapPin, Phone } from 'lucide-react';
import { LogoMark } from '@/components/Logo';
import { Leaf } from '@/components/Leaf';
import { WhatsAppGlyph } from '@/components/ui';
import { categories, servicesByCategory } from '@/data/services';
import { site, whatsappLink } from '@/config/site';


/** Deep-olive footer with a soft curved top edge and drifting leaves. */
export function Footer({ overlap = false }: { overlap?: boolean }) {
  const year = new Date().getFullYear();
  return (
    <footer className={`relative z-10 mt-[50px] text-soft-white sm:mt-[80px] ${overlap ? '-mt-[clamp(60px,10vw,140px)]' : ''}`}>
      <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="absolute inset-x-0 top-0 h-[50px] w-full -translate-y-[98%] sm:h-[80px]" aria-hidden="true">
        <path d="M0 80L0 40C240 70 480 80 720 60C960 40 1200 50 1440 40L1440 80Z" fill="#283019" />
      </svg>
      <div className="relative overflow-hidden bg-olive-900">
        <Leaf className="absolute right-10 top-10 hidden lg:block" color="#6E9094" vein="#283019" rotate={28} opacity={0.35} float />
        <Leaf className="absolute bottom-24 left-[42%] hidden lg:block" color="#83915F" vein="#283019" rotate={-30} width={34} height={80} opacity={0.3} float delay={1.5} />
        <div className="relative mx-auto max-w-7xl px-6 pb-28 pt-12 sm:px-8 md:px-12 lg:pb-12">
          <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr_1fr_1fr_1.1fr]">
            <div>
              <Link to="/" aria-label={`${site.name} home`} className="flex items-center gap-2">
                <LogoMark light className="h-8 w-auto" />
                <span className="font-display text-2xl font-semibold tracking-wide">Regpro</span>
              </Link>
              <p className="mt-6 max-w-xs text-sm leading-relaxed text-white/55">
                Business registration, government documentation and compliance assistance for startups and small businesses across India.
              </p>
              <p className="mt-6 font-display text-xl italic text-sage-300">Register. Comply. Grow. ♥</p>
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
                <p className="font-display text-xl font-semibold text-soft-white">{cat.title}</p>
                <ul className="mt-5 space-y-2.5">
                  {servicesByCategory(cat.id).map((s) => (
                    <li key={s.slug}>
                      <Link to={`/services/${s.slug}`} className="text-sm text-soft-white/60 transition-colors duration-300 hover:text-sage-200">
                        {s.shortName}
                      </Link>
                    </li>
                  ))}
                </ul>
                {cat.id === 'other' && (
                  <>
                    <p className="mt-10 font-display text-xl font-semibold text-soft-white">Company</p>
                    <ul className="mt-5 space-y-2.5">
                      {[
                        ['/about', 'About Us'],
                        ['/pricing', 'Pricing'],
                        ['/faqs', 'FAQs'],
                        ['/blog', 'Blog'],
                        ['/contact', 'Contact Us'],
                      ].map(([to, label]) => (
                        <li key={to}>
                          <Link to={to} className="text-sm text-soft-white/60 transition-colors duration-300 hover:text-sage-200">
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
              <p className="font-display text-xl font-semibold text-soft-white">Get in touch</p>
              <ul className="mt-5 space-y-4 text-sm text-white/65">
                <li>
                  <a href={site.phoneHref} className="flex items-start gap-3 hover:text-white">
                    <Phone className="mt-0.5 h-4 w-4 shrink-0 text-sage-300" /> {site.phone}
                  </a>
                </li>
                <li>
                  <a href={`mailto:${site.email}`} className="flex items-start gap-3 hover:text-white">
                    <Mail className="mt-0.5 h-4 w-4 shrink-0 text-sage-300" /> {site.email}
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-sage-300" /> {site.address}
                </li>
                <li className="flex items-start gap-3">
                  <Clock className="mt-0.5 h-4 w-4 shrink-0 text-sage-300" /> {site.hours}
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
