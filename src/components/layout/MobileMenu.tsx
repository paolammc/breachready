import { NavLink } from 'react-router-dom';
import { X, LayoutDashboard, Layers, Terminal, FlaskConical, BookOpen, BarChart3 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 z-50 lg:hidden"
          />

          {/* Menu Panel */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed left-0 top-0 bottom-0 w-72 bg-deep-navy z-50 lg:hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-gray/20">
              <div>
                <h1 className="font-display text-2xl font-bold">
                  <span className="text-pale-gray">BREACH</span>
                  <span className="text-amber-gold">READY</span>
                </h1>
                <p className="text-slate-gray text-sm font-body italic mt-1">
                  Know It. Type It. Pass It.
                </p>
              </div>
              <button
                onClick={onClose}
                className="text-slate-gray hover:text-pale-gray p-2"
                aria-label="Close menu"
              >
                <X size={24} />
              </button>
            </div>

            {/* Navigation */}
            <nav className="p-4">
              <ul className="space-y-2">
                {navItems.map(({ to, icon: Icon, label }) => (
                  <li key={to}>
                    <NavLink
                      to={to}
                      onClick={onClose}
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
            <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-gray/20">
              <p className="text-slate-gray/60 text-xs font-ui text-center">
                CompTIA Security+ SY0-701
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
