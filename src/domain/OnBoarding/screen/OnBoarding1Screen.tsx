import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { OnboardingStackParamList } from '@nav/Onboarding';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type OnBoarding1ScreenProps = NativeStackNavigationProp<OnboardingStackParamList, 'Onboarding1'>;
export const OnBoarding1Screen = () => {
  const navigation = useNavigation<OnBoarding1ScreenProps>();

  const handleNext = () => {
    navigation.navigate('Onboarding2');
  };

  return (
    <View className="flex-1 justify-center items-center p-5">
      <Text className="text-2xl font-bold mb-5">OnBoarding1</Text>
      <Text className="text-base text-center mb-10 text-gray-600">첫 번째 온보딩 화면입니다.</Text>
      <TouchableOpacity className="bg-blue-500 px-8 py-4 rounded-lg" onPress={handleNext}>
        <Text className="text-white text-base font-bold">다음</Text>
      </TouchableOpacity>
    </View>
  )
}


