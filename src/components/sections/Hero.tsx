import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { Button, Container, QuoteModalButton } from '@/components/ui';
import { Link } from '@/i18n/routing';
import { HeroGraphic } from './HeroGraphic';
import { HeroTrustMarquee } from './HeroTrustMarquee';

export async function Hero(): Promise<React.ReactElement> {
  const t = await getTranslations('hero');

  return (
    <section className="relative min-h-[calc(100dvh-4rem)] overflow-hidden bg-secondary lg:min-h-[calc(100dvh-5rem)]">

      {/* Background layers */}
      <div className="pointer-events-none absolute inset-0">
        <Image
          src="/hero-medical.jpg"
          alt={t('heroImageAlt')}
          fill
          className="object-cover object-center"
          priority
          quality={85}
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-secondary/85" />
        <div
          className="animate-gradient-drift absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(ellipse at 20% 50%, hsl(200 65% 55% / 0.08) 0%, transparent 50%),
                              radial-gradient(ellipse at 80% 20%, hsl(175 50% 45% / 0.06) 0%, transparent 50%),
                              radial-gradient(ellipse at 60% 80%, hsl(200 65% 55% / 0.04) 0%, transparent 50%)`,
          }}
        />
        <div className="hero-text-guard absolute inset-0" />
        <div className="pattern-dots-light absolute inset-0" />
        <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-secondary/60 to-transparent" />
      </div>

      {/* Main content — pinned to remaining viewport after sticky header (h-16 mobile / h-20 desktop) */}
      <div className="relative z-10 flex h-[calc(100dvh-4rem)] w-full flex-col overflow-clip lg:h-[calc(100dvh-5rem)]">

        {/* Row 1: Text content — shrinks to fit, pushes content to bottom */}
        <div className="flex min-h-0 flex-1 flex-col justify-center overflow-hidden">
          <Container className="py-6 pt-20 lg:py-8 lg:pt-28">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-12">

              {/* Left: headline + subtitle */}
              <div className="max-w-3xl space-y-4 lg:space-y-5">
                <h1 className="font-display tracking-tighter text-white">
                  <span className="stagger-item-dramatic stagger-delay-1 block text-lg font-semibold uppercase tracking-[0.2em] text-white/40 md:text-xl lg:text-2xl">
                    {t('headline1')}
                  </span>
                  {/* Visually-hidden space so crawlers read "Medical Supplies for…" not "Medical Suppliesfor…" */}
                  <span className="sr-only">{' '}</span>
                  <span className="stagger-item-dramatic stagger-delay-2 mt-1 block text-[2.5rem] font-extrabold italic leading-[0.95] text-primary sm:text-5xl md:text-6xl lg:text-[4.5rem] xl:text-[5.5rem]">
                    {t('headline2')}
                  </span>
                </h1>

                <div
                  className="animate-reveal-line stagger-delay-3 h-px w-20 lg:w-32"
                  style={{
                    backgroundImage: 'linear-gradient(to right, hsl(200 65% 55%), hsl(175 50% 45%), transparent)',
                  }}
                />

                <p className="stagger-item stagger-delay-4 max-w-lg font-body text-sm leading-relaxed text-white/55 lg:text-base">
                  {t('subtitle')}
                </p>

                {/* CTAs — mobile only */}
                <div className="stagger-item stagger-delay-5 flex flex-col gap-3 pt-1 sm:flex-row sm:items-center lg:hidden">
                  <QuoteModalButton size="lg">
                    {t('cta')}
                  </QuoteModalButton>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white/20 text-white hover:bg-white hover:text-secondary active:-translate-y-[1px]"
                    asChild
                  >
                    <Link href="/products">{t('ctaSecondary')}</Link>
                  </Button>
                </div>

                <p className="stagger-item stagger-delay-5 font-body text-xs text-white/35 lg:hidden">
                  {t('reassurance')}
                </p>
              </div>

              {/* Right: CTAs — desktop only */}
              <div className="hidden shrink-0 lg:flex lg:flex-col lg:items-end lg:gap-3">
                <div className="stagger-item stagger-delay-5 flex flex-col gap-3">
                  <QuoteModalButton size="lg">
                    {t('cta')}
                  </QuoteModalButton>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white/20 text-white hover:bg-white hover:text-secondary active:-translate-y-[1px]"
                    asChild
                  >
                    <Link href="/products">{t('ctaSecondary')}</Link>
                  </Button>
                </div>
                <p className="stagger-item stagger-delay-6 text-right font-body text-sm text-white/35">
                  {t('reassurance')}
                </p>
              </div>

            </div>
          </Container>
        </div>

        {/* Row 2: Full-width supply chain graphic band */}
        <div className="stagger-item stagger-delay-6 w-full shrink-0 pb-12 pt-2 lg:pb-14 lg:pt-4">
          <Container>
            <HeroGraphic />
          </Container>
        </div>

        {/* Row 3: Trust marquee band (edge-to-edge, always visible) */}
        <div className="stagger-item stagger-delay-7 w-full shrink-0">
          <HeroTrustMarquee />
        </div>

      </div>

      {/* Bottom fade into next section */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-secondary to-transparent" />
    </section>
  );
}
