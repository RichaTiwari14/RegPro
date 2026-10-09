// Renders every route to static HTML so search engines get full content, titles and meta tags.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const ssrDir = path.join(root, 'dist-ssr');

const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');
const { render, staticRoutes, siteUrl } = await import(pathToFileURL(path.join(ssrDir, 'entry-server.js')).href);

const write = (file, html) => {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, html);
};

const page = (url) => {
  const { html, head } = render(url);
  return template.replace('<!--app-head-->', head).replace('<!--app-html-->', html);
};

for (const url of staticRoutes) {
  const file = url === '/' ? path.join(dist, 'index.html') : path.join(dist, url.slice(1), 'index.html');
  write(file, page(url));
}
write(path.join(dist, '404.html'), page('/404'));

const today = new Date().toISOString().slice(0, 10);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticRoutes
  .map((u) => `  <url><loc>${siteUrl}${u === '/' ? '' : u}</loc><lastmod>${today}</lastmod><priority>${u === '/' ? '1.0' : u.startsWith('/services') ? '0.9' : '0.7'}</priority></url>`)
  .join('\n')}
</urlset>
`;
write(path.join(dist, 'sitemap.xml'), sitemap);
write(path.join(dist, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`);

fs.rmSync(ssrDir, { recursive: true, force: true });
console.log(`Prerendered ${staticRoutes.length + 1} pages + sitemap.xml + robots.txt`);
