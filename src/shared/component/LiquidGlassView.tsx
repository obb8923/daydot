import React from "react"
import {Platform,View,ViewStyle} from "react-native"
import { LiquidGlassView as LiquidGlassViewFromPackage ,isLiquidGlassSupported} from '@callstack/liquid-glass';

export const LiquidGlassView = ({children,style}: {children: React.ReactNode,style?:ViewStyle}) => {

  return (
    <>
        { (Platform.OS === 'ios' && isLiquidGlassSupported) ? (
            <LiquidGlassViewFromPackage 
            style={style}
            interactive={true}
            effect='clear'
            >
                {children}
            </LiquidGlassViewFromPackage>
        ) : (
            <View style={style}>
                {children}
            </View>
        )}
    </>
  )
}