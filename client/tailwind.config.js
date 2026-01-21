// /** @type {import('tailwindcss').Config} */
// module.exports = {
//         content: [
//                 "./src/**/*.{js,jsx,ts,tsx}",
//                 "./public/index.html",
//                 "./index.html",
//         ],
//         theme: {
//                 extend: {
//                         colors: {
//                                 border: 'var(--border)', // This uses your CSS variable
//                                 background: 'var(--background)',
//                                 foreground: 'var(--foreground)',
//                                 // Add any other custom colors you use, e.g.:
//                                 card: 'var(--card)',
//                                 'card-foreground': 'var(--card-foreground)',
//                         },
//                 },
//                 outline: {
//                         DEFAULT: 'var(--outline)',
//                 },
//                 ring: {
//                         DEFAULT: 'var(--ring)',
//                 },
//         },
//         plugins: [],
//         darkMode: 'class', // Enable dark mode
// }
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

