import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Layers,
  Terminal,
  FlaskConical,
  BookOpen,
  BarChart3,
} from 'lucide-react';

const navItems = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/flashcards', icon: Layers, label: 'Flashcards' },
  { to: '/console', icon: Terminal, label: 'Terminal' },
  { to: '/pbq', icon: FlaskConical, label: 'PBQ Lab' },
  { to: '/glossary', icon: BookOpen, label: 'Glossary' },
  { to: '/progress', icon: BarChart3, label: 'Progress' },
];

export function Sidebar() {
  return (
    <aside className="hidden lg:flex flex-col w-56 bg-deep-navy border-r border-slate-gray/20 min-h-screen">
      {/* Logo */}
      <div className="p-6 border-b border-slate-gray/20">
        <h1 className="font-display text-2xl font-bold">
          <span className="text-pale-gray">BREACH</span>
          <span className="text-amber-gold">READY</span>
        </h1>
        <p className="text-slate-gray text-sm font-body italic mt-1">
          Know It. Type It. Pass It.
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navItems.map(({ to, icon: Icon, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg font-ui text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-amber-gold/10 text-amber-gold border-l-4 border-amber-gold'
                      : 'text-slate-gray hover:bg-pale-gray/5 hover:text-pale-gray'
                  }`
                }
              >
                <Icon size={20} />
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-slate-gray/20">
        <p className="text-slate-gray/60 text-xs font-ui text-center">
          CompTIA Security+ SY0-701
        </p>
      </div>
    </aside>
  );
}
