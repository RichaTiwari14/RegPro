import { useEffect, useState, type CSSProperties, type ReactNode } from 'react';
import { ArrowDown, ArrowRight, ChevronUp, Info, X } from 'lucide-react';
import { useVideoScrub } from '@/useVideoScrub';

const VIDEO_SRC =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260821_114821_a8ca298f-be2c-4613-a4dd-51b69e16bbde.mp4';

const DARK = '#1D3045';
const EASE = 'cubic-bezier(0.16,1,0.3,1)';

const NAV_LINKS = ['Vectrus Energy', 'Vectrus Upstream', 'Vectrus Markets', 'Vectrus Systems', 'Vectrus+'];

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

function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <div
      className={`fixed inset-0 z-[100] pointer-events-auto transition-all duration-500 ${
        open ? 'opacity-100 visible' : 'opacity-0 invisible'
      }`}
      style={{ backgroundColor: DARK, transitionTimingFunction: 'cubic-bezier(0.4,0,0.2,1)' }}
    >
      <div
        className={`flex flex-col h-full transition-transform duration-500 ${
          open ? 'translate-y-0' : '-translate-y-8'
        }`}
        style={{ transitionTimingFunction: 'cubic-bezier(0.4,0,0.2,1)' }}
      >
        <div className="flex justify-end px-6 sm:px-8 pt-8 sm:pt-12">
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="w-10 h-10 rounded-full border border-white/30 hover:border-white flex items-center justify-center text-white transition-colors duration-300"
          >
            <X size={18} />
          </button>
        </div>

        <nav className="flex-1 flex flex-col justify-center px-8 sm:px-12">
          {NAV_LINKS.map((label, i) => (
            <a
              key={label}
              href="#"
              onClick={onClose}
              className={`py-3 text-2xl sm:text-3xl font-light tracking-wide uppercase transition-colors duration-300 ${
                i === 0 ? 'text-white' : 'text-white/60 hover:text-white'
              }`}
              style={{
                opacity: open ? 1 : 0,
                transform: open ? 'translateY(0)' : 'translateY(20px)',
                transition: `opacity 0.6s ${EASE} ${i * 60}ms, transform 0.6s ${EASE} ${i * 60}ms, color 0.3s`,
              }}
            >
              {label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-8 px-8 sm:px-12 pb-10 text-xs tracking-[0.2em] uppercase text-white/60">
          <span>News</span>
          <span>Contact</span>
        </div>
      </div>
    </div>
  );
}

function Navbar({ isLight }: { isLight: boolean }) {
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
        className="absolute top-0 left-0 right-0 z-50 pointer-events-auto px-6 sm:px-8 md:px-12 pt-8 sm:pt-12 pb-6 flex items-center justify-between transition-colors duration-500"
        style={{ color }}
      >
        {/* Desktop links */}
        <nav className="hidden lg:flex items-center gap-8 xl:gap-10">
          {NAV_LINKS.map((label, i) => (
            <a
              key={label}
              href="#"
              className="relative text-xs tracking-[0.15em] uppercase font-medium hover:opacity-70"
              style={navEntrance(mounted, i * 80 + 100)}
            >
              {label}
              {i === 0 && <span className="absolute left-0 -bottom-3 w-full h-[2px] bg-current" />}
            </a>
          ))}
        </nav>

        {/* Mobile hamburger */}
        <button
          type="button"
          onClick={() => setMenuOpen(true)}
          aria-label="Open menu"
          className="lg:hidden flex flex-col gap-[5px]"
          style={navEntrance(mounted, 100)}
        >
          <span className="block w-6 h-[2px] transition-colors duration-500" style={{ backgroundColor: color }} />
          <span className="block w-6 h-[2px] transition-colors duration-500" style={{ backgroundColor: color }} />
          <span className="block w-4 h-[2px] transition-colors duration-500" style={{ backgroundColor: color }} />
        </button>

        {/* Right cluster */}
        <div className="hidden sm:flex items-center gap-8" style={navEntrance(mounted, 500)}>
          <a href="#" className="flex items-center gap-2 text-xs tracking-[0.2em] uppercase font-medium hover:opacity-70">
            News
            <span
              className="w-5 h-5 rounded-full flex items-center justify-center transition-colors duration-500"
              style={{ backgroundColor: color, color: inverse }}
            >
              <Info size={10} />
            </span>
          </a>
          <span className="hidden lg:inline text-xs tracking-[0.2em] uppercase font-medium">Menu</span>
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            className="lg:hidden text-xs tracking-[0.2em] uppercase font-medium hover:opacity-70"
          >
            Menu
          </button>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}

export default function App() {
  const { containerRef, videoRef, canvasRef, scrollProgress: p, canvasLive } = useVideoScrub(VIDEO_SRC);

  const s1Opacity = p < 0.2 ? 1 : Math.max(0, 1 - (p - 0.2) / 0.08);
  const s2Opacity =
    p < 0.32 ? 0 : p < 0.4 ? (p - 0.32) / 0.08 : p < 0.55 ? 1 : Math.max(0, 1 - (p - 0.55) / 0.08);
  const s3Opacity = p < 0.67 ? 0 : p < 0.75 ? (p - 0.67) / 0.08 : 1;

  const s1Visible = s1Opacity > 0.3;
  const s2Visible = s2Opacity > 0.3;
  const s3Visible = s3Opacity > 0.3;

  const sectionStyle = (opacity: number): CSSProperties => ({
    opacity,
    transition: 'opacity 0.1s ease-out',
  });

  return (
    <div ref={containerRef} className="relative h-[500vh]">
      <div className="sticky top-0 w-full h-screen overflow-hidden">
        <video
          ref={videoRef}
          src={VIDEO_SRC}
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <canvas
          ref={canvasRef}
          width={1920}
          height={1080}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
            canvasLive ? 'opacity-100' : 'opacity-0'
          }`}
        />

        <div className="absolute inset-0 pointer-events-none">
          <Navbar isLight={p > 0.55} />

          {/* Section 1 */}
          <section
            className="absolute inset-0 flex flex-col justify-center px-6 sm:px-8 md:px-20 lg:px-32"
            style={sectionStyle(s1Opacity)}
          >
            <Stagger visible={s1Visible} delay={0}>
              <h1
                className="font-light uppercase leading-[1.2]"
                style={{ fontSize: 'clamp(2rem,5vw,5rem)', color: DARK }}
              >
                Advancing resources for a cleaner future
              </h1>
            </Stagger>
            <Stagger visible={s1Visible} delay={150} className="mt-6">
              <p className="text-sm tracking-[0.3em] uppercase" style={{ color: `${DARK}90` }}>
                Sustainable power with purpose
              </p>
            </Stagger>
            <Stagger visible={s1Visible} delay={300} className="absolute bottom-12 right-6 sm:right-8 md:right-12">
              <button
                type="button"
                aria-label="Next"
                className={`w-12 h-12 rounded-full border flex items-center justify-center hover:opacity-70 transition-opacity ${
                  s1Visible ? 'pointer-events-auto' : ''
                }`}
                style={{ borderColor: `${DARK}50`, color: DARK }}
              >
                <ArrowRight size={18} />
              </button>
            </Stagger>
          </section>

          {/* Section 2 */}
          <section
            className="absolute inset-0 flex items-center justify-center px-6 sm:px-8"
            style={sectionStyle(s2Opacity)}
          >
            <Stagger visible={s2Visible} delay={0} className="max-w-[900px]">
              <h2
                className="font-extralight tracking-wide leading-[1.3] text-center uppercase"
                style={{ fontSize: 'clamp(1.5rem,4.5vw,4.5rem)', color: DARK }}
              >
                We build lasting partnerships with vision{' '}
                <span style={{ color: `${DARK}80` }}>and precision</span>{' '}
                <span style={{ color: `${DARK}50` }}>across every frontier</span>
              </h2>
            </Stagger>

            <div className="absolute bottom-16 right-6 sm:right-8 md:right-12 flex flex-col items-center gap-4">
              <Stagger visible={s2Visible} delay={200}>
                <button
                  type="button"
                  aria-label="Scroll down"
                  className={`w-12 h-12 rounded-full border flex items-center justify-center hover:opacity-70 transition-opacity ${
                    s2Visible ? 'pointer-events-auto' : ''
                  }`}
                  style={{ borderColor: `${DARK}40`, color: DARK }}
                >
                  <ArrowDown size={18} />
                </button>
              </Stagger>
              <Stagger visible={s2Visible} delay={350} className="mt-4">
                <div className="flex flex-col items-center gap-2">
                  <span className="block w-2 h-2 rounded-full" style={{ backgroundColor: DARK }} />
                  <span className="block w-1.5 h-1.5 rounded-full" style={{ backgroundColor: `${DARK}40` }} />
                  <span className="block w-1.5 h-1.5 rounded-full" style={{ backgroundColor: `${DARK}40` }} />
                </div>
              </Stagger>
              <Stagger visible={s2Visible} delay={500} className="mt-2">
                <button
                  type="button"
                  aria-label="Scroll up"
                  className={`w-10 h-10 rounded-full border flex items-center justify-center hover:opacity-70 transition-opacity ${
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
                <p className="text-white/60 text-lg tracking-wide mb-4">Halder | Nordvik</p>
              </Stagger>
              <Stagger visible={s3Visible} delay={150}>
                <h2
                  className="font-light text-white leading-[1.2] uppercase tracking-wide mb-8"
                  style={{ fontSize: 'clamp(2rem,4vw,4rem)' }}
                >
                  Fueling ambition,
                  <br />
                  shaping tomorrow.
                </h2>
              </Stagger>
              <Stagger visible={s3Visible} delay={300}>
                <div className="flex items-center gap-4">
                  <span className="text-sm tracking-[0.3em] text-white/80 uppercase">Contact Nordvik</span>
                  <button
                    type="button"
                    aria-label="Contact Nordvik"
                    className={`w-10 h-10 rounded-full bg-white flex items-center justify-center text-gray-800 hover:scale-110 transition-transform duration-300 ${
                      s3Visible ? 'pointer-events-auto' : ''
                    }`}
                  >
                    <ArrowRight size={16} />
                  </button>
                </div>
              </Stagger>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
