/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sage: {
          50: '#F4F7F4',
          100: '#E8EFE9',
          200: '#D4E2D6',
          300: '#BACFBE',
          400: '#94B499',
          500: '#6E9675',
          600: '#527759',
          700: '#3D5943',
          800: '#2A3F2F',
          900: '#1A291E',
        },
        olive: {
          DEFAULT: '#162A1D',
          50: '#F2F6F3',
          100: '#DEE8E0',
          200: '#BFD3C4',
          300: '#98B8A0',
          400: '#6F9779',
          500: '#4E7758',
          600: '#385940',
          700: '#27412E',
          800: '#1D3123',
          900: '#142319',
          950: '#0B150F',
        },
        warm: {
          50: '#FCFBF9',
          100: '#FAF8F3',
          200: '#F4EFE6',
          300: '#E8DFD0',
          400: '#D5C5AE',
          500: '#BAA386',
        },
        terracotta: {
          50: '#FDF7F3',
          100: '#FBEDE3',
          200: '#F7D7C1',
          300: '#EFB998',
          400: '#E39266',
          500: '#CF723D',
          600: '#B85827',
          700: '#96421B',
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      borderRadius: {
        '3xl': '1.5rem',
        '4xl': '2rem',
        'arch': '120px',
      },
      boxShadow: {
        'subtle': '0 2px 10px rgba(22, 42, 29, 0.04)',
        'card': '0 8px 30px rgba(22, 42, 29, 0.06)',
        'float': '0 16px 40px rgba(22, 42, 29, 0.08)',
        'modal': '0 25px 60px rgba(22, 42, 29, 0.18)',
      },
    },
  },
  plugins: [],
}

