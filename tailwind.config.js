/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0A0A0A',
        surface: '#141414',
        raised: '#1C1C1C',
        paper: '#F2ECDD',
        accent: '#E11B22',
        accentSoft: 'rgba(225,27,34,0.14)',
        burgundy: '#8C1015',
        text: '#F5F0E6',
        textDim: 'rgba(245,240,230,0.6)',
        border: 'rgba(245,240,230,0.14)',
      },
      fontFamily: {
        display: ['"Bebas Neue"', 'sans-serif'],
        sans: ['"Inter"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
