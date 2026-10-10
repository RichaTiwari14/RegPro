import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  ArrowLeft,
  ArrowRight,
  BadgeIndianRupee,
  Briefcase,
  CheckCircle2,
  Clock3,
  FileCheck2,
  Laptop,
  Lightbulb,
  MapPin,
  MessageCircle,
  Phone,
  Rocket,
  ShieldCheck,
  Star,
  UserCheck,
} from 'lucide-react';
import { Seo, organizationLd, faqLd } from '@/lib/seo';
import { site, whatsappLink } from '@/config/site';
import { categories, getService, servicesByCategory, formatPrice, type CategoryId } from '@/data/services';
import { generalFaqs } from '@/data/faqs';
import { offer } from '@/data/offers';
import { testimonials } from '@/data/testimonials';
import { Container, Eyebrow, SectionHeading, WhatsAppButton, CallButton, FeeNote } from '@/components/ui';
import { Reveal, MaskedWords } from '@/components/Reveal';
import { Leaf } from '@/components/Leaf';
import { LogoMark } from '@/components/Logo';
import { LeadForm } from '@/components/LeadForm';
import { FaqList } from '@/components/FaqList';

const EASE = [0.22, 1, 0.36, 1] as const;
const stagger = { hidden: {}, shown: { transition: { staggerChildren: 0.1 } } };
const fadeUp = { hidden: { opacity: 0, y: 28 }, shown: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } } };
const inView = { initial: 'hidden', whileInView: 'shown', viewport: { once: true, margin: '0px 0px -12% 0px' } } as const;

/** Text set on a circle that slowly turns — the round stamp beside the hero photo. */
function RotatingBadge({ className = '' }: { className?: string }) {
  const text = 'REGPRO • REGISTER • COMPLY • GROW • ';
  return (
    <div className={`relative flex h-28 w-28 items-center justify-center rounded-full bg-soft-white shadow-lg shadow-ink/10 ${className}`}>
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full animate-spin-slow" aria-hidden="true">
        <defs>
          <path id="badge-circle" d="M50 50 m-36 0 a36 36 0 1 1 72 0 a36 36 0 1 1 -72 0" />
        </defs>
        <text fontSize="7.8" fill="#1E221E" fontFamily="Inter, sans-serif" fontWeight="600">
          <textPath href="#badge-circle" textLength="224" lengthAdjust="spacing">
            {text}
          </textPath>
        </text>
      </svg>
      <LogoMark className="relative h-8 w-auto" />
    </div>
  );
}

// ───────────────────────── Hero ─────────────────────────

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <Container className="relative grid items-center gap-12 pb-16 pt-10 sm:pt-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:pb-24 lg:pt-16">
        <motion.div initial="hidden" animate="shown" variants={{ hidden: {}, shown: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } } }}>
          <motion.p variants={fadeUp} className="eyebrow">
            Business registration in Bengaluru
          </motion.p>
          <motion.h1 variants={fadeUp} className="heading-cine mt-6" style={{ fontSize: 'clamp(3rem,6.6vw,5.6rem)', lineHeight: 1.02 }}>
            More Than
            <br />
            Just <span className="italic text-olive-700">Paperwork.</span>
          </motion.h1>
          <motion.p variants={fadeUp} className="mt-6 max-w-md text-base leading-relaxed text-muted sm:text-[17px]">
            Company registration, GST, MSME, trademark and compliance — handled by real experts, 100% online, with transparent pricing.
          </motion.p>
          <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-3">
            <Link to="/services" className="btn-primary">
              Explore Services <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/contact" className="btn-light">
              Contact Us
            </Link>
          </motion.div>
          <motion.div variants={fadeUp} className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
            <div className="flex items-center gap-3">
              <div className="flex -space-x-3">
                {[1, 2, 3].map((n) => (
                  <img key={n} src={`/photos/avatar-${n}.jpg`} alt="" className="h-11 w-11 rounded-full object-cover ring-2 ring-cream" />
                ))}
              </div>
              <p className="text-xs leading-snug text-muted">
                Trusted by founders
                <br />
                across India
              </p>
            </div>
            <span className="hidden h-10 w-px bg-mist-400 sm:block" />
            <p className="font-script text-2xl leading-[1.05] text-ink">
              <span className="border-b border-ink/60">Less Paperwork</span>
              <br />
              <span className="border-b border-ink/60">Faster Growth</span>
            </p>
          </motion.div>
        </motion.div>

        <div className="relative mx-auto w-full max-w-[460px] lg:mr-6">
          <motion.div
            className="relative aspect-[4/5] overflow-hidden rounded-t-full bg-mist-200 shadow-[0_40px_80px_-40px_rgba(30,34,30,0.45)]"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2, ease: EASE }}
          >
            <motion.img
              src="/photos/hero.jpg"
              alt="A Regpro consultant meeting a client"
              className="h-full w-full object-cover"
              initial={{ scale: 1.12 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.8, delay: 0.2, ease: EASE }}
            />
          </motion.div>
          <motion.div
            className="absolute -right-4 top-6 sm:-right-10"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.9, duration: 0.8, ease: EASE }}
          >
            <RotatingBadge />
          </motion.div>
          <Leaf className="absolute -right-20 top-32 hidden xl:block" rotate={28} width={46} height={110} color="#97A38B" opacity={0.9} float />
          <motion.ul
            className="absolute -right-28 bottom-6 hidden space-y-3 text-sm text-ink/80 xl:block"
            initial="hidden"
            animate="shown"
            variants={{ hidden: {}, shown: { transition: { staggerChildren: 0.12, delayChildren: 1.1 } } }}
          >
            {['Register', 'Comply', 'Grow', 'Thrive'].map((w) => (
              <motion.li key={w} variants={{ hidden: { opacity: 0, x: 10 }, shown: { opacity: 1, x: 0 } }}>
                {w}
              </motion.li>
            ))}
            <li className="h-px w-6 bg-ink/60" />
          </motion.ul>
        </div>
      </Container>
    </section>
  );
}

