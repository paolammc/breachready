interface LogoProps {
  variant?: 'full' | 'icon';
  className?: string;
}

export function Logo({ variant = 'full', className = '' }: LogoProps) {
  const alt = 'BreachReady';

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
          <span className="text-white">Breach</span>
          <span className="text-brand-accent">Ready</span>
        </p>
      </div>
    </div>
  );
}
