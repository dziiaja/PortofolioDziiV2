export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#ff3d4d',
          50: '#fff1f2',
          100: '#ffe4e6',
          200: '#ffccd1',
          300: '#ffa3ad',
          400: '#ff6d7e',
          500: '#ff3d4d', // Your primary color
          600: '#ed1c2e',
          700: '#c91124',
          800: '#a61124',
          900: '#8c1225',
          950: '#4c0512',
        }
      }
    },
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    }
  },
  plugins: [],
}