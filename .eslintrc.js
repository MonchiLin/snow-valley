module.exports = {
  root: true,
  extends: ['@react-native-community', 'prettier'],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'prettier/prettier': [
      'error',
      {
        'quoteProps': 'consistent',
        'singleQuote': true,
        'tabWidth': 2,
        'trailingComma': 'es5',
        'useTabs': false,
        'print-width': 150,
      },
    ],
  },
};
