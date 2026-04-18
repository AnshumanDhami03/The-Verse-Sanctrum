/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sanctum: {
          black: '#0a0a0a',
          darker: '#0f0f0f',
          dark: '#1a1a1a',
          burgundy: '#6b1c23',
          'burgundy-light': '#8b2c33',
          gold: '#d4a84b',
          'gold-light': '#e8c476',
          'gold-dark': '#b8923f',
          cream: '#f5f0e6',
          'cream-dark': '#e8e0d0',
          saffron: '#ff6b35',
          'saffron-dark': '#e55a2b',
        }
      },
      fontFamily: {
        'display': ['"Playfair Display"', 'serif'],
        'body': ['"Crimson Text"', 'serif'],
        'sans': ['"Inter"', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out 2s infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 20s linear infinite',
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'slide-up': 'slideUp 0.8s ease-out forwards',
        'slide-in-left': 'slideInLeft 0.8s ease-out forwards',
        'slide-in-right': 'slideInRight 0.8s ease-out forwards',
        'scale-in': 'scaleIn 0.5s ease-out forwards',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-40px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(40px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        glow: {
          '0%': { filter: 'drop-shadow(0 0 2px rgba(212, 168, 75, 0.3))' },
          '100%': { filter: 'drop-shadow(0 0 8px rgba(212, 168, 75, 0.6))' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'shimmer-gold': 'linear-gradient(90deg, transparent, rgba(212, 168, 75, 0.3), transparent)',
      },
    },
  },
  plugins: [],
}
