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
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number): void => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 lg:py-28 bg-muted/30" data-animate>
      <Container>
        {/* Header */}
        <div className="mx-auto mb-12 max-w-2xl text-center lg:mb-16">
          <h2 className="mb-4 text-heading-lg lg:text-display-sm">
            {t('title')}
          </h2>
          <p className="text-body-lg text-muted-foreground">{t('subtitle')}</p>
        </div>

        {/* FAQ Items */}
        <div className="mx-auto max-w-3xl space-y-2">
          {faqKeys.map((key, index) => {
            const isOpen = openIndex === index;
            const number = String(index + 1).padStart(2, '0');

            return (
              <div
                key={key}
                className={`rounded-xl transition-all duration-300 ${
                  isOpen
                    ? 'bg-white shadow-soft-md'
                    : 'hover:bg-white/60'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggle(index)}
                  className="flex w-full items-start gap-4 px-6 py-5 text-left"
                  aria-expanded={isOpen}
                >
                  {/* Number */}
                  <span
                    className={`font-display mt-0.5 shrink-0 text-sm font-bold tabular-nums transition-colors duration-200 ${
                      isOpen ? 'text-accent' : 'text-accent/30'
                    }`}
                  >
                    {number}
                  </span>

                  {/* Question */}
                  <span
                    className={`flex-1 text-lg font-semibold transition-colors duration-200 ${
                      isOpen ? 'text-secondary' : 'text-secondary/80'
                    }`}
                  >
                    {t(`${key}Question`)}
                  </span>

                  {/* Toggle icon */}
                  <span
                    className={`font-body ml-2 mt-0.5 shrink-0 text-xl font-light leading-none transition-all duration-200 ${
                      isOpen ? 'text-accent' : 'text-muted-foreground'
                    }`}
                  >
                    {isOpen ? '−' : '+'}
                  </span>
                </button>

                {/* Answer */}
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <p className="px-6 pb-6 pl-16 leading-relaxed text-muted-foreground">
                    {t(`${key}Answer`)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
