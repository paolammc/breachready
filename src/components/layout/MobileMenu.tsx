import { NavLink } from 'react-router-dom';
import { X, LayoutDashboard, Layers, Terminal, FlaskConical, BookOpen, BarChart3 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Logo } from '../shared/Logo';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const navItems = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/flashcards', icon: Layers, label: 'Flashcards' },
  { to: '/console', icon: Terminal, label: 'Terminal' },
  { to: '/pbq', icon: FlaskConical, label: 'PBQ Lab' },
  { to: '/glossary', icon: BookOpen, label: 'Glossary' },
  { to: '/progress', icon: BarChart3, label: 'Progress' },
];

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 z-50 lg:hidden"
          />

          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed left-0 top-0 bottom-0 w-72 bg-brand-primary z-50 lg:hidden"
          >
            <div className="flex items-center justify-between p-5 border-b border-white/10">
              <div>
                <Logo variant="full" />
                <p className="subtitle mt-2 text-white/50">
                  Know It. Type It. Pass It.
                </p>
              </div>
              <button
                onClick={onClose}
                className="text-white/60 hover:text-white p-2"
                aria-label="Close menu"
              >
                <X size={22} />
              </button>
            </div>

            <nav className="p-3">
              <ul className="space-y-1">
                {navItems.map(({ to, icon: Icon, label }) => (
                  <li key={to}>
                    <NavLink
                      to={to}
                      onClick={onClose}
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

            <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10">
              <p className="caption text-center text-white/40">
                CompTIA Security+ SY0-701
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
