/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        forest: {
          50: '#EDF3EE',
          100: '#D5E3D8',
          200: '#A9C4B2',
          300: '#6F9B80',
          400: '#3F7455',
          500: '#245C40',
          600: '#123D2A',
          700: '#0F3423',
          800: '#0B2419',
          900: '#071A11',
        },
        gold: {
          50: '#FBF7EE',
          100: '#F5EBD4',
          200: '#E8D5A8',
          300: '#D9BE85',
          400: '#C6A96B',
          500: '#B3944F',
          600: '#96793C',
          700: '#755D2F',
          800: '#544223',
          900: '#372B18',
        },
        ivory: '#F7F5EF',
        charcoal: '#202823',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
