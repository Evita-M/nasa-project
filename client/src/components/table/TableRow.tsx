import { cn } from '@/lib/utils';
import { ComponentProps } from 'react';

export const TableRow = ({ className, ...props }: ComponentProps<'tr'>) => (
  <tr
    data-slot="table-row"
    className={cn(
      'hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors',
      className
    )}
    {...props}
  />
);
