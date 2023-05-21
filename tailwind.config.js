/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        black: '#2C3333',
        gray: '#2E4F4F',
        teal: '#0E8388',
        lightBlue: '#CBE4DE',
        light: '#F1F6F9',
      },
      fontFamily: {
        body: ['Quicksand', 'sans-serif'],
      },
      gridTemplateColumns: {
        'articles': 'repeat(auto-fill, minmax(160px, 1fr))', // for mobile
        'mdArticles': 'repeat(auto-fill, minmax(182px, 1fr))', // for larger screens
      },

    },
  },
  plugins: [],
}
