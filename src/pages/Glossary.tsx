import { BookOpen } from 'lucide-react';

export function Glossary() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <div className="p-4 bg-blue-500/20 rounded-2xl mb-4">
        <BookOpen size={48} className="text-blue-400" />
      </div>
      <h1 className="font-display text-3xl font-bold text-pale-gray mb-2">
        Glossary
      </h1>
      <p className="text-slate-gray font-body max-w-md">
        Security terms glossary coming soon. Browse and quiz yourself on 150+
        terms across all five exam domains.
      </p>
    </div>
  );
}
