import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import { Seo, breadcrumbLd, faqLd } from '@/lib/seo';
import { categories, servicesByCategory, formatPrice } from '@/data/services';
import { faqGroups } from '@/data/faqs';
import { PageHero } from '@/components/PageHero';
import { Container, SectionHeading, FeeNote, WhatsAppButton } from '@/components/ui';
import { Reveal } from '@/components/Reveal';
import { FaqAccordion } from '@/components/FaqAccordion';
import { CtaBanner } from '@/components/CtaBanner';
import { trackEvent } from '@/lib/analytics';

const pricingFaqs = [
  ...faqGroups.find((g) => g.id === 'pricing')!.faqs,
  {
    q: 'Why is the price shown as “starting at”?',
    a: 'Some services vary with your business type, state, number of classes or licence type. We confirm the exact professional fee for your case before you proceed.',
  },
  {
    q: 'When do I pay government fees?',
    a: 'Government or statutory fees are paid at the time of filing on the official portal. We tell you the applicable amount in advance.',
  },
];

export default function Pricing() {
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Pricing', path: '/pricing' },
  ];
  useEffect(() => trackEvent('view_pricing', { page: 'pricing' }), []);

  return (
    <>
      <Seo
        title="Pricing — Business Registration & Compliance Fees"
        description="Transparent starting prices for company registration, GST, Udyam/MSME, DPIIT, FSSAI, IEC, trademark and more. Government and statutory fees are extra where applicable."
        path="/pricing"
        jsonLd={[breadcrumbLd(crumbs), faqLd(pricingFaqs)]}
      />
      <PageHero
        eyebrow="Pricing"
        title="Transparent Pricing, No Hidden Charges"
        highlight={['No', 'Hidden', 'Charges']}
        text="Simple starting prices for our professional services. Government or statutory fees, where applicable, are charged separately — and always shared upfront."
        crumbs={crumbs}
      >
        <div className="mt-8 flex flex-wrap gap-2">
          {categories.map((c) => (
            <a key={c.id} href={`#${c.id}`} className="rounded-full border border-line bg-white px-4 py-2 text-sm text-forest-800 transition-colors hover:border-sage-400">
              {c.title}
            </a>
          ))}
        </div>
      </PageHero>

      <Container className="space-y-16 py-14 sm:py-20">
        {categories.map((c) => (
          <section key={c.id} id={c.id} className="scroll-mt-28">
            <Reveal>
              <h2 className="font-display text-2xl text-forest-800 sm:text-3xl">{c.title} pricing</h2>
              <span className="clay-rule mt-3" />
            </Reveal>
            <motion.div
              className="mt-6 overflow-hidden rounded-xl border border-line bg-white shadow-card"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '0px 0px -10% 0px' }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <table className="w-full text-left text-sm">
                <caption className="sr-only">{c.title} — starting prices</caption>
                <thead className="hidden bg-ivory text-[11px] uppercase tracking-[0.16em] text-subtle md:table-header-group">
                  <tr>
                    <th scope="col" className="px-6 py-3 font-medium">Service</th>
                    <th scope="col" className="px-6 py-3 font-medium">What’s included</th>
                    <th scope="col" className="px-6 py-3 font-medium">Starting at</th>
                    <th scope="col" className="px-6 py-3 font-medium"><span className="sr-only">Action</span></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {servicesByCategory(c.id).map((s) => (
                    <tr key={s.slug} className="grid gap-3 px-5 py-5 transition-colors hover:bg-ivory/60 md:table-row md:p-0">
                      <th scope="row" className="font-normal md:px-6 md:py-5">
                        <Link to={`/services/${s.slug}`} className="font-display text-[17px] text-forest-800 hover:text-forest-600">
                          {s.name}
                        </Link>
                        <span className="mt-0.5 block text-xs text-subtle">{s.timeline}</span>
                      </th>
                      <td className="md:max-w-sm md:px-6 md:py-5">
                        <ul className="space-y-1">
                          {s.includes.slice(0, 3).map((inc) => (
                            <li key={inc} className="flex items-start gap-2 text-[13px] text-muted">
                              <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-forest-500" /> {inc}
                            </li>
                          ))}
                        </ul>
                      </td>
                      <td className="whitespace-nowrap md:px-6 md:py-5">
                        <span className="font-display text-xl text-forest-800">{formatPrice(s.price)}*</span>
                        {s.quote && <span className="block text-xs text-subtle">Varies — get a quote</span>}
                      </td>
                      <td className="md:px-6 md:py-5 md:text-right">
                        <div className="flex flex-wrap items-center gap-3 md:justify-end">
                          <Link to={`/services/${s.slug}`} className="link-arrow whitespace-nowrap">
                            Details <ArrowRight className="h-3.5 w-3.5" />
                          </Link>
                          {s.quote && (
                            <WhatsAppButton label="Get a Quote" message={`Hi Regpro, please share a quote for ${s.name}.`} source={`pricing-quote:${s.slug}`} className="!px-4 !py-2 !text-xs" />
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          </section>
        ))}
        <FeeNote />
      </Container>

      <section className="border-t border-line bg-white py-16 sm:py-20">
        <Container className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading eyebrow="Pricing FAQs" title="Questions about fees" text="Not sure what applies to you? Ask us for a quote — there is no obligation." />
          <Reveal>
            <FaqAccordion faqs={pricingFaqs} />
          </Reveal>
        </Container>
      </section>

      <CtaBanner title="Need a Quote for Your Business?" highlight={['Quote']} text="Starting several registrations together, or not sure what you need? Tell us and we will confirm the fee before you proceed." />
    </>
  );
}
