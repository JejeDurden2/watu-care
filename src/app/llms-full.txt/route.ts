import { getAllCategories } from '@/lib/products';
import { BASE_URL, CONTENT_UPDATED } from '@/lib/constants';

export const dynamic = 'force-static';

/**
 * The whole catalogue as plain text, one block per product.
 *
 * llms.txt is the index; this is the body. Everything here is already rendered
 * on the product pages — it is republished in one flat, extractable file so an
 * answer engine can read the catalogue without crawling 82 pages.
 */
export function GET(): Response {
  const en = `${BASE_URL}/en`;

  const catalogue = getAllCategories()
    .map((category) => {
      const products = category.products
        .map((product) => {
          const lines = [
            `### ${product.name}`,
            '',
            product.description,
            '',
            `URL: ${en}/products/${category.slug}/${product.id}`,
          ];
          if (product.sizes?.length) {
            lines.push(`Sizes: ${product.sizes.join(', ')}`);
          }
          if (product.materials?.length) {
            lines.push(`Materials: ${product.materials.join(', ')}`);
          }
          if (product.specifications?.length) {
            lines.push('', 'Specifications:');
            lines.push(...product.specifications.map((spec) => `- ${spec}`));
          }
          return lines.join('\n');
        })
        .join('\n\n');

      return [
        `## ${category.title}`,
        '',
        category.longDescription,
        '',
        `URL: ${en}/products/${category.slug}`,
        `Product lines: ${category.products.length}`,
        '',
        products,
      ].join('\n');
    })
    .join('\n\n');

  const body = `# Watu Care — full product catalogue

> B2B medical devices and PPE wholesale. Sourced from ISO 13485-certified
> manufacturers in Asia, delivered to healthcare providers across Africa and
> the Middle East. Pricing is quote-based: send a list of products, quantities
> and a destination to receive unit pricing, freight options and a delivery
> window within 48 business hours.

Last updated: ${CONTENT_UPDATED}
Index: ${BASE_URL}/llms.txt

${catalogue}
`;

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
