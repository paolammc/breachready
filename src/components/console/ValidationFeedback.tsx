import { motion } from 'framer-motion';
import { CheckCircle, XCircle, Lightbulb, ArrowRight } from 'lucide-react';

interface ValidationFeedbackProps {
  isCorrect: boolean;
  userCommand: string;
  correctCommand: string;
  explanation: string;
  showHint?: boolean;
  hint?: string;
  onContinue: () => void;
  onUseHint?: () => void;
  canUseHint?: boolean;
}

export function ValidationFeedback({
  isCorrect,
  userCommand,
  correctCommand,
  explanation,
  showHint = false,
  hint,
  onContinue,
  onUseHint,
  canUseHint = false,
}: ValidationFeedbackProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-xl p-6 border ${
        isCorrect
          ? 'bg-brand-accent/10 border-brand-accent/30'
          : 'bg-red-500/10 border-red-500/30'
      }`}
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        {isCorrect ? (
          <CheckCircle className="text-brand-accent" size={28} />
        ) : (
          <XCircle className="text-red-500" size={28} />
        )}
        <h3 className={`font-heading text-xl font-bold ${isCorrect ? 'text-brand-accent' : 'text-red-500'}`}>
          {isCorrect ? 'Correct!' : 'Not Quite'}
        </h3>
      </div>

      {/* Command comparison */}
      <div className="space-y-3 mb-4">
        <div className="bg-surface-muted rounded-lg p-3">
          <p className="text-xs text-foreground-muted font-body uppercase tracking-wide mb-1">
            Your command
          </p>
          <code className={`font-mono text-sm ${isCorrect ? 'text-brand-accent' : 'text-red-500'}`}>
            {userCommand}
          </code>
        </div>

        {!isCorrect && (
          <div className="bg-surface-muted rounded-lg p-3">
            <p className="text-xs text-foreground-muted font-body uppercase tracking-wide mb-1">
              Correct command
            </p>
            <code className="font-mono text-sm text-brand-accent">
              {correctCommand}
            </code>
          </div>
        )}
      </div>

      {/* Explanation */}
      <div className="bg-surface-muted rounded-lg p-4 mb-4">
        <p className="text-xs text-foreground-muted font-body uppercase tracking-wide mb-2">
          {isCorrect ? 'Why this works' : 'Explanation'}
        </p>
        <p className="text-foreground font-body text-sm leading-relaxed">
          {explanation}
        </p>
      </div>

      {/* Hint section (only for wrong answers) */}
      {!isCorrect && showHint && hint && (
        <div className="flex items-start gap-2 bg-brand-warning/10 rounded-lg p-3 mb-4">
          <Lightbulb size={16} className="text-brand-warning flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-xs text-brand-warning font-body uppercase tracking-wide mb-1">
              Hint
            </p>
            <p className="text-brand-warning/90 text-sm font-body">
              {hint}
            </p>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-3">
        {!isCorrect && canUseHint && !showHint && onUseHint && (
          <button
            onClick={onUseHint}
            className="flex items-center gap-2 px-4 py-2 bg-brand-warning/20 text-brand-warning font-body font-medium rounded-lg hover:bg-brand-warning/30 transition-colors"
          >
            <Lightbulb size={16} />
            <span>Get Hint (-5 XP)</span>
          </button>
        )}
        <button
          onClick={onContinue}
          className={`flex-1 flex items-center justify-center gap-2 py-3 font-body font-semibold rounded-lg transition-colors ${
            isCorrect
              ? 'bg-brand-accent text-white hover:bg-brand-accent/90'
              : 'bg-brand-warning text-brand-primary hover:bg-brand-warning/90'
          }`}
        >
          <span>{isCorrect ? 'Next Exercise' : 'Try Again'}</span>
          <ArrowRight size={18} />
        </button>
      </div>
    </motion.div>
  );
}
