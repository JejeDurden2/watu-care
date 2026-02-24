import type { ReactNode } from 'react';

interface ProductGridProps {
  children: ReactNode;
  className?: string;
}

export function ProductGrid({
  children,
  className = '',
}: ProductGridProps): React.ReactElement {
  return (
    <div
      className={`grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-[repeat(auto-fill,minmax(300px,1fr))] ${className}`}
    >
      {children}
    </div>
  );
}
