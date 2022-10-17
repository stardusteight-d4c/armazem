/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
    fontFamily: {
      inter: 'Inter, sans-serif',
      poppins: 'Poppins, sans-serif',
    },
    colors: {
      primary: {
        main: '#4D3BC9',
        shade: {
          100: '#CEC8FB',
          400: '#777392',
        },
        matte: {
          XE: '#20232C',
          XS: '#232336',
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
            XE: '#1D2026',
            XS: '#1C1F25',
          },
        },
      },
    },
  },
  plugins: [],
}
