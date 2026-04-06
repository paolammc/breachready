import { useState, useMemo, useCallback } from 'react';
import { ArrowLeft, Shuffle } from 'lucide-react';
import { useBreachReadyStore } from '../store/useBreachReadyStore';
import { FlashCard, DeckSelector, SessionSummary } from '../components/flashcards';
import type { DeckType } from '../components/flashcards';
import { commandCards, portCards } from '../data/flashcards';
import { XP_AWARDS } from '../types';

type SessionState = 'select' | 'practice' | 'summary';

interface SessionCard {
  id: string;
  front: string;
  back: string;
  category: string;
  examTip?: string;
  isPort: boolean;
}

export function Flashcards() {
  const {
    flashcards: flashcardProgress,
    recordFlashcardAttempt,
    markFlashcardMastered,
    addXP,
  } = useBreachReadyStore();

  const [sessionState, setSessionState] = useState<SessionState>('select');
  const [selectedDeck, setSelectedDeck] = useState<DeckType | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sessionResults, setSessionResults] = useState<{ correct: number; xp: number; mastered: number }>({
    correct: 0,
    xp: 0,
    mastered: 0,
  });
  const [cardKey, setCardKey] = useState(0); // Force re-render of card

  // Shuffle cards for session
  const [shuffledCards, setShuffledCards] = useState<SessionCard[]>([]);

  // Calculate mastered counts
  const commandsMastered = useMemo(() => {
    return commandCards.filter((card) => flashcardProgress[card.id]?.mastered).length;
  }, [flashcardProgress]);

  const portsMastered = useMemo(() => {
    return portCards.filter((card) => flashcardProgress[card.id]?.mastered).length;
  }, [flashcardProgress]);

  // Check if current card is mastered
  const isCurrentCardMastered = useMemo(() => {
    if (shuffledCards.length === 0) return false;
    const cardId = shuffledCards[currentIndex]?.id;
    return flashcardProgress[cardId]?.mastered || false;
  }, [shuffledCards, currentIndex, flashcardProgress]);

  // Start practice session
  const handleStartPractice = useCallback((deck: DeckType) => {
    setSelectedDeck(deck);
    const cards: SessionCard[] = deck === 'commands'
      ? commandCards.map((card) => ({
          id: card.id,
          front: card.front,
          back: card.back,
          category: card.category,
          examTip: card.examTip,
          isPort: false,
        }))
      : portCards.map((card) => ({
          id: card.id,
          front: card.port,
          back: `${card.protocol} - ${card.description}`,
          category: card.secure ? 'Secure' : 'Insecure',
          examTip: card.examAlert,
          isPort: true,
        }));

    // Shuffle cards
    const shuffled = [...cards].sort(() => Math.random() - 0.5);
    setShuffledCards(shuffled);
    setCurrentIndex(0);
    setSessionResults({ correct: 0, xp: 0, mastered: 0 });
    setSessionState('practice');
    setCardKey((k) => k + 1);
  }, []);

  // Handle card result
  const handleCardResult = useCallback((correct: boolean) => {
    const cardId = shuffledCards[currentIndex].id;
    const progress = flashcardProgress[cardId];
    const isFirstAttempt = !progress || progress.seen === 0;

    // Record attempt
    recordFlashcardAttempt(cardId, correct);

    // Calculate XP
    let xpGained = 0;
    if (correct) {
      xpGained = isFirstAttempt ? XP_AWARDS.FLASHCARD_CORRECT_FIRST : XP_AWARDS.FLASHCARD_CORRECT_SECOND;
      addXP(xpGained);

      // Check for mastery (3 consecutive correct)
      const currentCorrect = (progress?.correct || 0) + 1;
      const consecutiveCorrect = currentCorrect >= 3 && !progress?.mastered;
      if (consecutiveCorrect) {
        markFlashcardMastered(cardId);
        setSessionResults((prev) => ({ ...prev, mastered: prev.mastered + 1 }));
      }
    }

    setSessionResults((prev) => ({
      correct: prev.correct + (correct ? 1 : 0),
      xp: prev.xp + xpGained,
      mastered: prev.mastered,
    }));

    // Move to next card or summary
    setTimeout(() => {
      if (currentIndex < shuffledCards.length - 1) {
        setCurrentIndex((i) => i + 1);
        setCardKey((k) => k + 1);
      } else {
        setSessionState('summary');
      }
    }, 500);
  }, [shuffledCards, currentIndex, flashcardProgress, recordFlashcardAttempt, markFlashcardMastered, addXP]);

  // Restart session
  const handleRestart = useCallback(() => {
    if (selectedDeck) {
      handleStartPractice(selectedDeck);
    }
  }, [selectedDeck, handleStartPractice]);

  // Go back to deck selection
  const handleBackToSelect = useCallback(() => {
    setSessionState('select');
    setSelectedDeck(null);
    setCurrentIndex(0);
    setShuffledCards([]);
  }, []);

  // Render deck selection
  if (sessionState === 'select') {
    return (
      <DeckSelector
        selectedDeck={selectedDeck}
        onSelectDeck={handleStartPractice}
        commandCount={commandCards.length}
        portCount={portCards.length}
        commandsMastered={commandsMastered}
        portsMastered={portsMastered}
      />
    );
  }

  // Render summary
  if (sessionState === 'summary') {
    return (
      <div className="py-8">
        <SessionSummary
          totalCards={shuffledCards.length}
          correctCount={sessionResults.correct}
          xpEarned={sessionResults.xp}
          newMastered={sessionResults.mastered}
          onRestart={handleRestart}
        />
      </div>
    );
  }

  // Render practice session
  const currentCard = shuffledCards[currentIndex];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={handleBackToSelect}
          className="flex items-center gap-2 text-slate-gray hover:text-pale-gray transition-colors font-ui"
        >
          <ArrowLeft size={20} />
          <span>Back</span>
        </button>

        <div className="flex items-center gap-4">
          <span className="text-slate-gray font-ui text-sm">
            {currentIndex + 1} / {shuffledCards.length}
          </span>
          <button
            onClick={handleRestart}
            className="p-2 text-slate-gray hover:text-pale-gray hover:bg-pale-gray/10 rounded-lg transition-colors"
            title="Shuffle & restart"
          >
            <Shuffle size={18} />
          </button>
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-2 bg-slate-gray/20 rounded-full overflow-hidden">
        <div
          className="h-full bg-amber-gold transition-all duration-300"
          style={{ width: `${((currentIndex + 1) / shuffledCards.length) * 100}%` }}
        />
      </div>

      {/* Deck title */}
      <div className="text-center">
        <h2 className="font-display text-xl font-bold text-pale-gray">
          {selectedDeck === 'commands' ? 'Console Commands' : 'Port Numbers'}
        </h2>
      </div>

      {/* Flashcard */}
      <div className="py-4">
        <FlashCard
          key={cardKey}
          front={currentCard.front}
          back={currentCard.back}
          category={currentCard.category}
          examTip={currentCard.examTip}
          isPort={currentCard.isPort}
          isMastered={isCurrentCardMastered}
          onResult={handleCardResult}
        />
      </div>
    </div>
  );
}
