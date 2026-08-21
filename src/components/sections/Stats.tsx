import { getTranslations } from 'next-intl/server';
import { Container } from '@/components/ui';
import {
  COUNTRIES_SERVED_LABEL,
  FACILITIES_SUPPLIED,
  ORDERS_DELIVERED,
  PRODUCT_LINES,
} from '@/lib/constants';

export async function Stats(): Promise<React.ReactElement> {
  const t = await getTranslations('stats');

  const stats = [
    { value: PRODUCT_LINES, label: t('products'), offset: 'lg:mt-0', accent: false },
    { value: COUNTRIES_SERVED_LABEL, label: t('countries'), offset: 'lg:mt-8', accent: true },
    { value: FACILITIES_SUPPLIED, label: t('facilities'), offset: 'lg:mt-16', accent: false },
    { value: ORDERS_DELIVERED, label: t('orders'), offset: 'lg:mt-8', accent: false },
  ];

  return (
    <section className="bg-secondary py-16 lg:py-24" data-animate>
      <Container>
        <div className="grid grid-cols-2 gap-10 lg:grid-cols-4 lg:gap-0 lg:items-start">
          {stats.map((stat) => (
            <div key={stat.label} className={`flex flex-col gap-3 lg:px-8 ${stat.offset}`}>
              {/* text-7xl in a 2-column grid overflowed a 360px viewport —
                  four glyphs at 72px need more room than half the container. */}
              <p
                className={`font-display text-5xl font-bold leading-none tracking-tighter tabular-nums sm:text-7xl lg:text-8xl xl:text-9xl ${stat.accent ? 'text-accent-light' : 'text-white'}`}
              >
                {stat.value}
              </p>
              <p className="font-body text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
