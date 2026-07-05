import { Trophy, Target, Zap, RotateCcw, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ExerciseCompleteProps {
  totalExercises: number;
  completedCount: number;
  perfectCount: number;
  xpEarned: number;
  onRestart: () => void;
}

export function ExerciseComplete({
  totalExercises,
  completedCount,
  perfectCount,
  xpEarned,
  onRestart,
}: ExerciseCompleteProps) {
  const percentage = Math.round((completedCount / totalExercises) * 100);
  const isPerfect = perfectCount === completedCount;

  return (
    <div className="max-w-md mx-auto text-center space-y-6">
      {/* Trophy Icon */}
      <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center ${
        isPerfect ? 'bg-brand-warning/20' : 'bg-brand-accent/20'
      }`}>
        <Trophy
          size={40}
          className={isPerfect ? 'text-brand-warning' : 'text-brand-accent'}
        />
      </div>

      {/* Title */}
      <div>
        <h2 className="font-heading text-3xl font-bold text-foreground mb-2">
          {isPerfect ? 'Perfect Run!' : 'Session Complete!'}
        </h2>
        <p className="text-foreground-muted font-body">
          You've completed all exercises
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-surface-muted/50 rounded-xl p-4 border border-border/20">
          <Target className="text-brand-accent mx-auto mb-2" size={24} />
          <p className="font-heading text-2xl font-bold text-foreground">
            {percentage}%
          </p>
          <p className="text-foreground-muted text-sm font-body">Completed</p>
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
          <span className="text-foreground-muted font-body">Exercises completed</span>
          <span className="text-foreground font-body font-semibold">{completedCount}</span>
        </div>
        <div className="flex justify-between items-center py-2 border-b border-border/20">
          <span className="text-foreground-muted font-body">Perfect (first try)</span>
          <span className="text-brand-accent font-body font-semibold">{perfectCount}</span>
        </div>
        <div className="flex justify-between items-center py-2">
          <span className="text-foreground-muted font-body">Needed hints</span>
          <span className="text-brand-warning font-body font-semibold">{completedCount - perfectCount}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-4">
        <button
          onClick={onRestart}
          className="flex-1 flex items-center justify-center gap-2 py-3 bg-red-500 text-white font-body font-semibold rounded-lg hover:bg-red-500/90 transition-colors"
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
