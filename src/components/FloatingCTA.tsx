import { Link } from 'react-router-dom';
import { Phone, FileText } from 'lucide-react';
import { site, whatsappLink } from '@/config/site';
import { trackConversion } from '@/lib/analytics';
import { WhatsAppGlyph } from '@/components/ui';

/** Desktop: floating WhatsApp bubble. Mobile: sticky bottom bar with Call / WhatsApp / Enquire. */
export function FloatingCTA() {
  return (
    <>
      <a
        href={whatsappLink()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        onClick={() => trackConversion('contact', 'whatsapp:floating')}
        className="group fixed bottom-6 right-6 z-40 hidden items-center lg:flex"
      >
        <span className="mr-3 translate-x-2 rounded-full bg-cream px-4 py-2 text-sm font-semibold text-olive-900 opacity-0 shadow-lg transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
          Need help? Chat with us
        </span>
        <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl shadow-[#25D366]/40 transition-transform duration-300 group-hover:scale-105">
          <span className="absolute inset-0 animate-ping-slow rounded-full bg-[#25D366]/50" />
          <WhatsAppGlyph className="relative h-7 w-7" />
        </span>
      </a>

      <div className="fixed inset-x-0 bottom-0 z-40 rounded-t-3xl border-t border-mist-300 bg-cream/95 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 shadow-[0_-8px_30px_rgba(53,63,34,0.12)] backdrop-blur-xl lg:hidden">
        <div className="grid grid-cols-3 gap-2">
          <a
            href={site.phoneHref}
            onClick={() => trackConversion('contact', 'call:mobile-bar')}
            className="flex items-center justify-center gap-1.5 rounded-full border border-olive-800/25 py-3 text-sm font-semibold text-olive-800"
          >
            <Phone className="h-4 w-4" /> Call
          </a>
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackConversion('contact', 'whatsapp:mobile-bar')}
            className="flex items-center justify-center gap-1.5 rounded-full bg-[#25D366] py-3 text-sm font-semibold text-white"
          >
            <WhatsAppGlyph className="h-4 w-4" /> WhatsApp
          </a>
          <Link
            to="/contact#enquiry"
            className="flex items-center justify-center gap-1.5 rounded-full bg-olive-800 py-3 text-sm font-semibold text-soft-white"
          >
            <FileText className="h-4 w-4" /> Enquire
          </Link>
        </div>
      </div>
    </>
  );
}
