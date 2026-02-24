import { getTranslations } from 'next-intl/server';
import { Container } from '@/components/ui';

export async function Stats(): Promise<React.ReactElement> {
  const t = await getTranslations('stats');

  const stats = [
    { value: '500+', label: t('products'), offset: 'lg:mt-0', accent: false },
    { value: '25+', label: t('countries'), offset: 'lg:mt-8', accent: true },
    { value: '100+', label: t('facilities'), offset: 'lg:mt-16', accent: false },
    { value: '10K+', label: t('orders'), offset: 'lg:mt-8', accent: false },
  ];

  return (
    <section className="bg-secondary py-16 lg:py-24" data-animate>
      <Container>
        <div className="grid grid-cols-2 gap-10 lg:grid-cols-4 lg:gap-0 lg:items-start">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className={`flex flex-col gap-3 lg:px-8 ${stat.offset}`}
            >
              <p className={`font-display text-7xl font-bold leading-none tracking-tighter lg:text-8xl xl:text-9xl ${stat.accent ? 'text-accent' : 'text-white'}`}>
                {stat.value}
              </p>
              <p className="font-body text-xs font-semibold uppercase tracking-[0.18em] text-white/35">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
