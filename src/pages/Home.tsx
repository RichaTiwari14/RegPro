import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { ArrowRight, CheckCircle2, FileUp, MessageSquareQuote, Phone, ShieldCheck, Stamp, UserRoundPen } from 'lucide-react';
import { Seo, organizationLd, faqLd } from '@/lib/seo';
import { site } from '@/config/site';
import { getService, services, formatPrice } from '@/data/services';
import { generalFaqs } from '@/data/faqs';
import { testimonials } from '@/data/testimonials';
import { Container, SectionHeading, WhatsAppButton, FeeNote } from '@/components/ui';
import { Reveal, MaskedWords } from '@/components/Reveal';
import { ServiceIcon } from '@/components/ServiceIcon';
import { FaqAccordion } from '@/components/FaqAccordion';
import { EnquiryForm } from '@/components/forms/EnquiryForm';
import { CtaBanner } from '@/components/CtaBanner';
import { Blob, Sparkle, LeafBranch, CurveLine, DottedArrow } from '@/components/Shapes';

const EASE = [0.22, 1, 0.36, 1] as const;
const stagger = { hidden: {}, shown: { transition: { staggerChildren: 0.09 } } };
const rise = { hidden: { opacity: 0, y: 26 }, shown: { opacity: 1, y: 0, transition: { duration: 0.85, ease: EASE } } };
const inView = { initial: 'hidden', whileInView: 'shown', viewport: { once: true, margin: '0px 0px -12% 0px' } } as const;

// ───────────────────────── Hero ─────────────────────────

function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const blobY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const imgY = useTransform(scrollYProgress, [0, 1], [0, -40]);
  return (
    <section ref={ref} className="relative overflow-hidden bg-ivory">
      {/* soft sage shapes behind the image */}
      <motion.div style={{ y: blobY }} className="pointer-events-none absolute -right-48 -top-24 hidden h-[720px] w-[720px] md:block">
        <Blob variant="a" color="#E3EAD9" className="h-full w-full" float />
      </motion.div>
      <Blob variant="c" color="#D6DFCB" className="pointer-events-none absolute -right-24 top-40 hidden h-[380px] w-[380px] opacity-80 lg:block" float delay={2} />

      <Container className="relative grid items-center gap-14 pb-20 pt-10 sm:pt-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8 lg:pb-24 lg:pt-16">
        <motion.div initial="hidden" animate="shown" variants={{ hidden: {}, shown: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } } }}>
          <motion.p variants={rise} className="eyebrow">
            Business Registration &amp; Compliance Made Simple
          </motion.p>
          <h1 className="heading mt-6" style={{ fontSize: 'clamp(2.4rem,4.6vw,3.9rem)', lineHeight: 1.1 }}>
            <MaskedWords text="Start, Register and Grow Your Business with Regpro" delay={150} />
          </h1>
          <motion.p variants={rise} className="mt-6 max-w-lg text-base leading-relaxed text-muted sm:text-[17px]">
            End-to-end support for company registration, government documentation and compliance needs — so you can focus on building your business.
          </motion.p>
          <motion.div variants={rise} className="mt-9 flex flex-col gap-3 sm:flex-row">
            <WhatsAppButton size="lg" label="Chat on WhatsApp" source="hero" />
            <Link to="/contact#enquiry" className="btn-outline !px-7 !py-3.5 !text-[15px]">
              <Phone className="h-4 w-4" /> Request a Call
            </Link>
          </motion.div>
        </motion.div>

        <div className="relative mx-auto w-full max-w-[520px] lg:mr-4">
          <Sparkle className="absolute -left-10 top-24 hidden h-6 w-6 sm:block" />
          <Sparkle className="absolute -right-2 -top-6 h-4 w-4" color="#869B74" />
          <motion.div
            style={{ y: imgY }}
            initial={{ opacity: 0, scale: 0.94, borderRadius: '50% 50% 24px 24px' }}
            animate={{ opacity: 1, scale: 1, borderRadius: '200px 28px 28px 28px' }}
            transition={{ duration: 1.3, delay: 0.2, ease: EASE }}
            className="relative aspect-[4/5] overflow-hidden bg-sage-100 shadow-lift sm:aspect-[5/6]"
          >
            <img src="/assets/company-registration.webp" alt="A modern corporate building" className="h-full w-full object-cover" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1, ease: EASE }}
            className="absolute -bottom-6 right-3 w-[190px] rounded-2xl border border-line bg-white p-4 text-center shadow-lift sm:-right-6"
          >
            <span className="icon-chip mx-auto h-10 w-10">
              <ShieldCheck className="h-5 w-5" />
            </span>
            <p className="mt-2 text-xs text-muted">Expert-assisted</p>
            <p className="font-display text-[15px] font-semibold text-forest-900">Pan-India Support</p>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

// ───────────────────────── Stats strip (factual) ─────────────────────────

