import { Link } from 'react-router-dom';
import { Clock, Mail, MapPin, Phone } from 'lucide-react';
import { Logo } from '@/components/Logo';
import { Container, WhatsAppGlyph } from '@/components/ui';
import { categories, servicesByCategory } from '@/data/services';
import { site, whatsappLink } from '@/config/site';

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative overflow-hidden bg-navy-950 text-white">
      <div className="pointer-events-none absolute -top-40 right-0 h-80 w-80 rounded-full bg-gold-500/10 blur-3xl" />
      <Container className="relative pb-28 pt-16 lg:pb-10">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr_1fr_1fr_1.1fr]">
          <div>
            <Link to="/" aria-label={`${site.name} home`}>
              <Logo light />
            </Link>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/60">
              Business registration, government documentation and compliance assistance for startups and small businesses across India.
            </p>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#25D366] px-4 py-2.5 text-sm font-semibold text-white"
            >
              <WhatsAppGlyph className="h-4 w-4" /> WhatsApp us
            </a>
          </div>

          {categories.map((cat) => (
            <div key={cat.id}>
              <p className="text-sm font-semibold text-gold-400">{cat.title}</p>
              <ul className="mt-4 space-y-2.5">
                {servicesByCategory(cat.id).map((s) => (
                  <li key={s.slug}>
                    <Link to={`/services/${s.slug}`} className="text-sm text-white/60 transition-colors hover:text-white">
                      {s.shortName}
                    </Link>
                  </li>
                ))}
              </ul>
              {cat.id === 'other' && (
                <>
                  <p className="mt-8 text-sm font-semibold text-gold-400">Company</p>
                  <ul className="mt-4 space-y-2.5">
                    {[
                      ['/about', 'About Us'],
                      ['/pricing', 'Pricing'],
                      ['/faqs', 'FAQs'],
                      ['/blog', 'Blog'],
                      ['/contact', 'Contact Us'],
                    ].map(([to, label]) => (
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
            <p className="text-sm font-semibold text-gold-400">Get in touch</p>
            <ul className="mt-4 space-y-4 text-sm text-white/70">
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

        <div className="mt-14 border-t border-white/10 pt-6">
          <p className="text-xs leading-relaxed text-white/40">
            Disclaimer: {site.name} is a private professional services firm and is not affiliated with any government department.
            Prices shown are professional fees; {site.feeNote.toLowerCase()}
          </p>
          <div className="mt-4 flex flex-col gap-3 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
            <p>© {year} {site.legalName}. All rights reserved.</p>
            <div className="flex gap-5">
              <Link to="/privacy-policy" className="hover:text-white">Privacy Policy</Link>
              <Link to="/terms-and-conditions" className="hover:text-white">Terms & Conditions</Link>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
