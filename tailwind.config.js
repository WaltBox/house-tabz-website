/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}', // Tailwind processes all your components
  ],
  theme: {
    extend: {
      colors: {
        mint: '#dff6f0', // Custom mint shade
      },
      animation: {
        shimmer: 'shimmer 3s linear infinite', // Shimmer effect
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        },
      },
    },
  },
  plugins: [],
};
