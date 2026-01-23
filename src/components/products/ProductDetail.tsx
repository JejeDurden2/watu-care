import type { Product, ProductCategory } from '@/types/product';
import { Button } from '@/components/ui';
import { ProductSpecs } from './ProductSpecs';

interface ProductDetailProps {
  product: Product;
  category: ProductCategory;
  locale: string;
}

export function ProductDetail({
  product,
  category,
}: ProductDetailProps): React.ReactElement {
  const Icon = category.icon;

  return (
    <div className="space-y-8">
      {/* Product Header */}
      <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
        <div className="flex-1">
          {/* Category Badge */}
          <div className="mb-4 inline-flex items-center gap-2 rounded-lg bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
            <Icon className="h-4 w-4" />
            <span>{category.title}</span>
          </div>

          {/* Product Name */}
          <h1 className="mb-4 text-3xl font-bold text-secondary md:text-4xl">
            {product.name}
          </h1>

          {/* Product Description */}
          <p className="text-lg text-foreground/80">{product.description}</p>
        </div>

        {/* CTA Button */}
        <Button size="lg" className="shrink-0" asChild>
          <a href="#quote">Request a Quote</a>
        </Button>
      </div>

      {/* Divider */}
      <div className="h-px bg-border" />

      {/* Product Specifications */}
      <ProductSpecs
        specifications={product.specifications}
        sizes={product.sizes}
        materials={product.materials}
      />
    </div>
  );
}
