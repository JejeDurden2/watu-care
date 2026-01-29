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
  // Tier 2 promoted to Tier 1
  {
    code: 'QA',
    name: 'Qatar',
    slug: 'qatar',
    nameLocal: 'قطر',
    region: 'middle-east',
    subRegion: 'Gulf States',
    capital: 'Doha',
    currency: 'QAR',
    languages: ['Arabic', 'English'],
    tier: 1,
    healthcareContext:
      'Qatar has rapidly developed its healthcare infrastructure, positioning itself as a regional medical hub. The country hosts world-class facilities and has invested heavily in healthcare technology and specialist services, with strict quality standards for medical supplies.',
    marketHighlights: [
      'Highest GDP per capita globally',
      'Rapid healthcare expansion',
      'World-class medical facilities',
      'MOPH regulatory standards',
    ],
    keyFacilities: [
      'Hamad Medical Corporation',
      'Sidra Medicine',
      'Qatar Red Crescent',
      'Aspetar Sports Medicine Hospital',
    ],
  },
  {
    code: 'KW',
    name: 'Kuwait',
    slug: 'kuwait',
    nameLocal: 'الكويت',
    region: 'middle-east',
    subRegion: 'Gulf States',
    capital: 'Kuwait City',
    currency: 'KWD',
    languages: ['Arabic', 'English'],
    tier: 1,
    healthcareContext:
      'Kuwait offers free healthcare to citizens and has a well-developed public hospital system. The country is expanding private healthcare options and modernizing medical infrastructure, creating demand for quality medical supplies and equipment.',
    marketHighlights: [
      'Strong public healthcare system',
      'Growing private sector',
      'High healthcare spending per capita',
      'MOH procurement standards',
    ],
    keyFacilities: [
      'Kuwait Ministry of Health Hospitals',
      'Dar Al Shifa Hospital',
      'Al Salam International Hospital',
      'New Mowasat Hospital',
    ],
  },
  {
    code: 'EG',
    name: 'Egypt',
    slug: 'egypt',
    nameLocal: 'مصر',
    region: 'africa',
    subRegion: 'North Africa',
    capital: 'Cairo',
    currency: 'EGP',
    languages: ['Arabic'],
    tier: 1,
    healthcareContext:
      'Egypt is the most populous Arab country with over 100 million people and a large healthcare sector. The government is investing in universal health coverage and expanding hospital capacity, creating significant demand for medical supplies across public and private facilities.',
    marketHighlights: [
      'Largest Arab population',
      'Universal health coverage expansion',
      'Growing medical tourism',
      'EDA regulatory framework',
    ],
    keyFacilities: [
      'Ain Shams University Hospitals',
      'Cairo University Hospitals',
      'As-Salam International Hospital',
      'Cleopatra Hospital Group',
    ],
  },
  {
    code: 'GH',
    name: 'Ghana',
    slug: 'ghana',
    region: 'africa',
    subRegion: 'West Africa',
    capital: 'Accra',
    currency: 'GHS',
    languages: ['English'],
    tier: 1,
    healthcareContext:
      'Ghana is one of the most stable economies in West Africa with a growing healthcare sector. The country has implemented national health insurance and is expanding healthcare access, driving demand for quality medical supplies across its hospital network.',
    marketHighlights: [
      'Stable West African economy',
      'National health insurance system',
      'Growing private healthcare',
      'FDA Ghana regulatory oversight',
    ],
    keyFacilities: [
      'Korle Bu Teaching Hospital',
      'Komfo Anokye Teaching Hospital',
      '37 Military Hospital',
      'Nyaho Medical Centre',
    ],
  },
  {
    code: 'TZ',
    name: 'Tanzania',
    slug: 'tanzania',
    region: 'africa',
    subRegion: 'East Africa',
    capital: 'Dodoma',
    currency: 'TZS',
    languages: ['Swahili', 'English'],
    tier: 1,
    healthcareContext:
      'Tanzania is a growing East African economy with improving healthcare infrastructure. The government is investing in healthcare facilities across the country, and the private sector is expanding to meet rising demand for quality medical services and supplies.',
    marketHighlights: [
      'Growing East African economy',
      'Healthcare infrastructure investment',
      'Expanding private hospital sector',
      'TFDA regulatory framework',
    ],
    keyFacilities: [
      'Muhimbili National Hospital',
      'Aga Khan Hospital Dar es Salaam',
      'Bugando Medical Centre',
      'Regency Medical Centre',
    ],
  },
  // Tier 3 promoted to Tier 1
  {
    code: 'MA',
    name: 'Morocco',
    slug: 'morocco',
    nameLocal: 'المغرب',
    region: 'africa',
    subRegion: 'North Africa',
    capital: 'Rabat',
    currency: 'MAD',
    languages: ['Arabic', 'French'],
    tier: 1,
    healthcareContext:
      'Morocco has developed a strong healthcare system with significant investment in medical infrastructure. The country is a regional leader in medical tourism and pharmaceutical manufacturing, with modern hospitals in major cities like Casablanca and Marrakech.',
    marketHighlights: [
      'Regional medical tourism destination',
      'Strong pharmaceutical industry',
      'Growing private healthcare sector',
      'ANAM regulatory framework',
    ],
    keyFacilities: [
      'CHU Ibn Sina',
      'Cheikh Khalifa Hospital',
      'Clinique Internationale de Marrakech',
      'Hôpital Cheikh Zaid',
    ],
  },
  {
    code: 'ET',
    name: 'Ethiopia',
    slug: 'ethiopia',
    region: 'africa',
    subRegion: 'East Africa',
    capital: 'Addis Ababa',
    currency: 'ETB',
    languages: ['Amharic', 'English'],
    tier: 1,
    healthcareContext:
      "Ethiopia is Africa's second most populous country with over 120 million people. The government is rapidly expanding healthcare infrastructure through its Health Sector Transformation Plan, creating significant demand for medical supplies and equipment.",
    marketHighlights: [
      "Africa's second largest population",
      'Rapid healthcare expansion',
      'Growing pharmaceutical sector',
      'EFDA regulatory oversight',
    ],
    keyFacilities: [
      'Black Lion Hospital',
      'St. Paul Hospital Millennium Medical College',
      'Tikur Anbessa Specialized Hospital',
      'Myungsung Christian Medical Center',
    ],
  },
  {
    code: 'UG',
    name: 'Uganda',
    slug: 'uganda',
    region: 'africa',
    subRegion: 'East Africa',
    capital: 'Kampala',
    currency: 'UGX',
    languages: ['English', 'Swahili'],
    tier: 1,
    healthcareContext:
      'Uganda has a growing healthcare sector with increasing private investment. The country serves as a healthcare destination for neighboring countries and is expanding hospital capacity to meet rising demand for quality medical services.',
    marketHighlights: [
      'Growing healthcare investment',
      'Regional healthcare destination',
      'Expanding private hospital network',
      'NDA regulatory framework',
    ],
    keyFacilities: [
      'Mulago National Referral Hospital',
      'Aga Khan Hospital Kampala',
      'Nsambya Hospital',
      'Case Hospital',
    ],
  },
  {
    code: 'RW',
    name: 'Rwanda',
    slug: 'rwanda',
    region: 'africa',
    subRegion: 'East Africa',
    capital: 'Kigali',
    currency: 'RWF',
    languages: ['Kinyarwanda', 'English', 'French'],
    tier: 1,
    healthcareContext:
      'Rwanda has made remarkable progress in healthcare development, achieving near-universal health insurance coverage. The country is known for innovative healthcare delivery and is building a reputation as a medical hub for specialized care in East Africa.',
    marketHighlights: [
      'Near-universal health insurance',
      'Innovative healthcare delivery',
      'Growing medical tourism',
      'Rwanda FDA oversight',
    ],
    keyFacilities: [
      'King Faisal Hospital',
      'CHUK (University Teaching Hospital)',
      'Rwanda Military Hospital',
      'Legacy Clinics',
    ],
  },
  {
    code: 'SN',
    name: 'Senegal',
    slug: 'senegal',
    region: 'africa',
    subRegion: 'West Africa',
    capital: 'Dakar',
    currency: 'XOF',
    languages: ['French'],
    tier: 1,
    healthcareContext:
      'Senegal is a healthcare hub for francophone West Africa, with Dakar hosting regional health organizations and research centers. The country has a well-developed hospital network and is expanding healthcare access across urban and rural areas.',
    marketHighlights: [
      'Francophone West Africa hub',
      'Strong healthcare research sector',
      'Growing private healthcare',
      'Regional health organizations',
    ],
    keyFacilities: [
      'Hôpital Principal de Dakar',
      'Hôpital Aristide Le Dantec',
      'Clinique de la Madeleine',
      'Centre Hospitalier Abass Ndao',
    ],
  },
  {
    code: 'CI',
    name: "Côte d'Ivoire",
    slug: 'cote-divoire',
    region: 'africa',
    subRegion: 'West Africa',
    capital: 'Yamoussoukro',
    currency: 'XOF',
    languages: ['French'],
    tier: 1,
    healthcareContext:
      "Côte d'Ivoire is the largest economy in francophone West Africa with a rapidly developing healthcare sector. The government is investing in universal health coverage and modernizing hospital infrastructure across the country.",
    marketHighlights: [
      'Largest francophone West African economy',
      'Universal health coverage expansion',
      'Growing pharmaceutical market',
      'Strong economic growth',
    ],
    keyFacilities: [
      'CHU de Cocody',
      'CHU de Treichville',
      'Polyclinique Internationale Sainte Anne-Marie',
      'Clinique Procréa',
    ],
  },
  {
    code: 'TN',
    name: 'Tunisia',
    slug: 'tunisia',
    nameLocal: 'تونس',
    region: 'africa',
    subRegion: 'North Africa',
    capital: 'Tunis',
    currency: 'TND',
    languages: ['Arabic', 'French'],
    tier: 1,
    healthcareContext:
      'Tunisia has one of the most developed healthcare systems in Africa, known for medical tourism and high-quality private hospitals. The country attracts patients from across Africa and Europe for specialized medical procedures.',
    marketHighlights: [
      'Leading African medical tourism destination',
      'High-quality private hospitals',
      'Strong medical education',
      'Competitive healthcare costs',
    ],
    keyFacilities: [
      'Hôpital Charles Nicolle',
      'Clinique Taoufik',
      'Clinique El Manar',
      'Hôpital Militaire de Tunis',
    ],
  },
  {
    code: 'CM',
    name: 'Cameroon',
    slug: 'cameroon',
    region: 'africa',
    subRegion: 'Central Africa',
    capital: 'Yaoundé',
    currency: 'XAF',
    languages: ['French', 'English'],
    tier: 1,
    healthcareContext:
      'Cameroon is a healthcare hub for Central Africa, serving patients from neighboring countries. The bilingual nation has a mix of public and private healthcare facilities, with ongoing investment in hospital modernization and capacity expansion.',
    marketHighlights: [
      'Central African healthcare hub',
      'Bilingual healthcare system',
      'Growing private sector',
      'Regional referral services',
    ],
    keyFacilities: [
      'Yaoundé General Hospital',
      'Douala General Hospital',
      'Laquintinie Hospital',
      'Centre Hospitalier Dominicain Saint Martin de Porres',
    ],
  },
  {
    code: 'OM',
    name: 'Oman',
    slug: 'oman',
    nameLocal: 'عُمان',
    region: 'middle-east',
    subRegion: 'Gulf States',
    capital: 'Muscat',
    currency: 'OMR',
    languages: ['Arabic', 'English'],
    tier: 1,
    healthcareContext:
      'Oman has developed a comprehensive healthcare system with free services for citizens. The Sultanate is investing in healthcare infrastructure as part of its Vision 2040, expanding hospital capacity and attracting private healthcare investment.',
    marketHighlights: [
      'Comprehensive public healthcare',
      'Vision 2040 healthcare investment',
      'Growing private sector',
      'MOH regulatory standards',
    ],
    keyFacilities: [
      'Royal Hospital',
      'Sultan Qaboos University Hospital',
      'Khoula Hospital',
      'Muscat Private Hospital',
    ],
  },
  {
    code: 'BH',
    name: 'Bahrain',
    slug: 'bahrain',
    nameLocal: 'البحرين',
    region: 'middle-east',
    subRegion: 'Gulf States',
    capital: 'Manama',
    currency: 'BHD',
    languages: ['Arabic', 'English'],
    tier: 1,
    healthcareContext:
      'Bahrain is a healthcare hub in the Gulf with world-class medical facilities. The kingdom offers free healthcare to citizens and has developed strong private healthcare options, attracting medical tourists from the region.',
    marketHighlights: [
      'Gulf healthcare hub',
      'High-quality medical facilities',
      'Medical tourism destination',
      'NHRA regulatory framework',
    ],
    keyFacilities: [
      'Salmaniya Medical Complex',
      'King Hamad University Hospital',
      'Bahrain Specialist Hospital',
      'American Mission Hospital',
    ],
  },
  {
    code: 'JO',
    name: 'Jordan',
    slug: 'jordan',
    nameLocal: 'الأردن',
    region: 'middle-east',
    subRegion: 'Levant',
    capital: 'Amman',
    currency: 'JOD',
    languages: ['Arabic', 'English'],
    tier: 1,
    healthcareContext:
      'Jordan is renowned as a medical tourism destination, attracting patients from across the Middle East and beyond. The country has world-class hospitals with internationally trained physicians, making it a regional healthcare leader.',
    marketHighlights: [
      'Top medical tourism destination',
      'World-class hospitals',
      'Internationally trained physicians',
      'JFDA regulatory standards',
    ],
    keyFacilities: [
      'King Hussein Cancer Center',
      'Jordan Hospital',
      'Specialty Hospital',
      'King Abdullah University Hospital',
    ],
  },
  {
    code: 'IQ',
    name: 'Iraq',
    slug: 'iraq',
    nameLocal: 'العراق',
    region: 'middle-east',
    subRegion: 'Levant',
    capital: 'Baghdad',
    currency: 'IQD',
    languages: ['Arabic', 'Kurdish'],
    tier: 1,
    healthcareContext:
      'Iraq is rebuilding its healthcare infrastructure with significant investment in hospital construction and medical equipment. The country has a large population of over 40 million, creating substantial demand for medical supplies across public and private sectors.',
    marketHighlights: [
      'Large population (40M+)',
      'Healthcare reconstruction',
      'Significant infrastructure investment',
      'Growing private healthcare',
    ],
    keyFacilities: [
      'Baghdad Medical City',
      'Basra General Hospital',
      'Erbil Teaching Hospital',
      'Ibn Sina Hospital',
    ],
  },
];

