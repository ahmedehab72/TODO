import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  // Specify the paths to all of the template files in your project
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
export default config
