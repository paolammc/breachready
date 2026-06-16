import { useState, useCallback } from 'react';
import { ArrowLeft, SkipForward } from 'lucide-react';
import { useBreachReadyStore } from '../store/useBreachReadyStore';
import { Terminal, ExercisePrompt, ValidationFeedback, ExerciseComplete } from '../components/console';
import { consoleExercises } from '../data/console';
import { XP_AWARDS } from '../types';

type SessionState = 'practice' | 'feedback' | 'complete';

const MAX_ATTEMPTS = 2;

export function Console() {
  const {
    recordConsoleAttempt,
    addXP,
  } = useBreachReadyStore();

  const [sessionState, setSessionState] = useState<SessionState>('practice');
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [lastCommand, setLastCommand] = useState('');
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [terminalOutput, setTerminalOutput] = useState<string>('');
  const [sessionStats, setSessionStats] = useState({ completed: 0, perfect: 0, xp: 0 });

  const currentExercise = consoleExercises[currentExerciseIndex];

  // Normalize command for comparison (trim, lowercase, normalize spaces)
  const normalizeCommand = (cmd: string): string => {
    return cmd.trim().toLowerCase().replace(/\s+/g, ' ');
  };

  // Check if command matches any expected command
  const validateCommand = (userCmd: string): boolean => {
    const normalizedUser = normalizeCommand(userCmd);
    return currentExercise.expectedCommands.some(
      (expected) => normalizeCommand(expected) === normalizedUser
    );
  };

  // Handle command submission
  const handleSubmit = useCallback((command: string) => {
    const correct = validateCommand(command);
    setLastCommand(command);
    setIsCorrect(correct);
    setAttempts((prev) => prev + 1);

    if (correct) {
      // Calculate XP
      const isFirstAttempt = attempts === 0;
      const xpGained = isFirstAttempt ? XP_AWARDS.CONSOLE_CORRECT_FIRST : XP_AWARDS.CONSOLE_CORRECT_SECOND;
      addXP(xpGained);

      // Record completion
      recordConsoleAttempt(currentExercise.id, true);

      // Update session stats
      setSessionStats((prev) => ({
        completed: prev.completed + 1,
        perfect: prev.perfect + (isFirstAttempt ? 1 : 0),
        xp: prev.xp + xpGained,
      }));

      setTerminalOutput('✓ Command accepted. Exercise complete!');
    } else {
      if (attempts + 1 >= MAX_ATTEMPTS) {
        // Show correct answer after max attempts
        setTerminalOutput(`✗ Incorrect. The correct command is: ${currentExercise.expectedCommands[0]}`);
        recordConsoleAttempt(currentExercise.id, false);
      } else {
        setTerminalOutput('✗ Command not recognized. Try again.');
      }
    }

    setSessionState('feedback');
  }, [currentExercise, attempts, addXP, recordConsoleAttempt]);

  // Handle hint request
  const handleUseHint = useCallback(() => {
    addXP(XP_AWARDS.CONSOLE_HINT_COST); // This is negative
    setShowHint(true);
    setSessionStats((prev) => ({
      ...prev,
      xp: prev.xp + XP_AWARDS.CONSOLE_HINT_COST,
    }));
  }, [addXP]);

  // Handle continue after feedback
  const handleContinue = useCallback(() => {
    if (isCorrect || attempts >= MAX_ATTEMPTS) {
      // Move to next exercise or complete
      if (currentExerciseIndex < consoleExercises.length - 1) {
        setCurrentExerciseIndex((prev) => prev + 1);
        setAttempts(0);
        setIsCorrect(null);
        setShowHint(false);
        setLastCommand('');
        setTerminalOutput('');
        setSessionState('practice');
      } else {
        setSessionState('complete');
      }
    } else {
      // Try again
      setIsCorrect(null);
      setTerminalOutput('');
      setSessionState('practice');
    }
  }, [isCorrect, attempts, currentExerciseIndex]);

  // Skip exercise
  const handleSkip = useCallback(() => {
    if (currentExerciseIndex < consoleExercises.length - 1) {
      setCurrentExerciseIndex((prev) => prev + 1);
      setAttempts(0);
      setIsCorrect(null);
      setShowHint(false);
      setLastCommand('');
      setTerminalOutput('');
      setSessionState('practice');
    } else {
      setSessionState('complete');
    }
  }, [currentExerciseIndex]);

  // Restart session
  const handleRestart = useCallback(() => {
    setCurrentExerciseIndex(0);
    setAttempts(0);
    setIsCorrect(null);
    setShowHint(false);
    setLastCommand('');
    setTerminalOutput('');
    setSessionStats({ completed: 0, perfect: 0, xp: 0 });
    setSessionState('practice');
  }, []);

  // Render complete screen
  if (sessionState === 'complete') {
    return (
      <div className="py-8">
        <ExerciseComplete
          totalExercises={consoleExercises.length}
          completedCount={sessionStats.completed}
          perfectCount={sessionStats.perfect}
          xpEarned={sessionStats.xp}
          onRestart={handleRestart}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <a
            href="/"
            className="flex items-center gap-2 text-foreground-muted hover:text-foreground transition-colors font-body"
          >
            <ArrowLeft size={20} />
            <span>Back</span>
          </a>
          <h1 className="font-heading text-2xl font-bold text-foreground">
            Console Simulator
          </h1>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-foreground-muted font-body text-sm">
            {currentExerciseIndex + 1} / {consoleExercises.length}
          </span>
          <button
            onClick={handleSkip}
            className="flex items-center gap-1 text-foreground-muted hover:text-foreground transition-colors font-body text-sm"
            title="Skip exercise"
          >
            <span>Skip</span>
            <SkipForward size={16} />
          </button>
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-2 bg-foreground-muted/20 rounded-full overflow-hidden">
        <div
          className="h-full bg-red-500 transition-all duration-300"
          style={{ width: `${((currentExerciseIndex + 1) / consoleExercises.length) * 100}%` }}
        />
      </div>

      {/* Exercise prompt */}
      <ExercisePrompt
        exerciseId={currentExercise.id}
        scenarioText={currentExercise.scenarioText}
        difficulty={currentExercise.difficulty}
        currentAttempt={attempts}
        maxAttempts={MAX_ATTEMPTS}
      />

      {/* Terminal */}
      <Terminal
        exerciseTitle={currentExercise.id}
        onSubmit={handleSubmit}
        isCorrect={isCorrect}
        isDisabled={sessionState === 'feedback'}
        lastOutput={terminalOutput}
      />

      {/* Validation feedback */}
      {sessionState === 'feedback' && isCorrect !== null && (
        <ValidationFeedback
          isCorrect={isCorrect}
          userCommand={lastCommand}
          correctCommand={currentExercise.expectedCommands[0]}
          explanation={currentExercise.explanation}
          showHint={showHint}
          hint={currentExercise.hints[0]}
          onContinue={handleContinue}
          onUseHint={handleUseHint}
          canUseHint={!isCorrect && attempts < MAX_ATTEMPTS && !showHint}
        />
      )}
    </div>
  );
}
