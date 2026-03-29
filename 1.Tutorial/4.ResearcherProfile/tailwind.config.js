/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ['"Crimson Pro"', 'Georgia', 'serif'],
        body: ['"Atkinson Hyperlegible"', 'system-ui', 'sans-serif'],
      },
      colors: {
        ink: '#09090B',
        muted: '#3F3F46',
        accent: '#2563EB',
        surface: '#FAFAFA',
      },
    },
  },
  plugins: [],
}
