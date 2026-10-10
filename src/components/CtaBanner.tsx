import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Container, WhatsAppButton } from '@/components/ui';
import { MaskedWords, Reveal } from '@/components/Reveal';
import { Leaf } from '@/components/Leaf';

/** Closing call-to-action: a deep green panel with a big serif line and two calm buttons. */
export function CtaBanner({
  title = 'Ready to register your business?',
  text = 'Talk to a Regpro expert today. Get the right advice, a clear quote and a hassle-free process — all on WhatsApp.',
  message,
}: {
  title?: string;
  text?: string;
  message?: string;
}) {
  return (
    <section className="py-16 sm:py-24">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-olive-800 px-6 py-16 text-center sm:px-12 sm:py-20">
            <Leaf className="absolute -bottom-6 left-8 hidden sm:block" rotate={-25} width={48} height={114} color="#97A38B" vein="#2C4432" opacity={0.6} float />
            <Leaf className="absolute right-10 top-8 hidden sm:block" rotate={30} width={36} height={86} color="#B0B9A6" vein="#2C4432" opacity={0.5} float delay={1.2} />
            <div className="relative mx-auto max-w-2xl">
              <p className="eyebrow !text-soft-white/75 after:!bg-soft-white/40">Let’s get started</p>
              <h2 className="mt-5 font-display text-soft-white" style={{ fontSize: 'clamp(2rem,4vw,3.3rem)', lineHeight: 1.1 }}>
                <MaskedWords text={title} />
              </h2>
              <p className="mt-5 text-soft-white/70">{text}</p>
              <div className="mt-9 flex flex-wrap justify-center gap-3">
                <WhatsAppButton size="lg" message={message} source="cta-banner" />
                <Link to="/contact#enquiry" className="btn-light !ring-0">
                  Send an enquiry <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
