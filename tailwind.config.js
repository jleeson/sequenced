/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "accent-white": "#ffffff",
        "accent-blue": "#307acf",
        "accent-gray": "#404244",
      },
    },
  },
  plugins: [],
};
