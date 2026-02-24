'use client';

import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import type { Product, ProductCategory } from '@/types/product';
import { Camera } from 'lucide-react';
import { AddToListButton } from '@/components/quote';
import { ProductImage } from './ProductImage';

interface ProductCardProps {
  product: Product;
  category: ProductCategory;
}

export function ProductCard({
  product,
  category,
}: ProductCardProps): React.ReactElement {
  const t = useTranslations('products');

  return (
    <div className="group relative h-full overflow-hidden rounded-2xl border border-border bg-white transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-depth-md">
      {/* Add to List Button — always visible */}
      <div className="absolute right-3 top-3 z-10">
        <AddToListButton product={product} category={category} variant="icon" />
      </div>

      <Link
        href={`/products/${category.slug}/${product.id}`}
        className="flex h-full flex-col"
      >
        {/* Header with image or placeholder */}
        <div className="relative h-36">
          {product.image ? (
            <ProductImage
              src={product.image}
              alt={product.name}
              className="h-full w-full"
            />
          ) : (
            <div className="flex h-full flex-col items-center justify-center gap-2 bg-primary">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15">
                <Camera className="h-5 w-5 text-white/80" strokeWidth={1.5} />
              </div>
              <span className="text-[11px] font-medium tracking-wide text-white/90">
                Photos coming soon
              </span>
            </div>
          )}

          {/* Specification badges */}
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
          <h3 className="mb-2 font-semibold text-secondary transition-colors group-hover:text-primary">
            {t.has(`items.${product.id}.name`)
              ? t(`items.${product.id}.name`)
              : product.name}
          </h3>

          <p className="line-clamp-2 flex-grow text-sm leading-relaxed text-muted-foreground">
            {t.has(`items.${product.id}.description`)
              ? t(`items.${product.id}.description`)
              : product.description}
          </p>
        </div>
      </Link>
    </div>
  );
}
