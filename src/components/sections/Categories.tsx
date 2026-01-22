import Link from 'next/link';
import {
  Package,
  Wind,
  Syringe,
  Bandage,
  FlaskConical,
  Dog,
  Stethoscope,
  Shield,
} from 'lucide-react';
import { Container } from '@/components/ui';

const categories = [
  {
    icon: Package,
    name: 'Procedure Packs & Drapes',
    description: 'Sterile kits for surgical procedures',
  },
  {
    icon: Wind,
    name: 'Tubes & Airway Management',
    description: 'Respiratory care solutions',
  },
  {
    icon: Syringe,
    name: 'Anti-Infection Central Venous Catheter',
    description: 'Infection-resistant IV access',
  },
  {
    icon: Bandage,
    name: 'Dressing & Kits',
    description: 'Wound care essentials',
  },
  {
    icon: FlaskConical,
    name: 'Laboratory Supplies',
    description: 'Diagnostic & lab equipment',
  },
  {
    icon: Dog,
    name: 'Veterinary Supplies',
    description: 'Animal healthcare products',
  },
  {
    icon: Stethoscope,
    name: 'Medical Equipment',
    description: 'Diagnostic instruments',
  },
  {
    icon: Shield,
    name: 'Gloves & Face Protection',
    description: 'Personal protective equipment',
  },
];

export function Categories(): React.ReactElement {
  return (
    <section id="products" className="bg-muted py-20 lg:py-28">
      <Container>
        {/* Header */}
        <div className="mx-auto mb-12 max-w-2xl text-center lg:mb-16">
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Our Product Categories
          </h2>
          <p className="text-lg text-muted-foreground">
            Comprehensive range of medical supplies sourced from Asia&apos;s leading
            manufacturers.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <Link
              key={category.name}
              href="#quote"
              className="group flex flex-col items-center rounded-xl border border-border bg-white p-6 text-center shadow-soft transition-all duration-200 hover:-translate-y-1 hover:shadow-soft-md"
            >
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary group-hover:text-white">
                <category.icon className="h-7 w-7 text-primary group-hover:text-white" />
              </div>
              <h3 className="mb-1 font-semibold text-secondary">{category.name}</h3>
              <p className="text-sm text-muted-foreground">{category.description}</p>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <p className="mt-10 text-center text-muted-foreground">
          Don&apos;t see what you need?{' '}
          <Link
            href="#quote"
            className="font-medium text-accent underline-offset-4 hover:underline"
          >
            Contact us for custom requests
          </Link>
        </p>
      </Container>
    </section>
  );
}