// ───────────────────────── Feature strip ─────────────────────────

const features = [
  { icon: UserCheck, title: 'Expert-led Filings', sub: 'Reviewed by professionals' },
  { icon: BadgeIndianRupee, title: 'Transparent Fees', sub: 'No hidden charges' },
  { icon: Laptop, title: '100% Online', sub: 'No office visits' },
  { icon: MessageCircle, title: 'WhatsApp Updates', sub: 'At every step' },
];

function FeatureStrip() {
  return (
    <section className="border-y border-mist-300 bg-soft-white">
      <Container>
        <motion.div className="grid grid-cols-2 lg:grid-cols-4" variants={stagger} {...inView}>
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              variants={fadeUp}
              className={`flex flex-col items-center px-2 py-8 text-center sm:py-10 ${i % 2 === 1 ? 'border-l border-mist-300' : ''} ${
                i === 2 ? 'border-t border-mist-300 lg:border-l lg:border-t-0' : ''
              } ${i === 3 ? 'border-t lg:border-t-0' : ''}`}
            >
              <f.icon className="h-6 w-6 text-ink" strokeWidth={1.5} />
              <p className="mt-3 font-display text-lg text-ink">{f.title}</p>
              <p className="mt-0.5 text-sm text-muted">{f.sub}</p>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}

// ───────────────────────── Popular services carousel ─────────────────────────

const carousel = [
  'private-limited-company-registration',
  'gst-registration',
  'udyam-msme-registration',
  'trademark-registration',
  'llp-registration',
  'dpiit-startup-india-registration',
  'iec-registration',
  'fssai-registration',
];

function PopularServices() {
  const track = useRef<HTMLDivElement>(null);
  const scroll = (dir: number) => {
    const el = track.current;
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: 'smooth' });
  };
  const list = carousel.map((slug) => getService(slug)).filter((s): s is NonNullable<typeof s> => Boolean(s));
  return (
    <section className="py-20 lg:py-28">
      <Container>
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <SectionHeading eyebrow="Our services" title="Popular Services" text="Our most requested registrations — prepared, filed and followed up by experts." />
            <Reveal delay={200} className="mt-6">
              <Link to="/services" className="link-underline">
                View All Services <ArrowRight className="h-4 w-4" />
              </Link>
            </Reveal>
          </div>
          <div className="hidden gap-2 sm:flex">
            {[-1, 1].map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => scroll(d)}
                aria-label={d < 0 ? 'Previous services' : 'Next services'}
                className="flex h-11 w-11 items-center justify-center rounded-full bg-soft-white text-ink shadow-sm ring-1 ring-mist-300 transition hover:bg-olive-800 hover:text-soft-white"
              >
                {d < 0 ? <ArrowLeft className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}
              </button>
            ))}
          </div>
        </div>
      </Container>
      <div
        ref={track}
        data-lenis-prevent
        className="mt-12 flex snap-x snap-mandatory scroll-px-5 gap-5 overflow-x-auto pb-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        style={{ paddingInline: 'max(1.25rem, calc((100vw - 80rem) / 2 + 2rem))' }}
      >
        {list.map((s, i) => (
          <motion.div
            key={s.slug}
            className="w-[78%] shrink-0 snap-start sm:w-[46%] lg:w-[calc(25%-15px)]"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: (i % 4) * 0.1, ease: EASE }}
          >
            <Link
              to={`/services/${s.slug}`}
              className="group flex h-full flex-col overflow-hidden rounded-2xl border border-mist-300/80 bg-soft-white shadow-sm transition-all duration-500 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-ink/10"
            >
              <div className="aspect-[4/3] overflow-hidden bg-mist-200">
                <img
                  src={`/photos/services/${s.slug}.jpg`}
                  alt={s.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col px-5 pb-6 pt-5 text-center">
                <h3 className="font-display text-xl text-ink">{s.shortName}</h3>
                <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-muted">{s.summary}</p>
                <p className="mt-5 text-lg font-semibold text-olive-800">
                  {formatPrice(s.price)}
                  <span className="text-xs font-normal text-subtle"> onwards*</span>
                </p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// ───────────────────────── About ─────────────────────────

function AboutBlock() {
  return (
    <section className="pb-20 lg:pb-28">
      <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <motion.div
          className="relative overflow-hidden rounded-3xl bg-mist-200 shadow-[0_30px_60px_-30px_rgba(30,34,30,0.4)]"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '0px 0px -15% 0px' }}
          transition={{ duration: 1.1, ease: EASE }}
        >
          <img src="/photos/about.jpg" alt="A founder reviewing registration documents" loading="lazy" className="aspect-[4/3] w-full object-cover" />
          <p className="absolute right-6 top-6 text-right font-script text-3xl leading-[1.05] text-soft-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.35)]">
            Less Stress
            <br />
            More Growth ♡
          </p>
        </motion.div>
        <motion.div className="relative" variants={stagger} {...inView}>
          <motion.p variants={fadeUp} className="eyebrow">
            A little about us
          </motion.p>
          <motion.h2 variants={fadeUp} className="heading-cine mt-5" style={{ fontSize: 'clamp(2.3rem,4.2vw,3.5rem)' }}>
            A Partner For
            <br />
            Your Business
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-6 max-w-lg text-base leading-relaxed text-muted">
            At {site.name}, we believe getting your business registered should feel simple. We tell you exactly what you need, prepare and file
            your applications, and keep you updated on WhatsApp — until the certificate is in your hands.
          </motion.p>
          <motion.div variants={fadeUp} className="mt-8">
            <Link to="/about" className="btn-primary">
              Learn More About Us <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
          <motion.div variants={fadeUp} className="absolute -bottom-6 right-0 hidden text-center lg:block">
            <svg viewBox="0 0 60 90" className="mx-auto h-16 w-12" fill="none" stroke="#1E221E" strokeWidth="1.4" strokeLinecap="round">
              <path d="M30 88 C30 60 31 35 30 8" />
              <path d="M30 30 C20 24 16 16 18 8 C26 12 30 20 30 30Z" />
              <path d="M30 46 C40 40 45 32 43 24 C35 28 31 36 30 46Z" />
              <path d="M30 62 C20 56 15 48 17 40 C25 44 29 52 30 62Z" />
            </svg>
            <p className="mt-1 font-script text-xl leading-tight text-ink">
              Register
              <br />
              Comply
              <br />
              Grow
            </p>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}

// ───────────────────────── Categories ─────────────────────────

const categoryIcons: Record<CategoryId, typeof Rocket> = { business: Briefcase, government: FileCheck2, other: ShieldCheck };

function Categories() {
  return (
    <section className="border-t border-mist-300 bg-soft-white py-20 lg:py-28">
      <Container>
        <SectionHeading center eyebrow="What we do" title="Everything Your Business Needs" text="One partner for registrations, licences and compliance." />
        <motion.div className="mt-14 grid gap-6 md:grid-cols-3" variants={stagger} {...inView}>
          {categories.map((cat) => {
            const Icon = categoryIcons[cat.id];
            const list = servicesByCategory(cat.id);
            return (
              <motion.div key={cat.id} variants={fadeUp} whileHover={{ y: -6 }} className="flex flex-col rounded-2xl border border-mist-300 bg-cream p-8">
                <Icon className="h-7 w-7 text-olive-800" strokeWidth={1.4} />
                <h3 className="mt-5 font-display text-2xl text-ink">{cat.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{cat.description}</p>
                <ul className="mt-6 flex-1 divide-y divide-mist-300 border-t border-mist-300">
                  {list.slice(0, 5).map((s) => (
                    <li key={s.slug}>
                      <Link to={`/services/${s.slug}`} className="group flex items-center justify-between py-3 text-sm text-ink/85 hover:text-olive-800">
                        {s.shortName}
                        <span className="text-xs text-muted group-hover:text-olive-800">{formatPrice(s.price)}* →</span>
                      </Link>
                    </li>
                  ))}
                </ul>
                {list.length > 5 && (
                  <Link to="/services" className="mt-4 text-sm font-semibold text-olive-800 hover:text-olive-950">
                    +{list.length - 5} more services
                  </Link>
                )}
                {list.length <= 2 && (
                  <a
                    href={whatsappLink('Hi Regpro, I need help with a service not listed on the website.')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 text-sm text-muted"
                  >
                    Need something else? <span className="font-semibold text-olive-800">Ask an expert →</span>
                  </a>
                )}
              </motion.div>
            );
          })}
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
    <section className="py-20 lg:py-28">
      <Container>
        <SectionHeading eyebrow="How it works" title="Four Simple Steps" text="A clear, guided process — from first message to final certificate." />
        <motion.ol
          className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-mist-300 bg-mist-300 sm:grid-cols-2 lg:grid-cols-4"
          variants={stagger}
          {...inView}
        >
          {steps.map((s, i) => (
            <motion.li key={s.title} variants={fadeUp} className="group bg-soft-white p-8 transition-colors duration-500 hover:bg-olive-800">
              <div className="flex items-center justify-between">
                <s.icon className="h-6 w-6 text-olive-800 transition-colors group-hover:text-soft-white" strokeWidth={1.5} />
                <span className="font-display text-4xl italic text-mist-400 transition-colors group-hover:text-soft-white/40">0{i + 1}</span>
              </div>
              <h3 className="mt-8 font-display text-xl text-ink transition-colors group-hover:text-soft-white">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted transition-colors group-hover:text-soft-white/70">{s.text}</p>
            </motion.li>
          ))}
        </motion.ol>
      </Container>
    </section>
  );
}

// ───────────────────────── Green split band ─────────────────────────

function VisitBand() {
  return (
    <section className="grid bg-olive-800 lg:grid-cols-2">
      <motion.div className="flex flex-col justify-center px-6 py-16 sm:px-12 lg:px-16 lg:py-24" variants={stagger} {...inView}>
        <motion.p variants={fadeUp} className="eyebrow !text-soft-white/80 after:!bg-soft-white/50">
          Visit or call us
        </motion.p>
        <motion.h2 variants={fadeUp} className="mt-5 font-display text-soft-white" style={{ fontSize: 'clamp(2.2rem,4vw,3.4rem)', lineHeight: 1.08 }}>
          Bengaluru, Karnataka
        </motion.h2>
        <motion.ul variants={fadeUp} className="mt-8 space-y-4 text-soft-white/80">
          <li className="flex items-start gap-3">
            <MapPin className="mt-0.5 h-5 w-5 shrink-0" /> {site.address}
          </li>
          <li className="flex items-start gap-3">
            <Clock3 className="mt-0.5 h-5 w-5 shrink-0" /> {site.hours}
          </li>
          <li className="flex items-start gap-3">
            <Phone className="mt-0.5 h-5 w-5 shrink-0" /> {site.phone}
          </li>
        </motion.ul>
        <motion.p variants={fadeUp} className="mt-4 text-sm text-soft-white/55">
          Serving clients across India — 100% online.
        </motion.p>
        <motion.div variants={fadeUp} className="mt-9 flex flex-wrap gap-3">
          <WhatsAppButton size="lg" label="Chat on WhatsApp" source="visit-band" />
          <CallButton size="lg" variant="light" label="Call us" source="visit-band" />
        </motion.div>
      </motion.div>
      <div className="relative min-h-[320px] overflow-hidden bg-mist-200 lg:min-h-[560px]">
        <motion.img
          src="/photos/office.jpg"
          alt="The Regpro team at work"
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
          initial={{ scale: 1.1 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, ease: EASE }}
        />
        <p className="absolute right-6 top-6 text-right font-script text-3xl leading-[1.05] text-soft-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.35)]">
          Your business,
          <br />
          in good hands ♡
        </p>
      </div>
    </section>
  );
}

// ───────────────────────── Testimonials ─────────────────────────

function Stories() {
  return (
    <section className="py-20 lg:py-28">
      <Container>
        <SectionHeading center eyebrow="Client stories" title="What Our Clients Say" />
        <motion.div className="mt-14 grid gap-6 md:grid-cols-3" variants={stagger} {...inView}>
          {testimonials.slice(0, 3).map((t) => (
            <motion.figure key={t.name} variants={fadeUp} whileHover={{ y: -6 }} className="flex flex-col rounded-2xl border border-mist-300 bg-soft-white p-8">
              <div className="flex gap-0.5">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-olive-700 text-olive-700" />
                ))}
              </div>
              <blockquote className="mt-5 flex-1 font-display text-lg leading-relaxed text-ink">“{t.quote}”</blockquote>
              <figcaption className="mt-6 border-t border-mist-300 pt-5">
                <p className="text-sm font-semibold text-ink">{t.name}</p>
                <p className="text-xs text-muted">
                  {t.role} · {t.service}
                </p>
              </figcaption>
            </motion.figure>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}

// ───────────────────────── FAQ + enquiry ─────────────────────────

function FaqAndEnquiry() {
  return (
    <section id="enquiry" className="scroll-mt-20 border-t border-mist-300 bg-soft-white py-20 lg:py-28">
      <Container className="grid gap-14 lg:grid-cols-2">
        <div>
          <SectionHeading eyebrow="FAQs" title="Questions? We’ve Got Answers." />
          <Reveal delay={100} className="mt-10">
            <FaqList faqs={generalFaqs.slice(0, 5)} />
            <Link to="/faqs" className="link-underline mt-8">
              View all FAQs <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
        <Reveal delay={150}>
          <LeadForm solid />
          <ul className="mt-6 grid grid-cols-2 gap-3 text-sm text-muted">
            {['Free consultation', 'Fixed, transparent quote', 'Reply within working hours', 'Pan-India service'].map((t) => (
              <li key={t} className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-olive-700" /> {t}
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}

// ───────────────────────── Closing statement ─────────────────────────

function Welcome() {
  return (
    <section className="relative overflow-hidden py-24 text-center lg:py-32">
      <Leaf className="absolute right-[12%] top-16 hidden md:block" rotate={20} width={40} height={96} color="#97A38B" float />
      <Leaf className="absolute bottom-16 left-[10%] hidden md:block" rotate={-30} width={30} height={72} color="#B0B9A6" float delay={1.5} />
      <Container>
        <Eyebrow>A warm welcome</Eyebrow>
        <h2 className="heading-cine mx-auto mt-6 max-w-3xl" style={{ fontSize: 'clamp(2.6rem,5.4vw,4.4rem)' }}>
          <MaskedWords text="Expert Help." />
          <br />
          <MaskedWords text="Clear Pricing." delay={150} />
          <br />
          <MaskedWords text="Real People." delay={300} highlight={['People']} />
        </h2>
        <Reveal delay={300}>
          <p className="mx-auto mt-6 max-w-md text-muted">
            {offer.active ? offer.text : 'Talk to a Regpro expert today — the right advice, a clear quote and a hassle-free process.'}
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Link to="/services" className="btn-primary">
              Explore Services <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/contact" className="btn-light">
              Contact Us
            </Link>
          </div>
          <FeeNote className="mt-8" />
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
      <FeatureStrip />
      <PopularServices />
      <AboutBlock />
      <Categories />
      <Process />
      <VisitBand />
      <Stories />
      <FaqAndEnquiry />
      <Welcome />
    </>
  );
}
