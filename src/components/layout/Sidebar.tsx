import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Layers,
  Terminal,
  FlaskConical,
  BookOpen,
  BarChart3,
} from 'lucide-react';
import { Logo } from '../shared/Logo';

const navItems = [
  { to: '/app', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/app/flashcards', icon: Layers, label: 'Flashcards' },
  { to: '/app/console', icon: Terminal, label: 'Terminal' },
  { to: '/app/pbq', icon: FlaskConical, label: 'PBQ Lab' },
  { to: '/app/glossary', icon: BookOpen, label: 'Glossary' },
  { to: '/app/progress', icon: BarChart3, label: 'Progress' },
];

export function Sidebar() {
  return (
    <aside className="hidden lg:flex flex-col w-60 bg-brand-primary border-r border-border/30 min-h-screen">
      <div className="p-5 border-b border-white/10">
        <Logo variant="full" />
        <p className="subtitle mt-2 text-white/50">
          Know It. Type It. Pass It.
        </p>
      </div>

      <nav className="flex-1 p-3">
        <ul className="space-y-1">
          {navItems.map(({ to, icon: Icon, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={to === '/app'}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-lg font-body text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-brand-secondary/20 text-brand-secondary border-l-2 border-brand-secondary'
                      : 'text-white/60 hover:bg-white/5 hover:text-white'
                  }`
                }
              >
                <Icon size={18} />
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t border-white/10">
        <p className="caption text-center text-white/40">
          CompTIA Security+ SY0-701
        </p>
      </div>
    </aside>
  );
}
