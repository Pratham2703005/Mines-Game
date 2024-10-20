/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens:{
        'xsm' : '500px'
      },
      colors: {
        UpBack: 'rgb(11, 17, 25)', // Custom color name
        CardColor: 'rgb(8 25 39)',
        NavBar : 'rgb(28 43 60)',
        BetSec: 'rgb(36 55 71)',
        Input: 'rgb(19 33 50)',
        BetButton: 'rgb(2 230 3)',
      },
    },
  },
  plugins: [],
}

