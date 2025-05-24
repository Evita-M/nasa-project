import { Link, useLocation } from 'react-router-dom';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { FC } from 'react';

interface NavLinkProps {
  label: string;
  icon: LucideIcon;
  to: string;
  className?: string;
  count?: number;
}

const baseStyles =
  'rounded-md border border-white/10 bg-white/5 transition-all duration-200 hover:bg-slate-950/15 hover:border-white/20';
const flexStyles =
  'group flex items-center gap-2 px-4  py-2 text-sm tracking-wider transition-colors duration-200 justify-center';
const focusStyles =
  'rounded-md focus-visible:ring-2 focus-visible:ring-yellow-400/60 focus-visible:outline-none';

export const NavLink: FC<NavLinkProps> = ({
  label,
  icon: Icon,
  to,
  className,
  count,
}) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={cn(
        baseStyles,
        flexStyles,
        focusStyles,
        isActive &&
          'border-yellow-600 hover:bg-slate-950/20 hover:border-yellow-600/80',
        className
      )}
      aria-current={isActive ? 'page' : undefined}
      aria-label={label}
    >
      <Icon className="h-5 w-5" aria-hidden="true" />
      <span>{label}</span>
      {typeof count === 'number' && count > 0 && (
        <span className="ml-1 inline-flex items-center justify-center rounded-full bg-yellow-400 text-xs text-black font-bold px-2 w-5 h-5">
          {count}
        </span>
      )}
    </Link>
  );
};
