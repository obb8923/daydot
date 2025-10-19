import React, { useEffect } from "react"
import {Platform,View,ViewStyle,TouchableOpacity} from "react-native"
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated'
import { LiquidGlassView as LiquidGlassViewFromPackage ,isLiquidGlassSupported} from '@callstack/liquid-glass';

type LiquidGlassViewProps = {
  children: React.ReactNode;
  style?: ViewStyle;
  effect?: 'clear' | 'regular' | 'none';
  tintColor?: string;
  interactive?: boolean;
  colorScheme?: 'light' | 'dark' | 'system';
  onPress?: () => void;
}
export const LiquidGlassView = ({children,style,effect='clear',tintColor=undefined,interactive=false,colorScheme='system',onPress}: LiquidGlassViewProps) => {
  const opacity = useSharedValue(effect === 'none' ? 0 : 1);

  useEffect(() => {
    if (effect === 'none') {
      // fade out
      opacity.value = withTiming(0, { duration: 300 });
    } else {
      // fade in
      opacity.value = withTiming(1, { duration: 300 });
    }
  }, [effect, opacity]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  return (
    <>
        { (Platform.OS === 'ios' && isLiquidGlassSupported) ? (
            <LiquidGlassViewFromPackage 
            style={style}
            interactive={interactive}
            effect={effect}
            tintColor={tintColor}
            colorScheme={colorScheme}
            onTouchEnd={onPress}
            >
                {children}
            </LiquidGlassViewFromPackage>
        ) : (
            interactive && onPress ? (
              <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
                <Animated.View 
                className="bg-gray400/60 border border-1 border-gray200"
                style={[style, animatedStyle]}>
                    {children}
                </Animated.View>
              </TouchableOpacity>
            ) : (
              <Animated.View 
              className="bg-gray400/60 border border-1 border-gray200"
              style={[style, animatedStyle]}>
                  {children}
              </Animated.View>
            )
        )}
    </>
  )
}