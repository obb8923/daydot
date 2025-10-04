import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Background } from '@component/Background'
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '@nav/App';
import { LiquidGlassView } from '@/shared/component/LiquidGlassView';
import { BOTTOM_NAVIGATION_HEIGHT, PADDING_HORIZONTAL } from '@/shared/constant/layout';
import ChevronLeftIcon from '@assets/svg/ChevronLeft.svg';
type SettingScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;
export const SettingScreen = () => {
  const navigation = useNavigation<SettingScreenNavigationProp>();
  return (
    <Background>
      <View className="flex-1 justify-center items-center p-5">
        <View className="w-full flex-row">
        <LiquidGlassView style={{
          height:BOTTOM_NAVIGATION_HEIGHT,
          width:BOTTOM_NAVIGATION_HEIGHT,
          borderRadius:20,
          justifyContent:'center',
          alignItems:'center',
          padding:PADDING_HORIZONTAL/2,
          }}>
          <TouchableOpacity 
          onPress={() => navigation.goBack()}
          style={{height:BOTTOM_NAVIGATION_HEIGHT-10,width:BOTTOM_NAVIGATION_HEIGHT-10,borderRadius:BOTTOM_NAVIGATION_HEIGHT/4,justifyContent:'center',alignItems:'center'}}>
          <ChevronLeftIcon width={10} height={15} color={'white'}/>
          </TouchableOpacity>
      </LiquidGlassView>
        </View>
      </View>
    </Background>
  )
}