import type { ImageResponse } from 'next/og';
import { getCountryBySlug } from '@/data/countries';
import { ogImage } from '@/lib/og-image';

export { size, contentType } from '@/lib/og-image';
export const alt = 'Watu Care — Medical Supplies by Country';

export default async function Image({
  params,
}: {
  params: Promise<{ country: string }>;
}): Promise<ImageResponse> {
  const { country } = await params;
  const c = getCountryBySlug(country);
  return ogImage({
    badge: 'Medical Supplies',
    title: `Medical Supplies for ${c?.name ?? 'Africa & Middle East'}`,
    subtitle: c?.subRegion ?? 'Africa & Middle East',
  });
}
