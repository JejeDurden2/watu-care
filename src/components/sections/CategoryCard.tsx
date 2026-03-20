'use client';

import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { ArrowRight } from 'lucide-react';
import {
  Package,
  Activity,
  Syringe,
  Bandage,
  Hand,
  ShieldCheck,
  Recycle,
  Wind,
  Scissors,
  Stethoscope,
  type LucideIcon,
} from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  gloves: Hand,
  'infection-prevention-ppe': ShieldCheck,
  'bodily-waste-management': Recycle,
  surgical: Package,
  'wound-care': Bandage,
  'clinical-consumables': Syringe,
  'vascular-access-catheters': Activity,
  'airway-respiratory': Wind,
  'surgical-instruments-sutures': Scissors,
  'patient-care-equipment': Stethoscope,
};

interface CategoryCardProps {
  slug: string;
  title: string;
  description: string;
  productCount?: number;
  /** Custom href path. If provided, uses this instead of /products/${slug} */
  href?: string;
}

export function CategoryCard({
  slug,
  title,
  description,
  productCount,
  href,
}: CategoryCardProps): React.ReactElement {
  const t = useTranslations('products');
  const iconSlug = slug.includes('/') ? slug.split('/').pop() ?? slug : slug;
  const Icon = iconMap[iconSlug] ?? Package;

  return (
    <Link
      href={href ?? `/products/${slug}`}
      className="card-glow group flex flex-col rounded-2xl border border-border bg-white p-6"
    >

      {/* Icon badge */}
      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/8 transition-colors duration-300 group-hover:bg-primary/15">
        <Icon className="h-6 w-6 text-primary" strokeWidth={1.5} />
      </div>

      {/* Content */}
      <h3 className="mb-2 text-lg font-semibold text-secondary">
        {title}
      </h3>
      <p className="mb-4 flex-1 text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>

      {/* Footer */}
      <div className="flex items-center gap-2 text-sm font-medium text-primary">
        {productCount !== undefined ? (
          <span className="text-sm text-muted-foreground">
            {t('productCount', { count: productCount })}
          </span>
        ) : (
          <span className="flex items-center gap-1.5 transition-transform duration-200 group-hover:translate-x-1">
            {t('viewProducts')}
            <ArrowRight className="h-4 w-4" />
          </span>
        )}
      </div>
    </Link>
  );
}
