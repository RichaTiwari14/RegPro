import { motion } from 'motion/react';
import { CallButton, Container, WhatsAppButton } from '@/components/ui';
import { MaskedWords } from '@/components/Reveal';
import { StickyBg } from '@/components/StickyBg';

/** Closing call-to-action: the night skyline stays fixed while the rounded panel scrolls over it. */
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
    <section className="py-16 sm:py-20">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: '0px 0px -10% 0px' }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <StickyBg image="/images/city-dusk.jpg" overlay="bg-navy-950/75" rounded="2rem">
            <div className="mx-auto max-w-2xl px-6 py-16 text-center sm:px-12 sm:py-20">
              <h2 className="heading-cine !text-white" style={{ fontSize: 'clamp(1.75rem,3.4vw,3rem)' }}>
                <MaskedWords text={title} />
              </h2>
              <p className="mt-5 text-white/70 sm:text-lg">{text}</p>
              <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
                <WhatsAppButton size="lg" message={message} source="cta-banner" />
                <CallButton size="lg" variant="light" label="Call an expert" source="cta-banner" />
              </div>
            </div>
          </StickyBg>
        </motion.div>
      </Container>
    </section>
  );
}
