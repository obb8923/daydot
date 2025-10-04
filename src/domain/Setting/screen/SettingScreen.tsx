import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Background } from '@component/Background'
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '@nav/App';
import { LiquidGlassView } from '@/shared/component/LiquidGlassView';
import { BUTTON_HEIGHT, PADDING_HORIZONTAL } from '@/shared/constant/layout';
import ChevronLeftIcon from '@assets/svg/ChevronLeft.svg';
import { LiquidGlassButton } from '@/shared/component/LiquidGlassButton';
type SettingScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const SettingScreen = () => {

  const navigation = useNavigation<SettingScreenNavigationProp>();

  return (
    <Background>
      <View className="flex-1 justify-center items-center p-5">
        {/* Back Button section */}
        <View className="w-full flex-row" style={{height:BUTTON_HEIGHT}}>
        <LiquidGlassButton onPress={() => navigation.goBack()} style={{width:BUTTON_HEIGHT,height:BUTTON_HEIGHT,justifyContent:'center', alignItems:'center'}}>
          <ChevronLeftIcon width={10} height={15} color={'white'}/>
        </LiquidGlassButton>
        <LiquidGlassView style={{
         
          }}>
          <TouchableOpacity 
          onPress={() => navigation.goBack()}
          style={{height:BUTTON_HEIGHT-10,width:BUTTON_HEIGHT-10,borderRadius:BUTTON_HEIGHT/4,justifyContent:'center',alignItems:'center'}}>
          <ChevronLeftIcon width={10} height={15} color={'white'}/>
          </TouchableOpacity>
      </LiquidGlassView>
        </View>
        {/* Setting List section */}
        <View className="w-full flex-1">
          <Text>Setting List</Text>
        </View>
      </View>
    </Background>
  )
}