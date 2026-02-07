'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import type { ProductCategory } from '@/types/product';
import { ProductImage } from './ProductImage';
import { getCategoryIcon } from '@/lib/product-images';

interface CategoryCardProps {
  category: ProductCategory;
  locale: string;
}

export function CategoryCard({
  category,
  locale,
}: CategoryCardProps): React.ReactElement {
  const t = useTranslations('products');
  const Icon = getCategoryIcon(category.iconSlug);
  const imageUrl = category.image || undefined;

  // Get translated title and description, fallback to category data
  const title = t.has(`categories.${category.slug}.title`)
    ? t(`categories.${category.slug}.title`)
    : category.title;
  const description = t.has(`categories.${category.slug}.description`)
    ? t(`categories.${category.slug}.description`)
    : category.description;

  return (
    <Link
      href={`/${locale}/products/${category.slug}`}
      className="group block h-full overflow-hidden rounded-xl border border-white/20 bg-white/70 backdrop-blur-sm transition-all hover:border-primary/50 hover:shadow-soft-md"
    >
      <div className="flex h-full flex-col">
        {/* Category Image */}
        <ProductImage
          src={imageUrl}
          alt={title}
          className="h-48 w-full"
        />

        {/* Category Content */}
        <div className="flex flex-1 flex-col p-6">
          {/* Icon Badge */}
          <div
            className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg ${category.color}`}
          >
            <Icon className="h-6 w-6" />
          </div>

          {/* Category Title */}
          <h3 className="mb-3 text-xl font-semibold text-secondary transition-colors group-hover:text-primary">
            {title}
          </h3>

          {/* Category Description */}
          <p className="mb-4 flex-grow text-sm text-foreground/70">
            {description}
          </p>

          {/* Product Count */}
          <div className="text-sm font-medium text-primary">
            {t('productCount', { count: category.products.length })}
          </div>
        </div>
      </div>
    </Link>
  );
}
