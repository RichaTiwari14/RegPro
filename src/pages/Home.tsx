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
import { SectionHeading, WhatsAppButton, CallButton, FeeNote, CircleArrow } from '@/components/ui';
import { Reveal } from '@/components/Reveal';
import { ScrollScene } from '@/components/ScrollScene';
import { LeadForm } from '@/components/LeadForm';
import { ServiceCard } from '@/components/ServiceCard';
import { ServiceIcon } from '@/components/ServiceIcon';
import { ProcessSteps } from '@/components/ProcessSteps';
import { Testimonials } from '@/components/Testimonials';
import { FaqList } from '@/components/FaqList';
import { GoldGlow, Horizon, Mist, Mountains } from '@/components/Atmosphere';

const minPrice = Math.min(...services.map((s) => s.price));
const wrap = 'relative z-10 mx-auto max-w-7xl px-6 sm:px-8 md:px-12';

// ───────────────────────── Stats — the scene fades into dusk navy ─────────────────────────

function useCountUp(target: number, duration = 1600) {
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
    <div ref={c.ref} className="px-4 py-8 text-center">
      <p className="text-4xl font-light text-white sm:text-5xl">
        {prefix}
        {c.value.toLocaleString('en-IN')}
        <span className="text-gold-400">{suffix}</span>
      </p>
      <p className="label-cine mt-3 text-white/50">{label}</p>
    </div>
  );
}

function StatsDusk() {
  return (
    <section className="relative z-10 -mt-[35vh]">
      {/* Fade from the last (dark) video frames into navy */}
      <div className="h-[35vh] bg-gradient-to-b from-transparent via-navy-900/70 to-navy-800" aria-hidden="true" />
      <div className="relative overflow-hidden bg-navy-800 pb-[clamp(140px,20vw,280px)]">
        <Mist tone="dark" />
        <GoldGlow />
        <div className={`${wrap} pt-6`}>
          <Reveal className="text-center">
            <p className="label-cine text-gold-400">Regpro at a glance</p>
            <h2 className="heading-cine mx-auto mt-5 max-w-3xl text-white" style={{ fontSize: 'clamp(1.6rem,3vw,2.6rem)' }}>
              From first form to final certificate — one partner, fully online
            </h2>
          </Reveal>
          <Horizon className="mt-12" />
          <div className="grid grid-cols-2 lg:grid-cols-4">
            <Stat value={services.length} suffix="+" label="Services offered" />
            <Stat value={100} suffix="%" label="Online process" />
            <Stat value={minPrice} prefix="₹" label="Starting price" />
            <Stat value={6} suffix=" days" label="Expert support / week" />
          </div>
          <Horizon />
        </div>
        <Mountains tone="dark" to="#EDF1F5" />
      </div>
    </section>
  );
}

// ───────────────────────── Marquee ─────────────────────────

