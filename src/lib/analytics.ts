/**
 * Analytics utility — typed helpers for GTM dataLayer events.
 * All events use object_action naming (snake_case).
 * No PII is ever tracked (no email, name, phone).
 */

type DataLayerEvent = Record<string, unknown> & { event: string };

declare global {
  interface Window {
    dataLayer: DataLayerEvent[];
  }
}

function trackEvent(name: string, properties?: Record<string, unknown>): void {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: name, ...properties });
}

// ── CTA ──────────────────────────────────────────────────────────────

export function trackCtaClick(ctaLocation: string, ctaText: string): void {
  trackEvent('cta_click', { cta_location: ctaLocation, cta_text: ctaText });
}

// ── Quote Product List ───────────────────────────────────────────────

export function trackProductAdd(productId: string, categorySlug: string): void {
  trackEvent('quote_product_add', { product_id: productId, category_slug: categorySlug });
}

export function trackProductRemove(productId: string, categorySlug: string): void {
  trackEvent('quote_product_remove', { product_id: productId, category_slug: categorySlug });
}

// ── Quote Funnel ─────────────────────────────────────────────────────

export function trackQuoteModalOpen(productCount: number, source: string): void {
  trackEvent('quote_modal_open', { product_count: productCount, source });
}

export function trackQuoteFormStart(productCount: number): void {
  trackEvent('quote_form_start', { product_count: productCount });
}

export function trackQuoteFormSubmit(productCount: number, countryCode: string): void {
  trackEvent('quote_form_submit', { product_count: productCount, country_code: countryCode });
}

export function trackQuoteFormError(errorType: string): void {
  trackEvent('quote_form_error', { error_type: errorType });
}

// ── Form Fields ──────────────────────────────────────────────────────

export function trackFormFieldInteraction(
  formName: string,
  fieldName: string,
  interactionType: 'focus' | 'blur',
): void {
  trackEvent('form_field_interaction', {
    form_name: formName,
    field_name: fieldName,
    interaction_type: interactionType,
  });
}

// ── Product Discovery ────────────────────────────────────────────────

export function trackCategoryClick(categorySlug: string): void {
  trackEvent('category_click', { category_slug: categorySlug });
}

export function trackSearchQuery(searchTerm: string, resultCount: number): void {
  trackEvent('search_query', { search_term: searchTerm, result_count: resultCount });
}

export function trackSearchResultClick(productId: string, searchTerm: string): void {
  trackEvent('search_result_click', { product_id: productId, search_term: searchTerm });
}

// ── Navigation ───────────────────────────────────────────────────────

export function trackNavClick(linkHref: string, navType: 'desktop' | 'mobile'): void {
  trackEvent('nav_click', { link_href: linkHref, nav_type: navType });
}

export function trackLanguageSwitch(fromLocale: string, toLocale: string): void {
  trackEvent('language_switch', { from_locale: fromLocale, to_locale: toLocale });
}

// ── Engagement ───────────────────────────────────────────────────────

export function trackFaqOpen(faqKey: string, faqIndex: number): void {
  trackEvent('faq_open', { faq_key: faqKey, faq_index: faqIndex });
}
