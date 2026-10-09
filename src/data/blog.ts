/**
 * Blog / articles. Add a new object to publish a new article —
 * it automatically gets a page at /blog/<slug> and a sitemap entry.
 * Body blocks: { h: 'heading' } or { p: 'paragraph' } or { ul: ['item', ...] }.
 */
export type BlogBlock = { h: string } | { p: string } | { ul: string[] };

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string; // YYYY-MM-DD
  readTime: string;
  category: string;
  body: BlogBlock[];
}

export const posts: BlogPost[] = [
  {
    slug: 'pvt-ltd-vs-llp-vs-opc',
    title: 'Private Limited vs LLP vs OPC: which structure is right for you?',
    excerpt: 'A simple comparison of the three most popular business structures for founders in India.',
    date: '2026-09-15',
    readTime: '5 min read',
    category: 'Business Registration',
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

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);
