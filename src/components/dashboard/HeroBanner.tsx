import { useState } from 'react';
import { useBreachReadyStore } from '../../store/useBreachReadyStore';
import { Calendar, Target, Edit2, Check, X } from 'lucide-react';

interface HeroBannerProps {
  overallProgress: number;
}

export function HeroBanner({ overallProgress }: HeroBannerProps) {
  const { targetExamDate, setTargetExamDate } = useBreachReadyStore();
  const [isEditing, setIsEditing] = useState(false);
  const [dateInput, setDateInput] = useState(targetExamDate || '');

  const daysUntilExam = targetExamDate
    ? Math.ceil(
        (new Date(targetExamDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
      )
    : null;

  const handleSaveDate = () => {
    if (dateInput) {
      setTargetExamDate(dateInput);
    }
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setDateInput(targetExamDate || '');
    setIsEditing(false);
  };

  return (
    <div className="relative overflow-hidden rounded-2xl p-6 lg:p-8 border border-brand-secondary/20 bg-gradient-to-br from-brand-primary via-brand-primary to-brand-secondary/40 shadow-tech-lg">
      <div className="absolute inset-0 bg-tech-grid opacity-30 pointer-events-none" />
      <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div>
          <p className="overline text-brand-accent mb-2">Security+ SY0-701</p>
          <h2 className="font-heading text-2xl lg:text-3xl font-bold text-white mb-2">
            Your Certification Mission
          </h2>
          <p className="subtitle text-white/60">
            Passing Score: 750/900
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex items-center gap-3 bg-white/5 backdrop-blur-sm px-4 py-3 rounded-xl border border-white/10">
            <Calendar className="text-brand-warning" size={20} />
            {isEditing ? (
              <div className="flex items-center gap-2">
                <input
                  type="date"
                  value={dateInput}
                  onChange={(e) => setDateInput(e.target.value)}
                  className="bg-transparent text-white font-body text-sm border-b border-brand-warning focus:outline-none"
                />
                <button
                  onClick={handleSaveDate}
                  className="text-brand-accent hover:text-green-400 p-1"
                  aria-label="Save date"
                >
                  <Check size={16} />
                </button>
                <button
                  onClick={handleCancelEdit}
                  className="text-red-500 hover:text-red-400 p-1"
                  aria-label="Cancel"
                >
                  <X size={16} />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                {daysUntilExam !== null ? (
                  <div>
                    <span className="font-heading text-xl font-bold text-brand-warning">
                      {daysUntilExam}
                    </span>
                    <span className="text-white/60 font-body text-sm ml-1">
                      days left
                    </span>
                  </div>
                ) : (
                  <span className="text-white/60 font-body text-sm">
                    Set exam date
                  </span>
                )}
                <button
                  onClick={() => setIsEditing(true)}
                  className="text-white/60 hover:text-white p-1"
                  aria-label="Edit exam date"
                >
                  <Edit2 size={14} />
                </button>
              </div>
            )}
          </div>

          {/* Overall Progress */}
          <div className="flex items-center gap-3 bg-white/5 backdrop-blur-sm px-4 py-3 rounded-xl border border-white/10">
            <Target className="text-brand-accent" size={20} />
            <div>
              <span className="font-heading text-xl font-bold text-brand-accent">
                {Math.round(overallProgress)}%
              </span>
              <span className="text-white/60 font-body text-sm ml-1">complete</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
