import type { ImageResponse } from 'next/og';
import { getCategoryBySlug } from '@/lib/products';
import { ogImage } from '@/lib/og-image';

export { size, contentType } from '@/lib/og-image';
export const alt = 'Watu Care — Medical Supplies';

export default async function Image({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<ImageResponse> {
  const { category } = await params;
  const cat = getCategoryBySlug(category);
  return ogImage({
    badge: 'Medical Supplies',
    title: cat?.title ?? 'Medical Supplies',
    subtitle: cat?.description ?? 'Premium medical devices & PPE for Africa & Middle East',
  });
}
