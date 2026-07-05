import { useBreachReadyStore } from '../../store/useBreachReadyStore';
import { useAuth } from '../../contexts/AuthContext';
import { XPBadge, StreakCounter, ThemeToggle } from '../shared';
import { LogOut, Menu } from 'lucide-react';
import { useState } from 'react';
import { MobileMenu } from './MobileMenu';
import { Logo } from '../shared/Logo';

export function TopBar() {
  const { xp, streak } = useBreachReadyStore();
  const { user, signOut } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const displayName =
    user?.user_metadata?.display_name ??
    user?.email?.split('@')[0] ??
    'Student';

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
            Welcome back, <span className="font-semibold text-brand-secondary">{displayName}</span>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <StreakCounter streak={streak.current} />
          <XPBadge xp={xp} />
          <button
            onClick={() => signOut()}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border text-foreground-muted hover:text-foreground hover:border-brand-secondary/30 transition-colors font-body text-sm"
            title="Sign out"
          >
            <LogOut size={16} />
            <span>Sign out</span>
          </button>
        </div>
      </header>

      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </>
  );
}
