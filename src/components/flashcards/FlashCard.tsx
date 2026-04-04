import { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Lightbulb } from 'lucide-react';

interface FlashCardProps {
  front: string;
  back: string;
  category: string;
  examTip?: string;
  isPort?: boolean;
  isMastered?: boolean;
  onResult: (correct: boolean) => void;
}

export function FlashCard({
  front,
  back,
  category,
  examTip,
  isPort = false,
  isMastered = false,
  onResult,
}: FlashCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [hasAnswered, setHasAnswered] = useState(false);

  const handleFlip = () => {
    if (!isFlipped) {
      setIsFlipped(true);
    }
  };

  const handleResult = (correct: boolean) => {
    setHasAnswered(true);
    onResult(correct);
  };

  return (
    <div className="w-full max-w-lg mx-auto">
      {/* Card */}
      <div
        className="flashcard cursor-pointer"
        style={{ height: '320px' }}
        onClick={handleFlip}
      >
        <motion.div
          className="flashcard-inner w-full h-full"
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Front */}
          <div
            className="absolute w-full h-full rounded-2xl bg-pale-gray p-6 flex flex-col"
            style={{ backfaceVisibility: 'hidden' }}
          >
            {/* Category badge */}
            <div className="flex items-center justify-between mb-4">
              <span className="px-3 py-1 bg-deep-navy/10 text-deep-navy rounded-full text-xs font-ui font-medium">
                {category}
              </span>
              {isMastered && (
                <Star size={20} className="text-amber-gold" fill="currentColor" />
              )}
            </div>

            {/* Front content */}
            <div className="flex-1 flex items-center justify-center">
              <p className={`text-deep-navy text-center ${isPort ? 'font-mono text-5xl font-bold' : 'font-mono text-2xl'}`}>
                {front}
              </p>
            </div>

            {/* Hint */}
            <p className="text-slate-gray text-sm text-center font-body">
              {isPort ? 'What protocol uses this port?' : 'What does this command do?'}
            </p>
          </div>

          {/* Back */}
          <div
            className="absolute w-full h-full rounded-2xl bg-forest-green p-6 flex flex-col"
            style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
          >
            {/* Category badge */}
            <div className="flex items-center justify-between mb-4">
              <span className="px-3 py-1 bg-white/20 text-white rounded-full text-xs font-ui font-medium">
                {category}
              </span>
              {isMastered && (
                <Star size={20} className="text-amber-gold" fill="currentColor" />
              )}
            </div>

            {/* Back content */}
            <div className="flex-1 flex flex-col justify-center">
              <p className="text-white font-body text-lg leading-relaxed text-center">
                {back}
              </p>
            </div>

            {/* Exam tip */}
            {examTip && (
              <div className="flex items-start gap-2 bg-amber-gold/20 rounded-lg p-3 mt-4">
                <Lightbulb size={16} className="text-amber-gold flex-shrink-0 mt-0.5" />
                <p className="text-amber-gold text-sm font-body italic">
                  {examTip}
                </p>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Answer buttons - show after flip */}
      {isFlipped && !hasAnswered && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex gap-4 mt-6 justify-center"
        >
          <button
            onClick={() => handleResult(false)}
            className="flex-1 max-w-[140px] py-3 bg-crimson text-white font-ui font-semibold rounded-lg hover:bg-crimson/90 transition-colors"
          >
            Miss
          </button>
          <button
            onClick={() => handleResult(true)}
            className="flex-1 max-w-[140px] py-3 bg-forest-green text-white font-ui font-semibold rounded-lg hover:bg-forest-green/90 transition-colors"
          >
            Got It
          </button>
        </motion.div>
      )}

      {/* Tap hint */}
      {!isFlipped && (
        <p className="text-slate-gray text-sm text-center mt-4 font-ui">
          Tap card to flip
        </p>
      )}
    </div>
  );
}
