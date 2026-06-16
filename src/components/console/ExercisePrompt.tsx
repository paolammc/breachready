import { AlertCircle } from 'lucide-react';
import type { Difficulty } from '../../types';

interface ExercisePromptProps {
  exerciseId: string;
  scenarioText: string;
  difficulty: Difficulty;
  currentAttempt: number;
  maxAttempts: number;
}

const difficultyColors = {
  Beginner: 'bg-brand-accent/20 text-brand-accent',
  Intermediate: 'bg-brand-warning/20 text-brand-warning',
  Advanced: 'bg-red-500/20 text-red-500',
};

export function ExercisePrompt({
  exerciseId,
  scenarioText,
  difficulty,
  currentAttempt,
  maxAttempts,
}: ExercisePromptProps) {
  return (
    <div className="bg-surface-muted rounded-xl p-6 border-l-4 border-brand-warning">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <span className="text-foreground-muted font-mono text-sm">{exerciseId}</span>
          <span className={`px-2 py-1 rounded-full text-xs font-body font-medium ${difficultyColors[difficulty]}`}>
            {difficulty}
          </span>
        </div>
        {currentAttempt > 0 && (
          <div className="flex items-center gap-2 text-sm">
            <span className="text-foreground-muted font-body">Attempts:</span>
            <span className={`font-body font-semibold ${currentAttempt >= maxAttempts ? 'text-red-500' : 'text-brand-warning'}`}>
              {currentAttempt}/{maxAttempts}
            </span>
          </div>
        )}
      </div>

      {/* Scenario */}
      <div className="flex gap-3">
        <AlertCircle className="text-brand-warning flex-shrink-0 mt-1" size={20} />
        <div>
          <h3 className="font-heading text-lg font-bold text-foreground mb-2">
            Scenario
          </h3>
          <p className="text-foreground-muted font-body leading-relaxed">
            {scenarioText}
          </p>
        </div>
      </div>
    </div>
  );
}
