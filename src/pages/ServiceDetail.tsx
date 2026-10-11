import { useEffect } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { motion } from 'motion/react';
import { AlertCircle, CheckCircle2, Clock, FileText, Info, Sparkles, Users } from 'lucide-react';
import { Seo, faqLd, breadcrumbLd } from '@/lib/seo';
import { site } from '@/config/site';
import { getService, legacySlugs, services, categories, formatPrice } from '@/data/services';
import { PageHero } from '@/components/PageHero';
import { Container, SectionHeading, WhatsAppButton, CallButton, FeeNote } from '@/components/ui';
import { Reveal } from '@/components/Reveal';
import { EnquiryForm } from '@/components/forms/EnquiryForm';
import { ProcessSteps } from '@/components/services/ProcessSteps';
import { FaqAccordion } from '@/components/FaqAccordion';
import { ServiceTile } from '@/components/services/ServiceCard';
import { CtaBanner } from '@/components/CtaBanner';
import { trackEvent } from '@/lib/analytics';
import NotFound from '@/pages/NotFound';

const sections = [
  ['who-needs', 'Who needs it'],
  ['eligibility', 'Eligibility'],
  ['benefits', 'Benefits'],
  ['documents', 'Documents'],
  ['process', 'Process'],
  ['pricing', 'Pricing'],
  ['timeline', 'Timeline'],
  ['faqs', 'FAQs'],
] as const;

const EASE = [0.22, 1, 0.36, 1] as const;

