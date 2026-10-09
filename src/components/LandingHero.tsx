import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowRight, Check } from 'lucide-react';
import { whatsappLink } from '@/config/site';
import { offer } from '@/data/offers';
import { trackConversion } from '@/lib/analytics';

/**
 * Self-hosted, scrub-optimised encode of the hero clip (1920px, every frame a keyframe, no audio, faststart)
 * so mouse scrubbing can seek to any frame instantly. Original 4K source:
 * https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260601_110537_3a579fa0-7bbc-4d94-9d25-0e816c7840f5.mp4
 */
const VIDEO_SRC = '/videos/hero.mp4';

const HEADLINE = "let's get your\nbusiness registered.";

/** Options for the multi-select pills — each maps to Regpro services. */
const SERVICE_OPTIONS = ['Company Registration', 'GST', 'MSME / Udyam', 'Trademark', 'Other'];

/** Types `text` out character by character after `startDelay` ms. */
function useTypewriter(text: string, speed = 38, startDelay = 600) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    setDisplayed('');
    setDone(false);
    let i = 0;
    let interval: ReturnType<typeof setInterval> | undefined;
    const timeout = setTimeout(() => {
      interval = setInterval(() => {
        i += 1;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) {
          clearInterval(interval);
          setDone(true);
        }
      }, speed);
    }, startDelay);
    return () => {
      clearTimeout(timeout);
      if (interval) clearInterval(interval);
    };
  }, [text, speed, startDelay]);

  return { displayed, done };
}

