import { Layers } from 'lucide-react';

export function Flashcards() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <div className="p-4 bg-amber-gold/20 rounded-2xl mb-4">
        <Layers size={48} className="text-amber-gold" />
      </div>
      <h1 className="font-display text-3xl font-bold text-pale-gray mb-2">
        Flashcards
      </h1>
      <p className="text-slate-gray font-body max-w-md">
        Commands & port numbers flashcards coming soon. Master 120+ console commands
        and 55+ port numbers with spaced repetition.
      </p>
    </div>
  );
}
