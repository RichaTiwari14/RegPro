/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Deep forest green — primary buttons, accents, the split band
        olive: {
          50: '#EEF2EE',
          100: '#DCE4DC',
          200: '#B9C9BB',
          300: '#8FA894',
          400: '#64826B',
          500: '#476650',
          600: '#3A5742',
          700: '#334E39',
          800: '#2C4432',
          900: '#22362A',
          950: '#16241C',
        },
        // Soft sage — leaves, icons, quiet details
        sage: {
          50: '#F3F4F0',
          100: '#E6E9E1',
          200: '#CDD3C6',
          300: '#B0B9A6',
          400: '#97A38B',
          500: '#7E8E74',
          600: '#66755D',
          700: '#525F4B',
          800: '#424C3D',
          900: '#373F33',
        },
        // Warm beige neutrals
        mist: {
          50: '#FBF9F5',
          100: '#F6F2EB',
          200: '#EDE6DB',
          300: '#E2D9CB',
          400: '#CBBFAE',
          500: '#A3998A',
        },
        ink: '#1E221E',
        muted: '#62665E',
        subtle: '#8E9087',
        surface: '#F6F2EB',
        cream: '#F4EFE7',
        'soft-white': '#FBF9F5',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        script: ['Caveat', 'cursive'],
      },
      keyframes: {
        marquee: { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-100%)' } },
        'marquee-reverse': { from: { transform: 'translateX(-100%)' }, to: { transform: 'translateX(0)' } },
        'marquee-half': { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-50%)' } },
        'ping-slow': { '0%': { transform: 'scale(1)', opacity: '0.7' }, '80%,100%': { transform: 'scale(1.6)', opacity: '0' } },
        'leaf-sway': { '0%,100%': { transform: 'translateY(0) rotate(var(--r,0deg))' }, '50%': { transform: 'translateY(-10px) rotate(calc(var(--r,0deg) + 5deg))' } },
        'spin-slow': { to: { transform: 'rotate(360deg)' } },
        drift: { from: { transform: 'translate3d(-6%,0,0)' }, to: { transform: 'translate3d(6%,-3%,0)' } },
      },
      animation: {
        marquee: 'marquee 70s linear infinite',
        'marquee-reverse': 'marquee-reverse 70s linear infinite',
        'marquee-slow': 'marquee-half 50s linear infinite',
        'ping-slow': 'ping-slow 2.4s cubic-bezier(0,0,0.2,1) infinite',
        'leaf-sway': 'leaf-sway 6s ease-in-out infinite',
        'spin-slow': 'spin-slow 24s linear infinite',
        drift: 'drift 28s ease-in-out infinite alternate',
        'drift-slow': 'drift 40s ease-in-out infinite alternate-reverse',
      },
    },
  },
  plugins: [],
};
