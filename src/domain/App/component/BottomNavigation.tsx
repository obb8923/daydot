import { View, Text } from 'react-native'
import React from 'react'
import { LiquidGlassView } from '@component/LiquidGlassView'
import { LiquidGlassContainerView } from '@callstack/liquid-glass'
export const BottomNavigation = () => {
  return (
    <LiquidGlassContainerView style={{
      height:50, 
      backgroundColor:'#dedede',
      width:'100%',
      flexDirection:'row',
      justifyContent:'space-between',
      alignItems:'center',
      paddingHorizontal:0,
      }}>
    <LiquidGlassView style={{
      height:'100%',
      borderRadius:20,
      justifyContent:'center',
      alignItems:'center',
      }}>
      <Text>11111111</Text>
    </LiquidGlassView>
    <LiquidGlassView style={{
      height:'100%',
      borderRadius:20,
      justifyContent:'center',
      alignItems:'center',
      }}>
      <Text>22222222</Text>
    </LiquidGlassView>
    </LiquidGlassContainerView>
  )
}