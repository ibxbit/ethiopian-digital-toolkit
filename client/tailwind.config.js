/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Custom colors from previous steps
      colors: {
        'gradient-start': '#FFDAB9', // Peach
        'gradient-mid': '#FFC0CB',   // Pink
        'gradient-end': '#E6E6FA',   // Light Lavender
        'button-primary': '#a0528e', // Rich Purple/Pink
        'button-primary-hover': '#8a3f78', // Darker on hover
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'], // Or whatever font you prefer
      },
      // NEW: Adjusting spacing and font size scales for a "zoomed" effect
      spacing: {
        '0.5': '0.125rem',
        '1': '0.25rem',
        '1.5': '0.375rem',
        '2': '0.5rem',
        '2.5': '0.625rem',
        '3': '0.75rem',
        '3.5': '0.875rem',
        '4': '1rem',
        '5': '1.25rem',
        '6': '1.5rem',
        '7': '1.75rem',
        '8': '2rem',
        '9': '2.25rem',
        '10': '2.5rem',
        '11': '2.75rem',
        '12': '3rem',
        '14': '3.5rem',
        '16': '4rem',
        '20': '5rem',
        '24': '6rem',
        '28': '7rem',
        '32': '8rem',
        '36': '9rem',
        '40': '10rem',
        '44': '11rem',
        '48': '12rem',
        '52': '13rem',
        '56': '14rem',
        '60': '15rem',
        '64': '16rem',
        '72': '18rem',
        '80': '20rem',
        '96': '24rem',
        '100': '26rem', // Added for larger spacing
        '112': '28rem',
        '128': '32rem',
        '144': '36rem',
        '160': '40rem', // Even larger
      },
      fontSize: {
        'xs': '0.8rem',
        'sm': '0.9rem',
        'base': '1.1rem',
        'lg': '1.25rem',
        'xl': '1.4rem',
        '2xl': '1.6rem',
        '3xl': '1.9rem',
        '4xl': '2.4rem',
        '5xl': '3.2rem',
        '6xl': '4.2rem',
        '7xl': '5.4rem',
        '8xl': '7rem',
        '9xl': '8.5rem',
      },
    },
  },
  plugins: [],
}