import { Link } from 'react-router-dom';
import { Phone, FileText } from 'lucide-react';
import { site, whatsappLink } from '@/config/site';
import { trackConversion } from '@/lib/analytics';
import { WhatsAppGlyph } from '@/components/ui';
import { usePastScene } from '@/lib/usePastScene';

/** Desktop: floating WhatsApp bubble. Mobile: sticky bottom bar with Call / WhatsApp / Enquire. */
export function FloatingCTA({ overlay = false }: { overlay?: boolean }) {
  // On the home page the desktop bubble waits until the cinematic scene is over (the scene nav has its own WhatsApp link).
  const pastScene = usePastScene(overlay);
  return (
    <>
      <a
        href={whatsappLink()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        onClick={() => trackConversion('contact', 'whatsapp:floating')}
        className={`group fixed bottom-6 right-6 z-40 hidden items-center transition-all duration-500 lg:flex ${
          pastScene ? '' : 'pointer-events-none translate-y-4 opacity-0'
        }`}
      >
        <span className="mr-3 translate-x-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-navy-900 opacity-0 shadow-lg transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
          Need help? Chat with us
        </span>
        <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl shadow-[#25D366]/40 transition-transform duration-300 group-hover:scale-105">
          <span className="absolute inset-0 animate-ping-slow rounded-full bg-[#25D366]/50" />
          <WhatsAppGlyph className="relative h-7 w-7" />
        </span>
      </a>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-navy-100 bg-white/95 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 shadow-[0_-8px_30px_-12px_rgba(11,42,91,0.25)] backdrop-blur lg:hidden">
        <div className="grid grid-cols-3 gap-2">
          <a
            href={site.phoneHref}
            onClick={() => trackConversion('contact', 'call:mobile-bar')}
            className="flex items-center justify-center gap-1.5 rounded-xl border border-navy-200 py-3 text-sm font-semibold text-navy-800"
          >
            <Phone className="h-4 w-4" /> Call
          </a>
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackConversion('contact', 'whatsapp:mobile-bar')}
            className="flex items-center justify-center gap-1.5 rounded-xl bg-[#25D366] py-3 text-sm font-semibold text-white"
          >
            <WhatsAppGlyph className="h-4 w-4" /> WhatsApp
          </a>
          <Link
            to="/contact#enquiry"
            className="flex items-center justify-center gap-1.5 rounded-xl bg-navy-800 py-3 text-sm font-semibold text-white"
          >
            <FileText className="h-4 w-4" /> Enquire
          </Link>
        </div>
      </div>
    </>
  );
}
