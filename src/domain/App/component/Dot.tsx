import { View,TouchableOpacity, LayoutChangeEvent } from 'react-native';
import React, { memo, useState, useRef } from 'react';
import { DateMessage } from '@domain/App/component/DateMessage';
import {Colors} from '@constant/Colors';
import { useSelectedDateStore } from '@store/selectedDateStore';
import { useHaptic } from '@/shared/hooks/useHaptic';


interface DotProps {
  item: {
    id: string | number;
    year?: number;
    month?: number;
    day?: number;
    key: string;
  };
  isSelected?: boolean;
  isPast?: boolean;
  onLayout?: (layout: {  width: number; height: number; absoluteX?: number; absoluteY?: number }) => void;
}

export const Dot = memo(({ item, isSelected, isPast, onLayout }: DotProps) => {
  const setSelectedDate = useSelectedDateStore((state) => state.setSelectedDate);
  const [showDateMessage, setShowDateMessage] = useState(false);
  const { light } = useHaptic();
  const viewRef = useRef<View>(null);

  const handlePress = () => {
    light(); // 햅틱 피드백 추가
    setSelectedDate(item.year, item.month, item.day);
    setShowDateMessage(true);
  }

  const handleLayout = (e: LayoutChangeEvent) => {
    // 절대 좌표만 사용
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
      <TouchableOpacity 
        onPress={handlePress}
        className="w-6 h-6 items-center justify-center"
      >
        <View 
          className="w-1.5 h-1.5 rounded-full"
          style={{ backgroundColor: isPast ? Colors.gray700 : Colors.white,
            shadowColor: Colors.white,
            shadowOffset: { width: 1, height: 1 },
            shadowOpacity: 0.2,
            shadowRadius: 3.84,
            elevation: 3,
          }}
        />
      </TouchableOpacity>
      
      {(isSelected && showDateMessage) && (
        <DateMessage 
          visible={isSelected && showDateMessage}
        />
      )}
    </View>
  );
});
