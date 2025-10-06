import {View, ScrollView } from 'react-native';
import React, {useState, useMemo, useCallback } from 'react';
import { Text } from '@component/Text';
import { Dot } from '@domain/App/component/Dot';
import { Colors } from '@/shared/constant/Colors';
import { MemoButton } from '@/domain/App/component/MemoButton';
import { currentYear, todayMonth, todayDay, getDaysLeftInYear} from '@constant/Date';
import { StorageService } from '@service/storageService';
import { MemoModal } from '@domain/App/component/MemoModal';
import {dots} from '@constant/normal';
import { HapticService } from '@service/hapticService';
import { useSelectedDateStore } from '@store/selectedDateStore';

export const YearlyScreen = () => {
  const daysLeftInYear = useMemo(() => getDaysLeftInYear(), []);
  // 선택된 날짜 상태 (store에서 가져오기)
  const selectedDate = useSelectedDateStore((state) => state.selectedDate);
  const setSelectedDate = useSelectedDateStore((state) => state.setSelectedDate); 
  const [isMemoOpen, setIsMemoOpen] = useState(false);
  const [memoText, setMemoText] = useState('');

  const openMemo = async () => {
    const target = selectedDate ?? new Date();
    const month = target.getMonth() + 1; // getMonth()는 0부터 시작하므로 +1
    const day = target.getDate();
    try {
      const existing = await StorageService.getMemoByMonthDay(month, day);
      setMemoText(existing ?? '');
      setIsMemoOpen(true);
    } finally {
    }
  };

  const saveMemo = async () => {
    const target = selectedDate ?? new Date();
    const month = target.getMonth() + 1; // getMonth()는 0부터 시작하므로 +1
    const day = target.getDate();
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
      <View className="w-full justify-center items-center my-4">
        <View className="flex-row w-full justify-center items-end mb-2">
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
      </View>
      <ScrollView 
        contentContainerStyle={{paddingBottom: 100}}
        showsVerticalScrollIndicator={false}
        style={{overflow: 'visible'}}
      >
        <View className="flex-row flex-wrap justify-center mb-8" style={{overflow: 'visible'}}>
          {dots.map((dot) => {
            const isSelected = selectedDate && 
              selectedDate.getMonth() + 1 === dot.month && 
              selectedDate.getDate() === dot.day;
            return (
            <Dot
              key={dot.key}
              item={dot}
              type="yearly"
              isSelected={isSelected}
            />
          )})}
        </View>
        <MemoButton 
        onPress={openMemo} 
        date={selectedDate ? {
          month: selectedDate.getMonth() + 1,
          day: selectedDate.getDate()
        } : {month: todayMonth, day: todayDay}}/>
      </ScrollView>
      <MemoModal
        visible={isMemoOpen}
        onClose={() => setIsMemoOpen(false)}
        text={memoText}
        onChangeText={setMemoText}
        onSave={saveMemo}
        date={selectedDate ? {
          month: selectedDate.getMonth() + 1,
          day: selectedDate.getDate()
        } : {month: todayMonth, day: todayDay}}
      />
    </View>
  );
};