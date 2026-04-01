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
      ? '/flashcards'
      : challengeType === 'pbq'
      ? '/pbq'
      : '/console';

  return (
    <div className="bg-gradient-to-r from-amber-gold/10 to-amber-gold/5 rounded-xl p-6 border border-amber-gold/20">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-amber-gold/20 rounded-lg">
            <Sparkles size={20} className="text-amber-gold" />
          </div>
          <div>
            <h3 className="font-display text-lg font-bold text-pale-gray">
              Daily Challenge
            </h3>
            <p className="text-sm text-slate-gray font-body">
              {isCompleted ? 'Completed!' : 'Complete to maintain your streak'}
            </p>
          </div>
        </div>
        <StreakCounter streak={streak} />
      </div>

      <div className="bg-deep-navy/50 rounded-lg p-4 mb-4">
        <p className="text-sm text-slate-gray font-ui uppercase tracking-wide mb-1">
          Today's {challengeType}
        </p>
        <p className="text-pale-gray font-body">{challengeTitle}</p>
      </div>

      {!isCompleted && (
        <Link
          to={linkTo}
          className="flex items-center justify-center gap-2 w-full py-3 bg-amber-gold text-deep-navy font-ui font-semibold rounded-lg hover:bg-amber-gold/90 transition-colors"
        >
          <span>Complete Today's Challenge</span>
          <ArrowRight size={18} />
        </Link>
      )}

      {isCompleted && (
        <div className="flex items-center justify-center gap-2 w-full py-3 bg-forest-green/20 text-forest-green font-ui font-semibold rounded-lg">
          <Sparkles size={18} />
          <span>Challenge Complete!</span>
        </div>
      )}
    </div>
  );
}
