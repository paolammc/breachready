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
        <h1 className="font-display text-3xl font-bold text-pale-gray mb-2">
          Your Progress
        </h1>
        <p className="text-slate-gray font-body max-w-md mb-6">
          Track your journey to becoming Security+ certified.
        </p>

        <div className="flex items-center gap-4">
          <XPBadge xp={xp} showLevel />
          <div className="bg-amber-gold/20 px-4 py-2 rounded-full">
            <span className="text-amber-gold font-ui font-semibold">
              {streak.current} day streak
            </span>
          </div>
        </div>
      </div>

      <div className="bg-pale-gray/5 rounded-xl p-6 border border-slate-gray/20">
        <p className="text-slate-gray font-body text-center">
          Detailed progress analytics coming soon.
        </p>
      </div>
    </div>
  );
}
