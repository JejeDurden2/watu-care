import {
  ShieldCheck,
  Globe2,
  Headphones,
  BadgeDollarSign,
  Zap,
  Shield,
} from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { Container } from '@/components/ui';

export async function WhyUs(): Promise<React.ReactElement> {
  const t = await getTranslations('whyUs');

  const valueProps = [
    {
      icon: ShieldCheck,
      titleKey: 'certifiedTitle',
      descKey: 'certifiedDesc',
    },
    {
      icon: Globe2,
      titleKey: 'globalTitle',
      descKey: 'globalDesc',
    },
    {
      icon: Headphones,
      titleKey: 'supportTitle',
      descKey: 'supportDesc',
    },
    {
      icon: BadgeDollarSign,
      titleKey: 'pricesTitle',
      descKey: 'pricesDesc',
    },
    {
      icon: Zap,
      titleKey: 'responseTitle',
      descKey: 'responseDesc',
    },
    {
      icon: Shield,
      titleKey: 'warrantyTitle',
      descKey: 'warrantyDesc',
    },
  ];

  return (
    <section id="why-us" className="bg-muted py-20 lg:py-28">
      <Container>
        {/* Header */}
        <div className="mx-auto mb-12 max-w-2xl text-center lg:mb-16">
          <span className="mb-4 inline-block rounded-full bg-accent/10 px-4 py-1.5 text-sm font-medium text-accent">
            {t('sectionLabel')}
          </span>
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
            {t('title')}
          </h2>
          <p className="text-lg text-muted-foreground">{t('subtitle')}</p>
        </div>

        {/* Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {valueProps.map((prop) => (
            <div
              key={prop.titleKey}
              className="glass group rounded-2xl p-6 transition-all hover:-translate-y-1 hover:shadow-soft-md"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary">
                <prop.icon className="h-6 w-6 text-primary transition-colors group-hover:text-white" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-secondary">
                {t(prop.titleKey)}
              </h3>
              <p className="leading-relaxed text-muted-foreground">
                {t(prop.descKey)}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
