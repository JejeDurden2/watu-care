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
      className={`grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 ${className}`}
    >
      {children}
    </div>
  );
}
