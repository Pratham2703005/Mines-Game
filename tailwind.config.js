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
      boxShadow:{
        customBox : '0 1px 3px 0 rgba(0,0,0,2), 0 1px 2px 0 rgba(0,0,0,12)'
      }
    },
  },
  plugins: [],
}

