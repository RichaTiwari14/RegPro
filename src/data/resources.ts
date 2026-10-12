/**
 * Resources / articles. Add an object to publish a new article — it automatically gets a page at
 * /resources/<slug>. Body blocks: { h: 'heading' } | { p: 'paragraph' } | { ul: ['item', ...] }.
 *
 * Every article below is DRAFT sample content written for the design review. Drafts show a
 * "Draft — under review" label, are marked noindex and are left out of the sitemap. Have each one
 * reviewed by a qualified professional, then set status: 'published'.
 */
import { showDraftContent } from '@/config/site';

export type ArticleBlock = { h: string } | { p: string } | { ul: string[] };

export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  date: string; // YYYY-MM-DD
  readTime: string;
  category: ArticleCategory;
  image: string;
  imageAlt: string;
  status: 'draft' | 'published';
  /** Service slugs this article relates to. */
  related: string[];
  body: ArticleBlock[];
}

export const articleCategories = ['Business Setup', 'GST', 'MSME', 'Startups', 'Licences', 'Compliance'] as const;
export type ArticleCategory = (typeof articleCategories)[number];

const existing: Omit<Article, 'status' | 'image' | 'imageAlt' | 'related'>[] = [
  {
    slug: 'pvt-ltd-vs-llp-vs-opc',
    title: 'Private Limited vs LLP vs OPC: which structure is right for you?',
    excerpt: 'A simple comparison of the three most popular business structures for founders in India.',
    date: '2026-09-15',
    readTime: '5 min read',
    category: 'Business Setup',
    body: [
      { p: 'Choosing the right legal structure is one of the first decisions every founder makes. It affects your liability, how you raise money, your tax and how much compliance you need to manage.' },
      { h: 'Private Limited Company' },
      { p: 'Best for startups that plan to raise funds or scale quickly. Shareholders have limited liability, and investors are comfortable with this structure.' },
      { h: 'Limited Liability Partnership (LLP)' },
      { p: 'Best for professional firms and small businesses with two or more partners who want limited liability with fewer compliances. Equity fundraising is harder.' },
      { h: 'One Person Company (OPC)' },
      { p: 'Best for solo founders who want the benefits of a company without a co-founder. You can convert to a Private Limited Company later.' },
      { h: 'Quick summary' },
      { ul: ['Raising funds? Choose a Private Limited Company.', 'Professional firm or low compliance? Choose an LLP.', 'Solo founder? Choose an OPC.'] },
    ],
  },
  {
    slug: 'gst-registration-threshold',
    title: 'Do you need GST registration? Thresholds explained',
    excerpt: 'Understand when GST registration becomes mandatory — and when it makes sense to register voluntarily.',
    date: '2026-09-02',
    readTime: '4 min read',
    category: 'GST',
    body: [
      { p: 'GST registration is mandatory once your aggregate turnover crosses the threshold for your state and type of supply. Some businesses must register regardless of turnover.' },
      { h: 'Turnover thresholds' },
      { ul: ['₹40 lakh for suppliers of goods (in most states)', '₹20 lakh for suppliers of services', 'Lower thresholds apply in special category states'] },
      { h: 'Mandatory registration regardless of turnover' },
      { ul: ['Inter-state supply of goods', 'Selling through e-commerce operators', 'Casual and non-resident taxable persons'] },
      { h: 'Should you register voluntarily?' },
      { p: 'Voluntary registration lets you claim input tax credit and work with larger B2B clients who prefer GST-registered vendors.' },
    ],
  },
  {
    slug: 'benefits-of-udyam-registration',
    title: '7 benefits of Udyam (MSME) registration for small businesses',
    excerpt: 'Udyam registration is free and quick — here is why every eligible business should get it.',
    date: '2026-08-20',
    readTime: '3 min read',
    category: 'MSME',
    body: [
      { p: 'Udyam registration is the official MSME registration in India. It is free on the government portal and gives small businesses access to several benefits.' },
      { ul: [
        'Priority-sector lending from banks',
        'Collateral-free loans under government schemes',
        'Protection against delayed payments from buyers',
        'Subsidies and concessions under central and state schemes',
        'Preference and fee exemptions in government tenders',
        '50% concession on trademark government fees',
        'Lower electricity and interest rates under some state schemes',
      ] },
    ],
  },
];


const meta: Record<string, Pick<Article, 'image' | 'imageAlt' | 'related'>> = {
  'pvt-ltd-vs-llp-vs-opc': {
    image: '/assets/resources/structure-guide.webp',
    imageAlt: 'Wooden blocks for Private Limited, LLP and OPC beside a structure comparison sheet',
    related: ['private-limited-company-registration', 'llp-registration', 'opc-registration'],
  },
  'gst-registration-threshold': {
    image: '/assets/resources/gst-guide.webp',
    imageAlt: 'GST letter blocks, a calculator and tax papers on a desk',
    related: ['gst-registration', 'gst-amendment'],
  },
  'benefits-of-udyam-registration': {
    image: '/assets/resources/udyam-guide.webp',
    imageAlt: 'MSME letter blocks and a registration form on a desk',
    related: ['udyam-msme-registration'],
  },
};

