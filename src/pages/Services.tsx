import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Seo, breadcrumbLd } from '@/lib/seo';
import { categories, servicesByCategory, type CategoryId } from '@/data/services';
import { PageHero } from '@/components/PageHero';
import { Container, FeeNote, WhatsAppButton } from '@/components/ui';
import { ServiceTile } from '@/components/services/ServiceCard';
import { Reveal } from '@/components/Reveal';
import { CtaBanner } from '@/components/CtaBanner';

type Filter = 'all' | CategoryId;

export default function Services() {
  const [filter, setFilter] = useState<Filter>('all');
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
  ];
  const tabs: { id: Filter; label: string }[] = [{ id: 'all', label: 'All Services' }, ...categories.map((c) => ({ id: c.id as Filter, label: c.title }))];
  const shown = filter === 'all' ? categories : categories.filter((c) => c.id === filter);

  return (
    <>
      <Seo
        title="Business Registration & Compliance Services in India"
        description="Explore Regpro services: Private Limited, LLP, OPC and partnership registration, GST, Udyam/MSME, DPIIT Startup India, IEC, FSSAI, Shop & Establishment, PAN/TAN, DSC and trademark registration."
        path="/services"
        image="/assets/company-registration.webp"
        jsonLd={[breadcrumbLd(crumbs)]}
      />
      <PageHero
        eyebrow="Our services"
        title="Complete Registration & Compliance Solutions"
        highlight={['Compliance', 'Solutions']}
        text="From business set-up to government registrations, we provide end-to-end assistance under one roof."
        crumbs={crumbs}
        image="/assets/company-registration.webp"
        imageAlt="A modern corporate building"
      />

      <section className="py-14 sm:py-20">
        <Container>
          <div className="sticky top-[76px] z-20 -mx-1 flex gap-1 overflow-x-auto rounded-lg border border-line bg-white/95 p-1.5 shadow-card backdrop-blur sm:mx-0 sm:w-fit lg:top-[96px]" role="tablist" aria-label="Service categories">
            {tabs.map((t) => (
              <button
                key={t.id}
                type="button"
                role="tab"
                aria-selected={filter === t.id}
                onClick={() => setFilter(t.id)}
                className={`relative whitespace-nowrap rounded-md px-4 py-2.5 text-sm transition-colors ${filter === t.id ? 'text-white' : 'text-ink/70 hover:text-navy-800'}`}
              >
                {filter === t.id && <motion.span layoutId="svc-tab" className="absolute inset-0 rounded-md bg-navy-800" transition={{ type: 'spring', stiffness: 400, damping: 34 }} />}
                <span className="relative">{t.label}</span>
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div key={filter} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}>
              {shown.map((c) => (
                <div key={c.id} id={c.id} className="mt-14 scroll-mt-40">
                  <div className="flex flex-col gap-2 border-b border-line pb-4 sm:flex-row sm:items-end sm:justify-between">
                    <h2 className="font-display text-2xl text-navy-800 sm:text-3xl">{c.title}</h2>
                    <p className="max-w-md text-sm text-muted">{c.description}</p>
                  </div>
                  <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    {servicesByCategory(c.id).map((s, i) => (
                      <motion.div key={s.slug} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.04 * i, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>
                        <ServiceTile service={s} />
                      </motion.div>
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
          <FeeNote className="mt-8" />

          <Reveal className="mt-14 flex flex-col items-start justify-between gap-5 rounded-xl border border-line bg-white p-7 sm:flex-row sm:items-center">
            <div>
              <p className="font-display text-xl text-navy-800">Need a custom solution?</p>
              <p className="mt-1 text-sm text-muted">Tell us about your business and we will suggest the right registrations.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link to="/contact#enquiry" className="btn-navy">
                Contact us <ArrowRight className="h-4 w-4" />
              </Link>
              <WhatsAppButton label="WhatsApp" source="services-custom" />
            </div>
          </Reveal>
        </Container>
      </section>
      <CtaBanner />
    </>
  );
}
