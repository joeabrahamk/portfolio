// tailwind.config.js
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        orbitron: ['Orbitron', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        mono: ['VT323', 'monospace'],
      },
      backgroundImage: {
        'neon-grid': "linear-gradient(to right, rgba(0,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,255,255,0.05) 1px, transparent 1px)",
      },
    },
  },
  plugins: [],
}
