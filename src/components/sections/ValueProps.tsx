import { MapPin, ShieldCheck, HeartHandshake, Headphones } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { Container } from '@/components/ui';

const icons = [MapPin, ShieldCheck, HeartHandshake, Headphones];

const valuePropsKeys = [
  { key: 'strategicLocation', descKey: 'strategicLocationDesc' },
  { key: 'qualityAssurance', descKey: 'qualityAssuranceDesc' },
  { key: 'accessibilityFocus', descKey: 'accessibilityFocusDesc' },
  { key: 'dedicatedSupport', descKey: 'dedicatedSupportDesc' },
];

export async function ValueProps(): Promise<React.ReactElement> {
  const t = await getTranslations('valueProps');

  return (
    <section className="py-20 lg:py-28">
      <Container>
        {/* Header */}
        <div className="mx-auto mb-12 max-w-2xl text-center lg:mb-16">
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
            {t('title')}
          </h2>
          <p className="text-lg text-muted-foreground">{t('subtitle')}</p>
        </div>

        {/* Cards Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:gap-8">
          {valuePropsKeys.map((prop, index) => {
            const Icon = icons[index];
            return (
              <div
                key={prop.key}
                className="group rounded-2xl border border-border bg-white p-6 shadow-soft transition-all duration-200 hover:shadow-soft-md lg:p-8"
              >
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 transition-colors group-hover:bg-accent/20">
                  <Icon className="h-6 w-6 text-accent" />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-secondary">
                  {t(prop.key)}
                </h3>
                <p className="leading-relaxed text-muted-foreground">
                  {t(prop.descKey)}
                </p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
