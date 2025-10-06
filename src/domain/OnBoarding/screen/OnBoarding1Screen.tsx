import { View, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { OnboardingStackParamList } from '@nav/Onboarding';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {Background} from '@component/Background';
import {Text} from '@component/Text';
import { LiquidGlassButton } from '@/shared/component/LiquidGlassButton';
import {PADDING_HORIZONTAL} from '@/shared/constant/layout';
import {BUTTON_HEIGHT,BUTTON_PADDING} from '@/shared/constant/layout';
type OnBoarding1ScreenProps = NativeStackNavigationProp<OnboardingStackParamList, 'Onboarding1'>;
export const OnBoarding1Screen = () => {
  const navigation = useNavigation<OnBoarding1ScreenProps>();

  const handleNext = () => {
    navigation.navigate('Onboarding2');
  };

  return (
    <Background>
    <View className="flex-1 justify-between items-center py-12" style={{paddingHorizontal:PADDING_HORIZONTAL}}>
     <Text text={`당신의 일생은\n수많은 하루의 조각으로\n완성됩니다.`} type="title1" className="mt-40 text-center"/>
      <LiquidGlassButton onPress={handleNext} style={{paddingHorizontal:BUTTON_PADDING,height:BUTTON_HEIGHT,width:'auto',justifyContent:'center', alignItems:'center'}}>
        <Text text="다음" type="body3"/>
      </LiquidGlassButton>
    </View>
    </Background>
  )
}


