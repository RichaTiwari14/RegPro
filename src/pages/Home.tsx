import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'motion/react';
import {
  ArrowRight,
  BadgeIndianRupee,
  Briefcase,
  CheckCircle2,
  ChevronDown,
  Clock3,
  FileCheck2,
  Headphones,
  Laptop,
  Lightbulb,
  MessageCircle,
  Phone,
  Rocket,
  ShieldCheck,
  Sparkles,
  Star,
  Store,
  UserCheck,
} from 'lucide-react';
import { Seo, organizationLd, faqLd } from '@/lib/seo';
import { site, whatsappLink } from '@/config/site';
import { categories, services, servicesByCategory, popularServices, formatPrice, type CategoryId } from '@/data/services';
import { generalFaqs } from '@/data/faqs';
import { offer } from '@/data/offers';
import { SectionHeading, WhatsAppButton, CallButton, FeeNote, Container } from '@/components/ui';
import { Reveal, MaskedWords } from '@/components/Reveal';
import { Leaf } from '@/components/Leaf';
import { LeadForm } from '@/components/LeadForm';
import { ServiceIcon } from '@/components/ServiceIcon';
import { Testimonials } from '@/components/Testimonials';
import { FaqList } from '@/components/FaqList';

/** GSAP power3.out, the reference site's easing. */
const EASE = [0.215, 0.61, 0.355, 1] as const;

/** Children rise in one after another as their group scrolls into view. */
const stagger = { hidden: {}, shown: { transition: { staggerChildren: 0.12 } } };
const rise = {
  hidden: { opacity: 0, y: 45, scale: 0.95 },
  shown: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.9, ease: EASE } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 35 },
  shown: { opacity: 1, y: 0, transition: { duration: 0.95, ease: EASE } },
};
const inView = { initial: 'hidden', whileInView: 'shown', viewport: { once: true, margin: '0px 0px -15% 0px' } } as const;
const lift = { y: -6, transition: { type: 'spring', stiffness: 300, damping: 22 } } as const;

const eyebrow = 'text-xs font-semibold uppercase tracking-[0.3em] text-sage-600';

// ───────────────────────── Hero — fixed botanical backdrop, content scrolls away ─────────────────────────

const heroRows = [
  ['Services', 'Company • GST • MSME • Trademark'],
  ['Pricing', `From ${formatPrice(Math.min(...services.map((s) => s.price)))} • No hidden charges`],
  ['Support', 'Expert updates on WhatsApp'],
];

