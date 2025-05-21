import { CheckCircle, History, RefreshCw } from 'lucide-react';
import { NavLink } from './ui/NavLink';
import { Logo } from './ui/Logo';

const navItems = [
  { label: 'Launch', icon: CheckCircle, to: '/launch' },
  { label: 'Upcoming', icon: RefreshCw, to: '/upcoming' },
  { label: 'History', icon: History, to: '/history' },
];

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="container mx-auto flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <img
            src="/img/nasa-logo.svg"
            alt="NASA Logo"
            className="h-12 w-12 drop-shadow-[0_0_12px_rgba(0,255,247,0.4)] transition-all duration-300 hover:drop-shadow-[0_0_16px_rgba(0,255,247,0.6)]"
          />
          <Logo name="NASA Mission Frontier" />
        </div>
        <nav className="flex items-center gap-2">
          {navItems.map(({ label, icon: Icon, to }) => (
            <NavLink key={label} label={label} icon={Icon} to={to} />
          ))}
        </nav>
      </div>
    </header>
  );
};
