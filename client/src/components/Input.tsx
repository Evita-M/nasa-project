import { cn } from '@/lib/utils';
import { ComponentProps, FC } from 'react';
import { ErrorMessage } from './ErrorMessage';

interface InputProps extends ComponentProps<'input'> {
  error?: string;
}

export const Input: FC<InputProps> = ({
  className,
  type = 'text',
  error,
  ...props
}) => (
  <div className="relative h-17">
    <input
      type={type}
      autoComplete="off"
      className={cn(
        'rounded border px-3 py-2 text-white h-11 bg-slate-900 hover:bg-slate-950/40 transition-colors border-white/30 focus:border-yellow-500 outline-none',
        'focus:bg-slate-950/60',
        className,
        error ? 'border-[var(--error)] focus:border-red-400' : ''
      )}
      {...props}
    />
    {error && <ErrorMessage message={error} />}
  </div>
);
