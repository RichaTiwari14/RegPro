import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  BadgeIndianRupee,
  Briefcase,
  CheckCircle2,
  Clock3,
  FileCheck2,
  Headphones,
  Laptop,
  Lightbulb,
  MessageCircle,
  Rocket,
  ShieldCheck,
  Store,
  UserCheck,
} from 'lucide-react';
import { Seo, organizationLd, faqLd } from '@/lib/seo';
import { site } from '@/config/site';
import { categories, services, servicesByCategory, popularServices, formatPrice, type CategoryId } from '@/data/services';
import { generalFaqs } from '@/data/faqs';
import { Container, Eyebrow, SectionHeading, WhatsAppButton, CallButton, FeeNote } from '@/components/ui';
import { Reveal } from '@/components/Reveal';
import { LogoMark } from '@/components/Logo';
import { LeadForm } from '@/components/LeadForm';
import { ServiceCard } from '@/components/ServiceCard';
import { ServiceIcon } from '@/components/ServiceIcon';
import { ProcessSteps } from '@/components/ProcessSteps';
import { Testimonials } from '@/components/Testimonials';
import { FaqList } from '@/components/FaqList';

const minPrice = Math.min(...services.map((s) => s.price));

// ───────────────────────── Hero ─────────────────────────

function Hero() {
  return (
    <section className="relative overflow-hidden bg-navy-900 text-white">
      <div className="grid-pattern pointer-events-none absolute inset-0 opacity-50" />
      <div className="pointer-events-none absolute -left-32 top-10 h-[28rem] w-[28rem] rounded-full bg-navy-500/30 blur-3xl" />
      <div className="orb pointer-events-none absolute -right-20 -top-20 h-[26rem] w-[26rem] rounded-full bg-gold-500/20 blur-3xl" />

      {/* Rising bars skyline — echoes the logo mark */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex h-48 items-end justify-center gap-3 opacity-[0.07] sm:gap-5" aria-hidden="true">
        {[30, 45, 38, 60, 52, 75, 64, 88, 72, 100, 82, 95, 70, 58, 80, 66, 50, 40].map((h, i) => (
          <span key={i} className="skyline-bar w-6 rounded-t-md bg-white sm:w-10" style={{ height: `${h}%`, animationDelay: `${i * 60}ms` }} />
        ))}
      </div>

      <Container className="relative grid items-center gap-12 pb-20 pt-12 lg:grid-cols-[1.15fr_1fr] lg:gap-16 lg:pb-28 lg:pt-20">
        <div>
          <div className="hero-in">
            <Eyebrow light>Business registration & compliance, made simple</Eyebrow>
          </div>
          <h1 className="hero-in mt-6 font-display text-[2.6rem] font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-[4.2rem]" style={{ animationDelay: '0.1s' }}>
            Register.
            <br />
            Comply.{' '}
            <span className="relative inline-block text-gold-400">
              Grow.
              <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 12" preserveAspectRatio="none" aria-hidden="true">
                <path d="M2 9 C 50 2, 120 2, 198 7" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="underline-draw" />
              </svg>
            </span>
          </h1>
          <p className="hero-in mt-6 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg" style={{ animationDelay: '0.2s' }}>
            From company incorporation to GST, MSME, FSSAI and trademark — Regpro’s experts handle the paperwork while you focus on
            building your business. 100% online, with transparent pricing.
          </p>

          <div className="hero-in mt-8 flex flex-col gap-3 sm:flex-row" style={{ animationDelay: '0.3s' }}>
            <WhatsAppButton size="lg" label="Chat on WhatsApp" source="hero" />
            <Link
              to="/services"
              className="group inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-6 py-3.5 font-semibold text-white backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/10"
            >
              Explore services
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <ul className="hero-in mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-white/75" style={{ animationDelay: '0.4s' }}>
            {['Expert-assisted filing', 'No hidden charges', 'Live updates on WhatsApp'].map((t) => (
              <li key={t} className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-gold-400" /> {t}
              </li>
            ))}
          </ul>
        </div>

        <div className="hero-in relative" style={{ animationDelay: '0.25s' }}>
          {/* floating status chips */}
          <div className="float-a absolute -left-4 -top-6 z-20 hidden items-center gap-3 rounded-2xl bg-white/95 px-4 py-3 text-navy-900 shadow-2xl shadow-navy-950/40 backdrop-blur sm:flex lg:-left-10">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50">
              <CheckCircle2 className="h-5 w-5 text-emerald-500" />
            </span>
            <span>
              <span className="block text-[11px] text-ink/50">Status update</span>
              <span className="block text-sm font-semibold">GSTIN approved</span>
            </span>
          </div>
          <div className="float-b absolute -bottom-6 -right-2 z-20 hidden items-center gap-3 rounded-2xl bg-white/95 px-4 py-3 text-navy-900 shadow-2xl shadow-navy-950/40 backdrop-blur sm:flex lg:-right-8">
            <LogoMark className="h-8 w-auto" />
            <span>
              <span className="block text-[11px] text-ink/50">Starting at just</span>
              <span className="block text-sm font-semibold">{formatPrice(minPrice)}*</span>
            </span>
          </div>

          <div className="relative">
            <div className="absolute -inset-1 rounded-[1.7rem] bg-gradient-to-br from-gold-400/60 via-white/10 to-navy-400/40 blur-sm" />
            <LeadForm
              compact
              title="Get a free consultation"
              subtitle="Tell us what you need — we’ll call you back with the right plan and a clear quote."
              className="relative"
            />
          </div>
        </div>
      </Container>

      <StatsStrip />
    </section>
  );
}

function useCountUp(target: number, duration = 1400) {
  const [value, setValue] = useState(target);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    setValue(0);
    let raf = 0;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / duration);
        setValue(Math.round(target * (1 - Math.pow(1 - t, 3))));
        if (t < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    });
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [target, duration]);
  return { value, ref };
}

