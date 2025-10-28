import { View, TouchableOpacity, LayoutChangeEvent } from 'react-native';
import React, { memo, useRef } from 'react';
import { useSelectedDateStore } from '@store/selectedDateStore';
import { useHaptic } from '@/shared/hooks/useHaptic';

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
  iconComponent: React.ComponentType<{ width?: number; height?: number }>;
}

export const Icon = memo(({ item, isSelected, isPast, onLayout, iconComponent: IconComponent }: IconProps) => {
  const setSelectedDate = useSelectedDateStore((state) => state.setSelectedDate);
  const { light } = useHaptic();
  const viewRef = useRef<View>(null);

  const handlePress = () => {
    light();
    setSelectedDate(item.year, item.month, item.day);
  };

  const handleLayout = (e: LayoutChangeEvent) => {
    requestAnimationFrame(() => {
      viewRef.current?.measureInWindow?.((pageX, pageY, w, h) => {
        onLayout?.({ width: w, height: h, absoluteX: pageX, absoluteY: pageY });
      });
    });
  };

  return (
    <View
      ref={viewRef}
      key={item.key}
      className="relative overflow-visible"
      onLayout={handleLayout}
      collapsable={false}
    >
      <TouchableOpacity onPress={handlePress} className="w-6 h-6 items-center justify-center bg-red-500">
        <IconComponent width={15} height={15} />
      </TouchableOpacity>
    </View>
  );
});
