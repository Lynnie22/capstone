/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pink: "#77093A",
        babypink: "#FDEBF4"
      },
      backgroundImage: {
        'workout-bg': "url('/src/assets/woman-training-weightlifting-gym.jpg')",
       
      },
      gradientColorStops: {
        'primary': '#5e034a',  // Adjust to your theme color
        'secondary': '#ffffff',
      },
    },
  },
  plugins: [],
}

