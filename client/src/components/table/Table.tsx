import { cn } from '@/lib/utils';
import { ComponentProps } from 'react';

export const Table = ({ className, ...props }: ComponentProps<'table'>) => (
  <div data-slot="table-container" className="relative w-full overflow-x-auto">
    <table
      data-slot="table"
      className={cn('w-full caption-bottom text-sm', className)}
      {...props}
    />
  </div>
);
