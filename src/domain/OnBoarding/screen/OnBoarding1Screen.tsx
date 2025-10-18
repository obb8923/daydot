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
import { useTranslation } from 'react-i18next';

type OnBoarding1ScreenProps = NativeStackNavigationProp<OnboardingStackParamList, 'Onboarding1'>;
export const OnBoarding1Screen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<OnBoarding1ScreenProps>();

  const handleNext = () => {
    navigation.navigate('Onboarding2');
  };

  return (
    <Background>
    <View className="flex-1 justify-between items-center py-12" style={{paddingHorizontal:PADDING_HORIZONTAL}}>
     <Text text={t('onboarding.welcome')} type="title1" className="mt-40 text-text text-center"/>
      <LiquidGlassButton onPress={handleNext} style={{paddingHorizontal:BUTTON_PADDING,height:BUTTON_HEIGHT,width:'auto',justifyContent:'center', alignItems:'center'}}>
        <Text text={t('app.next')} type="body3" className="text-text"/>
      </LiquidGlassButton>
    </View>
    </Background>
  )
}


