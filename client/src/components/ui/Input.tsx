import * as React from 'react';
import { cn } from '@/lib/utils';
import { Info } from 'lucide-react';

interface InputProps extends React.ComponentProps<'input'> {
  error?: React.ReactNode;
}

function Input({ className, type = 'text', error, ...props }: InputProps) {
  return (
    <div className="relative h-17">
      <input
        type={type}
        className={cn(
          'rounded border px-3 py-2 text-white h-11 bg-white/10 hover:bg-white/20 transition-colors focus-visible:border-yellow-500 outline-none',
          className,
          error ? 'border-[var(--error)]' : ''
        )}
        {...props}
      />
      {error && (
        <div className="flex items-center gap-1 text-sm text-[var(--error)] absolute bottom-0">
          <Info className="h-4 w-4" color="var(--error)" />
          {error}
        </div>
      )}
    </div>
  );
}

export { Input };
