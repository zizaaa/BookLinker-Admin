/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    'node_modules/flowbite-react/lib/esm/**/*.js'
  ],
  theme: {
    extend: {
      colors:{
        'maroon':'#561C24',
        'deepred':'#6D2932',
        'sandstone':'#C7B7A3',
        'cream':'#E8D8C4'
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}

