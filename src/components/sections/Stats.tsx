import { getTranslations } from 'next-intl/server';
import { Globe, Package, Building2, ShoppingCart } from 'lucide-react';
import { Container } from '@/components/ui';

export async function Stats(): Promise<React.ReactElement> {
  const t = await getTranslations('stats');

  const stats = [
    { value: '500+', label: t('products'), Icon: Package },
    { value: '25+', label: t('countries'), Icon: Globe },
    { value: '100+', label: t('facilities'), Icon: Building2 },
    { value: '10K+', label: t('orders'), Icon: ShoppingCart },
  ];

  return (
    <section className="bg-secondary py-16 lg:py-20" data-animate>
      <Container>
        <p className="mb-12 text-center font-body text-xs font-semibold uppercase tracking-[0.2em] text-white/30">
          By the numbers
        </p>
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4 lg:gap-0">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="relative flex flex-col items-center gap-3 text-center"
            >
              {/* Vertical divider (desktop only, except first) */}
              {index > 0 && (
                <div className="absolute left-0 top-1/2 hidden h-16 w-px -translate-y-1/2 bg-white/10 lg:block" />
              )}

              {/* Icon */}
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5">
                <stat.Icon className="h-5 w-5 text-accent" />
              </div>

              {/* Value */}
              <p className="font-display text-5xl font-bold text-white lg:text-6xl xl:text-7xl">
                {stat.value}
              </p>

              {/* Label */}
              <p className="font-body text-xs font-semibold uppercase tracking-widest text-white/40">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
