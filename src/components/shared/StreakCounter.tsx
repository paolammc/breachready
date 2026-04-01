import { Flame } from 'lucide-react';

interface StreakCounterProps {
  streak: number;
}

export function StreakCounter({ streak }: StreakCounterProps) {
  const isActive = streak > 0;

  return (
    <div
      className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${
        isActive ? 'bg-amber-gold/20' : 'bg-slate-gray/20'
      }`}
    >
      <Flame
        size={16}
        className={isActive ? 'text-amber-gold' : 'text-slate-gray'}
        fill={isActive ? 'currentColor' : 'none'}
      />
      <span
        className={`font-ui font-semibold text-sm ${
          isActive ? 'text-amber-gold' : 'text-slate-gray'
        }`}
      >
        {streak}
      </span>
    </div>
  );
}
