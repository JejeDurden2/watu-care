'use client';

import { useState } from 'react';
import Image from 'next/image';
import { getCategoryIcon } from '@/lib/product-images';

interface ProductImageGalleryProps {
  images: string[];
  alt: string;
  iconSlug: string;
  fallbackGradient?: string;
  className?: string;
  priority?: boolean;
}

export function ProductImageGallery({
  images,
  alt,
  iconSlug,
  fallbackGradient = 'from-primary to-accent',
  className = '',
  priority = false,
}: ProductImageGalleryProps): React.ReactElement {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [imageError, setImageError] = useState(false);
  const Icon = getCategoryIcon(iconSlug);

  if (images.length === 0 || imageError) {
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
    <div className={`space-y-4 ${className}`}>
      {/* Main Image */}
      <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-muted">
        <Image
          src={images[selectedIndex]}
          alt={`${alt} - Image ${selectedIndex + 1}`}
          fill
          className="object-cover"
          onError={() => setImageError(true)}
          priority={priority}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      {/* Thumbnail Gallery */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-2 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-4">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedIndex(index)}
              className={`relative aspect-square overflow-hidden rounded-lg border-2 transition-all ${
                selectedIndex === index
                  ? 'border-primary ring-2 ring-primary/20'
                  : 'border-transparent hover:border-primary/50'
              }`}
            >
              <Image
                src={image}
                alt={`${alt} - Thumbnail ${index + 1}`}
                fill
                className="object-cover"
                sizes="100px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
