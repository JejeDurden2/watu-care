import { getAllCategories } from '@/lib/products';
import { getTier1Countries } from '@/data/countries';
import { getAllPersonas } from '@/data/personas';
import {
  BASE_URL,
  CONTACT_EMAIL,
  CONTENT_UPDATED,
  COUNTRIES_SERVED,
  MANUFACTURER_STANDARD,
  PRODUCT_CATEGORIES,
  PRODUCT_LINES,
  QUOTE_RESPONSE,
} from '@/lib/constants';

export const dynamic = 'force-static';

// Human-readable labels for persona slugs (personas carry no display name).
const PERSONA_LABELS: Record<string, string> = {
  hospitals: 'Hospitals',
  clinics: 'Clinics',
  ngos: 'NGOs',
  pharmacies: 'Pharmacies',
  government: 'Government',
};

export function GET(): Response {
  const en = `${BASE_URL}/en`;

  const products = getAllCategories()
    .map(
      (c) =>
        `- [${c.title}](${en}/products/${c.slug}) — ${c.products.length} lines: ${c.description}`,
    )
    .join('\n');

  const markets = getTier1Countries()
    .map((c) => `- [${c.name}](${en}/markets/${c.slug})`)
    .join('\n');

  const solutions = getAllPersonas()
    .map((p) => `- [${PERSONA_LABELS[p.slug] ?? p.slug}](${en}/solutions/${p.slug})`)
    .join('\n');

  const body = `# Watu Care

> Watu Care is a Hong Kong-headquartered B2B medical wholesaler connecting certified Asian manufacturers with healthcare providers across Africa and the Middle East. We supply premium medical devices and PPE at scale — gloves, infection prevention, wound care, surgical packs, and more — ensuring quality and accessibility where it matters most.

Last updated: ${CONTENT_UPDATED}

## Facts

- Business model: B2B wholesale distribution. Watu Care sources from manufacturers and does not manufacture.
- Headquarters: Hong Kong. Sales and support in English and French.
- Markets: ${COUNTRIES_SERVED} countries across Africa and the Middle East, plus quotations worldwide on request.
- Catalogue: ${PRODUCT_LINES} referenced product lines across ${PRODUCT_CATEGORIES} categories.
- Quality: manufacturers certified to ${MANUFACTURER_STANDARD}; supplied product lines carry CE marking. Test reports, certificates of analysis and batch traceability ship with every order.
- Buyers: hospitals, clinics, NGOs, pharmacies and government procurement bodies.
- Pricing: quote-based, not published. Priced per unit and per line, with sea and air freight shown separately.
- Quote turnaround: ${QUOTE_RESPONSE} business hours.
- Lead times: sea freight approximately 30–50 days; air freight approximately 6–9 days.
- Payment: bank transfer (T/T) or letter of credit (L/C).
- Contact: ${CONTACT_EMAIL}

## Products

${products}

## Markets

${markets}

## Solutions

${solutions}

## Key pages

- [Products](${en}/products): Full medical device and PPE catalog
- [Markets](${en}/markets): Countries served across Africa and the Middle East
- [Solutions](${en}/solutions): Tailored supply for hospitals, clinics, NGOs, pharmacies, and governments
- [FAQ](${en}/faq): MOQ, pricing, lead times, certifications, payment and after-sales support
- [Contact](${en}/contact): Request a quote or start a partnership
- [About](${en}/about): Who we are and how we operate

## Machine-readable

- [Pricing and commercial terms](${BASE_URL}/pricing.md): how quotes are priced, MOQ, lead times, payment
- [Full catalogue as text](${BASE_URL}/llms-full.txt): every product with its description and specifications
- [Sitemap](${BASE_URL}/sitemap.xml)
`;

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