function Stat({ value, prefix = '', suffix = '', label }: { value: number; prefix?: string; suffix?: string; label: string }) {
  const c = useCountUp(value);
  return (
    <div ref={c.ref} className="px-4 py-6 text-center sm:py-8">
      <p className="font-display text-3xl font-bold text-white sm:text-4xl">
        {prefix}
        {c.value.toLocaleString('en-IN')}
        <span className="text-gold-400">{suffix}</span>
      </p>
      <p className="mt-1 text-xs uppercase tracking-[0.14em] text-white/55 sm:text-sm">{label}</p>
    </div>
  );
}

function StatsStrip() {
  return (
    <div className="relative border-t border-white/10 bg-navy-950/40 backdrop-blur">
      <Container className="grid grid-cols-2 divide-white/10 lg:grid-cols-4 lg:divide-x">
        <Stat value={services.length} suffix="+" label="Services offered" />
        <Stat value={100} suffix="%" label="Online process" />
        <Stat value={minPrice} prefix="₹" label="Starting price" />
        <Stat value={6} suffix=" days" label="Expert support / week" />
      </Container>
    </div>
  );
}

// ───────────────────────── Service marquee ─────────────────────────

function ServiceMarquee() {
  const items = services.map((s) => s.shortName);
  return (
    <div className="marquee-mask overflow-hidden border-b border-navy-50 bg-white py-5">
      <div className="flex w-max animate-marquee-slow">
        {[...items, ...items].map((name, i) => (
          <span key={i} className="flex items-center gap-6 pr-6 font-display text-lg font-semibold text-navy-900/70 sm:text-xl">
            {name}
            <span className="h-2 w-2 rotate-45 bg-gold-500" />
          </span>
        ))}
      </div>
    </div>
  );
}

// ───────────────────────── What we do ─────────────────────────

