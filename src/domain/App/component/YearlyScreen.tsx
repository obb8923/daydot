import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {DateMessage} from '@domain/App/component/DateMessage';
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

  const renderDotItem = (item: {id: string; month: number; day: number; key: string}, index: number) => {
    // 오늘 이전 날짜인지 확인
    const isPastDate = item.month < todayMonth || (item.month === todayMonth && item.day < todayDay);
    const isToday = item.month === todayMonth && item.day === todayDay;
    const isSelected = selectedDate?.month === item.month && selectedDate?.day === item.day;
    
    const handlePress = () => {
      if (isSelected) {
        setSelectedDate(null); // 같은 날짜를 다시 누르면 선택 해제
      } else {
        setSelectedDate({month: item.month, day: item.day});
      }
    };
    
    return (
      <View key={item.key} className="relative overflow-visible">
        <TouchableOpacity 
          onPress={handlePress}
          className="w-5 h-5 items-center justify-center"
        >
          <View 
            className={`w-3 h-3 rounded-full ${
              isToday 
                ? 'bg-green-500' // 오늘은 초록색
                : isPastDate 
                  ? 'bg-gray-400' // 오늘 이전은 회색
                  : 'bg-blue-500' // 오늘 이후는 파란색
            }`}
          />
        </TouchableOpacity>
        
        {isSelected && (
          <DateMessage month={item.month} day={item.day} />
        )}

      </View>
    );
  };

  return (
    <View className="w-full h-full" style={{overflow: 'visible'}}>
      <View className="w-full justify-center items-center my-4">
        <Text className="text-2xl font-bold mb-2">
          {currentYear}년이 {daysLeftInYear}일 남았습니다.
        </Text>
        {selectedDate ? (
          <Text className="text-lg text-gray-600">
            선택된 날짜: {selectedDate.month}월 {selectedDate.day}일{selectedDate.month === todayMonth && selectedDate.day === todayDay ? ' (오늘)' : ''}
          </Text>
        ) : (
          <Text className="text-lg text-gray-600">
            선택된 날짜: {todayMonth}월 {todayDay}일 (오늘)
          </Text>
        )}
      </View>
      <ScrollView 
        contentContainerStyle={{paddingBottom: 100}}
        showsVerticalScrollIndicator={false}
        style={{overflow: 'visible'}}
      >
        <View className="flex-row flex-wrap justify-center gap-1" style={{overflow: 'visible'}}>
          {dots.map((dot, index) => renderDotItem(dot, index))}
        </View>
      </ScrollView>
    </View>
  );
};