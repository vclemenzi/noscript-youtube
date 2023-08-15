/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        'raisin': '#0f0f0f',
        'hover': '#272727',
        'red-yt': '#ff0000',
      }
    },
  },
  plugins: [],
}