function Hero() {
  return (
    <section className="relative" style={{ clipPath: 'inset(0)' }}>
      {/* Fixed backdrop: stays put while the rounded sheet below slides over it */}
      <div className="pointer-events-none fixed inset-0" aria-hidden="true">
        <img src="/images/hero-bg.svg" alt="" className="h-full w-full object-cover object-right" />
        <div className="absolute inset-0 bg-gradient-to-r from-soft-white/95 via-soft-white/75 to-soft-white/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-soft-white/70 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-soft-white/55 lg:hidden" />
      </div>

      <Leaf className="absolute left-6 top-28 z-10 hidden sm:block lg:left-14" rotate={-15} opacity={0.8} float />
      <Leaf className="absolute right-8 top-32 z-10 lg:right-[44%]" rotate={22} flip width={40} height={94} color="#6E9094" opacity={0.75} float delay={1.2} />
      <Leaf className="absolute bottom-36 left-[46%] z-10 hidden md:block" rotate={-35} width={32} height={76} opacity={0.6} float delay={2.4} />

      <Container className="relative z-10 flex min-h-[100svh] items-center pb-36 pt-32 lg:pb-40 lg:pt-36">
        <div className="grid w-full items-center gap-12 lg:grid-cols-12 lg:gap-8">
          <motion.div
            className="max-w-2xl lg:col-span-7"
            initial="hidden"
            animate="shown"
            variants={{ hidden: {}, shown: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } } }}
          >
            <motion.div variants={fadeUp} className="pill-sage">
              <Sparkles className="h-3.5 w-3.5 text-sage-500" />
              Bengaluru • Registration & Compliance
            </motion.div>

            <motion.h1 variants={fadeUp} className="mt-6 font-display font-semibold leading-[1.02] text-olive-800" style={{ fontSize: 'clamp(3rem,7vw,5.75rem)' }}>
              Register. Comply.
              <br />
              <span className="font-normal italic text-sage-600">Grow with ease.</span>
            </motion.h1>

            <motion.p variants={fadeUp} className="mt-6 max-w-lg text-base leading-relaxed text-muted sm:text-lg">
              Company registration, GST, MSME, trademark &amp; compliance — handled end-to-end by experts, 100% online, with transparent
              pricing and updates on WhatsApp.
            </motion.p>

            <motion.div variants={fadeUp} className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
              <WhatsAppButton size="lg" label="Chat on WhatsApp" source="hero" />
              <Link
                to="/services"
                className="inline-flex items-center justify-center gap-2.5 rounded-full border border-olive-800/25 bg-cream/60 px-7 py-3.5 text-[15px] font-semibold tracking-wide text-olive-800 backdrop-blur-sm transition-all duration-300 hover:bg-olive-800 hover:text-soft-white"
              >
                Explore Services <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>

            {offer.active && (
              <motion.a
                variants={fadeUp}
                href={whatsappLink(offer.message)}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-8 inline-flex max-w-full items-start gap-2.5 text-xs text-olive-800/70 transition-colors hover:text-sage-600 sm:text-[13px]"
              >
                <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-sage-500 transition-transform group-hover:scale-110" />
                <span className="group-hover:underline">{offer.text}</span>
              </motion.a>
            )}
          </motion.div>

          {/* Glass welcome card */}
          <motion.div
            className="lg:col-span-5"
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.75, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="relative overflow-hidden rounded-3xl border border-white/70 bg-cream/85 p-6 shadow-[0_20px_50px_rgba(53,63,34,0.14)] backdrop-blur-md sm:p-9">
              <Leaf className="absolute -bottom-12 -right-6" width={90} height={200} rotate={20} flip color="#83915F" opacity={0.18} />
              <div className="relative">
                <div className="flex items-center justify-between border-b border-mist-300 pb-4">
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-sage-600">Welcome to Regpro</span>
                  <span className="flex items-center gap-1.5 text-xs font-medium text-olive-800/70">
                    <span className="h-2 w-2 animate-pulse rounded-full bg-sage-500" />
                    Mon – Sat
                  </span>
                </div>
                <p className="mt-6 font-display text-2xl italic leading-snug text-olive-800 sm:text-[1.9rem]">
                  &ldquo;Paperwork handled with care — so you can focus on building your business.&rdquo;
                </p>
                <div className="mt-6 space-y-1 text-xs">
                  {heroRows.map(([k, v]) => (
                    <div key={k} className="flex flex-col gap-0.5 border-t border-mist-300/80 py-2.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                      <span className="shrink-0 text-[11px] font-semibold uppercase tracking-wider text-olive-800">{k}</span>
                      <span className="text-olive-800/75 sm:text-right">{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>

      <motion.div
        className="pointer-events-none absolute bottom-20 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-olive-800/50 sm:flex"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.6, duration: 0.8 }}
      >
        <span className="text-[10px] font-medium uppercase tracking-[0.25em]">Scroll to explore</span>
        <ChevronDown className="h-4 w-4 animate-bounce text-sage-500" />
      </motion.div>
    </section>
  );
}

// ───────────────────────── Feature strip ─────────────────────────

const features = [
  { icon: UserCheck, label: 'Expert-led Filings' },
  { icon: BadgeIndianRupee, label: 'Transparent Pricing' },
  { icon: Laptop, label: '100% Online Process' },
];

