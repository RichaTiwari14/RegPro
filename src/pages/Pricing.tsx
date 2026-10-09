import { Link } from 'react-router-dom';
import { Clock } from 'lucide-react';
import { Seo, breadcrumbLd } from '@/lib/seo';
import { categories, servicesByCategory, formatPrice } from '@/data/services';
import { PageHero } from '@/components/PageHero';
import { Container, FeeNote, WhatsAppButton } from '@/components/ui';
import { Reveal } from '@/components/Reveal';
import { ServiceIcon } from '@/components/ServiceIcon';
import { CtaBanner } from '@/components/CtaBanner';

export default function Pricing() {
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Pricing', path: '/pricing' },
  ];
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
        title="Clear prices. No surprises."
        text="Our professional fees are shown upfront. Government or statutory fees, where applicable, are charged separately at actuals."
        crumbs={crumbs}
      />
      <Container className="py-16 sm:py-20">
        <div className="space-y-14">
          {categories.map((cat) => (
            <Reveal key={cat.id}>
              <h2 className="heading-cine text-2xl text-navy-800">{cat.title}</h2>
              <div className="mt-6 overflow-hidden glass rounded-3xl">
                {servicesByCategory(cat.id).map((s, i) => (
                  <div
                    key={s.slug}
                    className={`grid items-center gap-4 px-5 py-5 transition-colors hover:bg-white/50 sm:grid-cols-[1fr_auto_auto] sm:px-7 ${
                      i > 0 ? 'border-t border-navy-800/10' : ''
                    }`}
                  >
                    <Link to={`/services/${s.slug}`} className="group flex items-center gap-4">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-navy-800/20 text-navy-800 transition-colors group-hover:bg-navy-800 group-hover:text-gold-400">
                        <ServiceIcon name={s.icon} className="h-5 w-5" />
                      </span>
                      <span>
                        <span className="block font-medium text-navy-800 group-hover:text-gold-700">{s.name}</span>
                        <span className="mt-0.5 flex items-center gap-1 text-xs text-ink/55">
                          <Clock className="h-3 w-3" /> {s.timeline}
                        </span>
                      </span>
                    </Link>
                    <div className="sm:text-right">
                      <span className="text-[13px] text-ink/45">Starting at </span>
                      <span className="heading-cine text-xl text-navy-800">
                        {formatPrice(s.price)}
                        <span className="align-super text-xs text-gold-600">*</span>
                      </span>
                    </div>
                    <WhatsAppButton label="Enquire" message={`Hi Regpro, I want to know more about ${s.name} pricing.`} source={`pricing-table:${s.slug}`} />
                  </div>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
        <FeeNote className="mt-8" />
      </Container>
      <CtaBanner title="Need a custom package?" text="Starting multiple registrations together? Ask us for a bundled quote." />
    </>
  );
}
