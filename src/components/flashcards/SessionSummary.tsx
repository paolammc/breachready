import { Trophy, Target, Zap, RotateCcw, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

interface SessionSummaryProps {
  totalCards: number;
  correctCount: number;
  xpEarned: number;
  newMastered: number;
  onRestart: () => void;
}

export function SessionSummary({
  totalCards,
  correctCount,
  xpEarned,
  newMastered,
  onRestart,
}: SessionSummaryProps) {
  const percentage = Math.round((correctCount / totalCards) * 100);
  const isPerfect = percentage === 100;

  return (
    <div className="max-w-md mx-auto text-center space-y-6">
      {/* Trophy / Result Icon */}
      <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center ${
        isPerfect ? 'bg-brand-warning/20' : percentage >= 70 ? 'bg-brand-accent/20' : 'bg-red-500/20'
      }`}>
        <Trophy
          size={40}
          className={isPerfect ? 'text-brand-warning' : percentage >= 70 ? 'text-brand-accent' : 'text-red-500'}
        />
      </div>

      {/* Title */}
      <div>
        <h2 className="font-heading text-3xl font-bold text-foreground mb-2">
          {isPerfect ? 'Perfect!' : percentage >= 70 ? 'Well Done!' : 'Keep Practicing!'}
        </h2>
        <p className="text-foreground-muted font-body">
          Session complete
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-surface-muted/50 rounded-xl p-4 border border-border/20">
          <Target className="text-brand-accent mx-auto mb-2" size={24} />
          <p className="font-heading text-2xl font-bold text-foreground">
            {percentage}%
          </p>
          <p className="text-foreground-muted text-sm font-body">Accuracy</p>
        </div>

        <div className="bg-surface-muted/50 rounded-xl p-4 border border-border/20">
          <Zap className="text-brand-warning mx-auto mb-2" size={24} />
          <p className="font-heading text-2xl font-bold text-foreground">
            +{xpEarned}
          </p>
          <p className="text-foreground-muted text-sm font-body">XP Earned</p>
        </div>
      </div>

      {/* Details */}
      <div className="bg-surface-muted rounded-xl p-4 border border-border/20 text-left">
        <div className="flex justify-between items-center py-2 border-b border-border/20">
          <span className="text-foreground-muted font-body">Cards reviewed</span>
          <span className="text-foreground font-body font-semibold">{totalCards}</span>
        </div>
        <div className="flex justify-between items-center py-2 border-b border-border/20">
          <span className="text-foreground-muted font-body">Correct answers</span>
          <span className="text-brand-accent font-body font-semibold">{correctCount}</span>
        </div>
        <div className="flex justify-between items-center py-2 border-b border-border/20">
          <span className="text-foreground-muted font-body">Missed</span>
          <span className="text-red-500 font-body font-semibold">{totalCards - correctCount}</span>
        </div>
        <div className="flex justify-between items-center py-2">
          <span className="text-foreground-muted font-body">Newly mastered</span>
          <span className="text-brand-warning font-body font-semibold">{newMastered}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-4">
        <button
          onClick={onRestart}
          className="flex-1 flex items-center justify-center gap-2 py-3 bg-brand-warning text-brand-primary font-body font-semibold rounded-lg hover:bg-brand-warning/90 transition-colors"
        >
          <RotateCcw size={18} />
          <span>Practice Again</span>
        </button>
        <Link
          to="/app"
          className="flex-1 flex items-center justify-center gap-2 py-3 bg-foreground-muted/20 text-foreground font-body font-semibold rounded-lg hover:bg-foreground-muted/30 transition-colors"
        >
          <Home size={18} />
          <span>Dashboard</span>
        </Link>
      </div>
    </div>
  );
}
