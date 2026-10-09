import { CheckCircle2, Eye, HeartHandshake, Target } from 'lucide-react';
import { Seo, breadcrumbLd, organizationLd } from '@/lib/seo';
import { site } from '@/config/site';
import { PageHero } from '@/components/PageHero';
import { Container, SectionHeading } from '@/components/ui';
import { Reveal } from '@/components/Reveal';
import { LogoMark } from '@/components/Logo';
import { CtaBanner } from '@/components/CtaBanner';

const values = [
  { icon: Target, title: 'Our mission', text: 'Make business registration and compliance simple, affordable and transparent for every Indian entrepreneur.' },
  { icon: Eye, title: 'Our vision', text: 'To be the most trusted compliance partner for startups and small businesses across India.' },
  { icon: HeartHandshake, title: 'Our promise', text: 'Honest advice, upfront pricing and an expert who stays with you until the job is done.' },
];

export default function About() {
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
  ];
  return (
    <>
      <Seo
        title="About Us"
        description="Regpro is a business registration and compliance partner for startups, entrepreneurs and small businesses in India. Register. Comply. Grow."
        path="/about"
        jsonLd={[organizationLd(), breadcrumbLd(crumbs)]}
      />
      <PageHero eyebrow="About Regpro" title="Register. Comply. Grow." text="We help Indian businesses get started and stay compliant — without the paperwork stress." crumbs={crumbs} />

      <section className="py-16 sm:py-24">
        <Container className="grid items-center gap-14 lg:grid-cols-2">
          <Reveal>
            <SectionHeading eyebrow="Who we are" title="Your partner for registrations and compliance" />
            <div className="mt-6 space-y-4 text-base leading-relaxed text-ink/75">
              <p>
                {site.name} helps startups, entrepreneurs, professionals and small businesses with business registrations, government
                documentation and compliance assistance.
              </p>
              <p>
                Starting a business in India means dealing with multiple portals, forms and departments. We simplify that journey — we tell
                you exactly what you need, prepare and file your applications, and keep you updated on WhatsApp until you receive your
                certificate.
              </p>
            </div>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {['Expert-assisted filing', 'Transparent, upfront pricing', '100% online process', 'Dedicated support'].map((t) => (
                <li key={t} className="flex items-center gap-2 text-sm font-medium text-navy-900">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500" /> {t}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={150}>
            <div className="relative mx-auto flex aspect-square max-w-md items-center justify-center rounded-[2.5rem] bg-gradient-to-br from-navy-50 via-white to-gold-50 ring-1 ring-navy-100">
              <div className="spin-slow absolute inset-8 rounded-full border border-dashed border-navy-200" />
              <div className="spin-slow-reverse absolute inset-20 rounded-full border border-dashed border-gold-300" />
              <LogoMark animated className="relative h-40 w-auto" />
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="bg-surface py-16 sm:py-24">
        <Container>
          <div className="grid gap-6 md:grid-cols-3">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 120}>
                <div className="h-full rounded-3xl bg-white p-7 ring-1 ring-navy-100">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-navy-800 text-gold-400">
                    <v.icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-5 font-display text-xl font-bold text-navy-900">{v.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink/70">{v.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
      <CtaBanner />
    </>
  );
}
