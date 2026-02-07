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
  // Extract the category slug for icon lookup (handles paths like "suppliers/kenya/gloves")
  const iconSlug = slug.includes('/') ? slug.split('/').pop() ?? slug : slug;
  const Icon = iconMap[iconSlug] ?? Package;

  return (
    <Link
      href={href ?? `/products/${slug}`}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-white p-6 transition-all duration-300 hover:-translate-y-2 hover:border-primary/30 hover:shadow-depth-md"
    >

      {/* Animated icon badge */}
      <div className="relative mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 transition-all duration-300 group-hover:bg-primary group-hover:scale-110 group-hover:rotate-3">
        <Icon className="h-8 w-8 text-primary transition-all duration-300 group-hover:text-white group-hover:scale-110" />
      </div>

      {/* Content */}
      <h3 className="relative mb-2 text-lg font-semibold text-secondary transition-colors duration-200 group-hover:text-primary">
        {title}
      </h3>
      <p className="relative mb-4 flex-1 text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>

      {/* Footer - Product count or arrow */}
      <div className="relative flex items-center gap-2 text-sm font-medium text-primary">
        {productCount !== undefined ? (
          <span className="rounded-full bg-accent/10 px-3 py-1 text-accent">
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
