module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['.'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '@': './src',
          '@components': './src/components',
          '@screen': './src/screen',
          '@hooks': './src/hooks',
          '@model': './src/model',
          '@context': './src/context',
          '@utils': './src/utils',
          '@assets': './src/assets',
          '@navigation': './src/navigation',
          '@notification': './src/notification',
          '@reducers': './src/reducers',
          '@IAM': './src/IAM',
        },
      },
    ],
    'react-native-worklets/plugin', // reanimated 4: worklets 플러그인, 반드시 마지막
  ],
};
