import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Search } from 'lucide-react';
import { Seo, breadcrumbLd } from '@/lib/seo';
import { articleCategories, visibleArticles } from '@/data/resources';
import { PageHero } from '@/components/PageHero';
import { Container } from '@/components/ui';
import { ArticleCard } from '@/components/ArticleCard';
import { CtaBanner } from '@/components/CtaBanner';

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
      <PageHero
        eyebrow="Resources"
        title="Resources & Articles"
        highlight={['Articles']}
        text="Guides and insights to help you stay informed about business registration and compliance in India."
        crumbs={crumbs}
      >
        <label className="relative mt-8 block max-w-xl">
          <span className="sr-only">Search articles</span>
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-subtle" />
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search articles…"
            className="w-full rounded-lg border border-line bg-white py-3.5 pl-11 pr-4 text-[15px] outline-none transition focus:border-navy-800 focus:ring-4 focus:ring-navy-800/10"
          />
        </label>
      </PageHero>

      <Container className="py-14 sm:py-20">
        <div className="flex gap-2 overflow-x-auto pb-1" role="group" aria-label="Filter by category">
          {['All', ...used].map((c) => (
            <button
              key={c}
              type="button"
              aria-pressed={cat === c}
              onClick={() => setCat(c)}
              className={`relative whitespace-nowrap rounded-full border px-4 py-2 text-sm transition-colors ${cat === c ? 'border-navy-800 text-white' : 'border-line bg-white text-ink/75 hover:border-navy-800/40'}`}
            >
              {cat === c && <motion.span layoutId="res-tab" className="absolute inset-0 rounded-full bg-navy-800" transition={{ type: 'spring', stiffness: 400, damping: 34 }} />}
              <span className="relative">{c}</span>
            </button>
          ))}
        </div>

        <motion.div layout className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {list.map((a, i) => (
              <motion.div
                key={a.slug}
                layout
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0, transition: { delay: i * 0.05, duration: 0.6, ease: [0.22, 1, 0.36, 1] } }}
                exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.2 } }}
              >
                <ArticleCard article={a} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        {list.length === 0 && <p className="mt-10 rounded-xl border border-line bg-white p-6 text-muted">No articles match your search.</p>}
        <p className="mt-10 text-xs leading-relaxed text-subtle">
          Articles are general information, not legal or tax advice. Rules change — confirm current requirements with a professional before acting.
        </p>
      </Container>
      <CtaBanner />
    </>
  );
}
