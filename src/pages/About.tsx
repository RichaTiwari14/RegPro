import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, Compass, Eye, FileSearch, Handshake, MessagesSquare, Scale, ShieldCheck, Target } from 'lucide-react';
import { Seo, breadcrumbLd, organizationLd } from '@/lib/seo';
import { site } from '@/config/site';
import { PageHero } from '@/components/PageHero';
import { Container, SectionHeading } from '@/components/ui';
import { Reveal } from '@/components/Reveal';
import { ImageFrame } from '@/components/ImageFrame';
import { ProcessSteps } from '@/components/services/ProcessSteps';
import { CtaBanner } from '@/components/CtaBanner';

const EASE = [0.22, 1, 0.36, 1] as const;

const values = [
  { icon: Scale, title: 'Integrity', text: 'Honest advice, even when the answer is that you do not need a service.' },
  { icon: Compass, title: 'Clarity', text: 'Plain-language guidance on requirements, fees and timelines.' },
  { icon: Handshake, title: 'Client first', text: 'We listen to your situation before recommending anything.' },
  { icon: ShieldCheck, title: 'Care with data', text: 'Your documents are handled carefully and used only for your application.' },
];

const approach = [
  { title: 'Understand', text: 'We learn about your business and goals before suggesting a registration.' },
  { title: 'Document', text: 'You receive a clear checklist and our professional fee upfront.' },
  { title: 'Prepare & file', text: 'We prepare the application and assist with filing on the relevant portal.' },
  { title: 'Follow through', text: 'We keep you updated and help respond to any queries from the authority.' },
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
        description="Regpro is a business registration and compliance assistance firm helping startups, entrepreneurs and businesses across India. Register. Comply. Grow."
        path="/about"
        image="/assets/about-workspace.webp"
        jsonLd={[organizationLd(), breadcrumbLd(crumbs)]}
      />
      <PageHero
        eyebrow="About Regpro"
        title="Your Partner in Business Registration"
        highlight={['Business', 'Registration']}
        text="We help entrepreneurs and businesses navigate registrations, government documentation and compliance with clarity and care."
        crumbs={crumbs}
        image="/assets/about-workspace.webp"
        imageAlt="A calm, premium office workspace"
      />

      <section className="py-20 lg:py-28">
        <Container className="grid items-center gap-14 lg:grid-cols-2">
          <ImageFrame src="/assets/business-documents.webp" alt="Professionals reviewing registration documents" aspect="aspect-[5/4]" />
          <div>
            <SectionHeading eyebrow="Our story" title="Why Regpro exists" />
            <Reveal delay={120}>
              <div className="mt-6 space-y-4 leading-relaxed text-muted">
                <p>
                  Starting or formalising a business in India involves many portals, forms and departments. For most founders, the hardest part is knowing
                  what is actually required — and in what order.
                </p>
                <p>
                  {site.name} was set up to make that journey simpler: explain what applies to you, organise the documents, assist with the application and
                  keep you informed until the authority decides.
                </p>
              </div>
              {/* TODO (client): add verified founding year, team and experience details here once available. */}
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="border-y border-line bg-white py-20 lg:py-28">
        <Container className="grid gap-6 md:grid-cols-2">
          {[
            { icon: Target, label: 'Our mission', text: 'To make business registration and compliance clear, organised and accessible for every entrepreneur in India.' },
            { icon: Eye, label: 'Our vision', text: 'To be a trusted first call for businesses that want to get their registrations and documentation right.' },
          ].map((m, i) => (
            <motion.div
              key={m.label}
              className="rounded-xl border border-line bg-ivory/60 p-8"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.12, ease: EASE }}
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-forest-800 text-sage-300">
                <m.icon className="h-5 w-5" />
              </span>
              <h2 className="mt-6 font-display text-2xl text-forest-800">{m.label}</h2>
              <p className="mt-3 leading-relaxed text-muted">{m.text}</p>
            </motion.div>
          ))}
        </Container>
      </section>

      <section className="py-20 lg:py-28">
        <Container>
          <SectionHeading eyebrow="Our approach" title="How we work with you" highlight={['you']} />
          <div className="mt-14">
            <ProcessSteps steps={approach} />
          </div>
        </Container>
      </section>

      <section className="bg-forest-900 py-20 text-white lg:py-28">
        <Container>
          <SectionHeading light center eyebrow="Core values" title="What guides our work" />
          <motion.div
            className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
            initial="hidden"
            whileInView="shown"
            viewport={{ once: true, margin: '0px 0px -10% 0px' }}
            variants={{ hidden: {}, shown: { transition: { staggerChildren: 0.1 } } }}
          >
            {values.map((v) => (
              <motion.div
                key={v.title}
                variants={{ hidden: { opacity: 0, y: 24 }, shown: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } } }}
                className="rounded-xl border border-white/10 bg-white/[0.04] p-7"
              >
                <v.icon className="h-6 w-6 text-sage-300" strokeWidth={1.6} />
                <h3 className="mt-5 font-display text-xl">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/65">{v.text}</p>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </section>

      <section className="py-20 lg:py-28">
        <Container className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Documentation & consultation" title="Clear, organised and on record" />
            <Reveal delay={120}>
              <ul className="mt-8 space-y-5">
                {[
                  { icon: MessagesSquare, t: 'A consultation to understand your requirement' },
                  { icon: FileSearch, t: 'A document checklist specific to your service' },
                  { icon: ShieldCheck, t: 'Professional fee and any government charges shared upfront' },
                ].map((x) => (
                  <li key={x.t} className="flex items-center gap-4 text-ink/85">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-sage-300 text-forest-600">
                      <x.icon className="h-4 w-4" />
                    </span>
                    {x.t}
                  </li>
                ))}
              </ul>
              <Link to="/contact#enquiry" className="btn-primary mt-9">
                Talk to an expert <ArrowRight className="h-4 w-4" />
              </Link>
            </Reveal>
          </div>
          <ImageFrame src="/assets/startup-founders.webp" alt="Founders collaborating" aspect="aspect-[5/4]" />
        </Container>
      </section>

      <CtaBanner title="Let’s Build Something Great Together" highlight={['Great']} />
    </>
  );
}
