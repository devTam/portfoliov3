import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Background colors
        'bg-primary': '#0a0a0a',
        'bg-secondary': '#111111',
        'bg-tertiary': '#1a1a1a',
        
        // Accent colors
        'accent-primary': '#00ff41',
        'accent-secondary': '#00d4ff',
        'accent-tertiary': '#ff0080',
        
        // Text colors
        'text-primary': '#ffffff',
        'text-secondary': '#b3b3b3',
        'text-tertiary': '#666666',
        'text-accent': '#00ff41',
        
        // Semantic colors
        'success': '#00ff41',
        'warning': '#ffaa00',
        'error': '#ff0040',
        'info': '#00d4ff',
        
        // Globe colors
        'globe-ocean': '#0a1a2e',
        'globe-land': '#1a2a3a',
        'marker-glow': '#00ff41',
        'beam-color': '#00d4ff',
      },
      fontFamily: {
        mono: ['var(--font-mono)', 'monospace'],
        sans: ['var(--font-sans)', 'sans-serif'],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      boxShadow: {
        'glow-green': '0 0 20px rgba(0, 255, 65, 0.5)',
        'glow-cyan': '0 0 20px rgba(0, 212, 255, 0.5)',
        'glow-pink': '0 0 20px rgba(255, 0, 128, 0.5)',
        'glow-green-lg': '0 0 40px rgba(0, 255, 65, 0.7)',
      },
      textShadow: {
        'glow-green': '0 0 10px rgba(0, 255, 65, 0.5)',
        'glow-cyan': '0 0 10px rgba(0, 212, 255, 0.5)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        glow: {
          '0%': { opacity: '0.5' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
export default config
