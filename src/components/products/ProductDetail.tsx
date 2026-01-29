'use client';

import { useTranslations } from 'next-intl';
import type { Product, ProductCategory } from '@/types/product';
import { Button } from '@/components/ui';
import { ProductSpecs } from './ProductSpecs';
import { ProductImage } from './ProductImage';
import {
  getProductImageUrl,
  getCategoryGradient,
  getCategoryIcon,
} from '@/lib/product-images';
import { AddToListButton } from '@/components/quote';
import { useQuoteStore } from '@/lib/quote-store';

function RequestQuoteButton(): React.ReactElement {
  const t = useTranslations('quote');
  const openModal = useQuoteStore((state) => state.openModal);

  return (
    <Button size="lg" onClick={openModal} className="w-full sm:w-auto">
      {t('requestQuote')}
    </Button>
  );
}

interface ProductDetailProps {
  product: Product;
  category: ProductCategory;
  locale: string;
}

export function ProductDetail({
  product,
  category,
}: ProductDetailProps): React.ReactElement {
  const t = useTranslations('products');
  const Icon = getCategoryIcon(category.iconSlug);
  const imageUrl =
    product.image || getProductImageUrl(category.slug, product.name);
  const fallbackGradient = getCategoryGradient(category.slug);

  // Get translated category title
  const categoryTitle = t.has(`categories.${category.slug}.title`)
    ? t(`categories.${category.slug}.title`)
    : category.title;

  // Get translated product name
  const productName = t.has(`items.${product.id}.name`)
    ? t(`items.${product.id}.name`)
    : product.name;

  return (
    <div className="space-y-8">
      {/* Product Header with Image */}
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Product Image */}
        <div className="rounded-lg overflow-hidden">
          <ProductImage
            src={imageUrl}
            alt={productName}
            iconSlug={category.iconSlug}
            fallbackGradient={fallbackGradient}
            className="aspect-square w-full"
            priority
          />
        </div>

        {/* Product Info */}
        <div className="flex flex-col">
          {/* Category Badge */}
          <div className="mb-4 inline-flex w-fit items-center gap-2 rounded-lg bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
            <Icon className="h-4 w-4" />
            <span>{categoryTitle}</span>
          </div>

          {/* Product Name */}
          <h1 className="mb-4 text-3xl font-bold text-secondary md:text-4xl">
            {productName}
          </h1>

          {/* Product Description */}
          <p className="mb-6 text-lg text-foreground/80">
            {t.has(`items.${product.id}.description`)
              ? t(`items.${product.id}.description`)
              : product.description}
          </p>

{/* CTA Buttons */}
          <div className="flex flex-col gap-3 sm:flex-row">
            <AddToListButton
              product={product}
              category={category}
              variant="full"
              className="h-12 px-6 text-base"
            />
            <RequestQuoteButton />
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-border" />

      {/* Product Specifications */}
      <ProductSpecs
        productId={product.id}
        specifications={product.specifications}
        sizes={product.sizes}
        materials={product.materials}
      />
    </div>
  );
}
