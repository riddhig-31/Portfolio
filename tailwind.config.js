/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#221F1C',
        surface: '#FFFFFF',
        raised: '#F6F1E7',
        paper: '#FAF6EE',
        accent: '#B5622A',
        accentSoft: 'rgba(181,98,42,0.10)',
        burgundy: '#9A3324',
        text: '#221F1C',
        textDim: 'rgba(34,31,28,0.6)',
        border: 'rgba(34,31,28,0.12)',
      },
      fontFamily: {
        display: ['"Fraunces"', 'serif'],
        sans: ['"Inter"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
