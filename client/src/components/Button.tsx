import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { ComponentProps } from 'react';

type ButtonVariant = 'ghost' | 'outlined' | 'contained';
type ButtonSize = 'default' | 'sm' | 'lg' | 'icon';

interface ButtonProps extends ComponentProps<'button'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  asChild?: boolean;
}

const buttonVariants = cva(
  "inline-flex font-medium items-center min-w-[160px] justify-center gap-2 whitespace-nowrap rounded-md text-sm transition-all cursor-pointer disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 aria-invalid:border-destructive backdrop-blur-sm transition-all duration-100",
  {
    variants: {
      variant: {
        ghost: 'hover:bg-white/10',
        outlined:
          'bg-black/40 border border-yellow-400 text-white shadow-lg hover:bg-slate-950 backdrop-blur-md',
        contained:
          'bg-yellow-300 text-gray-900 font-bold border border-white/40 shadow-lg px-8 py-3 hover:bg-yellow-400 ',
      },
      size: {
        default: 'h-9 px-4 py-2 has-[>svg]:px-3',
        sm: 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
        lg: 'h-10 rounded-md px-6 has-[>svg]:px-4',
        icon: 'size-9',
      },
    },
    defaultVariants: {
      variant: 'contained',
      size: 'default',
    },
  }
);

export const Button = ({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: ButtonProps) => {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
};
