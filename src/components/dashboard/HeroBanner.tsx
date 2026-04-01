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
    <div className="bg-gradient-to-r from-deep-navy via-deep-navy to-forest-green/30 rounded-2xl p-6 lg:p-8 border border-slate-gray/20">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        {/* Left: Mission Title */}
        <div>
          <h2 className="font-display text-2xl lg:text-3xl font-bold text-pale-gray mb-2">
            Your Certification Mission
          </h2>
          <p className="font-body text-slate-gray">
            CompTIA Security+ SY0-701 | Passing Score: 750/900
          </p>
        </div>

        {/* Right: Exam Date & Progress */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          {/* Exam Date */}
          <div className="flex items-center gap-3 bg-deep-navy/50 px-4 py-3 rounded-xl border border-slate-gray/20">
            <Calendar className="text-amber-gold" size={20} />
            {isEditing ? (
              <div className="flex items-center gap-2">
                <input
                  type="date"
                  value={dateInput}
                  onChange={(e) => setDateInput(e.target.value)}
                  className="bg-transparent text-pale-gray font-ui text-sm border-b border-amber-gold focus:outline-none"
                />
                <button
                  onClick={handleSaveDate}
                  className="text-forest-green hover:text-green-400 p-1"
                  aria-label="Save date"
                >
                  <Check size={16} />
                </button>
                <button
                  onClick={handleCancelEdit}
                  className="text-crimson hover:text-red-400 p-1"
                  aria-label="Cancel"
                >
                  <X size={16} />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                {daysUntilExam !== null ? (
                  <div>
                    <span className="font-display text-xl font-bold text-amber-gold">
                      {daysUntilExam}
                    </span>
                    <span className="text-slate-gray font-ui text-sm ml-1">
                      days left
                    </span>
                  </div>
                ) : (
                  <span className="text-slate-gray font-ui text-sm">
                    Set exam date
                  </span>
                )}
                <button
                  onClick={() => setIsEditing(true)}
                  className="text-slate-gray hover:text-pale-gray p-1"
                  aria-label="Edit exam date"
                >
                  <Edit2 size={14} />
                </button>
              </div>
            )}
          </div>

          {/* Overall Progress */}
          <div className="flex items-center gap-3 bg-deep-navy/50 px-4 py-3 rounded-xl border border-slate-gray/20">
            <Target className="text-forest-green" size={20} />
            <div>
              <span className="font-display text-xl font-bold text-forest-green">
                {Math.round(overallProgress)}%
              </span>
              <span className="text-slate-gray font-ui text-sm ml-1">complete</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
