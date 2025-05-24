import { cn } from '@/lib/utils';
import { ComponentProps, FC } from 'react';

interface CardProps extends ComponentProps<'div'> {}

export const Card: FC<CardProps> = ({ className, ...props }) => {
  return (
    <div
      className={cn('bg-glassmorphism', 'p-6', 'w-full', className)}
      {...props}
    >
      <div className="flex flex-col gap-2">{props.children}</div>
    </div>
  );
};
