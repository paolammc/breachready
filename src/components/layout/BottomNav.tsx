import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Layers,
  Terminal,
  FlaskConical,
  BookOpen,
} from 'lucide-react';

const navItems = [
  { to: '/app', icon: LayoutDashboard, label: 'Home' },
  { to: '/app/flashcards', icon: Layers, label: 'Cards' },
  { to: '/app/console', icon: Terminal, label: 'Console' },
  { to: '/app/pbq', icon: FlaskConical, label: 'PBQ' },
  { to: '/app/glossary', icon: BookOpen, label: 'Glossary' },
];

export function BottomNav() {
  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-surface-elevated/90 backdrop-blur-md border-t border-border z-50">
      <ul className="flex justify-around items-center h-16">
        {navItems.map(({ to, icon: Icon, label }) => (
          <li key={to}>
            <NavLink
              to={to}
              end={to === '/app'}
              className={({ isActive }) =>
                `flex flex-col items-center gap-1 px-3 py-2 font-body text-xs transition-colors ${
                  isActive
                    ? 'text-brand-secondary'
                    : 'text-foreground-muted hover:text-foreground'
                }`
              }
            >
              <Icon size={20} />
              <span>{label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
