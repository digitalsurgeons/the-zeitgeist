/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: 'Source Sans Pro',
        serif: 'Playfair Display',
      },
      maxWidth: {
        '8xl': '87.5rem',
      },
    },
  },
  plugins: [],
}
