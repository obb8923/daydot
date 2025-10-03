import { View, TouchableOpacity } from 'react-native';
import React from 'react';
import { DateMessage } from '@domain/App/component/DateMessage';
import { useColorStore } from '@store/colorStore';

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
  backgroundColor = isCurrent 
          ? selectedColors?.primary // 오늘은 primary 색상
          : isPast 
            ? '#6B7280' // 오늘 이전은 회색
            : selectedColors?.primary; // 오늘 이후는 primary 색상
  
  const handlePress = () => {
    onPress(item.month, item.day, item.year);
  };
  
  return (
    <View key={item.key} className="relative overflow-visible">
      <TouchableOpacity 
        onPress={handlePress}
        className="w-5 h-5 items-center justify-center"
      >
        <View 
          className="w-3 h-3 rounded-full"
          style={{ backgroundColor }}
          
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
