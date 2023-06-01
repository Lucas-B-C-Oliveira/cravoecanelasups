/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './node_modules/flowbite-react/**/*.js',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/tailwind-datepicker-react/dist/**/*.js',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(#ECEC18 35%, #3D3D37 40%)',
      },
      colors: {
        'yellow-cc': {
          200: '#FFFFEB',
          500: '#EDED5F',
          650: '#C6C628',
        },
        'gray-yellow-cc': {
          900: '#141412',
          850: '#292925',
          800: '#3D3D37',
          750: '#52524A',
          700: '#66665C',
          600: '#8F8F81',
          550: '#A3A393',
          500: '#B8B8A6',
          350: '#F0F0D8',
          250: '#FAFAE0',
        },
        'hard-yellow-cc': {
          600: '#CCCC18',
          500: '#ECEC18',
          100: '#FCFFB4',
        },
        'black-slider-cc': {
          700: '#0000007a',
        },
        'color-product-shadow-cc': '#14141270',
        'color-products-sidebar-shadow-cc': '#14141250',
        'color-button-more-info-shadow-cc': '#29292550',
        'color-select-variant-product-options-cc': '#14141260',
        'color-slider-price-thumb-cc': '#14141240',
        'color-checkout-tables-cc': '#14141260',
        'color-inputs-checkout-cc': '#14141260',
        'gradient-yellow-cc': {
          650: '#D4D400',
          600: '#CCCC18',
          500: '#FFFF01',
          450: '#FFFF00',
          0: '#FFFFFF',
        },
        'hover-gradient-yellow-cc': {
          650: '#E1E162',
          450: '#FFFF90',
        },
      },
      boxShadow: {
        'product-cc': '0px 2px 7px -3px',
        'button-more-info-cc': '0px 1px 6px -2px',
        'select-variant-product-options-cc': '0px 2px 6px -2px',
        'products-sidebar-cc': '0px 1px 6px -2px',
        'slider-price-thumb-cc': '0px 1px 6px -2px',
        'checkout-tables-cc': '0px 1px 6px -2px',
        'inputs-checkouts-cc': '0px 2px 6px -2px',
      },
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [require('@tailwindcss/forms'), require('flowbite/plugin')],
}
