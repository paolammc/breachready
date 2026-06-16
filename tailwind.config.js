/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#0F172A',
          secondary: '#2563EB',
          accent: '#10B981',
          warning: '#F59E0B',
        },
        surface: {
          DEFAULT: 'rgb(var(--surface) / <alpha-value>)',
          elevated: 'rgb(var(--surface-elevated) / <alpha-value>)',
          muted: 'rgb(var(--surface-muted) / <alpha-value>)',
        },
        foreground: {
          DEFAULT: 'rgb(var(--foreground) / <alpha-value>)',
          muted: 'rgb(var(--foreground-muted) / <alpha-value>)',
          subtle: 'rgb(var(--foreground-subtle) / <alpha-value>)',
        },
        border: {
          DEFAULT: 'rgb(var(--border) / <alpha-value>)',
        },
        terminal: {
          bg: '#0A0E17',
          green: '#10B981',
          output: '#94A3B8',
        },
      },
      fontFamily: {
        heading: ['"IBM Plex Sans"', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      backgroundImage: {
        'tech-grid': `linear-gradient(to right, rgb(37 99 235 / 0.04) 1px, transparent 1px),
          linear-gradient(to bottom, rgb(37 99 235 / 0.04) 1px, transparent 1px)`,
        'tech-glow': 'radial-gradient(ellipse at top, rgb(37 99 235 / 0.08), transparent 60%)',
      },
      backgroundSize: {
        'tech-grid': '32px 32px',
      },
      boxShadow: {
        'tech': '0 0 0 1px rgb(var(--border) / 0.5), 0 4px 24px -4px rgb(37 99 235 / 0.08)',
        'tech-lg': '0 0 0 1px rgb(var(--border) / 0.5), 0 8px 32px -8px rgb(37 99 235 / 0.12)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
