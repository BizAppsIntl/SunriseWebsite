
/** @type {import('tailwindcss').Config} */
const flowbite = require("flowbite-react/tailwind");

module.exports = {
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
  ],
}
