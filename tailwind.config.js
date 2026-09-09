/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0E0C0A',
        surface: '#16130F',
        raised: '#1D1912',
        accent: '#B98D4B',
        accentSoft: 'rgba(185,141,75,0.14)',
        burgundy: '#5A2230',
        text: '#EDE7DD',
        textDim: 'rgba(237,231,221,0.58)',
        border: 'rgba(185,141,75,0.16)',
      },
      fontFamily: {
        display: ['"Fraunces"', 'serif'],
        sans: ['"Public Sans"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
