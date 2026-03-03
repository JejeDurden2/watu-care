export interface Persona {
  slug: string;
  /** Lucide icon component name — resolved in the page via a static lookup map */
  icon: string;
  /** Tailwind classes for the icon badge background + text */
  color: string;
  /** Category slugs ordered by relevance for this persona */
  recommendedCategories: string[];
}

const PERSONAS: Persona[] = [
  {
    slug: 'hospitals',
    icon: 'Building2',
    color: 'bg-primary/10 text-primary',
    recommendedCategories: [
      'gloves',
      'infection-prevention-ppe',
      'surgical',
      'vascular-access-catheters',
      'airway-respiratory',
      'clinical-consumables',
    ],
  },
  {
    slug: 'clinics',
    icon: 'Stethoscope',
    color: 'bg-accent/10 text-accent',
    recommendedCategories: [
      'gloves',
      'clinical-consumables',
      'wound-care',
      'infection-prevention-ppe',
      'patient-care-equipment',
    ],
  },
  {
    slug: 'ngos',
    icon: 'Heart',
    color: 'bg-primary/10 text-primary',
    recommendedCategories: [
      'gloves',
      'infection-prevention-ppe',
      'wound-care',
      'clinical-consumables',
      'surgical',
    ],
  },
  {
    slug: 'pharmacies',
    icon: 'Pill',
    color: 'bg-accent/10 text-accent',
    recommendedCategories: [
      'clinical-consumables',
      'wound-care',
      'patient-care-equipment',
      'gloves',
    ],
  },
  {
    slug: 'government',
    icon: 'Landmark',
    color: 'bg-secondary/10 text-secondary',
    recommendedCategories: [
      'gloves',
      'infection-prevention-ppe',
      'surgical',
      'clinical-consumables',
      'airway-respiratory',
      'patient-care-equipment',
    ],
  },
];

export function getAllPersonas(): Persona[] {
  return PERSONAS;
}

export function getPersonaBySlug(slug: string): Persona | undefined {
  return PERSONAS.find((p) => p.slug === slug);
}

export function getPersonaSlugs(): string[] {
  return PERSONAS.map((p) => p.slug);
}
