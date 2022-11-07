/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      animation: {
        'spin-fast': 'spin 0.8s linear infinite',
      }
    },
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
      white: '#fff',
      black: '#000000',
      red: '#E44242',
      green: '#57db1f',
      orange: '#EB7140',
      prime: {
        purple: '#4D3BC9',
        blue: '#4B8BEC', 
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
        strong: '#252a27',
        weak: '#f1eefe',
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
