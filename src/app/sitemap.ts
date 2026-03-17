import type { MetadataRoute } from 'next';
import { getAllCategories } from '@/lib/products';
import { getTier1Countries } from '@/data/countries';
import { getAllPersonas } from '@/data/personas';
import { locales } from '@/i18n/config';
import { BASE_URL } from '@/lib/constants';

// Use stable dates so crawlers can detect actual content changes.
// Update these when the corresponding content is modified.
const LAST_MODIFIED = {
  homepage: new Date('2026-02-24'),
  products: new Date('2026-02-24'),
  markets: new Date('2026-02-24'),
  about: new Date('2026-02-08'),
  contact: new Date('2026-02-08'),
  faq: new Date('2026-03-03'),
  personas: new Date('2026-03-03'),
  privacy: new Date('2026-02-08'),
  terms: new Date('2026-02-08'),
} as const;

// Per-category dates give crawlers finer-grained change signals.
// Update the relevant slug entry when that category's data changes.
const CATEGORY_MODIFIED: Record<string, Date> = {
  'gloves': new Date('2026-02-24'),
  'infection-prevention-ppe': new Date('2026-02-24'),
  'bodily-waste-management': new Date('2026-02-20'),
  'surgical': new Date('2026-02-24'),
  'wound-care': new Date('2026-02-18'),
  'clinical-consumables': new Date('2026-02-22'),
  'vascular-access-catheters': new Date('2026-02-15'),
  'airway-respiratory': new Date('2026-02-15'),
  'surgical-instruments-sutures': new Date('2026-02-18'),
  'patient-care-equipment': new Date('2026-02-20'),
};

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
      url: `${BASE_URL}/${locale}/markets`,
      lastModified: LAST_MODIFIED.markets,
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
      url: `${BASE_URL}/${locale}/faq`,
      lastModified: LAST_MODIFIED.faq,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
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
    {
      url: `${BASE_URL}/${locale}/solutions`,
      lastModified: LAST_MODIFIED.personas,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
  ]);

  // Category pages for each locale
  const categoryPages = locales.flatMap((locale) =>
    categories.map((category) => ({
      url: `${BASE_URL}/${locale}/products/${category.slug}`,
      lastModified: CATEGORY_MODIFIED[category.slug] ?? LAST_MODIFIED.products,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),
  );

  // Product pages for each locale
  const productPages = locales.flatMap((locale) =>
    categories.flatMap((category) =>
      category.products.map((product) => ({
        url: `${BASE_URL}/${locale}/products/${category.slug}/${product.id}`,
        lastModified: CATEGORY_MODIFIED[category.slug] ?? LAST_MODIFIED.products,
        changeFrequency: 'monthly' as const,
        priority: 0.6,
      })),
    ),
  );

  // Market country hub pages (programmatic SEO)
  const marketCountryPages = locales.flatMap((locale) =>
    tier1Countries.map((country) => ({
      url: `${BASE_URL}/${locale}/markets/${country.slug}`,
      lastModified: LAST_MODIFIED.markets,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    })),
  );

  // Persona landing pages (programmatic SEO)
  const personas = getAllPersonas();
  const personaPages = locales.flatMap((locale) =>
    personas.map((persona) => ({
      url: `${BASE_URL}/${locale}/solutions/${persona.slug}`,
      lastModified: LAST_MODIFIED.personas,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  );

  // Market category-country pages (/markets/{country}/{category}) are omitted
  // from the sitemap to improve crawl budget efficiency. These 480+ pages have
  // similar template content across countries and Google was not indexing them.
  // They remain live and crawlable via internal links from country hub pages.

  return [
    ...staticPages,
    ...categoryPages,
    ...productPages,
    ...marketCountryPages,
    ...personaPages,
  ];
}
