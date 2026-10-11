import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import {
  ArrowRight,
  BadgeIndianRupee,
  Briefcase,
  CheckCircle2,
  Compass,
  FileCheck2,
  FolderCheck,
  Landmark,
  MapPinned,
  MessageSquareText,
  ShieldCheck,
  UserRoundCheck,
} from 'lucide-react';
import { Seo, organizationLd, faqLd } from '@/lib/seo';
import { site } from '@/config/site';
import { categories, getService, servicesByCategory, formatPrice, type CategoryId } from '@/data/services';
import { generalFaqs } from '@/data/faqs';
import { testimonials } from '@/data/testimonials';
import { Container, SectionHeading, WhatsAppButton, FeeNote } from '@/components/ui';
import { Reveal, MaskedWords } from '@/components/Reveal';
import { ImageFrame } from '@/components/ImageFrame';
import { ServiceCard } from '@/components/services/ServiceCard';
import { ProcessSteps } from '@/components/services/ProcessSteps';
import { FaqAccordion } from '@/components/FaqAccordion';
import { CtaBanner } from '@/components/CtaBanner';
import { EnquiryForm } from '@/components/forms/EnquiryForm';

const EASE = [0.22, 1, 0.36, 1] as const;
const stagger = { hidden: {}, shown: { transition: { staggerChildren: 0.1 } } };
const rise = { hidden: { opacity: 0, y: 26 }, shown: { opacity: 1, y: 0, transition: { duration: 0.85, ease: EASE } } };
const inView = { initial: 'hidden', whileInView: 'shown', viewport: { once: true, margin: '0px 0px -12% 0px' } } as const;

// ───────────────────────── Hero ─────────────────────────

const heroPanel = [
  { icon: Landmark, label: 'Company Registration', to: '/services/private-limited-company-registration' },
  { icon: BadgeIndianRupee, label: 'GST & Tax', to: '/services/gst-registration' },
  { icon: Briefcase, label: 'MSME / Udyam', to: '/services/udyam-msme-registration' },
];

