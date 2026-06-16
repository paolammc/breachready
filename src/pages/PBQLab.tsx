import { FlaskConical } from 'lucide-react';

export function PBQLab() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <div className="p-4 bg-brand-accent/20 rounded-2xl mb-4">
        <FlaskConical size={48} className="text-brand-accent" />
      </div>
      <h1 className="font-heading text-3xl font-bold text-foreground mb-2">
        PBQ Lab
      </h1>
      <p className="text-foreground-muted font-body max-w-md">
        Performance-Based Questions coming soon. Work through 10 full exam scenarios
        with step-by-step grading and detailed explanations.
      </p>
    </div>
  );
}
