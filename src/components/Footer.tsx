import { Link } from 'react-router-dom';
import { Clock, Mail, MapPin, Phone } from 'lucide-react';
import { Logo } from '@/components/Logo';
import { WhatsAppGlyph } from '@/components/ui';
import { popularServices } from '@/data/services';
import { site, whatsappLink } from '@/config/site';

const quick = [
  ['/', 'Home'],
  ['/services', 'Services'],
  ['/pricing', 'Pricing'],
  ['/about', 'About Us'],
  ['/faqs', 'FAQs'],
  ['/blog', 'Blog'],
  ['/contact', 'Contact'],
];

/** Light footer from the reference: four quiet columns and a hairline bottom row. */
export function Footer({ overlap: _overlap = false }: { overlap?: boolean }) {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-mist-300 bg-soft-white pb-[84px] lg:pb-0">
      <div className="mx-auto max-w-7xl px-5 pt-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_0.8fr_1.1fr_1.2fr]">
          <div>
            <Logo />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted">
              Business registration, government documentation and compliance assistance for startups and small businesses across India.
            </p>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 text-sm font-medium text-white transition hover:-translate-y-0.5"
            >
              <WhatsAppGlyph className="h-4 w-4" /> WhatsApp us
            </a>
          </div>

          <div>
            <p className="label-cine text-ink">Quick links</p>
            <ul className="mt-5 space-y-3">
              {quick.map(([to, label]) => (
                <li key={to}>
                  <Link to={to} className="text-sm text-muted transition-colors hover:text-ink">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="label-cine text-ink">Popular services</p>
            <ul className="mt-5 space-y-3">
              {popularServices.map((s) => (
                <li key={s.slug}>
                  <Link to={`/services/${s.slug}`} className="text-sm text-muted transition-colors hover:text-ink">
                    {s.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/services" className="text-sm font-medium text-olive-700 hover:text-olive-900">
                  All services →
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="label-cine text-ink">Contact info</p>
            <ul className="mt-5 space-y-4 text-sm text-muted">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-olive-700" /> {site.address}
              </li>
              <li>
                <a href={site.phoneHref} className="flex items-start gap-3 hover:text-ink">
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-olive-700" /> {site.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${site.email}`} className="flex items-start gap-3 hover:text-ink">
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-olive-700" /> {site.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-olive-700" /> {site.hours}
              </li>
            </ul>
          </div>
        </div>

        <p className="mt-14 text-xs leading-relaxed text-subtle">
          Disclaimer: {site.name} is a private professional services firm and is not affiliated with any government department. Prices shown are
          professional fees; {site.feeNote.toLowerCase()}
        </p>
        <div className="mt-6 flex flex-col gap-3 border-t border-mist-300 py-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.legalName}. All rights reserved.
          </p>
          <p className="font-display italic text-ink/70">Register • Comply • Grow</p>
          <div className="flex gap-5">
            <Link to="/privacy-policy" className="hover:text-ink">
              Privacy Policy
            </Link>
            <Link to="/terms-and-conditions" className="hover:text-ink">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
