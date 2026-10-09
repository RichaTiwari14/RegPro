import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { Seo, breadcrumbLd } from '@/lib/seo';
import { posts } from '@/data/blog';
import { PageHero } from '@/components/PageHero';
import { Container } from '@/components/ui';
import { Reveal } from '@/components/Reveal';

export const formatDate = (d: string) =>
  new Date(`${d}T00:00:00`).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

export default function Blog() {
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Blog', path: '/blog' },
  ];
  return (
    <>
      <Seo
        title="Blog — Guides on Business Registration & Compliance"
        description="Simple guides on company registration, GST, MSME, startup recognition and compliance for Indian businesses."
        path="/blog"
        jsonLd={[breadcrumbLd(crumbs)]}
      />
      <PageHero eyebrow="Insights" title="Guides for founders & businesses" text="Plain-English explainers on registrations and compliance." crumbs={crumbs} />
      <Container className="grid gap-6 py-16 sm:grid-cols-2 sm:py-20 lg:grid-cols-3">
        {posts.map((p, i) => (
          <Reveal key={p.slug} delay={i * 100}>
            <Link
              to={`/blog/${p.slug}`}
              className="group flex h-full flex-col overflow-hidden rounded-3xl border border-navy-100 bg-white transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-navy-900/10"
            >
              <div className="relative h-40 overflow-hidden bg-gradient-to-br from-navy-800 to-navy-950">
                <div className="grid-pattern absolute inset-0 opacity-40" />
                <span className="absolute bottom-4 left-5 rounded-full bg-gold-500 px-3 py-1 text-xs font-semibold text-navy-950">{p.category}</span>
                <ArrowUpRight className="absolute right-5 top-5 h-6 w-6 text-white/60 transition-all duration-500 group-hover:rotate-45 group-hover:text-gold-400" />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <p className="text-xs text-ink/50">
                  {formatDate(p.date)} · {p.readTime}
                </p>
                <h2 className="mt-2 font-display text-lg font-bold leading-snug text-navy-900 group-hover:text-gold-700">{p.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-ink/65">{p.excerpt}</p>
              </div>
            </Link>
          </Reveal>
        ))}
      </Container>
    </>
  );
}
