'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Camera } from 'lucide-react';

interface ProductImageProps {
  src?: string;
  alt: string;
  iconSlug?: string;
  fallbackGradient?: string;
  className?: string;
  priority?: boolean;
}

export function ProductImage({
  src,
  alt,
  className = '',
  priority = false,
}: ProductImageProps): React.ReactElement {
  const [imageError, setImageError] = useState(false);

  if (!src || imageError) {
    return (
      <div
        className={`flex flex-col items-center justify-center gap-4 bg-primary ${className}`}
      >
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/15">
          <Camera className="h-7 w-7 text-white/80" strokeWidth={1.5} />
        </div>
        <span className="text-sm font-medium tracking-wide text-white/90">
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
