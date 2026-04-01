import { Terminal } from 'lucide-react';

export function Console() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <div className="p-4 bg-crimson/20 rounded-2xl mb-4">
        <Terminal size={48} className="text-crimson" />
      </div>
      <h1 className="font-display text-3xl font-bold text-pale-gray mb-2">
        Console Simulator
      </h1>
      <p className="text-slate-gray font-body max-w-md">
        Terminal simulator coming soon. Practice typing real commands in a realistic
        dark-themed terminal environment with real-time validation.
      </p>
    </div>
  );
}
