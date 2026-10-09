import { services } from '@/data/services';
import { posts } from '@/data/blog';

/** Every URL that gets pre-rendered to static HTML and listed in sitemap.xml. */
export const staticRoutes = [
  '/',
  '/about',
  '/services',
  '/pricing',
  '/contact',
  '/faqs',
  '/blog',
  '/privacy-policy',
  '/terms-and-conditions',
  ...services.map((s) => `/services/${s.slug}`),
  ...posts.map((p) => `/blog/${p.slug}`),
];
