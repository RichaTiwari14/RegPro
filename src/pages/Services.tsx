import { Seo, breadcrumbLd } from '@/lib/seo';
import { categories, servicesByCategory } from '@/data/services';
import { PageHero } from '@/components/PageHero';
import { Container, SectionHeading, FeeNote } from '@/components/ui';
import { Reveal } from '@/components/Reveal';
import { ServiceCard } from '@/components/ServiceCard';
import { CtaBanner } from '@/components/CtaBanner';

export default function Services() {
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
  ];
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
        text="Choose a service to see who needs it, the documents required, the process, timelines and pricing."
        crumbs={crumbs}
      />
      {categories.map((cat, idx) => (
        <section key={cat.id} id={cat.id} className={`scroll-mt-24 py-16 sm:py-20 ${idx % 2 ? 'sky' : ''}`}>
          <Container>
            <Reveal>
              <SectionHeading eyebrow={cat.short} title={cat.title} text={cat.description} />
            </Reveal>
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {servicesByCategory(cat.id).map((s, i) => (
                <Reveal key={s.slug} delay={(i % 3) * 100}>
                  <ServiceCard service={s} />
                </Reveal>
              ))}
            </div>
          </Container>
        </section>
      ))}
      <Container>
        <FeeNote className="text-center" />
      </Container>
      <CtaBanner />
    </>
  );
}
