import {View, Text, ScrollView} from 'react-native';
import React from 'react';

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

  // 각 월의 일수 배열
  const daysInMonth = [31, isLeapYear(currentYear) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

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
    
    return (
      <View 
        key={item.key} 
        className="w-5 h-5 items-center justify-center bg-white"
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
      </View>
    );
  };

  return (
    <View className="w-full h-full relative">
      <View className="w-full justify-center items-center my-4">
        <Text className="text-2xl font-bold">뭔가 들어갈예정</Text>
      </View>
      <ScrollView 
        contentContainerStyle={{paddingBottom: 20}}
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-row flex-wrap justify-center gap-2">
          {dots.map((dot, index) => renderDotItem(dot, index))}
        </View>
      </ScrollView>
    </View>
  );
};