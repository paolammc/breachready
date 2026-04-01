import { AlertTriangle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface WeakAreasProps {
  areas: string[];
}

export function WeakAreas({ areas }: WeakAreasProps) {
  if (areas.length === 0) {
    return (
      <div className="bg-forest-green/10 rounded-xl p-6 border border-forest-green/20">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-forest-green/20 rounded-lg">
            <AlertTriangle size={20} className="text-forest-green" />
          </div>
          <h3 className="font-display text-lg font-bold text-pale-gray">
            No Weak Areas Yet
          </h3>
        </div>
        <p className="text-slate-gray font-body text-sm">
          Start practicing to identify areas that need more attention.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-crimson/10 rounded-xl p-6 border border-crimson/20">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-crimson/20 rounded-lg">
            <AlertTriangle size={20} className="text-crimson" />
          </div>
          <div>
            <h3 className="font-display text-lg font-bold text-pale-gray">
              Weak Areas
            </h3>
            <p className="text-sm text-slate-gray font-body">
              Focus on these to improve your score
            </p>
          </div>
        </div>
      </div>

      <ul className="space-y-2 mb-4">
        {areas.map((area, index) => (
          <li
            key={index}
            className="flex items-center gap-3 bg-deep-navy/50 rounded-lg px-4 py-3"
          >
            <span className="w-6 h-6 flex items-center justify-center bg-crimson/20 rounded-full text-crimson font-ui text-xs font-bold">
              {index + 1}
            </span>
            <span className="text-pale-gray font-body text-sm">{area}</span>
          </li>
        ))}
      </ul>

      <Link
        to="/flashcards"
        className="flex items-center justify-center gap-2 w-full py-3 bg-crimson text-white font-ui font-semibold rounded-lg hover:bg-crimson/90 transition-colors"
      >
        <span>Drill These Now</span>
        <ArrowRight size={18} />
      </Link>
    </div>
  );
}
