/**
 * Utility functions for product images
 * Uses Picsum Photos API as temporary solution
 */

import {
  Package,
  Activity,
  Syringe,
  Bandage,
  Hand,
  ShieldCheck,
  Recycle,
  Wind,
  Scissors,
  Stethoscope,
  type LucideIcon,
} from 'lucide-react';

/**
 * Map category slug to Lucide icon component
 * Use this in Client Components to render icons from serialized category data
 */
export const categoryIconMap: Record<string, LucideIcon> = {
  gloves: Hand,
  'infection-prevention-ppe': ShieldCheck,
  'bodily-waste-management': Recycle,
  surgical: Package,
  'wound-care': Bandage,
  'clinical-consumables': Syringe,
  'vascular-access-catheters': Activity,
  'airway-respiratory': Wind,
  'surgical-instruments-sutures': Scissors,
  'patient-care-equipment': Stethoscope,
};

/**
 * Get icon component from slug (with fallback)
 */
export function getCategoryIcon(slug: string): LucideIcon {
  return categoryIconMap[slug] ?? Package;
}

/**
 * Generate Picsum Photos URL based on keywords
 * Uses seeded URLs for consistent images per keyword set
 * Format: https://picsum.photos/seed/SEED/WIDTH/HEIGHT
 */
export function getPlaceholderImage(
  keywords: string[],
  width = 800,
  height = 600,
): string {
  const seed = keywords.join('-');
  return `https://picsum.photos/seed/${seed}/${width}/${height}`;
}

/**
 * @deprecated Use getPlaceholderImage instead
 */
export const getUnsplashImage = getPlaceholderImage;

/**
 * Get image URL for a category
 */
export function getCategoryImageUrl(categorySlug: string): string {
  const categoryKeywords: Record<string, string[]> = {
    gloves: ['medical', 'gloves', 'ppe', 'healthcare'],
    'infection-prevention-ppe': ['mask', 'medical', 'ppe', 'protection'],
    'bodily-waste-management': ['medical', 'hospital', 'healthcare', 'supplies'],
    surgical: ['surgical', 'medical', 'sterile', 'drapes'],
    'wound-care': ['bandage', 'wound', 'medical', 'dressing'],
    'clinical-consumables': ['syringe', 'medical', 'clinical', 'supplies'],
    'vascular-access-catheters': ['iv', 'catheter', 'medical', 'infusion'],
    'airway-respiratory': ['medical', 'tube', 'oxygen', 'respiratory'],
    'surgical-instruments-sutures': ['surgical', 'instruments', 'suture', 'blade'],
    'patient-care-equipment': ['medical', 'equipment', 'stethoscope', 'hospital'],
  };

  const keywords = categoryKeywords[categorySlug] || ['medical', 'healthcare'];
  return getPlaceholderImage(keywords, 1200, 800);
}

/**
 * Get image URL for a product based on its category and name
 */
export function getProductImageUrl(
  categorySlug: string,
  productName: string,
): string {
  // Extract key terms from product name
  const nameLower = productName.toLowerCase();

  // Base keywords from category
  const baseKeywords: Record<string, string[]> = {
    gloves: ['gloves', 'medical'],
    'infection-prevention-ppe': ['ppe', 'medical'],
    'bodily-waste-management': ['medical', 'hospital'],
    surgical: ['surgical', 'sterile'],
    'wound-care': ['bandage', 'medical'],
    'clinical-consumables': ['syringe', 'medical'],
    'vascular-access-catheters': ['catheter', 'iv'],
    'airway-respiratory': ['medical', 'tube'],
    'surgical-instruments-sutures': ['surgical', 'instruments'],
    'patient-care-equipment': ['medical', 'equipment'],
  };

  // Add specific keywords based on product name
  const keywords = [...(baseKeywords[categorySlug] || ['medical'])];

  if (nameLower.includes('glove')) keywords.push('gloves');
  if (nameLower.includes('mask')) keywords.push('mask');
  if (nameLower.includes('surgical')) keywords.push('surgical');
  if (nameLower.includes('tube')) keywords.push('tube');
  if (nameLower.includes('catheter')) keywords.push('catheter');
  if (nameLower.includes('dressing') || nameLower.includes('bandage')) keywords.push('bandage');
  if (nameLower.includes('syringe')) keywords.push('syringe');
  if (nameLower.includes('suture')) keywords.push('suture');

  return getPlaceholderImage(keywords, 800, 600);
}

/**
 * Generate gradient background as fallback
 */
export function getCategoryGradient(categorySlug: string): string {
  const gradients: Record<string, string> = {
    gloves: 'from-emerald-500 to-emerald-700',
    'infection-prevention-ppe': 'from-blue-500 to-blue-700',
    'bodily-waste-management': 'from-slate-500 to-slate-700',
    surgical: 'from-blue-500 to-blue-700',
    'wound-care': 'from-teal-500 to-teal-700',
    'clinical-consumables': 'from-violet-500 to-violet-700',
    'vascular-access-catheters': 'from-indigo-500 to-indigo-700',
    'airway-respiratory': 'from-cyan-500 to-cyan-700',
    'surgical-instruments-sutures': 'from-rose-500 to-rose-700',
    'patient-care-equipment': 'from-sky-500 to-sky-700',
  };

  return gradients[categorySlug] || 'from-primary to-accent';
}
