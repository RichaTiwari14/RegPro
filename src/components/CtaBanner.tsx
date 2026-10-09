import { CallButton, WhatsAppButton } from '@/components/ui';
import { Reveal } from '@/components/Reveal';
import { GoldGlow, Mist } from '@/components/Atmosphere';

const RIDGES = [
  { d: 'M0 220 L120 150 L240 190 L380 90 L520 170 L660 110 L800 180 L960 80 L1100 160 L1240 100 L1440 170 L1440 320 L0 320Z', fill: '#1A3D78', o: 0.5 },
  { d: 'M0 260 L160 210 L300 245 L460 185 L620 240 L780 200 L940 250 L1100 205 L1280 245 L1440 215 L1440 320 L0 320Z', fill: '#081F44', o: 1 },
];

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
          <div className="dusk relative overflow-hidden rounded-[2rem] px-6 pb-40 pt-14 text-center sm:px-12 sm:pb-48 sm:pt-16">
            <Mist tone="dark" />
            <GoldGlow />
            <svg viewBox="0 0 1440 320" preserveAspectRatio="none" className="pointer-events-none absolute inset-x-0 bottom-0 h-40 w-full sm:h-48" aria-hidden="true">
              {RIDGES.map((r) => (
                <path key={r.d} d={r.d} fill={r.fill} opacity={r.o} />
              ))}
            </svg>
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
