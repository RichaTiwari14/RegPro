import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Container, WhatsAppButton } from '@/components/ui';
import { MaskedWords, Reveal } from '@/components/Reveal';

/** Navy conversion banner over a restrained architectural image, with a gold primary CTA. */
export function CtaBanner({
  title = 'Ready to Get Your Business Moving?',
  text = 'Talk to an expert for clear guidance on the right registration, documents and fees for your business.',
  message,
  highlight = ['Moving?'],
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
          <div className="relative overflow-hidden rounded-2xl bg-navy-900">
            <img src="/assets/cta-architecture.webp" alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-60" />
            <div className="absolute inset-0 bg-gradient-to-r from-navy-900 via-navy-900/85 to-navy-900/40" />
            <div className="relative grid items-center gap-8 px-6 py-14 sm:px-12 sm:py-16 lg:grid-cols-[1.4fr_1fr]">
              <div>
                <p className="eyebrow eyebrow-rule !text-gold-300 before:!bg-gold-300">Get expert assistance</p>
                <h2 className="mt-4 font-display text-white" style={{ fontSize: 'clamp(1.9rem,3.4vw,2.9rem)', lineHeight: 1.12 }}>
                  <MaskedWords text={title} highlight={highlight} />
                </h2>
                <p className="mt-4 max-w-xl text-white/70">{text}</p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
                <Link to="/contact#enquiry" className="btn-gold !px-7 !py-3.5">
                  Get Expert Assistance <ArrowRight className="h-4 w-4" />
                </Link>
                <WhatsAppButton size="lg" label="WhatsApp Us" message={message} source="cta-banner" />
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
