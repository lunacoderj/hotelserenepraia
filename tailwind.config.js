/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#F0F2F5',
          100: '#D9DFE8',
          500: '#0F1419',
          600: '#0A0D10',
          700: '#05060A',
          DEFAULT: '#0F1419',
        },
        gold: {
          50: '#FFFBF0',
          100: '#FFF3D1',
          400: '#E0C77C',
          500: '#D4AF37',
          600: '#B8941F',
          DEFAULT: '#D4AF37',
        },
        pearl: {
          50: '#FEFDFB',
          100: '#F8F7F5',
          200: '#F1EFEB',
          DEFAULT: '#F8F7F5',
        },
        sand: {
          50: '#FAF9F6',
          100: '#F5F1EB',
          200: '#E8DFD3',
          300: '#DCC9B3',
          DEFAULT: '#E8DFD3',
        },
        ocean: {
          100: '#5A8BAA',
          200: '#3F6E8F',
          400: '#2C5F7F',
          500: '#1B4D5F',
          600: '#0E3A4A',
          DEFAULT: '#2C5F7F',
        },
        teal: {
          400: '#2B6B7F',
          500: '#1B4D5F',
          600: '#0D3A47',
          DEFAULT: '#1B4D5F',
        },
        warm: {
          gray: '#8B8B8B',
          light: '#C4C4C4',
          dark: '#4A4A4A',
        },
      },
      fontFamily: {
        display: ['Playfair Display', 'serif'],
        body: ['Inter', 'Sora', 'sans-serif'],
        code: ['Fira Code', 'monospace'],
      },
      fontSize: {
        'display-xl': ['72px', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }],
        'display-lg': ['56px', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '600' }],
        'display-md': ['48px', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '600' }],
        'display-sm': ['40px', { lineHeight: '1.3', fontWeight: '600' }],
        'heading-xl': ['36px', { lineHeight: '1.3', fontWeight: '600' }],
        'heading-lg': ['32px', { lineHeight: '1.3', fontWeight: '600' }],
        'heading-md': ['24px', { lineHeight: '1.4', fontWeight: '600' }],
        'heading-sm': ['20px', { lineHeight: '1.4', fontWeight: '600' }],
        'body-lg': ['18px', { lineHeight: '1.6' }],
        'body-md': ['16px', { lineHeight: '1.6' }],
        'body-sm': ['14px', { lineHeight: '1.5' }],
        'caption': ['12px', { lineHeight: '1.4' }],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'fade-out': 'fadeOut 0.4s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'slide-down': 'slideDown 0.6s ease-out',
        'scale-in': 'scaleIn 0.4s ease-out',
        'pulse-subtle': 'pulseSubtle 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
      },
      boxShadow: {
        'luxury': '0 20px 50px -20px rgba(15, 20, 25, 0.15)',
        'luxury-lg': '0 40px 80px -20px rgba(15, 20, 25, 0.2)',
        'luxury-xl': '0 60px 100px -30px rgba(15, 20, 25, 0.25)',
        'inner-light': 'inset 0 1px 2px 0 rgba(255, 255, 255, 0.1)',
      },
      transitionTimingFunction: {
        'luxury': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  plugins: [
    function({ addBase, addUtilities }) {
      addBase({
        'html': { scrollBehavior: 'smooth' },
        'body': { '@apply font-body bg-pearl text-navy': {} },
        'h1, h2, h3, h4, h5, h6': { '@apply font-display font-semibold': {} },
      })
      addUtilities({
        '.text-gradient': {
          '@apply bg-gradient-to-r from-navy via-gold to-navy bg-clip-text text-transparent': {},
        },
        '.glass': {
          '@apply bg-white/10 backdrop-blur-md border border-white/20': {},
        },
        '.luxury-border': {
          '@apply border border-gold/30': {},
        },
        '.transition-luxury': {
          '@apply transition-all duration-500 ease-luxury': {},
        },
        '.no-scrollbar': {
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        },
      })
    },
  ],
}
