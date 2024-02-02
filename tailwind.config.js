/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "accent-white": "#ffffff",
        "accent-blue": {
          DEFAULT: "#307acf",
          50: "#f0f9fe",
          100: "#def0fb",
          200: "#c5e6f8",
          300: "#9dd7f3",
          400: "#6ec0ec",
          500: "#4ca5e5",
          600: "#378bd9",
          700: "#307acf",
          800: "#2b5fa2",
          900: "#285180",
          950: "#1d324e",
        },
        "accent-black": {
          DEFAULT: "#000000",
          50: "#f6f6f6",
          100: "#e7e7e7",
          200: "#d1d1d1",
          300: "#b0b0b0",
          400: "#888888",
          500: "#6d6d6d",
          600: "#5d5d5d",
          700: "#4f4f4f",
          800: "#454545",
          900: "#3d3d3d",
          950: "#000000",
        },
      },
    },
  },
  plugins: [],
};
