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
        // Brand Colors from PRD
        'deep-navy': '#0D1B2A',      // Hero - Primary background, headers, nav
        'forest-green': '#1B4332',   // Sage - Glossary, explanation panels, success states
        'crimson': '#9B2335',        // Outlaw - Console mode, alerts, wrong answers
        'amber-gold': '#D4870A',     // All Three - XP badges, highlights, CTA buttons
        'pale-gray': '#F7F9FC',      // Neutral - Card backgrounds, content areas
        'slate-gray': '#4A5568',     // Neutral - Body text, secondary labels
        'terminal-bg': '#0A0E17',    // Console Simulator background
        'terminal-green': '#00FF41', // Console Simulator user input
        'terminal-output': '#A8B2D8', // Console Simulator output/hints
      },
      fontFamily: {
        'display': ['Playfair Display', 'serif'],  // Primary Display - App name, section headers
        'body': ['Lora', 'serif'],                  // Body / UI - Card descriptions, explanations
        'mono': ['JetBrains Mono', 'monospace'],   // Monospace - Console simulator, code
        'ui': ['Inter', 'sans-serif'],             // UI Labels - Buttons, badges, navigation
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
