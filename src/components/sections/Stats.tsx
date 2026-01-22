import { Package, Globe2, Building2, TruckIcon } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { Container } from '@/components/ui';

export async function Stats(): Promise<React.ReactElement> {
  const t = await getTranslations('stats');

  const stats = [
    {
      icon: Package,
      value: '500+',
      label: t('products'),
      description: t('productsDesc'),
    },
    {
      icon: Globe2,
      value: '25+',
      label: t('countries'),
      description: t('countriesDesc'),
    },
    {
      icon: Building2,
      value: '100+',
      label: t('facilities'),
      description: t('facilitiesDesc'),
    },
    {
      icon: TruckIcon,
      value: '10K+',
      label: t('orders'),
      description: t('ordersDesc'),
    },
  ];

  return (
    <section className="border-y border-border bg-white py-16 lg:py-20">
      <Container>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="group flex flex-col items-center text-center"
            >
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/20">
                <stat.icon className="h-7 w-7 text-primary" />
              </div>
              <p className="text-4xl font-bold text-secondary">{stat.value}</p>
              <p className="mt-1 font-medium text-secondary">{stat.label}</p>
              <p className="text-sm text-muted-foreground">{stat.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
