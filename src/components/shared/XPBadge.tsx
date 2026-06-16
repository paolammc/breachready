import { Zap } from 'lucide-react';
import type { XPLevel } from '../../types';

interface XPBadgeProps {
  xp: number;
  showLevel?: boolean;
}

const getXPLevel = (xp: number): { level: XPLevel; color: string; bgColor: string } => {
  if (xp >= 15000) return { level: 'BreachReady', color: 'text-brand-accent', bgColor: 'bg-brand-accent/15' };
  if (xp >= 8000) return { level: 'Vanguard', color: 'text-brand-warning', bgColor: 'bg-brand-warning/15' };
  if (xp >= 4000) return { level: 'Sentinel', color: 'text-purple-400', bgColor: 'bg-purple-400/15' };
  if (xp >= 1500) return { level: 'Defender', color: 'text-brand-secondary', bgColor: 'bg-brand-secondary/15' };
  if (xp >= 500) return { level: 'Analyst', color: 'text-brand-accent', bgColor: 'bg-brand-accent/15' };
  return { level: 'Cadet', color: 'text-foreground-muted', bgColor: 'bg-surface-muted' };
};

export function XPBadge({ xp, showLevel = false }: XPBadgeProps) {
  const { level, color, bgColor } = getXPLevel(xp);

  return (
    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border border-border ${bgColor}`}>
      <Zap size={16} className={color} fill="currentColor" />
      <span className={`font-body font-semibold text-sm ${color}`}>
        {xp.toLocaleString()} XP
      </span>
      {showLevel && (
        <span className={`text-xs font-body ${color} opacity-80`}>
          ({level})
        </span>
      )}
    </div>
  );
}