function ServiceMarquee() {
  const items = services.map((s) => s.shortName);
  return (
    <div className="marquee-mask overflow-hidden py-8">
      <div className="flex w-max animate-marquee-slow">
        {[...items, ...items].map((name, i) => (
          <span key={i} className="flex items-center gap-8 pr-8 text-xl font-light uppercase tracking-[0.18em] text-navy-800/60 sm:text-2xl">
            {name}
            <span className="h-1.5 w-1.5 rotate-45 bg-gold-500" />
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
    <section className="relative overflow-hidden py-20 sm:py-28">
      <Mist />
      <div className={wrap}>
        <div className="grid items-end gap-10 lg:grid-cols-2">
          <Reveal>
            <SectionHeading eyebrow="What Regpro does" title="Everything your business needs to start right and stay compliant" />
          </Reveal>
          <Reveal delay={100}>
            <p className="text-base leading-relaxed text-ink/65 sm:text-lg">
              We are your single partner for business registrations, government documentation and compliance. No queues, no confusing
              portals — just clear guidance, transparent pricing and an expert who keeps you updated at every step.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {categories.map((cat, i) => {
            const Icon = categoryIcons[cat.id];
            const list = servicesByCategory(cat.id);
            return (
              <Reveal key={cat.id} delay={i * 140}>
                <div className="glass group relative h-full overflow-hidden rounded-[1.75rem] p-8 transition-all duration-500 hover:-translate-y-1 hover:bg-white/75">
                  <span className="absolute right-7 top-6 text-6xl font-light text-navy-800/[0.07]">0{i + 1}</span>
                  <span className="flex h-14 w-14 items-center justify-center rounded-full border border-navy-800/20 text-navy-800 transition-all duration-500 group-hover:border-navy-800 group-hover:bg-navy-800 group-hover:text-gold-400">
                    <Icon className="h-6 w-6" strokeWidth={1.5} />
                  </span>
                  <h3 className="mt-7 text-sm font-medium uppercase tracking-[0.16em] text-navy-800">{cat.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink/60">{cat.description}</p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {list.slice(0, 4).map((s) => (
                      <Link
                        key={s.slug}
                        to={`/services/${s.slug}`}
                        className="rounded-full border border-navy-800/15 bg-white/50 px-3 py-1 text-xs text-navy-800 transition-colors hover:border-navy-800 hover:bg-navy-800 hover:text-white"
                      >
                        {s.shortName}
                      </Link>
                    ))}
                    {list.length > 4 && <span className="px-2 py-1 text-xs text-ink/45">+{list.length - 4} more</span>}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ───────────────────────── Services tabs ─────────────────────────

function ServicesSection() {
  const [tab, setTab] = useState<CategoryId>('business');
  const list = servicesByCategory(tab);
  return (
    <section className="sky relative overflow-hidden py-20 sm:py-28" id="services">
      <Mist />
      <div className={wrap}>
        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
          <Reveal>
            <SectionHeading
              eyebrow="Our services"
              title="Registrations & licences, done for you"
              text="Pick a service to see who needs it, documents required, process, timelines and pricing."
            />
          </Reveal>
          <Reveal delay={100} className="w-full min-w-0 lg:w-auto">
            <div className="flex w-full gap-6 overflow-x-auto border-b border-navy-800/15 lg:w-auto">
              {categories.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setTab(c.id)}
                  className={`relative whitespace-nowrap pb-3 text-[11px] font-medium uppercase tracking-[0.18em] transition-colors ${
                    tab === c.id ? 'text-navy-800' : 'text-navy-800/45 hover:text-navy-800'
                  }`}
                >
                  {c.title}
                  <span
                    className={`absolute inset-x-0 -bottom-px h-[2px] bg-gold-500 transition-transform duration-500 ${
                      tab === c.id ? 'scale-x-100' : 'scale-x-0'
                    }`}
                  />
                </button>
              ))}
            </div>
          </Reveal>
        </div>

        <div key={tab} className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((s, i) => (
            <div key={s.slug} className="tab-in" style={{ animationDelay: `${i * 70}ms` }}>
              <ServiceCard service={s} />
            </div>
          ))}
        </div>

        <div className="glass mt-12 flex flex-col items-center justify-between gap-4 rounded-[1.75rem] px-6 py-4 sm:flex-row sm:rounded-full sm:pl-8">
          <p className="text-sm text-ink/65">
            <span className="text-navy-800">Can’t find what you need?</span> We handle many more documentation and compliance services.
          </p>
          <WhatsAppButton label="Ask an expert" message="Hi Regpro, I need help with a service not listed on the website." source="services-more" />
        </div>
      </div>
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
      <div className="pointer-events-none absolute -inset-16" style={{ background: 'radial-gradient(closest-side, rgba(237,198,85,0.22), rgba(237,198,85,0))' }} />
      <div className="glass relative rounded-[2rem] p-7 sm:p-9">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-navy-800 text-gold-400">
              <ServiceIcon name="ReceiptIndianRupee" className="h-5 w-5" />
            </span>
            <div>
              <p className="label-cine text-ink/45">Application tracker</p>
              <p className="mt-1 text-navy-800">GST Registration</p>
            </div>
          </div>
          <span className="label-cine rounded-full border border-emerald-500/40 px-3 py-1 text-emerald-600">On track</span>
        </div>
        <div className="mt-7 h-1 overflow-hidden rounded-full bg-navy-800/10">
          <div className="tracker-fill h-full rounded-full bg-gradient-to-r from-navy-800 via-navy-600 to-gold-500" />
        </div>
        <ol className="mt-7 space-y-4">
          {steps.map((s, i) => (
            <li key={s} className="tracker-step flex items-center gap-3" style={{ animationDelay: `${0.4 + i * 0.45}s` }}>
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-emerald-500/50 text-emerald-600">
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
    </div>
  );
}

function WhyChoose() {
  return (
    <section className="relative overflow-hidden pb-[clamp(160px,22vw,320px)] pt-20 sm:pt-28">
      <Mist />
      <div className={`${wrap} grid items-center gap-16 lg:grid-cols-2`}>
        <div>
          <Reveal>
            <SectionHeading
              eyebrow="Why choose Regpro"
              title="Paperwork handled by experts. Progress you can see."
              text="Professional expertise with a simple, digital experience — so registrations feel effortless."
            />
          </Reveal>
          <div className="mt-12 grid gap-x-8 gap-y-8 sm:grid-cols-2">
            {reasons.map((r, i) => (
              <Reveal key={r.title} delay={i * 80}>
                <div className="group flex gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gold-500/40 text-gold-600 transition-all duration-500 group-hover:bg-gold-500 group-hover:text-white">
                    <r.icon className="h-5 w-5" strokeWidth={1.5} />
                  </span>
                  <div>
                    <h3 className="text-sm font-medium uppercase tracking-[0.12em] text-navy-800">{r.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink/60">{r.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
        <Reveal delay={150}>
          <TrackerMock />
        </Reveal>
      </div>
      <Mountains tone="dark" to="#0B2A5B" />
    </section>
  );
}

// ───────────────────────── Process — dusk ─────────────────────────

function Process() {
  return (
    <section className="relative overflow-hidden bg-navy-800 pb-[clamp(140px,20vw,280px)] pt-10 text-white sm:pt-16">
      <Mist tone="dark" />
      <GoldGlow />
      <div className={wrap}>
        <Reveal>
          <SectionHeading
            light
            center
            eyebrow="How it works"
            title="Your registration in 4 simple steps"
            text="A clear, guided process — from first message to final certificate."
          />
        </Reveal>
        <div className="mt-16">
          <ProcessSteps
            light
            steps={[
              { title: 'Share your requirement', text: 'Message us on WhatsApp, call, or fill the enquiry form.' },
              { title: 'Get advice & a quote', text: 'We confirm what you need, the documents and a fixed price.' },
              { title: 'We prepare & file', text: 'Our experts prepare, review and file your application.' },
              { title: 'Receive your certificate', text: 'Track progress on WhatsApp and receive your documents.' },
            ]}
          />
        </div>
        <Reveal className="mt-16 flex flex-col justify-center gap-3 sm:flex-row">
          <WhatsAppButton size="lg" label="Start on WhatsApp" source="process" />
          <CallButton size="lg" variant="light" source="process" />
        </Reveal>
      </div>
      <Mountains tone="dark" to="#EDF1F5" />
    </section>
  );
}

// ───────────────────────── Pricing ─────────────────────────

function PricingHighlights() {
  const featured = popularServices.slice(0, 3);
  return (
    <section className="relative overflow-hidden py-20 sm:py-28">
      <Mist />
      <div className={wrap}>
        <Reveal>
          <SectionHeading
            center
            eyebrow="Transparent pricing"
            title="Simple, upfront pricing"
            text="Know what you pay before you start. Government fees, where applicable, are shown separately."
          />
        </Reveal>
        <div className="mt-16 grid gap-6 lg:grid-cols-3 lg:items-center">
          {featured.map((s, i) => {
            const highlight = i === 1;
            return (
              <Reveal key={s.slug} delay={i * 140}>
                <div
                  className={`relative flex h-full flex-col overflow-hidden rounded-[2rem] p-8 transition-all duration-500 hover:-translate-y-1.5 ${
                    highlight ? 'dusk text-white shadow-2xl shadow-navy-900/30 lg:py-12' : 'glass hover:bg-white/75'
                  }`}
                >
                  {highlight && <GoldGlow />}
                  <div className="relative flex items-center justify-between">
                    <span
                      className={`flex h-12 w-12 items-center justify-center rounded-full border ${
                        highlight ? 'border-gold-400/60 text-gold-400' : 'border-navy-800/20 text-navy-800'
                      }`}
                    >
                      <ServiceIcon name={s.icon} className="h-5 w-5" />
                    </span>
                    {highlight && <span className="label-cine text-gold-400">Most popular</span>}
                  </div>
                  <h3 className={`relative mt-6 text-sm font-medium uppercase tracking-[0.14em] ${highlight ? 'text-white' : 'text-navy-800'}`}>
                    {s.name}
                  </h3>
                  <p className={`relative mt-1 text-sm ${highlight ? 'text-white/55' : 'text-ink/50'}`}>{s.timeline}</p>
                  <div className="relative mt-7">
                    <p className={`label-cine ${highlight ? 'text-white/50' : 'text-ink/45'}`}>Starting at</p>
                    <p className={`mt-2 text-5xl font-light ${highlight ? 'text-white' : 'text-navy-800'}`}>
                      {formatPrice(s.price)}
                      <span className={`align-super text-base ${highlight ? 'text-gold-400' : 'text-gold-600'}`}>*</span>
                    </p>
                  </div>
                  <ul className="relative mt-7 flex-1 space-y-3">
                    {s.includes.slice(0, 5).map((inc) => (
                      <li key={inc} className={`flex items-start gap-2.5 text-sm ${highlight ? 'text-white/75' : 'text-ink/70'}`}>
                        <CheckCircle2 className={`mt-0.5 h-4 w-4 shrink-0 ${highlight ? 'text-gold-400' : 'text-gold-600'}`} />
                        {inc}
                      </li>
                    ))}
                  </ul>
                  <div className="relative mt-9 grid gap-3">
                    <WhatsAppButton label="Get started" message={`Hi Regpro, I want to get started with ${s.name}.`} source={`pricing:${s.slug}`} />
                    <Link
                      to={`/services/${s.slug}`}
                      className={`label-cine py-2 text-center transition-opacity hover:opacity-70 ${highlight ? 'text-white/80' : 'text-navy-800'}`}
                    >
                      View details →
                    </Link>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
        <div className="mt-12 flex flex-col items-center gap-4 text-center">
          <FeeNote />
          <Link to="/pricing" className="label-cine group inline-flex items-center gap-4 text-navy-800">
            See pricing for all services
            <CircleArrow size="sm" className="group-hover:bg-navy-800 group-hover:text-white" />
          </Link>
        </div>
      </div>
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
    <section className="sky relative overflow-hidden py-20 sm:py-28">
      <Mist />
      <div className={wrap}>
        <Reveal>
          <SectionHeading
            eyebrow="Who we help"
            title="Built for every stage of your business"
            text="Whether you are launching a startup or running an established business, we make compliance simple."
          />
        </Reveal>
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {audiences.map((a, i) => (
            <Reveal key={a.title} delay={i * 110}>
              <div className="glass group h-full rounded-[1.75rem] p-7 transition-all duration-500 hover:-translate-y-1 hover:bg-white/75">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-gold-400 to-gold-600 text-white shadow-lg shadow-gold-500/30 transition-transform duration-500 group-hover:scale-110">
                  <a.icon className="h-5 w-5" strokeWidth={1.75} />
                </span>
                <h3 className="mt-6 text-sm font-medium uppercase tracking-[0.16em] text-navy-800">{a.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink/60">{a.text}</p>
                <ul className="mt-6 space-y-2.5 border-t border-navy-800/10 pt-5">
                  {a.slugs.map((slug) => {
                    const s = services.find((x) => x.slug === slug);
                    if (!s) return null;
                    return (
                      <li key={slug}>
                        <Link to={`/services/${slug}`} className="flex items-center justify-between text-sm text-navy-800 transition-colors hover:text-gold-700">
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
      </div>
    </section>
  );
}

// ───────────────────────── Testimonials ─────────────────────────

function TestimonialsSection() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-28">
      <Mist />
      <div className={wrap}>
        <Reveal>
          <SectionHeading center eyebrow="Customer stories" title="Businesses that grew with Regpro" />
        </Reveal>
      </div>
      <div className="relative mt-14">
        <Testimonials />
      </div>
    </section>
  );
}

// ───────────────────────── FAQ ─────────────────────────

function FaqSection() {
  return (
    <section className="sky relative overflow-hidden py-20 sm:py-28">
      <Mist />
      <div className={`${wrap} grid gap-14 lg:grid-cols-[0.9fr_1.1fr]`}>
        <div>
          <Reveal>
            <SectionHeading eyebrow="FAQs" title="Questions? We’ve got answers." text="Everything you need to know before getting started." />
          </Reveal>
          <Reveal delay={100}>
            <div className="dusk relative mt-10 overflow-hidden rounded-[1.75rem] p-7 text-white">
              <GoldGlow />
              <Headphones className="relative h-7 w-7 text-gold-400" strokeWidth={1.5} />
              <p className="relative mt-5 text-sm font-medium uppercase tracking-[0.16em]">Still have questions?</p>
              <p className="relative mt-2 text-sm text-white/60">Our experts are available {site.hours}.</p>
              <div className="relative mt-6 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
                <WhatsAppButton label="Ask on WhatsApp" source="faq" />
                <CallButton variant="light" source="faq" />
              </div>
            </div>
          </Reveal>
        </div>
        <Reveal delay={100}>
          <FaqList faqs={generalFaqs.slice(0, 6)} />
          <Link to="/faqs" className="label-cine group mt-8 inline-flex items-center gap-4 text-navy-800">
            View all FAQs
            <CircleArrow size="sm" className="group-hover:bg-navy-800 group-hover:text-white" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

// ───────────────────────── Enquiry — fixed night-landscape backdrop the page scrolls over ─────────────────────────

function Enquiry() {
  return (
    <section id="enquiry" className="relative py-20 sm:py-28">
      <div className={wrap}>
        {/* Boxed backdrop: clip-path confines the fixed image to this rounded box, so it stays still while the page scrolls past */}
        <div className="relative overflow-hidden rounded-[2rem] px-6 py-14 text-white [clip-path:inset(0_round_2rem)] sm:px-10 sm:py-16 lg:px-16 lg:py-20">
          <div className="fixed inset-0 z-0" aria-hidden="true">
            <img src="/images/enquiry-backdrop.jpg" alt="" className="h-full w-full object-cover" loading="lazy" decoding="async" />
            <div className="absolute inset-0 bg-navy-950/25" />
          </div>
          <div className="relative z-10 grid items-center gap-12 lg:grid-cols-2 lg:gap-14">
            <Reveal>
              <SectionHeading
                light
                eyebrow="Get started today"
                title="Let’s get your business registered"
                text="Share a few details and an expert will reach out with the right plan and a clear quote. Prefer chatting? We’re on WhatsApp."
              />
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <WhatsAppButton size="lg" source="enquiry" />
                <CallButton size="lg" variant="light" label={site.phone} source="enquiry" />
              </div>
              <ul className="mt-9 grid gap-3 text-sm text-white/75 sm:grid-cols-2">
                {['Free consultation', 'Response within working hours', 'Fixed, transparent quote', 'Pan-India service'].map((t) => (
                  <li key={t} className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-gold-400" /> {t}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={150}>
              <LeadForm solid />
            </Reveal>
          </div>
        </div>
      </div>
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
      <ScrollScene />
      <StatsDusk />
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
