/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    './src/styles/global.css'
  ],
  theme: {
    extend: {},
  },
  plugins: [require('tailwind-scrollbar-hide')],
}

