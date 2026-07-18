import { MapPin, ArrowRight, ArrowUpRight } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { Container, Button } from '@/components/ui';
import { getTier1Countries } from '@/data/countries';
import { Link } from '@/i18n/routing';

const regionKeys = ['africa', 'middle-east'] as const;

export async function MarketsServed(): Promise<React.ReactElement> {
  const t = await getTranslations('marketsServed');
  const tMarkets = await getTranslations('markets');
  const tier1 = getTier1Countries();

  // Reuse the markets namespace for localized country + (sub)region names.
  const countryName = (slug: string, fallback: string): string =>
    tMarkets.has(`countries.${slug}`) ? tMarkets(`countries.${slug}`) : fallback;
  const subRegionLabel = (sub?: string): string =>
    sub ? tMarkets(`regions.${sub.toLowerCase().replace(/ /g, '-')}`) : '';

  return (
    <section
      id="markets-served"
      className="relative overflow-hidden bg-background py-20 lg:py-28"
      data-animate
    >
      <div className="pointer-events-none absolute inset-0 pattern-dots-light" />

      <Container className="relative">
        {/* Header */}
        <div className="mb-14 max-w-xl lg:mb-16">
          <div className="mb-5 flex items-center gap-3">
            <span className="h-px w-10 bg-accent" />
            <span className="font-body text-xs font-semibold uppercase tracking-[0.18em] text-accent">
              {t('eyebrow')}
            </span>
          </div>
          <h2 className="font-display text-4xl font-bold tracking-tighter text-secondary lg:text-5xl">
            {t('title')}
          </h2>
          <p className="mt-4 max-w-lg font-body text-lg leading-relaxed text-muted-foreground">
            {t('subtitle')}
          </p>
        </div>

        {/* Country tiles grouped by region */}
        <div className="space-y-12">
          {regionKeys.map((regionKey) => {
            const regionCountries = tier1.filter((c) => c.region === regionKey);

            return (
              <div key={regionKey}>
                <div className="mb-6 flex items-baseline gap-3">
                  <h3 className="font-display text-xl font-semibold tracking-tight text-secondary">
                    {tMarkets(`regions.${regionKey}`)}
                  </h3>
                  <span className="font-body text-sm text-muted-foreground">
                    {t('countryCount', { count: regionCountries.length })}
                  </span>
                </div>

                <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {regionCountries.map((country) => (
                    <li key={country.slug}>
                      <Link
                        href={`/markets/${country.slug}`}
                        className="card-glow group flex items-center justify-between rounded-xl border border-border bg-background p-4"
                      >
                        <span className="flex min-w-0 items-center gap-3">
                          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary/15">
                            <MapPin className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
                          </span>
                          <span className="min-w-0">
                            <span className="block truncate font-body font-medium text-secondary">
                              {countryName(country.slug, country.name)}
                            </span>
                            <span className="block truncate font-body text-xs text-muted-foreground">
                              {subRegionLabel(country.subRegion)}
                            </span>
                          </span>
                        </span>
                        <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-300 group-hover:translate-x-1 group-hover:text-primary" aria-hidden="true" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* View all markets */}
        <div className="mt-12 flex justify-center lg:mt-14">
          <Button variant="outline" size="lg" asChild>
            <Link href="/markets">
              {t('viewAll')}
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}
