import { CheckCircle2 } from 'lucide-react';

interface ProductSpecsProps {
  specifications: string[];
  sizes?: string[];
  materials?: string[];
  className?: string;
}

export function ProductSpecs({
  specifications,
  sizes,
  materials,
  className = '',
}: ProductSpecsProps): React.ReactElement {
  return (
    <div className={`space-y-6 ${className}`}>
      {/* Specifications */}
      <div>
        <h3 className="mb-4 text-lg font-semibold text-secondary">
          Specifications
        </h3>
        <ul className="space-y-2">
          {specifications.map((spec, index) => (
            <li key={index} className="flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
              <span className="text-foreground/80">{spec}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Sizes */}
      {sizes && sizes.length > 0 && (
        <div>
          <h3 className="mb-4 text-lg font-semibold text-secondary">
            Available Sizes
          </h3>
          <div className="flex flex-wrap gap-2">
            {sizes.map((size, index) => (
              <span
                key={index}
                className="rounded-md bg-primary/10 px-3 py-1 text-sm font-medium text-primary"
              >
                {size}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Materials */}
      {materials && materials.length > 0 && (
        <div>
          <h3 className="mb-4 text-lg font-semibold text-secondary">
            Materials
          </h3>
          <ul className="space-y-2">
            {materials.map((material, index) => (
              <li key={index} className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-accent" />
                <span className="text-foreground/80">{material}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
