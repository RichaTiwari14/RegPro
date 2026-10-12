import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowRight, MailCheck, Search } from 'lucide-react';
import { Seo, breadcrumbLd } from '@/lib/seo';
import { articleCategories, visibleArticles } from '@/data/resources';
import { whatsappLink } from '@/config/site';
import { Container } from '@/components/ui';
import { MaskedWords, Reveal } from '@/components/Reveal';
import { ArticleCard } from '@/components/ArticleCard';
import { Blob } from '@/components/Shapes';
import { trackEvent } from '@/lib/analytics';

const EASE = [0.22, 1, 0.36, 1] as const;

/** Thin concentric arcs used as a quiet backdrop (reference). */
function Arcs({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 400" className={`pointer-events-none ${className}`} fill="none" aria-hidden="true">
      {[190, 150].map((r, i) => (
        <motion.circle
          key={r}
          cx="200"
          cy="200"
          r={r}
          stroke="#BFCDB1"
          strokeWidth="1"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2.2, delay: 0.3 + i * 0.3, ease: 'easeInOut' }}
        />
      ))}
    </svg>
  );
}

export default function Resources() {
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Resources', path: '/resources' },
  ];
  const [cat, setCat] = useState<string>('All');
  const [q, setQ] = useState('');
  const used = articleCategories.filter((c) => visibleArticles.some((a) => a.category === c));

  const list = useMemo(() => {
    const t = q.trim().toLowerCase();
    return visibleArticles.filter((a) => (cat === 'All' || a.category === cat) && (!t || `${a.title} ${a.excerpt}`.toLowerCase().includes(t)));
  }, [cat, q]);

  return (
    <>
      <Seo
        title="Resources & Articles — Registration and Compliance Guides"
        description="Guides and articles on business registration, GST, MSME, Startup India, licences and compliance in India."
        path="/resources"
        jsonLd={[breadcrumbLd(crumbs)]}
      />

      {/* ───────── Hero ───────── */}
      <section className="relative overflow-hidden bg-ivory">
        <Arcs className="absolute -left-40 top-6 hidden h-[420px] w-[420px] md:block" />
        <motion.div
          className="absolute inset-y-0 right-0 hidden w-[58%] lg:block"
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, ease: EASE }}
        >
          <img src="/assets/resources/resources-hero.webp" alt="" className="h-full w-full object-cover object-center" />
          <div className="absolute inset-0 bg-gradient-to-r from-ivory via-ivory/50 to-transparent" />
        </motion.div>
        <Container className="relative py-14 sm:py-20 lg:py-24">
          <div className="max-w-xl">
            <motion.p className="eyebrow" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, ease: EASE }}>
              Resources
            </motion.p>
            <h1 className="heading mt-5" style={{ fontSize: 'clamp(2.3rem,4.6vw,3.6rem)' }}>
              <MaskedWords text="Guides, insights and updates for your business" delay={100} />
            </h1>
            <motion.p
              className="mt-5 max-w-lg text-base leading-relaxed text-muted sm:text-[17px]"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.35, ease: EASE }}
            >
              Practical knowledge on registration, compliance, taxation and government schemes — written for founders and business owners.
            </motion.p>
          </div>
        </Container>
        <img src="/assets/resources/resources-hero.webp" alt="" className="block aspect-[16/8] w-full object-cover lg:hidden" />
      </section>

      {/* ───────── Filters + grid ───────── */}
      <section className="relative py-10 sm:py-14">
        <Container>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 sm:mx-0 sm:flex-wrap sm:px-0" role="group" aria-label="Filter by category">
              {['All', ...used].map((c) => (
                <button
                  key={c}
                  type="button"
                  aria-pressed={cat === c}
                  onClick={() => setCat(c)}
                  className={`relative whitespace-nowrap rounded-full border px-5 py-2.5 text-[13.5px] font-medium transition-colors ${
                    cat === c ? 'border-forest-800 text-white' : 'border-line bg-white text-ink/80 hover:border-forest-800/40'
                  }`}
                >
                  {cat === c && <motion.span layoutId="res-tab" className="absolute inset-0 rounded-full bg-forest-800" transition={{ type: 'spring', stiffness: 400, damping: 34 }} />}
                  <span className="relative">{c === 'All' ? 'All Articles' : c}</span>
                </button>
              ))}
            </div>
            <label className="relative block w-full lg:w-[260px]">
              <span className="sr-only">Search articles</span>
              <input
                type="search"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search articles..."
                className="w-full rounded-full border border-line bg-white py-2.5 pl-5 pr-11 text-[14px] outline-none transition focus:border-forest-800 focus:ring-4 focus:ring-forest-800/10"
              />
              <Search className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-subtle" />
            </label>
          </div>

          <div className="mt-8 grid items-start gap-6 lg:grid-cols-[1fr_250px] xl:grid-cols-[1fr_270px]">
            <div>
              <motion.div layout className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                <AnimatePresence mode="popLayout">
                  {list.map((a, i) => (
                    <motion.div
                      key={a.slug}
                      layout
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0, transition: { delay: i * 0.05, duration: 0.6, ease: EASE } }}
                      exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.2 } }}
                    >
                      <ArticleCard article={a} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
              {list.length === 0 && <p className="rounded-xl border border-line bg-white p-6 text-muted">No articles match your search.</p>}
              <p className="mt-8 text-xs leading-relaxed text-subtle">
                Articles are general information, not legal or tax advice. Rules change — confirm current requirements with a professional before acting.
              </p>
            </div>

            <aside className="grid gap-5 sm:grid-cols-2 lg:sticky lg:top-28 lg:grid-cols-1">
              <Reveal className="relative overflow-hidden rounded-2xl bg-sage-100 p-6 ring-1 ring-sage-200/70">
                <Blob variant="b" color="#D6DFCB" className="absolute -right-16 -top-16 h-40 w-40" />
                <div className="relative">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">Stay updated</p>
                  <h2 className="mt-3 font-display text-[22px] font-semibold leading-snug text-forest-900">Get the latest compliance updates on WhatsApp.</h2>
                  <p className="mt-2.5 text-[13px] leading-relaxed text-muted">Simple, no spam. Only important updates for business owners.</p>
                  <span className="mx-auto mt-6 flex h-16 w-16 items-center justify-center rounded-full bg-white text-forest-800 shadow-card">
                    <MailCheck className="h-7 w-7" />
                  </span>
                  <a
                    href={whatsappLink('Hi Regpro, please send me important compliance updates.')}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackEvent('whatsapp_click', { label: 'resources-updates' })}
                    className="btn-primary mt-6 w-full"
                  >
                    Subscribe Now <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </Reveal>
              <Reveal delay={100} className="relative overflow-hidden rounded-2xl bg-sage-100 p-6 ring-1 ring-sage-200/70">
                <Blob variant="a" color="#D6DFCB" className="absolute -right-14 -top-14 h-36 w-36" />
                <div className="relative">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">Need help?</p>
                  <h2 className="mt-3 font-display text-[22px] font-semibold leading-snug text-forest-900">Not sure what applies to your business?</h2>
                  <p className="mt-2.5 text-[13px] leading-relaxed text-muted">Talk to our experts and get clear guidance for your specific case.</p>
                  <Link to="/contact#enquiry" className="btn-primary mt-6 w-full">
                    Get a Free Consultation <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </Reveal>
            </aside>
          </div>
        </Container>
      </section>
    </>
  );
}
