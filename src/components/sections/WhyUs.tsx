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
      accent: true,
    },
    {
      icon: Globe2,
      titleKey: 'globalTitle',
      descKey: 'globalDesc',
      accent: false,
    },
    {
      icon: Headphones,
      titleKey: 'supportTitle',
      descKey: 'supportDesc',
      accent: true,
    },
    {
      icon: BadgeDollarSign,
      titleKey: 'pricesTitle',
      descKey: 'pricesDesc',
      accent: false,
    },
    {
      icon: Zap,
      titleKey: 'responseTitle',
      descKey: 'responseDesc',
      accent: true,
    },
    {
      icon: Shield,
      titleKey: 'warrantyTitle',
      descKey: 'warrantyDesc',
      accent: false,
    },
  ];

  return (
    <section
      id="why-us"
      className="relative overflow-hidden bg-secondary py-20 lg:py-28"
    >
      {/* Subtle pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
        }}
      />

      <Container className="relative">
        {/* Header */}
        <div className="mx-auto mb-12 max-w-2xl text-center lg:mb-16">
          <span className="mb-4 inline-block rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-sm font-medium text-accent">
            {t('sectionLabel')}
          </span>
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {t('title')}
          </h2>
          <p className="text-lg text-white/60">{t('subtitle')}</p>
        </div>

        {/* Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {valueProps.map((prop) => (
            <div
              key={prop.titleKey}
              className="group rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all hover:border-white/20 hover:bg-white/10"
            >
              <div
                className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${
                  prop.accent
                    ? 'bg-accent/20 text-accent'
                    : 'bg-primary/20 text-primary'
                }`}
              >
                <prop.icon className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-white">
                {t(prop.titleKey)}
              </h3>
              <p className="leading-relaxed text-white/60">{t(prop.descKey)}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
