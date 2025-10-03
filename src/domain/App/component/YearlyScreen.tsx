import {View, ScrollView} from 'react-native';
import React, {useState, useMemo} from 'react';
import { Text } from '@component/Text';
import { Dot } from '@domain/App/component/Dot';
import { Colors } from '@/shared/constant/Colors';
import { MemoButton } from '@domain/App/component/memoButton';
import { currentYear, todayMonth, todayDay, getDaysLeftInYear, daysInMonth } from '@constant/Date';

export const YearlyScreen = () => {
  const daysLeftInYear = useMemo(() => getDaysLeftInYear(), []);
  // 선택된 날짜 상태
  const [selectedDate, setSelectedDate] = useState<{month: number; day: number} | null>(null);
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
        <MemoButton onPress={() => {}} date={selectedDate || {month: todayMonth, day: todayDay}}/>
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
    </View>
  );
};