function FeatureStrip() {
  return (
    <section className="border-b border-mist-300/70">
      <Container>
        <motion.div className="grid divide-y divide-mist-300/70 sm:grid-cols-3 sm:divide-x sm:divide-y-0" variants={stagger} {...inView}>
          {features.map((f) => (
            <motion.div key={f.label} variants={fadeUp} className="flex items-center justify-center gap-3 py-6 sm:py-8">
              <f.icon className="h-5 w-5 text-sage-600" strokeWidth={1.5} />
              <span className="text-sm font-medium tracking-wide text-olive-800/75">{f.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}

// ───────────────────────── Most-loved services ─────────────────────────

const tints = ['from-sage-100 to-cream', 'from-olive-100 to-cream', 'from-sage-50 to-mist-200', 'from-mist-200 to-sage-100'];

function Favorites() {
  const picks = popularServices.slice(0, 4);
  return (
    <section className="py-24 lg:py-32">
      <Container>
        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <Leaf className="absolute -left-8 -top-8 hidden md:block" width={38} height={90} rotate={-30} opacity={0.4} float />
          <SectionHeading eyebrow="Most-loved services" title="Registered with Confidence" highlight={['Confidence']} />
          <Reveal delay={150} className="lg:max-w-xs">
            <p className="text-sm leading-relaxed text-muted">The registrations our clients ask for most. Tap any card for documents, process and pricing.</p>
            <Link
              to="/services"
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-olive-800 px-6 py-3 text-sm font-semibold tracking-wide text-soft-white shadow-sm transition-colors duration-300 hover:bg-olive-950"
            >
              View All Services <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </Reveal>
        </div>

        <motion.div className="mt-16 grid gap-7 sm:grid-cols-2 lg:grid-cols-4" variants={stagger} {...inView}>
          {picks.map((s, i) => (
            <motion.div key={s.slug} variants={rise} whileHover={lift}>
              <Link
                to={`/services/${s.slug}`}
                className="group block h-full rounded-3xl border border-mist-300/80 bg-cream/50 p-4 shadow-sm transition-[background-color,box-shadow,border-color] duration-300 hover:border-sage-300 hover:bg-cream hover:shadow-xl hover:shadow-olive-900/10"
              >
                <div className={`relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br ${tints[i % tints.length]}`}>
                  <Leaf className="absolute -bottom-10 -right-2" width={70} height={160} rotate={24} flip color="#83915F" opacity={0.25} />
                  <Leaf className="absolute -left-3 -top-8" width={44} height={104} rotate={-150} color="#6E9094" opacity={0.2} />
                  <span className="flex h-20 w-20 items-center justify-center rounded-full bg-soft-white/90 text-olive-800 shadow-lg shadow-olive-900/10 transition-transform duration-700 ease-out group-hover:scale-110">
                    <ServiceIcon name={s.icon} className="h-8 w-8" />
                  </span>
                  <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-olive-800/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-soft-white backdrop-blur-md">
                    <Star className="h-2.5 w-2.5 fill-sage-200 text-sage-200" /> Top pick
                  </span>
                  <span className="absolute bottom-3 right-3 inline-flex items-center gap-1 rounded-full bg-soft-white/95 px-2.5 py-0.5 text-xs font-semibold text-olive-800 shadow">
                    <Clock3 className="h-3 w-3 text-sage-600" /> {s.timeline}
                  </span>
                </div>
                <div className="px-1 pb-1 pt-4">
                  <span className="mb-1 block text-[11px] font-medium uppercase tracking-wider text-sage-600">
                    {categories.find((c) => c.id === s.category)?.short}
                  </span>
                  <div className="flex items-baseline justify-between gap-2">
                    <h3 className="font-display text-2xl font-semibold leading-tight text-olive-800 transition-colors duration-300 group-hover:text-sage-700">{s.shortName}</h3>
                    <span className="shrink-0 rounded-lg bg-sage-500/10 px-2 py-0.5 font-display text-xl font-semibold text-sage-700">{formatPrice(s.price)}*</span>
                  </div>
                  <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-muted">{s.summary}</p>
                  <div className="mt-4 flex items-center justify-between border-t border-mist-300/70 pt-3 text-xs font-medium text-sage-700">
                    <span className="group-hover:underline">View details</span>
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-sage-100 transition-colors group-hover:bg-olive-800 group-hover:text-soft-white">
                      <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}

// ───────────────────────── Categories ─────────────────────────

const categoryIcons: Record<CategoryId, typeof Rocket> = { business: Briefcase, government: FileCheck2, other: ShieldCheck };

function Categories() {
  return (
    <section className="sky relative overflow-hidden py-24 lg:py-32">
      <Leaf className="absolute right-[8%] top-16 hidden lg:block" rotate={30} flip color="#6E9094" opacity={0.35} float />
      <Container>
        <SectionHeading
          center
          eyebrow="What we do"
          title="Everything You Need, in One Place"
          highlight={['One', 'Place']}
          text="Registrations, licences and compliance — one partner, one point of contact, zero running around."
        />
        <motion.div className="mt-16 grid gap-6 md:grid-cols-3" variants={stagger} {...inView}>
          {categories.map((cat) => {
            const Icon = categoryIcons[cat.id];
            const list = servicesByCategory(cat.id);
            return (
              <motion.div key={cat.id} variants={rise} whileHover={lift} className="glass flex h-full flex-col p-8">
                <span className="flex h-14 w-14 items-center justify-center rounded-full border border-mist-300 bg-cream">
                  <Icon className="h-6 w-6 text-sage-600" strokeWidth={1.5} />
                </span>
                <h3 className="mt-6 font-display text-[1.7rem] font-semibold leading-tight text-olive-800">{cat.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{cat.description}</p>
                <ul className="mt-6 flex-1 space-y-1 border-t border-mist-300/70 pt-4">
                  {list.slice(0, 5).map((s) => (
                    <li key={s.slug}>
                      <Link
                        to={`/services/${s.slug}`}
                        className="group flex items-center justify-between gap-3 rounded-xl px-2 py-2 text-sm text-olive-800/80 transition-colors hover:bg-sage-50 hover:text-olive-800"
                      >
                        <span className="flex items-center gap-2.5">
                          <CheckCircle2 className="h-4 w-4 shrink-0 text-sage-500" />
                          {s.shortName}
                        </span>
                        <span className="shrink-0 text-xs font-semibold text-sage-700">{formatPrice(s.price)}*</span>
                      </Link>
                    </li>
                  ))}
                </ul>
                {list.length > 5 ? (
                  <Link to="/services" className="mt-3 px-2 text-sm font-semibold text-olive-800 hover:text-sage-600">
                    +{list.length - 5} more services →
                  </Link>
                ) : list.length <= 2 ? (
                  <a
                    href={whatsappLink('Hi Regpro, I need help with a service not listed on the website.')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 rounded-2xl bg-cream p-4 text-sm text-muted transition-colors hover:bg-sage-50"
                  >
                    <span className="block font-display text-lg font-semibold text-olive-800">Need something else?</span>
                    We handle many more documentation services. <span className="font-semibold text-sage-700">Ask an expert →</span>
                  </a>
                ) : null}
              </motion.div>
            );
          })}
        </motion.div>
      </Container>
    </section>
  );
}

// ───────────────────────── About ─────────────────────────

const benefits = [
  { icon: UserCheck, label: 'Expert-assisted filing' },
  { icon: MessageCircle, label: 'Updates on WhatsApp' },
  { icon: ShieldCheck, label: 'Your data stays private' },
];

function AboutBlock() {
  return (
    <section className="py-24 lg:py-32">
      <Container className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: '0px 0px -20% 0px' }}
          transition={{ duration: 1.2, ease: EASE }}
        >
          <Leaf className="absolute -left-5 -top-7 z-10" rotate={-25} color="#65733F" opacity={0.85} float />
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl shadow-2xl shadow-olive-900/10">
            <img src="/images/tower.jpg" alt="" className="h-full w-full object-cover" loading="lazy" />
          </div>
          <motion.div
            className="absolute -bottom-6 -right-3 rounded-2xl border border-mist-300/60 bg-soft-white p-5 shadow-xl shadow-olive-900/10 lg:-right-8"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
          >
            <p className="font-display text-xl italic leading-snug text-olive-800">
              Register. Comply.
              <br />
              Grow. ♥
            </p>
          </motion.div>
        </motion.div>

        <motion.div className="relative" variants={stagger} {...inView}>
          <Leaf className="absolute -top-10 right-0 hidden sm:block" rotate={35} flip color="#88A7AA" opacity={0.45} float delay={1} />
          <motion.p variants={fadeUp} className={eyebrow}>
            About Regpro
          </motion.p>
          <motion.h2 variants={fadeUp} className="heading-cine mt-3" style={{ fontSize: 'clamp(2.4rem,4.2vw,3.6rem)' }}>
            A Partner That
            <br />
            <span className="font-normal italic text-sage-600">Has Your Back</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-6 max-w-lg text-base leading-relaxed text-muted">
            {site.name} helps startups, entrepreneurs, professionals and small businesses with registrations, government documentation and
            compliance. We tell you exactly what you need, prepare and file your applications, and keep you updated on WhatsApp until you
            receive your certificate.
          </motion.p>
          <motion.div variants={fadeUp} className="mt-8">
            <Link
              to="/about"
              className="inline-flex items-center gap-2 rounded-full bg-olive-800 px-6 py-3 text-sm font-semibold tracking-wide text-soft-white transition-colors duration-300 hover:bg-olive-950"
            >
              Our Story <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </motion.div>
          <motion.div variants={stagger} className="mt-10 grid grid-cols-3 gap-3 sm:gap-4">
            {benefits.map((b) => (
              <motion.div
                key={b.label}
                variants={rise}
                className="flex flex-col items-center rounded-2xl border border-mist-300/80 bg-cream/50 p-3 text-center sm:p-4 backdrop-blur-sm transition-all duration-300 hover:border-sage-300 hover:bg-soft-white"
              >
                <span className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-sage-50">
                  <b.icon className="h-5 w-5 text-sage-600" strokeWidth={1.5} />
                </span>
                <span className="text-xs font-medium text-olive-800/75">{b.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}

// ───────────────────────── Why choose — deep olive ─────────────────────────

const reasons = [
  { title: 'Expert-led, not DIY', text: 'Every application is prepared and reviewed by professionals who do this every day.' },
  { title: 'Transparent pricing', text: 'Clear professional fees upfront. Government fees shown separately — no surprises.' },
  { title: '100% online', text: 'Share documents on WhatsApp or email. No office visits, no queues.' },
  { title: 'Updates on WhatsApp', text: 'Know exactly where your application stands, at every step.' },
  { title: 'Fast turnaround', text: 'We file quickly and follow up with departments so you don’t have to.' },
  { title: 'Data privacy', text: 'Your documents are used only for your application — never shared.' },
];

function WhyChoose() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const g1 = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const g2 = useTransform(scrollYProgress, [0, 1], [-40, 40]);
  return (
    <section ref={ref} className="relative overflow-hidden bg-olive-900 py-28 lg:py-40">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <motion.div style={{ y: g1 }} className="absolute left-[18%] top-10 h-72 w-72 rounded-full bg-sage-500/20 blur-3xl" />
        <motion.div style={{ y: g2 }} className="absolute bottom-10 right-[12%] h-56 w-56 rounded-full bg-olive-300/15 blur-3xl" />
      </div>
      <Leaf className="absolute bottom-10 left-8 hidden lg:block" rotate={-20} color="#88A7AA" vein="#283019" opacity={0.3} float />
      <Container className="relative grid items-center gap-16 lg:grid-cols-2">
        <motion.div variants={stagger} {...inView}>
          <motion.p variants={fadeUp} className="text-xs font-medium uppercase tracking-[0.3em] text-sage-300/80">
            Why Regpro
          </motion.p>
          <motion.h2 variants={fadeUp} className="mt-6 font-display font-semibold leading-[1.08] text-soft-white" style={{ fontSize: 'clamp(2.8rem,5.5vw,4.6rem)' }}>
            Expert Help.
            <br />
            Clear Pricing.
            <br />
            Zero Stress.
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-8 font-display text-2xl italic text-soft-white/45">
            It&apos;s more than paperwork.
            <br />
            It&apos;s peace of mind. ♥
          </motion.p>
        </motion.div>

        <motion.div variants={stagger} {...inView}>
          <motion.div variants={fadeUp} className="mb-8 border-l-2 border-sage-400/40 pl-8">
            <p className="font-display text-2xl leading-relaxed text-soft-white/85">&ldquo;Paperwork handled by experts. Progress you can see.&rdquo;</p>
            <div className="mt-4 flex items-center gap-3">
              <span className="h-px w-8 bg-sage-400/50" />
              <span className="text-sm font-medium tracking-wide text-sage-300/90">The Regpro promise</span>
            </div>
          </motion.div>
          <motion.div variants={stagger} className="grid gap-4 sm:grid-cols-2">
            {reasons.map((r) => (
              <motion.div
                key={r.title}
                variants={rise}
                whileHover={{ y: -4 }}
                className="rounded-2xl border border-soft-white/10 bg-soft-white/5 p-5 backdrop-blur-sm transition-colors hover:bg-soft-white/10"
              >
                <span className="mb-1 block text-xs font-medium uppercase tracking-wider text-sage-300/90">{r.title}</span>
                <p className="text-sm text-soft-white/65">{r.text}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}

// ───────────────────────── Process ─────────────────────────

const steps = [
  { icon: MessageCircle, title: 'Share your requirement', text: 'Message us on WhatsApp, call, or fill the enquiry form.' },
  { icon: Lightbulb, title: 'Get advice & a quote', text: 'We confirm what you need, the documents and a fixed price.' },
  { icon: FileCheck2, title: 'We prepare & file', text: 'Our experts prepare, review and file your application.' },
  { icon: Rocket, title: 'Receive your certificate', text: 'Track progress on WhatsApp and receive your documents.' },
];

function Process() {
  return (
    <section className="py-24 lg:py-32">
      <Container>
        <SectionHeading center eyebrow="How it works" title="Four Simple Steps" highlight={['Simple', 'Steps']} text="A clear, guided process — from first message to final certificate." />
        <motion.div className="relative mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4" variants={stagger} {...inView}>
          {steps.map((s, i) => (
            <motion.div key={s.title} variants={rise} whileHover={lift} className="glass relative p-8 text-center">
              <span className="absolute right-6 top-5 font-display text-5xl italic text-sage-200">0{i + 1}</span>
              <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-mist-300 bg-cream">
                <s.icon className="h-7 w-7 text-sage-600" strokeWidth={1.5} />
              </span>
              <h3 className="mt-6 font-display text-2xl font-semibold text-olive-800">{s.title}</h3>
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

// ───────────────────────── Pricing ─────────────────────────

function PricingHighlights() {
  const featured = popularServices.slice(0, 3);
  return (
    <section className="sky relative overflow-hidden py-24 lg:py-32">
      <Leaf className="absolute left-[6%] top-24 hidden lg:block" rotate={-25} opacity={0.35} float />
      <Container>
        <SectionHeading
          center
          eyebrow="Transparent pricing"
          title="Honest Prices, No Surprises"
          highlight={['No', 'Surprises']}
          text="Know what you pay before you start. Government fees, where applicable, are shown separately."
        />
        <motion.div className="mt-16 grid gap-7 lg:grid-cols-3 lg:items-center" variants={stagger} {...inView}>
          {featured.map((s, i) => {
            const hl = i === 1;
            return (
              <motion.div
                key={s.slug}
                variants={rise}
                whileHover={lift}
                className={`relative flex h-full flex-col overflow-hidden rounded-3xl p-8 ${hl ? 'bg-olive-800 text-soft-white shadow-2xl shadow-olive-900/25 lg:py-12' : 'glass'}`}
              >
                {hl && (
                  <>
                    <Leaf className="absolute -bottom-10 -right-6" width={90} height={200} rotate={20} color="#FBFBF8" vein="#353F22" opacity={0.12} />
                    <span className="absolute right-6 top-6 rounded-full bg-sage-200 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-olive-900">
                      Most popular
                    </span>
                  </>
                )}
                <span className={`flex h-12 w-12 items-center justify-center rounded-full ${hl ? 'bg-soft-white/10 text-sage-200' : 'border border-mist-300 bg-cream text-sage-600'}`}>
                  <ServiceIcon name={s.icon} className="h-5 w-5" />
                </span>
                <h3 className={`mt-6 font-display text-2xl font-semibold ${hl ? 'text-soft-white' : 'text-olive-800'}`}>{s.name}</h3>
                <p className={`mt-1 text-sm ${hl ? 'text-soft-white/55' : 'text-subtle'}`}>{s.timeline}</p>
                <div className="mt-6">
                  <p className={`text-xs font-semibold uppercase tracking-wider ${hl ? 'text-soft-white/50' : 'text-subtle'}`}>Starting at</p>
                  <p className={`mt-1 font-display text-5xl font-semibold ${hl ? 'text-soft-white' : 'text-olive-800'}`}>
                    {formatPrice(s.price)}
                    <span className={`align-super text-base ${hl ? 'text-sage-200' : 'text-sage-600'}`}>*</span>
                  </p>
                </div>
                <ul className="mt-6 flex-1 space-y-3">
                  {s.includes.slice(0, 5).map((inc) => (
                    <li key={inc} className={`flex items-start gap-2.5 text-sm ${hl ? 'text-soft-white/75' : 'text-ink/70'}`}>
                      <CheckCircle2 className={`mt-0.5 h-4 w-4 shrink-0 ${hl ? 'text-sage-200' : 'text-sage-500'}`} />
                      {inc}
                    </li>
                  ))}
                </ul>
                <div className="mt-8 grid gap-3">
                  <WhatsAppButton label="Get started" message={`Hi Regpro, I want to get started with ${s.name}.`} source={`pricing:${s.slug}`} />
                  <Link to={`/services/${s.slug}`} className={`py-2 text-center text-sm font-semibold transition-opacity hover:opacity-70 ${hl ? 'text-soft-white/80' : 'text-olive-800'}`}>
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
            className="group inline-flex items-center gap-2 rounded-full bg-olive-800 px-6 py-3 text-sm font-semibold tracking-wide text-soft-white transition-colors hover:bg-olive-950"
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
    <section className="py-24 lg:py-32">
      <Container>
        <SectionHeading
          eyebrow="Who we help"
          title="Built for Every Stage of Business"
          highlight={['Every', 'Stage']}
          text="Whether you are launching a startup or running an established business, we make compliance simple."
        />
        <motion.div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4" variants={stagger} {...inView}>
          {audiences.map((a) => (
            <motion.div key={a.title} variants={rise} whileHover={lift} className="glass group h-full p-7">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-sage-50 text-sage-600 transition-colors duration-300 group-hover:bg-olive-800 group-hover:text-soft-white">
                <a.icon className="h-5 w-5" strokeWidth={1.5} />
              </span>
              <h3 className="mt-6 font-display text-2xl font-semibold text-olive-800">{a.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{a.text}</p>
              <ul className="mt-6 space-y-2.5 border-t border-mist-300/70 pt-5">
                {a.slugs.map((slug) => {
                  const s = services.find((x) => x.slug === slug);
                  if (!s) return null;
                  return (
                    <li key={slug}>
                      <Link to={`/services/${slug}`} className="flex items-center justify-between text-sm font-medium text-olive-800 transition-colors hover:text-sage-600">
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
    <section className="sky relative overflow-hidden py-24 lg:py-32">
      <Container>
        <SectionHeading center eyebrow="Customer stories" title="What Our Clients Say" highlight={['Clients']} />
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
    <section className="py-24 lg:py-32">
      <Container className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <SectionHeading eyebrow="FAQs" title="Questions? We’ve Got Answers." highlight={['Answers']} text="Everything you need to know before getting started." />
          <Reveal delay={100}>
            <div className="relative mt-10 overflow-hidden rounded-3xl bg-olive-800 p-8 text-soft-white">
              <Leaf className="absolute -bottom-12 -right-4" width={90} height={200} rotate={20} color="#FBFBF8" vein="#353F22" opacity={0.12} />
              <Headphones className="h-7 w-7 text-sage-200" strokeWidth={1.5} />
              <p className="mt-5 font-display text-2xl font-semibold">Still have questions?</p>
              <p className="mt-2 text-sm text-soft-white/65">Our experts are available {site.hours}.</p>
              <div className="relative mt-6 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
                <WhatsAppButton label="Ask on WhatsApp" source="faq" />
                <CallButton variant="light" source="faq" />
              </div>
            </div>
          </Reveal>
        </div>
        <Reveal delay={100}>
          <FaqList faqs={generalFaqs.slice(0, 6)} />
          <Link to="/faqs" className="group mt-8 inline-flex items-center gap-2 text-sm font-semibold text-olive-800 hover:text-sage-600">
            View all FAQs <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Reveal>
      </Container>
    </section>
  );
}

// ───────────────────────── CTA — fixed backdrop + glass card ─────────────────────────

function Cta() {
  return (
    <section id="enquiry" className="relative scroll-mt-16 overflow-hidden py-28 lg:py-40" style={{ clipPath: 'inset(0)' }}>
      <div className="pointer-events-none fixed inset-0" aria-hidden="true">
        <img src="/images/city-dusk.jpg" alt="" className="h-full w-full object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-b from-olive-950/90 via-olive-900/85 to-olive-950/90" />
      </div>
      <Leaf className="absolute left-8 top-8 z-10 lg:left-16" rotate={-25} color="#A6BFC1" vein="#C9D2B5" opacity={0.6} float />
      <Leaf className="absolute bottom-8 right-10 z-10 lg:right-20" width={55} height={130} rotate={30} flip color="#A6BFC1" vein="#C9D2B5" opacity={0.6} float delay={1.5} />

      <Container className="relative z-10">
        <motion.div
          className="relative grid items-center gap-10 overflow-hidden rounded-3xl border border-soft-white/20 bg-soft-white/10 p-6 shadow-[0_30px_70px_rgba(0,0,0,0.35)] backdrop-blur-md sm:p-10 lg:grid-cols-[1.05fr_0.95fr] lg:p-14"
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: '0px 0px -20% 0px' }}
          transition={{ duration: 1.1, ease: EASE }}
        >
          <Leaf className="absolute -bottom-8 -left-8" width={130} height={280} rotate={-20} color="#FBFBF8" vein="#65733F" opacity={0.12} />
          <motion.div className="relative text-center lg:text-left" variants={stagger} {...inView}>
            <motion.div
              variants={fadeUp}
              className="inline-flex items-center gap-2 rounded-full border border-soft-white/25 bg-soft-white/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-soft-white/90"
            >
              <Sparkles className="h-3.5 w-3.5 text-sage-200" /> Get started today
            </motion.div>
            <motion.h2 variants={fadeUp} className="mt-6 font-display font-semibold leading-[1.08] text-soft-white" style={{ fontSize: 'clamp(2.4rem,5vw,4rem)' }}>
              <MaskedWords text="Your Business Deserves" />
              <br />
              <span className="font-normal italic text-sage-200">a Smooth Start</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="mx-auto mt-5 max-w-md text-base leading-relaxed text-soft-white/80 sm:text-lg lg:mx-0">
              Share a few details and an expert will reach out with the right plan and a clear, fixed quote.
            </motion.p>
            <motion.div variants={fadeUp} className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start">
              <WhatsAppButton size="lg" source="cta" />
              <a href={site.phoneHref} className="inline-flex items-center gap-2 text-sm text-soft-white/75 transition-colors hover:text-soft-white">
                <Phone className="h-4 w-4 text-sage-200" /> Or call us: {site.phone}
              </a>
            </motion.div>
          </motion.div>
          <div className="relative">
            <LeadForm solid className="!border-soft-white/40 !bg-cream" />
          </div>
        </motion.div>
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
      {/* Everything below slides up over the fixed hero backdrop on a rounded sheet */}
      <div className="relative z-10 -mt-[54px] overflow-hidden rounded-t-[36px] bg-soft-white shadow-[0_-25px_60px_rgba(36,41,28,0.14)] sm:rounded-t-[54px]">
        <FeatureStrip />
        <Favorites />
        <Categories />
        <AboutBlock />
        <WhyChoose />
        <Process />
        <PricingHighlights />
        <Audiences />
        <TestimonialsSection />
        <FaqSection />
        <Cta />
      </div>
    </>
  );
}
