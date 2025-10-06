import { View } from 'react-native';
import React, { useState, useMemo } from 'react';
import { Text } from '@component/Text';
import { Dot } from '@domain/App/component/Dot';
import { Colors } from '@/shared/constant/Colors';
import { MemoButton } from '@/domain/App/component/MemoButton';
import { currentYear, todayMonth, todayDay, getDaysLeftInYear} from '@constant/Date';
import { StorageService } from '@service/storageService';
import { MemoModal } from '@domain/App/component/MemoModal';
import {dots} from '@constant/normal';
import { HapticService } from '@service/hapticService';
import { useSelectedMonth, useSelectedDay } from '@store/selectedDateStore';
import { useHaptic } from '@/shared/hooks/useHaptic';
export const YearlyScreen = () => {
  const daysLeftInYear = useMemo(() => getDaysLeftInYear(), []);
  // 선택된 날짜 상태 (store에서 가져오기)
  const selectedMonth = useSelectedMonth();
  const selectedDay = useSelectedDay();
  const [isMemoOpen, setIsMemoOpen] = useState(false);
  const [memoText, setMemoText] = useState('');
  const { soft ,rigid } = useHaptic();
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


  return (
    <View className="w-full h-full" style={{overflow: 'visible'}}>

      {/* 남은 일 수 */}
      <View className="flex-row w-full justify-center items-end my-8">
        <Text
        text={`${currentYear}년이 `}
        type="body3"
        style={{color: Colors.gray700}}
        />
        <Text
        text={`${daysLeftInYear}일`}
        type="title4"
        />
        <Text
        text={` 남았습니다.`}
        type="body3"  
        style={{color: Colors.gray700}}
        />
        </View>
      {/* dot 그리드 */}
        <View className="flex-row flex-wrap justify-center mb-8" style={{overflow: 'visible'}}>
          {dots.map((dot) => {
            const isSelected = selectedMonth === dot.month && selectedDay === dot.day;
            const isPast = dot.month < todayMonth || (dot.month === todayMonth && dot.day < todayDay);
            return (
            <Dot
              key={dot.key}
              item={dot}
              isSelected={isSelected}
              isPast={isPast}
            />
          )})}
        </View>
        {/* 메모 버튼 */}
        <MemoButton 
        onPress={openMemo} 
        date={{
          month: selectedMonth ?? todayMonth,
          day: selectedDay ?? todayDay
        }}/>
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