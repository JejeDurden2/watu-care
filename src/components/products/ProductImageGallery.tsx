'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Camera } from 'lucide-react';

interface ProductImageGalleryProps {
  images: string[];
  alt: string;
  iconSlug?: string;
  fallbackGradient?: string;
  className?: string;
  priority?: boolean;
}

export function ProductImageGallery({
  images,
  alt,
  className = '',
  priority = false,
}: ProductImageGalleryProps): React.ReactElement {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [imageError, setImageError] = useState(false);

  if (images.length === 0 || imageError) {
    return (
      <div
        className={`flex flex-col items-center justify-center gap-4 bg-primary aspect-square ${className}`}
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
