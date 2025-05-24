import { CheckCircle, History, RefreshCw } from 'lucide-react';
import { NavLink } from '@/components/NavLink';
import { Logo } from '@/components/Logo';

const navItems = [
  { label: 'Launch', icon: CheckCircle, to: '/launch' },
  { label: 'Upcoming', icon: RefreshCw, to: '/upcoming' },
  { label: 'History', icon: History, to: '/history' },
];

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full flex items-center justify-between py-4">
      <div className="flex items-center gap-4 drop-shadow-[0_0_12px_rgba(0,255,247,0.4)]">
        <img src="/img/nasa-logo.svg" alt="NASA Logo" />
        <Logo name="NASA Mission Frontier" />
      </div>
      <nav className="flex items-center gap-4">
        {navItems.map(({ label, icon: Icon, to }) => (
          <NavLink key={label} label={label} icon={Icon} to={to} />
        ))}
      </nav>
    </header>
  );
};
