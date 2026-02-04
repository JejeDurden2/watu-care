import { getTranslations } from 'next-intl/server';
import { Button, Container } from '@/components/ui';
import { HeroGraphic } from './HeroGraphic';

export async function Hero(): Promise<React.ReactElement> {
  const t = await getTranslations('hero');

  return (
    <section className="relative overflow-hidden bg-secondary">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        {/* Subtle dot pattern */}
        <div className="pattern-dots-light absolute inset-0 text-white" />

        {/* Diagonal accent lines - bottom right */}
        <div
          className="absolute bottom-0 right-0 h-1/2 w-1/2 opacity-[0.03]"
          style={{
            background: `repeating-linear-gradient(
              -45deg,
              transparent,
              transparent 20px,
              white 20px,
              white 21px
            )`
          }}
        />
      </div>

      {/* Content */}
      <Container className="relative z-10">
        <div className="grid min-h-[85vh] items-center gap-12 py-20 lg:grid-cols-[1.2fr_0.8fr] lg:gap-20">
          {/* Left Column - Text Content */}
          <div className="space-y-8 lg:pr-8">
            {/* Headline */}
            <h1 className="text-display-sm text-white md:text-display lg:text-display-lg">
              {t('headline1')}
              <br />
              <span className="text-accent">{t('headline2')}</span>
            </h1>

            {/* Subtitle */}
            <p className="max-w-xl text-body-lg text-white/70">
              {t('subtitle')}
            </p>

            {/* CTAs */}
            <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center">
              <Button size="lg" asChild>
                <a href="#quote">{t('cta')}</a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/30 text-white hover:bg-white hover:text-secondary"
                asChild
              >
                <a href="#products">{t('ctaSecondary')}</a>
              </Button>
            </div>

          </div>

          {/* Right Column - Graphic */}
          <div className="relative hidden h-[400px] lg:block lg:h-[500px] lg:-mr-12 lg:mt-12">
            <HeroGraphic />
          </div>
        </div>
      </Container>

      {/* Corner accents */}
      <div className="absolute left-8 top-32 hidden opacity-20 lg:block">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <path d="M0 16V0H16" stroke="white" strokeWidth="2" />
        </svg>
      </div>
      <div className="absolute bottom-32 right-8 hidden opacity-20 lg:block">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <path d="M32 16V32H16" stroke="white" strokeWidth="2" />
        </svg>
      </div>
    </section>
  );
}
