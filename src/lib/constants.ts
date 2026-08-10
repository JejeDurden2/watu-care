import { countries } from '@/data/countries';
import { productCategories } from '@/data/products';

export const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://watu-care.com';

/**
 * Public-facing claims.
 *
 * These used to be typed by hand into components and translation files, which
 * drifted: the hero and stats said "25+ countries", about and contact said
 * "30+", and the catalog actually listed 68. Anything we can count from the
 * data is now counted; anything we can't is declared once, here, with its
 * source, so a single edit updates every surface.
 */

/** Countries with a delivery footprint, counted from src/data/countries.ts. */
export const COUNTRIES_SERVED = countries.length;

/** Distinct product categories, counted from src/data/products.ts. */
export const PRODUCT_CATEGORIES = productCategories.length;

/**
 * Referenced SKUs. Not derivable — the site lists a curated subset of the
 * catalog. Update from the master price list.
 */
export const PRODUCT_LINES = '500+';

/** Units shipped to date. Update from the ERP export. */
export const UNITS_DELIVERED = '10M+';

/** Healthcare facilities supplied to date. Update from the CRM. */
export const FACILITIES_SUPPLIED = '100+';

/** Orders shipped to date. Update from the ERP export. */
export const ORDERS_DELIVERED = '10K+';

/** Business-hours SLA on a quote, as promised in the copy and the FAQ. */
export const QUOTE_RESPONSE = '48h';

/** Quality standard the sourced manufacturers are certified to. */
export const MANUFACTURER_STANDARD = 'ISO 13485';

/** Rendered form of {@link COUNTRIES_SERVED} for marketing surfaces. */
export const COUNTRIES_SERVED_LABEL = `${COUNTRIES_SERVED}+`;

/**
 * Date the catalogue and site content were last reviewed, ISO-8601.
 *
 * Published as `dateModified` in the structured data and at the top of
 * llms.txt: AI answer engines weight recency heavily, and the site carried no
 * freshness signal at all. Bump it whenever the catalogue or key pages change.
 */
export const CONTENT_UPDATED = '2026-08-10';

/** Single source for NAP data — it was duplicated across schema, footer and contact. */
export const CONTACT_EMAIL = 'contact@watu-care.com';

/**
 * Sales line, in E.164. It is a Moroccan number while the registered office is
 * in Hong Kong, so it is published on the sales ContactPoint only, never as the
 * Organization telephone sitting next to the Hong Kong postal address — that
 * pairing reads as an inconsistent NAP to search engines.
 */
export const SALES_PHONE = '+212662258045';
export const SALES_PHONE_DISPLAY = '+212 662 258 045';
export const WHATSAPP_URL = `https://wa.me/${SALES_PHONE.replace('+', '')}`;
