/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors:{
        primary:"#FE0000",
        secondary:"#00040f",
        dimWhite: "rgba(255, 255, 255, 0.7)",
        dimBlue: "rgba(9, 151, 124, 0.1)",
        fadedBeige:"#FCF5ED"
      }
    },
  },
  plugins: [],
}

