// BreachReady Type Definitions
// Based on PRD Section 12: Data Architecture

export type Difficulty = 'Beginner' | 'Intermediate' | 'Advanced';

export type ExamDomain =
  | 'General Security Concepts'
  | 'Threats & Vulnerabilities'
  | 'Security Architecture'
  | 'Security Operations'
  | 'Security Program Management';

// Flashcard Types
export interface FlashCard {
  id: string;
  front: string;
  back: string;
  category: string;
  examTip?: string;
  difficulty: Difficulty;
}

export interface PortCard {
  id: string;
  port: string;
  protocol: string;
  description: string;
  secure: boolean;
  examAlert?: string;
}

// Console Simulator Types
export interface ConsoleExercise {
  id: string;
  scenarioText: string;
  expectedCommands: string[];
  hints: string[];
  explanation: string;
  difficulty: Difficulty;
}

// PBQ Lab Types
export type PBQStepType = 'console' | 'choice';

export interface PBQStepOption {
  id: string;
  label: string;
  isCorrect: boolean;
}

export interface PBQStep {
  stepNumber: number;
  instruction: string;
  type: PBQStepType;
  expected: string;
  options?: PBQStepOption[];
  explanation: string;
  tip: string;
}

export interface PBQScenario {
  id: string;
  title: string;
  scenarioText: string;
  steps: PBQStep[];
  examTip: string;
  domain: ExamDomain;
}

// Glossary Types
export interface GlossaryTerm {
  id: string;
  term: string;
  definition: string;
  domain: ExamDomain;
  examTip?: string;
  relatedTerms: string[];
  confusedWith?: string;
}

export interface ConfusablePair {
  id: string;
  terms: [string, string];
  explanation: string;
}

// XP & Progress Types
export type XPLevel = 'Cadet' | 'Analyst' | 'Defender' | 'Sentinel' | 'Vanguard' | 'BreachReady';

export interface StreakData {
  current: number;
  lastStudied: string; // ISO date string
}

export interface FlashcardProgress {
  seen: number;
  correct: number;
  lastSeen: string; // ISO date string
  mastered: boolean;
}

export interface PBQProgress {
  attempts: number;
  passed: boolean;
  lastScore: number;
}

export interface ConsoleProgress {
  completed: boolean;
  attempts: number;
}

export interface GlossaryProgress {
  reviewed: boolean;
  quizzed: number;
  correct: number;
}

// Main App State
export interface BreachReadyState {
  xp: number;
  streak: StreakData;
  flashcards: Record<string, FlashcardProgress>;
  pbqs: Record<string, PBQProgress>;
  console: Record<string, ConsoleProgress>;
  glossary: Record<string, GlossaryProgress>;
  weakAreas: string[];
  targetExamDate: string | null; // ISO date string
}

// XP Level Thresholds (from PRD)
export const XP_LEVELS: Record<XPLevel, { min: number; max: number; badge: string }> = {
  'Cadet': { min: 0, max: 499, badge: 'gray' },
  'Analyst': { min: 500, max: 1499, badge: 'blue' },
  'Defender': { min: 1500, max: 3999, badge: 'green' },
  'Sentinel': { min: 4000, max: 7999, badge: 'purple' },
  'Vanguard': { min: 8000, max: 14999, badge: 'gold' },
  'BreachReady': { min: 15000, max: Infinity, badge: 'crimson' },
};

// XP Awards (from PRD)
export const XP_AWARDS = {
  FLASHCARD_CORRECT_FIRST: 10,
  FLASHCARD_CORRECT_SECOND: 5,
  FLASHCARD_STREAK_BONUS: 5,
  FLASHCARD_MASTER: 25,
  CONSOLE_CORRECT_FIRST: 20,
  CONSOLE_CORRECT_SECOND: 10,
  CONSOLE_HINT_COST: -5,
  CONSOLE_HINT_AWARD: 5,
  PBQ_STEP_CORRECT: 15,
  PBQ_WRONG_EXPLANATION_REVIEWED: 5,
  PBQ_PERFECT_BONUS: 50,
  GLOSSARY_REVIEWED: 3,
  GLOSSARY_QUIZ_CORRECT: 8,
  DAILY_CHALLENGE: 30,
  STREAK_7_DAYS: 100,
  STREAK_30_DAYS: 500,
} as const;
