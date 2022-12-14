/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    screens: {
      xsm: '400px',
      sm: '640px',
      md: '768px',
      lg: '1040px',
      xl: '1250px',
      '2xl': '1536px',
    },
    extend: {
      animation: {
        'spin-fast': 'spin 0.8s linear infinite',
      },
      gridTemplateColumns: {
        18: 'repeat(18, minmax(0, 1fr))',
      },
      gridColumn: {
        'span-17': 'span 17 / span 17',
      },
    },
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
        blue: '#4B8BEC',
        purple: '#4D3BC9',
      },
      dusk: {
        main: '#3E3E3E',
        weak: '#A7A7A7',
      },
      dawn: {
        main: '#E1E1E1',
        weak: '#888888',
      },
      neutral: {
        main: '#9B9B9B',
        weak: '#707070',
      },
      fill: {
        strong: '#1A1D1E',
        weak: '#FFFFFF',
      },
      layer: {
        heavy: '#2E2E2E',
        light: '#F0F0F0',
      },
    },
  },

  plugins: [
    require('@tailwindcss/line-clamp'),
    require('tailwind-scrollbar-hide'),
  ],
}
