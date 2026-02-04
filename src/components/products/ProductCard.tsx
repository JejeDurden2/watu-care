'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import type { Product, ProductCategory } from '@/types/product';
import { getCategoryIcon, getCategoryGradient } from '@/lib/product-images';
import { AddToListButton } from '@/components/quote';
import { ProductImage } from './ProductImage';

interface ProductCardProps {
  product: Product;
  category: ProductCategory;
  locale: string;
}

export function ProductCard({
  product,
  category,
  locale,
}: ProductCardProps): React.ReactElement {
  const t = useTranslations('products');
  const Icon = getCategoryIcon(category.slug);
  const gradientClass = getCategoryGradient(category.slug);

  return (
    <div className="group relative h-full overflow-hidden rounded-2xl border border-border bg-white transition-all duration-300 hover:-translate-y-2 hover:border-primary/30 hover:shadow-depth-md">
      {/* Content wrapper with subtle scale */}
      <div className="relative h-full transition-transform duration-300 group-hover:scale-[1.02]">
        {/* Add to List Button - Overlay */}
        <div className="absolute right-3 top-3 z-10 opacity-0 transition-opacity group-hover:opacity-100 sm:opacity-100">
          <AddToListButton product={product} category={category} variant="icon" />
        </div>

        <Link
          href={`/${locale}/products/${category.slug}/${product.id}`}
          className="flex h-full flex-col"
        >
        {/* Header with image or gradient */}
        <div className="relative h-36">
          {product.image ? (
            <ProductImage
              src={product.image}
              alt={product.name}
              iconSlug={category.iconSlug}
              fallbackGradient={gradientClass}
              className="h-full w-full"
            />
          ) : (
            <div className={`relative h-full bg-gradient-to-br ${gradientClass} p-6`}>
              {/* Large watermark icon */}
              <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-20">
                <Icon className="h-20 w-20 text-white" />
              </div>
            </div>
          )}

          {/* Specification badges - overlaid on image/gradient */}
          <div className="absolute left-4 top-4 flex flex-wrap gap-2">
            {product.sizes && product.sizes.length > 0 && (
              <span className="rounded-full bg-white/20 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-sm">
                {t('sizes', { count: product.sizes.length })}
              </span>
            )}
            {product.specifications.length > 0 && (
              <span className="rounded-full bg-white/20 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-sm">
                {t('specs', { count: product.specifications.length })}
              </span>
            )}
          </div>
        </div>

        {/* Product Content */}
        <div className="flex flex-1 flex-col p-5">
          {/* Product Name */}
          <h3 className="mb-2 font-semibold text-secondary transition-colors group-hover:text-primary">
            {t.has(`items.${product.id}.name`)
              ? t(`items.${product.id}.name`)
              : product.name}
          </h3>

          {/* Product Description */}
          <p className="line-clamp-2 flex-grow text-sm leading-relaxed text-muted-foreground">
            {t.has(`items.${product.id}.description`)
              ? t(`items.${product.id}.description`)
              : product.description}
          </p>
        </div>
      </Link>
      </div>
    </div>
  );
}
