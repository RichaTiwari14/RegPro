import type { ReactNode } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, Building2, Mail, MapPin, MessageSquareText, Phone, Send, ShieldCheck, UserRound } from 'lucide-react';
import { Seo, breadcrumbLd, faqLd, organizationLd } from '@/lib/seo';
import { site, whatsappLink, mapQuery, mapsLink } from '@/config/site';
import { Container, WhatsAppGlyph } from '@/components/ui';
import { MaskedWords, Reveal } from '@/components/Reveal';
import { EnquiryForm } from '@/components/forms/EnquiryForm';
import { FaqAccordion } from '@/components/FaqAccordion';
import { trackEvent } from '@/lib/analytics';
import { Blob } from '@/components/Shapes';

const EASE = [0.22, 1, 0.36, 1] as const;

/** Small caps label with a trailing rule (contact reference). */
function Kicker({ children }: { children: ReactNode }) {
  return (
    <p className="flex items-center gap-3 text-[11.5px] font-medium uppercase tracking-[0.16em] text-forest-500">
      {children}
      <span className="h-px w-10 bg-sage-300" aria-hidden="true" />
    </p>
  );
}

/** Soft sage circle used in the overlapping backdrops. */
function Disc({ className, delay = 0 }: { className: string; delay?: number }) {
  return (
    <motion.span
      aria-hidden="true"
      className={`pointer-events-none absolute rounded-full ${className}`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1, y: [0, -8, 0] }}
      transition={{
        opacity: { duration: 1, delay },
        scale: { duration: 1.2, delay, ease: EASE },
        y: { duration: 9, repeat: Infinity, ease: 'easeInOut', delay },
      }}
    />
  );
}

/** Organic image masks (objectBoundingBox units). */
function Masks() {
  return (
    <svg width="0" height="0" className="absolute" aria-hidden="true">
      <defs>
        <clipPath id="mask-hero" clipPathUnits="objectBoundingBox">
          <path d="M0.16,0.05 C0.3,0.0 0.7,0.01 0.88,0.02 C0.97,0.03 1,0.1 1,0.24 L1,0.74 C1,0.9 0.96,0.97 0.86,0.98 C0.66,1 0.36,0.99 0.2,0.97 C0.09,0.96 0.05,0.88 0.06,0.76 C0.07,0.64 0.02,0.56 0.02,0.42 C0.02,0.24 0.06,0.09 0.16,0.05 Z" />
        </clipPath>
        <clipPath id="mask-meet" clipPathUnits="objectBoundingBox">
          <path d="M0.1,0.02 L0.84,0.02 C0.93,0.02 0.96,0.1 0.97,0.22 C0.98,0.36 1,0.5 1,0.66 C1,0.86 0.97,0.98 0.88,0.98 L0.12,0.98 C0.05,0.98 0.02,0.92 0.02,0.82 L0.02,0.2 C0.02,0.08 0.04,0.02 0.1,0.02 Z" />
        </clipPath>
      </defs>
    </svg>
  );
}

