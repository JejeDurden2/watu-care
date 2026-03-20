import { FileText, Calculator, Truck } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { Container } from '@/components/ui';

const icons = [FileText, Calculator, Truck];

const stepsKeys = [
  { titleKey: 'step1', descKey: 'step1Desc' },
  { titleKey: 'step2', descKey: 'step2Desc' },
  { titleKey: 'step3', descKey: 'step3Desc' },
];

export async function HowItWorks(): Promise<React.ReactElement> {
  const t = await getTranslations('howItWorks');

  return (
    <section id="how-it-works" className="overflow-hidden bg-background py-20 lg:py-28" data-animate>
      <Container>
        {/* Left-aligned header */}
        <div className="mb-14 max-w-xl lg:mb-16">
          <div className="mb-5 h-px w-16 bg-primary" />
          <h2 className="font-display text-4xl font-bold tracking-tighter text-secondary lg:text-5xl">
            {t('title')}
          </h2>
          <p className="mt-4 max-w-lg font-body text-lg leading-relaxed text-muted-foreground">
            {t('subtitle')}
          </p>
        </div>

        {/* Steps — horizontal layout with large decorative numerals */}
        <div className="grid gap-0 lg:grid-cols-3">
          {stepsKeys.map((step, index) => {
            const Icon = icons[index];
            const stepNumeral = String(index + 1);
            const isLast = index === stepsKeys.length - 1;

            return (
              <div
                key={step.titleKey}
                className={`group relative py-8 ${index > 0 ? 'border-t border-border lg:border-l lg:border-t-0' : ''} lg:px-10 ${index === 0 ? 'lg:pl-0' : ''} ${isLast ? 'lg:pr-0' : ''}`}
              >
                {/* Decorative large numeral */}
                <p className="pointer-events-none mb-2 font-display text-8xl font-bold leading-none tracking-tighter text-border/60 transition-colors duration-300 group-hover:text-primary/15 lg:text-9xl">
                  {stepNumeral}
                </p>

                {/* Icon */}
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/8 text-primary transition-colors duration-300 group-hover:bg-primary/15">
                  <Icon className="h-6 w-6" strokeWidth={1.5} />
                </div>

                {/* Content */}
                <h3 className="mb-3 font-display text-xl font-semibold tracking-tight text-secondary">
                  {t(step.titleKey)}
                </h3>
                <p className="font-body text-base leading-relaxed text-muted-foreground">
                  {t(step.descKey)}
                </p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
