const nativewind = require('nativewind/tailwind');

module.exports = {
  content: ['../src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
  presets: [nativewind],
};
