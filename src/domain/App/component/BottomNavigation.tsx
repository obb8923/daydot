import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { LiquidGlassView } from '@component/LiquidGlassView'
import { LiquidGlassContainerView } from '@callstack/liquid-glass'
import { PADDING_HORIZONTAL ,BOTTOM_NAVIGATION_HEIGHT} from '@constant/layout'
import { useColorStore } from '@store/colorStore'
import HourGlassIcon from '@assets/svg/HourGlass.svg';
import CalendarIcon from '@assets/svg/Calendar.svg';
import SettingIcon from '@assets/svg/Setting.svg';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '@nav/App';
import { useNavigation } from '@react-navigation/native'
type ScreenType = 'lifetime' | 'yearly';

interface BottomNavigationProps {
  onScreenChange: (screen: ScreenType) => void;
  currentScreen: ScreenType;
}
type AppScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const BottomNavigation = ({ onScreenChange, currentScreen }: BottomNavigationProps) => {
  const selectedColors = useColorStore((state) => state.selectedColors);
  // 네비게이션 타입 정의
const navigation = useNavigation<AppScreenNavigationProp>();

  return (
    <LiquidGlassContainerView style={{
      height:50, 
      width:'100%',
      flexDirection:'row',
      justifyContent:'space-between',
      alignItems:'center',
      }}>
              {/* Setting */}

    <LiquidGlassView style={{
      height:BOTTOM_NAVIGATION_HEIGHT,
      width:BOTTOM_NAVIGATION_HEIGHT,
      borderRadius:20,
      justifyContent:'center',
      alignItems:'center',
      padding:PADDING_HORIZONTAL/2,
      }}>
      <TouchableOpacity 
      onPress={() => navigation.navigate('SettingScreen')}
      style={{height:BOTTOM_NAVIGATION_HEIGHT-10,width:BOTTOM_NAVIGATION_HEIGHT-10,borderRadius:BOTTOM_NAVIGATION_HEIGHT/4,justifyContent:'center',alignItems:'center'}}>
      <SettingIcon width={24} height={24} color={'white'}/>
      </TouchableOpacity>
      </LiquidGlassView>
      {/* Y,L */}
      <LiquidGlassView style={{
      height:'100%',
      borderRadius:20,
      justifyContent:'center',
      alignItems:'center',
      padding:PADDING_HORIZONTAL/2,
      flexDirection:'row',
      gap:PADDING_HORIZONTAL/2,
      }}>
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
        <CalendarIcon width={22} height={24} color={'white'}/>
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
        <HourGlassIcon  width={17} height={23} color={'white'}/>
      </TouchableOpacity>
    </LiquidGlassView>
    </LiquidGlassContainerView>
  )
}