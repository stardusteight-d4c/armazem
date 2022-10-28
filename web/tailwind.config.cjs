/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {},
    // screens: {
    //   'sm': '640px',
    //   'md': '800px',
    //   'lg': '1024px',
    //   'xl': '1280px',
    //   '2xl': '1536px',
    // },
    fontFamily: {
      inter: 'Inter, sans-serif',
      poppins: 'Poppins, sans-serif',
    },
    colors: {
      transparent: 'transparent',
      white: '#FFFFFF',
      black: '#000000',
      red: '#E44242',
      green: '#15f463',
      orange: '#EB7140',
      prime: {
        purple: '#4D3BC9',
        blue: '#4B8EF3',
      },
      dusk: {
        main: '#3E3E3E',
        weak: '#A7A7A7',
      },
      dawn: {
        main: '#E1E1E1',
        weak: '#888888',
      },
      fill: {
        strong: '#1a1d1e',
        weak: '#FFFFFF',
      },
      layer: {
        heavy: '#2D3039',
        light: '#F0F0F0',
      },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
    require('tailwind-scrollbar-hide'),
  ],
}
