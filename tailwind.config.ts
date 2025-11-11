import type { Config } from 'tailwindcss';

export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './src/layouts/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/pages/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1E90FF',
        secondary: '#e63946',
        accent: '#9CCDDC',
        light: '#f8f9fa',
        dark: '#222',
        'footer-bg': '#1e5a7d',
        btn: '#9CCDDC',
        'highlight': '#ffbe33',
      },
    },
  },
  plugins: [],
} satisfies Config;