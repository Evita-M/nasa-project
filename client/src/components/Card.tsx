import { cn } from '@/lib/utils';
import { ComponentProps } from 'react';

interface CardProps extends ComponentProps<'div'> {}

export const Card = ({ className, ...props }: CardProps) => {
  return (
    <div
      className={cn('bg-glassmorphism', 'p-6', 'w-full', className)}
      {...props}
    >
      <div className="flex flex-col gap-6 h-full">{props.children}</div>
    </div>
  );
};
