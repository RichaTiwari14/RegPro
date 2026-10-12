import { motion } from 'motion/react';
import { ArrowUpRight, Clock, Mail, MapPin, Phone } from 'lucide-react';
import { Seo, breadcrumbLd, organizationLd } from '@/lib/seo';
import { site, whatsappLink, mapQuery, mapsLink } from '@/config/site';
import { PageHero } from '@/components/PageHero';
import { Container, WhatsAppGlyph } from '@/components/ui';
import { Reveal } from '@/components/Reveal';
import { EnquiryForm } from '@/components/forms/EnquiryForm';
import { trackEvent } from '@/lib/analytics';
import { Blob } from '@/components/Shapes';

export default function Contact() {
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Contact Us', path: '/contact' },
  ];
  const cards = [
    { icon: Phone, label: 'Call us', value: site.phone, sub: site.hours, href: site.phoneHref, ev: 'phone_click' as const },
    { icon: WhatsAppGlyph, label: 'WhatsApp', value: 'Chat with our experts', sub: 'Usually the fastest way to reach us', href: whatsappLink(), ev: 'whatsapp_click' as const, external: true },
    { icon: Mail, label: 'Email us', value: site.email, sub: 'We reply within working hours', href: `mailto:${site.email}`, ev: 'contact_click' as const },
    { icon: MapPin, label: 'Location', value: site.streetAddress || site.address, sub: 'Open in Google Maps', href: mapsLink(), ev: 'contact_click' as const, external: true },
  ];
  return (
    <>
      <Seo
        title="Contact Us"
        description={`Contact Regpro for business registration, GST and compliance assistance. Call or WhatsApp ${site.phone}, or send an enquiry.`}
        path="/contact"
        image="/assets/contact-office.webp"
        jsonLd={[organizationLd(), breadcrumbLd(crumbs)]}
      />
      <PageHero
        eyebrow="Contact us"
        title="Get in Touch — We’re Here to Help"
        highlight={['Here', 'to', 'Help']}
        text="Have a question or need expert guidance? Call, WhatsApp or send us an enquiry and our team will get back to you."
        crumbs={crumbs}
        image="/assets/contact-office.webp"
        imageAlt="Regpro office reception desk"
      />

      <section id="enquiry" className="scroll-mt-24 py-16 sm:py-24">
        <Container className="grid items-start gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <motion.div
              className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2"
              initial="hidden"
              whileInView="shown"
              viewport={{ once: true }}
              variants={{ hidden: {}, shown: { transition: { staggerChildren: 0.08 } } }}
            >
              {cards.map((c) => {
                const inner = (
                  <>
                    <span className="flex h-11 w-11 items-center justify-center rounded-full border border-sage-300 text-forest-600">
                      <c.icon className="h-5 w-5" />
                    </span>
                    <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-subtle">{c.label}</p>
                    <p className="mt-1 break-words font-display text-lg text-forest-800">{c.value}</p>
                    <p className="mt-1 text-xs text-muted">{c.sub}</p>
                  </>
                );
                const v = { hidden: { opacity: 0, y: 20 }, shown: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } } };
                return c.href ? (
                  <motion.a
                    key={c.label}
                    variants={v}
                    href={c.href}
                    target={c.external ? '_blank' : undefined}
                    rel={c.external ? 'noopener noreferrer' : undefined}
                    onClick={() => c.ev && trackEvent(c.ev, { label: 'contact-page' })}
                    className="card block p-6 transition-shadow hover:shadow-lift"
                  >
                    {inner}
                  </motion.a>
                ) : (
                  <motion.div key={c.label} variants={v} className="card p-6">
                    {inner}
                  </motion.div>
                );
              })}
            </motion.div>
            <Reveal className="mt-6 flex items-start gap-3 rounded-xl border border-line bg-white p-5 text-sm text-muted">
              <Clock className="mt-0.5 h-4 w-4 shrink-0 text-forest-500" />
              <span>
                Working hours: <span className="text-forest-800">{site.hours}</span>. Messages received outside these hours are answered on the next working
                day.
              </span>
            </Reveal>
          </div>
          <Reveal delay={100}>
            <EnquiryForm title="Send us a message" />
          </Reveal>
        </Container>
      </section>
      <section id="location" aria-labelledby="location-heading" className="scroll-mt-24 pb-20 sm:pb-28">
        <Container>
          <Reveal className="relative z-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="eyebrow">Our location</p>
              <h2 id="location-heading" className="heading mt-4" style={{ fontSize: 'clamp(1.8rem,3.2vw,2.6rem)' }}>
                Find us on the map
              </h2>
            </div>
            <a href={mapsLink()} target="_blank" rel="noopener noreferrer" onClick={() => trackEvent('contact_click', { label: 'map-open' })} className="link-arrow">
              Open in Google Maps <ArrowUpRight className="h-4 w-4" />
            </a>
          </Reveal>
          <Reveal delay={100} className="relative mt-8">
            <Blob variant="b" color="#D6DFCB" className="pointer-events-none absolute -right-20 -top-16 hidden h-72 w-72 md:block" float />
            <div className="relative overflow-hidden rounded-[28px] border border-line bg-sage-100 shadow-lift">
              <iframe
                title={`Map showing ${mapQuery()}`}
                src={`https://www.google.com/maps?q=${encodeURIComponent(mapQuery())}&z=${site.streetAddress ? 16 : 11}&output=embed`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="block h-[340px] w-full border-0 sm:h-[440px]"
                allowFullScreen
              />
              <div className="pointer-events-none absolute inset-x-4 bottom-4 sm:inset-x-auto sm:left-6 sm:bottom-6">
                <div className="pointer-events-auto flex max-w-sm items-start gap-3 rounded-2xl border border-line bg-white/95 p-4 shadow-lift backdrop-blur">
                  <span className="icon-chip h-10 w-10 shrink-0">
                    <MapPin className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="font-display text-[17px] font-semibold text-forest-900">{site.name}</p>
                    <p className="text-sm text-muted">{site.streetAddress || site.address}</p>
                    <p className="mt-1 text-xs text-subtle">{site.hours} · Serving clients across India online</p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
