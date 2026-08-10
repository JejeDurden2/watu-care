import {
  BASE_URL,
  CONTACT_EMAIL,
  CONTENT_UPDATED,
  COUNTRIES_SERVED,
  MANUFACTURER_STANDARD,
  PRODUCT_CATEGORIES,
  PRODUCT_LINES,
  QUOTE_RESPONSE,
  SALES_PHONE_DISPLAY,
} from '@/lib/constants';

export const dynamic = 'force-static';

/**
 * Machine-readable commercial terms, served at /pricing.md.
 *
 * AI agents comparing suppliers probe this path directly. Watu Care does not
 * publish unit prices — they depend on volume, mix and freight route — so a
 * quote-based supplier that says nothing gets filtered out of agent-mediated
 * shortlists. This states the terms that *are* fixed (MOQ basis, lead times,
 * payment instruments, what a quote contains) so an agent can qualify us
 * without a sales call. Every figure here is also published on the site.
 */
export function GET(): Response {
  const body = `# Pricing and commercial terms — Watu Care

Last updated: ${CONTENT_UPDATED}

Watu Care is a Hong Kong-headquartered B2B medical wholesaler. We source from
certified Asian manufacturers and supply healthcare providers across Africa and
the Middle East. We do not manufacture and we do not sell to consumers.

## How pricing works

Pricing is quote-based and not published. Unit price depends on order volume,
product mix and freight route, so a published list price would be wrong for
almost every buyer. There is no subscription, no account fee and no minimum
annual commitment.

Every quotation states:

- Price per unit and total per line, in USD
- Sea freight and air freight costed separately, so cost can be traded against speed
- Lead time for the quoted route
- Payment terms and instrument
- Validity period of the quotation

## Quote turnaround

- Response time: ${QUOTE_RESPONSE} business hours from request
- Request by email (${CONTACT_EMAIL}), phone (${SALES_PHONE_DISPLAY}) or the quote
  form at ${BASE_URL}/en/contact
- Useful in a request: product lines, quantities, delivery city and country, target date

## Minimum order quantity

MOQ is set per product line, not per country or per order. For consumables it
starts at roughly one full carton. Lines can be combined across categories to
reach a shippable pallet or container volume, so a mixed order of small
quantities is usually workable.

## Lead times

| Route | Transit time |
| ----- | ------------ |
| Sea freight | approximately 30–50 days |
| Air freight | approximately 6–9 days |

Transit time is measured from order confirmation and excludes customs clearance
at destination.

## Payment

- Bank transfer (T/T)
- Letter of credit (L/C)

L/C is common for first orders and larger volumes; T/T is faster once a trading
relationship exists. Terms are confirmed in writing on the proforma invoice
before production starts.

## Quality and documentation

- Manufacturers certified to ${MANUFACTURER_STANDARD}
- Supplied product lines carry CE marking
- Test reports, certificates of analysis and batch traceability ship with every order

## Catalogue and coverage

- ${PRODUCT_LINES} referenced product lines across ${PRODUCT_CATEGORIES} categories
- ${COUNTRIES_SERVED} countries served across Africa and the Middle East; quotations worldwide on request
- Buyers served: hospitals, clinics, NGOs, pharmacies, government procurement bodies

## Related machine-readable files

- ${BASE_URL}/llms.txt — company overview and key pages
- ${BASE_URL}/llms-full.txt — full catalogue with descriptions and specifications
- ${BASE_URL}/sitemap.xml
`;

  return new Response(body, {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  });
}
