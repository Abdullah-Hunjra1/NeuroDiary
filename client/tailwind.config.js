import daisyui from 'daisyui'

@type {import('tailwindcss').Config} 
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          navbar: '#e5f3f8',
          heroBg: '#cdeaf5',
          primaryText: '#007189',
          secondaryText: '#202d34',
          activeNav: '#b4dce4',
          button: '#007189',

          primary: '#5f6FFF',
        },
        gridTemplateColumns: {
          auto: 'repeat(auto-fill, minmax(200px, 1fr))',
        },
      },
    },
    plugins: [daisyui],

    daisyui: {
    themes: [
      "light",
      "dark",
      "cupcake",
      "bumblebee",
      "emerald",
      "corporate",
      "synthwave",
      "retro",
      "cyberpunk",
      "valentine",
      "halloween",
      "garden",
      "forest",
      "aqua",
      "lofi",
      "pastel",
      "fantasy",
      "wireframe",
      "black",
      "luxury",
      "dracula",
      "cmyk",
      "autumn",
      "business",
      "acid",
      "lemonade",
      "night",
      "coffee",
      "winter",
      "dim",
      "nord",
      "sunset",
    ],
  },
  }
  