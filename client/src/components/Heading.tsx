import { cn } from '@/lib/utils';
import { ComponentProps } from 'react';

interface HeadingProps extends ComponentProps<'div'> {
  title: string;
  subtitle: string;
}

export const Heading = ({ title, subtitle, className }: HeadingProps) => (
  <div className={cn('flex flex-col gap-2', className)}>
    <h1 className="text-2xl font-bold">{title}</h1>
    <p className="text-lg text-white/70">{subtitle}</p>
  </div>
);
