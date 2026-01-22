import { Heart, Globe, Users } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { Container } from '@/components/ui';

export async function Mission(): Promise<React.ReactElement> {
  const t = await getTranslations('mission');

  return (
    <section id="about" className="bg-muted py-20 lg:py-28">
      <Container>
        <div className="mx-auto max-w-4xl text-center">
          {/* Icon */}
          <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-accent/10">
            <Heart className="h-8 w-8 text-accent" />
          </div>

          {/* Title */}
          <h2 className="mb-6 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            <span className="text-accent">&ldquo;Watu&rdquo;</span> {t('title')}{' '}
            <span className="text-secondary">{t('titleHighlight')}</span> {t('titleEnd')}
          </h2>

          {/* Story */}
          <p className="mb-8 text-lg leading-relaxed text-muted-foreground">
            {t('description1')}{' '}
            <strong className="text-secondary">{t('highlight1')}</strong> {t('and')}{' '}
            <strong className="text-secondary">{t('highlight2')}</strong>.
          </p>

          <p className="text-lg leading-relaxed text-muted-foreground">
            {t('description2')}
          </p>

          {/* Visual Elements */}
          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            <div className="flex flex-col items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Globe className="h-6 w-6 text-primary" />
              </div>
              <p className="font-medium text-secondary">{t('asiaHub')}</p>
              <p className="text-sm text-muted-foreground">{t('asiaHubDesc')}</p>
            </div>

            <div className="flex flex-col items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/10">
                <Heart className="h-6 w-6 text-accent" />
              </div>
              <p className="font-medium text-secondary">{t('healthcareFocus')}</p>
              <p className="text-sm text-muted-foreground">{t('healthcareFocusDesc')}</p>
            </div>

            <div className="flex flex-col items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <p className="font-medium text-secondary">{t('developingEconomies')}</p>
              <p className="text-sm text-muted-foreground">{t('developingEconomiesDesc')}</p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
