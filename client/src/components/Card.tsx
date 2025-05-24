import { cn } from '@/lib/utils';
import { ComponentProps, FC } from 'react';

export const Card: FC<ComponentProps<'div'>> = ({ className, ...props }) => {
  return (
    <div className={cn('bg-glassmorphism', 'p-4', className)} {...props}>
      {props.children}
    </div>
  );
};
