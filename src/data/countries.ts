/**
 * Country data for programmatic SEO pages
 * Includes all served countries + enhanced Tier 1 data for SEO
 */

export interface Country {
  code: string;
  name: string;
  slug: string;
  region: 'africa' | 'middle-east';
  tier: 1 | 2 | 3;
  // Enhanced SEO data (Tier 1 only)
  nameLocal?: string;
  subRegion?: string;
  capital?: string;
  currency?: string;
  languages?: string[];
  healthcareContext?: string;
  marketHighlights?: string[];
  keyFacilities?: string[];
}

// Tier 1 countries with full SEO data
const tier1Countries: Country[] = [
  {
    code: 'AE',
    name: 'United Arab Emirates',
    slug: 'uae',
    nameLocal: 'الإمارات العربية المتحدة',
    region: 'middle-east',
    subRegion: 'Gulf States',
    capital: 'Abu Dhabi',
    currency: 'AED',
    languages: ['Arabic', 'English'],
    tier: 1,
    healthcareContext:
      'The UAE has one of the most advanced healthcare systems in the Middle East, with world-class hospitals in Dubai and Abu Dhabi. The government has invested heavily in healthcare infrastructure, attracting international medical tourism and requiring high-quality medical supplies.',
    marketHighlights: [
      'Advanced healthcare infrastructure',
      'High purchasing power',
      'Medical tourism hub',
      'Strict quality standards (DOH, DHA)',
    ],
    keyFacilities: [
      'Cleveland Clinic Abu Dhabi',
      'Mediclinic',
      'NMC Healthcare',
      'Aster DM Healthcare',
    ],
  },
  {
    code: 'SA',
    name: 'Saudi Arabia',
    slug: 'saudi-arabia',
    nameLocal: 'المملكة العربية السعودية',
    region: 'middle-east',
    subRegion: 'Gulf States',
    capital: 'Riyadh',
    currency: 'SAR',
    languages: ['Arabic'],
    tier: 1,
    healthcareContext:
      'Saudi Arabia is the largest healthcare market in the Gulf region, with Vision 2030 driving massive investments in healthcare infrastructure. The kingdom is expanding hospital capacity and localizing medical supply chains.',
    marketHighlights: [
      'Largest Gulf healthcare market',
      'Vision 2030 healthcare investments',
      'Growing private sector',
      'SFDA regulatory framework',
    ],
    keyFacilities: [
      'King Faisal Specialist Hospital',
      'Saudi German Hospitals',
      'Dr. Sulaiman Al Habib Medical Group',
      'National Guard Health Affairs',
    ],
  },
  {
    code: 'KE',
    name: 'Kenya',
    slug: 'kenya',
    region: 'africa',
    subRegion: 'East Africa',
    capital: 'Nairobi',
    currency: 'KES',
    languages: ['English', 'Swahili'],
    tier: 1,
    healthcareContext:
      'Kenya serves as the healthcare hub for East Africa, with Nairobi hosting regional offices of major health organizations. The country has a growing network of private hospitals and clinics serving both local and regional patients.',
    marketHighlights: [
      'East African healthcare hub',
      'Strong private hospital sector',
      'Medical tourism from neighboring countries',
      'Growing middle class',
    ],
    keyFacilities: [
      'Aga Khan University Hospital',
      'Nairobi Hospital',
      'Kenyatta National Hospital',
      'MP Shah Hospital',
    ],
  },
  {
    code: 'ZA',
    name: 'South Africa',
    slug: 'south-africa',
    region: 'africa',
    subRegion: 'Southern Africa',
    capital: 'Pretoria',
    currency: 'ZAR',
    languages: ['English', 'Afrikaans', 'Zulu'],
    tier: 1,
    healthcareContext:
      'South Africa has the most developed healthcare system in sub-Saharan Africa, with world-class private hospitals and a strong pharmaceutical industry. The country serves as a gateway for medical supplies entering the Southern African region.',
    marketHighlights: [
      'Most advanced African healthcare system',
      'Strong private hospital groups',
      'Regional distribution hub',
      'SAHPRA regulatory standards',
    ],
    keyFacilities: [
      'Netcare',
      'Mediclinic Southern Africa',
      'Life Healthcare',
      'Groote Schuur Hospital',
    ],
  },
  {
    code: 'NG',
    name: 'Nigeria',
    slug: 'nigeria',
    region: 'africa',
    subRegion: 'West Africa',
    capital: 'Abuja',
    currency: 'NGN',
    languages: ['English'],
    tier: 1,
    healthcareContext:
      "Nigeria is Africa's largest economy with over 200 million people, creating massive demand for medical supplies. The growing middle class and expanding private healthcare sector present significant opportunities for quality medical supply partnerships.",
    marketHighlights: [
      "Africa's largest population",
      'Rapidly growing private healthcare',
      'High demand, limited supply',
      'NAFDAC regulatory oversight',
    ],
    keyFacilities: [
      'Lagos University Teaching Hospital',
      'Eko Hospital',
      'St. Nicholas Hospital',
      'Reddington Hospital',
    ],
  },
];

