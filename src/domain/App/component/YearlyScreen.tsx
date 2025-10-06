import {View, ScrollView } from 'react-native';
import React, {useState, useMemo } from 'react';
import { Text } from '@component/Text';
import { Dot } from '@domain/App/component/Dot';
import { Colors } from '@/shared/constant/Colors';
import { MemoButton } from '@/domain/App/component/MemoButton';
import { currentYear, todayMonth, todayDay, getDaysLeftInYear} from '@constant/Date';
import { StorageService } from '@service/storageService';
import { MemoModal } from '@domain/App/component/MemoModal';
import {dots} from '@constant/normal';
import { HapticService } from '@service/hapticService';

export const YearlyScreen = () => {
  const daysLeftInYear = useMemo(() => getDaysLeftInYear(), []);
  // 선택된 날짜 상태 (기본값: 오늘)
  const [selectedDate, setSelectedDate] = useState<{month: number; day: number} | null>({ month: todayMonth, day: todayDay });
  const [isMemoOpen, setIsMemoOpen] = useState(false);
  const [memoText, setMemoText] = useState('');

  const openMemo = async () => {
    if (!selectedDate) {
      setSelectedDate({ month: todayMonth, day: todayDay });
    }
    const target = selectedDate ?? { month: todayMonth, day: todayDay };
    try {
      const existing = await StorageService.getMemoByMonthDay(target.month, target.day);
      setMemoText(existing ?? '');
      setIsMemoOpen(true);
    } finally {
    }
  };

  const saveMemo = async () => {
    const target = selectedDate ?? { month: todayMonth, day: todayDay };
    if (!memoText.trim()) {
      // 빈 문자열이면 삭제 처리
      await StorageService.removeMemoByMonthDay(target.month, target.day);
      HapticService.soft(); // 부드러운 햅틱으로 삭제 완료 표시
      setIsMemoOpen(false);
      return;
    }
    await StorageService.setMemoByMonthDay(target.month, target.day, memoText);
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
          {dots.map((dot) => (
            <Dot
              key={dot.key}
              item={dot}
              type="yearly"
            />
          ))}
        </View>
        <MemoButton 
        onPress={openMemo} 
        date={selectedDate ?? {month: todayMonth, day: todayDay}}/>
      </ScrollView>
      <MemoModal
        visible={isMemoOpen}
        onClose={() => setIsMemoOpen(false)}
        text={memoText}
        onChangeText={setMemoText}
        onSave={saveMemo}
        date={selectedDate}
      />
    </View>
  );
};