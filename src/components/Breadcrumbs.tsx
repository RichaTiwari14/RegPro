import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export type Crumb = { name: string; path: string };

export function Breadcrumbs({ crumbs, light = false }: { crumbs: Crumb[]; light?: boolean }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className={`flex flex-wrap items-center gap-1.5 text-xs ${light ? 'text-white/60' : 'text-muted'}`}>
        {crumbs.map((c, i) => (
          <li key={c.path} className="flex items-center gap-1.5">
            {i > 0 && <ChevronRight className="h-3 w-3 text-forest-500" aria-hidden="true" />}
            {i < crumbs.length - 1 ? (
              <Link to={c.path} className={light ? 'hover:text-white' : 'hover:text-forest-800'}>
                {c.name}
              </Link>
            ) : (
              <span aria-current="page" className={light ? 'text-white' : 'text-forest-800'}>
                {c.name}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
