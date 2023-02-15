const nativewind = require('nativewind/tailwind');

module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
  presets: [nativewind],
};
