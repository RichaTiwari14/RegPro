import { Seo, breadcrumbLd, faqLd } from '@/lib/seo';
import { generalFaqs } from '@/data/faqs';
import { categories, servicesByCategory } from '@/data/services';
import { PageHero } from '@/components/PageHero';
import { Container } from '@/components/ui';
import { Reveal } from '@/components/Reveal';
import { FaqList } from '@/components/FaqList';
import { CtaBanner } from '@/components/CtaBanner';

export default function Faqs() {
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'FAQs', path: '/faqs' },
  ];
  return (
    <>
      <Seo
        title="Frequently Asked Questions"
        description="Answers to common questions about business registration, GST, MSME, DPIIT, FSSAI, trademark and how Regpro works."
        path="/faqs"
        jsonLd={[faqLd(generalFaqs), breadcrumbLd(crumbs)]}
      />
      <PageHero eyebrow="FAQs" title="Frequently asked questions" text="Can’t find your answer? Message us on WhatsApp — we’re happy to help." crumbs={crumbs} />
      <Container className="max-w-4xl space-y-16 py-16 sm:py-20">
        <Reveal>
          <h2 className="mb-6 font-display text-2xl font-bold text-navy-900">General</h2>
          <FaqList faqs={generalFaqs} />
        </Reveal>
        {categories.map((cat) => (
          <Reveal key={cat.id}>
            <h2 className="mb-6 font-display text-2xl font-bold text-navy-900">{cat.title}</h2>
            <FaqList faqs={servicesByCategory(cat.id).flatMap((s) => s.faqs.slice(0, 2))} />
          </Reveal>
        ))}
      </Container>
      <CtaBanner title="Still have a question?" />
    </>
  );
}
