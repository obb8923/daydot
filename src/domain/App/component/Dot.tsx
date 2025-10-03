import { View, TouchableOpacity } from 'react-native';
import React from 'react';
import { DateMessage } from '@domain/App/component/DateMessage';
import { useColorStore } from '@store/colorStore';
import {Colors} from '@constant/Colors';
interface DotProps {
  item: {
    id: string | number;
    month?: number;
    day?: number;
    year?: number;
    key: string;
  };
  todayMonth?: number;
  todayDay?: number;
  currentAge?: number;
  selectedDate?: { month: number; day: number } | null;
  selectedYear?: number | null;
  onPress: (month?: number, day?: number, year?: number) => void;
  type: 'yearly' | 'lifetime';
}

export const Dot = ({ item, todayMonth, todayDay, currentAge, selectedDate, selectedYear, onPress, type }: DotProps) => {
  const selectedColors = useColorStore((state) => state.selectedColors);
  
  let isPast, isCurrent, isSelected, backgroundColor;
  
  if (type === 'yearly') {
    // 연간 화면 로직
    isPast = item.month! < todayMonth! || (item.month === todayMonth && item.day! < todayDay!);
    isCurrent = item.month === todayMonth && item.day === todayDay;
    isSelected = selectedDate?.month === item.month && selectedDate?.day === item.day;
  } else {
    // 일생 화면 로직
    isPast = item.year! <= currentAge!;
    isCurrent = item.year === currentAge;
    isSelected = selectedYear === item.year;
  }
  
  // 두 타입 모두 같은 색상 로직 사용
  backgroundColor = isCurrent 
    ? selectedColors?.primary // 현재/오늘은 primary 색상
    : isPast 
      ? Colors.gray700 // 과거는 회색
      : selectedColors?.primary; // 미래는 primary 색상
  
  const handlePress = () => {
    onPress(item.month, item.day, item.year);
  };
  
  return (
    <View key={item.key} className="relative overflow-visible">
      <TouchableOpacity 
        onPress={handlePress}
        className="w-6 h-6 items-center justify-center"
      >
        <View 
          className="w-1.5 h-1.5 rounded-full"
          style={{ backgroundColor ,
            shadowColor: selectedColors?.primary,
            shadowOffset: { width: 1, height: 1 },
            shadowOpacity: 0.2,
            shadowRadius: 3.84,
            elevation: 5,
          }}
          
        />
      </TouchableOpacity>
      
      {isSelected && (
        <DateMessage 
          month={item.month} 
          day={item.day} 
          year={item.year} 
        />
      )}
    </View>
  );
};
