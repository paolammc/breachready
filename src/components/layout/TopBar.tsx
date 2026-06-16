import { useBreachReadyStore } from '../../store/useBreachReadyStore';
import { XPBadge, StreakCounter, ThemeToggle } from '../shared';
import { Menu } from 'lucide-react';
import { useState } from 'react';
import { MobileMenu } from './MobileMenu';
import { Logo } from '../shared/Logo';

export function TopBar() {
  const { xp, streak } = useBreachReadyStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="flex items-center justify-between px-4 lg:px-8 py-3 bg-surface-elevated/80 backdrop-blur-md border-b border-border sticky top-0 z-40">
        <div className="flex items-center gap-3 lg:hidden">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="text-foreground-muted p-2 hover:bg-surface-muted rounded-lg transition-colors"
            aria-label="Open menu"
          >
            <Menu size={22} />
          </button>
          <Logo variant="icon" />
        </div>

        <div className="hidden lg:block">
          <p className="subtitle">
            Welcome back, <span className="font-semibold text-brand-secondary">Paola</span>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <StreakCounter streak={streak.current} />
          <XPBadge xp={xp} />
        </div>
      </header>

      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </>
  );
}
