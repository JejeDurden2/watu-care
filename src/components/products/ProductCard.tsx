import Link from 'next/link';
import type { Product, ProductCategory } from '@/types/product';
import { getCategoryIcon, getCategoryGradient } from '@/lib/product-images';
import { AddToListButton } from '@/components/quote';

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
  const Icon = getCategoryIcon(category.slug);
  const gradientClass = getCategoryGradient(category.slug);

  return (
    <div className="group relative h-full overflow-hidden rounded-2xl border border-border bg-white transition-all duration-200 hover:-translate-y-1 hover:border-primary/30 hover:shadow-soft-lg">
      {/* Add to List Button - Overlay */}
      <div className="absolute right-3 top-3 z-10 opacity-0 transition-opacity group-hover:opacity-100 sm:opacity-100">
        <AddToListButton product={product} category={category} variant="icon" />
      </div>

      <Link
        href={`/${locale}/products/${category.slug}/${product.id}`}
        className="flex h-full flex-col"
      >
        {/* Header with gradient and icon */}
        <div className={`relative h-36 bg-gradient-to-br ${gradientClass} p-6`}>
          {/* Large watermark icon */}
          <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-20">
            <Icon className="h-20 w-20 text-white" />
          </div>

          {/* Specification badges */}
          <div className="relative flex flex-wrap gap-2">
            {product.sizes && product.sizes.length > 0 && (
              <span className="rounded-full bg-white/20 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-sm">
                {product.sizes.length} sizes
              </span>
            )}
            {product.specifications.length > 0 && (
              <span className="rounded-full bg-white/20 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-sm">
                {product.specifications.length} specs
              </span>
            )}
          </div>
        </div>

        {/* Product Content */}
        <div className="flex flex-1 flex-col p-5">
          {/* Product Name */}
          <h3 className="mb-2 font-semibold text-secondary transition-colors group-hover:text-primary">
            {product.name}
          </h3>

          {/* Product Description */}
          <p className="line-clamp-2 flex-grow text-sm leading-relaxed text-muted-foreground">
            {product.description}
          </p>
        </div>
      </Link>
    </div>
  );
}
