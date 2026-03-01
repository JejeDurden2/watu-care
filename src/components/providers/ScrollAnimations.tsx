'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export function ScrollAnimations(): null {
  const pathname = usePathname();

  useEffect(() => {
    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            intersectionObserver.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -48px 0px' },
    );

    // Observe an element if it hasn't been animated yet
    const observe = (el: Element): void => {
      if (!el.classList.contains('is-visible')) {
        intersectionObserver.observe(el);
      }
    };

    // Observe all existing [data-animate] elements
    for (const el of document.querySelectorAll('[data-animate]')) {
      observe(el);
    }

    // Watch for new [data-animate] elements added to the DOM
    // (handles async RSC streaming during client-side navigation)
    const mutationObserver = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        for (const node of mutation.addedNodes) {
          if (node instanceof HTMLElement) {
            if (node.hasAttribute('data-animate')) {
              observe(node);
            }
            for (const child of node.querySelectorAll('[data-animate]')) {
              observe(child);
            }
          }
        }
      }
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      intersectionObserver.disconnect();
      mutationObserver.disconnect();
    };
  }, [pathname]);

  return null;
}
