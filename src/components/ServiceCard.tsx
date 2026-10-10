import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowUpRight, Clock } from 'lucide-react';
import { formatPrice, type Service } from '@/data/services';

const MotionLink = motion.create(Link);

/** Photo-topped service card (matches the home carousel): lifts on a spring, photo zooms gently on hover. */
export function ServiceCard({ service }: { service: Service }) {
  return (
    <MotionLink
      to={`/services/${service.slug}`}
      whileHover={{ y: -6 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-mist-300/80 bg-soft-white shadow-sm transition-shadow duration-500 hover:shadow-xl hover:shadow-ink/10"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-mist-200">
        <img src={`/photos/services/${service.slug}.jpg`} alt={service.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
        {service.popular && (
          <span className="absolute left-3 top-3 rounded-full bg-soft-white/95 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-olive-800">Popular</span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-xl leading-snug text-ink">{service.name}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{service.summary}</p>
        <div className="mt-5 flex items-end justify-between border-t border-mist-300 pt-4">
          <div>
            <p className="text-lg font-semibold text-olive-800">
              {formatPrice(service.price)}
              <span className="text-xs font-normal text-subtle"> onwards*</span>
            </p>
            <p className="mt-0.5 flex items-center gap-1 text-xs text-subtle">
              <Clock className="h-3 w-3" /> {service.timeline}
            </p>
          </div>
          <span className="flex h-10 w-10 items-center justify-center rounded-full ring-1 ring-mist-300 text-ink transition-all duration-500 group-hover:rotate-45 group-hover:bg-olive-800 group-hover:text-soft-white group-hover:ring-olive-800">
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </div>
      </div>
    </MotionLink>
  );
}