const categoryIcons: Record<CategoryId, typeof Rocket> = { business: Briefcase, government: FileCheck2, other: ShieldCheck };

function WhatWeDo() {
  return (
    <section className="py-20 sm:py-24">
      <Container>
        <div className="grid items-end gap-8 lg:grid-cols-2">
          <Reveal>
            <SectionHeading
              eyebrow="What Regpro does"
              title={
                <>
                  Everything your business needs to <span className="text-gold-600">start right</span> and stay compliant
                </>
              }
            />
          </Reveal>
          <Reveal delay={100}>
            <p className="text-base leading-relaxed text-ink/70 sm:text-lg">
              We are your single partner for business registrations, government documentation and compliance. No queues, no confusing
              portals — just clear guidance, transparent pricing and an expert who keeps you updated at every step.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {categories.map((cat, i) => {
            const Icon = categoryIcons[cat.id];
            const list = servicesByCategory(cat.id);
            return (
              <Reveal key={cat.id} delay={i * 120}>
                <div className="group relative h-full overflow-hidden rounded-3xl border border-navy-100 bg-gradient-to-b from-white to-navy-50/50 p-7 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-navy-900/10">
                  <span className="absolute right-6 top-6 font-display text-5xl font-bold text-navy-900/[0.06]">0{i + 1}</span>
                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-navy-800 text-gold-400 shadow-lg shadow-navy-900/20 transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110">
                    <Icon className="h-7 w-7" strokeWidth={1.75} />
                  </span>
                  <h3 className="mt-6 font-display text-xl font-bold text-navy-900">{cat.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink/65">{cat.description}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {list.slice(0, 4).map((s) => (
                      <Link
                        key={s.slug}
                        to={`/services/${s.slug}`}
                        className="rounded-full border border-navy-100 bg-white px-3 py-1 text-xs font-medium text-navy-800 transition-colors hover:border-navy-800 hover:bg-navy-800 hover:text-white"
                      >
                        {s.shortName}
                      </Link>
                    ))}
                    {list.length > 4 && (
                      <span className="rounded-full px-3 py-1 text-xs font-medium text-ink/50">+{list.length - 4} more</span>
                    )}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

// ───────────────────────── Services tabs ─────────────────────────

function ServicesSection() {
  const [tab, setTab] = useState<CategoryId>('business');
  const list = servicesByCategory(tab);
  return (
    <section className="bg-surface py-20 sm:py-24" id="services">
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
          <Reveal>
            <SectionHeading
              eyebrow="Our services"
              title="Registrations & licences, done for you"
              text="Pick a service to see who needs it, documents required, process, timelines and pricing."
            />
          </Reveal>
          <Reveal delay={100} className="w-full min-w-0 lg:w-auto">
            <div className="flex w-full gap-1 overflow-x-auto rounded-2xl bg-white p-1.5 shadow-sm ring-1 ring-navy-100 lg:w-auto">
              {categories.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setTab(c.id)}
                  className={`whitespace-nowrap rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-300 ${
                    tab === c.id ? 'bg-navy-800 text-white shadow-md' : 'text-ink/60 hover:text-navy-900'
                  }`}
                >
                  {c.title}
                </button>
              ))}
            </div>
          </Reveal>
        </div>

        <div key={tab} className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((s, i) => (
            <div key={s.slug} className="tab-in" style={{ animationDelay: `${i * 60}ms` }}>
              <ServiceCard service={s} />
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 rounded-2xl border border-dashed border-navy-200 bg-white px-6 py-5 sm:flex-row">
          <p className="text-sm text-ink/70">
            <span className="font-semibold text-navy-900">Can’t find what you need?</span> We handle many more business documentation
            and compliance services.
          </p>
          <WhatsAppButton label="Ask an expert" message="Hi Regpro, I need help with a service not listed on the website." source="services-more" />
        </div>
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
    <div className="relative">
      <div className="pointer-events-none absolute -inset-6 rounded-[2.5rem] bg-gradient-to-br from-gold-400/25 to-navy-400/20 blur-2xl" />
      <div className="relative rounded-3xl border border-navy-100 bg-white p-6 shadow-2xl shadow-navy-900/10 sm:p-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-navy-800 text-gold-400">
              <ServiceIcon name="ReceiptIndianRupee" className="h-5 w-5" />
            </span>
            <div>
              <p className="text-xs text-ink/50">Application tracker</p>
              <p className="font-display font-bold text-navy-900">GST Registration</p>
            </div>
          </div>
          <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-600">On track</span>
        </div>
        <div className="mt-6 h-2 overflow-hidden rounded-full bg-navy-50">
          <div className="tracker-fill h-full rounded-full bg-gradient-to-r from-navy-700 via-navy-600 to-gold-500" />
        </div>
        <ol className="mt-6 space-y-4">
          {steps.map((s, i) => (
            <li key={s} className="tracker-step flex items-center gap-3" style={{ animationDelay: `${0.4 + i * 0.45}s` }}>
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white">
                <CheckCircle2 className="h-4 w-4" />
              </span>
              <span className="text-sm font-medium text-ink/80">{s}</span>
            </li>
          ))}
        </ol>
        <div className="mt-6 flex items-center gap-3 rounded-2xl bg-[#25D366]/10 p-4">
          <MessageCircle className="h-5 w-5 shrink-0 text-[#1a9e4b]" />
          <p className="text-sm text-ink/75">“Good news! Your GST registration is approved. Certificate shared below.”</p>
        </div>
      </div>
    </div>
  );
}

function WhyChoose() {
  return (
    <section className="py-20 sm:py-24">
      <Container className="grid items-center gap-14 lg:grid-cols-2">
        <div>
          <Reveal>
            <SectionHeading
              eyebrow="Why choose Regpro"
              title="Paperwork handled by experts. Progress you can see."
              text="We combine professional expertise with a simple, digital experience — so registrations feel effortless."
            />
          </Reveal>
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {reasons.map((r, i) => (
              <Reveal key={r.title} delay={i * 80}>
                <div className="group flex gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gold-50 text-gold-600 ring-1 ring-gold-200 transition-all duration-300 group-hover:bg-gold-500 group-hover:text-white">
                    <r.icon className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="font-semibold text-navy-900">{r.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-ink/65">{r.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
        <Reveal delay={150}>
          <TrackerMock />
        </Reveal>
      </Container>
    </section>
  );
}

// ───────────────────────── Process ─────────────────────────

function Process() {
  return (
    <section className="relative overflow-hidden bg-navy-900 py-20 text-white sm:py-24">
      <div className="grid-pattern pointer-events-none absolute inset-0 opacity-30" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-gold-500/10 blur-3xl" />
      <Container className="relative">
        <Reveal>
          <SectionHeading
            light
            center
            eyebrow="How it works"
            title="Your registration in 4 simple steps"
            text="A clear, guided process — from first message to final certificate."
          />
        </Reveal>
        <div className="mt-14">
          <ProcessSteps
            light
            steps={[
              { title: 'Share your requirement', text: 'Message us on WhatsApp, call, or fill the enquiry form.' },
              { title: 'Get expert advice & quote', text: 'We confirm what you need, the documents and a fixed price.' },
              { title: 'We prepare & file', text: 'Our experts prepare, review and file your application.' },
              { title: 'Receive your certificate', text: 'Track progress on WhatsApp and receive your documents.' },
            ]}
          />
        </div>
        <Reveal className="mt-14 flex flex-col justify-center gap-3 sm:flex-row">
          <WhatsAppButton size="lg" label="Start on WhatsApp" source="process" />
          <CallButton size="lg" variant="light" source="process" />
        </Reveal>
      </Container>
    </section>
  );
}

// ───────────────────────── Pricing highlights ─────────────────────────

function PricingHighlights() {
  const featured = popularServices.slice(0, 3);
  return (
    <section className="py-20 sm:py-24">
      <Container>
        <Reveal>
          <SectionHeading
            center
            eyebrow="Transparent pricing"
            title="Simple, upfront pricing"
            text="Know what you pay before you start. Government fees, where applicable, are shown separately."
          />
        </Reveal>
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {featured.map((s, i) => {
            const highlight = i === 1;
            return (
              <Reveal key={s.slug} delay={i * 120}>
                <div
                  className={`relative flex h-full flex-col rounded-3xl p-7 transition-all duration-500 hover:-translate-y-1.5 ${
                    highlight
                      ? 'bg-navy-900 text-white shadow-2xl shadow-navy-900/30 lg:-my-4 lg:py-11'
                      : 'border border-navy-100 bg-white hover:shadow-xl hover:shadow-navy-900/10'
                  }`}
                >
                  {highlight && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gold-500 px-4 py-1 text-xs font-bold uppercase tracking-wider text-navy-950">
                      Most popular
                    </span>
                  )}
                  <span className={`flex h-12 w-12 items-center justify-center rounded-2xl ${highlight ? 'bg-white/10 text-gold-400' : 'bg-navy-50 text-navy-800'}`}>
                    <ServiceIcon name={s.icon} className="h-6 w-6" />
                  </span>
                  <h3 className={`mt-5 font-display text-xl font-bold ${highlight ? 'text-white' : 'text-navy-900'}`}>{s.name}</h3>
                  <p className={`mt-1 text-sm ${highlight ? 'text-white/60' : 'text-ink/55'}`}>{s.timeline}</p>
                  <div className="mt-6">
                    <p className={`text-xs font-medium uppercase tracking-wider ${highlight ? 'text-white/55' : 'text-ink/45'}`}>Starting at</p>
                    <p className={`font-display text-4xl font-bold ${highlight ? 'text-white' : 'text-navy-900'}`}>
                      {formatPrice(s.price)}
                      <span className={`align-super text-base ${highlight ? 'text-gold-400' : 'text-gold-600'}`}>*</span>
                    </p>
                  </div>
                  <ul className="mt-6 flex-1 space-y-3">
                    {s.includes.slice(0, 5).map((inc) => (
                      <li key={inc} className={`flex items-start gap-2.5 text-sm ${highlight ? 'text-white/80' : 'text-ink/75'}`}>
                        <CheckCircle2 className={`mt-0.5 h-4 w-4 shrink-0 ${highlight ? 'text-gold-400' : 'text-emerald-500'}`} />
                        {inc}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8 grid gap-2">
                    <WhatsAppButton label="Get started" message={`Hi Regpro, I want to get started with ${s.name}.`} source={`pricing:${s.slug}`} />
                    <Link
                      to={`/services/${s.slug}`}
                      className={`rounded-xl py-3 text-center text-sm font-semibold transition-colors ${
                        highlight ? 'text-white/80 hover:text-white' : 'text-navy-800 hover:text-navy-950'
                      }`}
                    >
                      View details →
                    </Link>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
        <div className="mt-10 flex flex-col items-center gap-3 text-center">
          <FeeNote />
          <Link to="/pricing" className="inline-flex items-center gap-2 font-semibold text-navy-800 hover:text-navy-950">
            See pricing for all services <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Container>
    </section>
  );
}

// ───────────────────────── Benefits / Who we help ─────────────────────────

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
    <section className="bg-surface py-20 sm:py-24">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Who we help"
            title="Built for every stage of your business"
            text="Whether you are launching a startup or running an established business, we make compliance simple."
          />
        </Reveal>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {audiences.map((a, i) => (
            <Reveal key={a.title} delay={i * 100}>
              <div className="group h-full rounded-3xl bg-white p-6 ring-1 ring-navy-100 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-navy-900/10 hover:ring-navy-200">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-gold-400 to-gold-600 text-white shadow-lg shadow-gold-500/30 transition-transform duration-500 group-hover:scale-110">
                  <a.icon className="h-6 w-6" />
                </span>
                <h3 className="mt-5 font-display text-lg font-bold text-navy-900">{a.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/65">{a.text}</p>
                <ul className="mt-5 space-y-2 border-t border-navy-50 pt-4">
                  {a.slugs.map((slug) => {
                    const s = services.find((x) => x.slug === slug);
                    if (!s) return null;
                    return (
                      <li key={slug}>
                        <Link to={`/services/${slug}`} className="flex items-center justify-between text-sm font-medium text-navy-800 hover:text-gold-600">
                          {s.shortName}
                          <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

// ───────────────────────── Testimonials ─────────────────────────

function TestimonialsSection() {
  return (
    <section className="overflow-hidden py-20 sm:py-24">
      <Container>
        <Reveal>
          <SectionHeading center eyebrow="Customer stories" title="Businesses that grew with Regpro" />
        </Reveal>
      </Container>
      <div className="mt-12">
        <Testimonials />
      </div>
    </section>
  );
}

// ───────────────────────── FAQ ─────────────────────────

function FaqSection() {
  return (
    <section className="bg-surface py-20 sm:py-24">
      <Container className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <Reveal>
            <SectionHeading eyebrow="FAQs" title="Questions? We’ve got answers." text="Everything you need to know before getting started." />
          </Reveal>
          <Reveal delay={100}>
            <div className="mt-8 rounded-3xl bg-navy-900 p-6 text-white">
              <Headphones className="h-8 w-8 text-gold-400" />
              <p className="mt-4 font-display text-lg font-bold">Still have questions?</p>
              <p className="mt-1 text-sm text-white/65">Our experts are available {site.hours}.</p>
              <div className="mt-5 flex flex-col gap-2 sm:flex-row lg:flex-col xl:flex-row">
                <WhatsAppButton label="Ask on WhatsApp" source="faq" />
                <CallButton variant="light" source="faq" />
              </div>
            </div>
          </Reveal>
        </div>
        <Reveal delay={100}>
          <FaqList faqs={generalFaqs.slice(0, 6)} />
          <Link to="/faqs" className="mt-6 inline-flex items-center gap-2 font-semibold text-navy-800 hover:text-navy-950">
            View all FAQs <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>
      </Container>
    </section>
  );
}

// ───────────────────────── Enquiry ─────────────────────────

function Enquiry() {
  return (
    <section id="enquiry" className="relative overflow-hidden py-20 sm:py-24">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[30rem] w-[60rem] -translate-x-1/2 rounded-full bg-gold-100/60 blur-3xl" />
      <Container className="relative grid items-center gap-12 lg:grid-cols-2">
        <Reveal>
          <SectionHeading
            eyebrow="Get started today"
            title={
              <>
                Let’s get your business <span className="text-gold-600">registered</span>
              </>
            }
            text="Share a few details and an expert will reach out with the right plan and a clear quote. Prefer chatting? We’re on WhatsApp."
          />
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <WhatsAppButton size="lg" source="enquiry" />
            <CallButton size="lg" label={site.phone} source="enquiry" />
          </div>
          <ul className="mt-8 grid gap-3 text-sm text-ink/70 sm:grid-cols-2">
            {['Free consultation', 'Response within working hours', 'Fixed, transparent quote', 'Pan-India service'].map((t) => (
              <li key={t} className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" /> {t}
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={150}>
          <LeadForm />
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
      <ServiceMarquee />
      <WhatWeDo />
      <ServicesSection />
      <WhyChoose />
      <Process />
      <PricingHighlights />
      <Audiences />
      <TestimonialsSection />
      <FaqSection />
      <Enquiry />
    </>
  );
}
