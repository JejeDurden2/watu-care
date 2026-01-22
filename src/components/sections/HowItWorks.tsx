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
    <section id="how-it-works" className="py-20 lg:py-28">
      <Container>
        {/* Header */}
        <div className="mx-auto mb-12 max-w-2xl text-center lg:mb-16">
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
            {t('title')}
          </h2>
          <p className="text-lg text-muted-foreground">{t('subtitle')}</p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connector Line (Desktop) */}
          <div className="absolute left-0 right-0 top-20 hidden h-0.5 bg-gradient-to-r from-transparent via-border to-transparent lg:block" />

          <div className="grid gap-8 lg:grid-cols-3 lg:gap-12">
            {stepsKeys.map((step, index) => {
              const Icon = icons[index];
              const stepNumber = String(index + 1).padStart(2, '0');

              return (
                <div key={step.titleKey} className="relative text-center">
                  {/* Step Number Badge */}
                  <div className="relative z-10 mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-accent text-xl font-bold text-white shadow-soft-md">
                    {stepNumber}
                  </div>

                  {/* Icon */}
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
                    <Icon className="h-7 w-7 text-primary" />
                  </div>

                  {/* Content */}
                  <h3 className="mb-2 text-xl font-semibold text-secondary">
                    {t(step.titleKey)}
                  </h3>
                  <p className="leading-relaxed text-muted-foreground">
                    {t(step.descKey)}
                  </p>

                  {/* Arrow (Mobile) */}
                  {index < stepsKeys.length - 1 && (
                    <div className="my-6 flex justify-center lg:hidden">
                      <div className="h-8 w-0.5 bg-border" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
