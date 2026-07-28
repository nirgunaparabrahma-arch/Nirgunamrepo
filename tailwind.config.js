/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "primary": "#100603",
        "primary-container": "#2a1d17",
        "secondary": "#8e4e05",
        "secondary-container": "#fca95d",
        "surface": "#fdf9f1",
        "surface-dim": "#dddad2",
        "surface-bright": "#fdf9f1",
        "surface-container-lowest": "#ffffff",
        "surface-container-low": "#f7f3eb",
        "surface-container": "#f1ede6",
        "surface-container-high": "#ece8e0",
        "surface-container-highest": "#e6e2da",
        "on-surface": "#1c1c17",
        "on-surface-variant": "#4e4541",
        "outline": "#807570",
        "outline-variant": "#d2c4be",
        "inverse-surface": "#31302b",
        "on-primary": "#ffffff",
        "primary-fixed": "#f6ded4",
        "on-primary-fixed": "#251913",
      },
      borderRadius: {
        "button": "0.5rem",
        "card": "24px",
        "image": "28px",
        "2xl": "24px",
      },
      fontFamily: {
        "display": ["EB Garamond", "serif"],
        "body": ["Inter", "sans-serif"],
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        }
      },
      animation: {
        marquee: 'marquee 40s linear infinite',
      },
      spacing: {
        "section-padding": "140px",
        "section-gap": "160px",
      }
    },
  },
  plugins: [],
}
