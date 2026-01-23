import Link from 'next/link';
import { FileText } from 'lucide-react';
import type { Product, ProductCategory } from '@/types/product';
import { ProductImage } from './ProductImage';
import { getProductImageUrl, getCategoryGradient } from '@/lib/product-images';
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
  const imageUrl =
    product.image || getProductImageUrl(category.slug, product.name);
  const fallbackGradient = getCategoryGradient(category.slug);

  return (
    <div className="group relative h-full overflow-hidden rounded-xl border border-white/20 bg-white/70 backdrop-blur-sm transition-all hover:border-primary/50 hover:shadow-soft-md">
      {/* Add to List Button - Overlay */}
      <div className="absolute right-3 top-3 z-10 opacity-0 transition-opacity group-hover:opacity-100 sm:opacity-100">
        <AddToListButton product={product} category={category} variant="icon" />
      </div>

      <Link
        href={`/${locale}/products/${category.slug}/${product.id}`}
        className="flex h-full flex-col"
      >
        {/* Product Image */}
        <ProductImage
          src={imageUrl}
          alt={product.name}
          iconSlug={category.iconSlug}
          fallbackGradient={fallbackGradient}
          className="h-48 w-full"
        />

        {/* Product Content */}
        <div className="flex flex-1 flex-col p-6">
          {/* Product Name */}
          <h3 className="mb-3 text-lg font-semibold text-secondary transition-colors group-hover:text-primary">
            {product.name}
          </h3>

          {/* Product Description */}
          <p className="mb-4 flex-grow text-sm text-foreground/70">
            {product.description}
          </p>

          {/* Specifications Count */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <FileText className="h-4 w-4" />
            <span>
              {product.specifications.length} specification
              {product.specifications.length !== 1 ? 's' : ''}
            </span>
          </div>

          {/* Sizes Badge (if available) */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="mt-2 text-xs text-accent">
              {product.sizes.length} size{product.sizes.length !== 1 ? 's' : ''}{' '}
              available
            </div>
          )}
        </div>
      </Link>
    </div>
  );
}
