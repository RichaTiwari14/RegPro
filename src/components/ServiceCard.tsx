import { Link } from 'react-router-dom';
import { ArrowUpRight, Clock } from 'lucide-react';
import { ServiceIcon } from '@/components/ServiceIcon';
import { formatPrice, type Service } from '@/data/services';

/** Frosted-glass service card; a gold horizon line sweeps across on hover. */
export function ServiceCard({ service }: { service: Service }) {
  return (
    <Link
      to={`/services/${service.slug}`}
      className="glass group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] p-7 transition-all duration-500 hover:-translate-y-1.5 hover:bg-white/75"
    >
      <span className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-gradient-to-r from-transparent via-gold-500 to-transparent transition-transform duration-700 group-hover:scale-x-100" />
      <div className="flex items-start justify-between">
        <span className="flex h-12 w-12 items-center justify-center rounded-full border border-navy-800/15 text-navy-800 transition-all duration-500 group-hover:border-navy-800 group-hover:bg-navy-800 group-hover:text-gold-400">
          <ServiceIcon name={service.icon} className="h-5 w-5" />
        </span>
        {service.popular && <span className="label-cine text-gold-700">Popular</span>}
      </div>
      <h3 className="mt-6 text-lg leading-snug text-navy-800">{service.name}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-ink/60">{service.summary}</p>
      <div className="mt-6 flex items-end justify-between border-t border-navy-800/10 pt-5">
        <div>
          <p className="label-cine text-ink/45">Starting at</p>
          <p className="mt-1 text-2xl font-light text-navy-800">
            {formatPrice(service.price)}
            <span className="align-super text-xs text-gold-600">*</span>
          </p>
          <p className="mt-1 flex items-center gap-1 text-xs text-ink/50">
            <Clock className="h-3 w-3" /> {service.timeline}
          </p>
        </div>
        <span className="flex h-11 w-11 items-center justify-center rounded-full border border-navy-800/25 text-navy-800 transition-all duration-500 group-hover:rotate-45 group-hover:border-gold-500 group-hover:bg-gold-500 group-hover:text-white">
          <ArrowUpRight className="h-4 w-4" />
        </span>
      </div>
    </Link>
  );
}
