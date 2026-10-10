import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowUpRight, Clock } from 'lucide-react';
import { ServiceIcon } from '@/components/ServiceIcon';
import { formatPrice, type Service } from '@/data/services';

const MotionLink = motion.create(Link);

/** Glass service card: springs up on hover, gold line sweeps across, cursor spotlight (see .glass). */
export function ServiceCard({ service }: { service: Service }) {
  return (
    <MotionLink
      to={`/services/${service.slug}`}
      whileHover={{ y: -8 }}
      whileTap={{ scale: 0.985 }}
      transition={{ type: 'spring', stiffness: 260, damping: 22 }}
      className="glass group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] p-7 transition-colors duration-500 hover:bg-white/[0.07]"
    >
      <span className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-gradient-to-r from-transparent via-gold-500 to-transparent transition-transform duration-700 group-hover:scale-x-100" />
      <div className="flex items-start justify-between">
        <span className="flex h-12 w-12 items-center justify-center rounded-full border border-white/15 text-white transition-all duration-500 group-hover:-rotate-12 group-hover:border-white group-hover:bg-white group-hover:text-black">
          <ServiceIcon name={service.icon} className="h-5 w-5" />
        </span>
        {service.popular && <span className="label-cine text-gold-400">Popular</span>}
      </div>
      <h3 className="mt-6 text-lg leading-snug text-white">{service.name}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-white/60">{service.summary}</p>
      <div className="mt-6 flex items-end justify-between border-t border-white/10 pt-5">
        <div>
          <p className="label-cine text-white/45">Starting at</p>
          <p className="mt-1 text-2xl font-light text-white">
            {formatPrice(service.price)}
            <span className="align-super text-xs text-gold-400">*</span>
          </p>
          <p className="mt-1 flex items-center gap-1 text-xs text-white/50">
            <Clock className="h-3 w-3" /> {service.timeline}
          </p>
        </div>
        <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/25 text-white transition-all duration-500 group-hover:rotate-45 group-hover:border-gold-500 group-hover:bg-gold-500 group-hover:text-white">
          <ArrowUpRight className="h-4 w-4" />
        </span>
      </div>
    </MotionLink>
  );
}
