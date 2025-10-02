module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'], // 별칭 기준 경로
        alias: {
          '@': './src', // @ 를 src 폴더로 매핑
          '@assets': './assets',
          '@domain': './src/domain',
          '@component': './src/shared/component',
          '@constant': './src/shared/constant',
          '@libs': './src/shared/libs',
          '@store': './src/shared/store',
          '@nav': './src/shared/nav',
          '@service': './src/shared/service',
        },
      },
    ],
    'react-native-worklets/plugin',
  ],
};