const more: Article[] = [
  {
    slug: 'dpiit-startup-india-recognition-guide',
    title: 'DPIIT Startup India recognition: who is eligible and how to apply',
    excerpt: 'The eligibility conditions for DPIIT recognition and what to prepare before you apply.',
    date: '2026-08-05',
    readTime: '4 min read',
    category: 'Startups',
    image: '/assets/resources/startup-india-guide.webp',
    imageAlt: 'A laptop showing DPIIT Startup India recognition steps',
    status: 'draft',
    related: ['dpiit-startup-india-recognition', 'private-limited-company-registration'],
    body: [
      { p: 'DPIIT recognition under the Startup India initiative identifies an entity as a startup for the purpose of government schemes and benefits.' },
      { h: 'Basic eligibility' },
      {
        ul: [
          'Incorporated as a Private Limited Company, LLP or registered partnership firm',
          'Not more than 10 years from the date of incorporation',
          'Turnover has not exceeded ₹100 crore in any financial year',
          'Working towards innovation, development or improvement of products, processes or services, or a scalable business model',
          'Not formed by splitting up or reconstructing an existing business',
        ],
      },
      { h: 'What to prepare' },
      { p: 'Keep your incorporation certificate and a clear write-up of how your business is innovative or scalable. A pitch deck, website or product details help support the application.' },
      { h: 'After recognition' },
      { p: 'Some benefits, such as certain tax exemptions, need a separate application and approval. Check the conditions of each benefit before relying on it.' },
    ],
  },
  {
    slug: 'fssai-registration-vs-licence',
    title: 'FSSAI basic registration, State licence or Central licence?',
    excerpt: 'How food businesses can work out which FSSAI registration or licence applies to them.',
    date: '2026-07-22',
    readTime: '4 min read',
    category: 'Licences',
    image: '/assets/resources/fssai-guide.webp',
    imageAlt: 'A laptop showing FSSAI registration steps beside fresh ingredients',
    status: 'draft',
    related: ['fssai-registration'],
    body: [
      { p: 'Every food business operator in India needs an FSSAI registration or licence. Which one applies depends mainly on turnover, production capacity and the type of activity.' },
      { h: 'The three types' },
      {
        ul: [
          'Basic registration — for small food businesses with turnover up to ₹12 lakh',
          'State licence — for medium-sized businesses, depending on turnover and capacity',
          'Central licence — for large operators and specific activities such as import, or operations across multiple states',
        ],
      },
      { h: 'Before you apply' },
      { p: 'Keep proof of premises, identity documents and a list of food categories ready. Some categories need extra documents. Thresholds are set by FSSAI and can change, so confirm the current criteria before applying.' },
    ],
  },
  {
    slug: 'compliance-after-company-registration',
    title: 'What happens after you register a company? The first-year checklist',
    excerpt: 'The key compliances a new Private Limited Company should plan for in its first year.',
    date: '2026-07-08',
    readTime: '5 min read',
    category: 'Compliance',
    image: '/assets/resources/compliance-calendar.webp',
    imageAlt: 'A compliance calendar, checklist and laptop on a desk',
    status: 'draft',
    related: ['private-limited-company-registration', 'gst-registration'],
    body: [
      { p: 'Incorporation is the first step. A new company also has ongoing obligations under company and tax law.' },
      { h: 'Early steps' },
      {
        ul: [
          'Open a bank account in the company’s name',
          'File the commencement of business declaration within the prescribed time',
          'Appoint the first statutory auditor within the prescribed time',
          'Register for GST if your business requires it',
        ],
      },
      { h: 'Every year' },
      {
        ul: ['Hold board meetings and the annual general meeting as required', 'File annual returns and financial statements with the Registrar', 'File the income-tax return'],
      },
      { p: 'Due dates and requirements depend on your company and can change. Confirm current deadlines with a professional.' },
    ],
  },
];

export const articles: Article[] = [
  ...existing.map((a) => ({ ...a, ...meta[a.slug], status: 'draft' as const })),
  ...more,
].sort((a, b) => b.date.localeCompare(a.date));

/** Articles visible on the site (drafts included only while `showDraftContent` is on). */
export const visibleArticles = articles.filter((a) => a.status === 'published' || showDraftContent);
export const getArticle = (slug: string) => visibleArticles.find((a) => a.slug === slug);
