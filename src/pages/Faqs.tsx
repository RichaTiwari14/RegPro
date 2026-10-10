import { Headphones } from 'lucide-react';
import { Seo, breadcrumbLd, faqLd } from '@/lib/seo';
import { site } from '@/config/site';
import { generalFaqs } from '@/data/faqs';
import { categories, servicesByCategory } from '@/data/services';
import { PageHero } from '@/components/PageHero';
import { Container, WhatsAppButton, CallButton } from '@/components/ui';
import { Reveal } from '@/components/Reveal';
import { FaqList } from '@/components/FaqList';
import { StickyBg } from '@/components/StickyBg';

export default function Faqs() {
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'FAQs', path: '/faqs' },
  ];
  const groups = [{ id: 'general', title: 'General', faqs: generalFaqs }, ...categories.map((c) => ({ id: c.id, title: c.title, faqs: servicesByCategory(c.id).flatMap((s) => s.faqs.slice(0, 2)) }))];
  return (
    <>
      <Seo
        title="Frequently Asked Questions"
        description="Answers to common questions about business registration, GST, MSME, DPIIT, FSSAI, trademark and how Regpro works."
        path="/faqs"
        jsonLd={[faqLd(generalFaqs), breadcrumbLd(crumbs)]}
      />
      <PageHero
        eyebrow="FAQs"
        title="Frequently asked questions"
        highlight={['questions']}
        text="Can’t find your answer? Message us on WhatsApp — we’re happy to help."
        crumbs={crumbs}
      />
      <Container className="grid gap-12 py-16 sm:py-20 lg:grid-cols-[1fr_340px]">
        <div className="min-w-0 space-y-16">
          {groups.map((g) => (
            <Reveal key={g.id}>
              <h2 id={g.id} className="heading-cine mb-6 scroll-mt-28 text-2xl">{g.title}</h2>
              <FaqList faqs={g.faqs} />
            </Reveal>
          ))}
        </div>
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <Reveal>
            <StickyBg image="/images/tower.jpg" overlay="bg-navy-950/75" rounded="1.75rem">
              <div className="p-7 text-white">
                <Headphones className="h-8 w-8 text-gold-400" strokeWidth={1.5} />
                <p className="mt-5 font-display text-xl font-bold">Still have questions?</p>
                <p className="mt-2 text-sm text-white/70">Our experts are available {site.hours}.</p>
                <div className="mt-6 grid gap-3">
                  <WhatsAppButton label="Ask on WhatsApp" source="faqs-page" />
                  <CallButton variant="light" source="faqs-page" />
                </div>
              </div>
            </StickyBg>
          </Reveal>
        </aside>
      </Container>
    </>
  );
}
