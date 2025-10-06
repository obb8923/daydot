import React from 'react'
import { View } from 'react-native'
import { Text } from '@/shared/component/Text'
import {LiquidGlassView} from '@/shared/component/LiquidGlassView'
import { PADDING_HORIZONTAL } from '@/shared/constant/layout'
type SettingGroupProps = {
  children: React.ReactNode
  style?: any
}

export const SettingGroup = ({ children, style }: SettingGroupProps) => {
  return (
    <LiquidGlassView
    effect='clear'
    style={{
      marginBottom:24,
      padding:PADDING_HORIZONTAL/2,
      borderRadius:20,
      ...style

    }}

    >
      {children}
    </LiquidGlassView>
  )
}
