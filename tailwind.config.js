/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Deep olive — headings, primary buttons, dark sections
        olive: {
          50: '#F3F5EE',
          100: '#E4E9DA',
          200: '#C9D2B5',
          300: '#A7B38A',
          400: '#83915F',
          500: '#65733F',
          600: '#4F5B31',
          700: '#414B29',
          800: '#353F22',
          900: '#283019',
          950: '#1A2010',
        },
        // Sage blue — accents, italic highlights, icons
        sage: {
          50: '#F1F5F5',
          100: '#E1EAEA',
          200: '#C6D6D7',
          300: '#A6BFC1',
          400: '#88A7AA',
          500: '#6E9094',
          600: '#587A7E',
          700: '#486468',
          800: '#3C5255',
          900: '#334447',
        },
        // Soft warm neutrals
        mist: {
          50: '#FCFCFA',
          100: '#F7F7F3',
          200: '#ECEDE6',
          300: '#DFE1D8',
          400: '#C5C9BC',
          500: '#979C8E',
        },
        ink: '#24291C',
        muted: '#5D6455',
        subtle: '#878D7E',
        surface: '#F7F7F3',
        cream: '#F7F7F2',
        'soft-white': '#FBFBF8',
      },
      fontFamily: {
        sans: ['Manrope', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        script: ['"Cormorant Garamond"', 'Georgia', 'serif'],
      },
      keyframes: {
        marquee: { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-100%)' } },
        'marquee-reverse': { from: { transform: 'translateX(-100%)' }, to: { transform: 'translateX(0)' } },
        'marquee-half': { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-50%)' } },
        'ping-slow': { '0%': { transform: 'scale(1)', opacity: '0.7' }, '80%,100%': { transform: 'scale(1.6)', opacity: '0' } },
        'leaf-sway': { '0%,100%': { transform: 'translateY(0) rotate(var(--r,0deg))' }, '50%': { transform: 'translateY(-10px) rotate(calc(var(--r,0deg) + 5deg))' } },
        drift: { from: { transform: 'translate3d(-6%,0,0)' }, to: { transform: 'translate3d(6%,-3%,0)' } },
      },
      animation: {
        marquee: 'marquee 70s linear infinite',
        'marquee-reverse': 'marquee-reverse 70s linear infinite',
        'marquee-slow': 'marquee-half 50s linear infinite',
        'ping-slow': 'ping-slow 2.4s cubic-bezier(0,0,0.2,1) infinite',
        'leaf-sway': 'leaf-sway 6s ease-in-out infinite',
        drift: 'drift 28s ease-in-out infinite alternate',
        'drift-slow': 'drift 40s ease-in-out infinite alternate-reverse',
      },
    },
  },
  plugins: [],
};
