import { getTranslations } from 'next-intl/server';
import { Button, Container } from '@/components/ui';

export async function Hero(): Promise<React.ReactElement> {
  const t = await getTranslations('hero');

  return (
    <section className="relative min-h-[85vh] overflow-hidden bg-secondary">
      {/* Animated Gradient Background */}
      <div className="animate-gradient absolute inset-0 bg-gradient-to-br from-secondary via-primary/30 to-accent/20" />

      {/* Animated Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Large floating orbs */}
        <div className="animate-float-diagonal absolute -right-20 -top-20 h-[400px] w-[400px] rounded-full bg-gradient-to-br from-primary/35 to-accent/25 blur-xl" />
        <div className="animate-float-reverse absolute -bottom-32 -left-32 h-[500px] w-[500px] rounded-full bg-gradient-to-tr from-accent/30 to-primary/20 blur-xl" />

        {/* Medium orbs */}
        <div className="animate-float-up absolute right-1/4 top-1/4 h-64 w-64 rounded-full bg-primary/30 blur-lg" />
        <div className="animate-pulse-glow absolute bottom-1/3 left-1/4 h-72 w-72 rounded-full bg-accent/25 blur-lg" />

        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 1px)`,
            backgroundSize: '32px 32px',
          }}
        />
      </div>

      {/* Content */}
      <Container className="relative z-10 flex min-h-[85vh] flex-col justify-center py-20">
        <div className="max-w-3xl space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-sm">
            <span className="h-2 w-2 rounded-full bg-accent" />
            <span className="text-sm font-medium text-white/90">
              {t('badge')}
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-7xl">
            {t('headline1')}
            <br />
            <span className="text-accent">{t('headline2')}</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl text-white/70 sm:text-2xl">{t('subtitle')}</p>

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
      </Container>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
