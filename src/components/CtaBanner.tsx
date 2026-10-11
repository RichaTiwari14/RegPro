import { Phone, Send } from 'lucide-react';
import { Container, WhatsAppGlyph } from '@/components/ui';
import { MaskedWords, Reveal } from '@/components/Reveal';
import { Blob } from '@/components/Shapes';
import { site, whatsappLink } from '@/config/site';
import { trackEvent } from '@/lib/analytics';

/** Sage "let's talk" band with overlapping organic shapes (reference style). */
export function CtaBanner({
  title = 'Have Questions? Let’s Talk!',
  text = 'Get expert advice on your business registration and compliance needs.',
  message,
}: {
  title?: string;
  text?: string;
  message?: string;
  highlight?: string[];
}) {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-[28px] bg-sage-100 px-6 py-10 sm:px-12 sm:py-12">
            <Blob variant="b" color="#1C3F27" className="absolute -bottom-40 -right-24 hidden h-[360px] w-[360px] sm:block" float />
            <Blob variant="a" color="#BFCDB1" className="absolute -right-10 -top-32 hidden h-[260px] w-[260px] opacity-70 sm:block" float delay={3} />
            <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center">
              <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-white text-forest-800 shadow-card">
                <Send className="h-7 w-7" strokeWidth={1.6} />
              </span>
              <div className="max-w-xl">
                <h2 className="font-display text-2xl font-semibold text-forest-900 sm:text-3xl">
                  <MaskedWords text={title} />
                </h2>
                <p className="mt-2 text-muted">{text}</p>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <a href={whatsappLink(message)} target="_blank" rel="noopener noreferrer" onClick={() => trackEvent('whatsapp_click', { label: 'cta-band' })} className="btn-primary">
                    <WhatsAppGlyph className="h-4 w-4" /> Chat on WhatsApp
                  </a>
                  <a href={site.phoneHref} onClick={() => trackEvent('phone_click', { label: 'cta-band' })} className="btn-outline">
                    <Phone className="h-4 w-4" /> Request a Call
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
