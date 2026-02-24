import { MapPin, Handshake, MessageCircle, LayoutGrid } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { Container } from '@/components/ui';

export async function WhyUs(): Promise<React.ReactElement> {
  const t = await getTranslations('whyUs');

  return (
    <section
      id="why-us"
      className="relative overflow-hidden bg-secondary py-20 lg:py-28"
      data-animate
    >
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="pattern-dots-light absolute inset-0" />
        <div className="absolute right-0 top-0 h-[400px] w-[400px] rounded-full bg-primary/8 blur-[120px]" />
      </div>

      <Container className="relative">
        {/* Left-aligned header */}
        <div className="mb-14 max-w-xl lg:mb-16">
          <div className="mb-5 h-px w-16 bg-accent" />
          <h2 className="font-display text-4xl font-bold tracking-tighter text-white lg:text-5xl">
            {t('title')}
          </h2>
          <p className="mt-4 max-w-lg font-body text-lg leading-relaxed text-white/55">
            {t('subtitle')}
          </p>
        </div>

        {/* Asymmetric bento: anchor card (left, spans 2 rows) + 2 compact (right) */}
        <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr] lg:grid-rows-2">

          {/* Anchor card — row-span-2 on desktop */}
          <div className="group relative row-span-2 overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-10 transition-all duration-300 hover:border-white/20 hover:bg-white/8">
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-accent/20 text-accent transition-colors duration-300 group-hover:bg-accent/30">
              <MapPin className="h-8 w-8" />
            </div>
            <h3 className="mb-4 font-display text-2xl font-bold tracking-tight text-white lg:text-3xl">
              {t('hubTitle')}
            </h3>
            <p className="mb-10 font-body text-base leading-relaxed text-white/55">
              {t('hubDesc')}
            </p>
            {/* Stat */}
            <div className="border-t border-white/10 pt-6">
              <p className="font-display text-5xl font-bold text-accent">30+</p>
              <p className="mt-1 font-body text-xs font-semibold uppercase tracking-widest text-white/35">
                Countries served
              </p>
            </div>
          </div>

          {/* Supporting card — Direct sourcing */}
          <div className="group flex items-start gap-5 rounded-3xl border border-white/10 p-7 transition-all duration-300 hover:border-white/20 hover:bg-white/5">
            <div className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/20 text-primary transition-colors duration-300 group-hover:bg-primary/30">
              <Handshake className="h-5 w-5" />
            </div>
            <div>
              <h3 className="mb-2 font-display text-lg font-semibold text-white">
                {t('directTitle')}
              </h3>
              <p className="font-body text-sm leading-relaxed text-white/50">
                {t('directDesc')}
              </p>
            </div>
          </div>

          {/* Supporting card — Service */}
          <div className="group flex items-start gap-5 rounded-3xl border border-white/10 p-7 transition-all duration-300 hover:border-white/20 hover:bg-white/5">
            <div className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/20 text-primary transition-colors duration-300 group-hover:bg-primary/30">
              <MessageCircle className="h-5 w-5" />
            </div>
            <div>
              <h3 className="mb-2 font-display text-lg font-semibold text-white">
                {t('serviceTitle')}
              </h3>
              <p className="font-body text-sm leading-relaxed text-white/50">
                {t('serviceDesc')}
              </p>
            </div>
          </div>

        </div>

        {/* Full-width bottom row card */}
        <div className="mt-4 flex flex-col items-start gap-4 rounded-3xl border border-white/10 p-7 transition-all duration-300 hover:border-white/20 hover:bg-white/5 sm:flex-row sm:items-center">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent/20 text-accent">
            <LayoutGrid className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <h3 className="font-display text-lg font-semibold text-white">
              {t('catalogTitle')}
            </h3>
            <p className="mt-1 font-body text-sm leading-relaxed text-white/50">
              {t('catalogDesc')}
            </p>
          </div>
          <div className="shrink-0 rounded-full border border-accent/30 px-4 py-1.5">
            <span className="font-body text-xs font-semibold uppercase tracking-wider text-accent">
              500+ SKUs
            </span>
          </div>
        </div>

      </Container>
    </section>
  );
}