export default function Contact() {
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Contact Us', path: '/contact' },
  ];
  const channels = [
    {
      icon: Phone,
      label: 'Call Us',
      value: site.phone,
      sub: site.hours,
      href: site.phoneHref,
      ev: 'phone_click' as const,
    },
    {
      icon: WhatsAppGlyph,
      label: 'Chat on WhatsApp',
      value: site.phone,
      sub: 'Get instant support',
      href: whatsappLink(),
      ev: 'whatsapp_click' as const,
      external: true,
    },
    {
      icon: Mail,
      label: 'Email Us',
      value: site.email,
      sub: 'We reply within working hours',
      href: `mailto:${site.email}`,
      ev: 'contact_click' as const,
    },
    {
      icon: MapPin,
      label: 'Our Office',
      value: site.streetAddress || 'Bengaluru, India',
      sub: 'Visit us for a consultation (by appointment)',
      href: mapsLink(),
      ev: 'contact_click' as const,
      external: true,
    },
  ];
  const faqs = [
    {
      q: 'What is the best way to contact Regpro?',
      a: `WhatsApp or a call on ${site.phone} is usually the quickest. You can also send the enquiry form on this page or email ${site.email}.`,
    },
    {
      q: 'How quickly will I get a response?',
      a: `We respond during working hours (${site.hours}). Messages received outside these hours are answered on the next working day.`,
    },
    {
      q: 'Can I visit your office for a consultation?',
      a: 'Yes, by prior appointment. Call or WhatsApp us to fix a time. Most services can also be completed entirely online, wherever you are in India.',
    },
    {
      q: 'Do you provide consultation on WhatsApp?',
      a: 'Yes. Share your requirement on WhatsApp and we will guide you on the right registration, the documents needed and our professional fee.',
    },
    {
      q: 'Will my information be kept confidential?',
      a: 'Yes. Your details and documents are used only to respond to your enquiry and to deliver the service you ask for. See our Privacy Policy for details.',
    },
  ];
  const features = [
    { icon: MessageSquareText, label: ['Quick', 'Response'] },
    { icon: UserRound, label: ['Expert', 'Guidance'] },
    { icon: ShieldCheck, label: ['Confidential', 'Consultation'] },
  ];

  return (
    <>
      <Seo
        title="Contact Us"
        description={`Contact Regpro for business registration, GST and compliance assistance. Call or WhatsApp ${site.phone}, or send an enquiry.`}
        path="/contact"
        image="/assets/contact-office.webp"
        jsonLd={[organizationLd(), breadcrumbLd(crumbs), faqLd(faqs)]}
      />
      <Masks />

      {/* ───────── Hero ───────── */}
      <section className="relative overflow-hidden bg-ivory">
        <Container className="grid items-center gap-12 pb-16 pt-10 sm:pb-24 sm:pt-14 lg:grid-cols-[0.95fr_1.05fr] lg:gap-10">
          <div className="min-w-0">
            <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, ease: EASE }}>
              <Kicker>Contact us</Kicker>
            </motion.div>
            <h1 className="heading mt-5" style={{ fontSize: 'clamp(2.3rem,4.6vw,3.7rem)' }}>
              <MaskedWords text="Let’s Talk About Your Business" delay={100} />
            </h1>
            <motion.p
              className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-[17px]"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.35, ease: EASE }}
            >
              Have questions about business registration, government documentation or compliance? Our team is here to help you with the right guidance.
            </motion.p>
            <motion.ul
              className="mt-8 flex flex-wrap gap-x-8 gap-y-4"
              initial="hidden"
              animate="shown"
              variants={{
                hidden: {},
                shown: {
                  transition: { staggerChildren: 0.1, delayChildren: 0.5 },
                },
              }}
            >
              {features.map((f) => (
                <motion.li
                  key={f.label[0]}
                  variants={{
                    hidden: { opacity: 0, y: 12 },
                    shown: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.7, ease: EASE },
                    },
                  }}
                  className="flex items-center gap-3"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-sage-100 text-forest-800">
                    <f.icon className="h-5 w-5" />
                  </span>
                  <span className="text-[13px] leading-snug text-ink">
                    {f.label[0]}
                    <br />
                    {f.label[1]}
                  </span>
                </motion.li>
              ))}
            </motion.ul>
          </div>

          {/* Image with overlapping shapes + card */}
          <div className="relative mx-auto w-full max-w-[640px] lg:mr-0">
            <Disc className="-left-6 top-2 h-40 w-40 bg-sage-100 sm:-left-10 sm:h-52 sm:w-52" />
            <Disc className="-bottom-10 left-6 h-44 w-44 bg-sage-100/80 sm:h-56 sm:w-56" delay={0.3} />
            <Blob variant="c" color="#E3EAD9" className="absolute -bottom-16 -right-24 h-72 w-72 sm:h-96 sm:w-96" float delay={1} />
            <svg viewBox="0 0 120 300" className="pointer-events-none absolute -left-4 top-[18%] hidden h-[70%] w-20 sm:block" fill="none" aria-hidden="true">
              <motion.path
                d="M110 4 C 40 40, 6 110, 14 170 C 22 230, 70 270, 116 296"
                stroke="#B9A876"
                strokeWidth="1.3"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, delay: 0.6, ease: 'easeInOut' }}
              />
              <circle cx="110" cy="4" r="3" fill="#B9A876" />
            </svg>
            <motion.div
              initial={{ opacity: 0, x: 30, scale: 0.97 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.15, ease: EASE }}
              className="relative ml-6 aspect-[16/11] sm:ml-14"
            >
              <img
                src="/assets/contact-office.webp"
                alt="Regpro office reception desk"
                className="h-full w-full object-cover"
                style={{ clipPath: 'url(#mask-hero)' }}
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.7, ease: EASE }}
              className="relative -mt-20 ml-0 w-[240px] rounded-2xl bg-white/95 p-5 shadow-lift backdrop-blur sm:absolute sm:bottom-6 sm:left-0 sm:mt-0 sm:w-[260px]"
            >
              <div className="flex items-start gap-3.5">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-forest-800 text-white">
                  <Send className="h-[18px] w-[18px]" />
                </span>
                <div>
                  <p className="font-display text-[17px] font-semibold leading-snug text-forest-900">
                    Your Business
                    <br />
                    Our Support
                  </p>
                  <p className="mt-2 text-[13px] leading-relaxed text-muted">Get in touch and start your registration journey today.</p>
                </div>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* ───────── Form + contact details ───────── */}
      <section id="enquiry" className="relative scroll-mt-24 py-16 sm:py-20">
        <Container className="grid items-start gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:gap-14">
          <Reveal className="relative">
            <Blob variant="a" color="#D6DFCB" className="absolute -bottom-14 -left-16 h-64 w-64 sm:-left-24 sm:h-80 sm:w-80" float />
            <div className="relative rounded-[28px] bg-[#EEF1EA] p-6 ring-1 ring-sage-200/70 sm:p-10">
              <Kicker>Send us a message</Kicker>
              <h2 className="heading mt-4" style={{ fontSize: 'clamp(1.8rem,3vw,2.4rem)' }}>
                Get a Free Consultation
              </h2>
              <p className="mt-3 max-w-md text-[15px] leading-relaxed text-muted">
                Fill in your details and our team will get back to you as soon as possible.
              </p>
              <EnquiryForm boxed title="" submitLabel="Submit & Get Expert Advice" className="mt-7" />
            </div>
          </Reveal>

          <div className="lg:pt-6">
            <Reveal>
              <Kicker>Our contact details</Kicker>
              <h2 className="heading mt-4" style={{ fontSize: 'clamp(1.8rem,3vw,2.4rem)' }}>
                Connect with Regpro
              </h2>
              <p className="mt-3 max-w-md text-[15px] leading-relaxed text-muted">Reach out to us through any of the following channels or visit our office.</p>
            </Reveal>
            <motion.ul
              className="mt-7 space-y-3.5"
              initial="hidden"
              whileInView="shown"
              viewport={{ once: true, margin: '0px 0px -10% 0px' }}
              variants={{
                hidden: {},
                shown: { transition: { staggerChildren: 0.09 } },
              }}
            >
              {channels.map((c) => (
                <motion.li
                  key={c.label}
                  variants={{
                    hidden: { opacity: 0, x: 24 },
                    shown: {
                      opacity: 1,
                      x: 0,
                      transition: { duration: 0.7, ease: EASE },
                    },
                  }}
                >
                  <a
                    href={c.href}
                    target={c.external ? '_blank' : undefined}
                    rel={c.external ? 'noopener noreferrer' : undefined}
                    onClick={() => trackEvent(c.ev, { label: 'contact-page' })}
                    className="group flex items-center gap-5 rounded-2xl border border-line bg-white px-5 py-4 transition hover:-translate-y-0.5 hover:shadow-card"
                  >
                    <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-sage-100 text-forest-800 transition-colors group-hover:bg-forest-800 group-hover:text-white">
                      <c.icon className="h-6 w-6" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[13px] font-semibold text-ink">{c.label}</span>
                      <span className="mt-0.5 block break-words text-[17px] font-semibold text-forest-900">{c.value}</span>
                      <span className="mt-0.5 block text-[12.5px] text-muted">{c.sub}</span>
                    </span>
                  </a>
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </Container>
      </section>

      {/* ───────── Meet + map ───────── */}
      <section id="location" aria-label="Visit us" className="relative scroll-mt-24 pb-20 sm:pb-28">
        <Container className="grid items-stretch gap-6 lg:grid-cols-[1.12fr_0.88fr]">
          <Reveal className="relative">
            <Blob variant="b" color="#C9D5BC" className="absolute -left-14 -top-10 h-64 w-48 sm:-left-20 sm:h-80 sm:w-64" float delay={0.5} />
            <div className="relative ml-4 aspect-[16/10] sm:ml-10 lg:h-full lg:min-h-[340px]">
              <img
                src="/assets/contact-meeting.webp"
                alt="Regpro meeting room"
                loading="lazy"
                className="h-full w-full object-cover"
                style={{ clipPath: 'url(#mask-meet)' }}
              />
            </div>
            <div className="relative -mt-16 sm:absolute sm:left-0 sm:top-1/2 sm:mt-0 sm:-translate-y-1/2">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: 0.3, ease: EASE }}
                className="w-[240px] rounded-2xl bg-white p-5 shadow-lift sm:p-6"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-sage-100 text-forest-800">
                  <Building2 className="h-5 w-5" />
                </span>
                <h2 className="mt-4 font-display text-[22px] font-semibold leading-tight text-forest-900">
                  Let’s Meet
                  <br />
                  and Discuss
                </h2>
                <p className="mt-2.5 text-[13px] leading-relaxed text-muted">
                  Prefer to talk in person? Visit our office for a detailed discussion about your business registration and compliance needs.
                </p>
              </motion.div>
            </div>
          </Reveal>

          <Reveal delay={120} className="relative">
            <div className="relative h-[320px] overflow-hidden rounded-[24px] border border-line bg-sage-100 sm:h-[380px] lg:h-full">
              <iframe
                title={`Map showing ${mapQuery()}`}
                src={`https://www.google.com/maps?q=${encodeURIComponent(mapQuery())}&z=${site.streetAddress ? 16 : 12}&output=embed`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 h-full w-full border-0 grayscale-[35%]"
                allowFullScreen
              />
              <div className="absolute right-4 top-4 w-[190px] rounded-xl bg-white p-4 shadow-lift sm:right-6 sm:top-1/4">
                <p className="text-[15px] font-semibold text-forest-900">{site.name}</p>
                <p className="mt-0.5 text-[12.5px] text-muted">{site.streetAddress || 'Bengaluru, India'}</p>
                <span className="my-2.5 block h-px bg-line" />
                <a
                  href={mapsLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent('contact_click', { label: 'map-directions' })}
                  className="link-arrow text-[13px]"
                >
                  Get Directions <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ───────── FAQs ───────── */}
      <section className="relative overflow-hidden pb-20 sm:pb-28">
        <Blob variant="a" color="#E3EAD9" className="absolute -right-24 top-0 hidden h-80 w-80 md:block" float delay={0.8} />
        <Container className="relative grid items-start gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <Reveal>
            <Kicker>Frequently asked questions</Kicker>
            <h2 className="heading mt-4" style={{ fontSize: 'clamp(1.9rem,3.2vw,2.6rem)' }}>
              Quick Answers
              <br />
              to Common Queries
            </h2>
            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-muted">
              Here are some of the most common questions we receive. Still have a question? Feel free to contact us.
            </p>
            <Link to="/faqs" className="btn-outline mt-7">
              View All FAQs <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
          <Reveal delay={120}>
            <FaqAccordion faqs={faqs} defaultOpen={null} />
          </Reveal>
        </Container>
      </section>
    </>
  );
}