export default function ServiceDetail() {
  const { slug = '' } = useParams();
  const service = getService(slug);

  useEffect(() => {
    if (service) trackEvent('view_service', { service: service.slug });
  }, [service]);

  if (legacySlugs[slug]) return <Navigate to={`/services/${legacySlugs[slug]}`} replace />;
  if (!service) return <NotFound />;

  const category = categories.find((c) => c.id === service.category)!;
  const related = services.filter((s) => s.category === service.category && s.slug !== service.slug).slice(0, 4);
  const path = `/services/${service.slug}`;
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: service.shortName, path },
  ];
  const wa = `Hi Regpro, I would like help with ${service.name}.`;

  return (
    <>
      <Seo
        title={service.seoTitle}
        description={service.seoDescription}
        path={path}
        image={service.image}
        jsonLd={[
          {
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: service.name,
            description: service.seoDescription,
            serviceType: service.name,
            areaServed: 'IN',
            provider: { '@type': 'ProfessionalService', name: site.name, url: site.url },
            offers: { '@type': 'Offer', price: service.price, priceCurrency: 'INR', description: `Starting professional fee. ${service.govtFeeNote}` },
          },
          faqLd(service.faqs),
          breadcrumbLd(crumbs),
        ]}
      />

      <PageHero eyebrow={category.title} title={service.name} text={service.intro} crumbs={crumbs} image={service.image} imageAlt={service.imageAlt}>
        <div className="mt-8 flex flex-wrap items-stretch gap-4">
          <div className="rounded-lg border border-line bg-white px-5 py-3">
            <p className="text-[11px] uppercase tracking-[0.16em] text-subtle">Starting at</p>
            <p className="font-display text-2xl text-navy-800">
              {formatPrice(service.price)}
              <span className="align-super text-sm text-gold-500">*</span>
            </p>
          </div>
          <div className="rounded-lg border border-line bg-white px-5 py-3">
            <p className="text-[11px] uppercase tracking-[0.16em] text-subtle">Typical timeline</p>
            <p className="mt-1.5 flex items-center gap-2 text-sm text-navy-800">
              <Clock className="h-4 w-4 text-gold-500" /> {service.timeline}
            </p>
          </div>
        </div>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <WhatsAppButton size="lg" message={wa} source={`service-hero:${service.slug}`} />
          <CallButton size="lg" label="Call an expert" source={`service-hero:${service.slug}`} />
        </div>
      </PageHero>

      <div className="sticky top-[72px] z-30 border-b border-line bg-white/95 backdrop-blur lg:top-[84px]">
        <Container className="flex gap-1 overflow-x-auto py-1.5">
          {sections.map(([id, label]) => (
            <a key={id} href={`#${id}`} className="whitespace-nowrap rounded-md px-3 py-2.5 text-[13px] text-muted transition-colors hover:bg-ivory hover:text-navy-800">
              {label}
            </a>
          ))}
        </Container>
      </div>

      <Container className="grid gap-12 py-14 lg:grid-cols-[1fr_380px] lg:py-20">
        <div className="min-w-0 space-y-20">
          <section id="who-needs" className="scroll-mt-40">
            <SectionHeading eyebrow="Who needs it" title={`Is ${service.shortName} right for you?`} />
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {service.whoNeeds.map((w, i) => (
                <Reveal key={w} delay={i * 60}>
                  <div className="flex h-full items-start gap-3 rounded-xl border border-line bg-white p-4">
                    <Users className="mt-0.5 h-4 w-4 shrink-0 text-gold-500" />
                    <p className="text-sm leading-relaxed text-ink/80">{w}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>

          <section id="eligibility" className="scroll-mt-40">
            <SectionHeading eyebrow="Eligibility" title="Eligibility & key considerations" />
            <Reveal className="mt-8 rounded-xl border border-line bg-white p-6">
              <ul className="space-y-3.5">
                {service.considerations.map((c) => (
                  <li key={c} className="flex items-start gap-3 text-sm leading-relaxed text-ink/80">
                    <Info className="mt-0.5 h-4 w-4 shrink-0 text-navy-500" /> {c}
                  </li>
                ))}
              </ul>
              <p className="mt-5 border-t border-line pt-4 text-xs leading-relaxed text-subtle">
                General guidance only, based on current rules, which can change. We confirm requirements for your specific case before filing.
              </p>
            </Reveal>
          </section>

          <section id="benefits" className="scroll-mt-40">
            <SectionHeading eyebrow="Benefits" title={`Why get ${service.shortName}?`} />
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {service.benefits.map((b, i) => (
                <Reveal key={b.title} delay={i * 70}>
                  <div className="group h-full rounded-xl border border-line bg-white p-6 transition-colors duration-500 hover:border-gold-300">
                    <span className="font-display text-sm text-gold-500">0{i + 1}</span>
                    <h3 className="mt-2 font-display text-xl text-navy-800">{b.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{b.text}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>

          <section id="documents" className="scroll-mt-40">
            <SectionHeading eyebrow="Documents required" title="Keep these ready" />
            <Reveal className="mt-8">
              <ul className="divide-y divide-line overflow-hidden rounded-xl border border-line bg-white">
                {service.documents.map((d) => (
                  <li key={d} className="flex items-center gap-3 px-5 py-4 text-sm text-ink/80">
                    <FileText className="h-4 w-4 shrink-0 text-gold-500" /> {d}
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-xs text-subtle">Exact documents depend on your business type. We share a personalised checklist.</p>
            </Reveal>
          </section>

          <section id="process" className="scroll-mt-40">
            <SectionHeading eyebrow="Step-by-step" title="How the process works" />
            <div className="mt-10">
              <ProcessSteps steps={service.process} />
            </div>
          </section>

          <section id="pricing" className="scroll-mt-40">
            <Reveal>
              <div className="overflow-hidden rounded-2xl bg-navy-900 text-white">
                <div className="grid gap-8 p-7 sm:p-10 md:grid-cols-2">
                  <div>
                    <p className="eyebrow !text-gold-300">Pricing</p>
                    <h2 className="mt-3 font-display text-2xl">{service.name}</h2>
                    <p className="mt-6 text-xs uppercase tracking-[0.16em] text-white/55">Starting at</p>
                    <p className="font-display text-5xl">
                      {formatPrice(service.price)}
                      <span className="align-super text-lg text-gold-300">*</span>
                    </p>
                    {service.quote && <p className="mt-2 text-sm text-white/60">Final fee depends on your requirement — ask for a quote.</p>}
                    <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                      <WhatsAppButton label={service.quote ? 'Get a Quote' : 'Get Started'} message={wa} source={`service-pricing:${service.slug}`} />
                      <CallButton variant="light" source={`service-pricing:${service.slug}`} />
                    </div>
                  </div>
                  <div>
                    <p className="flex items-center gap-2 text-sm text-gold-300">
                      <Sparkles className="h-4 w-4" /> Included in our professional fee
                    </p>
                    <ul className="mt-4 space-y-2.5">
                      {service.includes.map((inc) => (
                        <li key={inc} className="flex items-start gap-2.5 text-sm text-white/80">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-gold-300" /> {inc}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="flex items-start gap-3 border-t border-white/10 bg-navy-950/40 px-7 py-5 text-xs leading-relaxed text-white/65 sm:px-10">
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-gold-300" />
                  <span>
                    * Regpro&rsquo;s professional service fee. {service.govtFeeNote} Third-party charges, where applicable, are extra and shared with you
                    before you proceed.
                  </span>
                </div>
              </div>
            </Reveal>
          </section>

          <section id="timeline" className="scroll-mt-40">
            <SectionHeading eyebrow="Processing time" title="What to expect" />
            <Reveal className="mt-8 grid gap-4 sm:grid-cols-[auto_1fr]">
              <div className="rounded-xl border border-line bg-white px-6 py-5">
                <p className="text-[11px] uppercase tracking-[0.16em] text-subtle">Typically</p>
                <p className="mt-1 font-display text-2xl text-navy-800">{service.timeline}</p>
              </div>
              <div className="rounded-xl border border-line bg-white px-6 py-5 text-sm leading-relaxed text-muted">
                {service.processingNote} Timelines are estimates and cannot be guaranteed; approval is decided by the relevant authority.
              </div>
            </Reveal>
          </section>

          <section id="faqs" className="scroll-mt-40">
            <SectionHeading eyebrow="FAQs" title={`${service.shortName} — frequently asked questions`} />
            <Reveal className="mt-8">
              <FaqAccordion faqs={service.faqs} />
            </Reveal>
          </section>
        </div>

        <aside className="lg:sticky lg:top-40 lg:self-start">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4, ease: EASE }}>
            <EnquiryForm compact defaultService={service.name} title="Get expert help" subtitle={`Free consultation for ${service.shortName}.`} />
            <FeeNote className="mt-4" />
          </motion.div>
        </aside>
      </Container>

      {related.length > 0 && (
        <section className="border-t border-line bg-white py-16 sm:py-20">
          <Container>
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <SectionHeading eyebrow="Related services" title={`More ${category.title.toLowerCase()}`} />
              <Link to="/services" className="link-arrow">
                View all services →
              </Link>
            </div>
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((s) => (
                <ServiceTile key={s.slug} service={s} />
              ))}
            </div>
          </Container>
        </section>
      )}

      <CtaBanner title={`Ready to Start Your ${service.shortName}?`} highlight={[]} message={wa} />
    </>
  );
}
