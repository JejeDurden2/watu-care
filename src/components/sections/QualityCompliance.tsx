import { ShieldCheck, BadgeCheck, ClipboardCheck, FileCheck } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { Container } from '@/components/ui';

const items = [
  { icon: ShieldCheck, titleKey: 'item1Title', descKey: 'item1Desc' },
  { icon: BadgeCheck, titleKey: 'item2Title', descKey: 'item2Desc' },
  { icon: ClipboardCheck, titleKey: 'item3Title', descKey: 'item3Desc' },
  { icon: FileCheck, titleKey: 'item4Title', descKey: 'item4Desc' },
];

export async function QualityCompliance(): Promise<React.ReactElement> {
  const t = await getTranslations('qualityCompliance');

  return (
    <section
      id="quality-compliance"
      className="overflow-hidden bg-muted py-20 lg:py-28"
      data-animate
    >
      <Container>
        {/* Header */}
        <div className="mb-14 max-w-xl lg:mb-16">
          <div className="mb-5 h-px w-16 bg-accent" />
          <h2 className="font-display text-4xl font-bold tracking-tighter text-secondary lg:text-5xl">
            {t('title')}
          </h2>
          <p className="mt-4 max-w-lg font-body text-lg leading-relaxed text-muted-foreground">
            {t('subtitle')}
          </p>
        </div>

        {/* Compliance pillars */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map(({ icon: Icon, titleKey, descKey }) => (
            <div
              key={titleKey}
              className="card-glow group rounded-2xl border border-border bg-background p-7"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary/15">
                <Icon className="h-6 w-6" strokeWidth={1.5} />
              </div>
              <h3 className="mb-2.5 font-display text-lg font-semibold tracking-tight text-secondary">
                {t(titleKey)}
              </h3>
              <p className="font-body text-sm leading-relaxed text-muted-foreground">
                {t(descKey)}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
