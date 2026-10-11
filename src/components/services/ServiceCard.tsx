import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { ServiceIcon } from '@/components/ServiceIcon';
import { formatPrice, type Service } from '@/data/services';

const MotionLink = motion.create(Link);
const spring = { type: 'spring', stiffness: 320, damping: 26 } as const;

/** Photo card used for featured services. */
export function ServiceCard({ service }: { service: Service }) {
  return (
    <MotionLink
      to={`/services/${service.slug}`}
      whileHover={{ y: -6, transition: spring }}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-card transition-shadow duration-500 hover:shadow-lift"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-beige">
        <img src={service.image} alt={service.imageAlt} loading="lazy" decoding="async" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
        <span className="icon-chip absolute left-4 top-4 h-10 w-10 !bg-white shadow-sm">
          <ServiceIcon name={service.icon} className="h-5 w-5" />
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-xl leading-snug text-forest-800">{service.name}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{service.summary}</p>
        <div className="mt-5 flex items-end justify-between border-t border-line pt-4">
          <p className="text-sm text-muted">
            Starting at <span className="font-display text-lg text-forest-800">{formatPrice(service.price)}*</span>
          </p>
          <span className="link-arrow">
            Details <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </MotionLink>
  );
}

/** Compact card used in service grids (icon, name, price). */
export function ServiceTile({ service }: { service: Service }) {
  return (
    <MotionLink
      to={`/services/${service.slug}`}
      whileHover={{ y: -4, transition: spring }}
      className="group flex h-full flex-col rounded-2xl border border-line bg-white p-5 shadow-card transition-[box-shadow,border-color] duration-300 hover:border-sage-300 hover:shadow-lift"
    >
      <span className="icon-chip h-11 w-11 transition-colors group-hover:bg-forest-800 group-hover:text-white">
        <ServiceIcon name={service.icon} className="h-5 w-5" />
      </span>
      <h3 className="mt-4 text-[15px] font-semibold leading-snug text-forest-900">{service.name}</h3>
      <p className="mt-1.5 flex-1 text-[13.5px] leading-relaxed text-muted">{service.summary}</p>
      <div className="mt-4 flex items-center justify-between">
        <span className="text-sm text-muted">
          From <span className="font-medium text-forest-800">{formatPrice(service.price)}*</span>
        </span>
        <ArrowRight className="h-4 w-4 text-forest-700 transition-transform group-hover:translate-x-1" />
      </div>
    </MotionLink>
  );
}
