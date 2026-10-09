import { CallButton, WhatsAppButton } from '@/components/ui';
import { Reveal } from '@/components/Reveal';


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
      <div className="mx-auto max-w-7xl px-6 sm:px-8 md:px-12">
        <Reveal>
          <div className="dusk relative overflow-hidden rounded-[2rem] px-6 py-14 text-center sm:px-12 sm:py-16">
            <div className="relative mx-auto max-w-2xl">
              <h2 className="heading-cine text-white" style={{ fontSize: 'clamp(1.75rem,3.4vw,3rem)' }}>
                {title}
              </h2>
              <p className="mt-5 text-white/65 sm:text-lg">{text}</p>
              <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
                <WhatsAppButton size="lg" message={message} source="cta-banner" />
                <CallButton size="lg" variant="light" label="Call an expert" source="cta-banner" />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
