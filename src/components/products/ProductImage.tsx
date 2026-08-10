'use client';

import { useTranslations } from 'next-intl';

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
  const t = useTranslations('products');
  const [imageError, setImageError] = useState(false);

  if (!src || imageError) {
    return (
      <div className={`flex flex-col items-center justify-center gap-4 bg-primary ${className}`}>
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/15">
          <Camera className="h-7 w-7 text-white/80" strokeWidth={1.5} />
        </div>
        <span className="text-sm font-medium tracking-wide text-white/90">
          {t('photosComingSoon')}
        </span>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden bg-muted ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        className="object-contain p-2"
        onError={() => setImageError(true)}
        priority={priority}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
      />
    </div>
  );
}
