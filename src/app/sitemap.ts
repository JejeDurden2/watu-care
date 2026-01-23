import type { MetadataRoute } from 'next';
import { getAllCategories } from '@/lib/products';
import { locales } from '@/i18n/config';

const BASE_URL = 'https://watu-care.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const categories = getAllCategories();
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

  return [...staticPages, ...categoryPages, ...productPages];
}
