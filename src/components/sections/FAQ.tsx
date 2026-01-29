'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
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
    <section id="faq" className="py-20 lg:py-28 bg-muted/30">
      <Container>
        {/* Header */}
        <div className="mx-auto mb-12 max-w-2xl text-center lg:mb-16">
          <h2 className="mb-4 text-heading-lg lg:text-display-sm">
            {t('title')}
          </h2>
          <p className="text-body-lg text-muted-foreground">{t('subtitle')}</p>
        </div>

        {/* FAQ Items */}
        <div className="mx-auto max-w-3xl divide-y divide-border">
          {faqKeys.map((key, index) => {
            const isOpen = openIndex === index;

            return (
              <div key={key} className="py-4">
                <button
                  type="button"
                  onClick={() => toggle(index)}
                  className="flex w-full items-center justify-between gap-4 py-2 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="text-lg font-medium text-secondary">
                    {t(`${key}Question`)}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-200 ${
                    isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <p className="pb-2 pt-2 leading-relaxed text-muted-foreground">
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
