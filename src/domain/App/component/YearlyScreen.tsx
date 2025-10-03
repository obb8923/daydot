import {View, ScrollView} from 'react-native';
import React, {useState} from 'react';
import { Text } from '@component/Text';
import { Dot } from '@domain/App/component/Dot';
export const YearlyScreen = () => {
  // 윤년 계산 함수
  const isLeapYear = (year: number) => {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
  };

  // 현재 년도와 오늘 날짜
  const currentYear = new Date().getFullYear();
  const today = new Date();
  const todayMonth = today.getMonth() + 1; // getMonth()는 0부터 시작하므로 +1
  const todayDay = today.getDate();

  // 이번 년도 남은 일수 계산
  const getDaysLeftInYear = () => {
    const endOfYear = new Date(currentYear, 11, 31); // 12월 31일
    const timeDiff = endOfYear.getTime() - today.getTime();
    const daysLeft = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return daysLeft;
  };

  const daysLeftInYear = getDaysLeftInYear();

  // 각 월의 일수 배열
  const daysInMonth = [31, isLeapYear(currentYear) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

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
        <Text
        text={`${currentYear}년이 ${daysLeftInYear}일 남았습니다.`}
        type="title1"
        />
     
        {selectedDate ? (
          <Text text={`선택된 날짜: ${selectedDate.month}월 ${selectedDate.day}일${selectedDate.month === todayMonth && selectedDate.day === todayDay ? ' (오늘)' : ''}`} type="body2" />
         
        ) : (
          <Text text={`선택된 날짜: ${todayMonth}월 ${todayDay}일 (오늘)`} type="body2" />
        )}
      </View>
      <ScrollView 
        contentContainerStyle={{paddingBottom: 100}}
        showsVerticalScrollIndicator={false}
        style={{overflow: 'visible'}}
      >
        <View className="flex-row flex-wrap justify-center gap-1" style={{overflow: 'visible'}}>
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