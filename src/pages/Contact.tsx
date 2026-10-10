import { motion } from 'motion/react';
import { Clock, Mail, MapPin, Phone } from 'lucide-react';
import { Seo, breadcrumbLd, organizationLd } from '@/lib/seo';
import { site, whatsappLink } from '@/config/site';
import { PageHero } from '@/components/PageHero';
import { Container, WhatsAppGlyph } from '@/components/ui';
import { Reveal } from '@/components/Reveal';
import { LeadForm } from '@/components/LeadForm';
import { StickyBg } from '@/components/StickyBg';

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
      <PageHero
        eyebrow="Contact us"
        title="Let’s talk about your business"
        highlight={['business']}
        text="Reach us on WhatsApp for the fastest response, or share your details and we’ll call you back."
        crumbs={crumbs}
      />

      <StickyBg image="/images/city-dusk.jpg" overlay="bg-gradient-to-b from-navy-950/85 to-navy-950/70">
        <Container className="grid gap-12 py-16 sm:py-24 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <Reveal>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-5 rounded-full bg-[#25D366] p-4 pr-8 text-white shadow-xl shadow-black/20 transition-transform duration-300 hover:-translate-y-1"
              >
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white/20">
                  <WhatsAppGlyph className="h-8 w-8" />
                </span>
                <span>
                  <span className="block font-display text-xl font-bold">Chat on WhatsApp</span>
                  <span className="block text-sm text-white/85">Fastest response — {site.phone}</span>
                </span>
              </a>
            </Reveal>
            <motion.div
              className="mt-6 grid gap-4 sm:grid-cols-2"
              initial="hidden"
              whileInView="shown"
              viewport={{ once: true }}
              variants={{ hidden: {}, shown: { transition: { staggerChildren: 0.1 } } }}
            >
              {cards.map((c) => {
                const inner = (
                  <>
                    <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gold-50 text-gold-700 ring-1 ring-gold-200">
                      <c.icon className="h-5 w-5" />
                    </span>
                    <p className="label-cine mt-4 text-subtle">{c.label}</p>
                    <p className="mt-1 break-words font-semibold text-navy-800">{c.value}</p>
                  </>
                );
                const v = { hidden: { opacity: 0, y: 30 }, shown: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const } } };
                return c.href ? (
                  <motion.a key={c.label} href={c.href} variants={v} whileHover={{ y: -6 }} className="glass block p-5">
                    {inner}
                  </motion.a>
                ) : (
                  <motion.div key={c.label} variants={v} whileHover={{ y: -6 }} className="glass p-5">
                    {inner}
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
          <Reveal delay={120}>
            <div id="enquiry" className="scroll-mt-28">
              <LeadForm solid className="!bg-white" title="Send us an enquiry" />
            </div>
          </Reveal>
        </Container>
      </StickyBg>
    </>
  );
}
