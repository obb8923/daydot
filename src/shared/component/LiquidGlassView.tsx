import React from "react"
import {Platform,View,ViewStyle} from "react-native"
import { LiquidGlassView as LiquidGlassViewFromPackage ,isLiquidGlassSupported} from '@callstack/liquid-glass';

type LiquidGlassViewProps = {
  children: React.ReactNode;
  style?: ViewStyle;
  effect?: 'clear' | 'regular' | 'none';
  tintColor?: string;
  interactive?: boolean;
  colorScheme?: 'light' | 'dark' | 'system';
}
export const LiquidGlassView = ({children,style,effect='clear',tintColor=undefined,interactive=false,colorScheme='system'}: LiquidGlassViewProps) => {

  return (
    <>
        { (Platform.OS === 'ios' && isLiquidGlassSupported) ? (
            <LiquidGlassViewFromPackage 
            style={style}
            interactive={interactive}
            effect={effect}
            tintColor={tintColor}
            colorScheme={colorScheme}
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