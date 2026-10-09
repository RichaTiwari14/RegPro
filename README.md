# Regpro

Website for **Regpro** — business registration, government documentation & compliance assistance. *Register. Comply. Grow.*

Built with Vite + React + TypeScript + Tailwind CSS. Every page is pre-rendered to static HTML at build time for SEO.

## Run locally

```bash
npm install
npm run dev      # local dev server
npm run build    # production build → dist/ (pre-rendered pages, sitemap.xml, robots.txt)
```

## Updating content (no design changes needed)

| What | File |
| --- | --- |
| Phone, WhatsApp, email, address, hours | `src/config/site.ts` |
| Services, **prices**, timelines, documents, process, service FAQs | `src/data/services.ts` |
| General FAQs | `src/data/faqs.ts` |
| Testimonials | `src/data/testimonials.ts` |
| Offer / announcement bar | `src/data/offers.ts` |
| Blog articles | `src/data/blog.ts` |

Adding a service or blog post to these files automatically creates its page, menu/footer links and sitemap entry.

## Integrations (environment variables)

Set these in Vercel → Project → Settings → Environment Variables (see `.env.example`):

- `VITE_WEB3FORMS_KEY` — enquiry form submissions are emailed via [Web3Forms](https://web3forms.com). Without it, the form opens WhatsApp with the details instead.
- `VITE_GA_ID` — Google Analytics 4.
- `VITE_META_PIXEL_ID` — Meta Pixel.

## Deploy

Import the repo on Vercel. It auto-detects Vite; `vercel.json` enables clean URLs.
