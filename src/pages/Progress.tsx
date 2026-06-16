import { BarChart3 } from 'lucide-react';
import { useBreachReadyStore } from '../store/useBreachReadyStore';
import { XPBadge } from '../components/shared/XPBadge';

export function Progress() {
  const { xp, streak } = useBreachReadyStore();

  return (
    <div className="space-y-8">
      <div className="flex flex-col items-center justify-center text-center">
        <div className="p-4 bg-purple-500/20 rounded-2xl mb-4">
          <BarChart3 size={48} className="text-purple-400" />
        </div>
        <h1 className="font-heading text-3xl font-bold text-foreground mb-2">
          Your Progress
        </h1>
        <p className="text-foreground-muted font-body max-w-md mb-6">
          Track your journey to becoming Security+ certified.
        </p>

        <div className="flex items-center gap-4">
          <XPBadge xp={xp} showLevel />
          <div className="bg-brand-warning/20 px-4 py-2 rounded-full">
            <span className="text-brand-warning font-body font-semibold">
              {streak.current} day streak
            </span>
          </div>
        </div>
      </div>

      <div className="bg-surface-muted/50 rounded-xl p-6 border border-border/20">
        <p className="text-foreground-muted font-body text-center">
          Detailed progress analytics coming soon.
        </p>
      </div>
    </div>
  );
}
