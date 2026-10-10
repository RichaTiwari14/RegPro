import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { BadgeCheck, Clock, Laptop, ReceiptIndianRupee } from 'lucide-react';
import { Seo, breadcrumbLd } from '@/lib/seo';
import { categories, services, servicesByCategory, formatPrice, type CategoryId } from '@/data/services';
import { PageHero } from '@/components/PageHero';
import { Container, FeeNote, WhatsAppButton } from '@/components/ui';
import { ServiceIcon } from '@/components/ServiceIcon';
import { CtaBanner } from '@/components/CtaBanner';

type Filter = 'all' | CategoryId;

export default function Pricing() {
  const [filter, setFilter] = useState<Filter>('all');
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Pricing', path: '/pricing' },
  ];
  const list = filter === 'all' ? services : servicesByCategory(filter);
  const tabs: { id: Filter; label: string }[] = [{ id: 'all', label: 'All' }, ...categories.map((c) => ({ id: c.id as Filter, label: c.title }))];

  return (
    <>
      <Seo
        title="Pricing — Business Registration & Compliance Fees"
        description="Transparent pricing for company registration, GST, MSME, DPIIT, FSSAI, IEC, trademark and more. Government fees, if applicable, are extra."
        path="/pricing"
        jsonLd={[breadcrumbLd(crumbs)]}
      />
      <PageHero
        eyebrow="Transparent pricing"
        title="Transparent Pricing, No Hidden Charges"
        highlight={['No', 'Hidden', 'Charges']}
        text="Our professional fees are shown upfront. Government or statutory fees, where applicable, are charged separately at actuals."
        crumbs={crumbs}
      >
        <div className="mt-9 flex flex-wrap gap-3">
          {[
            { icon: BadgeCheck, t: 'Fixed professional fee' },
            { icon: ReceiptIndianRupee, t: 'Govt. fees at actuals' },
            { icon: Laptop, t: '100% online' },
          ].map(({ icon: Icon, t }) => (
            <span key={t} className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-olive-800 shadow-sm ring-1 ring-olive-800/10">
              <Icon className="h-4 w-4 text-sage-600" /> {t}
            </span>
          ))}
        </div>
      </PageHero>

      <section className="bg-white py-16 sm:py-20">
        <Container>
          <div className="-mx-1 flex gap-2 overflow-x-auto rounded-full bg-cream p-1.5 ring-1 ring-olive-800/5 sm:mx-auto sm:w-fit">
            {tabs.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setFilter(t.id)}
                className={`relative whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-semibold transition-colors ${filter === t.id ? 'text-white' : 'text-olive-800/70 hover:text-olive-800'}`}
              >
                {filter === t.id && (
                  <motion.span layoutId="price-tab" className="absolute inset-0 rounded-full bg-olive-800" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />
                )}
                <span className="relative">{t.label}</span>
              </button>
            ))}
          </div>

          <motion.div layout className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {list.map((s, i) => (
                <motion.div
                  key={s.slug}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0, transition: { delay: i * 0.04, duration: 0.6, ease: [0.16, 1, 0.3, 1] } }}
                  exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                  whileHover={{ y: -6 }}
                  className="glass flex flex-col p-6"
                >
                  <div className="flex items-start justify-between gap-3">
                    <Link to={`/services/${s.slug}`} className="group flex items-center gap-3">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-olive-50 text-olive-800 transition-colors group-hover:bg-olive-800 group-hover:text-sage-400">
                        <ServiceIcon name={s.icon} className="h-5 w-5" />
                      </span>
                      <span className="font-display text-xl font-semibold leading-snug text-olive-800 group-hover:text-sage-700">{s.name}</span>
                    </Link>
                    {s.popular && (
                      <span className="shrink-0 rounded-full bg-sage-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-sage-700 ring-1 ring-sage-200">
                        Popular
                      </span>
                    )}
                  </div>
                  <div className="mt-6 flex items-end justify-between gap-3 border-t border-olive-800/10 pt-5">
                    <div>
                      <p className="label-cine text-subtle">Starting at</p>
                      <p className="font-display text-3xl font-semibold text-olive-800">
                        {formatPrice(s.price)}
                        <span className="align-super text-xs text-sage-600">*</span>
                      </p>
                      <p className="mt-1 flex items-center gap-1 text-xs text-subtle">
                        <Clock className="h-3 w-3" /> {s.timeline}
                      </p>
                    </div>
                    <WhatsAppButton label="Enquire" message={`Hi Regpro, I want to know more about ${s.name} pricing.`} source={`pricing-table:${s.slug}`} />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
          <FeeNote className="mt-10 text-center" />
        </Container>
      </section>
      <CtaBanner title="Need a custom package?" text="Starting multiple registrations together? Ask us for a bundled quote." />
    </>
  );
}
