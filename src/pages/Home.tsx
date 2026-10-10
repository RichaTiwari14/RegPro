import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { animate, motion, useInView, useScroll, useTransform } from 'motion/react';
import {
  ArrowRight,
  BadgeIndianRupee,
  Briefcase,
  Building2,
  CheckCircle2,
  Clock3,
  Factory,
  FileCheck2,
  FileSignature,
  GraduationCap,
  HeartPulse,
  Headphones,
  Laptop,
  Lightbulb,
  MessageCircle,
  Rocket,
  Search,
  ShieldCheck,
  ShoppingBag,
  Store,
  Truck,
  UserCheck,
  Utensils,
} from 'lucide-react';
import { Seo, organizationLd, faqLd } from '@/lib/seo';
import { site, whatsappLink } from '@/config/site';
import { categories, services, servicesByCategory, popularServices, formatPrice, type CategoryId } from '@/data/services';
import { generalFaqs } from '@/data/faqs';
import { offer } from '@/data/offers';
import { SectionHeading, WhatsAppButton, CallButton, FeeNote, Container } from '@/components/ui';
import { Reveal, MaskedWords } from '@/components/Reveal';
import { Scribble } from '@/components/Scribble';
import { StickyBg } from '@/components/StickyBg';
import { LeadForm } from '@/components/LeadForm';
import { ServiceIcon } from '@/components/ServiceIcon';
import { Testimonials } from '@/components/Testimonials';
import { FaqList } from '@/components/FaqList';

const EASE = [0.16, 1, 0.3, 1] as const;

/** Cards rise in one after another as their grid scrolls into view. */
const stagger = { hidden: {}, shown: { transition: { staggerChildren: 0.12 } } };
const cardIn = {
  hidden: { opacity: 0, y: 40, scale: 0.97 },
  shown: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.9, ease: EASE } },
};
const inView = { initial: 'hidden', whileInView: 'shown', viewport: { once: true, margin: '0px 0px -10% 0px' } } as const;
const spring = { type: 'spring', stiffness: 300, damping: 24 } as const;

// ───────────────────────── Hero ─────────────────────────

const heroChecklist = ['Company Registration', 'GST Registration', 'Trademark Filing', 'MSME / Udyam', 'Compliance Support'];

