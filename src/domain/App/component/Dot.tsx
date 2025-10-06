import { View,TouchableOpacity } from 'react-native';
import React, { memo, useState } from 'react';
import { DateMessage } from '@domain/App/component/DateMessage';
import { useColorStore } from '@store/colorStore';
import {Colors} from '@constant/Colors';
import { useSelectedDateStore } from '@store/selectedDateStore';
import { useHaptic } from '@/shared/hooks/useHaptic';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { runOnJS, useSharedValue } from 'react-native-reanimated';

interface DotProps {
  item: {
    id: string | number;
    year?: number;
    month?: number;
    day?: number;
    key: string;
  };
  isSelected?: boolean; // 외부에서 선택 여부를 직접 전달하는 최적화용
  isPast?: boolean; // 외부에서 과거 여부를 직접 전달하는 최적화용
}

export const Dot = memo(({ item, isSelected, isPast }: DotProps) => {
  const selectedColors = useColorStore((state) => state.selectedColors);
  const setSelectedDate = useSelectedDateStore((state) => state.setSelectedDate);
  const [showDateMessage, setShowDateMessage] = useState(false);
  const { light, soft } = useHaptic();
  const lastRun = useSharedValue(0);

const panGesture = Gesture.Pan()
  .onBegin((e) => {
    runOnJS(soft)();
  })
  .onUpdate((e) => {
    const now = Date.now();
    if (now - lastRun.value > 250) {
      console.log(now, lastRun.value);
      lastRun.value = now;
      runOnJS(soft)();
    }
  });

  const handlePress = () => {
    light(); // 햅틱 피드백 추가
    setSelectedDate(item.year, item.month, item.day);
    setShowDateMessage(true);
  }

  return (
    <GestureDetector gesture={panGesture}>
    <View key={item.key} className="relative overflow-visible">
      <TouchableOpacity 
        onPress={handlePress}
        className="w-6 h-6 items-center justify-center"
      >
        <View 
          className="w-1.5 h-1.5 rounded-full"
          style={{ backgroundColor: isPast ? Colors.gray700 : selectedColors?.primary,
            shadowColor: selectedColors?.primary,
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
    </GestureDetector>
  );
});
