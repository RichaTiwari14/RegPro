import { Link } from 'react-router-dom';
import { AnimatedHeading } from '@/components/AnimatedHeading';
import { FadeIn } from '@/components/FadeIn';
import { whatsappLink } from '@/config/site';
import { trackConversion } from '@/lib/analytics';

const VIDEO_SRC =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260403_050628_c4e32401-fab4-4a27-b7a8-6e9291cd5959.mp4';

export function LandingHero() {
  return (
    <section className="relative flex min-h-screen flex-col overflow-hidden bg-black text-white">
      {/* Raw background video — no overlays */}
      <video
        src={VIDEO_SRC}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Content pushed to the bottom of the viewport (the navbar sits above, fixed) */}
      <div className="relative z-10 flex flex-1 flex-col justify-end px-6 pb-28 pt-32 md:px-12 lg:px-16 lg:pb-16">
        <div className="lg:grid lg:grid-cols-2 lg:items-end">
          <div>
            <AnimatedHeading
              text={'Register your business.\nWe handle the rest.'}
              className="mb-4 text-4xl font-normal md:text-5xl lg:text-6xl xl:text-7xl"
              style={{ letterSpacing: '-0.04em' }}
            />

            <FadeIn delay={800} duration={1000}>
              <p className="mb-5 text-base text-gray-300 md:text-lg">
                Company registration, GST, MSME, trademark and compliance — handled by experts, 100% online.
              </p>
            </FadeIn>

            <FadeIn delay={1200} duration={1000}>
              <div className="flex flex-wrap gap-4">
                <a
                  href={whatsappLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackConversion('contact', 'whatsapp:hero')}
                  className="rounded-lg bg-white px-8 py-3 font-medium text-black transition-colors hover:bg-gray-100"
                >
                  Start a Chat
                </a>
                <Link
                  to="/services"
                  className="liquid-glass rounded-lg border border-white/20 px-8 py-3 font-medium text-white transition-colors hover:bg-white hover:text-black"
                >
                  Explore Services
                </Link>
              </div>
            </FadeIn>
          </div>

          <FadeIn delay={1400} duration={1000} className="mt-8 flex items-end justify-start lg:mt-0 lg:justify-end">
            <div className="liquid-glass rounded-xl border border-white/20 px-6 py-3">
              <p className="text-lg font-light md:text-xl lg:text-2xl">Register. Comply. Grow.</p>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
