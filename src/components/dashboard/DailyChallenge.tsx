import { Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { StreakCounter } from '../shared/StreakCounter';

interface DailyChallengeProps {
  challengeType: 'flashcard' | 'pbq' | 'console';
  challengeTitle: string;
  streak: number;
  isCompleted?: boolean;
}

export function DailyChallenge({
  challengeType,
  challengeTitle,
  streak,
  isCompleted = false,
}: DailyChallengeProps) {
  const linkTo =
    challengeType === 'flashcard'
      ? '/app/flashcards'
      : challengeType === 'pbq'
      ? '/app/pbq'
      : '/app/console';

  return (
    <div className="card-tech p-6 bg-gradient-to-br from-brand-warning/5 to-transparent">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-brand-warning/20 rounded-lg">
            <Sparkles size={20} className="text-brand-warning" />
          </div>
          <div>
            <h3 className="font-heading text-lg font-bold text-foreground">
              Daily Challenge
            </h3>
            <p className="text-sm text-foreground-muted font-body">
              {isCompleted ? 'Completed!' : 'Complete to maintain your streak'}
            </p>
          </div>
        </div>
        <StreakCounter streak={streak} />
      </div>

      <div className="bg-surface-muted rounded-lg p-4 mb-4">
        <p className="text-sm text-foreground-muted font-body uppercase tracking-wide mb-1">
          Today's {challengeType}
        </p>
        <p className="text-foreground font-body">{challengeTitle}</p>
      </div>

      {!isCompleted && (
        <Link
          to={linkTo}
          className="flex items-center justify-center gap-2 w-full py-3 bg-brand-warning text-brand-primary font-body font-semibold rounded-lg hover:brightness-110 transition-all"
        >
          <span>Complete Today's Challenge</span>
          <ArrowRight size={18} />
        </Link>
      )}

      {isCompleted && (
        <div className="flex items-center justify-center gap-2 w-full py-3 bg-brand-accent/20 text-brand-accent font-body font-semibold rounded-lg">
          <Sparkles size={18} />
          <span>Challenge Complete!</span>
        </div>
      )}
    </div>
  );
}
