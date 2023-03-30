/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary: "#FFD90F",
        secondary: "#F7E56F",
      }
    },
  },
  plugins: [],
}
