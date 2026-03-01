'use client';

import { useTranslations } from 'next-intl';

const trustItems = [
  { value: '25+', labelKey: 'countries' },
  { value: 'ISO 13485', labelKey: 'iso' },
  { value: '10M+', labelKey: 'units' },
  { value: '500+', labelKey: 'products' },
  { value: '48h', labelKey: 'response' },
  { value: '100+', labelKey: 'facilities' },
] as const;

export function HeroTrustMarquee(): React.ReactElement {
  const t = useTranslations('hero.trustMarquee');

  return (
    <div className="group hero-glass-band relative overflow-hidden py-4">
      {/* Marquee track: tripled for seamless loop on ultrawide viewports */}
      <div className="animate-marquee flex w-max gap-12 group-hover:[animation-play-state:paused]">
        {[...trustItems, ...trustItems, ...trustItems].map((item, i) => (
          <div key={`${item.value}-${i}`} className="flex items-center gap-3">
            <span className="font-display text-lg font-bold tracking-tight text-white">
              {item.value}
            </span>
            <span className="font-body text-xs uppercase tracking-[0.15em] text-white/35">
              {t(item.labelKey)}
            </span>
            <span className="ml-4 h-1 w-1 rounded-full bg-white/20" aria-hidden="true" />
          </div>
        ))}
      </div>
    </div>
  );
}
