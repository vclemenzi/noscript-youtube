/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        'raisin': '#242331',
        'coral': '#FF8552',
        'whitex': '#FBFCFF',
        'saffron': '#FAC748',
      }
    },
  },
  plugins: [],
}
