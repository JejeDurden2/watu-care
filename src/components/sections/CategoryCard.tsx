'use client';

import { Link } from '@/i18n/routing';
import {
  Package,
  Activity,
  Syringe,
  Bandage,
  TestTube,
  Dog,
  Bed,
  Hand,
  ShieldCheck,
  Recycle,
  type LucideIcon,
} from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  surgical: Package,
  tube: Activity,
  'central-venous-catheter': Syringe,
  dressing: Bandage,
  'laboratory-supplies': TestTube,
  'veterinary-products': Dog,
  'medical-equipment': Bed,
  gloves: Hand,
  'face-protection': ShieldCheck,
  'bodily-waste-management': Recycle,
};

interface CategoryCardProps {
  slug: string;
  title: string;
  description: string;
}

export function CategoryCard({
  slug,
  title,
  description,
}: CategoryCardProps): React.ReactElement {
  const Icon = iconMap[slug] ?? Package;

  return (
    <Link
      href={`/products/${slug}`}
      className="group flex flex-col items-center rounded-xl border border-white/20 bg-white/70 p-6 text-center shadow-soft backdrop-blur-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-soft-md"
    >
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary group-hover:text-white">
        <Icon className="h-7 w-7 text-primary group-hover:text-white" />
      </div>
      <h3 className="mb-1 font-semibold text-secondary">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </Link>
  );
}
