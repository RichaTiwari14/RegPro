import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';
import { CallButton, Container, WhatsAppButton } from '@/components/ui';
import { MaskedWords } from '@/components/Reveal';
import { Leaf } from '@/components/Leaf';

/** Closing call-to-action: frosted card over a fixed deep-olive skyline, leaves drifting at the edges. */
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
    <section className="relative overflow-hidden py-24 lg:py-36" style={{ clipPath: 'inset(0)' }}>
      <div className="pointer-events-none fixed inset-0" aria-hidden="true">
        <img src="/images/city-dusk.jpg" alt="" className="h-full w-full object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-b from-olive-950/90 via-olive-900/85 to-olive-950/90" />
      </div>
      <Leaf className="absolute left-8 top-8 z-10 lg:left-16" rotate={-25} color="#A6BFC1" vein="#C9D2B5" opacity={0.6} float />
      <Leaf className="absolute bottom-8 right-10 z-10 lg:right-20" width={55} height={130} rotate={30} flip color="#A6BFC1" vein="#C9D2B5" opacity={0.6} float delay={1.5} />
      <Container className="relative z-10">
        <motion.div
          className="relative mx-auto max-w-4xl overflow-hidden rounded-3xl border border-soft-white/20 bg-soft-white/10 px-6 py-14 text-center shadow-[0_30px_70px_rgba(0,0,0,0.35)] backdrop-blur-md sm:px-12 sm:py-16"
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: '0px 0px -15% 0px' }}
          transition={{ duration: 1.1, ease: [0.215, 0.61, 0.355, 1] }}
        >
          <Leaf className="absolute -bottom-8 -right-8" width={130} height={280} rotate={20} color="#FBFBF8" vein="#65733F" opacity={0.12} />
          <div className="relative mx-auto max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-soft-white/25 bg-soft-white/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-soft-white/90">
              <Sparkles className="h-3.5 w-3.5 text-sage-200" /> Talk to an expert
            </span>
            <h2 className="mt-6 font-display font-semibold leading-[1.08] text-soft-white" style={{ fontSize: 'clamp(2.2rem,4.4vw,3.6rem)' }}>
              <MaskedWords text={title} />
            </h2>
            <p className="mt-5 text-soft-white/75 sm:text-lg">{text}</p>
            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
              <WhatsAppButton size="lg" message={message} source="cta-banner" />
              <CallButton size="lg" variant="light" label="Call an expert" source="cta-banner" />
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
