import React from 'react'
import { TouchableOpacity, View, ViewStyle } from 'react-native'
import { Text } from '@/shared/component/Text'
import { BUTTON_HEIGHT } from '@/shared/constant/layout'
import ChevronLeftIcon from '@assets/svg/ChevronLeft.svg'
import { useThemeColors } from '@store/themeStore'

type SettingItemProps = {
  title: string
  subtitle?: string
  onPress?: () => void
  style?: ViewStyle
  disabled?: boolean
}

export const SettingItem = ({
  title,
  subtitle,
  onPress,
  style,
  disabled = false
}: SettingItemProps) => {
  const { text } = useThemeColors();
  
  return (
    <TouchableOpacity
      disabled={disabled}
      style={{
        height: BUTTON_HEIGHT,
        justifyContent: 'center',
        ...style
      }}
      onPress={onPress}
    >
      <View className="flex-row items-center justify-between">
       
          <View className="flex-1">
            <Text text={title} type='body2' className="text-text" />
            {subtitle && (
              <Text text={subtitle} type='caption1' className="mt-1 text-caption"/>
            )}
          </View>
       
        <ChevronLeftIcon width={10} height={15} color={text} style={{transform: [{rotate: '180deg'}]}} />
        
      </View>
    </TouchableOpacity>
  )
}
