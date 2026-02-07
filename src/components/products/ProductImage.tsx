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
    // Fallback: gradient with icon and "Photos Coming Soon" text
    return (
      <div
        className={`flex flex-col items-center justify-center gap-3 bg-gradient-to-br ${fallbackGradient} ${className}`}
      >
        <Icon className="h-1/4 w-1/4 text-white/80" strokeWidth={1.5} />
        <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-medium tracking-wide text-white/90">
          Photos coming soon
        </span>
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
