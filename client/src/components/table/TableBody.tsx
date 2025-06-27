import { cn } from '@/lib/utils';
import { ComponentProps } from 'react';

export const TableBody = ({ className, ...props }: ComponentProps<'tbody'>) => (
  <tbody
    data-slot="table-body"
    className={cn('[&_tr:last-child]:border-0', className)}
    {...props}
  />
);
