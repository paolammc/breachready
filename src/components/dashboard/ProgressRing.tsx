import { motion } from 'framer-motion';

interface ProgressRingProps {
  progress: number; // 0-100
  label: string;
  size?: number;
  strokeWidth?: number;
  onClick?: () => void;
}

export function ProgressRing({
  progress,
  label,
  size = 120,
  strokeWidth = 8,
  onClick,
}: ProgressRingProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center gap-2 p-4 rounded-xl hover:bg-surface-muted/50 transition-colors cursor-pointer"
    >
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="transform -rotate-90">
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            className="text-foreground-muted/20"
          />
          {/* Progress circle */}
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            className="text-brand-warning"
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1, ease: 'easeOut' }}
            style={{
              strokeDasharray: circumference,
            }}
          />
        </svg>
        {/* Center text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-heading text-2xl font-bold text-foreground">
            {Math.round(progress)}%
          </span>
        </div>
      </div>
      <span className="font-body text-sm font-medium text-foreground-muted">{label}</span>
    </button>
  );
}
