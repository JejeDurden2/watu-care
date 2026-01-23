import { productCategories } from '@/data/products';
import type { Product, ProductCategory } from '@/types/product';

/**
 * Get all product categories
 */
export function getAllCategories(): ProductCategory[] {
  return productCategories;
}

/**
 * Get a category by its slug
 */
export function getCategoryBySlug(slug: string): ProductCategory | undefined {
  return productCategories.find((category) => category.slug === slug);
}

/**
 * Get a product by its ID across all categories
 */
export function getProductById(productId: string): {
  product: Product;
  category: ProductCategory;
} | undefined {
  for (const category of productCategories) {
    const product = category.products.find((p) => p.id === productId);
    if (product) {
      return { product, category };
    }
  }
  return undefined;
}

/**
 * Get a product by category slug and product ID
 */
export function getProductBySlug(
  categorySlug: string,
  productId: string,
): Product | undefined {
  const category = getCategoryBySlug(categorySlug);
  if (!category) return undefined;
  return category.products.find((p) => p.id === productId);
}

/**
 * Get all products across all categories (flattened)
 */
export function getAllProducts(): Product[] {
  return productCategories.flatMap((category) => category.products);
}

/**
 * Get related products from the same category (excluding the current product)
 */
export function getRelatedProducts(
  categorySlug: string,
  currentProductId: string,
  limit = 4,
): Product[] {
  const category = getCategoryBySlug(categorySlug);
  if (!category) return [];

  return category.products
    .filter((p) => p.id !== currentProductId)
    .slice(0, limit);
}

/**
 * Get total product count
 */
export function getTotalProductCount(): number {
  return productCategories.reduce(
    (total, category) => total + category.products.length,
    0,
  );
}

/**
 * Get product count by category
 */
export function getProductCountByCategory(
  categorySlug: string,
): number | undefined {
  const category = getCategoryBySlug(categorySlug);
  return category?.products.length;
}
