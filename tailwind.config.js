/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx}', './public/index.html'],
  theme: {
    extend: {
      fontSize: {
        10: '10px',
      },
      colors: {
        dark: {
          100: '#4B465C',
          200: '#F8F7FA',
        },
        primary: {
          main: '#246AA3',
        },
      },
    },
  },
  plugins: [],
};
