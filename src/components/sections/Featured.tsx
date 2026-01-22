import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { Button, Container } from '@/components/ui';

export async function Featured(): Promise<React.ReactElement> {
  const t = await getTranslations('featured');

  return (
    <section className="relative overflow-hidden py-20 lg:py-0">
      <div className="grid lg:grid-cols-2">
        {/* Image */}
        <div className="relative h-64 sm:h-80 lg:h-auto lg:min-h-[500px]">
          <Image
            src="/fluid-management.jpg"
            alt="Fluid management and medical consumables"
            fill
            className="object-cover"
            quality={85}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-secondary/40 to-transparent lg:bg-gradient-to-r" />
        </div>

        {/* Content */}
        <div className="flex items-center bg-secondary py-12 lg:py-20">
          <Container className="lg:max-w-xl lg:pl-12">
            <span className="mb-4 inline-block rounded-full bg-accent/20 px-4 py-1.5 text-sm font-medium text-accent">
              {t('badge')}
            </span>
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              {t('title')}
            </h2>
            <p className="mb-8 text-lg leading-relaxed text-white/80">
              {t('description')}
            </p>
            <Button size="lg" asChild>
              <Link href="#quote">{t('cta')}</Link>
            </Button>
          </Container>
        </div>
      </div>
    </section>
  );
}