/** Desktop: scrub the video with horizontal mouse movement. Below 1024px: just autoplay. */
function useVideoPlayback() {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Desktop mouse scrubbing
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    let prevX: number | null = null;
    let targetTime = 0;
    let seeking = false;

    const onSeeked = () => {
      // Catch up with any movement that happened while the last seek was in flight.
      if (Math.abs(video.currentTime - targetTime) > 0.01) video.currentTime = targetTime;
      else seeking = false;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (window.innerWidth < 1024) return;
      const duration = video.duration;
      if (prevX === null || !Number.isFinite(duration) || duration <= 0) {
        prevX = e.clientX;
        return;
      }
      const delta = e.clientX - prevX;
      prevX = e.clientX;
      targetTime = Math.min(duration, Math.max(0, targetTime + (delta / window.innerWidth) * 0.8 * duration));
      if (!seeking) {
        seeking = true;
        video.currentTime = targetTime;
      }
    };

    video.addEventListener('seeked', onSeeked);
    window.addEventListener('mousemove', onMouseMove);
    return () => {
      video.removeEventListener('seeked', onSeeked);
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  // Mobile / tablet autoplay
  useEffect(() => {
    const video = videoRef.current;
    if (!video || window.innerWidth >= 1024) return;
    video.autoplay = true;
    video.play().catch(() => {});
  }, []);

  return videoRef;
}

export function LandingHero() {
  const videoRef = useVideoPlayback();
  const { displayed, done } = useTypewriter(HEADLINE);
  const [services, setServices] = useState<string[]>([]);

  const toggle = (s: string) => setServices((prev) => (prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]));
  const enquiry = whatsappLink(`Hi Regpro, I'd like to enquire about: ${services.join(', ')}.`);

  return (
    <section className="relative flex flex-col overflow-x-hidden bg-white text-neutral-900 lg:block lg:min-h-screen">
      {/* Background video */}
      <div className="pointer-events-none relative order-last aspect-square w-full overflow-hidden bg-neutral-50 md:aspect-video lg:absolute lg:inset-0 lg:z-0 lg:order-none lg:aspect-auto lg:h-full lg:bg-transparent">
        <video
          ref={videoRef}
          src={VIDEO_SRC}
          muted
          playsInline
          preload="auto"
          className="h-full w-full object-cover object-right lg:object-right-bottom"
        />
        {/* Desktop only: soften the clip behind the copy and melt its lavender backdrop into the white page below */}
        <div className="absolute inset-0 hidden bg-[linear-gradient(90deg,rgba(255,255,255,0.85)_0%,rgba(255,255,255,0.4)_32%,rgba(255,255,255,0)_55%)] lg:block" />
        <div className="absolute inset-x-0 bottom-0 hidden h-[38%] bg-[linear-gradient(180deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0.08)_30%,rgba(255,255,255,0.35)_55%,rgba(255,255,255,0.75)_78%,#fff_100%)] lg:block" />
      </div>

      {/* Content */}
      <div className="relative z-10 order-first flex w-full flex-col bg-white pb-8 lg:order-none lg:min-h-screen lg:bg-transparent lg:pb-0">
        <div id="spade-hero" className="mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-6 pb-12 pt-28 lg:py-12">
          {offer.active && (
            <motion.a
              href={whatsappLink(offer.message)}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8 inline-flex w-fit items-center gap-2 rounded-full border border-mist-200 bg-white/80 px-4 py-1.5 text-sm text-muted transition-colors hover:border-gold-400"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-gold-500" />
              {offer.text}
            </motion.a>
          )}

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="mb-8 w-full select-none whitespace-pre-wrap text-5xl font-normal leading-[1.08] tracking-tight text-black md:text-6xl lg:text-[76px]">
              <span className="sr-only">Let&rsquo;s get your business registered — Regpro</span>
              <span aria-hidden="true">
                {displayed}
                {!done && <span className="ml-[2px] inline-block h-[1.1em] w-[2px] animate-blink bg-black align-middle" />}
              </span>
            </h1>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
            <p className="mb-14 max-w-2xl text-lg font-normal leading-relaxed text-muted md:text-xl">
              Company registration, GST, MSME, trademark &amp; compliance — <br className="hidden sm:block" />
              tell us what you need and our experts will get back to you as soon as possible.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="max-w-2xl">
            <h2 className="mb-2 text-2xl font-medium tracking-tight">What do you need help with?</h2>
            <p className="mb-8 text-subtle opacity-85">Select all that apply</p>

            <div className="flex flex-wrap gap-3">
              {SERVICE_OPTIONS.map((s) => {
                const active = services.includes(s);
                return (
                  <motion.button
                    key={s}
                    type="button"
                    onClick={() => toggle(s)}
                    whileTap={{ scale: 0.96 }}
                    aria-pressed={active}
                    className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-[15px] transition-colors duration-200 ${
                      active
                        ? 'transform bg-navy-800 text-white shadow-md shadow-navy-950/10'
                        : 'border border-mist-200 bg-white text-navy-800 hover:bg-mist-200/55'
                    }`}
                  >
                    <AnimatePresence initial={false}>
                      {active && (
                        <motion.span
                          initial={{ scale: 0, width: 0, opacity: 0 }}
                          animate={{ scale: 1, width: 'auto', opacity: 1 }}
                          exit={{ scale: 0, width: 0, opacity: 0 }}
                          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                          className="flex"
                        >
                          <Check className="h-4 w-4 text-gold-400" strokeWidth={2.5} />
                        </motion.span>
                      )}
                    </AnimatePresence>
                    {s}
                  </motion.button>
                );
              })}
            </div>

            <div className="mt-6 min-h-[64px]">
              <AnimatePresence mode="wait">
                {services.length === 0 ? (
                  <motion.p
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.5 }}
                    exit={{ opacity: 0 }}
                    className="text-xs italic text-muted"
                  >
                    Please click to select services above.
                  </motion.p>
                ) : (
                  <motion.div
                    key="selected"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 28 }}
                    className="overflow-hidden"
                  >
                    <div className="flex flex-col gap-3 rounded-2xl border border-mist-200 bg-mist-50 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                      <p className="text-sm text-muted">
                        Ready to enquire about: <span className="text-navy-800">{services.join(', ')}</span>
                      </p>
                      <a
                        href={enquiry}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => trackConversion('contact', 'whatsapp:hero-pills')}
                        className="group inline-flex shrink-0 items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-gold-700"
                      >
                        Let&rsquo;s go
                        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                      </a>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
