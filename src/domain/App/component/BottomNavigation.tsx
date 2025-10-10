import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { LiquidGlassView } from '@component/LiquidGlassView'
import { LiquidGlassContainerView } from '@callstack/liquid-glass'
import { PADDING_HORIZONTAL ,BOTTOM_NAVIGATION_HEIGHT} from '@constant/layout'
import HourGlassIcon from '@assets/svg/HourGlass.svg';
import CalendarIcon from '@assets/svg/Calendar.svg';
import SettingIcon from '@assets/svg/Setting.svg';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '@nav/App';
import { useNavigation } from '@react-navigation/native'
import { ScreenType } from '@constant/normal';
import {LiquidGlassButton} from '@component/LiquidGlassButton';
import { useThemeColors } from '@store/themeStore';

interface BottomNavigationProps {
  onScreenChange: (screen: ScreenType) => void;
  currentScreen: ScreenType;
}
type AppScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const BottomNavigation = ({ onScreenChange, currentScreen }: BottomNavigationProps) => {
  // 네비게이션 타입 정의
const navigation = useNavigation<AppScreenNavigationProp>();
const { text } = useThemeColors();

  return (
    <LiquidGlassContainerView style={{
      height:BOTTOM_NAVIGATION_HEIGHT, 
      width:'100%',
      flexDirection:'row',
      justifyContent:'space-between',
      alignItems:'center',
      }}>
    
    {/* Setting Button */}
    {/* <LiquidGlassView style={{
      height:BOTTOM_NAVIGATION_HEIGHT,
      width:BOTTOM_NAVIGATION_HEIGHT,
      borderRadius:20,
      justifyContent:'center',
      alignItems:'center',
      padding:PADDING_HORIZONTAL/2,
      }}></LiquidGlassView> */}
      <LiquidGlassButton
       style={{
        width:BOTTOM_NAVIGATION_HEIGHT,height:BOTTOM_NAVIGATION_HEIGHT,justifyContent:'center', alignItems:'center'}}
        onPress={() => navigation.navigate('SettingStack')}
      >
        <SettingIcon width={24} height={24} color={text}/>
      </LiquidGlassButton>
      {/* Y,L Button */}
      <LiquidGlassView style={{
      height:'100%',
      borderRadius:20,
      justifyContent:'center',
      alignItems:'center',
      padding:PADDING_HORIZONTAL/2,
      flexDirection:'row',
      gap:PADDING_HORIZONTAL/2,
      }}
      interactive={true}
      >
      {/* Y 버튼 - 일년화면 */}
      <TouchableOpacity 
        style={{
          height:BOTTOM_NAVIGATION_HEIGHT-10,
          width:BOTTOM_NAVIGATION_HEIGHT-10,
          borderRadius:BOTTOM_NAVIGATION_HEIGHT/4,
          justifyContent:'center',
          alignItems:'center',
        }}
        onPress={() => onScreenChange('yearly')}
      >
        <CalendarIcon width={22} height={24} color={text}/>
      </TouchableOpacity>
      
      {/* L 버튼 - 일생화면 */}
      <TouchableOpacity 
        style={{
          height:BOTTOM_NAVIGATION_HEIGHT-10,
          width:BOTTOM_NAVIGATION_HEIGHT-10,
          borderRadius:BOTTOM_NAVIGATION_HEIGHT/4,
          justifyContent:'center',
          alignItems:'center',
        }}
        onPress={() => onScreenChange('lifetime')}
      >
        <HourGlassIcon  width={17} height={23} color={text}/>
      </TouchableOpacity>
    </LiquidGlassView>
    </LiquidGlassContainerView>
  )
}