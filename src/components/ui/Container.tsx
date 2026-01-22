import { cn } from '@/lib/utils';
import { type HTMLAttributes } from 'react';

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  as?: 'div' | 'section' | 'article' | 'main';
}

export function Container({
  as: Component = 'div',
  className,
  children,
  ...props
}: ContainerProps): React.ReactElement {
  return (
    <Component
      className={cn('mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8', className)}
      {...props}
    >
      {children}
    </Component>
  );
}
