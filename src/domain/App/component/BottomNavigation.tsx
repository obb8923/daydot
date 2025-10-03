import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { LiquidGlassView } from '@component/LiquidGlassView'
import { LiquidGlassContainerView } from '@callstack/liquid-glass'
import { PADDING_HORIZONTAL ,BOTTOM_NAVIGATION_HEIGHT} from '@constant/layout'

type ScreenType = 'lifetime' | 'yearly';

interface BottomNavigationProps {
  onScreenChange: (screen: ScreenType) => void;
  currentScreen: ScreenType;
}

export const BottomNavigation = ({ onScreenChange, currentScreen }: BottomNavigationProps) => {
  return (
    <LiquidGlassContainerView style={{
      height:50, 
      width:'100%',
      flexDirection:'row',
      justifyContent:'space-between',
      alignItems:'center',
      }}>
    {/* Y,L */}
    <LiquidGlassView style={{
      height:BOTTOM_NAVIGATION_HEIGHT,
      width:BOTTOM_NAVIGATION_HEIGHT,
      borderRadius:20,
      justifyContent:'center',
      alignItems:'center',
      padding:PADDING_HORIZONTAL/2,
      }}>
      <View style={{height:BOTTOM_NAVIGATION_HEIGHT-10,width:BOTTOM_NAVIGATION_HEIGHT-10,borderRadius:BOTTOM_NAVIGATION_HEIGHT/4,justifyContent:'center',alignItems:'center'}}>
      <Text>Setting</Text>
      </View>
      </LiquidGlassView>
      {/* Setting */}
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
          backgroundColor: currentScreen === 'yearly' ? '#007AFF' : 'transparent',
        }}
        onPress={() => onScreenChange('yearly')}
      >
        <Text style={{ 
          color: currentScreen === 'yearly' ? 'white' : '#333',
          fontWeight: 'bold' 
        }}>
          Y
        </Text>
      </TouchableOpacity>
      
      {/* L 버튼 - 일생화면 */}
      <TouchableOpacity 
        style={{
          height:BOTTOM_NAVIGATION_HEIGHT-10,
          width:BOTTOM_NAVIGATION_HEIGHT-10,
          borderRadius:BOTTOM_NAVIGATION_HEIGHT/4,
          justifyContent:'center',
          alignItems:'center',
          backgroundColor: currentScreen === 'lifetime' ? '#007AFF' : 'transparent',
        }}
        onPress={() => onScreenChange('lifetime')}
      >
        <Text style={{ 
          color: currentScreen === 'lifetime' ? 'white' : '#333',
          fontWeight: 'bold' 
        }}>
          L
        </Text>
      </TouchableOpacity>
    </LiquidGlassView>
    </LiquidGlassContainerView>
  )
}