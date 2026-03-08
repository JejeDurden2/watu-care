'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
  headingLevel?: 'h2' | 'h3';
}

export function FAQAccordion({ items, headingLevel = 'h3' }: FAQAccordionProps): React.ReactElement {
  const [openIndex, setOpenIndex] = useState<number>(0);
  const Heading = headingLevel;

  return (
    <div className="divide-y divide-border">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const panelId = `faq-accordion-panel-${index}`;
        return (
          <div key={item.question} className="py-1">
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? -1 : index)}
              className="flex w-full items-center justify-between gap-4 py-6 text-left transition-colors"
              aria-expanded={isOpen}
              aria-controls={panelId}
            >
              <Heading
                className={cn(
                  'font-display text-lg font-semibold tracking-tight transition-colors lg:text-xl',
                  isOpen ? 'text-secondary' : 'text-secondary/70 hover:text-secondary'
                )}
              >
                {item.question}
              </Heading>
              <ChevronDown
                className={cn(
                  'h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-200',
                  isOpen && 'rotate-180'
                )}
              />
            </button>
            <div
              id={panelId}
              role="region"
              className={cn(
                'grid transition-all duration-200 ease-out',
                isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
              )}
            >
              <div className="overflow-hidden">
                <p className="pb-6 font-body text-base leading-relaxed text-muted-foreground">
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
