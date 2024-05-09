/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['apps/frontend/src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        primary: '#3490dc',
        secondary: '#ffed4a',
        error: '#e3342f',
        success: '#38c172',
        background: '#101010',
        white: '#fff',
        black: '#000',
        textColor: 'white'
      }
    }
  },
  plugins: []
};
