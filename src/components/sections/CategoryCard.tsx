'use client';

import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { ArrowRight } from 'lucide-react';
import {
  Package,
  Activity,
  Syringe,
  Bandage,
  TestTube,
  Dog,
  Bed,
  Hand,
  ShieldCheck,
  Recycle,
  type LucideIcon,
} from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  surgical: Package,
  tube: Activity,
  'central-venous-catheter': Syringe,
  dressing: Bandage,
  'laboratory-supplies': TestTube,
  'veterinary-products': Dog,
  'medical-equipment': Bed,
  gloves: Hand,
  'face-protection': ShieldCheck,
  'bodily-waste-management': Recycle,
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
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-white p-6 transition-all duration-200 hover:-translate-y-1 hover:border-primary/30 hover:shadow-soft-lg"
    >
      {/* Subtle gradient accent in corner */}
      <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gradient-to-br from-primary/10 to-accent/5 blur-2xl transition-all duration-300 group-hover:scale-150 group-hover:opacity-80" />

      {/* Icon */}
      <div className="relative mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 transition-colors duration-200 group-hover:bg-primary">
        <Icon className="h-8 w-8 text-primary transition-colors duration-200 group-hover:text-white" />
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
