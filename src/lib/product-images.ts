/**
 * Utility functions for product images
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
 * Generate gradient background as fallback
 */
export function getCategoryGradient(categorySlug: string): string {
  const gradients: Record<string, string> = {
    gloves: 'from-accent to-accent/80',
    'infection-prevention-ppe': 'from-primary to-primary/80',
    'bodily-waste-management': 'from-secondary to-secondary/80',
    surgical: 'from-primary to-accent',
    'wound-care': 'from-accent to-primary',
    'clinical-consumables': 'from-primary/90 to-primary',
    'vascular-access-catheters': 'from-primary to-secondary',
    'airway-respiratory': 'from-accent/90 to-accent',
    'surgical-instruments-sutures': 'from-secondary to-primary',
    'patient-care-equipment': 'from-primary to-accent/80',
  };

  return gradients[categorySlug] || 'from-primary to-accent';
}
