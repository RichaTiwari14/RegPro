import { motion } from 'motion/react';
import { CheckCircle2, Eye, HeartHandshake, Target } from 'lucide-react';
import { Seo, breadcrumbLd, organizationLd } from '@/lib/seo';
import { site } from '@/config/site';
import { services } from '@/data/services';
import { PageHero } from '@/components/PageHero';
import { Container, SectionHeading } from '@/components/ui';
import { Reveal } from '@/components/Reveal';
import { Leaf } from '@/components/Leaf';
import { StickyBg } from '@/components/StickyBg';
import { CtaBanner } from '@/components/CtaBanner';

const EASE = [0.16, 1, 0.3, 1] as const;

const values = [
  { icon: Target, title: 'Our mission', text: 'Make business registration and compliance simple, affordable and transparent for every Indian entrepreneur.', tint: 'bg-olive-50 text-olive-800' },
  { icon: Eye, title: 'Our vision', text: 'To be the most trusted compliance partner for startups and small businesses across India.', tint: 'bg-sage-50 text-sage-700' },
  { icon: HeartHandshake, title: 'Our promise', text: 'Honest advice, upfront pricing and an expert who stays with you until the job is done.', tint: 'bg-emerald-50 text-emerald-700' },
];

export default function About() {
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
  ];
  const minPrice = Math.min(...services.map((s) => s.price));
  const stats = [
    [`${services.length}+`, 'Services'],
    [`₹${minPrice}`, 'Starting fee'],
    ['100%', 'Online process'],
    ['6 days', 'Weekly support'],
  ];
  return (
    <>
      <Seo
        title="About Us"
        description="Regpro is a business registration and compliance partner for startups, entrepreneurs and small businesses in India. Register. Comply. Grow."
        path="/about"
        jsonLd={[organizationLd(), breadcrumbLd(crumbs)]}
      />
      <PageHero
        eyebrow="About Regpro"
        title="Register. Comply. Grow."
        highlight={['Grow']}
        text="We help Indian businesses get started and stay compliant — without the paperwork stress."
        crumbs={crumbs}
        image="/images/city-day.jpg"
        scribble={"Built for founders ♥"}
      />

      {/* Stats band over a fixed skyline */}
      <StickyBg image="/images/city-dusk.jpg" overlay="bg-olive-950/80">
        <Container className="grid grid-cols-2 gap-y-10 py-16 lg:grid-cols-4">
          {stats.map(([v, l], i) => (
            <motion.div
              key={l}
              className="text-center"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: EASE }}
            >
              <p className="font-display text-4xl font-semibold text-sage-400 sm:text-5xl">{v}</p>
              <p className="mt-2 text-sm text-white/70">{l}</p>
            </motion.div>
          ))}
        </Container>
      </StickyBg>

      <section className="bg-white py-16 sm:py-24">
        <Container className="grid items-center gap-14 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Who we are" title="Your partner for registrations and compliance" highlight={['partner']} />
            <Reveal delay={100}>
              <div className="mt-6 space-y-4 text-base leading-relaxed text-muted">
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
                  <li key={t} className="flex items-center gap-2 text-sm font-semibold text-olive-800">
                    <CheckCircle2 className="h-5 w-5 text-sage-500" /> {t}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
          <Reveal delay={150} className="relative mx-auto w-full max-w-md">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-[0_40px_80px_-30px_rgba(53,63,34,0.45)]">
              <img src="/images/tower.jpg" alt="" className="h-full w-full object-cover" loading="lazy" />
            </div>
            <div className="absolute -bottom-6 -right-4 rounded-2xl bg-white p-5 shadow-2xl shadow-olive-900/20 sm:-right-10">
              <p className="font-display text-2xl font-semibold text-olive-800">Register.</p>
              <p className="font-display text-2xl font-semibold text-olive-800">Comply.</p>
              <p className="font-display text-2xl font-semibold text-sage-500">Grow.</p>
            </div>
            <Leaf className="absolute -left-5 -top-7 z-10" rotate={-25} color="#65733F" opacity={0.85} float />
          </Reveal>
        </Container>
      </section>

      <section className="sky relative overflow-hidden py-16 sm:py-24">
        <Container>
          <SectionHeading center eyebrow="What drives us" title="Mission, vision & promise" highlight={['promise']} />
          <motion.div
            className="mt-14 grid gap-6 md:grid-cols-3"
            initial="hidden"
            whileInView="shown"
            viewport={{ once: true, margin: '0px 0px -10% 0px' }}
            variants={{ hidden: {}, shown: { transition: { staggerChildren: 0.12 } } }}
          >
            {values.map((v) => (
              <motion.div
                key={v.title}
                variants={{ hidden: { opacity: 0, y: 40 }, shown: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } } }}
                whileHover={{ y: -8 }}
                className="glass h-full p-8"
              >
                <span className={`flex h-14 w-14 items-center justify-center rounded-2xl ${v.tint}`}>
                  <v.icon className="h-6 w-6" />
                </span>
                <h3 className="mt-6 font-display text-2xl font-semibold text-olive-800">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{v.text}</p>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </section>
      <CtaBanner />
    </>
  );
}
