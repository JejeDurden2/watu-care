import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  locale: string;
  /** Use 'light' variant for dark backgrounds */
  variant?: 'default' | 'light';
}

export function Breadcrumb({
  items,
  locale,
  variant = 'default',
}: BreadcrumbProps): React.ReactElement {
  const isLight = variant === 'light';

  return (
    <nav aria-label="Breadcrumb" className="mb-8">
      <ol
        className={cn(
          'flex flex-wrap items-center gap-2 text-sm',
          isLight ? 'text-white/70' : 'text-muted-foreground'
        )}
      >
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={index} className="flex items-center gap-2">
              {item.href && !isLast ? (
                <Link
                  href={`/${locale}${item.href}`}
                  className={cn(
                    'transition-colors',
                    isLight ? 'hover:text-white' : 'hover:text-foreground'
                  )}
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  className={cn(
                    isLast && 'font-medium',
                    isLast && (isLight ? 'text-white' : 'text-foreground')
                  )}
                >
                  {item.label}
                </span>
              )}
              {!isLast && <ChevronRight className="h-4 w-4" />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
