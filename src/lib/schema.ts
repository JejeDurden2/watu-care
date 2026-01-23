import type { Product, ProductCategory } from '@/types/product';

const BASE_URL = 'https://watu-care.com';

export interface OrganizationSchema {
  '@context': 'https://schema.org';
  '@type': 'Organization';
  name: string;
  url: string;
  logo: string;
  description: string;
  email: string;
  telephone: string;
  address: {
    '@type': 'PostalAddress';
    addressLocality: string;
    addressRegion: string;
    addressCountry: string;
  };
  areaServed: string[];
  sameAs: string[];
}

export interface ProductSchema {
  '@context': 'https://schema.org';
  '@type': 'Product';
  name: string;
  description: string;
  image?: string;
  brand: {
    '@type': 'Brand';
    name: string;
  };
  offers: {
    '@type': 'Offer';
    availability: string;
    priceCurrency: string;
    priceSpecification: {
      '@type': 'PriceSpecification';
      priceCurrency: string;
    };
  };
  category: string;
}

export interface BreadcrumbSchema {
  '@context': 'https://schema.org';
  '@type': 'BreadcrumbList';
  itemListElement: Array<{
    '@type': 'ListItem';
    position: number;
    name: string;
    item?: string;
  }>;
}

export interface WebSiteSchema {
  '@context': 'https://schema.org';
  '@type': 'WebSite';
  name: string;
  url: string;
  description: string;
  inLanguage: string[];
  publisher: {
    '@type': 'Organization';
    name: string;
    logo: {
      '@type': 'ImageObject';
      url: string;
    };
  };
}

/**
 * Generate Organization schema for the company
 */
export function generateOrganizationSchema(): OrganizationSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Watu Care',
    url: BASE_URL,
    logo: `${BASE_URL}/logo.png`,
    description:
      "Bridging Asia's leading manufacturers with healthcare providers across Africa and the Middle East. Premium medical devices and PPE wholesale.",
    email: 'contact@watu-care.com',
    telephone: '+852-9876-5432',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Hong Kong',
      addressRegion: 'Hong Kong',
      addressCountry: 'HK',
    },
    areaServed: [
      'Africa',
      'Middle East',
      'Kenya',
      'Nigeria',
      'South Africa',
      'UAE',
      'Saudi Arabia',
      'Egypt',
    ],
    sameAs: [],
  };
}

/**
 * Generate WebSite schema
 */
export function generateWebSiteSchema(locale: string): WebSiteSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Watu Care',
    url: `${BASE_URL}/${locale}`,
    description:
      "Premium medical devices and PPE wholesale. Connecting Asia's manufacturers with healthcare providers in Africa and the Middle East.",
    inLanguage: ['en', 'fr'],
    publisher: {
      '@type': 'Organization',
      name: 'Watu Care',
      logo: {
        '@type': 'ImageObject',
        url: `${BASE_URL}/logo.png`,
      },
    },
  };
}

/**
 * Generate Product schema for a product page
 */
export function generateProductSchema(
  product: Product,
  category: ProductCategory,
  locale: string,
): ProductSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.image || `${BASE_URL}/hero-medical.jpg`,
    brand: {
      '@type': 'Brand',
      name: 'Watu Care',
    },
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      priceCurrency: 'USD',
      priceSpecification: {
        '@type': 'PriceSpecification',
        priceCurrency: 'USD',
      },
    },
    category: category.title,
  };
}

/**
 * Generate Breadcrumb schema for navigation
 */
export function generateBreadcrumbSchema(
  items: Array<{ name: string; url?: string }>,
): BreadcrumbSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      ...(item.url && { item: item.url }),
    })),
  };
}

/**
 * Generate MedicalBusiness schema (for healthcare-specific SEO)
 */
export function generateMedicalBusinessSchema(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalBusiness',
    name: 'Watu Care',
    url: BASE_URL,
    logo: `${BASE_URL}/logo.png`,
    description:
      'B2B medical devices and PPE wholesale supplier serving healthcare providers in Africa and the Middle East.',
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Hong Kong',
      addressCountry: 'HK',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 22.3193,
      longitude: 114.1694,
    },
    areaServed: [
      {
        '@type': 'GeoCircle',
        geoMidpoint: {
          '@type': 'GeoCoordinates',
          latitude: 0,
          longitude: 20,
        },
        geoRadius: '5000',
      },
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Medical Supplies Catalog',
      itemListElement: [
        {
          '@type': 'OfferCatalog',
          name: 'Personal Protective Equipment',
        },
        {
          '@type': 'OfferCatalog',
          name: 'Medical Devices',
        },
        {
          '@type': 'OfferCatalog',
          name: 'Laboratory Supplies',
        },
      ],
    },
  };
}
