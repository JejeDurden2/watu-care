import { MapPin, Handshake, MessageCircle, LayoutGrid } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { Container } from '@/components/ui';

export async function WhyUs(): Promise<React.ReactElement> {
  const t = await getTranslations('whyUs');

  const valueProps = [
    {
      icon: MapPin,
      titleKey: 'hubTitle',
      descKey: 'hubDesc',
      accent: true,
    },
    {
      icon: Handshake,
      titleKey: 'directTitle',
      descKey: 'directDesc',
      accent: false,
    },
    {
      icon: MessageCircle,
      titleKey: 'serviceTitle',
      descKey: 'serviceDesc',
      accent: true,
    },
    {
      icon: LayoutGrid,
      titleKey: 'catalogTitle',
      descKey: 'catalogDesc',
      accent: false,
    },
  ];

  return (
    <section
      id="why-us"
      className="relative overflow-hidden bg-secondary py-20 lg:py-28"
    >
      {/* Background pattern */}
      <div className="pattern-dots-light absolute inset-0 text-white" />

      <Container className="relative">
        {/* Header */}
        <div className="mx-auto mb-12 max-w-2xl text-center lg:mb-16">
          <h2 className="mb-4 text-heading-lg text-white lg:text-display-sm">
            {t('title')}
          </h2>
          <p className="text-body-lg text-white/60">{t('subtitle')}</p>
        </div>

        {/* Grid - 2x2 on desktop, 1 column on mobile */}
        <div className="mx-auto grid max-w-4xl gap-6 sm:grid-cols-2">
          {valueProps.map((prop) => (
            <div
              key={prop.titleKey}
              className="group rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition-all duration-200 hover:border-white/20 hover:bg-white/10"
            >
              <div
                className={`mb-5 flex h-14 w-14 items-center justify-center rounded-2xl ${
                  prop.accent
                    ? 'bg-accent/20 text-accent'
                    : 'bg-primary/20 text-primary'
                }`}
              >
                <prop.icon className="h-7 w-7" />
              </div>
              <h3 className="mb-3 text-heading-sm text-white">
                {t(prop.titleKey)}
              </h3>
              <p className="text-body leading-relaxed text-white/60">
                {t(prop.descKey)}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
