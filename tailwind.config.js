/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        indigo: {
          600: "#4F46E5", // Add the indigo color used in your navbar
        },
        gray: {
          200: "#E5E7EB", // Add the gray color used in your navbar
          300: "#D1D5DB", // Add the hover gray color
          700: "#374151", // Add the text gray color
        },
      },
    },
  },
  plugins: [],
};