import { Zap } from 'lucide-react';
import type { XPLevel } from '../../types';

interface XPBadgeProps {
  xp: number;
  showLevel?: boolean;
}

const getXPLevel = (xp: number): { level: XPLevel; color: string; bgColor: string } => {
  if (xp >= 15000) return { level: 'BreachReady', color: 'text-crimson', bgColor: 'bg-crimson/20' };
  if (xp >= 8000) return { level: 'Vanguard', color: 'text-amber-gold', bgColor: 'bg-amber-gold/20' };
  if (xp >= 4000) return { level: 'Sentinel', color: 'text-purple-400', bgColor: 'bg-purple-400/20' };
  if (xp >= 1500) return { level: 'Defender', color: 'text-forest-green', bgColor: 'bg-forest-green/20' };
  if (xp >= 500) return { level: 'Analyst', color: 'text-blue-400', bgColor: 'bg-blue-400/20' };
  return { level: 'Cadet', color: 'text-slate-gray', bgColor: 'bg-slate-gray/20' };
};

export function XPBadge({ xp, showLevel = false }: XPBadgeProps) {
  const { level, color, bgColor } = getXPLevel(xp);

  return (
    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${bgColor}`}>
      <Zap size={16} className={color} fill="currentColor" />
      <span className={`font-ui font-semibold text-sm ${color}`}>
        {xp.toLocaleString()} XP
      </span>
      {showLevel && (
        <span className={`text-xs font-ui ${color} opacity-80`}>
          ({level})
        </span>
      )}
    </div>
  );
}
