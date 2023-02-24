var path = require('path');

module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      '@babel/plugin-proposal-export-namespace-from',
      [
        'module-resolver',
        {
          extensions: ['.js', '.ios.js', '.android.js', '.json', '.tsx', '.ts'],
          alias: {
            'snow-valley-ui/dist': path.resolve(__dirname, '..', 'packages/snow-valley-ui/src'),
            'snow-valley-ui': path.resolve(__dirname, '..', 'packages/snow-valley-ui/src'),
            'snow-valley-ui-skia': path.resolve(__dirname, '..', 'packages/snow-valley-ui-skia/src'),
            'snow-valley-ui-skia/dist': path.resolve(__dirname, '..', 'packages/snow-valley-ui-skia/src'),
          },
        },
      ],
      'react-native-reanimated/plugin',
    ],
  };
};
