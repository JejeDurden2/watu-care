'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Container } from '@/components/ui';

const faqKeys = [
  'moq',
  'delivery',
  'regions',
  'certifications',
  'payment',
  'support',
] as const;

export function FAQ(): React.ReactElement {
  const t = useTranslations('faq');
  const [activeIndex, setActiveIndex] = useState<number>(0);

  return (
    <section id="faq" className="bg-muted/40 py-20 lg:py-28" data-animate>
      <Container>
        {/* Left-aligned header */}
        <div className="mb-14 max-w-xl lg:mb-16">
          <div className="mb-5 h-px w-16 bg-accent" />
          <h2 className="font-display text-4xl font-bold tracking-tighter text-secondary lg:text-5xl">
            {t('title')}
          </h2>
          <p className="mt-4 max-w-lg font-body text-lg leading-relaxed text-muted-foreground">
            {t('subtitle')}
          </p>
        </div>

        {/* Split-screen layout */}
        <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:gap-16">

          {/* Left: question list */}
          <div className="divide-y divide-border">
            {faqKeys.map((key, index) => {
              const isActive = activeIndex === index;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className="flex w-full items-start gap-4 py-5 text-left transition-colors duration-200"
                  aria-expanded={isActive}
                  aria-controls={`faq-answer-${index}`}
                >
                  {/* Active indicator */}
                  <span
                    className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full transition-colors duration-200 ${
                      isActive ? 'bg-accent' : 'bg-border'
                    }`}
                  />
                  <span
                    className={`font-body text-base transition-all duration-200 ${
                      isActive
                        ? 'font-semibold text-secondary'
                        : 'font-normal text-muted-foreground hover:text-secondary/70'
                    }`}
                  >
                    {t(`${key}Question`)}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right: answer panel */}
          <div className="relative lg:sticky lg:top-8 lg:self-start">
            {faqKeys.map((key, index) => {
              const isActive = activeIndex === index;
              return (
                <div
                  key={key}
                  id={`faq-answer-${index}`}
                  role="region"
                  aria-label={t(`${key}Question`)}
                  className={`absolute inset-0 rounded-3xl border border-border/60 bg-white p-8 shadow-depth-sm transition-all duration-300 lg:p-10 ${
                    isActive
                      ? 'opacity-100 translate-y-0 pointer-events-auto'
                      : 'opacity-0 translate-y-2 pointer-events-none'
                  }`}
                  style={{ position: index === 0 ? 'relative' : 'absolute' }}
                >
                  {/* Question as sub-heading */}
                  <h3 className="mb-6 font-display text-xl font-semibold tracking-tight text-secondary lg:text-2xl">
                    {t(`${key}Question`)}
                  </h3>
                  {/* Divider */}
                  <div className="mb-6 h-px w-12 bg-accent" />
                  {/* Answer */}
                  <p className="font-body text-base leading-relaxed text-muted-foreground">
                    {t(`${key}Answer`)}
                  </p>
                </div>
              );
            })}
          </div>

        </div>
      </Container>
    </section>
  );
}
