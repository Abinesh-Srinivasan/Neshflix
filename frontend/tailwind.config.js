import tailwindScrollbarHide from "tailwind-scrollbar-hide"

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        "4k": "3840px",
      },
    },
  },
  plugins: [tailwindScrollbarHide],
};
