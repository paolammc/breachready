interface LogoProps {
  variant?: 'full' | 'icon';
  theme?: 'light' | 'dark';
  className?: string;
}

export function Logo({ variant = 'full', theme = 'dark', className = '' }: LogoProps) {
  const alt = 'BreachReady';
  const breachColor = theme === 'dark' ? 'text-white' : 'text-brand-primary';

  if (variant === 'icon') {
    return (
      <img
        src="/logo-icon.png"
        alt={alt}
        className={`h-9 w-9 object-contain ${className}`}
      />
    );
  }

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <img
        src="/logo-icon.png"
        alt={alt}
        className="h-10 w-10 object-contain flex-shrink-0"
      />
      <div>
        <p className="font-heading text-lg font-bold leading-tight">
          <span className={breachColor}>Breach</span>
          <span className="text-brand-accent">Ready</span>
        </p>
      </div>
    </div>
  );
}
