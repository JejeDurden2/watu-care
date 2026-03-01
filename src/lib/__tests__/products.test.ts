import { describe, it, expect } from 'vitest';
import {
  getAllCategories,
  getCategoryBySlug,
  getProductById,
  getProductBySlug,
  getAllProducts,
  getRelatedProducts,
  getTotalProductCount,
  getProductCountByCategory,
} from '@/lib/products';

describe('getAllCategories', () => {
  it('returns an array of categories', () => {
    const categories = getAllCategories();
    expect(Array.isArray(categories)).toBe(true);
    expect(categories.length).toBeGreaterThan(0);
  });

  it('each category has required fields', () => {
    const categories = getAllCategories();
    for (const category of categories) {
      expect(category.id).toBeDefined();
      expect(category.slug).toBeDefined();
      expect(category.title).toBeDefined();
      expect(category.description).toBeDefined();
      expect(Array.isArray(category.products)).toBe(true);
    }
  });
});

describe('getCategoryBySlug', () => {
  it('returns a category for a valid slug', () => {
    const category = getCategoryBySlug('gloves');
    expect(category).toBeDefined();
    expect(category?.slug).toBe('gloves');
  });

  it('returns undefined for an invalid slug', () => {
    const category = getCategoryBySlug('nonexistent-category');
    expect(category).toBeUndefined();
  });
});

describe('getProductById', () => {
  it('returns product and category for a valid product ID', () => {
    const categories = getAllCategories();
    const firstProduct = categories[0].products[0];
    const result = getProductById(firstProduct.id);

    expect(result).toBeDefined();
    expect(result?.product.id).toBe(firstProduct.id);
    expect(result?.category.id).toBe(categories[0].id);
  });

  it('returns undefined for an invalid product ID', () => {
    const result = getProductById('nonexistent-product');
    expect(result).toBeUndefined();
  });
});

describe('getProductBySlug', () => {
  it('returns a product for valid category slug and product ID', () => {
    const categories = getAllCategories();
    const category = categories[0];
    const product = category.products[0];
    const result = getProductBySlug(category.slug, product.id);

    expect(result).toBeDefined();
    expect(result?.id).toBe(product.id);
  });

  it('returns undefined for invalid category slug', () => {
    const result = getProductBySlug('nonexistent', 'some-id');
    expect(result).toBeUndefined();
  });

  it('returns undefined for invalid product ID in valid category', () => {
    const categories = getAllCategories();
    const result = getProductBySlug(categories[0].slug, 'nonexistent-product');
    expect(result).toBeUndefined();
  });
});

describe('getAllProducts', () => {
  it('returns all products flattened', () => {
    const products = getAllProducts();
    const categories = getAllCategories();
    const expectedCount = categories.reduce(
      (sum, cat) => sum + cat.products.length,
      0,
    );

    expect(products.length).toBe(expectedCount);
  });

  it('each product has required fields', () => {
    const products = getAllProducts();
    for (const product of products) {
      expect(product.id).toBeDefined();
      expect(product.name).toBeDefined();
      expect(product.description).toBeDefined();
      expect(Array.isArray(product.specifications)).toBe(true);
    }
  });
});

describe('getRelatedProducts', () => {
  it('returns related products excluding the current one', () => {
    const categories = getAllCategories();
    const category = categories[0];
    const product = category.products[0];
    const related = getRelatedProducts(category.slug, product.id);

    expect(related.every((p) => p.id !== product.id)).toBe(true);
  });

  it('respects the limit parameter', () => {
    const categories = getAllCategories();
    const category = categories[0];
    const product = category.products[0];
    const related = getRelatedProducts(category.slug, product.id, 2);

    expect(related.length).toBeLessThanOrEqual(2);
  });

  it('returns empty array for invalid category', () => {
    const related = getRelatedProducts('nonexistent', 'some-id');
    expect(related).toEqual([]);
  });
});

describe('getTotalProductCount', () => {
  it('returns the total count of all products', () => {
    const count = getTotalProductCount();
    const allProducts = getAllProducts();
    expect(count).toBe(allProducts.length);
  });
});

describe('getProductCountByCategory', () => {
  it('returns product count for a valid category', () => {
    const categories = getAllCategories();
    const count = getProductCountByCategory(categories[0].slug);
    expect(count).toBe(categories[0].products.length);
  });

  it('returns undefined for an invalid category', () => {
    const count = getProductCountByCategory('nonexistent');
    expect(count).toBeUndefined();
  });
});