function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '10%']);
  const cardY = useTransform(scrollYProgress, [0, 1], [0, -60]);

  return (
    <section ref={ref} className="relative overflow-hidden bg-cream">
      <div
        className="pointer-events-none absolute -right-40 -top-40 h-[640px] w-[640px] rounded-full"
        style={{ background: 'radial-gradient(closest-side, rgba(214,162,31,0.14), rgba(214,162,31,0))' }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage: 'radial-gradient(rgba(11,42,91,0.12) 1px, transparent 1px)',
          backgroundSize: '26px 26px',
          maskImage: 'linear-gradient(to bottom, black, transparent 80%)',
          WebkitMaskImage: 'linear-gradient(to bottom, black, transparent 80%)',
        }}
      />

      <Container className="relative grid items-center gap-16 pb-24 pt-12 sm:pt-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:pb-28 lg:pt-20">
        <div className="min-w-0">
          {offer.active ? (
            <motion.a
              href={whatsappLink(offer.message)}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE }}
              className="inline-flex max-w-full items-center gap-2 rounded-full bg-white py-1.5 pl-1.5 pr-4 text-xs font-medium text-navy-800 shadow-sm ring-1 ring-navy-800/10 transition hover:ring-gold-400 sm:text-[13px]"
            >
              <span className="shrink-0 rounded-full bg-gold-500 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">Offer</span>
              <span className="truncate">{offer.text}</span>
            </motion.a>
          ) : (
            <motion.span initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="pill-gold">
              Your trusted business partner
            </motion.span>
          )}

          <h1 className="mt-7 font-display font-extrabold leading-[1.08] tracking-tight text-navy-800" style={{ fontSize: 'clamp(2.4rem,5.4vw,4.5rem)' }}>
            <span className="sr-only">Your Business. Our Compliance. A Bigger Tomorrow. — {site.name}</span>
            <span aria-hidden="true" className="block">
              <MaskedWords text="Your Business." delay={150} />
            </span>
            <span aria-hidden="true" className="block">
              <MaskedWords text="Our Compliance." delay={350} />
            </span>
            <span aria-hidden="true" className="relative block w-fit">
              <MaskedWords text="A Bigger Tomorrow." delay={550} className="text-gold-500" />
              <svg viewBox="0 0 300 14" className="absolute -bottom-2 left-0 h-3 w-full" fill="none" preserveAspectRatio="none">
                <motion.path
                  d="M2 10 C 80 2, 200 2, 298 8"
                  stroke="#D6A21F"
                  strokeOpacity="0.5"
                  strokeWidth="4"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.2, delay: 1.3, ease: 'easeInOut' }}
                />
              </svg>
            </span>
          </h1>

          <motion.p
            className="mt-8 max-w-xl text-base leading-relaxed text-muted sm:text-lg"
            initial={{ opacity: 0, y: 16, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1, delay: 0.9, ease: EASE }}
          >
            Company registration, GST, trademark, MSME and every licence your business needs — handled end-to-end by experts, 100% online,
            with transparent pricing.
          </motion.p>

          <motion.div
            className="mt-9 flex flex-col gap-3 sm:flex-row"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.1, ease: EASE }}
          >
            <WhatsAppButton size="lg" label="Chat on WhatsApp" source="hero" />
            <CallButton size="lg" label="Talk to an Expert" source="hero" />
          </motion.div>

          <motion.ul
            className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm text-ink/70"
            initial="hidden"
            animate="shown"
            variants={{ hidden: {}, shown: { transition: { staggerChildren: 0.1, delayChildren: 1.3 } } }}
          >
            {[
              { icon: ShieldCheck, t: 'Expert-led filings' },
              { icon: BadgeIndianRupee, t: 'No hidden charges' },
              { icon: Laptop, t: '100% online' },
            ].map(({ icon: Icon, t }) => (
              <motion.li key={t} className="flex items-center gap-2" variants={{ hidden: { opacity: 0, y: 8 }, shown: { opacity: 1, y: 0 } }}>
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gold-50 text-gold-600 ring-1 ring-gold-200">
                  <Icon className="h-3.5 w-3.5" />
                </span>
                {t}
              </motion.li>
            ))}
          </motion.ul>
        </div>

        {/* Visual */}
        <div className="relative mx-auto w-full max-w-[500px] lg:mr-0">
          <motion.div
            className="relative aspect-[4/5] overflow-hidden rounded-[2.25rem] shadow-[0_40px_80px_-30px_rgba(11,42,91,0.45)]"
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.4, delay: 0.2, ease: EASE }}
          >
            <motion.img src="/images/tower.jpg" alt="Modern glass office tower" className="absolute inset-x-0 -top-[5%] h-[115%] w-full object-cover" style={{ y: imgY }} />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-950/45 via-transparent to-transparent" />
          </motion.div>

          <motion.div
            style={{ y: cardY }}
            className="absolute -left-3 bottom-8 w-[220px] rounded-2xl bg-white p-5 shadow-[0_30px_60px_-20px_rgba(11,42,91,0.35)] ring-1 ring-navy-800/5 sm:-left-12 sm:w-[250px]"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 1, ease: EASE }}
          >
            <p className="font-display text-sm font-bold text-navy-800">We handle it all</p>
            <ul className="mt-3 space-y-2.5">
              {heroChecklist.map((t, i) => (
                <motion.li
                  key={t}
                  className="flex items-center gap-2.5 text-[13px] text-ink/75"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.3 + i * 0.12, duration: 0.6, ease: EASE }}
                >
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-gold-500" />
                  {t}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            className="absolute -right-3 top-8 rounded-2xl bg-navy-800 px-5 py-4 text-white shadow-2xl shadow-navy-900/30 sm:-right-6"
            initial={{ opacity: 0, y: -20, rotate: 6 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            transition={{ duration: 1, delay: 1.2, ease: EASE }}
          >
            <p className="font-display text-3xl font-extrabold text-gold-400">{services.length}+</p>
            <p className="text-xs text-white/70">services under one roof</p>
          </motion.div>

          <Scribble text={'From Registration\nto Growth'} arrow="down-right" className="absolute -top-20 left-2 hidden lg:block" />
        </div>
      </Container>
    </section>
  );
}

// ───────────────────────── Trust strip — industries we serve ─────────────────────────

const industries = [
  { icon: Rocket, label: 'Startups' },
  { icon: ShoppingBag, label: 'E-commerce' },
  { icon: Utensils, label: 'Food & Restaurants' },
  { icon: Factory, label: 'Manufacturing' },
  { icon: Truck, label: 'Import / Export' },
  { icon: HeartPulse, label: 'Healthcare' },
  { icon: GraduationCap, label: 'Education' },
  { icon: Building2, label: 'Real Estate' },
  { icon: Store, label: 'Retail Shops' },
  { icon: Briefcase, label: 'Consultants' },
];

function TrustStrip() {
  return (
    <section className="border-y border-navy-800/5 bg-white py-10">
      <Container>
        <p className="text-center text-xs font-bold uppercase tracking-[0.18em] text-subtle">Helping founders across every industry</p>
      </Container>
      <div className="marquee-mask mt-7 overflow-hidden">
        <div className="flex w-max animate-marquee-slow">
          {[...industries, ...industries].map(({ icon: Icon, label }, i) => (
            <span key={i} className="mx-3 flex items-center gap-2.5 rounded-full border border-navy-800/10 bg-cream px-5 py-2.5 text-sm font-semibold text-navy-800/80">
              <Icon className="h-4 w-4 text-gold-600" />
              {label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

// ───────────────────────── Categories ─────────────────────────

const categoryStyle: Record<CategoryId, { icon: typeof Rocket; tint: string; iconBg: string }> = {
  business: { icon: Briefcase, tint: 'from-navy-50 to-white', iconBg: 'bg-navy-800 text-gold-400' },
  government: { icon: FileCheck2, tint: 'from-gold-50 to-white', iconBg: 'bg-gold-500 text-white' },
  other: { icon: ShieldCheck, tint: 'from-emerald-50 to-white', iconBg: 'bg-emerald-600 text-white' },
};

function Categories() {
  return (
    <section className="relative bg-white py-20 sm:py-28">
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="What we do"
            title="Everything You Need to Start & Grow"
            highlight={['Start', 'Grow']}
            text="Registrations, licences and compliance — one partner, one point of contact, zero running around."
          />
          <Reveal delay={200}>
            <Link
              to="/services"
              className="group inline-flex items-center gap-2 rounded-full border border-navy-800/15 bg-white px-6 py-3 text-sm font-semibold text-navy-800 shadow-sm transition hover:border-navy-800 hover:bg-navy-800 hover:text-white"
            >
              View All Services <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>

        <motion.div className="mt-14 grid gap-6 md:grid-cols-3" variants={stagger} {...inView}>
          {categories.map((cat) => {
            const st = categoryStyle[cat.id];
            const list = servicesByCategory(cat.id);
            return (
              <motion.div key={cat.id} variants={cardIn} whileHover={{ y: -8, transition: spring }} className="glass flex h-full flex-col overflow-hidden">
                <div className={`bg-gradient-to-b ${st.tint} px-7 pb-6 pt-7`}>
                  <span className={`flex h-12 w-12 items-center justify-center rounded-2xl shadow-lg ${st.iconBg}`}>
                    <st.icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-5 font-display text-xl font-bold text-navy-800">{cat.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{cat.description}</p>
                </div>
                <ul className="space-y-1 px-4 pb-4">
                  {list.slice(0, 5).map((s) => (
                    <li key={s.slug}>
                      <Link
                        to={`/services/${s.slug}`}
                        className="group flex items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-sm text-ink/80 transition-colors hover:bg-cream hover:text-navy-800"
                      >
                        <span className="flex items-center gap-2.5">
                          <CheckCircle2 className="h-4 w-4 shrink-0 text-gold-500" />
                          {s.shortName}
                        </span>
                        <span className="shrink-0 text-xs font-semibold text-navy-800/60 group-hover:text-gold-700">{formatPrice(s.price)}*</span>
                      </Link>
                    </li>
                  ))}
                </ul>
                {list.length <= 2 && (
                  <div className="mx-4 mb-4 mt-auto rounded-2xl bg-cream p-5">
                    <p className="font-display text-sm font-bold text-navy-800">Need something else?</p>
                    <p className="mt-1 text-sm text-muted">We handle many more documentation and compliance services.</p>
                    <a
                      href={whatsappLink('Hi Regpro, I need help with a service not listed on the website.')}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-gold-700 hover:text-navy-800"
                    >
                      Ask an expert <ArrowRight className="h-4 w-4" />
                    </a>
                  </div>
                )}
                {list.length > 5 && (
                  <Link to="/services" className="mt-auto border-t border-navy-800/5 px-7 py-4 text-sm font-semibold text-navy-800 hover:text-gold-700">
                    +{list.length - 5} more services →
                  </Link>
                )}
              </motion.div>
            );
          })}
        </motion.div>
      </Container>
    </section>
  );
}

// ───────────────────────── Why choose ─────────────────────────

const reasons = [
  { icon: UserCheck, title: 'Expert-led, not DIY', text: 'Every application is prepared and reviewed by professionals who do this every day.' },
  { icon: BadgeIndianRupee, title: 'Transparent pricing', text: 'Clear professional fees upfront. Government fees shown separately — no surprises.' },
  { icon: Laptop, title: '100% online', text: 'Share documents on WhatsApp or email. No office visits, no queues.' },
  { icon: MessageCircle, title: 'Updates on WhatsApp', text: 'Know exactly where your application stands, at every step.' },
  { icon: Clock3, title: 'Fast turnaround', text: 'We file quickly and follow up with departments so you don’t have to.' },
  { icon: ShieldCheck, title: 'Data privacy', text: 'Your documents are used only for your application — never shared.' },
];

function TrackerMock() {
  const steps = ['Documents received', 'Expert review complete', 'Application filed — ARN generated', 'GSTIN approved'];
  return (
    <div className="glass relative p-7 sm:p-9">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-navy-800 text-gold-400">
            <ServiceIcon name="ReceiptIndianRupee" className="h-5 w-5" />
          </span>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-subtle">Application tracker</p>
            <p className="mt-0.5 font-display font-bold text-navy-800">GST Registration</p>
          </div>
        </div>
        <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-200">On track</span>
      </div>
      <div className="mt-7 h-1.5 overflow-hidden rounded-full bg-navy-800/10">
        <div className="tracker-fill h-full rounded-full bg-gradient-to-r from-navy-800 via-navy-600 to-gold-500" />
      </div>
      <ol className="mt-7 space-y-4">
        {steps.map((s, i) => (
          <li key={s} className="tracker-step flex items-center gap-3" style={{ animationDelay: `${0.4 + i * 0.45}s` }}>
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
              <CheckCircle2 className="h-4 w-4" />
            </span>
            <span className="text-sm text-ink/75">{s}</span>
          </li>
        ))}
      </ol>
      <div className="mt-7 flex items-center gap-3 rounded-2xl bg-[#25D366]/10 p-4">
        <MessageCircle className="h-5 w-5 shrink-0 text-[#1a9e4b]" />
        <p className="text-sm text-ink/70">“Good news! Your GST registration is approved. Certificate shared below.”</p>
      </div>
    </div>
  );
}

function WhyChoose() {
  return (
    <section className="sky relative overflow-hidden py-20 sm:py-28">
      <Container className="grid items-center gap-16 lg:grid-cols-2">
        <div>
          <SectionHeading
            eyebrow="Why choose Regpro"
            title="Paperwork handled by experts. Progress you can see."
            highlight={['experts']}
            text="Professional expertise with a simple, digital experience — so registrations feel effortless."
          />
          <motion.div className="mt-12 grid gap-4 sm:grid-cols-2" variants={stagger} {...inView}>
            {reasons.map((r) => (
              <motion.div
                key={r.title}
                variants={cardIn}
                whileHover={{ y: -4 }}
                className="group flex gap-4 rounded-2xl border border-transparent bg-white/70 p-4 transition-colors hover:border-gold-200 hover:bg-white"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gold-50 text-gold-600 ring-1 ring-gold-200 transition-colors duration-300 group-hover:bg-gold-500 group-hover:text-white">
                  <r.icon className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-display text-[15px] font-bold text-navy-800">{r.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted">{r.text}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
        <Reveal delay={150} className="relative">
          <Scribble text="Track every step" arrow="down-right" className="absolute -top-20 left-6 hidden sm:block" />
          <TrackerMock />
        </Reveal>
      </Container>
    </section>
  );
}

// ───────────────────────── Sticky-background CTA band ─────────────────────────

const ctaFeatures = [
  { icon: Search, t: 'Right structure advice' },
  { icon: FileSignature, t: 'Documents prepared for you' },
  { icon: Clock3, t: 'Quick, tracked filing' },
  { icon: Headphones, t: 'Support after approval' },
];

function IdeaToReality() {
  return (
    <section id="enquiry" className="scroll-mt-20">
      <StickyBg image="/images/city-dusk.jpg" overlay="bg-gradient-to-r from-navy-950/90 via-navy-950/75 to-navy-950/45">
        <Container className="grid items-center gap-14 py-24 sm:py-32 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="text-white">
            <span className="inline-flex rounded-full bg-white/10 px-3.5 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-gold-300 ring-1 ring-white/15">
              Get started today
            </span>
            <h2 className="heading-cine mt-5 !text-white" style={{ fontSize: 'clamp(2.1rem,4.4vw,3.6rem)' }}>
              <MaskedWords text="Turn Your Business Idea Into Reality" highlight={['Reality']} />
            </h2>
            <motion.p
              className="mt-5 max-w-lg text-base leading-relaxed text-white/70 sm:text-lg"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.3, ease: EASE }}
            >
              Share a few details and an expert will reach out with the right plan and a clear, fixed quote.
            </motion.p>
            <motion.ul className="mt-10 grid max-w-lg gap-4 sm:grid-cols-2" variants={stagger} {...inView}>
              {ctaFeatures.map(({ icon: Icon, t }) => (
                <motion.li key={t} variants={cardIn} className="flex items-center gap-3 rounded-2xl bg-white/[0.07] p-3.5 ring-1 ring-white/10 backdrop-blur-sm">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gold-500 text-navy-950">
                    <Icon className="h-[18px] w-[18px]" />
                  </span>
                  <span className="text-sm font-medium text-white/90">{t}</span>
                </motion.li>
              ))}
            </motion.ul>
            <Scribble text="Let's Build Something Great" arrow="right" light className="mt-10 hidden lg:block" />
          </div>
          <Reveal delay={150}>
            <LeadForm solid className="!bg-white" />
          </Reveal>
        </Container>
      </StickyBg>
    </section>
  );
}

// ───────────────────────── Process ─────────────────────────

const steps = [
  { icon: MessageCircle, title: 'Share your requirement', text: 'Message us on WhatsApp, call, or fill the enquiry form.', tint: 'bg-navy-50 text-navy-800' },
  { icon: Lightbulb, title: 'Get advice & a quote', text: 'We confirm what you need, the documents and a fixed price.', tint: 'bg-gold-50 text-gold-700' },
  { icon: FileCheck2, title: 'We prepare & file', text: 'Our experts prepare, review and file your application.', tint: 'bg-emerald-50 text-emerald-700' },
  { icon: Rocket, title: 'Receive your certificate', text: 'Track progress on WhatsApp and receive your documents.', tint: 'bg-sky-50 text-sky-700' },
];

function Process() {
  return (
    <section className="relative bg-white py-20 sm:py-28">
      <Container>
        <SectionHeading
          center
          eyebrow="How it works"
          title="Simple 4 Step Process"
          highlight={['4', 'Step']}
          text="A clear, guided process — from first message to final certificate."
        />
        <motion.div className="relative mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4" variants={stagger} {...inView}>
          {steps.map((s, i) => (
            <motion.div key={s.title} variants={cardIn} whileHover={{ y: -6, transition: spring }} className="glass relative p-7 text-center">
              <span className={`relative mx-auto flex h-20 w-20 items-center justify-center rounded-3xl ${s.tint}`}>
                <s.icon className="h-8 w-8" strokeWidth={1.6} />
                <span className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-navy-800 font-display text-xs font-bold text-gold-400 ring-4 ring-white">
                  {i + 1}
                </span>
              </span>
              <h3 className="mt-6 font-display text-lg font-bold text-navy-800">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{s.text}</p>
            </motion.div>
          ))}
        </motion.div>
        <Reveal className="mt-14 flex flex-col justify-center gap-3 sm:flex-row">
          <WhatsAppButton size="lg" label="Start on WhatsApp" source="process" />
          <CallButton size="lg" source="process" />
        </Reveal>
      </Container>
    </section>
  );
}

// ───────────────────────── Stats ─────────────────────────

function CountUp({ to, prefix = '', suffix = '' }: { to: number; prefix?: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const seen = useInView(ref, { once: true });
  const [n, setN] = useState(to);
  useEffect(() => {
    if (!seen) return;
    const c = animate(0, to, { duration: 1.8, ease: EASE, onUpdate: (v) => setN(Math.round(v)) });
    return () => c.stop();
  }, [seen, to]);
  return (
    <span ref={ref}>
      {prefix}
      {n.toLocaleString('en-IN')}
      {suffix}
    </span>
  );
}

function Stats() {
  const minPrice = Math.min(...services.map((s) => s.price));
  const stats = [
    { value: <CountUp to={services.length} suffix="+" />, label: 'Registration & compliance services' },
    { value: <CountUp to={minPrice} prefix="₹" />, label: 'Starting professional fee' },
    { value: <CountUp to={100} suffix="%" />, label: 'Online — no office visits' },
    { value: <CountUp to={6} suffix=" days" />, label: 'A week of expert support' },
  ];
  return (
    <section className="bg-white pb-20 sm:pb-28">
      <Container>
        <motion.div className="dusk grid grid-cols-2 overflow-hidden rounded-[2rem] lg:grid-cols-4" variants={stagger} {...inView}>
          {stats.map((s, i) => (
            <motion.div key={i} variants={cardIn} className="relative px-4 py-8 text-center sm:px-8 sm:py-10">
              {i > 0 && <span className="absolute left-0 top-1/2 hidden h-16 w-px -translate-y-1/2 bg-white/15 lg:block" />}
              <p className="font-display text-3xl font-extrabold text-gold-400 sm:text-5xl">{s.value}</p>
              <p className="mt-2 text-sm text-white/70">{s.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}

// ───────────────────────── Pricing ─────────────────────────

function PricingHighlights() {
  const featured = popularServices.slice(0, 3);
  return (
    <section className="sky relative py-20 sm:py-28">
      <Container>
        <SectionHeading
          center
          eyebrow="Transparent pricing"
          title="Transparent Pricing, No Hidden Charges"
          highlight={['No', 'Hidden', 'Charges']}
          text="Know what you pay before you start. Government fees, where applicable, are shown separately."
        />
        <motion.div className="mt-16 grid gap-6 lg:grid-cols-3 lg:items-center" variants={stagger} {...inView}>
          {featured.map((s, i) => {
            const hl = i === 1;
            return (
              <motion.div
                key={s.slug}
                variants={cardIn}
                whileHover={{ y: -8, transition: spring }}
                className={`relative flex h-full flex-col overflow-hidden p-8 ${hl ? 'dusk rounded-[2rem] text-white shadow-2xl shadow-navy-900/30 lg:py-12' : 'glass'}`}
              >
                {hl && (
                  <span className="absolute right-6 top-6 rounded-full bg-gold-500 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-navy-950">
                    Most popular
                  </span>
                )}
                <span className={`flex h-12 w-12 items-center justify-center rounded-2xl ${hl ? 'bg-white/10 text-gold-400' : 'bg-navy-50 text-navy-800'}`}>
                  <ServiceIcon name={s.icon} className="h-5 w-5" />
                </span>
                <h3 className={`mt-6 font-display text-lg font-bold ${hl ? 'text-white' : 'text-navy-800'}`}>{s.name}</h3>
                <p className={`mt-1 text-sm ${hl ? 'text-white/55' : 'text-subtle'}`}>{s.timeline}</p>
                <div className="mt-7">
                  <p className={`text-xs font-semibold uppercase tracking-wider ${hl ? 'text-white/50' : 'text-subtle'}`}>Starting at</p>
                  <p className={`mt-1 font-display text-5xl font-extrabold ${hl ? 'text-white' : 'text-navy-800'}`}>
                    {formatPrice(s.price)}
                    <span className={`align-super text-base ${hl ? 'text-gold-400' : 'text-gold-600'}`}>*</span>
                  </p>
                </div>
                <ul className="mt-7 flex-1 space-y-3">
                  {s.includes.slice(0, 5).map((inc) => (
                    <li key={inc} className={`flex items-start gap-2.5 text-sm ${hl ? 'text-white/75' : 'text-ink/70'}`}>
                      <CheckCircle2 className={`mt-0.5 h-4 w-4 shrink-0 ${hl ? 'text-gold-400' : 'text-gold-600'}`} />
                      {inc}
                    </li>
                  ))}
                </ul>
                <div className="mt-9 grid gap-3">
                  <WhatsAppButton label="Get started" message={`Hi Regpro, I want to get started with ${s.name}.`} source={`pricing:${s.slug}`} />
                  <Link to={`/services/${s.slug}`} className={`py-2 text-center text-sm font-semibold transition-opacity hover:opacity-70 ${hl ? 'text-white/80' : 'text-navy-800'}`}>
                    View details →
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
        <div className="mt-12 flex flex-col items-center gap-4 text-center">
          <FeeNote />
          <Link
            to="/pricing"
            className="group inline-flex items-center gap-2 rounded-full bg-navy-800 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-navy-900/20 transition hover:-translate-y-0.5 hover:bg-navy-900"
          >
            See pricing for all services <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </Container>
    </section>
  );
}

// ───────────────────────── Who we help ─────────────────────────

const audiences = [
  {
    icon: Rocket,
    title: 'Startups',
    text: 'Incorporate, get DPIIT recognition and protect your brand — investor-ready from day one.',
    slugs: ['private-limited-company-registration', 'dpiit-startup-india-registration', 'trademark-registration'],
  },
  {
    icon: Lightbulb,
    title: 'Entrepreneurs',
    text: 'Choose the right structure, get your GST and MSME registrations, and start selling.',
    slugs: ['opc-registration', 'gst-registration', 'udyam-msme-registration'],
  },
  {
    icon: Store,
    title: 'Small businesses',
    text: 'Licences for shops, food businesses and traders — handled quickly and correctly.',
    slugs: ['shop-establishment-registration', 'fssai-registration', 'gst-registration'],
  },
  {
    icon: Briefcase,
    title: 'Professionals & firms',
    text: 'LLPs, partnerships, DSC and PAN/TAN for consultants and professional practices.',
    slugs: ['llp-registration', 'digital-signature-certificate', 'pan-tan-registration'],
  },
];

function Audiences() {
  return (
    <section className="relative bg-white py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Who we help"
          title="Built for every stage of your business"
          highlight={['every', 'stage']}
          text="Whether you are launching a startup or running an established business, we make compliance simple."
        />
        <motion.div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4" variants={stagger} {...inView}>
          {audiences.map((a) => (
            <motion.div key={a.title} variants={cardIn} whileHover={{ y: -8, transition: spring }} className="glass group h-full p-7">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-gold-400 to-gold-600 text-white shadow-lg shadow-gold-500/30 transition-transform duration-500 group-hover:rotate-3 group-hover:scale-110">
                <a.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-6 font-display text-lg font-bold text-navy-800">{a.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{a.text}</p>
              <ul className="mt-6 space-y-2.5 border-t border-navy-800/10 pt-5">
                {a.slugs.map((slug) => {
                  const s = services.find((x) => x.slug === slug);
                  if (!s) return null;
                  return (
                    <li key={slug}>
                      <Link to={`/services/${slug}`} className="flex items-center justify-between text-sm font-medium text-navy-800 transition-colors hover:text-gold-700">
                        {s.shortName}
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}

// ───────────────────────── Testimonials ─────────────────────────

function TestimonialsSection() {
  return (
    <section className="sky relative overflow-hidden py-20 sm:py-28">
      <Container>
        <SectionHeading center eyebrow="Customer stories" title="Businesses that grew with Regpro" highlight={['grew']} />
      </Container>
      <div className="relative mt-14">
        <Testimonials />
      </div>
    </section>
  );
}

// ───────────────────────── FAQ ─────────────────────────

function FaqSection() {
  return (
    <section className="relative bg-white py-20 sm:py-28">
      <Container className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <SectionHeading eyebrow="FAQs" title="Questions? We’ve got answers." highlight={['answers']} text="Everything you need to know before getting started." />
          <Reveal delay={100}>
            <StickyBg image="/images/city-dusk.jpg" overlay="bg-navy-950/75" rounded="1.75rem" className="mt-10">
              <div className="p-7 text-white sm:p-8">
                <Headphones className="h-7 w-7 text-gold-400" strokeWidth={1.5} />
                <p className="mt-5 font-display text-lg font-bold">Still have questions?</p>
                <p className="mt-2 text-sm text-white/65">Our experts are available {site.hours}.</p>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
                  <WhatsAppButton label="Ask on WhatsApp" source="faq" />
                  <CallButton variant="light" source="faq" />
                </div>
              </div>
            </StickyBg>
          </Reveal>
        </div>
        <Reveal delay={100}>
          <FaqList faqs={generalFaqs.slice(0, 6)} />
          <Link to="/faqs" className="group mt-8 inline-flex items-center gap-2 text-sm font-semibold text-navy-800 hover:text-gold-700">
            View all FAQs <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Reveal>
      </Container>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Seo
        title={`${site.name} — Business Registration, GST & Compliance Services in India`}
        description={site.description}
        path="/"
        jsonLd={[organizationLd(), faqLd(generalFaqs)]}
      />
      <Hero />
      <TrustStrip />
      <Categories />
      <WhyChoose />
      <IdeaToReality />
      <Process />
      <Stats />
      <PricingHighlights />
      <Audiences />
      <TestimonialsSection />
      <FaqSection />
    </>
  );
}
