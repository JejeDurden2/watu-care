import { ArrowRight, Mail } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { Button, Container } from '@/components/ui';

export async function CTA(): Promise<React.ReactElement> {
  const t = await getTranslations('cta');

  return (
    <section
      id="quote"
      className="relative overflow-hidden bg-gradient-to-br from-secondary via-secondary to-primary/80 py-20 lg:py-28"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,white_1px,transparent_1px)] bg-[length:40px_40px]" />
      </div>

      <Container className="relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          {/* Icon */}
          <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-white/10">
            <Mail className="h-8 w-8 text-white" />
          </div>

          {/* Heading */}
          <h2 className="mb-4 text-heading-lg text-white lg:text-display-sm">
            {t('title')}
          </h2>

          {/* Subheading */}
          <p className="mb-8 text-body-lg text-white/80">{t('subtitle')}</p>

          {/* CTA Buttons */}
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              size="lg"
              className="w-full bg-white text-secondary hover:bg-white/90 sm:w-auto"
              asChild
            >
              <Link href="mailto:contact@watu-care.com">
                {t('button')}
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-full border-white/30 text-white hover:bg-white/10 sm:w-auto"
              asChild
            >
              <Link href="#contact">{t('buttonSecondary')}</Link>
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
