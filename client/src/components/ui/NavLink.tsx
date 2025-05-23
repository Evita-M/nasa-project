import { Link, useLocation } from 'react-router-dom';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavLinkProps {
  label: string;
  icon: LucideIcon;
  to: string;
  className?: string;
}

export const NavLink = ({ label, icon: Icon, to, className }: NavLinkProps) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={cn(
        'rounded-lg border border-white/10 bg-white/5 px-4 py-2 transition-all duration-200 hover:bg-white/10',
        'group flex items-center gap-2 px-3 py-2 text-sm tracking-wider transition-colors duration-200',
        'text-gray-600 hover:text-gray-900',
        'rounded-lg border border-white/10 bg-white/5 px-4 py-2 transition-all duration-200 hover:bg-white/10 dark:text-gray-400 dark:hover:text-gray-200',
        isActive && 'text-primary dark:text-tertiary',
        'rounded-md focus-visible:ring-2 focus-visible:ring-cyan-400/60 focus-visible:outline-none',
        className
      )}
      aria-current={isActive ? 'page' : undefined}
    >
      <Icon className="h-5 w-5" />
      <span>{label}</span>
    </Link>
  );
};
