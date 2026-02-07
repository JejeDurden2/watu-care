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
