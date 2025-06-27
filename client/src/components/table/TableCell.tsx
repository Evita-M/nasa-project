import { cn } from '@/lib/utils';
import { ComponentProps } from 'react';

export const TableCell = ({ className, ...props }: ComponentProps<'td'>) => (
  <td
    data-slot="table-cell"
    className={cn(
      'p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]',
      className
    )}
    {...props}
  />
);
