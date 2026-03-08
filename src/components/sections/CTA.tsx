import { ArrowRight } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { Button, QuoteModalButton } from '@/components/ui';

export async function CTA(): Promise<React.ReactElement> {
  const t = await getTranslations('cta');
  const trustSignals = [
    { value: 'ISO', label: t('trustIso') },
    { value: '48h', label: t('trustQuote') },
    { value: '25+', label: t('trustCountries') },
  ];

  return (
    <section
      id="quote"
      className="overflow-hidden bg-secondary"
      data-animate
    >
      <div className="grid lg:grid-cols-2 lg:min-h-[480px]">

        {/* Left — Dark call to action */}
        <div className="relative flex flex-col justify-center overflow-hidden px-8 py-20 lg:px-16 lg:py-28">
          {/* Background accent glow */}
          <div className="pointer-events-none absolute bottom-0 left-0 h-[300px] w-[300px] rounded-full bg-primary/15 blur-[100px]" />

          <div className="relative">
            <div className="mb-6 h-px w-16 bg-accent" />
            <h2 className="font-display text-4xl font-bold italic leading-tight tracking-tighter text-white lg:text-5xl xl:text-6xl">
              {t('title')}
            </h2>
            <p className="mt-6 max-w-md font-body text-lg leading-relaxed text-white/60">
              {t('subtitle')}
            </p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
              <QuoteModalButton
                size="lg"
                className="bg-white text-secondary hover:bg-white/90"
                analyticsLocation="cta_section"
              >
                {t('button')}
                <ArrowRight className="h-5 w-5" />
              </QuoteModalButton>
              <Button
                size="lg"
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10"
                asChild
              >
                <Link href="/contact">{t('buttonSecondary')}</Link>
              </Button>
            </div>

            <p className="mt-6 font-body text-sm text-white/35">
              {t('reassurance')}
            </p>
          </div>
        </div>

        {/* Right — Teal trust panel */}
        <div className="relative flex flex-col justify-center bg-accent/10 px-8 py-20 lg:px-16 lg:py-28">
          {/* Pattern */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 1px)',
              backgroundSize: '32px 32px',
            }}
          />

          <div className="relative space-y-12">
            {trustSignals.map((signal) => (
              <div key={signal.value} className="border-l-2 border-accent/40 pl-6">
                <p className="font-display text-5xl font-bold tracking-tighter text-white lg:text-6xl">
                  {signal.value}
                </p>
                <p className="mt-2 font-body text-sm font-semibold uppercase tracking-[0.18em] text-white/40">
                  {signal.label}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
