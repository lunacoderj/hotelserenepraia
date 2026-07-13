/**
 * Theme Configuration
 */
export const COLORS = {
  navy: {
    50: '#F0F2F5',
    100: '#D9DFE8',
    500: '#0F1419',
    600: '#0A0D10',
    700: '#05060A',
  },
  gold: {
    50: '#FFFBF0',
    100: '#FFF3D1',
    400: '#E0C77C',
    500: '#D4AF37',
    600: '#B8941F',
  },
  pearl: {
    50: '#FEFDFB',
    100: '#F8F7F5',
    200: '#F1EFEB',
  },
  sand: {
    50: '#FAF9F6',
    100: '#F5F1EB',
    200: '#E8DFD3',
    300: '#DCC9B3',
  },
  ocean: {
    100: '#5A8BAA',
    200: '#3F6E8F',
    400: '#2C5F7F',
    500: '#1B4D5F',
    600: '#0E3A4A',
  },
  teal: {
    400: '#2B6B7F',
    500: '#1B4D5F',
    600: '#0D3A47',
  }
} as const

export const THEME = {
  colors: COLORS,
} as const

export default THEME
