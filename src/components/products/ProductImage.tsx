'use client';

import { useState } from 'react';
import Image from 'next/image';
import { getCategoryIcon } from '@/lib/product-images';

interface ProductImageProps {
  src?: string;
  alt: string;
  iconSlug: string;
  fallbackGradient?: string;
  className?: string;
  priority?: boolean;
}

export function ProductImage({
  src,
  alt,
  iconSlug,
  fallbackGradient = 'from-primary to-accent',
  className = '',
  priority = false,
}: ProductImageProps): React.ReactElement {
  const [imageError, setImageError] = useState(false);
  const Icon = getCategoryIcon(iconSlug);

  if (!src || imageError) {
    // Fallback: elegant gradient with icon
    return (
      <div
        className={`flex items-center justify-center bg-gradient-to-br ${fallbackGradient} ${className}`}
      >
        <Icon className="h-1/3 w-1/3 text-white/90" strokeWidth={1.5} />
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        onError={() => setImageError(true)}
        priority={priority}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    </div>
  );
}
