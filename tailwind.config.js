/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      maxWidth: {
        cards: "calc(100vw - 80px)",
      },
      gridTemplateColumns: {
        cards: "repeat(auto-fill, 200px)",
      },
      gridAutoRows: {
        cards: "200px",
      },
      backgroundImage: {
        cardCover: "url(../public/img/cover.png)",
      },
    },
  },
  plugins: [],
};
