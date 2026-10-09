import { Clock, Mail, MapPin, Phone } from 'lucide-react';
import { Seo, breadcrumbLd, organizationLd } from '@/lib/seo';
import { site, whatsappLink } from '@/config/site';
import { PageHero } from '@/components/PageHero';
import { Container, WhatsAppGlyph } from '@/components/ui';
import { Reveal } from '@/components/Reveal';
import { LeadForm } from '@/components/LeadForm';

export default function Contact() {
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Contact Us', path: '/contact' },
  ];
  const cards = [
    { icon: Phone, label: 'Call us', value: site.phone, href: site.phoneHref },
    { icon: Mail, label: 'Email us', value: site.email, href: `mailto:${site.email}` },
    { icon: MapPin, label: 'Location', value: site.address },
    { icon: Clock, label: 'Working hours', value: site.hours },
  ];
  return (
    <>
      <Seo
        title="Contact Us"
        description={`Contact Regpro for business registration, GST and compliance help. Call or WhatsApp ${site.phone}.`}
        path="/contact"
        jsonLd={[organizationLd(), breadcrumbLd(crumbs)]}
      />
      <PageHero eyebrow="Contact us" title="Let’s talk about your business" text="Reach us on WhatsApp for the fastest response, or share your details and we’ll call you back." crumbs={crumbs} />

      <Container className="grid gap-12 py-16 sm:py-20 lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal>
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-5 rounded-3xl bg-[#25D366] p-6 text-white shadow-xl shadow-[#25D366]/25 transition-transform duration-300 hover:-translate-y-1"
          >
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20">
              <WhatsAppGlyph className="h-8 w-8" />
            </span>
            <span>
              <span className="block font-display text-xl font-bold">Chat on WhatsApp</span>
              <span className="block text-sm text-white/85">Fastest response — {site.phone}</span>
            </span>
          </a>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {cards.map((c) => {
              const inner = (
                <>
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-navy-50 text-navy-800">
                    <c.icon className="h-5 w-5" />
                  </span>
                  <p className="mt-4 text-xs uppercase tracking-wider text-ink/50">{c.label}</p>
                  <p className="mt-1 break-words font-semibold text-navy-900">{c.value}</p>
                </>
              );
              return c.href ? (
                <a key={c.label} href={c.href} className="rounded-2xl border border-navy-100 bg-white p-5 transition-shadow hover:shadow-lg">
                  {inner}
                </a>
              ) : (
                <div key={c.label} className="rounded-2xl border border-navy-100 bg-white p-5">
                  {inner}
                </div>
              );
            })}
          </div>
        </Reveal>
        <Reveal delay={120}>
          <div id="enquiry" className="scroll-mt-28">
            <LeadForm title="Send us an enquiry" />
          </div>
        </Reveal>
      </Container>
    </>
  );
}
