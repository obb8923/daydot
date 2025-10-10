/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        'p-regular': ['Pretendard-Regular'],
        'p-semibold': ['Pretendard-SemiBold'],
        'p-extrabold': ['Pretendard-ExtraBold'],
        'p-bold': ['Pretendard-Bold'],
        'p-medium': ['Pretendard-Medium'],
        'p-black': ['Pretendard-Black'],
      },
      colors: {
        'primary': 'var(--color-primary)',
        'background': 'var(--color-background)',
        'text': 'var(--color-text)',
        'caption': 'var(--color-caption)',
        'white': '#fafafa',
        'black': '#212121',
        'realblack': '#000000',
        'gray100': '#E6E6E6',
        'gray200': '#CCCCCC',
        'gray300': '#B3B3B3',
        'gray400': '#999999',
        'gray500': '#808080',
        'gray600': '#666666',
        'gray700': '#4D4D4D',
        'gray800': '#333333',
        'gray900': '#1A1A1A',
        'gray000': '#d9d9d9',
      },

    },
  },
  plugins: [],
}; 