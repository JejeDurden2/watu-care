import type { LucideIcon } from 'lucide-react';

export interface Product {
  id: string;
  name: string;
  description: string;
  specifications: string[];
  sizes?: string[];
  materials?: string[];
  image?: string;
}

export interface ProductCategory {
  id: string;
  icon: LucideIcon;
  title: string;
  slug: string;
  description: string;
  longDescription: string;
  color: string;
  image?: string;
  products: Product[];
}
