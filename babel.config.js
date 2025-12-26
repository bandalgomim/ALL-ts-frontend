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
    'react-native-reanimated/plugin', // 이 줄은 마지막에 위치해야 함
  ],
};
