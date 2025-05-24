import { cn } from '@/lib/utils';
import { ComponentProps, FC } from 'react';

interface HeadingProps extends ComponentProps<'div'> {
  title: string;
  subtitle: string;
}

export const Heading: FC<HeadingProps> = ({ title, subtitle, className }) => {
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <h1 className="text-2xl font-bold">{title}</h1>
      <p className="text-lg text-white/70">{subtitle}</p>
    </div>
  );
};
