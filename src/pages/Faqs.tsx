import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import { Seo, breadcrumbLd, faqLd } from '@/lib/seo';
import { faqGroups, generalFaqs, type Faq } from '@/data/faqs';
import { categories, servicesByCategory } from '@/data/services';
import { PageHero } from '@/components/PageHero';
import { Container, WhatsAppButton, CallButton } from '@/components/ui';
import { Reveal } from '@/components/Reveal';
import { FaqAccordion } from '@/components/FaqAccordion';

const serviceGroups = categories.map((c) => ({
  id: c.id,
  title: c.title,
  faqs: servicesByCategory(c.id).flatMap((s) => s.faqs.slice(0, 2)),
}));

export default function Faqs() {
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'FAQs', path: '/faqs' },
  ];
  const groups = [...faqGroups, ...serviceGroups];
  const [active, setActive] = useState<string>('all');
  const [q, setQ] = useState('');

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    const match = (f: Faq) => !term || f.q.toLowerCase().includes(term) || f.a.toLowerCase().includes(term);
    return groups.filter((g) => active === 'all' || g.id === active).map((g) => ({ ...g, faqs: g.faqs.filter(match) })).filter((g) => g.faqs.length);
  }, [q, active]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <Seo
        title="Frequently Asked Questions"
        description="Answers to common questions about business registration, documents, fees, timelines and Regpro’s assistance process."
        path="/faqs"
        jsonLd={[faqLd(generalFaqs), breadcrumbLd(crumbs)]}
      />
      <PageHero
        eyebrow="FAQs"
        title="Frequently Asked Questions"
        highlight={['Questions']}
        text="Find quick answers about registrations, documents, fees and timelines."
        crumbs={crumbs}
      >
        <label className="relative mt-8 block max-w-xl">
          <span className="sr-only">Search FAQs</span>
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-subtle" />
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search questions…"
            className="w-full rounded-lg border border-line bg-white py-3.5 pl-11 pr-4 text-[15px] outline-none transition focus:border-forest-800 focus:ring-4 focus:ring-forest-800/10"
          />
        </label>
      </PageHero>

      <Container className="grid gap-12 py-14 sm:py-20 lg:grid-cols-[240px_1fr]">
        <nav aria-label="FAQ categories" className="lg:sticky lg:top-32 lg:self-start">
          <ul className="flex gap-2 overflow-x-auto pb-1 lg:flex-col lg:gap-1 lg:overflow-visible">
            {[{ id: 'all', title: 'All questions' }, ...groups].map((g) => (
              <li key={g.id}>
                <button
                  type="button"
                  onClick={() => setActive(g.id)}
                  aria-pressed={active === g.id}
                  className={`w-full whitespace-nowrap rounded-md px-4 py-2.5 text-left text-sm transition-colors ${
                    active === g.id ? 'bg-forest-800 text-white' : 'text-ink/75 hover:bg-white hover:text-forest-800'
                  }`}
                >
                  {g.title}
                </button>
              </li>
            ))}
          </ul>
        </nav>
        <div className="min-w-0 space-y-12">
          {filtered.length === 0 && (
            <p className="rounded-xl border border-line bg-white p-6 text-muted">
              No questions match “{q}”. Try another word, or <Link to="/contact" className="text-forest-800 underline">ask us directly</Link>.
            </p>
          )}
          {filtered.map((g) => (
            <section key={g.id} aria-labelledby={`faq-${g.id}`}>
              <h2 id={`faq-${g.id}`} className="mb-5 font-display text-2xl text-forest-800">
                {g.title}
              </h2>
              <FaqAccordion key={`${g.id}-${q}`} faqs={g.faqs} defaultOpen={null} />
            </section>
          ))}
          <Reveal className="relative overflow-hidden rounded-2xl bg-forest-900 p-8 text-white sm:p-10">
            <img src="/assets/cta-architecture.webp" alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-40" />
            <div className="relative">
              <p className="font-display text-2xl">Still have a question?</p>
              <p className="mt-2 text-white/70">Talk to our team for guidance on your specific situation.</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <WhatsAppButton label="WhatsApp Now" source="faqs" />
                <CallButton variant="light" source="faqs" />
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </>
  );
}
