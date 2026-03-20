import { getTranslations } from 'next-intl/server';
import { Button, Container, QuoteModalButton } from '@/components/ui';
import { Link } from '@/i18n/routing';
import { HeroTrustMarquee } from './HeroTrustMarquee';

/* ECG with two heartbeats */
const ECG_WIDE =
  'M 0 60 H 120 C 130 60 138 53 145 60 H 175 L 192 18 L 210 102 L 228 60 C 240 53 255 55 268 60 H 440 C 450 60 458 53 465 60 H 495 L 512 18 L 530 102 L 548 60 C 560 53 575 55 588 60 H 800';

/* Mobile: two heartbeats, compact */
const ECG_MOBILE =
  'M 0 30 H 60 C 66 30 70 27 74 30 H 90 L 100 8 L 110 52 L 120 30 C 126 27 132 28 136 30 H 220 C 226 30 230 27 234 30 H 250 L 260 8 L 270 52 L 280 30 C 286 27 292 28 296 30 H 400';

export async function Hero(): Promise<React.ReactElement> {
  const t = await getTranslations('hero');

  return (
    <section className="relative min-h-[calc(100dvh-4rem)] overflow-hidden bg-secondary lg:min-h-[calc(100dvh-5rem)]">

      {/* ── Background: mesh gradient + atmosphere ── */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">

        {/* Living mesh blobs */}
        <div
          className="hero-mesh-1 absolute -left-[20%] -top-[20%] h-[80%] w-[70%] rounded-full"
          style={{ background: 'radial-gradient(circle, hsl(200 65% 55%), transparent 70%)' }}
        />
        <div
          className="hero-mesh-2 absolute -bottom-[25%] -right-[15%] h-[75%] w-[65%] rounded-full"
          style={{ background: 'radial-gradient(circle, hsl(175 50% 45%), transparent 70%)' }}
        />
        <div
          className="hero-mesh-3 absolute left-[20%] top-[15%] h-[60%] w-[55%] rounded-full"
          style={{ background: 'radial-gradient(circle, hsl(200 65% 70%), transparent 65%)' }}
        />
        <div
          className="hero-mesh-4 absolute -right-[10%] -top-[15%] h-[55%] w-[50%] rounded-full"
          style={{ background: 'radial-gradient(circle, hsl(175 50% 50%), transparent 70%)' }}
        />

        {/* Central spotlight */}
        <div
          className="hero-spotlight absolute left-1/2 top-[40%] h-[50%] w-[60%] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{ background: 'radial-gradient(ellipse, hsl(200 65% 55% / 0.12), hsl(175 50% 45% / 0.04) 50%, transparent 70%)' }}
        />

        {/* Dot pattern */}
        <div className="pattern-dots-light absolute inset-0 opacity-30" />

        {/* Edge vignette */}
        <div
          className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse at center, transparent 30%, hsl(206 50% 10% / 0.6) 100%)' }}
        />
      </div>

      {/* ── Concentric rings (lg+) ── */}
      <div className="pointer-events-none absolute inset-0 hidden lg:flex lg:items-center lg:justify-center" aria-hidden="true">
        <div className="relative h-[500px] w-[500px] xl:h-[600px] xl:w-[600px]" style={{ marginTop: '-3%' }}>
          <div className="hero-ring-1 absolute inset-0 rounded-full border border-white/[0.03]" />
          <div className="hero-ring-2 absolute inset-[18%] rounded-full border border-white/[0.04]" />
          <div className="hero-ring-3 absolute inset-[36%] rounded-full border border-white/[0.05]" />
        </div>
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 flex min-h-[calc(100dvh-4rem)] flex-col lg:min-h-[calc(100dvh-5rem)]">

        <div className="flex w-full flex-1 items-center">
          <Container className="py-16 pt-20 lg:py-8">
            <div className="mx-auto max-w-3xl text-center">

              <span className="stagger-item stagger-delay-1 block font-body text-sm font-semibold uppercase tracking-[0.2em] text-white/40 lg:text-base">
                {t('headline1')}
              </span>

              <h1 className="hero-headline-reveal mt-5 font-display tracking-tighter lg:mt-6">
                <span className="hero-text-shimmer block text-[2.5rem] font-extrabold italic leading-[0.95] sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
                  {t('headline2')}
                </span>
              </h1>

              <p className="stagger-item stagger-delay-4 mx-auto mt-6 max-w-xl font-body text-sm leading-relaxed text-white/50 lg:mt-8 lg:text-base">
                {t('subtitle')}
              </p>

              <div className="stagger-item stagger-delay-5 mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row lg:mt-10">
                <QuoteModalButton size="lg" analyticsLocation="hero">
                  {t('cta')}
                </QuoteModalButton>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/15 text-white hover:bg-white hover:text-secondary active:-translate-y-[1px]"
                  asChild
                >
                  <Link href="/products">{t('ctaSecondary')}</Link>
                </Button>
              </div>

              <p className="stagger-item stagger-delay-6 mt-5 font-body text-xs text-white/30">
                {t('reassurance')}
              </p>

            </div>
          </Container>
        </div>

        {/* ── Pulse line — imposing, full-width ── */}
        <div className="hero-pulse-container w-full shrink-0" aria-hidden="true">
          {/* Desktop */}
          <div className="hidden lg:block">
            <svg
              viewBox="0 0 800 120"
              className="h-auto w-full"
              preserveAspectRatio="none"
              fill="none"
            >
              <defs>
                <radialGradient id="hero-pulse-ambient" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="hsl(175 50% 55%)" stopOpacity="0.10" />
                  <stop offset="60%" stopColor="hsl(175 50% 55%)" stopOpacity="0.03" />
                  <stop offset="100%" stopColor="hsl(175 50% 55%)" stopOpacity="0" />
                </radialGradient>
                <filter id="hero-trace-glow">
                  <feGaussianBlur stdDeviation="5" />
                </filter>
                <filter id="hero-trace-glow-wide">
                  <feGaussianBlur stdDeviation="8" />
                </filter>
              </defs>

              {/* Breathing glow at the QRS peaks */}
              <circle cx="210" cy="60" r="80" fill="url(#hero-pulse-ambient)" className="hero-pulse-breathe" />
              <circle cx="530" cy="60" r="80" fill="url(#hero-pulse-ambient)" className="hero-pulse-breathe" style={{ animationDelay: '5s' }} />

              {/* Base track */}
              <path
                d={ECG_WIDE}
                stroke="rgba(255,255,255,0.05)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Wide aura glow — big, soft halo around the trace */}
              <path
                d={ECG_WIDE}
                stroke="hsl(175 50% 55%)"
                strokeWidth="8"
                strokeLinecap="round"
                strokeLinejoin="round"
                filter="url(#hero-trace-glow-wide)"
                className="hero-pulse-trace-wide"
                opacity="0.15"
              />

              {/* Inner glow trace */}
              <path
                d={ECG_WIDE}
                stroke="hsl(175 50% 55%)"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                filter="url(#hero-trace-glow)"
                className="hero-pulse-trace-wide"
                opacity="0.4"
              />

              {/* Sharp crisp trace */}
              <path
                d={ECG_WIDE}
                stroke="hsl(175 50% 60%)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="hero-pulse-trace-wide"
              />
            </svg>
          </div>

          {/* Mobile */}
          <div className="px-4 lg:hidden">
            <svg viewBox="0 0 400 60" className="h-auto w-full" fill="none">
              <defs>
                <filter id="hero-trace-glow-m">
                  <feGaussianBlur stdDeviation="4" />
                </filter>
              </defs>
              <path d={ECG_MOBILE} stroke="rgba(255,255,255,0.05)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
              <path d={ECG_MOBILE} stroke="hsl(175 50% 55%)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" filter="url(#hero-trace-glow-m)" className="hero-pulse-trace-mobile" opacity="0.25" />
              <path d={ECG_MOBILE} stroke="hsl(175 50% 55%)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="hero-pulse-trace-mobile" />
            </svg>
          </div>
        </div>

        {/* Trust marquee */}
        <div className="stagger-item stagger-delay-8 w-full shrink-0">
          <HeroTrustMarquee />
        </div>

      </div>
    </section>
  );
}
