import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useBirthDateStore} from '@store/birthDateStore';
import {DateMessage} from '@domain/App/component/DateMessage';

// 80살 상수
const LIFE_EXPECTANCY = 80;

export const LifetimeScreen = () => {
  const { birthDate, loadBirthDate } = useBirthDateStore();
  const [selectedYear, setSelectedYear] = useState<number | null>(null);

  // 생일 데이터 로드
  useEffect(() => {
    loadBirthDate();
  }, [loadBirthDate]);

  // 80개의 연도 데이터 생성 (1년부터 80년까지)
  const years = Array.from({length: LIFE_EXPECTANCY}, (_, index) => ({
    id: index + 1,
    year: index + 1,
    key: `${index + 1}`,
  }));

  // 현재 나이 계산
  const getCurrentAge = () => {
    if (!birthDate) return 0;
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    
    return age;
  };

  const currentAge = getCurrentAge();

  const renderYearItem = (item: {id: number; year: number; key: string}, index: number) => {
    const isPastYear = item.year <= currentAge;
    const isCurrentYear = item.year === currentAge;
    const isSelected = selectedYear === item.year;
    
    const handlePress = () => {
      if (isSelected) {
        setSelectedYear(null);
      } else {
        setSelectedYear(item.year);
      }
    };
    
    return (
      <View key={item.key} className="relative overflow-visible">
        <TouchableOpacity 
          onPress={handlePress}
          className="w-5 h-5 items-center justify-center bg-white"
        >
          <View 
            className={`w-3 h-3 rounded-full ${
              isCurrentYear 
                ? 'bg-green-500' // 현재 나이는 초록색
                : isPastYear 
                  ? 'bg-gray-400' // 지나간 나이는 회색
                  : 'bg-blue-500' // 미래 나이는 파란색
            }`}
          />
        </TouchableOpacity>
        
        {/* 선택된 연도 메시지 */}
        {isSelected && (
          <DateMessage year={item.year} />
        )}
      </View>
    );
  };

  return (
    <View className="w-full h-full" style={{overflow: 'visible'}}>
      <View className="w-full justify-center items-center my-4">
        <Text className="text-2xl font-bold">일생 화면</Text>
        {birthDate && (
          <Text className="text-base text-center mt-2 text-gray-600">
            현재 {currentAge}살 (80년 중)
          </Text>
        )}
      </View>
      <ScrollView 
        contentContainerStyle={{paddingBottom: 20}}
        showsVerticalScrollIndicator={false}
        style={{overflow: 'visible'}}
      >
        <View className="flex-row flex-wrap justify-center gap-2" style={{overflow: 'visible'}}>
          {years.map((year, index) => renderYearItem(year, index))}
        </View>
      </ScrollView>
    </View>
  );
};