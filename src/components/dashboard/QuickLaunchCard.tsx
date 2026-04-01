import { Link } from 'react-router-dom';
import type { LucideIcon } from 'lucide-react';
import { ChevronRight } from 'lucide-react';

interface QuickLaunchCardProps {
  to: string;
  icon: LucideIcon;
  title: string;
  description: string;
  lastScore?: number;
  accentColor: 'amber' | 'green' | 'crimson' | 'blue';
}

const colorClasses = {
  amber: {
    bg: 'bg-amber-gold/10',
    border: 'border-amber-gold/30 hover:border-amber-gold/50',
    icon: 'text-amber-gold',
    badge: 'bg-amber-gold/20 text-amber-gold',
  },
  green: {
    bg: 'bg-forest-green/10',
    border: 'border-forest-green/30 hover:border-forest-green/50',
    icon: 'text-forest-green',
    badge: 'bg-forest-green/20 text-forest-green',
  },
  crimson: {
    bg: 'bg-crimson/10',
    border: 'border-crimson/30 hover:border-crimson/50',
    icon: 'text-crimson',
    badge: 'bg-crimson/20 text-crimson',
  },
  blue: {
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/30 hover:border-blue-500/50',
    icon: 'text-blue-400',
    badge: 'bg-blue-500/20 text-blue-400',
  },
};

export function QuickLaunchCard({
  to,
  icon: Icon,
  title,
  description,
  lastScore,
  accentColor,
}: QuickLaunchCardProps) {
  const colors = colorClasses[accentColor];

  return (
    <Link
      to={to}
      className={`block p-6 rounded-xl border ${colors.border} ${colors.bg} transition-all hover:scale-[1.02]`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-lg ${colors.bg}`}>
          <Icon size={24} className={colors.icon} />
        </div>
        {lastScore !== undefined && (
          <span className={`px-2 py-1 rounded-full text-xs font-ui font-medium ${colors.badge}`}>
            {lastScore}%
          </span>
        )}
      </div>

      <h3 className="font-display text-lg font-bold text-pale-gray mb-1">{title}</h3>
      <p className="font-body text-sm text-slate-gray mb-4">{description}</p>

      <div className="flex items-center gap-1 text-sm font-ui font-medium text-amber-gold">
        <span>Resume</span>
        <ChevronRight size={16} />
      </div>
    </Link>
  );
}
