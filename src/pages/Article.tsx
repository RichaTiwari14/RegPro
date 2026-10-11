import { Link, useParams } from 'react-router-dom';
import { ArrowRight, Clock } from 'lucide-react';
import { Seo, articleLd, breadcrumbLd } from '@/lib/seo';
import { getArticle, visibleArticles } from '@/data/resources';
import { getService } from '@/data/services';
import { Container, WhatsAppButton } from '@/components/ui';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { MaskedWords, Reveal } from '@/components/Reveal';
import { ImageFrame } from '@/components/ImageFrame';
import { ArticleCard, DraftBadge, formatDate } from '@/components/ArticleCard';
import { ServiceTile } from '@/components/services/ServiceCard';
import NotFound from '@/pages/NotFound';

export default function ArticlePage() {
  const { slug = '' } = useParams();
  const a = getArticle(slug);
  if (!a) return <NotFound />;
  const path = `/resources/${a.slug}`;
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Resources', path: '/resources' },
    { name: a.title, path },
  ];
  const relatedArticles = visibleArticles.filter((x) => x.slug !== a.slug && (x.category === a.category || x.related.some((r) => a.related.includes(r)))).slice(0, 3);
  const fallback = relatedArticles.length ? relatedArticles : visibleArticles.filter((x) => x.slug !== a.slug).slice(0, 3);
  const relatedServices = a.related.map((s) => getService(s)).filter((s): s is NonNullable<typeof s> => Boolean(s));

  return (
    <>
      <Seo
        title={a.title}
        description={a.excerpt}
        path={path}
        image={a.image}
        type="article"
        noindex={a.status === 'draft'}
        jsonLd={a.status === 'published' ? [articleLd(a), breadcrumbLd(crumbs)] : [breadcrumbLd(crumbs)]}
      />
      <article>
        <header className="border-b border-line bg-ivory">
          <Container className="max-w-4xl pb-12 pt-8 sm:pt-10">
            <Breadcrumbs crumbs={crumbs} />
            <div className="mt-8 flex flex-wrap items-center gap-3 text-xs text-subtle">
              <span className="font-semibold uppercase tracking-[0.16em] text-gold-600">{a.category}</span>
              <span>·</span>
              <time dateTime={a.date}>{formatDate(a.date)}</time>
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" /> {a.readTime}
              </span>
              {a.status === 'draft' && <DraftBadge />}
            </div>
            <h1 className="heading mt-4" style={{ fontSize: 'clamp(2rem,4.2vw,3.2rem)' }}>
              <MaskedWords text={a.title} />
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-muted">{a.excerpt}</p>
          </Container>
        </header>
        <Container className="max-w-4xl py-12">
          <ImageFrame src={a.image} alt={a.imageAlt} aspect="aspect-[16/9]" priority frame={false} />
          {a.status === 'draft' && (
            <p className="mt-8 rounded-lg border border-gold-200 bg-gold-50 p-4 text-sm text-gold-800">
              This article is a draft awaiting professional review. It is general information, not legal or tax advice.
            </p>
          )}
          <div className="prose-regpro mx-auto mt-6 max-w-2xl">
            {a.body.map((b, i) => {
              if ('h' in b) return <h2 key={i}>{b.h}</h2>;
              if ('ul' in b)
                return (
                  <ul key={i}>
                    {b.ul.map((li) => (
                      <li key={li}>{li}</li>
                    ))}
                  </ul>
                );
              return <p key={i}>{b.p}</p>;
            })}
            <Reveal className="mt-12 rounded-xl border border-line bg-white p-6">
              <p className="font-display text-xl text-navy-800">Need help with this?</p>
              <p className="mt-1 text-sm text-muted">Our team can guide you on what applies to your business.</p>
              <div className="mt-4 flex flex-wrap gap-3">
                <WhatsAppButton label="Ask an expert" source={`article:${a.slug}`} />
                <Link to="/contact#enquiry" className="btn-outline">
                  Send an enquiry
                </Link>
              </div>
            </Reveal>
          </div>
        </Container>
      </article>

      {relatedServices.length > 0 && (
        <section className="border-t border-line bg-white py-14">
          <Container>
            <h2 className="font-display text-2xl text-navy-800">Related services</h2>
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {relatedServices.map((s) => (
                <ServiceTile key={s.slug} service={s} />
              ))}
            </div>
          </Container>
        </section>
      )}
      <section className="py-14 sm:py-20">
        <Container>
          <div className="flex items-end justify-between gap-4">
            <h2 className="font-display text-2xl text-navy-800">Related articles</h2>
            <Link to="/resources" className="link-arrow">
              All resources <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {fallback.map((x) => (
              <ArticleCard key={x.slug} article={x} />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
