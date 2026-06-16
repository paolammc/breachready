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
        <h1 className="font-heading text-3xl font-bold text-foreground mb-2">
          Flashcards
        </h1>
        <p className="text-foreground-muted font-body">
          Choose a deck to practice
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
        {/* Commands Deck */}
        <button
          onClick={() => onSelectDeck('commands')}
          className={`p-6 rounded-xl border-2 transition-all text-left ${
            selectedDeck === 'commands'
              ? 'border-brand-warning bg-brand-warning/10'
              : 'border-border/30 hover:border-brand-warning/50 hover:bg-surface-muted/50'
          }`}
        >
          <div className="flex items-start gap-4">
            <div className="p-3 bg-red-500/20 rounded-lg">
              <Layers size={24} className="text-red-500" />
            </div>
            <div className="flex-1">
              <h3 className="font-heading text-xl font-bold text-foreground mb-1">
                Console Commands
              </h3>
              <p className="text-foreground-muted font-body text-sm mb-3">
                Network recon, nmap, security tools, and more
              </p>
              <div className="flex items-center gap-4 text-sm font-body">
                <span className="text-foreground-muted">
                  {commandCount} cards
                </span>
                <span className="text-brand-accent">
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
              ? 'border-brand-warning bg-brand-warning/10'
              : 'border-border/30 hover:border-brand-warning/50 hover:bg-surface-muted/50'
          }`}
        >
          <div className="flex items-start gap-4">
            <div className="p-3 bg-brand-warning/20 rounded-lg">
              <Hash size={24} className="text-brand-warning" />
            </div>
            <div className="flex-1">
              <h3 className="font-heading text-xl font-bold text-foreground mb-1">
                Port Numbers
              </h3>
              <p className="text-foreground-muted font-body text-sm mb-3">
                Common protocols and their port numbers
              </p>
              <div className="flex items-center gap-4 text-sm font-body">
                <span className="text-foreground-muted">
                  {portCount} cards
                </span>
                <span className="text-brand-accent">
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
