import { services } from '@/data/services';
import { visibleArticles } from '@/data/resources';

const main = ['/', '/about', '/services', '/pricing', '/contact', '/faqs', '/resources', '/privacy-policy', '/terms-and-conditions'];

/** Every URL that gets pre-rendered to static HTML. */
export const staticRoutes = [...main, ...services.map((s) => `/services/${s.slug}`), ...visibleArticles.map((a) => `/resources/${a.slug}`)];

/** URLs listed in sitemap.xml — draft articles are excluded until published. */
export const sitemapRoutes = [
  ...main,
  ...services.map((s) => `/services/${s.slug}`),
  ...visibleArticles.filter((a) => a.status === 'published').map((a) => `/resources/${a.slug}`),
];
