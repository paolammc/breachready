interface LogoProps {
  variant?: 'full' | 'icon';
  className?: string;
}

export function Logo({ variant = 'full', className = '' }: LogoProps) {
  const src = variant === 'icon' ? '/logo-icon.png' : '/logo-full.png';
  const alt = 'BreachReady';

  if (variant === 'icon') {
    return (
      <img
        src={src}
        alt={alt}
        className={`h-9 w-9 object-contain ${className}`}
      />
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={`h-10 w-auto object-contain ${className}`}
    />
  );
}
