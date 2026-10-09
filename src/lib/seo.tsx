import { createContext, useContext, useEffect } from 'react';
import { site } from '@/config/site';

export interface HeadData {
  title: string;
  description: string;
  path: string;
  jsonLd?: object[];
  noindex?: boolean;
}

/** During prerendering the server passes a collector object; on the client this is null. */
export const HeadContext = createContext<{ data?: HeadData } | null>(null);

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export function fullTitle(title: string) {
  return title.includes(site.name) ? title : `${title} | ${site.name}`;
}

/** Serialises head tags. Every tag carries data-seo so the client can swap them on navigation. */
export function renderHead(d: HeadData): string {
  const url = `${site.url}${d.path === '/' ? '' : d.path}`;
  const title = esc(fullTitle(d.title));
  const desc = esc(d.description);
  const tags = [
    `<title data-seo>${title}</title>`,
    `<meta data-seo name="description" content="${desc}">`,
    `<link data-seo rel="canonical" href="${url}">`,
    `<meta data-seo property="og:type" content="website">`,
    `<meta data-seo property="og:site_name" content="${site.name}">`,
    `<meta data-seo property="og:title" content="${title}">`,
    `<meta data-seo property="og:description" content="${desc}">`,
    `<meta data-seo property="og:url" content="${url}">`,
    `<meta data-seo property="og:image" content="${site.url}/og-image.jpg">`,
    `<meta data-seo name="twitter:card" content="summary_large_image">`,
  ];
  if (d.noindex) tags.push(`<meta data-seo name="robots" content="noindex">`);
  for (const ld of d.jsonLd ?? []) {
    tags.push(`<script data-seo type="application/ld+json">${JSON.stringify(ld).replace(/</g, '\\u003c')}</script>`);
  }
  return tags.join('\n    ');
}

function applyHead(d: HeadData) {
  document.head.querySelectorAll('[data-seo]').forEach((el) => el.remove());
  document.querySelectorAll('title').forEach((el) => el.remove());
  document.head.insertAdjacentHTML('beforeend', renderHead(d));
}

export function Seo(props: HeadData) {
  const ctx = useContext(HeadContext);
  if (ctx) ctx.data = props;

  const key = JSON.stringify(props);
  useEffect(() => {
    applyHead(props);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return null;
}

// ── Structured data helpers ──

export const organizationLd = () => ({
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: site.name,
  url: site.url,
  logo: `${site.url}/favicon.svg`,
  image: `${site.url}/og-image.jpg`,
  description: site.description,
  telephone: site.phone,
  email: site.email,
  areaServed: 'IN',
  address: { '@type': 'PostalAddress', addressLocality: site.city, addressRegion: 'Karnataka', addressCountry: 'IN' },
  slogan: site.tagline,
});

export const faqLd = (faqs: { q: string; a: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
});

export const breadcrumbLd = (items: { name: string; path: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((it, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: it.name,
    item: `${site.url}${it.path === '/' ? '' : it.path}`,
  })),
});