function Stats() {
  const minPrice = Math.min(...services.map((s) => s.price));
  const stats = [
    [`${services.length}+`, 'Registration services'],
    [formatPrice(minPrice), 'Starting professional fee'],
    ['100%', 'Online process'],
    ['India-wide', 'Service availability'],
  ];
  return (
    <section className="relative bg-ivory">
      <Container>
        <motion.ul className="grid grid-cols-2 border-y border-line lg:grid-cols-4" variants={stagger} {...inView}>
          {stats.map(([v, l], i) => (
            <motion.li
              key={l}
              variants={rise}
              className={`px-3 py-8 text-center ${i % 2 ? 'border-l border-line' : ''} ${i === 2 ? 'lg:border-l' : ''} ${i > 1 ? 'border-t border-line lg:border-t-0' : ''}`}
            >
              <p className="font-display text-3xl font-semibold text-forest-900 sm:text-[34px]">{v}</p>
              <p className="mt-1 text-xs text-muted sm:text-sm">{l}</p>
            </motion.li>
          ))}
        </motion.ul>
      </Container>
    </section>
  );
}

// ───────────────────────── Services grid ─────────────────────────

const featured = [
  'private-limited-company-registration',
  'llp-registration',
  'opc-registration',
  'partnership-firm-registration',
  'gst-registration',
  'udyam-msme-registration',
  'dpiit-startup-india-recognition',
  'fssai-registration',
];