// Remaining countries (not yet promoted)
const otherCountries: Country[] = [
  { code: 'DZ', name: 'Algeria', slug: 'algeria', region: 'africa', tier: 3 },
  { code: 'AO', name: 'Angola', slug: 'angola', region: 'africa', tier: 3 },
  { code: 'BJ', name: 'Benin', slug: 'benin', region: 'africa', tier: 3 },
  { code: 'BW', name: 'Botswana', slug: 'botswana', region: 'africa', tier: 3 },
  { code: 'BF', name: 'Burkina Faso', slug: 'burkina-faso', region: 'africa', tier: 3 },
  { code: 'BI', name: 'Burundi', slug: 'burundi', region: 'africa', tier: 3 },
  { code: 'CV', name: 'Cape Verde', slug: 'cape-verde', region: 'africa', tier: 3 },
  { code: 'CF', name: 'Central African Republic', slug: 'central-african-republic', region: 'africa', tier: 3 },
  { code: 'TD', name: 'Chad', slug: 'chad', region: 'africa', tier: 3 },
  { code: 'KM', name: 'Comoros', slug: 'comoros', region: 'africa', tier: 3 },
  { code: 'CG', name: 'Congo', slug: 'congo', region: 'africa', tier: 3 },
  { code: 'CD', name: 'DR Congo', slug: 'dr-congo', region: 'africa', tier: 3 },
  { code: 'DJ', name: 'Djibouti', slug: 'djibouti', region: 'africa', tier: 3 },
  { code: 'GQ', name: 'Equatorial Guinea', slug: 'equatorial-guinea', region: 'africa', tier: 3 },
  { code: 'ER', name: 'Eritrea', slug: 'eritrea', region: 'africa', tier: 3 },
  { code: 'SZ', name: 'Eswatini', slug: 'eswatini', region: 'africa', tier: 3 },
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
  { code: 'MZ', name: 'Mozambique', slug: 'mozambique', region: 'africa', tier: 3 },
  { code: 'NA', name: 'Namibia', slug: 'namibia', region: 'africa', tier: 3 },
  { code: 'NE', name: 'Niger', slug: 'niger', region: 'africa', tier: 3 },
  { code: 'SC', name: 'Seychelles', slug: 'seychelles', region: 'africa', tier: 3 },
  { code: 'SL', name: 'Sierra Leone', slug: 'sierra-leone', region: 'africa', tier: 3 },
  { code: 'SO', name: 'Somalia', slug: 'somalia', region: 'africa', tier: 3 },
  { code: 'SS', name: 'South Sudan', slug: 'south-sudan', region: 'africa', tier: 3 },
  { code: 'SD', name: 'Sudan', slug: 'sudan', region: 'africa', tier: 3 },
  { code: 'TG', name: 'Togo', slug: 'togo', region: 'africa', tier: 3 },
  { code: 'ZM', name: 'Zambia', slug: 'zambia', region: 'africa', tier: 3 },
  { code: 'ZW', name: 'Zimbabwe', slug: 'zimbabwe', region: 'africa', tier: 3 },
  { code: 'IR', name: 'Iran', slug: 'iran', region: 'middle-east', tier: 3 },
  { code: 'IL', name: 'Israel', slug: 'israel', region: 'middle-east', tier: 3 },
  { code: 'LB', name: 'Lebanon', slug: 'lebanon', region: 'middle-east', tier: 3 },
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