function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const panelY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  return (
    <section ref={ref} className="relative overflow-hidden bg-ivory">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{ backgroundImage: 'linear-gradient(to right, rgba(16,41,69,0.06) 1px, transparent 1px)', backgroundSize: '96px 100%' }}
        aria-hidden="true"
      />
      <Container className="relative grid items-center gap-14 pb-20 pt-10 sm:pt-14 lg:grid-cols-[1.02fr_0.98fr] lg:gap-12 lg:pb-24 lg:pt-16">
        <motion.div initial="hidden" animate="shown" variants={{ hidden: {}, shown: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } } }}>
          <motion.p variants={rise} className="eyebrow eyebrow-rule">
            Business registration &amp; compliance
          </motion.p>
          <h1 className="heading mt-6" style={{ fontSize: 'clamp(2.6rem,5vw,4.3rem)', lineHeight: 1.06 }}>
            <MaskedWords text="Your Business." delay={150} />
            <br />
            <MaskedWords text="Registered Right." delay={350} highlight={['Registered', 'Right']} />
          </h1>
          <motion.p variants={rise} className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-[17px]">
            End-to-end assistance with business registration, government documentation and compliance — clear guidance, transparent fees and
            organised support, so you can focus on running your business.
          </motion.p>
          <motion.div variants={rise} className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link to="/services" className="btn-navy !px-7 !py-3.5 !text-[15px]">
              Explore Services <ArrowRight className="h-4 w-4" />
            </Link>
            <WhatsAppButton size="lg" label="WhatsApp an Expert" source="hero" />
          </motion.div>
          <motion.p variants={rise} className="mt-6 flex items-start gap-2 text-xs text-subtle">
            <ShieldCheck className="h-4 w-4 shrink-0 text-gold-500" /> A private professional services firm — not affiliated with any government department.
          </motion.p>
        </motion.div>

        <div className="relative mx-auto w-full max-w-[560px] lg:mr-0">
          <ImageFrame src="/assets/regpro-hero.webp" alt="A Regpro consultant guiding an entrepreneur through business registration" aspect="aspect-[5/4]" priority />
          <motion.div
            style={{ y: panelY }}
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.9, ease: EASE }}
            className="absolute -bottom-10 left-3 w-[230px] rounded-xl border border-line bg-white/95 p-4 shadow-lift backdrop-blur sm:-left-10 sm:w-[250px]"
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gold-600">We assist with</p>
            <ul className="mt-3 space-y-1">
              {heroPanel.map((p) => (
                <li key={p.label}>
                  <Link to={p.to} className="group flex items-center gap-3 rounded-lg px-2 py-2 transition-colors hover:bg-ivory">
                    <span className="flex h-8 w-8 items-center justify-center rounded-md bg-navy-800 text-gold-300">
                      <p.icon className="h-4 w-4" />
                    </span>
                    <span className="flex-1 text-sm text-navy-800">{p.label}</span>
                    <ArrowRight className="h-3.5 w-3.5 text-gold-500 opacity-0 transition-opacity group-hover:opacity-100" />
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

// ───────────────────────── Benefits strip ─────────────────────────

const benefits = [
  { icon: Compass, title: 'Clear Guidance', text: 'The right registration, explained simply' },
  { icon: BadgeIndianRupee, title: 'Transparent Pricing', text: 'Professional fee shared upfront' },
  { icon: FolderCheck, title: 'Documentation Support', text: 'Checklists and organised filing' },
  { icon: MapPinned, title: 'Pan-India Assistance', text: 'Online support across India' },
];

function BenefitsStrip() {
  return (
    <section className="border-y border-line bg-white">
      <Container>
        <motion.ul className="grid grid-cols-2 lg:grid-cols-4" variants={stagger} {...inView}>
          {benefits.map((b, i) => (
            <motion.li
              key={b.title}
              variants={rise}
              className={`flex flex-col gap-3 py-7 sm:flex-row sm:items-center sm:gap-4 sm:py-8 ${i % 2 ? 'border-l border-line pl-4 sm:pl-8' : 'pr-4'} ${
                i === 2 ? 'lg:border-l lg:border-line lg:pl-8' : ''
              } ${i > 1 ? 'border-t border-line lg:border-t-0' : ''}`}
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gold-300 text-gold-600">
                <b.icon className="h-5 w-5" strokeWidth={1.6} />
              </span>
              <span>
                <span className="block font-display text-[17px] text-navy-800">{b.title}</span>
                <span className="block text-xs text-muted sm:text-[13px]">{b.text}</span>
              </span>
            </motion.li>
          ))}
        </motion.ul>
      </Container>
    </section>
  );
}

// ───────────────────────── Popular services ─────────────────────────

const popular = ['private-limited-company-registration', 'gst-registration', 'udyam-msme-registration', 'trademark-registration'];

function PopularServices() {
  const list = popular.map((slug) => getService(slug)).filter((s): s is NonNullable<typeof s> => Boolean(s));
  return (
    <section className="py-20 lg:py-28">
      <Container>
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading eyebrow="Popular services" title="Registrations Our Clients Need Most" highlight={['Need', 'Most']} />
          <Reveal delay={150}>
            <Link to="/services" className="link-arrow">
              View all services <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
        <motion.div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4" variants={stagger} {...inView}>
          {list.map((s) => (
            <motion.div key={s.slug} variants={rise}>
              <ServiceCard service={s} />
            </motion.div>
          ))}
        </motion.div>
        <FeeNote className="mt-8" />
      </Container>
    </section>
  );
}

// ───────────────────────── All services ─────────────────────────

const categoryIcons: Record<CategoryId, typeof Landmark> = { business: Landmark, government: FileCheck2, other: ShieldCheck };

function AllServices() {
  return (
    <section className="border-y border-line bg-white py-20 lg:py-28">
      <Container>
        <SectionHeading
          center
          eyebrow="Complete services"
          title="Everything Your Business Needs"
          highlight={['Needs']}
          text="From setting up your business to the registrations it needs to operate and grow."
        />
        <motion.div className="mt-14 grid gap-6 md:grid-cols-3" variants={stagger} {...inView}>
          {categories.map((c) => {
            const Icon = categoryIcons[c.id];
            return (
              <motion.div key={c.id} variants={rise} className="flex flex-col rounded-xl border border-line bg-ivory/60 p-7">
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-navy-800 text-gold-300">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="font-display text-xl text-navy-800">{c.title}</h3>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-muted">{c.description}</p>
                <ul className="mt-5 flex-1 divide-y divide-line border-t border-line">
                  {servicesByCategory(c.id).map((s) => (
                    <li key={s.slug}>
                      <Link to={`/services/${s.slug}`} className="group flex items-center justify-between gap-3 py-2.5 text-sm text-ink/85 transition-colors hover:text-navy-800">
                        <span>{s.name}</span>
                        <span className="flex shrink-0 items-center gap-2 text-xs text-subtle group-hover:text-gold-600">
                          {formatPrice(s.price)}*
                          <ArrowRight className="h-3.5 w-3.5 -translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </motion.div>
      </Container>
    </section>
  );
}

// ───────────────────────── How it works ─────────────────────────

const steps = [
  { title: 'Choose a Service', text: 'Pick a service, or tell us what you are setting up and we will suggest the right registration.' },
  { title: 'Share Your Details', text: 'We share a document checklist and confirm our professional fee before you proceed.' },
  { title: 'Application Assistance', text: 'Our team prepares the application and assists with filing on the relevant portal.' },
  { title: 'Receive Updates', text: 'We keep you informed at each stage and help with any queries from the authority.' },
];

function HowItWorks() {
  return (
    <section className="py-20 lg:py-28">
      <Container>
        <SectionHeading eyebrow="How it works" title="Get Started in 4 Simple Steps" highlight={['4', 'Simple', 'Steps']} />
        <div className="mt-14">
          <ProcessSteps steps={steps} />
        </div>
        <Reveal className="mt-12 rounded-xl border border-line bg-white p-5 text-sm leading-relaxed text-muted">
          <span className="font-medium text-navy-800">Please note:</span> timelines and approvals depend on the relevant government authority and the
          particular service. We will tell you what to expect for your case before you begin.
        </Reveal>
      </Container>
    </section>
  );
}

// ───────────────────────── Why Regpro ─────────────────────────

const reasons = [
  { icon: FolderCheck, title: 'Clear documentation guidance', text: 'A checklist tailored to your service, so you know exactly what to keep ready.' },
  { icon: BadgeIndianRupee, title: 'Transparent professional fees', text: 'Our fee is shared upfront, with government charges shown separately.' },
  { icon: UserRoundCheck, title: 'Personal assistance', text: 'Speak to a real person who understands your requirement.' },
  { icon: FileCheck2, title: 'Organised application support', text: 'Applications are prepared carefully and filed in an orderly way.' },
  { icon: MessageSquareText, title: 'Clear communication', text: 'Honest updates on the process and realistic timelines.' },
];

function WhyRegpro() {
  return (
    <section className="bg-navy-900 py-20 text-white lg:py-28">
      <Container className="grid items-center gap-14 lg:grid-cols-2">
        <ImageFrame src="/assets/consultation-meeting.webp" alt="A Regpro consultation meeting with clients" aspect="aspect-[5/4]" />
        <div>
          <SectionHeading light eyebrow="Why choose Regpro" title="Guidance You Can Rely On" highlight={['Rely', 'On']} />
          <motion.ul className="mt-10 space-y-6" variants={stagger} {...inView}>
            {reasons.map((r) => (
              <motion.li key={r.title} variants={rise} className="flex gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gold-300/50 text-gold-300">
                  <r.icon className="h-5 w-5" strokeWidth={1.6} />
                </span>
                <span>
                  <span className="block font-display text-lg text-white">{r.title}</span>
                  <span className="mt-1 block text-sm leading-relaxed text-white/65">{r.text}</span>
                </span>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </Container>
    </section>
  );
}

// ───────────────────────── Testimonials (only real, approved ones) ─────────────────────────

function Testimonials() {
  if (testimonials.length === 0) return null;
  return (
    <section className="py-20 lg:py-28">
      <Container>
        <SectionHeading center eyebrow="Client feedback" title="What Our Clients Say" />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <figure key={t.name} className="card p-7">
              <blockquote className="font-display text-lg leading-relaxed text-navy-800">“{t.quote}”</blockquote>
              <figcaption className="mt-5 border-t border-line pt-4 text-sm">
                <span className="font-medium text-ink">{t.name}</span>
                <span className="block text-xs text-muted">
                  {t.role} · {t.service}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </section>
  );
}

// ───────────────────────── FAQ + enquiry ─────────────────────────

function FaqSection() {
  return (
    <section className="py-20 lg:py-28">
      <Container className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <SectionHeading eyebrow="FAQs" title="Questions, Answered" highlight={['Answered']} text="Common questions about choosing a registration, documents, fees and timelines." />
          <Reveal delay={150} className="mt-8">
            <Link to="/faqs" className="link-arrow">
              View all FAQs <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
        <Reveal delay={100}>
          <FaqAccordion faqs={generalFaqs.slice(0, 6)} />
        </Reveal>
      </Container>
    </section>
  );
}

function Enquiry() {
  return (
    <section id="enquiry" className="scroll-mt-24 border-t border-line bg-white py-20 lg:py-28">
      <Container className="grid items-start gap-12 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <SectionHeading
            eyebrow="Talk to an expert"
            title="Tell Us What You Need"
            highlight={['Need']}
            text="Share a few details and our team will get back to you within working hours with the right next steps."
          />
          <Reveal delay={150}>
            <ul className="mt-8 space-y-3 text-sm text-muted">
              {['Guidance on the right registration', 'Document checklist for your case', 'Professional fee shared upfront', `Working hours: ${site.hours}`].map((t) => (
                <li key={t} className="flex items-center gap-3">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-gold-500" /> {t}
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <WhatsAppButton label="WhatsApp Us" source="home-enquiry" />
            </div>
          </Reveal>
        </div>
        <Reveal delay={100}>
          <EnquiryForm title="Request a consultation" />
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
        description="REGPRO assists startups and businesses with company registration, GST, Udyam/MSME, DPIIT, FSSAI, IEC, trademark and compliance — clear guidance and transparent professional fees."
        path="/"
        image="/assets/regpro-hero.webp"
        jsonLd={[organizationLd(), faqLd(generalFaqs.slice(0, 6))]}
      />
      <Hero />
      <BenefitsStrip />
      <PopularServices />
      <AllServices />
      <HowItWorks />
      <WhyRegpro />
      <Testimonials />
      <CtaBanner />
      <FaqSection />
      <Enquiry />
    </>
  );
}
