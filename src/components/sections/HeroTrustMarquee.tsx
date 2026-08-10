'use client';

import { useTranslations } from 'next-intl';

// Values are passed in from the server parent rather than imported: this is a
// client component, and @/lib/constants pulls in the full country and product
// data. Keys must match hero.trustMarquee in the message files.
export interface HeroTrustMarqueeProps {
  countries: string;
  standard: string;
  units: string;
  products: string;
  response: string;
  facilities: string;
}

export function HeroTrustMarquee({
  countries,
  standard,
  units,
  products,
  response,
  facilities,
}: HeroTrustMarqueeProps): React.ReactElement {
  const t = useTranslations('hero.trustMarquee');

  const trustItems = [
    { value: countries, labelKey: 'countries' },
    { value: standard, labelKey: 'iso' },
    { value: units, labelKey: 'units' },
    { value: products, labelKey: 'products' },
    { value: response, labelKey: 'response' },
    { value: facilities, labelKey: 'facilities' },
  ];

  return (
    <div className="group hero-glass-band relative overflow-hidden py-4">
      {/* Marquee track: tripled for seamless loop on ultrawide viewports */}
      <div className="animate-marquee flex w-max gap-12 group-hover:[animation-play-state:paused]">
        {[...trustItems, ...trustItems, ...trustItems].map((item, i) => (
          <div key={`${item.value}-${i}`} className="flex items-center gap-3">
            <span className="font-display text-lg font-bold tracking-tight text-white">
              {item.value}
            </span>
            <span className="font-body text-xs uppercase tracking-[0.15em] text-white/60">
              {t(item.labelKey)}
            </span>
            <span className="ml-4 h-1 w-1 rounded-full bg-white/20" aria-hidden="true" />
          </div>
        ))}
      </div>
    </div>
  );
}
