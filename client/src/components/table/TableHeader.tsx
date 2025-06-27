import { cn } from '@/lib/utils';
import { ComponentProps } from 'react';

export const TableHeader = ({
  className,
  ...props
}: ComponentProps<'thead'>) => (
  <thead
    data-slot="table-header"
    className={cn('[&_tr]:border-b', className)}
    {...props}
  />
);
