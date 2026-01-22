import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { Button, Container } from '@/components/ui';

export async function Hero(): Promise<React.ReactElement> {
  const t = await getTranslations('hero');

  return (
    <section className="relative min-h-[90vh] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/hero-medical.jpg"
          alt="Healthcare professionals"
          fill
          className="object-cover"
          priority
          quality={90}
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-secondary/95 via-secondary/80 to-secondary/40" />
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
    </section>
  );
}
