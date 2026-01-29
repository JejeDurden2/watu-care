import type { Product, ProductCategory } from '@/types/product';

const BASE_URL = 'https://watu-care.com';

// Schema.org type definitions
type SchemaType = Record<string, unknown>;

export interface GraphSchema {
  '@context': 'https://schema.org';
  '@graph': SchemaType[];
}

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
  url?: string;
  brand: {
    '@type': 'Brand';
    name: string;
  };
  manufacturer?: {
    '@type': 'Organization';
    name: string;
    url: string;
  };
  offers: {
    '@type': 'Offer';
    availability: string;
    priceCurrency: string;
    priceSpecification?: {
      '@type': 'PriceSpecification';
      priceCurrency: string;
      eligibleQuantity?: {
        '@type': 'QuantitativeValue';
        unitText: string;
      };
    };
    seller?: {
      '@type': 'Organization';
      name: string;
    };
    itemCondition?: string;
    businessFunction?: string;
  };
  category: string;
  isRelatedTo?: {
    '@type': 'ProductGroup';
    name: string;
  };
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

export interface FAQSchema {
  '@context': 'https://schema.org';
  '@type': 'FAQPage';
  mainEntity: Array<{
    '@type': 'Question';
    name: string;
    acceptedAnswer: {
      '@type': 'Answer';
      text: string;
    };
  }>;
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
      'Connecting Asian manufacturers with healthcare providers across Africa and the Middle East. Medical devices and PPE wholesale. Based in Hong Kong.',
    email: 'contact@watu-care.com',
    telephone: '+212-662-258-045',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Hong Kong',
      addressRegion: 'Hong Kong',
      addressCountry: 'HK',
    },
    areaServed: ['Africa', 'Middle East'],
    sameAs: [
      // Add social media links when available:
      // 'https://www.linkedin.com/company/watu-care',
    ],
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
      'Medical devices and PPE wholesale. Connecting Asian manufacturers with healthcare providers in Africa and the Middle East.',
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
 * For B2B wholesale, we use priceSpecification to indicate quote-based pricing
 */
export function generateProductSchema(
  product: Product,
  category: ProductCategory,
  locale: string,
  translatedDescription?: string,
): ProductSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: translatedDescription || product.description,
    image: product.image || `${BASE_URL}/logo.png`,
    url: `${BASE_URL}/${locale}/products/${category.slug}/${product.id}`,
    brand: {
      '@type': 'Brand',
      name: 'Watu Care',
    },
    manufacturer: {
      '@type': 'Organization',
      name: 'Watu Care',
      url: BASE_URL,
    },
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      priceCurrency: 'USD',
      priceSpecification: {
        '@type': 'PriceSpecification',
        priceCurrency: 'USD',
        eligibleQuantity: {
          '@type': 'QuantitativeValue',
          unitText: 'wholesale',
        },
      },
      seller: {
        '@type': 'Organization',
        name: 'Watu Care',
      },
      itemCondition: 'https://schema.org/NewCondition',
      businessFunction: 'http://purl.org/goodrelations/v1#Sell',
    },
    category: category.title,
    isRelatedTo: {
      '@type': 'ProductGroup',
      name: category.title,
    },
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
      'B2B medical devices and PPE wholesale supplier. Serving healthcare providers in Africa and the Middle East. Based in Hong Kong.',
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
    areaServed: ['Africa', 'Middle East'],
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

/**
 * Generate ContactPage schema
 */
export function generateContactPageSchema(locale: string): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact Watu Care',
    url: `${BASE_URL}/${locale}/contact`,
    description: 'Contact Watu Care for B2B medical supplies inquiries. Get a quote within 24-48 hours.',
    mainEntity: {
      '@type': 'Organization',
      name: 'Watu Care',
      email: 'contact@watu-care.com',
      telephone: '+212-662-258-045',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Hong Kong',
        addressCountry: 'HK',
      },
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'sales',
        email: 'contact@watu-care.com',
        telephone: '+212-662-258-045',
        areaServed: ['Africa', 'Middle East'],
        availableLanguage: ['English', 'French'],
      },
    },
  };
}

/**
 * Generate AboutPage schema
 */
