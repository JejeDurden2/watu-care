export interface Product {
  id: string;
  name: string;
  description: string;
  specifications: string[];
  sizes?: string[];
  materials?: string[];
  image?: string;
  images?: string[];
}

export interface ProductCategory {
  id: string;
  iconSlug: string;
  title: string;
  slug: string;
  description: string;
  longDescription: string;
  color: string;
  image?: string;
  products: Product[];
}
