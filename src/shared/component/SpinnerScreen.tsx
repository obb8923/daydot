import { View } from 'react-native';
import React from 'react';
import {Background} from '@component/Background';
import { useThemeStore } from '../store/themeStore';
export const SpinnerScreen = () => {
  return (
    <Background>
    <View className="flex-1 justify-center items-center">
      <Spinner />
    </View>
    </Background>
  );
};
const Spinner = () => {
    const selectedTheme = useThemeStore((state) => state.selectedTheme);

  return (
    <View 
          className="w-1.5 h-1.5 rounded-full"
          style={{ backgroundColor: selectedTheme?.primary,
            shadowColor: selectedTheme?.primary,
            shadowOffset: { width: 1, height: 1 },
            shadowOpacity: 0.2,
            shadowRadius: 3.84,
            elevation: 3,
          }}
    />
  );
};
