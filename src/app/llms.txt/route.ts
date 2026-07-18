import { getAllCategories } from '@/lib/products';
import { getTier1Countries } from '@/data/countries';
import { getAllPersonas } from '@/data/personas';
import { BASE_URL } from '@/lib/constants';

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
    .map((c) => `- [${c.title}](${en}/products/${c.slug}): ${c.description}`)
    .join('\n');

  const markets = getTier1Countries()
    .map((c) => `- [${c.name}](${en}/markets/${c.slug})`)
    .join('\n');

  const solutions = getAllPersonas()
    .map((p) => `- [${PERSONA_LABELS[p.slug] ?? p.slug}](${en}/solutions/${p.slug})`)
    .join('\n');

  const body = `# Watu Care

> Watu Care is a Hong Kong-headquartered B2B medical wholesaler connecting certified Asian manufacturers with healthcare providers across Africa and the Middle East. We supply premium medical devices and PPE at scale — gloves, infection prevention, wound care, surgical packs, and more — ensuring quality and accessibility where it matters most.

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
- [FAQ](${en}/faq): Common questions on ordering, shipping, and quality
- [Contact](${en}/contact): Request a quote or start a partnership
- [About](${en}/about): Who we are and how we operate
`;

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
