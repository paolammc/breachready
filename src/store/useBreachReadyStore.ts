import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type {
  BreachReadyState,
  XPLevel,
} from '../types';
import { XP_AWARDS } from '../types';

interface BreachReadyActions {
  // XP Actions
  addXP: (amount: number) => void;
  getLevel: () => XPLevel;

  // Streak Actions
  updateStreak: () => void;
  resetStreak: () => void;

  // Flashcard Actions
  recordFlashcardAttempt: (cardId: string, correct: boolean) => void;
  markFlashcardMastered: (cardId: string) => void;

  // PBQ Actions
  recordPBQAttempt: (pbqId: string, score: number, passed: boolean) => void;

  // Console Actions
  recordConsoleAttempt: (exerciseId: string, completed: boolean) => void;

  // Glossary Actions
  markTermReviewed: (termId: string) => void;
  recordGlossaryQuiz: (termId: string, correct: boolean) => void;

  // Weak Areas
  updateWeakAreas: (areas: string[]) => void;

  // Exam Date
  setTargetExamDate: (date: string | null) => void;

  // Reset
  resetProgress: () => void;
}

type BreachReadyStore = BreachReadyState & BreachReadyActions;

const initialState: BreachReadyState = {
  xp: 0,
  streak: {
    current: 0,
    lastStudied: '',
  },
  flashcards: {},
  pbqs: {},
  console: {},
  glossary: {},
  weakAreas: [],
  targetExamDate: null,
};

const getXPLevel = (xp: number): XPLevel => {
  if (xp >= 15000) return 'BreachReady';
  if (xp >= 8000) return 'Vanguard';
  if (xp >= 4000) return 'Sentinel';
  if (xp >= 1500) return 'Defender';
  if (xp >= 500) return 'Analyst';
  return 'Cadet';
};

const isSameDay = (date1: string, date2: string): boolean => {
  if (!date1 || !date2) return false;
  return date1.slice(0, 10) === date2.slice(0, 10);
};

const isYesterday = (dateStr: string): boolean => {
  if (!dateStr) return false;
  const date = new Date(dateStr);
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return date.toISOString().slice(0, 10) === yesterday.toISOString().slice(0, 10);
};

export const useBreachReadyStore = create<BreachReadyStore>()(
  persist(
    (set, get) => ({
      ...initialState,

      addXP: (amount: number) => {
        set((state) => ({ xp: Math.max(0, state.xp + amount) }));
      },

      getLevel: () => getXPLevel(get().xp),

      updateStreak: () => {
        const today = new Date().toISOString();
        const { streak } = get();

        if (isSameDay(streak.lastStudied, today)) {
          // Already studied today, no change
          return;
        }

        if (isYesterday(streak.lastStudied)) {
          // Studied yesterday, increment streak
          set({
            streak: {
              current: streak.current + 1,
              lastStudied: today,
            },
          });

          // Check for streak milestones
          const newStreak = streak.current + 1;
          if (newStreak === 7) {
            get().addXP(XP_AWARDS.STREAK_7_DAYS);
          } else if (newStreak === 30) {
            get().addXP(XP_AWARDS.STREAK_30_DAYS);
          }
        } else {
          // Streak broken or first time, start at 1
          set({
            streak: {
              current: 1,
              lastStudied: today,
            },
          });
        }
      },

      resetStreak: () => {
        set({
          streak: {
            current: 0,
            lastStudied: '',
          },
        });
      },

      recordFlashcardAttempt: (cardId: string, correct: boolean) => {
        const today = new Date().toISOString();
        const current = get().flashcards[cardId] || {
          seen: 0,
          correct: 0,
          lastSeen: '',
          mastered: false,
        };

        set((state) => ({
          flashcards: {
            ...state.flashcards,
            [cardId]: {
              seen: current.seen + 1,
              correct: correct ? current.correct + 1 : current.correct,
              lastSeen: today,
              mastered: current.mastered,
            },
          },
        }));

        get().updateStreak();
      },

      markFlashcardMastered: (cardId: string) => {
        set((state) => ({
          flashcards: {
            ...state.flashcards,
            [cardId]: {
              ...state.flashcards[cardId],
              mastered: true,
            },
          },
        }));
        get().addXP(XP_AWARDS.FLASHCARD_MASTER);
      },

      recordPBQAttempt: (pbqId: string, score: number, passed: boolean) => {
        const current = get().pbqs[pbqId] || {
          attempts: 0,
          passed: false,
          lastScore: 0,
        };

        set((state) => ({
          pbqs: {
            ...state.pbqs,
            [pbqId]: {
              attempts: current.attempts + 1,
              passed: passed || current.passed,
              lastScore: score,
            },
          },
        }));

        get().updateStreak();
      },

      recordConsoleAttempt: (exerciseId: string, completed: boolean) => {
        const current = get().console[exerciseId] || {
          completed: false,
          attempts: 0,
        };

        set((state) => ({
          console: {
            ...state.console,
            [exerciseId]: {
              completed: completed || current.completed,
              attempts: current.attempts + 1,
            },
          },
        }));

        get().updateStreak();
      },

      markTermReviewed: (termId: string) => {
        const current = get().glossary[termId] || {
          reviewed: false,
          quizzed: 0,
          correct: 0,
        };

        if (!current.reviewed) {
          set((state) => ({
            glossary: {
              ...state.glossary,
              [termId]: {
                ...current,
                reviewed: true,
              },
            },
          }));
          get().addXP(XP_AWARDS.GLOSSARY_REVIEWED);
        }

        get().updateStreak();
      },

      recordGlossaryQuiz: (termId: string, correct: boolean) => {
        const current = get().glossary[termId] || {
          reviewed: false,
          quizzed: 0,
          correct: 0,
        };

        set((state) => ({
          glossary: {
            ...state.glossary,
            [termId]: {
              ...current,
              reviewed: true,
              quizzed: current.quizzed + 1,
              correct: correct ? current.correct + 1 : current.correct,
            },
          },
        }));

        if (correct) {
          get().addXP(XP_AWARDS.GLOSSARY_QUIZ_CORRECT);
        }

        get().updateStreak();
      },

      updateWeakAreas: (areas: string[]) => {
        set({ weakAreas: areas.slice(0, 3) });
      },

      setTargetExamDate: (date: string | null) => {
        set({ targetExamDate: date });
      },

      resetProgress: () => {
        set(initialState);
      },
    }),
    {
      name: 'breachready_state',
    }
  )
);
