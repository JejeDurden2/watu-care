import { getTranslations } from 'next-intl/server';
import { Button, Container } from '@/components/ui';

export async function Hero(): Promise<React.ReactElement> {
  const t = await getTranslations('hero');

  return (
    <section className="relative min-h-[90vh] overflow-hidden">
      {/* Parallax Background */}
      <div
        className="parallax-bg absolute inset-0"
        style={{ backgroundImage: 'url(/hero-medical.jpg)' }}
      />

      {/* Animated Gradient Overlay */}
      <div className="animate-gradient absolute inset-0 bg-gradient-to-br from-secondary/95 via-secondary/85 to-primary/60" />

      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating circles */}
        <div className="animate-float-slow absolute -right-20 -top-20 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />
        <div className="animate-float absolute -bottom-32 -left-32 h-[500px] w-[500px] rounded-full bg-primary/10 blur-3xl" />
        <div className="animate-pulse-soft absolute right-1/4 top-1/3 h-64 w-64 rounded-full bg-accent/5 blur-2xl" />

        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 1px)`,
            backgroundSize: '48px 48px',
          }}
        />
      </div>

      {/* Content */}
      <Container className="relative z-10 flex min-h-[90vh] flex-col justify-center py-20">
        <div className="max-w-2xl space-y-6">
          <h1 className="text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
            {t('title')}{' '}
            <span className="text-accent">{t('titleHighlight')}</span>
          </h1>

          <p className="text-lg leading-relaxed text-white/80 sm:text-xl">
            {t('subtitle')}
          </p>

          <div className="flex flex-col gap-4 pt-4 sm:flex-row">
            <Button size="lg" asChild>
              <a href="#quote">{t('cta')}</a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-secondary"
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
