import { Link, useParams } from 'react-router-dom';
import { Seo, breadcrumbLd } from '@/lib/seo';
import { site } from '@/config/site';
import { getPost } from '@/data/blog';
import { PageHero } from '@/components/PageHero';
import { Container } from '@/components/ui';
import { CtaBanner } from '@/components/CtaBanner';
import { formatDate } from '@/pages/Blog';
import NotFound from '@/pages/NotFound';

export default function BlogPost() {
  const { slug = '' } = useParams();
  const post = getPost(slug);
  if (!post) return <NotFound />;
  const path = `/blog/${post.slug}`;
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Blog', path: '/blog' },
    { name: post.title, path },
  ];
  return (
    <>
      <Seo
        title={post.title}
        description={post.excerpt}
        path={path}
        jsonLd={[
          {
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: post.title,
            description: post.excerpt,
            datePublished: post.date,
            author: { '@type': 'Organization', name: site.name },
            publisher: { '@type': 'Organization', name: site.name },
          },
          breadcrumbLd(crumbs),
        ]}
      />
      <PageHero eyebrow={post.category} title={post.title} text={`${formatDate(post.date)} · ${post.readTime}`} crumbs={crumbs} />
      <Container className="max-w-3xl py-14 sm:py-20">
        <article className="space-y-5 text-base leading-relaxed text-ink/80">
          {post.body.map((b, i) => {
            if ('h' in b) return <h2 key={i} className="pt-4 font-display text-2xl font-bold text-navy-900">{b.h}</h2>;
            if ('ul' in b)
              return (
                <ul key={i} className="list-disc space-y-2 pl-6 marker:text-gold-500">
                  {b.ul.map((li) => (
                    <li key={li}>{li}</li>
                  ))}
                </ul>
              );
            return <p key={i}>{b.p}</p>;
          })}
        </article>
        <Link to="/blog" className="mt-12 inline-block font-semibold text-navy-800 hover:text-navy-950">
          ← Back to all articles
        </Link>
      </Container>
      <CtaBanner />
    </>
  );
}
