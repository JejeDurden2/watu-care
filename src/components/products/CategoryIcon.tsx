'use client';

import { getCategoryIcon } from '@/lib/product-images';

interface CategoryIconProps {
  slug: string;
  className?: string;
}

export function CategoryIcon({
  slug,
  className = 'h-8 w-8',
}: CategoryIconProps): React.ReactElement {
  const Icon = getCategoryIcon(slug);
  return <Icon className={className} />;
}
