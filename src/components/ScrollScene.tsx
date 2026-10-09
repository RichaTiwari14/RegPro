import { useEffect, useState, type CSSProperties, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { ArrowDown, ArrowRight, ChevronUp, X } from 'lucide-react';
import { useVideoScrub } from '@/lib/useVideoScrub';
import { LogoMark } from '@/components/Logo';
import { WhatsAppGlyph } from '@/components/ui';
import { site, whatsappLink } from '@/config/site';
import { trackConversion } from '@/lib/analytics';
import { lockScroll, scrollToTarget } from '@/lib/smoothScroll';

const VIDEO_SRC =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260821_114821_a8ca298f-be2c-4613-a4dd-51b69e16bbde.mp4';

/** Regpro navy — text colour on the light cloud frames. */
const DARK = '#0B2A5B';
const EASE = 'cubic-bezier(0.16,1,0.3,1)';
const SCENE_FONT = "'Helvetica Neue ME', 'Helvetica Neue', Helvetica, Arial, sans-serif";

const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Services', to: '/services' },
  { label: 'Pricing', to: '/pricing' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
];

const MENU_LINKS = [...NAV_LINKS.slice(0, 4), { label: 'FAQs', to: '/faqs' }, { label: 'Blog', to: '/blog' }, NAV_LINKS[4]];

function Stagger({
  visible,
  delay = 0,
  className = '',
  children,
}: {
  visible: boolean;
  delay?: number;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(24px)',
        transition: `opacity 0.8s ${EASE} ${delay}ms, transform 0.8s ${EASE} ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

function navEntrance(mounted: boolean, delay: number): CSSProperties {
  return {
    opacity: mounted ? 1 : 0,
    transform: mounted ? 'translateY(0)' : 'translateY(-12px)',
    transition: `opacity 0.6s ${EASE} ${delay}ms, transform 0.6s ${EASE} ${delay}ms`,
  };
}

function MenuOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  // Portalled to <body> so it sits above the sticky scene's stacking context and the mobile CTA bar.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    lockScroll(true);
    return () => lockScroll(false);
  }, [open]);

  if (!mounted) return null;

  return createPortal(
    <div
      className={`fixed inset-0 z-[100] pointer-events-auto transition-all duration-500 ${
        open ? 'visible opacity-100' : 'invisible opacity-0'
      }`}
      style={{ backgroundColor: DARK, transitionTimingFunction: 'cubic-bezier(0.4,0,0.2,1)' }}
    >
      <div
        className={`flex h-full flex-col transition-transform duration-500 ${open ? 'translate-y-0' : '-translate-y-8'}`}
        style={{ transitionTimingFunction: 'cubic-bezier(0.4,0,0.2,1)' }}
      >
        <div className="flex items-center justify-between px-6 pt-8 sm:px-8 sm:pt-12">
          <LogoMark light className="h-9 w-auto" />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 text-white transition-colors duration-300 hover:border-white"
          >
            <X size={18} />
          </button>
        </div>

        <nav className="flex flex-1 flex-col justify-center px-8 sm:px-12">
          {MENU_LINKS.map((l, i) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={onClose}
              className={`py-3 text-2xl font-light uppercase tracking-wide sm:text-3xl ${
                i === 0 ? 'text-white' : 'text-white/60 hover:text-white'
              }`}
              style={{
                opacity: open ? 1 : 0,
                transform: open ? 'translateY(0)' : 'translateY(20px)',
                transition: `opacity 0.6s ${EASE} ${i * 60}ms, transform 0.6s ${EASE} ${i * 60}ms, color 0.3s`,
              }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-8 px-8 pb-10 text-xs uppercase tracking-[0.2em] text-white/60 sm:px-12">
          <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="hover:text-white">
            WhatsApp
          </a>
          <a href={site.phoneHref} className="hover:text-white">
            Call {site.phone}
          </a>
        </div>
      </div>
    </div>,
    document.body,
  );
}

function SceneNavbar({ isLight }: { isLight: boolean }) {
  const [mounted, setMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 200);
    return () => clearTimeout(t);
  }, []);

  const color = isLight ? '#FFFFFF' : DARK;
  const inverse = isLight ? DARK : '#FFFFFF';

  return (
    <>
      <header
        className="pointer-events-auto absolute left-0 right-0 top-0 z-50 flex items-center justify-between px-6 pb-6 pt-8 transition-colors duration-500 sm:px-8 sm:pt-12 md:px-12"
        style={{ color }}
      >
        {/* Desktop: brand + links */}
        <div className="hidden items-center gap-10 lg:flex xl:gap-14">
        <Link to="/" aria-label={`${site.name} home`} className="flex items-center gap-2" style={navEntrance(mounted, 60)}>
          <LogoMark light={isLight} className="h-7 w-auto" />
          <span className="text-sm font-medium tracking-[0.3em]">REGPRO</span>
        </Link>
        <nav className="flex items-center gap-8 xl:gap-10" aria-label="Main">
          {NAV_LINKS.map((l, i) => (
            <Link
              key={l.to}
              to={l.to}
              className="relative text-xs font-medium uppercase tracking-[0.15em] hover:opacity-70"
              style={navEntrance(mounted, i * 80 + 100)}
            >
              {l.label}
              {i === 0 && <span className="absolute -bottom-3 left-0 h-[2px] w-full bg-current" />}
            </Link>
          ))}
        </nav>
        </div>

        {/* Mobile hamburger */}
        <div className="flex items-center gap-4 lg:hidden" style={navEntrance(mounted, 100)}>
          <button type="button" onClick={() => setMenuOpen(true)} aria-label="Open menu" className="flex flex-col gap-[5px]">
            <span className="block h-[2px] w-6 transition-colors duration-500" style={{ backgroundColor: color }} />
            <span className="block h-[2px] w-6 transition-colors duration-500" style={{ backgroundColor: color }} />
            <span className="block h-[2px] w-4 transition-colors duration-500" style={{ backgroundColor: color }} />
          </button>
        </div>

        {/* Mobile brand, centred */}
        <Link
          to="/"
          aria-label={`${site.name} home`}
          className="absolute left-1/2 top-7 flex -translate-x-1/2 items-center gap-2 sm:top-11 lg:hidden"
          style={navEntrance(mounted, 60)}
        >
          <LogoMark light={isLight} className="h-7 w-auto" />
          <span className="text-sm font-medium tracking-[0.3em]">REGPRO</span>
        </Link>

        {/* Right cluster */}
        <div className="hidden items-center gap-8 sm:flex" style={navEntrance(mounted, 500)}>
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackConversion('contact', 'whatsapp:scene-nav')}
            className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] hover:opacity-70"
          >
            WhatsApp
            <span
              className="flex h-5 w-5 items-center justify-center rounded-full transition-colors duration-500"
              style={{ backgroundColor: color, color: inverse }}
            >
              <WhatsAppGlyph className="h-[10px] w-[10px]" />
            </span>
          </a>
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            className="text-xs font-medium uppercase tracking-[0.2em] hover:opacity-70"
          >
            Menu
          </button>
        </div>
      </header>

      <MenuOverlay open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}

/**
 * Cinematic landing scene: a 500vh scroll track with a sticky, scroll-scrubbed aerial video
 * and three sequential text sections.
 */
export function ScrollScene() {
  const { containerRef, videoRef, canvasRef, scrollProgress: p, canvasLive } = useVideoScrub(VIDEO_SRC);

  const s1Opacity = p < 0.2 ? 1 : Math.max(0, 1 - (p - 0.2) / 0.08);
  const s2Opacity = p < 0.32 ? 0 : p < 0.4 ? (p - 0.32) / 0.08 : p < 0.55 ? 1 : Math.max(0, 1 - (p - 0.55) / 0.08);
  const s3Opacity = p < 0.67 ? 0 : p < 0.75 ? (p - 0.67) / 0.08 : 1;

  const s1Visible = s1Opacity > 0.3;
  const s2Visible = s2Opacity > 0.3;
  const s3Visible = s3Opacity > 0.3;

  const sectionStyle = (opacity: number): CSSProperties => ({ opacity, transition: 'opacity 0.1s ease-out' });

  const scrollPastScene = () => {
    const el = containerRef.current;
    if (el) scrollToTarget(el.offsetTop + el.offsetHeight);
  };

  return (
    <div id="scroll-scene" ref={containerRef} className="relative h-[500vh]" style={{ fontFamily: SCENE_FONT }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#dfe6ec]">
        <video
          ref={videoRef}
          src={VIDEO_SRC}
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <canvas
          ref={canvasRef}
          width={1920}
          height={1080}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${
            canvasLive ? 'opacity-100' : 'opacity-0'
          }`}
        />

        <div className="pointer-events-none absolute inset-0">
          <SceneNavbar isLight={p > 0.55} />

          {/* Section 1 */}
          <section
            className="absolute inset-0 flex flex-col justify-center px-6 sm:px-8 md:px-20 lg:px-32"
            style={sectionStyle(s1Opacity)}
          >
            <Stagger visible={s1Visible} delay={0}>
              <h1 className="max-w-5xl font-light uppercase leading-[1.2]" style={{ fontSize: 'clamp(2rem,5vw,5rem)', color: DARK }}>
                Business registration made effortless
              </h1>
            </Stagger>
            <Stagger visible={s1Visible} delay={150} className="mt-6">
              <p className="text-sm uppercase tracking-[0.3em]" style={{ color: `${DARK}90` }}>
                Register. Comply. Grow.
              </p>
            </Stagger>
            <Stagger visible={s1Visible} delay={300} className="absolute bottom-28 right-6 sm:right-8 md:right-12 lg:bottom-12">
              <Link
                to="/services"
                aria-label="Explore services"
                className={`flex h-12 w-12 items-center justify-center rounded-full border transition-opacity hover:opacity-70 ${
                  s1Visible ? 'pointer-events-auto' : ''
                }`}
                style={{ borderColor: `${DARK}50`, color: DARK }}
              >
                <ArrowRight size={18} />
              </Link>
            </Stagger>
          </section>

          {/* Section 2 */}
          <section className="absolute inset-0 flex items-center justify-center px-6 sm:px-8" style={sectionStyle(s2Opacity)}>
            <Stagger visible={s2Visible} delay={0} className="max-w-[900px]">
              <h2
                className="text-center font-extralight uppercase leading-[1.3] tracking-wide"
                style={{ fontSize: 'clamp(1.5rem,4.5vw,4.5rem)', color: DARK }}
              >
                We handle the paperwork <span style={{ color: `${DARK}80` }}>with precision</span>{' '}
                <span style={{ color: `${DARK}50` }}>so you can focus on growth</span>
              </h2>
            </Stagger>

            <div className="absolute bottom-28 right-6 flex flex-col items-center gap-4 sm:right-8 md:right-12 lg:bottom-16">
              <Stagger visible={s2Visible} delay={200}>
                <button
                  type="button"
                  onClick={scrollPastScene}
                  aria-label="Scroll down"
                  className={`flex h-12 w-12 items-center justify-center rounded-full border transition-opacity hover:opacity-70 ${
                    s2Visible ? 'pointer-events-auto' : ''
                  }`}
                  style={{ borderColor: `${DARK}40`, color: DARK }}
                >
                  <ArrowDown size={18} />
                </button>
              </Stagger>
              <Stagger visible={s2Visible} delay={350} className="mt-4">
                <div className="flex flex-col items-center gap-2">
                  <span className="block h-1.5 w-1.5 rounded-full" style={{ backgroundColor: `${DARK}40` }} />
                  <span className="block h-2 w-2 rounded-full" style={{ backgroundColor: DARK }} />
                  <span className="block h-1.5 w-1.5 rounded-full" style={{ backgroundColor: `${DARK}40` }} />
                </div>
              </Stagger>
              <Stagger visible={s2Visible} delay={500} className="mt-2">
                <button
                  type="button"
                  onClick={() => scrollToTarget(0)}
                  aria-label="Scroll to top"
                  className={`flex h-10 w-10 items-center justify-center rounded-full border transition-opacity hover:opacity-70 ${
                    s2Visible ? 'pointer-events-auto' : ''
                  }`}
                  style={{ borderColor: `${DARK}30`, color: `${DARK}80` }}
                >
                  <ChevronUp size={16} />
                </button>
              </Stagger>
            </div>
          </section>

          {/* Section 3 */}
          <section
            className="absolute inset-0 flex items-center justify-end px-6 sm:px-8 md:px-20 lg:px-32"
            style={sectionStyle(s3Opacity)}
          >
            <div className="max-w-2xl text-left">
              <Stagger visible={s3Visible} delay={0}>
                <p className="mb-4 text-lg tracking-wide text-white/60">Regpro | Business Compliance</p>
              </Stagger>
              <Stagger visible={s3Visible} delay={150}>
                <h2
                  className="mb-8 font-light uppercase leading-[1.2] tracking-wide text-white"
                  style={{ fontSize: 'clamp(2rem,4vw,4rem)' }}
                >
                  Start right,
                  <br />
                  grow without limits.
                </h2>
              </Stagger>
              <Stagger visible={s3Visible} delay={300}>
                <a
                  href={whatsappLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackConversion('contact', 'whatsapp:scene-cta')}
                  className={`group inline-flex items-center gap-4 ${s3Visible ? 'pointer-events-auto' : ''}`}
                >
                  <span className="text-sm uppercase tracking-[0.3em] text-white/80">Talk to an expert</span>
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-gray-800 transition-transform duration-300 group-hover:scale-110">
                    <ArrowRight size={16} />
                  </span>
                </a>
              </Stagger>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
