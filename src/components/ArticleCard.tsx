import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import type { Article } from '@/data/resources';

export const formatDate = (d: string) => new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

export function DraftBadge({ className = '' }: { className?: string }) {
  return <span className={`rounded-full border border-gold-300 bg-gold-50 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-gold-700 ${className}`}>Draft — under review</span>;
}

export function ArticleCard({ article }: { article: Article }) {
  return (
    <motion.div whileHover={{ y: -5 }} transition={{ type: 'spring', stiffness: 320, damping: 26 }} className="h-full">
      <Link to={`/resources/${article.slug}`} className="group flex h-full flex-col overflow-hidden rounded-xl border border-line bg-white shadow-card transition-shadow hover:shadow-lift">
        <div className="aspect-[16/10] overflow-hidden bg-beige">
          <img src={article.image} alt={article.imageAlt} loading="lazy" decoding="async" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
        </div>
        <div className="flex flex-1 flex-col p-6">
          <div className="flex flex-wrap items-center gap-2 text-xs text-subtle">
            <span className="font-semibold uppercase tracking-[0.14em] text-gold-600">{article.category}</span>
            <span>·</span>
            <time dateTime={article.date}>{formatDate(article.date)}</time>
            {article.status === 'draft' && <DraftBadge />}
          </div>
          <h3 className="mt-3 font-display text-xl leading-snug text-navy-800 group-hover:text-navy-600">{article.title}</h3>
          <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{article.excerpt}</p>
          <span className="link-arrow mt-5">
            Read more <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
