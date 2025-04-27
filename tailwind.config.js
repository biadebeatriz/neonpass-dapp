/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        neon: {
          blue: "#00ffff",
          pink: "#ff00ff",
          violet: "#8a2be2",
        },
        backgroundDark: "#0d0d0d",
        backgroundLight: "#1a1a1a",
      },
      fontFamily: {
        orbitron: ["Orbitron", "sans-serif"],
      },
      boxShadow: {
        neon: "0 0 5px #00ffff, 0 0 15px #ff00ff, 0 0 25px #8a2be2",
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
  },
  plugins: [],
};