// Tier 2 & 3 countries (basic data only)
const otherCountries: Country[] = [
  // Tier 2 - Secondary markets
  { code: 'QA', name: 'Qatar', slug: 'qatar', region: 'middle-east', tier: 2 },
  { code: 'KW', name: 'Kuwait', slug: 'kuwait', region: 'middle-east', tier: 2 },
  { code: 'EG', name: 'Egypt', slug: 'egypt', region: 'africa', tier: 2 },
  { code: 'GH', name: 'Ghana', slug: 'ghana', region: 'africa', tier: 2 },
  { code: 'TZ', name: 'Tanzania', slug: 'tanzania', region: 'africa', tier: 2 },

  // Tier 3 - All other served countries
  { code: 'DZ', name: 'Algeria', slug: 'algeria', region: 'africa', tier: 3 },
  { code: 'AO', name: 'Angola', slug: 'angola', region: 'africa', tier: 3 },
  { code: 'BJ', name: 'Benin', slug: 'benin', region: 'africa', tier: 3 },
  { code: 'BW', name: 'Botswana', slug: 'botswana', region: 'africa', tier: 3 },
  { code: 'BF', name: 'Burkina Faso', slug: 'burkina-faso', region: 'africa', tier: 3 },
  { code: 'BI', name: 'Burundi', slug: 'burundi', region: 'africa', tier: 3 },
  { code: 'CM', name: 'Cameroon', slug: 'cameroon', region: 'africa', tier: 3 },
  { code: 'CV', name: 'Cape Verde', slug: 'cape-verde', region: 'africa', tier: 3 },
  { code: 'CF', name: 'Central African Republic', slug: 'central-african-republic', region: 'africa', tier: 3 },
  { code: 'TD', name: 'Chad', slug: 'chad', region: 'africa', tier: 3 },
  { code: 'KM', name: 'Comoros', slug: 'comoros', region: 'africa', tier: 3 },
  { code: 'CG', name: 'Congo', slug: 'congo', region: 'africa', tier: 3 },
  { code: 'CI', name: "Côte d'Ivoire", slug: 'cote-divoire', region: 'africa', tier: 3 },
  { code: 'CD', name: 'DR Congo', slug: 'dr-congo', region: 'africa', tier: 3 },
  { code: 'DJ', name: 'Djibouti', slug: 'djibouti', region: 'africa', tier: 3 },
  { code: 'GQ', name: 'Equatorial Guinea', slug: 'equatorial-guinea', region: 'africa', tier: 3 },
  { code: 'ER', name: 'Eritrea', slug: 'eritrea', region: 'africa', tier: 3 },
  { code: 'SZ', name: 'Eswatini', slug: 'eswatini', region: 'africa', tier: 3 },
  { code: 'ET', name: 'Ethiopia', slug: 'ethiopia', region: 'africa', tier: 3 },
  { code: 'GA', name: 'Gabon', slug: 'gabon', region: 'africa', tier: 3 },
  { code: 'GM', name: 'Gambia', slug: 'gambia', region: 'africa', tier: 3 },
  { code: 'GN', name: 'Guinea', slug: 'guinea', region: 'africa', tier: 3 },
  { code: 'GW', name: 'Guinea-Bissau', slug: 'guinea-bissau', region: 'africa', tier: 3 },
  { code: 'LS', name: 'Lesotho', slug: 'lesotho', region: 'africa', tier: 3 },
  { code: 'LR', name: 'Liberia', slug: 'liberia', region: 'africa', tier: 3 },
  { code: 'LY', name: 'Libya', slug: 'libya', region: 'africa', tier: 3 },
  { code: 'MG', name: 'Madagascar', slug: 'madagascar', region: 'africa', tier: 3 },
  { code: 'MW', name: 'Malawi', slug: 'malawi', region: 'africa', tier: 3 },
  { code: 'ML', name: 'Mali', slug: 'mali', region: 'africa', tier: 3 },
  { code: 'MR', name: 'Mauritania', slug: 'mauritania', region: 'africa', tier: 3 },
  { code: 'MU', name: 'Mauritius', slug: 'mauritius', region: 'africa', tier: 3 },
  { code: 'MA', name: 'Morocco', slug: 'morocco', region: 'africa', tier: 3 },
  { code: 'MZ', name: 'Mozambique', slug: 'mozambique', region: 'africa', tier: 3 },
  { code: 'NA', name: 'Namibia', slug: 'namibia', region: 'africa', tier: 3 },
  { code: 'NE', name: 'Niger', slug: 'niger', region: 'africa', tier: 3 },
  { code: 'RW', name: 'Rwanda', slug: 'rwanda', region: 'africa', tier: 3 },
  { code: 'SN', name: 'Senegal', slug: 'senegal', region: 'africa', tier: 3 },
  { code: 'SC', name: 'Seychelles', slug: 'seychelles', region: 'africa', tier: 3 },
  { code: 'SL', name: 'Sierra Leone', slug: 'sierra-leone', region: 'africa', tier: 3 },
  { code: 'SO', name: 'Somalia', slug: 'somalia', region: 'africa', tier: 3 },
  { code: 'SS', name: 'South Sudan', slug: 'south-sudan', region: 'africa', tier: 3 },
  { code: 'SD', name: 'Sudan', slug: 'sudan', region: 'africa', tier: 3 },
  { code: 'TG', name: 'Togo', slug: 'togo', region: 'africa', tier: 3 },
  { code: 'TN', name: 'Tunisia', slug: 'tunisia', region: 'africa', tier: 3 },
  { code: 'UG', name: 'Uganda', slug: 'uganda', region: 'africa', tier: 3 },
  { code: 'ZM', name: 'Zambia', slug: 'zambia', region: 'africa', tier: 3 },
  { code: 'ZW', name: 'Zimbabwe', slug: 'zimbabwe', region: 'africa', tier: 3 },
  { code: 'BH', name: 'Bahrain', slug: 'bahrain', region: 'middle-east', tier: 3 },
  { code: 'IR', name: 'Iran', slug: 'iran', region: 'middle-east', tier: 3 },
  { code: 'IQ', name: 'Iraq', slug: 'iraq', region: 'middle-east', tier: 3 },
  { code: 'IL', name: 'Israel', slug: 'israel', region: 'middle-east', tier: 3 },
  { code: 'JO', name: 'Jordan', slug: 'jordan', region: 'middle-east', tier: 3 },
  { code: 'LB', name: 'Lebanon', slug: 'lebanon', region: 'middle-east', tier: 3 },
  { code: 'OM', name: 'Oman', slug: 'oman', region: 'middle-east', tier: 3 },
  { code: 'PS', name: 'Palestine', slug: 'palestine', region: 'middle-east', tier: 3 },
  { code: 'SY', name: 'Syria', slug: 'syria', region: 'middle-east', tier: 3 },
  { code: 'TR', name: 'Turkey', slug: 'turkey', region: 'middle-east', tier: 3 },
  { code: 'YE', name: 'Yemen', slug: 'yemen', region: 'middle-east', tier: 3 },
];

export const countries: Country[] = [...tier1Countries, ...otherCountries];

// Utility functions
export function getAllCountries(): Country[] {
  return countries;
}

export function getCountriesByTier(tier: 1 | 2 | 3): Country[] {
  return countries.filter((c) => c.tier === tier);
}

export function getTier1Countries(): Country[] {
  return tier1Countries;
}

export function getCountryBySlug(slug: string): Country | undefined {
  return countries.find((c) => c.slug === slug);
}

export function getCountryByCode(code: string): Country | undefined {
  return countries.find((c) => c.code === code);
}

export function getCountriesByRegion(region: 'africa' | 'middle-east'): Country[] {
  return countries.filter((c) => c.region === region);
}

export function getCountrySlugs(tier?: 1 | 2 | 3): string[] {
  const filtered = tier ? countries.filter((c) => c.tier === tier) : countries;
  return filtered.map((c) => c.slug);
}
