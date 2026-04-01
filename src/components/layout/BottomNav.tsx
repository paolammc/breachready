import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Layers,
  Terminal,
  FlaskConical,
  BookOpen,
} from 'lucide-react';

const navItems = [
  { to: '/', icon: LayoutDashboard, label: 'Home' },
  { to: '/flashcards', icon: Layers, label: 'Cards' },
  { to: '/console', icon: Terminal, label: 'Console' },
  { to: '/pbq', icon: FlaskConical, label: 'PBQ' },
  { to: '/glossary', icon: BookOpen, label: 'Glossary' },
];

export function BottomNav() {
  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-deep-navy border-t border-slate-gray/20 z-50">
      <ul className="flex justify-around items-center h-16">
        {navItems.map(({ to, icon: Icon, label }) => (
          <li key={to}>
            <NavLink
              to={to}
              className={({ isActive }) =>
                `flex flex-col items-center gap-1 px-3 py-2 font-ui text-xs transition-colors ${
                  isActive
                    ? 'text-amber-gold'
                    : 'text-slate-gray hover:text-pale-gray'
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
