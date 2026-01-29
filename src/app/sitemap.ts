import type { MetadataRoute } from 'next';
import { getAllCategories } from '@/lib/products';
import { getTier1Countries } from '@/data/countries';
import { locales } from '@/i18n/config';

const BASE_URL = 'https://watu-care.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const categories = getAllCategories();
  const tier1Countries = getTier1Countries();
  const now = new Date();

  // Static pages for each locale
  const staticPages = locales.flatMap((locale) => [
    {
      url: `${BASE_URL}/${locale}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/${locale}/products`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/${locale}/about`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/${locale}/contact`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
  ]);

  // Category pages for each locale
  const categoryPages = locales.flatMap((locale) =>
    categories.map((category) => ({
      url: `${BASE_URL}/${locale}/products/${category.slug}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),
  );

  // Product pages for each locale
  const productPages = locales.flatMap((locale) =>
    categories.flatMap((category) =>
      category.products.map((product) => ({
        url: `${BASE_URL}/${locale}/products/${category.slug}/${product.id}`,
        lastModified: now,
        changeFrequency: 'monthly' as const,
        priority: 0.6,
      })),
    ),
  );

  // Supplier country hub pages (programmatic SEO)
  const supplierCountryPages = locales.flatMap((locale) =>
    tier1Countries.map((country) => ({
      url: `${BASE_URL}/${locale}/suppliers/${country.slug}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    })),
  );

  // Supplier category-country pages (programmatic SEO)
  const supplierCategoryPages = locales.flatMap((locale) =>
    tier1Countries.flatMap((country) =>
      categories.map((category) => ({
        url: `${BASE_URL}/${locale}/suppliers/${country.slug}/${category.slug}`,
        lastModified: now,
        changeFrequency: 'weekly' as const,
        priority: 0.75,
      })),
    ),
  );

  return [
    ...staticPages,
    ...categoryPages,
    ...productPages,
    ...supplierCountryPages,
    ...supplierCategoryPages,
  ];
}
