module.exports = {
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    minHeight: {
      "3/5": "60vh",
    },
    colors: {
      "vipex-orange": "#F9A339",
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
