/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode:false,
  theme: {

    extend: {},
  },

  plugins: [
    require (
        "daisyui"
    )

  ],
  daisyui: {
    styled: true,
    themes: [false],
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: "",
    darkTheme: "light",
  },
}
