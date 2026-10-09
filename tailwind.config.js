/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Brand palette taken from the Regpro logo.
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
        ink: '#2F2E30',
        surface: '#F5F6F8',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Montserrat', 'Inter', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        marquee: { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-100%)' } },
        'marquee-reverse': { from: { transform: 'translateX(-100%)' }, to: { transform: 'translateX(0)' } },
        'marquee-half': { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-50%)' } },
        'ping-slow': { '0%': { transform: 'scale(1)', opacity: '0.7' }, '80%,100%': { transform: 'scale(1.6)', opacity: '0' } },
      },
      animation: {
        marquee: 'marquee 60s linear infinite',
        'marquee-reverse': 'marquee-reverse 60s linear infinite',
        'marquee-slow': 'marquee-half 40s linear infinite',
        'ping-slow': 'ping-slow 2.4s cubic-bezier(0,0,0.2,1) infinite',
      },
    },
  },
  plugins: [],
};
