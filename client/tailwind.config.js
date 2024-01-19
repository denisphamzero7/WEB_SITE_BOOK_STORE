/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: { 
      container: {
      center: true,
      padding: '4rem'
    },
    Shadow: {
      '3xl':'0 5px 20px -10px rgba(76, 111 , 244 , 0.5)'
    }},
  },
  plugins: [],
}

