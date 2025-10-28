import { View } from 'react-native';
import React, { useState, useMemo } from 'react';
import { MemoButton } from '@domain/App/component/MemoButton';
import { todayMonth, todayDay, getDaysLeftInYear} from '@constant/Date';
import { StorageService } from '@service/storageService';
import { MemoModal } from '@domain/App/component/MemoModal';
import { HapticService } from '@service/hapticService';
import { useSelectedMonth, useSelectedDay, useSetSelectedDate } from '@store/selectedDateStore';
import { RemainingDaysHeader } from '@domain/App/component/RemainingDaysHeader';
import { DotGrid } from '@domain/App/component/DotGrid';
import { IconGrid } from '@domain/App/component/IconGrid';
import { useThemeStore } from '@store/themeStore';

export const YearlyScreen = () => {
  const themeIndex = useThemeStore((state) => state.themeIndex);
  const daysLeftInYear = useMemo(() => getDaysLeftInYear(), []);
  // 선택된 날짜 상태 (store에서 가져오기)
  const selectedMonth = useSelectedMonth();
  const selectedDay = useSelectedDay();
  const setSelectedDate = useSetSelectedDate();
  const [isMemoOpen, setIsMemoOpen] = useState(false);
  const [memoText, setMemoText] = useState('');

  const openMemo = async () => {
    const month = selectedMonth ?? todayMonth;
    const day = selectedDay ?? todayDay;
    try {
      const existing = await StorageService.getMemoByMonthDay(month, day);
      setMemoText(existing ?? '');
      setIsMemoOpen(true);
    } finally {
    }
  };

  const saveMemo = async () => {
    const month = selectedMonth ?? todayMonth;
    const day = selectedDay ?? todayDay;
    if (!memoText.trim()) {
      // 빈 문자열이면 삭제 처리
      await StorageService.removeMemoByMonthDay(month, day);
      HapticService.soft(); // 부드러운 햅틱으로 삭제 완료 표시
      setIsMemoOpen(false);
      return;
    }
    await StorageService.setMemoByMonthDay(month, day, memoText);
    HapticService.soft(); // 부드러운 햅틱으로 저장 완료 표시
    setIsMemoOpen(false);
  };

  const handleDateSelect = (month: number, day: number) => {
    setSelectedDate(undefined, month, day);
  };


  return (
    <View className="w-full h-full" style={{overflow: 'visible'}}>
      {/* 남은 일 수 */}
      <RemainingDaysHeader value={daysLeftInYear} />
      
      {/* 그리드 - 테마에 따라 표시 */}
      {themeIndex === 0 ? (
        <DotGrid 
          selectedMonth={selectedMonth}
          selectedDay={selectedDay}
          onDateSelect={handleDateSelect}
        />
      ) : (
        <IconGrid 
          selectedMonth={selectedMonth}
          selectedDay={selectedDay}
          onDateSelect={handleDateSelect}
        />
      )}
      
      {/* 메모 버튼 */}
      <MemoButton 
        onPress={openMemo} 
        date={{
          month: selectedMonth ?? todayMonth,
          day: selectedDay ?? todayDay
        }}
      />
      
      {/* 메모 모달 */}
      <MemoModal
        visible={isMemoOpen}
        onClose={() => setIsMemoOpen(false)}
        text={memoText}
        onChangeText={setMemoText}
        onSave={saveMemo}
        date={{
          month: selectedMonth ?? todayMonth,
          day: selectedDay ?? todayDay
        }}
      />
    </View>
  );
};