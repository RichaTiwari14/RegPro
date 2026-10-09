import { Container, CallButton, WhatsAppButton } from '@/components/ui';
import { Reveal } from '@/components/Reveal';
import { LogoMark } from '@/components/Logo';

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
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] bg-navy-900 px-6 py-12 sm:px-12 sm:py-14">
            <div className="grid-pattern pointer-events-none absolute inset-0 opacity-40" />
            <div className="pointer-events-none absolute -left-20 -top-24 h-72 w-72 rounded-full bg-gold-500/20 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-32 right-10 h-80 w-80 rounded-full bg-navy-400/30 blur-3xl" />
            <LogoMark className="pointer-events-none absolute -bottom-6 right-6 hidden h-56 w-auto opacity-[0.08] md:block" />
            <div className="relative max-w-2xl">
              <h2 className="font-display text-3xl font-bold leading-tight text-white sm:text-4xl">{title}</h2>
              <p className="mt-4 text-white/70 sm:text-lg">{text}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <WhatsAppButton size="lg" message={message} source="cta-banner" />
                <CallButton size="lg" variant="light" label="Call an expert" source="cta-banner" />
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
