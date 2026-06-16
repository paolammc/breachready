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
    bg: 'bg-brand-warning/10',
    border: 'border-brand-warning/30 hover:border-brand-warning/50',
    icon: 'text-brand-warning',
    badge: 'bg-brand-warning/20 text-brand-warning',
  },
  green: {
    bg: 'bg-brand-accent/10',
    border: 'border-brand-accent/30 hover:border-brand-accent/50',
    icon: 'text-brand-accent',
    badge: 'bg-brand-accent/20 text-brand-accent',
  },
  crimson: {
    bg: 'bg-red-500/10',
    border: 'border-red-500/30 hover:border-red-500/50',
    icon: 'text-red-500',
    badge: 'bg-red-500/20 text-red-500',
  },
  blue: {
    bg: 'bg-brand-secondary/10',
    border: 'border-brand-secondary/30 hover:border-brand-secondary/50',
    icon: 'text-brand-secondary',
    badge: 'bg-brand-secondary/20 text-brand-secondary',
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
      className={`block p-6 rounded-xl border ${colors.border} ${colors.bg} shadow-tech transition-all hover:scale-[1.02] hover:shadow-tech-lg`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-lg ${colors.bg}`}>
          <Icon size={24} className={colors.icon} />
        </div>
        {lastScore !== undefined && (
          <span className={`px-2 py-1 rounded-full text-xs font-body font-medium ${colors.badge}`}>
            {lastScore}%
          </span>
        )}
      </div>

      <h3 className="font-heading text-lg font-bold text-foreground mb-1">{title}</h3>
      <p className="font-body text-sm text-foreground-muted mb-4">{description}</p>

      <div className={`flex items-center gap-1 text-sm font-body font-medium ${colors.icon}`}>
        <span>Resume</span>
        <ChevronRight size={16} />
      </div>
    </Link>
  );
}
