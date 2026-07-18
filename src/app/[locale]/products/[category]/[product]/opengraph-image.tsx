import type { ImageResponse } from 'next/og';
import { getCategoryBySlug, getProductBySlug } from '@/lib/products';
import { ogImage } from '@/lib/og-image';

export { size, contentType } from '@/lib/og-image';
export const alt = 'Watu Care — Medical Product';

export default async function Image({
  params,
}: {
  params: Promise<{ category: string; product: string }>;
}): Promise<ImageResponse> {
  const { category, product } = await params;
  const cat = getCategoryBySlug(category);
  const prod = getProductBySlug(category, product);
  return ogImage({
    badge: cat?.title ?? 'Medical Supplies',
    title: prod?.name ?? 'Medical Product',
  });
}
