import { ArrowRightLeft, Handshake, MessageCircle, LayoutGrid } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { Container } from '@/components/ui';
import { COUNTRIES_SERVED_LABEL, PRODUCT_LINES } from '@/lib/constants';

export async function WhyUs(): Promise<React.ReactElement> {
  const t = await getTranslations('whyUs');

  return (
    <section
      id="why-us"
      className="relative overflow-hidden bg-secondary py-20 lg:py-28"
      data-animate
    >
      {/* Background pattern */}
      <div className="pointer-events-none absolute inset-0 pattern-dots-light" />

      <Container className="relative">
        {/* Header */}
        <div className="mb-14 max-w-xl lg:mb-16">
          <div className="mb-5 h-px w-16 bg-accent-light" />
          <h2 className="font-display text-4xl font-bold tracking-tighter text-white lg:text-5xl">
            {t('title')}
          </h2>
          <p className="mt-4 max-w-lg font-body text-lg leading-relaxed text-white/50">
            {t('subtitle')}
          </p>
        </div>

        {/* Asymmetric bento: anchor (left, 2 rows) + 2 supporting (right) */}
        <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr] lg:grid-rows-2">
          {/* Anchor card — row-span-2 on desktop */}
          <div className="card-glow-dark group row-span-1 rounded-2xl border border-white/10 bg-white/[0.04] p-8 lg:row-span-2 lg:p-10">
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-accent-light/10 text-accent-light">
              <ArrowRightLeft className="h-6 w-6" strokeWidth={1.5} />
            </div>
            <h3 className="mb-3 font-display text-2xl font-bold tracking-tight text-white lg:text-3xl">
              {t('hubTitle')}
            </h3>
            <p className="mb-8 font-body text-base leading-relaxed text-white/50">{t('hubDesc')}</p>
            {/* Stat divider */}
            <div className="border-t border-white/8 pt-6">
              <p className="font-display text-4xl font-bold text-accent-light lg:text-5xl">
                {COUNTRIES_SERVED_LABEL}
              </p>
              <p className="mt-1 font-body text-xs font-medium uppercase tracking-widest text-white/60">
                {t('countriesServed')}
              </p>
            </div>
          </div>

          {/* Supporting card — Direct sourcing */}
          <div className="card-glow-dark group flex items-start gap-5 rounded-2xl border border-white/10 p-7">
            <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-light/10 text-primary-light">
              <Handshake className="h-5 w-5" strokeWidth={1.5} />
            </div>
            <div>
              <h3 className="mb-1.5 font-display text-lg font-semibold text-white">
                {t('directTitle')}
              </h3>
              <p className="font-body text-sm leading-relaxed text-white/60">{t('directDesc')}</p>
            </div>
          </div>

          {/* Supporting card — Service */}
          <div className="card-glow-dark group flex items-start gap-5 rounded-2xl border border-white/10 p-7">
            <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-light/10 text-primary-light">
              <MessageCircle className="h-5 w-5" strokeWidth={1.5} />
            </div>
            <div>
              <h3 className="mb-1.5 font-display text-lg font-semibold text-white">
                {t('serviceTitle')}
              </h3>
              <p className="font-body text-sm leading-relaxed text-white/60">{t('serviceDesc')}</p>
            </div>
          </div>
        </div>

        {/* Full-width bottom card — Catalog */}
        <div className="card-glow-dark mt-4 flex flex-col items-start gap-4 rounded-2xl border border-white/10 p-7 sm:flex-row sm:items-center">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent-light/10 text-accent-light">
            <LayoutGrid className="h-5 w-5" strokeWidth={1.5} />
          </div>
          <div className="flex-1">
            <h3 className="font-display text-lg font-semibold text-white">{t('catalogTitle')}</h3>
            <p className="mt-1 font-body text-sm leading-relaxed text-white/60">
              {t('catalogDesc')}
            </p>
          </div>
          <span className="shrink-0 font-body text-sm text-white/60">
            {t('skuCount', { count: PRODUCT_LINES })}
          </span>
        </div>
      </Container>
    </section>
  );
}
