import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowUpRight, Clock } from 'lucide-react';
import { ServiceIcon } from '@/components/ServiceIcon';
import { formatPrice, type Service } from '@/data/services';

const MotionLink = motion.create(Link);

/** White service card — lifts on a spring, icon tile flips to navy and the arrow turns gold on hover. */
export function ServiceCard({ service }: { service: Service }) {
  return (
    <MotionLink
      to={`/services/${service.slug}`}
      whileHover={{ y: -8 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
      className="glass group flex h-full flex-col overflow-hidden p-7 transition-shadow duration-500 hover:shadow-[0_30px_60px_-24px_rgba(53,63,34,0.3)]"
    >
      <span className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-olive-800 via-sage-500 to-sage-300 transition-transform duration-700 group-hover:scale-x-100" />
      <div className="flex items-start justify-between">
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-olive-50 text-olive-800 transition-colors duration-500 group-hover:bg-olive-800 group-hover:text-sage-400">
          <ServiceIcon name={service.icon} className="h-5 w-5" />
        </span>
        {service.popular && (
          <span className="rounded-full bg-sage-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-sage-700 ring-1 ring-sage-200">Popular</span>
        )}
      </div>
      <h3 className="mt-6 font-display text-2xl font-semibold leading-tight text-olive-800">{service.name}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{service.summary}</p>
      <div className="mt-6 flex items-end justify-between border-t border-olive-800/10 pt-5">
        <div>
          <p className="label-cine text-subtle">Starting at</p>
          <p className="mt-1 font-display text-2xl font-semibold text-olive-800">
            {formatPrice(service.price)}
            <span className="align-super text-xs text-sage-600">*</span>
          </p>
          <p className="mt-1 flex items-center gap-1 text-xs text-subtle">
            <Clock className="h-3 w-3" /> {service.timeline}
          </p>
        </div>
        <span className="flex h-11 w-11 items-center justify-center rounded-full border border-olive-800/15 text-olive-800 transition-all duration-500 group-hover:rotate-45 group-hover:border-sage-500 group-hover:bg-sage-500 group-hover:text-white">
          <ArrowUpRight className="h-4 w-4" />
        </span>
      </div>
    </MotionLink>
  );
}
