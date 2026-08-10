import type { MetadataRoute } from 'next';
import { BASE_URL } from '@/lib/constants';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // /suppliers and /for are 301'd to /markets and /solutions. Blocking
        // them here stopped crawlers from ever following those redirects, so
        // the equity of the old URLs was thrown away instead of forwarded.
        disallow: ['/api/', '/_next/'],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
