import { Flame } from 'lucide-react';

interface StreakCounterProps {
  streak: number;
}

export function StreakCounter({ streak }: StreakCounterProps) {
  const isActive = streak > 0;

  return (
    <div
      className={`flex items-center gap-2 px-3 py-1.5 rounded-full border border-border ${
        isActive ? 'bg-brand-warning/15' : 'bg-surface-muted'
      }`}
    >
      <Flame
        size={16}
        className={isActive ? 'text-brand-warning' : 'text-foreground-muted'}
        fill={isActive ? 'currentColor' : 'none'}
      />
      <span
        className={`font-body font-semibold text-sm ${
          isActive ? 'text-brand-warning' : 'text-foreground-muted'
        }`}
      >
        {streak}
      </span>
    </div>
  );
}
