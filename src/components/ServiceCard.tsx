import { Link } from 'react-router-dom';
import { ArrowUpRight, Clock } from 'lucide-react';
import { ServiceIcon } from '@/components/ServiceIcon';
import { formatPrice, type Service } from '@/data/services';

export function ServiceCard({ service }: { service: Service }) {
  return (
    <Link
      to={`/services/${service.slug}`}
      className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-navy-100 bg-white p-6 transition-all duration-500 hover:-translate-y-1.5 hover:border-navy-200 hover:shadow-2xl hover:shadow-navy-900/10"
    >
      <span className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-gold-400/0 blur-2xl transition-all duration-500 group-hover:bg-gold-400/20" />
      <div className="flex items-start justify-between">
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-navy-50 text-navy-800 transition-all duration-500 group-hover:bg-navy-800 group-hover:text-gold-400">
          <ServiceIcon name={service.icon} className="h-6 w-6" />
        </span>
        {service.popular && (
          <span className="rounded-full bg-gold-50 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-gold-700 ring-1 ring-gold-200">
            Popular
          </span>
        )}
      </div>
      <h3 className="mt-5 font-display text-lg font-bold leading-snug text-navy-900">{service.name}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-ink/65">{service.summary}</p>
      <div className="mt-5 flex items-end justify-between border-t border-navy-50 pt-4">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-wider text-ink/45">Starting at</p>
          <p className="font-display text-xl font-bold text-navy-900">
            {formatPrice(service.price)}
            <span className="align-super text-xs text-gold-600">*</span>
          </p>
          <p className="mt-1 flex items-center gap-1 text-xs text-ink/50">
            <Clock className="h-3 w-3" /> {service.timeline}
          </p>
        </div>
        <span className="flex h-10 w-10 items-center justify-center rounded-full border border-navy-100 text-navy-800 transition-all duration-500 group-hover:rotate-45 group-hover:border-gold-500 group-hover:bg-gold-500 group-hover:text-white">
          <ArrowUpRight className="h-4 w-4" />
        </span>
      </div>
    </Link>
  );
}
