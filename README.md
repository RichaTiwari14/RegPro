# REGPRO — regpro.in

Premium website for **REGPRO** (Register. Comply. Grow.) — business registration, government documentation and compliance assistance.

React 18 · Vite 6 · TypeScript · Tailwind CSS 3 · React Router 6 · Framer Motion (`motion`) · Lenis smooth scroll · React Hook Form + Zod · Lucide icons.
Every route is pre-rendered to static HTML at build time for SEO.

## Commands

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check → client build → SSR build → prerender all routes + sitemap.xml + robots.txt
npm run preview
```

## Environment variables

Copy `.env.example` to `.env.local` (or set them in Vercel → Project → Settings → Environment Variables).
Anything prefixed `VITE_` is bundled into public JavaScript — **never put secret keys in a `VITE_` variable.**

| Variable | Purpose |
| --- | --- |
| `VITE_API_BASE_URL` | Backend base URL. The enquiry form POSTs to `{VITE_API_BASE_URL}/api/enquiries/`. When empty, the form does **not** pretend to succeed — it says online enquiries are not connected and offers WhatsApp / call. |
| `VITE_GA_ID` | Google Analytics 4 measurement ID. Empty = disabled. |
| `VITE_META_PIXEL_ID` | Meta Pixel ID. Empty = disabled. |

## Enquiry backend (required for the form to work)

The frontend only sends data; email delivery and storage happen on your backend (e.g. Django REST Framework).

`POST /api/enquiries/` — JSON body:

```json
{
  "full_name": "Asha Rao",
  "mobile": "9876543210",
  "email": "asha@example.com",
  "service": "GST Registration",
  "city": "Bengaluru",
  "message": "",
  "consent": true,
  "page": "/services/gst-registration"
}
```

Headers include `Idempotency-Key` (a UUID per submission) so the backend can ignore duplicates.

The backend should:

- validate the fields again (never trust the browser), including the 10-digit Indian mobile (`^[6-9]\d{9}$`) and `consent === true`;
- send the notification email with a server-side email provider key;
- optionally save the enquiry to a database;
- rate-limit by IP and reject duplicates using `Idempotency-Key`;
- allow the site origin via CORS (`https://regpro.in`);
- return **2xx** on success. Any non-2xx is shown to the visitor as an error, and `{"detail": "..."}` is displayed if provided.

## Analytics

GA4 and Meta Pixel load **only** when an ID is configured **and** the visitor accepts the consent banner (the banner appears only when an ID is set).
Events (deduplicated): `generate_lead` (after the server confirms an enquiry), `whatsapp_click`, `phone_click`, `contact_click` (email), `view_service`, `view_pricing`.
In GA4, mark `generate_lead` as a key event. Meta receives `Lead`, `Contact` and `ViewContent`.

## Editing content (no design changes needed)

| What | File |
| --- | --- |
| Phone, WhatsApp, email, address, hours, social links | `src/config/site.ts` |
| Services, **prices**, documents, process, inclusions, FAQs, SEO | `src/data/services.ts` |
| Service images, eligibility notes, govt-fee notes, “get a quote” flag | `src/data/serviceDetails.ts` |
| General FAQs (grouped) | `src/data/faqs.ts` |
| Resources / articles (draft or published) | `src/data/resources.ts` |
| Testimonials — **genuine, approved only**; section hidden while empty | `src/data/testimonials.ts` |
| Privacy Policy & Terms (draft) | `src/data/legal.ts` |
| Navigation | `src/data/navigation.ts` |

Adding a service or article automatically creates its page, menu/listing entries and sitemap entry.
Articles with `status: 'draft'` show a “Draft — under review” label, are `noindex`, and are left out of the sitemap. Set `showDraftContent = false` in `site.ts` to hide drafts entirely.

A CMS or API can replace these data files later — pages only read the exported arrays and helpers (`services`, `getService`, `visibleArticles`, `faqGroups`…).

## Images

The official logo (supplied artwork, background removed — not redrawn) is in `public/assets/brand/`.

AI image generation was **not available** in the build environment (no image-generation tool, and stock/AI image hosts were blocked by the network).
Every photo slot therefore holds a clearly labelled **“Image pending”** placeholder at its final path, e.g. `public/assets/regpro-hero.webp`.
`cta-architecture.webp` is a finished abstract navy background.

To generate the full library (32 images, prompts already art-directed):

```bash
npm i -D sharp                       # optional: writes WebP (otherwise PNG)
OPENAI_API_KEY=sk-... node scripts/generate-images.mjs          # all
OPENAI_API_KEY=sk-... node scripts/generate-images.mjs services # filter by name
```

Prompts and target files live in `scripts/image-prompts.json`. Run this locally or in CI — the key is never part of the site.
You can also drop in real photography at the same paths and sizes.

## Project structure

```
public/assets/            brand logo, image library (services/, resources/)
scripts/                  prerender, image generation + prompts
src/components/           Reveal (motion), PageHero, ImageFrame, FaqAccordion, CtaBanner, Breadcrumbs, ui primitives
src/components/layout/    Header (dropdowns), MobileNav (drawer, tab bar, floating WhatsApp), Footer, ConsentBanner, Layout
src/components/forms/     EnquiryForm (React Hook Form + Zod)
src/components/services/  ServiceCard / ServiceTile, ProcessSteps
src/pages/                Home, Services, ServiceDetail (template), Pricing, About, Contact, Faqs, Resources, Article, Legal, NotFound
src/data/                 all content
src/services/             enquiries API client
src/lib/                  analytics, SEO, smooth scroll
```

## Deployment (Vercel)

Framework preset: Vite. Build command `npm run build`, output `dist`.
`vercel.json` sets clean URLs, long-term caching for `/assets`, and 301 redirects (`/blog` → `/resources`, old service slugs).

## Information still needed from the client

- Final **prices** for every service (current values are starting prices pending confirmation).
- Confirmed **email**, full **registered office address** (map and street address stay hidden until provided), social media URLs.
- A **backend endpoint** for enquiries (`VITE_API_BASE_URL`) and email recipient.
- **GA4 / Meta Pixel IDs**, if analytics is wanted.
- Genuine, approved **testimonials** (optional).
- Verified company background for the About page (founding year, team, experience).
- Legal review of the **Privacy Policy** and **Terms** (sections marked “Requires review”).
- Professional review of the **draft articles** before publishing.
- Real photography, or an image-generation API key to run `scripts/generate-images.mjs`.
