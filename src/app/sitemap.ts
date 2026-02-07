import type { MetadataRoute } from 'next';
import { getAllCategories } from '@/lib/products';
import { getTier1Countries } from '@/data/countries';
import { locales } from '@/i18n/config';

const BASE_URL = 'https://watu-care.com';

// Use stable dates so crawlers can detect actual content changes.
// Update these when the corresponding content is modified.
const LAST_MODIFIED = {
  homepage: new Date('2026-02-07'),
  products: new Date('2026-02-07'),
  suppliers: new Date('2026-02-07'),
  about: new Date('2026-01-29'),
  contact: new Date('2026-01-29'),
  privacy: new Date('2025-12-01'),
  terms: new Date('2025-12-01'),
} as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const categories = getAllCategories();
  const tier1Countries = getTier1Countries();

  // Static pages for each locale
  const staticPages = locales.flatMap((locale) => [
    {
      url: `${BASE_URL}/${locale}`,
      lastModified: LAST_MODIFIED.homepage,
      changeFrequency: 'weekly' as const,
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/${locale}/products`,
      lastModified: LAST_MODIFIED.products,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/${locale}/suppliers`,
      lastModified: LAST_MODIFIED.suppliers,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/${locale}/about`,
      lastModified: LAST_MODIFIED.about,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/${locale}/contact`,
      lastModified: LAST_MODIFIED.contact,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/${locale}/privacy`,
      lastModified: LAST_MODIFIED.privacy,
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/${locale}/terms`,
      lastModified: LAST_MODIFIED.terms,
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
  ]);

  // Category pages for each locale
  const categoryPages = locales.flatMap((locale) =>
    categories.map((category) => ({
      url: `${BASE_URL}/${locale}/products/${category.slug}`,
      lastModified: LAST_MODIFIED.products,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),
  );

  // Product pages for each locale
  const productPages = locales.flatMap((locale) =>
    categories.flatMap((category) =>
      category.products.map((product) => ({
        url: `${BASE_URL}/${locale}/products/${category.slug}/${product.id}`,
        lastModified: LAST_MODIFIED.products,
        changeFrequency: 'monthly' as const,
        priority: 0.6,
      })),
    ),
  );

  // Supplier country hub pages (programmatic SEO)
  const supplierCountryPages = locales.flatMap((locale) =>
    tier1Countries.map((country) => ({
      url: `${BASE_URL}/${locale}/suppliers/${country.slug}`,
      lastModified: LAST_MODIFIED.suppliers,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    })),
  );

  // Supplier category-country pages (programmatic SEO)
  const supplierCategoryPages = locales.flatMap((locale) =>
    tier1Countries.flatMap((country) =>
      categories.map((category) => ({
        url: `${BASE_URL}/${locale}/suppliers/${country.slug}/${category.slug}`,
        lastModified: LAST_MODIFIED.suppliers,
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
