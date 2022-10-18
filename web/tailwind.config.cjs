/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
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
      primary: {
        main: '#4D3BC9',
        shade: {
          100: '#CEC8FB',
          400: '#777392',
        },
        matte: {
          XE: '#20232C',
          XS: '#232336',
          XZ: '#242731',
          YE: '#362F7A',
          YS: '#4336A0',
        },
      },
      secondary: {
        main: '#0249C7',
        shade: {
          100: '#9DD5E9',
          400: '#4B8BEC',
        },
      },
      dark: {
        gray: {
          main: '#1B1C20',
          shade: {
            100: '#7E7C8D',
            400: '#34363D',
          },
          matte: {
            YA: '#737581',
            YS: '#2c2f38',
            XE: '#1D2026',
            XS: '#1C1F25',
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
}
