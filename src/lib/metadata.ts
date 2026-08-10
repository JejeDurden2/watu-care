import { getTranslations } from 'next-intl/server';

/**
 * Title for a page whose params matched no content.
 *
 * These used to be hardcoded English strings inside generateMetadata, so a
 * French visitor hitting a bad URL got "Product Not Found" in the tab.
 */
export async function notFoundTitle(locale: string): Promise<string> {
  const t = await getTranslations({ locale, namespace: 'notFound' });
  return t('title');
}
