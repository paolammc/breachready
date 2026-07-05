import { useEffect, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { saveUserProgress } from '../lib/progressSync';
import { useBreachReadyStore } from '../store/useBreachReadyStore';

export function useProgressSync() {
  const { user } = useAuth();
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!user) return;

    const unsubscribe = useBreachReadyStore.subscribe((state) => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);

      timeoutRef.current = setTimeout(() => {
        saveUserProgress(user.id, {
          xp: state.xp,
          streak: state.streak,
          flashcards: state.flashcards,
          pbqs: state.pbqs,
          console: state.console,
          glossary: state.glossary,
          weakAreas: state.weakAreas,
          targetExamDate: state.targetExamDate,
        }).catch((error) => console.error('Failed to sync progress:', error));
      }, 800);
    });

    return () => {
      unsubscribe();
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [user]);
}
