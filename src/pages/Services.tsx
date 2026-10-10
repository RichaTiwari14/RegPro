import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Seo, breadcrumbLd } from '@/lib/seo';
import { categories, services, servicesByCategory, type CategoryId } from '@/data/services';
import { PageHero } from '@/components/PageHero';
import { Container, FeeNote, WhatsAppButton, CallButton } from '@/components/ui';
import { ServiceCard } from '@/components/ServiceCard';
import { CtaBanner } from '@/components/CtaBanner';

type Filter = 'all' | CategoryId;

export default function Services() {
  const [filter, setFilter] = useState<Filter>('all');
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
  ];
  const list = filter === 'all' ? services : servicesByCategory(filter);
  const tabs: { id: Filter; label: string }[] = [{ id: 'all', label: 'All Services' }, ...categories.map((c) => ({ id: c.id as Filter, label: c.title }))];

  return (
    <>
      <Seo
        title="Business Registration & Compliance Services"
        description="Explore Regpro services — Pvt Ltd, LLP, OPC, GST, Udyam/MSME, DPIIT, IEC, FSSAI, Shop & Establishment, DSC, PAN/TAN and trademark registration with transparent pricing."
        path="/services"
        jsonLd={[breadcrumbLd(crumbs)]}
      />
      <PageHero
        eyebrow="Our services"
        title="Every registration your business needs"
        highlight={['business', 'needs']}
        text="Choose a service to see who needs it, the documents required, the process, timelines and pricing."
        crumbs={crumbs}
        image="/images/tower.jpg"
        scribble={'Simplify Today,\nGrow Tomorrow'}
      >
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <WhatsAppButton size="lg" label="Ask an expert" source="services-hero" />
          <CallButton size="lg" source="services-hero" />
        </div>
      </PageHero>

      <section className="bg-white py-16 sm:py-20">
        <Container>
          <div className="sticky top-[84px] z-20 -mx-1 flex gap-2 overflow-x-auto rounded-full bg-white/90 p-1.5 shadow-[0_10px_30px_-18px_rgba(11,42,91,0.35)] ring-1 ring-navy-800/5 backdrop-blur sm:mx-auto sm:w-fit">
            {tabs.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setFilter(t.id)}
                className={`relative whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-semibold transition-colors ${filter === t.id ? 'text-white' : 'text-navy-800/70 hover:text-navy-800'}`}
              >
                {filter === t.id && (
                  <motion.span layoutId="svc-tab" className="absolute inset-0 rounded-full bg-navy-800" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />
                )}
                <span className="relative">{t.label}</span>
              </button>
            ))}
          </div>

          <motion.div layout className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {list.map((s, i) => (
                <motion.div
                  key={s.slug}
                  layout
                  initial={{ opacity: 0, y: 30, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1, transition: { delay: i * 0.04, duration: 0.6, ease: [0.16, 1, 0.3, 1] } }}
                  exit={{ opacity: 0, scale: 0.94, transition: { duration: 0.2 } }}
                >
                  <ServiceCard service={s} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
          <FeeNote className="mt-10 text-center" />
        </Container>
      </section>
      <CtaBanner />
    </>
  );
}
