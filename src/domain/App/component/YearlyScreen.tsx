import {View, ScrollView, Modal, TouchableOpacity, TextInput} from 'react-native';
import React, {useState, useMemo, useEffect} from 'react';
import { Text } from '@component/Text';
import { Dot } from '@domain/App/component/Dot';
import { Colors } from '@/shared/constant/Colors';
import { MemoButton } from '@domain/App/component/memoButton';
import { currentYear, todayMonth, todayDay, getDaysLeftInYear, daysInMonth } from '@constant/Date';
import { StorageService } from '@service/storageService';
import { MemoModal } from '@domain/App/component/MemoModal';

export const YearlyScreen = () => {
  const daysLeftInYear = useMemo(() => getDaysLeftInYear(), []);
  // 선택된 날짜 상태
  const [selectedDate, setSelectedDate] = useState<{month: number; day: number} | null>(null);
  const [isMemoOpen, setIsMemoOpen] = useState(false);
  const [memoText, setMemoText] = useState('');
  const [isLoadingMemo, setIsLoadingMemo] = useState(false);
  // 날짜별 점 데이터 생성
  const dots = [];
  for (let month = 1; month <= 12; month++) {
    for (let day = 1; day <= daysInMonth[month - 1]; day++) {
      const key = `${month.toString().padStart(2, '0')}${day.toString().padStart(2, '0')}`;
      dots.push({
        id: key,
        month,
        day,
        key,
      });
    }
  }

  const handleDotPress = (month?: number, day?: number, year?: number) => {
    if (selectedDate?.month === month && selectedDate?.day === day) {
      setSelectedDate(null); // 같은 날짜를 다시 누르면 선택 해제
    } else {
      setSelectedDate({month: month!, day: day!});
    }
  };

  const openMemo = async () => {
    if (!selectedDate) {
      setSelectedDate({ month: todayMonth, day: todayDay });
    }
    const target = selectedDate ?? { month: todayMonth, day: todayDay };
    try {
      setIsLoadingMemo(true);
      const existing = await StorageService.getMemoByMonthDay(target.month, target.day);
      setMemoText(existing ?? '');
      setIsMemoOpen(true);
    } finally {
      setIsLoadingMemo(false);
    }
  };

  const saveMemo = async () => {
    const target = selectedDate ?? { month: todayMonth, day: todayDay };
    if (!memoText.trim()) {
      // 빈 문자열이면 삭제 처리
      await StorageService.removeMemoByMonthDay(target.month, target.day);
      setIsMemoOpen(false);
      return;
    }
    await StorageService.setMemoByMonthDay(target.month, target.day, memoText);
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
        <MemoButton onPress={openMemo} date={selectedDate || {month: todayMonth, day: todayDay}}/>
      </View>
      <ScrollView 
        contentContainerStyle={{paddingBottom: 100}}
        showsVerticalScrollIndicator={false}
        style={{overflow: 'visible'}}
      >
        <View className="flex-row flex-wrap justify-center" style={{overflow: 'visible'}}>
          {dots.map((dot) => (
            <Dot
              key={dot.key}
              item={dot}
              todayMonth={todayMonth}
              todayDay={todayDay}
              selectedDate={selectedDate}
              onPress={handleDotPress}
              type="yearly"
            />
          ))}
        </View>
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