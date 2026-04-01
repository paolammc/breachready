import { useBreachReadyStore } from '../../store/useBreachReadyStore';
import { XPBadge } from '../shared/XPBadge';
import { StreakCounter } from '../shared/StreakCounter';
import { Menu } from 'lucide-react';
import { useState } from 'react';
import { MobileMenu } from './MobileMenu';

export function TopBar() {
  const { xp, streak } = useBreachReadyStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="flex items-center justify-between px-4 lg:px-8 py-4 bg-deep-navy border-b border-slate-gray/20">
        {/* Mobile Logo & Menu */}
        <div className="flex items-center gap-4 lg:hidden">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="text-pale-gray p-2 hover:bg-pale-gray/10 rounded-lg"
            aria-label="Open menu"
          >
            <Menu size={24} />
          </button>
          <h1 className="font-display text-xl font-bold">
            <span className="text-pale-gray">BREACH</span>
            <span className="text-amber-gold">READY</span>
          </h1>
        </div>

        {/* Desktop: User name */}
        <div className="hidden lg:block">
          <p className="text-pale-gray font-body">
            Welcome back, <span className="font-semibold text-amber-gold">Paola</span>
          </p>
        </div>

        {/* Right side: Streak & XP */}
        <div className="flex items-center gap-4">
          <StreakCounter streak={streak.current} />
          <XPBadge xp={xp} />
        </div>
      </header>

      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </>
  );
}
