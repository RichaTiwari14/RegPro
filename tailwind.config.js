/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Logo palette
        navy: {
          50: '#EEF3FA',
          100: '#D9E3F2',
          200: '#B3C6E3',
          300: '#7F9DCC',
          400: '#4C72B0',
          500: '#2A5193',
          600: '#1A3D78',
          700: '#0F2F63',
          800: '#0B2A5B',
          900: '#081F44',
          950: '#05142D',
        },
        gold: {
          50: '#FDF8E9',
          100: '#FAEEC6',
          200: '#F4DC8C',
          300: '#EDC655',
          400: '#E3B32F',
          500: '#D6A21F',
          600: '#B8851A',
          700: '#93661A',
          800: '#7A531C',
          900: '#67451D',
        },
        // Atmospheric "sky / mist" palette from the cinematic landing video
        mist: {
          50: '#F5F7FA',
          100: '#EDF1F5',
          200: '#DFE6EC',
          300: '#CBD6E0',
          400: '#AEBDCB',
          500: '#8C9FB2',
        },
        ink: '#1F2D44',
        surface: '#E6ECF1',
      },
      fontFamily: {
        sans: ['"Helvetica Neue ME"', '"Helvetica Neue"', 'Helvetica', 'Arial', 'sans-serif'],
        display: ['"Helvetica Neue ME"', '"Helvetica Neue"', 'Helvetica', 'Arial', 'sans-serif'],
      },
      keyframes: {
        marquee: { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-100%)' } },
        'marquee-reverse': { from: { transform: 'translateX(-100%)' }, to: { transform: 'translateX(0)' } },
        'marquee-half': { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-50%)' } },
        'ping-slow': { '0%': { transform: 'scale(1)', opacity: '0.7' }, '80%,100%': { transform: 'scale(1.6)', opacity: '0' } },
        drift: { from: { transform: 'translate3d(-6%,0,0)' }, to: { transform: 'translate3d(6%,-3%,0)' } },
      },
      animation: {
        marquee: 'marquee 70s linear infinite',
        'marquee-reverse': 'marquee-reverse 70s linear infinite',
        'marquee-slow': 'marquee-half 50s linear infinite',
        'ping-slow': 'ping-slow 2.4s cubic-bezier(0,0,0.2,1) infinite',
        drift: 'drift 28s ease-in-out infinite alternate',
        'drift-slow': 'drift 40s ease-in-out infinite alternate-reverse',
      },
    },
  },
  plugins: [],
};
