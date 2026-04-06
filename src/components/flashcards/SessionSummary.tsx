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
        isPerfect ? 'bg-amber-gold/20' : percentage >= 70 ? 'bg-forest-green/20' : 'bg-crimson/20'
      }`}>
        <Trophy
          size={40}
          className={isPerfect ? 'text-amber-gold' : percentage >= 70 ? 'text-forest-green' : 'text-crimson'}
        />
      </div>

      {/* Title */}
      <div>
        <h2 className="font-display text-3xl font-bold text-pale-gray mb-2">
          {isPerfect ? 'Perfect!' : percentage >= 70 ? 'Well Done!' : 'Keep Practicing!'}
        </h2>
        <p className="text-slate-gray font-body">
          Session complete
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-pale-gray/5 rounded-xl p-4 border border-slate-gray/20">
          <Target className="text-forest-green mx-auto mb-2" size={24} />
          <p className="font-display text-2xl font-bold text-pale-gray">
            {percentage}%
          </p>
          <p className="text-slate-gray text-sm font-ui">Accuracy</p>
        </div>

        <div className="bg-pale-gray/5 rounded-xl p-4 border border-slate-gray/20">
          <Zap className="text-amber-gold mx-auto mb-2" size={24} />
          <p className="font-display text-2xl font-bold text-pale-gray">
            +{xpEarned}
          </p>
          <p className="text-slate-gray text-sm font-ui">XP Earned</p>
        </div>
      </div>

      {/* Details */}
      <div className="bg-deep-navy/50 rounded-xl p-4 border border-slate-gray/20 text-left">
        <div className="flex justify-between items-center py-2 border-b border-slate-gray/20">
          <span className="text-slate-gray font-body">Cards reviewed</span>
          <span className="text-pale-gray font-ui font-semibold">{totalCards}</span>
        </div>
        <div className="flex justify-between items-center py-2 border-b border-slate-gray/20">
          <span className="text-slate-gray font-body">Correct answers</span>
          <span className="text-forest-green font-ui font-semibold">{correctCount}</span>
        </div>
        <div className="flex justify-between items-center py-2 border-b border-slate-gray/20">
          <span className="text-slate-gray font-body">Missed</span>
          <span className="text-crimson font-ui font-semibold">{totalCards - correctCount}</span>
        </div>
        <div className="flex justify-between items-center py-2">
          <span className="text-slate-gray font-body">Newly mastered</span>
          <span className="text-amber-gold font-ui font-semibold">{newMastered}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-4">
        <button
          onClick={onRestart}
          className="flex-1 flex items-center justify-center gap-2 py-3 bg-amber-gold text-deep-navy font-ui font-semibold rounded-lg hover:bg-amber-gold/90 transition-colors"
        >
          <RotateCcw size={18} />
          <span>Practice Again</span>
        </button>
        <Link
          to="/"
          className="flex-1 flex items-center justify-center gap-2 py-3 bg-slate-gray/20 text-pale-gray font-ui font-semibold rounded-lg hover:bg-slate-gray/30 transition-colors"
        >
          <Home size={18} />
          <span>Dashboard</span>
        </Link>
      </div>
    </div>
  );
}
