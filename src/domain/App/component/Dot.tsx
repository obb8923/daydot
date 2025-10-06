import { View,TouchableOpacity } from 'react-native';
import React, { memo, useState } from 'react';
import { DateMessage } from '@domain/App/component/DateMessage';
import { useColorStore } from '@store/colorStore';
import {Colors} from '@constant/Colors';
import {todayMonth, todayDay, currentYear} from '@constant/Date';
import { useBirthDateStore } from '@store/birthDateStore';
import { useSelectedDateStore } from '@store/selectedDateStore';
import { HapticService } from '@service/hapticService';
import { ScreenType } from '@constant/normal';

interface DotProps {
  item: {
    id: string | number;
    month?: number;
    day?: number;
    year?: number;
    key: string;
  };
  type: ScreenType;
  isSelected?: boolean; // 외부에서 선택 여부를 직접 전달하는 최적화용
}

export const Dot = memo(({ item, type, isSelected }: DotProps) => {
  const selectedColors = useColorStore((state) => state.selectedColors);
  const setSelectedDate = useSelectedDateStore((state) => state.setSelectedDate);
  const selectedDate = useSelectedDateStore((state) => state.selectedDate);

  let isPast, isCurrent, backgroundColor;
  
  if (type === 'yearly') {
    // 연간 화면 로직
    isPast = item.month! < todayMonth! || (item.month === todayMonth && item.day! < todayDay!);
    isCurrent = item.month === todayMonth && item.day === todayDay;
  } else {
    // 일생 화면 로직 - selectedDate의 연도와 비교
    const currentYear = selectedDate ? selectedDate.getFullYear() : new Date().getFullYear();
    isPast = item.year! < currentYear;
    isCurrent = item.year === currentYear;
  }

  // 색상 로직 사용
  backgroundColor = isCurrent 
    ? selectedColors?.primary // 현재/오늘은 primary 색상
    : isPast 
      ? Colors.gray700 // 과거는 회색
      : selectedColors?.primary; // 미래는 primary 색상
  
  return (
    <View key={item.key} className="relative overflow-visible">
      <TouchableOpacity 
        onPress={()=>{
          HapticService.light(); // 햅틱 피드백 추가
          
          // selectedDateStore 업데이트
          const targetMonth = item.month ?? todayMonth;
          const targetDay = item.day ?? todayDay;
          const targetYear = item.year ?? currentYear;
          const newDate = new Date(targetYear, targetMonth - 1, targetDay); // month는 0부터 시작하므로 -1
          setSelectedDate(newDate);
          
        }}
        className="w-6 h-6 items-center justify-center"
      >
        <View 
          className="w-1.5 h-1.5 rounded-full"
          style={{ backgroundColor ,
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
          month={item.month} 
          day={item.day} 
          year={item.year}
          visible={isSelected}
        />
      )}
    </View>
  );
});
