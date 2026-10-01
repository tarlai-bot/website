/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#44273a",
          dark: "#331d2b",
          hover: "#5a3550",
          light: "#6b4566",
        },
        secondary: {
          DEFAULT: "#ef7622",
          dark: "#d66819",
          hover: "#d66819",
          light: "#f28e45",
        },
        accent: {
          DEFAULT: "#fedd3d",
          hover: "#fdd520",
          light: "#fee76a",
        },
        success: "#10b981",
        warning: "#f59e0b",
        danger: "#ef4444",
        info: "#3b82f6",
      },
      fontFamily: {
        sans: ['"ejeAlamer"', "system-ui", "-apple-system", "sans-serif"],
      },
    },
  },
  plugins: [],
};
