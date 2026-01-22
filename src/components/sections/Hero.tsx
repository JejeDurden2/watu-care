import { getTranslations } from 'next-intl/server';
import { Button, Container } from '@/components/ui';

export async function Hero(): Promise<React.ReactElement> {
  const t = await getTranslations('hero');

  return (
    <section className="relative min-h-[90vh] overflow-hidden bg-secondary">
      {/* Animated Gradient Background */}
      <div className="animate-gradient absolute inset-0 bg-gradient-to-br from-secondary via-secondary/95 to-primary/40" />

      {/* Parallax Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Large floating orbs */}
        <div className="animate-float-slow absolute -right-32 -top-32 h-[600px] w-[600px] rounded-full bg-gradient-to-br from-primary/20 to-accent/10 blur-3xl" />
        <div className="animate-float absolute -bottom-48 -left-48 h-[700px] w-[700px] rounded-full bg-gradient-to-tr from-accent/15 to-primary/10 blur-3xl" />
        <div className="animate-pulse-soft absolute right-1/4 top-1/4 h-80 w-80 rounded-full bg-primary/10 blur-2xl" />
        <div className="animate-float absolute bottom-1/4 left-1/3 h-64 w-64 rounded-full bg-accent/10 blur-2xl" />

        {/* Smaller accent orbs */}
        <div className="animate-float-slow absolute right-1/3 top-1/2 h-32 w-32 rounded-full bg-accent/20 blur-xl" />
        <div className="animate-pulse-soft absolute bottom-1/3 right-1/4 h-40 w-40 rounded-full bg-primary/15 blur-xl" />

        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }}
        />

        {/* Diagonal lines accent */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `repeating-linear-gradient(
              45deg,
              transparent,
              transparent 100px,
              rgba(255,255,255,0.1) 100px,
              rgba(255,255,255,0.1) 101px
            )`,
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
