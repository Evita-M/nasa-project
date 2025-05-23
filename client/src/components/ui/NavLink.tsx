import { Link, useLocation } from 'react-router-dom';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavLinkProps {
  label: string;
  icon: LucideIcon;
  to: string;
  className?: string;
}

const baseStyles =
  'rounded-lg border border-white/10 bg-white/5 transition-all duration-200 hover:bg-white/10';
const flexStyles =
  'group flex items-center gap-2 px-5 py-2 min-w-[120px] text-sm tracking-wider transition-colors duration-200 justify-center';
const textStyles = 'text-gray-600 hover:text-gray-900';
const focusStyles =
  'rounded-md focus-visible:ring-2 focus-visible:ring-yellow-400/60 focus-visible:outline-none';

export const NavLink = ({ label, icon: Icon, to, className }: NavLinkProps) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={cn(
        baseStyles,
        flexStyles,
        textStyles,
        focusStyles,
        isActive && 'border-yellow-600/80',
        className
      )}
      aria-current={isActive ? 'page' : undefined}
      aria-label={label}
    >
      <Icon className="h-5 w-5" aria-hidden="true" />
      <span>{label}</span>
    </Link>
  );
};