export function generateAboutPageSchema(locale: string): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'About Watu Care',
    url: `${BASE_URL}/${locale}/about`,
    description: 'Learn about Watu Care - connecting Asian medical manufacturers with healthcare providers across Africa and the Middle East.',
    mainEntity: {
      '@type': 'Organization',
      '@id': `${BASE_URL}/#organization`,
      name: 'Watu Care',
      url: BASE_URL,
      logo: `${BASE_URL}/logo.png`,
      foundingLocation: {
        '@type': 'Place',
        name: 'Hong Kong',
      },
      areaServed: [
        {
          '@type': 'Continent',
          name: 'Africa',
        },
        {
          '@type': 'Place',
          name: 'Middle East',
        },
      ],
      knowsAbout: [
        'Medical devices',
        'Personal protective equipment',
        'Healthcare supplies',
        'B2B medical wholesale',
      ],
    },
  };
}

/**
 * Generate FAQ schema for rich snippets
 */
export function generateFAQSchema(
  items: Array<{ question: string; answer: string }>,
): FAQSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

/**
 * Generate LocalBusiness schema for country-specific pages
 * Indicates service availability in a specific geographic area
 */
export function generateLocalBusinessSchema(
  countryName: string,
  countryCode: string,
  locale: string,
): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalBusiness',
    name: `Watu Care - Medical Supplies in ${countryName}`,
    url: `${BASE_URL}/${locale}/suppliers/${countryCode.toLowerCase()}`,
    logo: `${BASE_URL}/logo.png`,
    description: `Trusted medical supplies supplier for healthcare facilities in ${countryName}. Quality medical devices and PPE from certified Asian manufacturers.`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Hong Kong',
      addressCountry: 'HK',
    },
    areaServed: {
      '@type': 'Country',
      name: countryName,
    },
    serviceArea: {
      '@type': 'Country',
      name: countryName,
    },
    priceRange: '$$',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: `Medical Supplies for ${countryName}`,
      itemListElement: [
        { '@type': 'Offer', itemOffered: { '@type': 'Product', name: 'Personal Protective Equipment' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Product', name: 'Medical Devices' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Product', name: 'Laboratory Supplies' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Product', name: 'Surgical Equipment' } },
      ],
    },
  };
}

/**
 * Generate Service schema for category-country pages
 * Shows specific product category availability in a country
 */
export function generateServiceSchema(
  categoryName: string,
  countryName: string,
  countrySlug: string,
  categorySlug: string,
  locale: string,
): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `${categoryName} Supply in ${countryName}`,
    url: `${BASE_URL}/${locale}/suppliers/${countrySlug}/${categorySlug}`,
    provider: {
      '@type': 'Organization',
      name: 'Watu Care',
      url: BASE_URL,
    },
    areaServed: {
      '@type': 'Country',
      name: countryName,
    },
    serviceType: 'Medical Supply Distribution',
    description: `Quality ${categoryName} for healthcare facilities in ${countryName}. Direct from certified Asian manufacturers with competitive pricing and reliable delivery.`,
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      priceCurrency: 'USD',
      priceSpecification: {
        '@type': 'PriceSpecification',
        priceCurrency: 'USD',
        eligibleQuantity: {
          '@type': 'QuantitativeValue',
          unitText: 'wholesale',
        },
      },
    },
  };
}

/**
 * Generate ItemList schema for products available in a country/category
 */
export function generateSupplierItemListSchema(
  items: Array<{ name: string; url: string; description?: string }>,
  listName: string,
): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: listName,
    numberOfItems: items.length,
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      url: item.url,
      ...(item.description && { description: item.description }),
    })),
  };
}

/**
 * Combine multiple schemas into a @graph structure
 * This is the recommended way to include multiple schemas on a page
 */
export function combineSchemas(
  ...schemas: Array<
    | OrganizationSchema
    | WebSiteSchema
    | ProductSchema
    | BreadcrumbSchema
    | FAQSchema
    | Record<string, unknown>
  >
): GraphSchema {
  // Remove @context from individual schemas and combine into @graph
  const graphItems = schemas.map((schema) => {
    const result: SchemaType = {};
    for (const [key, value] of Object.entries(schema)) {
      if (key !== '@context') {
        result[key] = value;
      }
    }
    return result;
  });

  return {
    '@context': 'https://schema.org',
    '@graph': graphItems,
  };
}
