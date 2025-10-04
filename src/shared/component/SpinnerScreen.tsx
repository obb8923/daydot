import { View, ActivityIndicator } from 'react-native';
import React from 'react';
import {Background} from '@component/Background';
import { useColorStore } from '../store/colorStore';
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
    const selectedColors = useColorStore((state) => state.selectedColors);

  return (
    <View 
          className="w-1.5 h-1.5 rounded-full"
          style={{ backgroundColor: selectedColors?.primary,
            shadowColor: selectedColors?.primary,
            shadowOffset: { width: 1, height: 1 },
            shadowOpacity: 0.2,
            shadowRadius: 3.84,
            elevation: 3,
          }}
          
    />
  );
};