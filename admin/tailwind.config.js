/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors:{
        primary:"#FE0000",
        dimWhite:"#f6f5f7",
        secondary:"#00040f", 
        dimGray: "#eee",
      }
    },
  },
  plugins: [],
}

