import { View,TouchableOpacity } from 'react-native';
import React, { memo } from 'react';
import { DateMessage } from '@domain/App/component/DateMessage';
import { useColorStore } from '@store/colorStore';
import {Colors} from '@constant/Colors';
import { useSelectedDateStore } from '@store/selectedDateStore';
import { HapticService } from '@service/hapticService';

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
  
  const handlePress = () => {
    HapticService.light(); // 햅틱 피드백 추가
    setSelectedDate(item.year, item.month, item.day);
  }

  return (
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
      
      {isSelected && (
        <DateMessage 
          visible={isSelected}
        />
      )}
    </View>
  );
});
