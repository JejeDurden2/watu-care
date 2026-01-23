export interface Country {
  code: string;
  name: string;
  region: 'africa' | 'middle-east';
}

export const countries: Country[] = [
  // Africa
  { code: 'DZ', name: 'Algeria', region: 'africa' },
  { code: 'AO', name: 'Angola', region: 'africa' },
  { code: 'BJ', name: 'Benin', region: 'africa' },
  { code: 'BW', name: 'Botswana', region: 'africa' },
  { code: 'BF', name: 'Burkina Faso', region: 'africa' },
  { code: 'BI', name: 'Burundi', region: 'africa' },
  { code: 'CM', name: 'Cameroon', region: 'africa' },
  { code: 'CV', name: 'Cape Verde', region: 'africa' },
  { code: 'CF', name: 'Central African Republic', region: 'africa' },
  { code: 'TD', name: 'Chad', region: 'africa' },
  { code: 'KM', name: 'Comoros', region: 'africa' },
  { code: 'CG', name: 'Congo', region: 'africa' },
  { code: 'CI', name: "Côte d'Ivoire", region: 'africa' },
  { code: 'CD', name: 'DR Congo', region: 'africa' },
  { code: 'DJ', name: 'Djibouti', region: 'africa' },
  { code: 'EG', name: 'Egypt', region: 'africa' },
  { code: 'GQ', name: 'Equatorial Guinea', region: 'africa' },
  { code: 'ER', name: 'Eritrea', region: 'africa' },
  { code: 'SZ', name: 'Eswatini', region: 'africa' },
  { code: 'ET', name: 'Ethiopia', region: 'africa' },
  { code: 'GA', name: 'Gabon', region: 'africa' },
  { code: 'GM', name: 'Gambia', region: 'africa' },
  { code: 'GH', name: 'Ghana', region: 'africa' },
  { code: 'GN', name: 'Guinea', region: 'africa' },
  { code: 'GW', name: 'Guinea-Bissau', region: 'africa' },
  { code: 'KE', name: 'Kenya', region: 'africa' },
  { code: 'LS', name: 'Lesotho', region: 'africa' },
  { code: 'LR', name: 'Liberia', region: 'africa' },
  { code: 'LY', name: 'Libya', region: 'africa' },
  { code: 'MG', name: 'Madagascar', region: 'africa' },
  { code: 'MW', name: 'Malawi', region: 'africa' },
  { code: 'ML', name: 'Mali', region: 'africa' },
  { code: 'MR', name: 'Mauritania', region: 'africa' },
  { code: 'MU', name: 'Mauritius', region: 'africa' },
  { code: 'MA', name: 'Morocco', region: 'africa' },
  { code: 'MZ', name: 'Mozambique', region: 'africa' },
  { code: 'NA', name: 'Namibia', region: 'africa' },
  { code: 'NE', name: 'Niger', region: 'africa' },
  { code: 'NG', name: 'Nigeria', region: 'africa' },
  { code: 'RW', name: 'Rwanda', region: 'africa' },
  { code: 'SN', name: 'Senegal', region: 'africa' },
  { code: 'SC', name: 'Seychelles', region: 'africa' },
  { code: 'SL', name: 'Sierra Leone', region: 'africa' },
  { code: 'SO', name: 'Somalia', region: 'africa' },
  { code: 'ZA', name: 'South Africa', region: 'africa' },
  { code: 'SS', name: 'South Sudan', region: 'africa' },
  { code: 'SD', name: 'Sudan', region: 'africa' },
  { code: 'TZ', name: 'Tanzania', region: 'africa' },
  { code: 'TG', name: 'Togo', region: 'africa' },
  { code: 'TN', name: 'Tunisia', region: 'africa' },
  { code: 'UG', name: 'Uganda', region: 'africa' },
  { code: 'ZM', name: 'Zambia', region: 'africa' },
  { code: 'ZW', name: 'Zimbabwe', region: 'africa' },

  // Middle East
  { code: 'BH', name: 'Bahrain', region: 'middle-east' },
  { code: 'IR', name: 'Iran', region: 'middle-east' },
  { code: 'IQ', name: 'Iraq', region: 'middle-east' },
  { code: 'IL', name: 'Israel', region: 'middle-east' },
  { code: 'JO', name: 'Jordan', region: 'middle-east' },
  { code: 'KW', name: 'Kuwait', region: 'middle-east' },
  { code: 'LB', name: 'Lebanon', region: 'middle-east' },
  { code: 'OM', name: 'Oman', region: 'middle-east' },
  { code: 'PS', name: 'Palestine', region: 'middle-east' },
  { code: 'QA', name: 'Qatar', region: 'middle-east' },
  { code: 'SA', name: 'Saudi Arabia', region: 'middle-east' },
  { code: 'SY', name: 'Syria', region: 'middle-east' },
  { code: 'TR', name: 'Turkey', region: 'middle-east' },
  { code: 'AE', name: 'United Arab Emirates', region: 'middle-east' },
  { code: 'YE', name: 'Yemen', region: 'middle-east' },
];

export function getCountriesByRegion(region: 'africa' | 'middle-east'): Country[] {
  return countries.filter((c) => c.region === region);
}

export function getCountryByCode(code: string): Country | undefined {
  return countries.find((c) => c.code === code);
}
