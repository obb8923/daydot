import { View, TouchableOpacity, LayoutChangeEvent } from 'react-native';
import React, { memo, useRef, useState } from 'react';
import { useSelectedDateStore } from '@store/selectedDateStore';
import { useHaptic } from '@/shared/hooks/useHaptic';
import { DateMessage } from '@domain/App/component/DateMessage';
import { Colors } from '@constant/Colors';

interface IconProps {
  item: {
    id: string | number;
    year?: number;
    month?: number;
    day?: number;
    key: string;
  };
  isSelected?: boolean;
  isPast?: boolean;
  onLayout?: (layout: { width: number; height: number; absoluteX?: number; absoluteY?: number }) => void;
  iconComponent: React.ComponentType<{ width?: number; height?: number; style?: any }>;
  offset?: { dx: number; dy: number };
  iconStyle?: any;
}

export const Icon = memo(({ item, isSelected, isPast, onLayout, iconComponent: IconComponent, offset, iconStyle }: IconProps) => {
  const setSelectedDate = useSelectedDateStore((state) => state.setSelectedDate);
  const { light } = useHaptic();
  const viewRef = useRef<View>(null);
  const [showDateMessage, setShowDateMessage] = useState(false);

  const handlePress = () => {
    light();
    setSelectedDate(item.year, item.month, item.day);
    setShowDateMessage(true);
  };

  const handleLayout = (e: LayoutChangeEvent) => {
    requestAnimationFrame(() => {
      viewRef.current?.measureInWindow?.((pageX, pageY, w, h) => {
        onLayout?.({ width: w, height: h, absoluteX: pageX, absoluteY: pageY });
      });
    });
  };

  const translateStyle = offset ? { transform: [{ translateX: offset.dx }, { translateY: offset.dy }] } : undefined;

  return (
    <View
      ref={viewRef}
      key={item.key}
      className="relative overflow-visible "
      onLayout={handleLayout}
      collapsable={false}
      style={translateStyle}
    >
      <TouchableOpacity onPress={handlePress} className="w-6 h-6 items-center justify-center">
        {isPast ? (
          <IconComponent width={20} height={20} style={iconStyle} />
        ) : (
          <View className="w-1 h-1 rounded-full bg-primary"/>
        )}
      </TouchableOpacity>

      {(isSelected && showDateMessage) && (
        <DateMessage
          visible={isSelected && showDateMessage}
        />
      )}
    </View>
  );
});
