import { getTranslations } from 'next-intl/server';
import { Container } from '@/components/ui';

export async function Stats(): Promise<React.ReactElement> {
  const t = await getTranslations('stats');

  const stats = [
    { value: '500+', label: t('products') },
    { value: '25+', label: t('countries') },
    { value: '100+', label: t('facilities') },
    { value: '10K+', label: t('orders') },
  ];

  return (
    <section className="border-y border-border/50 bg-white py-12">
      <Container>
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4 lg:gap-12">
          {stats.map((stat, index) => (
            <div key={stat.label} className="relative text-center">
              {/* Divider on desktop (except first) */}
              {index > 0 && (
                <div className="absolute -left-4 top-1/2 hidden h-12 w-px -translate-y-1/2 bg-border lg:block lg:-left-6" />
              )}
              <p className="text-4xl font-bold text-secondary lg:text-5xl">
                {stat.value}
              </p>
              <p className="mt-1 text-sm font-medium uppercase tracking-wider text-muted-foreground">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
