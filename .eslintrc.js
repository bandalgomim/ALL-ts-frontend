module.exports = {
  root: true,
  extends: [
    '@react-native',               // 기본 React Native 규칙
    'plugin:prettier/recommended'  // Prettier 규칙 적용
  ],
  plugins: ['prettier'],            // Prettier 플러그인 추가
  rules: {
    'prettier/prettier': 'error',   // Prettier 규칙을 ESLint 에러로 표시
  },
};
