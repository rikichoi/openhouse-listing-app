const { nextui } = require("@nextui-org/react");
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    './src/**/*.{js,ts,jsx,tsx,mdx}',
      // single component styles
      "./node_modules/@nextui-org/theme/dist/components/button.js",
      // or you can use a glob pattern (multiple component styles)
      "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    ],
  theme: {
    screens: {
      xxxs: { max: "600px" },
      xxs: { max: "871px", min: "600px" },
      xs: { max: "1158px", min: "871px" },
      sm: { max: "1480px", min: "1158px" },
      md: { min: "1480px" },
      // => @media (min-width: 640px) { ... }
    },
    extend: {
      fontFamily: {
        roboto: "'Roboto', sans-serif",
        ubuntu: "'Ubuntu', sans-serif",
        inter: "'Inter', sans-serif",
        opensans: "'Open Sans', sans-serif",
        poppins: "'Poppins', sans-serif",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
