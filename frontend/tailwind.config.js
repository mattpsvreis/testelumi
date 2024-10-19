/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        light: {
          primary: '#00ffcc',
          secondary: '#47ffda',
          accent: '#00c3ff',
          background: '#ebebeb',
          text: '#151515',
          placeholder: '#a0a0a0',
          foreground: '#333333',
          border: '#00c3ff',
        },
        dark: {
          primary: '#00ffcc',
          secondary: '#00b893',
          accent: '#00c3ff',
          background: '#151515',
          text: '#eae9fc',
          placeholder: '#666666',
          foreground: '#999999',
          border: '#00c3ff',
        },
      },
    },
  },
  plugins: [],
};
