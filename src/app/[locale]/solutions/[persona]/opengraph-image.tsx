import type { ImageResponse } from 'next/og';
import { ogImage } from '@/lib/og-image';

export { size, contentType } from '@/lib/og-image';
export const alt = 'Watu Care — Medical Supply Solutions';

// English-only labels (OG cards are brand assets); mirrors the page hero titles.
const PERSONA_TITLES: Record<string, string> = {
  hospitals: 'Medical Supplies for Hospitals',
  clinics: 'Medical Equipment for Clinics & Health Centers',
  ngos: 'Medical Supplies for NGOs & Humanitarian Organizations',
  pharmacies: 'Wholesale Medical Supplies for Pharmacies & Distributors',
  government: 'Medical Procurement for Government & Ministries of Health',
};

export default async function Image({
  params,
}: {
  params: Promise<{ persona: string }>;
}): Promise<ImageResponse> {
  const { persona } = await params;
  return ogImage({
    badge: 'Solutions',
    title: PERSONA_TITLES[persona] ?? 'Medical Supply Solutions',
  });
}