function ServicesGrid() {
  const list = featured.map((slug) => getService(slug)).filter((s): s is NonNullable<typeof s> => Boolean(s));
  return (
    <section className="relative overflow-hidden py-20 lg:py-28">
      <LeafBranch className="absolute -left-10 top-10 hidden h-72 w-64 opacity-70 md:block" />
      <Container className="relative">
        <SectionHeading center eyebrow="Our Services" title="Everything You Need for Business Growth" text="From company registration to government compliance, we’ve got you covered." />
        <motion.div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" variants={stagger} {...inView}>
          {list.map((s) => (
            <motion.div key={s.slug} variants={rise}>
              <Link
                to={`/services/${s.slug}`}
                className="group flex h-full flex-col rounded-2xl border border-line bg-white p-5 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-sage-300 hover:shadow-lift"
              >
                <span className="icon-chip h-11 w-11 transition-colors group-hover:bg-forest-800 group-hover:text-white">
                  <ServiceIcon name={s.icon} className="h-5 w-5" />
                </span>
                <h3 className="mt-4 flex-1 text-[15px] font-semibold leading-snug text-forest-900">{s.name}</h3>
                <div className="mt-4 flex items-center justify-between text-[13px] text-muted">
                  <span>
                    Starting at <span className="font-semibold text-forest-800">{formatPrice(s.price)}*</span>
                  </span>
                  <ArrowRight className="h-4 w-4 text-forest-700 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
        <Reveal className="mt-10 text-center">
          <Link to="/services" className="btn-outline !rounded-full">
            Explore All Services <ArrowRight className="h-4 w-4" />
          </Link>
          <FeeNote className="mt-4" />
        </Reveal>
      </Container>
    </section>
  );
}

// ───────────────────────── Why choose — curved green panel ─────────────────────────

const reasons = ['Expert Guidance & Support', 'Transparent Pricing', 'Secure & Confidential Handling', 'Timely Updates', 'End-to-End Assistance'];

function WhyChoose() {
  return (
    <section className="relative py-10 lg:py-16">
      <Container>
        <div className="relative">
          {/* Panel shape: rounded on the left, flowing curve on the right (desktop) */}
          <svg viewBox="0 0 1000 520" preserveAspectRatio="none" className="absolute inset-0 hidden h-full w-full lg:block" aria-hidden="true">
            <path d="M28 0H560C640 0 650 70 700 110C760 160 690 290 640 380C600 450 560 520 470 520H28C12 520 0 508 0 492V28C0 12 12 0 28 0Z" fill="#1C3F27" />
          </svg>
          <div className="absolute inset-0 rounded-[28px] bg-forest-800 lg:hidden" aria-hidden="true" />

          <div className="relative grid items-center gap-10 p-8 sm:p-12 lg:grid-cols-[1fr_1fr] lg:gap-0 lg:p-14">
            <motion.div className="text-white lg:pr-10" variants={stagger} {...inView}>
              <motion.h2 variants={rise} className="font-display text-[30px] font-semibold leading-tight sm:text-4xl">
                Why Choose Regpro?
              </motion.h2>
              <motion.p variants={rise} className="mt-3 max-w-sm text-white/70">
                Your trusted partner for business registration and compliance.
              </motion.p>
              <motion.ul variants={stagger} className="mt-8 space-y-3.5">
                {reasons.map((r) => (
                  <motion.li key={r} variants={rise} className="flex items-center gap-3 text-[15px] text-white/90">
                    <CheckCircle2 className="h-5 w-5 shrink-0 fill-sage-300 text-forest-800" /> {r}
                  </motion.li>
                ))}
              </motion.ul>
              <motion.div variants={rise} className="mt-10">
                <Link to="/contact#enquiry" className="btn !rounded-full bg-white px-6 text-forest-900 shadow-lg hover:-translate-y-0.5">
                  Get Started <ArrowRight className="h-4 w-4" />
                </Link>
              </motion.div>
            </motion.div>

            <div className="relative lg:-mr-16 lg:-mt-24">
              <CurveLine className="absolute -left-24 -top-8 hidden h-40 w-96 lg:block" />
              <motion.div
                initial={{ opacity: 0, x: 40, borderRadius: '40px' }}
                whileInView={{ opacity: 1, x: 0, borderRadius: '220px 28px 28px 28px' }}
                viewport={{ once: true, margin: '0px 0px -15% 0px' }}
                transition={{ duration: 1.3, ease: EASE }}
                className="relative aspect-[4/3] overflow-hidden border-[6px] border-ivory bg-sage-100 shadow-lift"
              >
                <img src="/assets/about-workspace.webp" alt="An office corner with document files and a plant" loading="lazy" className="h-full w-full object-cover" />
              </motion.div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

// ───────────────────────── Process ─────────────────────────

const steps = [
  { icon: UserRoundPen, title: '1. Share Your Details', text: 'Tell us what you need.' },
  { icon: FileUp, title: '2. Document Submission', text: 'Share the required documents online.' },
  { icon: Stamp, title: '3. Processing', text: 'We prepare and assist with the filing.' },
  { icon: CheckCircle2, title: '4. Get Your Registration', text: 'Receive your certificate once approved.' },
];

function Process() {
  return (
    <section className="py-20 lg:py-28">
      <Container>
        <SectionHeading center eyebrow="Our Process" title="Simple 4-Step Process" text="Get your business registered in just a few simple steps." />
        <motion.ol className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4" variants={stagger} {...inView}>
          {steps.map((s, i) => (
            <motion.li key={s.title} variants={rise} className="relative text-center">
              {i < steps.length - 1 && <DottedArrow className="absolute left-[calc(50%+52px)] top-9 hidden h-3 w-[calc(100%-104px)] lg:block" />}
              <motion.span whileHover={{ y: -4, rotate: -4 }} className="icon-chip mx-auto h-[72px] w-[72px] !bg-clay-50">
                <s.icon className="h-7 w-7" strokeWidth={1.6} />
              </motion.span>
              <h3 className="mt-5 text-[15px] font-semibold text-forest-900">{s.title}</h3>
              <p className="mx-auto mt-1.5 max-w-[200px] text-sm text-muted">{s.text}</p>
            </motion.li>
          ))}
        </motion.ol>
        <p className="mx-auto mt-10 max-w-2xl text-center text-xs text-subtle">Approval and processing times depend on the relevant government authority.</p>
      </Container>
    </section>
  );
}

// ───────────────────────── Client stories ─────────────────────────

function Stories() {
  return (
    <section className="pb-20 lg:pb-28">
      <Container>
        <SectionHeading center eyebrow="Success Stories" title="What Our Clients Say" text="Stories from entrepreneurs who started their journey with Regpro." />
        {testimonials.length > 0 ? (
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {testimonials.map((t) => (
              <figure key={t.name} className="card p-6">
                <blockquote className="text-[15px] leading-relaxed text-ink/80">“{t.quote}”</blockquote>
                <figcaption className="mt-5 text-sm font-semibold text-forest-900">
                  {t.name}
                  <span className="block text-xs font-normal text-muted">{t.role}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        ) : (
          <Reveal className="mx-auto mt-12 flex max-w-2xl flex-col items-center rounded-2xl border border-dashed border-sage-300 bg-white/60 p-10 text-center">
            <span className="icon-chip h-12 w-12">
              <MessageSquareQuote className="h-5 w-5" />
            </span>
            <p className="mt-4 font-display text-xl font-semibold text-forest-900">Client stories coming soon</p>
            <p className="mt-2 text-sm text-muted">We publish only genuine feedback shared with our clients’ permission.</p>
          </Reveal>
        )}
      </Container>
    </section>
  );
}

// ───────────────────────── FAQ + enquiry ─────────────────────────

function FaqEnquiry() {
  return (
    <section id="enquiry" className="scroll-mt-24 border-t border-line bg-white py-20 lg:py-28">
      <Container className="grid items-start gap-12 lg:grid-cols-2">
        <div>
          <SectionHeading eyebrow="FAQs" title="Questions, Answered" text="Common questions about registrations, documents, fees and timelines." />
          <Reveal delay={100} className="mt-8">
            <FaqAccordion faqs={generalFaqs.slice(0, 5)} />
            <Link to="/faqs" className="link-arrow mt-6">
              View all FAQs <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
        <Reveal delay={150}>
          <EnquiryForm title="Get a Free Consultation" />
        </Reveal>
      </Container>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Seo
        title={`${site.name} — Business Registration, GST & Compliance Assistance in India`}
        description="Regpro assists startups and businesses with company registration, GST, Udyam/MSME, DPIIT, FSSAI, IEC, trademark and compliance — expert guidance and transparent professional fees."
        path="/"
        image="/assets/regpro-hero.webp"
        jsonLd={[organizationLd(), faqLd(generalFaqs.slice(0, 5))]}
      />
      <Hero />
      <Stats />
      <ServicesGrid />
      <WhyChoose />
      <Process />
      <Stories />
      <CtaBanner />
      <FaqEnquiry />
    </>
  );
}
