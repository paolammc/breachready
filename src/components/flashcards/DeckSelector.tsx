import { Layers, Hash } from 'lucide-react';

export type DeckType = 'commands' | 'ports';

interface DeckSelectorProps {
  selectedDeck: DeckType | null;
  onSelectDeck: (deck: DeckType) => void;
  commandCount: number;
  portCount: number;
  commandsMastered: number;
  portsMastered: number;
}

export function DeckSelector({
  selectedDeck,
  onSelectDeck,
  commandCount,
  portCount,
  commandsMastered,
  portsMastered,
}: DeckSelectorProps) {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="font-display text-3xl font-bold text-pale-gray mb-2">
          Flashcards
        </h1>
        <p className="text-slate-gray font-body">
          Choose a deck to practice
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
        {/* Commands Deck */}
        <button
          onClick={() => onSelectDeck('commands')}
          className={`p-6 rounded-xl border-2 transition-all text-left ${
            selectedDeck === 'commands'
              ? 'border-amber-gold bg-amber-gold/10'
              : 'border-slate-gray/30 hover:border-amber-gold/50 hover:bg-pale-gray/5'
          }`}
        >
          <div className="flex items-start gap-4">
            <div className="p-3 bg-crimson/20 rounded-lg">
              <Layers size={24} className="text-crimson" />
            </div>
            <div className="flex-1">
              <h3 className="font-display text-xl font-bold text-pale-gray mb-1">
                Console Commands
              </h3>
              <p className="text-slate-gray font-body text-sm mb-3">
                Network recon, nmap, security tools, and more
              </p>
              <div className="flex items-center gap-4 text-sm font-ui">
                <span className="text-slate-gray">
                  {commandCount} cards
                </span>
                <span className="text-forest-green">
                  {commandsMastered} mastered
                </span>
              </div>
            </div>
          </div>
        </button>

        {/* Ports Deck */}
        <button
          onClick={() => onSelectDeck('ports')}
          className={`p-6 rounded-xl border-2 transition-all text-left ${
            selectedDeck === 'ports'
              ? 'border-amber-gold bg-amber-gold/10'
              : 'border-slate-gray/30 hover:border-amber-gold/50 hover:bg-pale-gray/5'
          }`}
        >
          <div className="flex items-start gap-4">
            <div className="p-3 bg-amber-gold/20 rounded-lg">
              <Hash size={24} className="text-amber-gold" />
            </div>
            <div className="flex-1">
              <h3 className="font-display text-xl font-bold text-pale-gray mb-1">
                Port Numbers
              </h3>
              <p className="text-slate-gray font-body text-sm mb-3">
                Common protocols and their port numbers
              </p>
              <div className="flex items-center gap-4 text-sm font-ui">
                <span className="text-slate-gray">
                  {portCount} cards
                </span>
                <span className="text-forest-green">
                  {portsMastered} mastered
                </span>
              </div>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
}
