import { Link, useParams } from 'react-router-dom';
import { CheckCircle2, Clock, FileText, Sparkles, Users } from 'lucide-react';
import { Seo, faqLd, breadcrumbLd } from '@/lib/seo';
import { site } from '@/config/site';
import { getService, services, categories, formatPrice } from '@/data/services';
import { PageHero } from '@/components/PageHero';
import { Container, SectionHeading, WhatsAppButton, CallButton, FeeNote } from '@/components/ui';
import { Reveal } from '@/components/Reveal';
import { LeadForm } from '@/components/LeadForm';
import { ProcessSteps } from '@/components/ProcessSteps';
import { FaqList } from '@/components/FaqList';
import { ServiceCard } from '@/components/ServiceCard';
import { ServiceIcon } from '@/components/ServiceIcon';
import { CtaBanner } from '@/components/CtaBanner';
import NotFound from '@/pages/NotFound';

const sections = [
  ['overview', 'Overview'],
  ['who-needs', 'Who needs it'],
  ['benefits', 'Benefits'],
  ['documents', 'Documents'],
  ['process', 'Process'],
  ['pricing', 'Pricing'],
  ['faqs', 'FAQs'],
] as const;

export default function ServiceDetail() {
  const { slug = '' } = useParams();
  const service = getService(slug);
  if (!service) return <NotFound />;

  const category = categories.find((c) => c.id === service.category)!;
  const related = services.filter((s) => s.category === service.category && s.slug !== service.slug).slice(0, 3);
  const path = `/services/${service.slug}`;
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: service.shortName, path },
  ];
  const waMessage = `Hi Regpro, I'm interested in ${service.name}. Please share the details.`;

  return (
    <>
      <Seo
        title={service.seoTitle}
        description={service.seoDescription}
        path={path}
        jsonLd={[
          {
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: service.name,
            description: service.seoDescription,
            serviceType: service.name,
            areaServed: 'IN',
            provider: { '@type': 'ProfessionalService', name: site.name, url: site.url, telephone: site.phone },
            offers: { '@type': 'Offer', price: service.price, priceCurrency: 'INR', description: `Starting at ${formatPrice(service.price)}. ${site.feeNote}` },
          },
          faqLd(service.faqs),
          breadcrumbLd(crumbs),
        ]}
      />

      <PageHero eyebrow={category.title} title={service.name} text={service.intro} crumbs={crumbs}>
        <div className="hero-in mt-8 flex flex-wrap items-center gap-x-8 gap-y-4" style={{ animationDelay: '0.15s' }}>
          <div>
            <p className="label-cine text-white/50">Starting at</p>
            <p className="mt-1 text-4xl font-light text-white">
              {formatPrice(service.price)}
              <span className="align-super text-sm text-gold-400">*</span>
            </p>
          </div>
          <div className="h-12 w-px bg-white/15" />
          <div>
            <p className="label-cine text-white/50">Processing time</p>
            <p className="mt-2 flex items-center gap-2 text-white">
              <Clock className="h-4 w-4 text-gold-400" /> {service.timeline}
            </p>
          </div>
        </div>
        <div className="hero-in mt-8 flex flex-col gap-3 sm:flex-row" style={{ animationDelay: '0.25s' }}>
          <WhatsAppButton size="lg" label="Get started on WhatsApp" message={waMessage} source={`service-hero:${service.slug}`} />
          <CallButton size="lg" label="Talk to an expert" source={`service-hero:${service.slug}`} />
        </div>
      </PageHero>

      {/* Section nav */}
      <div className="sticky top-[84px] z-30 border-b border-white/10 bg-black/80 backdrop-blur">
        <Container className="flex gap-1 overflow-x-auto py-2">
          {sections.map(([id, label]) => (
            <a
              key={id}
              href={`#${id}`}
              className="label-cine whitespace-nowrap px-3 py-3 text-white/55 transition-colors hover:text-white"
            >
              {label}
            </a>
          ))}
        </Container>
      </div>

      <Container className="grid gap-12 py-14 lg:grid-cols-[1fr_380px] lg:py-20">
        <div className="min-w-0 space-y-20">
          <section id="overview" className="scroll-mt-40">
            <Reveal>
              <SectionHeading eyebrow="Overview" title={`What is ${service.shortName}?`} />
              <p className="mt-5 text-base leading-relaxed text-white/75">{service.intro}</p>
              <div className="mt-6 glass rounded-2xl p-6">
                <p className="flex items-center gap-2 font-medium text-white">
                  <Sparkles className="h-4 w-4 text-gold-400" /> What’s included
                </p>
                <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                  {service.includes.map((inc) => (
                    <li key={inc} className="flex items-start gap-2 text-sm text-white/75">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" /> {inc}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </section>

          <section id="who-needs" className="scroll-mt-40">
            <Reveal>
              <SectionHeading eyebrow="Who needs it" title="Is this right for you?" />
            </Reveal>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {service.whoNeeds.map((w, i) => (
                <Reveal key={w} delay={i * 70}>
                  <div className="flex h-full items-start gap-3 glass rounded-2xl p-4">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/20 text-white">
                      <Users className="h-4 w-4" />
                    </span>
                    <p className="text-sm leading-relaxed text-white/75">{w}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>

          <section id="benefits" className="scroll-mt-40">
            <Reveal>
              <SectionHeading eyebrow="Benefits" title={`Why get ${service.shortName}?`} />
            </Reveal>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {service.benefits.map((b, i) => (
                <Reveal key={b.title} delay={i * 80}>
                  <div className="glass group h-full rounded-2xl p-6 transition-all duration-500 hover:bg-white/10">
                    <span className="font-light text-sm  text-gold-400">0{i + 1}</span>
                    <h3 className="mt-2 font-light text-lg  text-white transition-colors group-hover:text-white">{b.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/70 transition-colors group-hover:text-white/70">{b.text}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>

          <section id="documents" className="scroll-mt-40">
            <Reveal>
              <SectionHeading eyebrow="Documents required" title="Keep these ready" />
              <ul className="mt-6 divide-y divide-white/10 overflow-hidden glass rounded-2xl">
                {service.documents.map((d) => (
                  <li key={d} className="flex items-center gap-3 px-5 py-4 text-sm text-white/80">
                    <FileText className="h-4 w-4 shrink-0 text-gold-400" /> {d}
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-xs text-white/50">Exact documents may vary based on your business type. We share a personalised checklist.</p>
            </Reveal>
          </section>

          <section id="process" className="scroll-mt-40">
            <Reveal>
              <SectionHeading eyebrow="Step-by-step process" title="How we get it done" />
            </Reveal>
            <div className="mt-8">
              <ProcessSteps steps={service.process} />
            </div>
          </section>

          <section id="pricing" className="scroll-mt-40">
            <Reveal>
              <div className="relative overflow-hidden dusk rounded-3xl p-7 text-white sm:p-10">
                <div className="relative grid gap-8 sm:grid-cols-2 sm:items-center">
                  <div>
                    <p className="text-xs font-medium tracking-tight text-gold-400">Pricing</p>
                    <h2 className="mt-2 font-light text-2xl ">{service.name}</h2>
                    <p className="mt-5 text-[13px] text-white/60">Starting at</p>
                    <p className="font-light text-5xl ">
                      {formatPrice(service.price)}
                      <span className="align-super text-lg text-gold-400">*</span>
                    </p>
                    <p className="mt-3 flex items-center gap-2 text-sm text-white/70">
                      <Clock className="h-4 w-4 text-gold-400" /> Processing time: {service.timeline}
                    </p>
                    <FeeNote light className="mt-4" />
                  </div>
                  <div className="space-y-3">
                    <WhatsAppButton size="lg" className="w-full" label="Get started on WhatsApp" message={waMessage} source={`service-pricing:${service.slug}`} />
                    <CallButton size="lg" variant="light" className="w-full" source={`service-pricing:${service.slug}`} />
                  </div>
                </div>
              </div>
            </Reveal>
          </section>

          <section id="faqs" className="scroll-mt-40">
            <Reveal>
              <SectionHeading eyebrow="FAQs" title={`${service.shortName} — frequently asked questions`} />
            </Reveal>
            <div className="mt-6">
              <FaqList faqs={service.faqs} />
            </div>
          </section>
        </div>

        <aside className="lg:sticky lg:top-40 lg:self-start">
          <div className="mb-5 hidden items-center gap-3 glass rounded-2xl p-4 lg:flex">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-black">
              <ServiceIcon name={service.icon} className="h-5 w-5" />
            </span>
            <div className="flex-1">
              <p className="text-sm font-medium text-white">{service.shortName}</p>
              <p className="text-xs text-white/55">from {formatPrice(service.price)}* · {service.timeline}</p>
            </div>
          </div>
          <div id="enquiry" className="scroll-mt-40">
            <LeadForm compact defaultService={service.name} title="Get expert help" subtitle={`Free consultation for ${service.shortName}.`} />
          </div>
        </aside>
      </Container>

      {related.length > 0 && (
        <section className="sky relative overflow-hidden py-16 sm:py-20">
          <Container>
            <Reveal>
              <SectionHeading eyebrow="Related services" title={`More ${category.title.toLowerCase()}`} />
            </Reveal>
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((s, i) => (
                <Reveal key={s.slug} delay={i * 100}>
                  <ServiceCard service={s} />
                </Reveal>
              ))}
            </div>
            <div className="mt-8 text-center">
              <Link to="/services" className="font-medium text-white hover:text-white">
                View all services →
              </Link>
            </div>
          </Container>
        </section>
      )}

      <CtaBanner title={`Get your ${service.shortName} done the easy way`} message={waMessage} />
    </>
  );
}
