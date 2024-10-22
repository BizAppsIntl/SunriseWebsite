
/** @type {import('tailwindcss').Config} */
const flowbite = require("flowbite-react/tailwind");
const colors = require('tailwindcss/colors')

module.exports = {
mode: 'jit',
purge: ["./src/**/*.{js,jsx,ts,tsx}"],
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    flowbite.content(),
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
        jameel: ['Jameel Noori Nastaleeq', 'sans-serif'],
      },
    },
  },
  plugins: [
    // ...
    flowbite.plugin(),
    // require('@tailwindcss/typography'),
  ],
  safelist: [
    { pattern: /^bg-/ },  // Safelist all classes that start with 'bg-'
    { pattern: /^from-/ },  // Safelist all classes that start with 'bg-'
  ],
}
