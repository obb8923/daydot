import {View, ScrollView} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useBirthDateStore} from '@store/birthDateStore';
import { Dot } from '@domain/App/component/Dot';
import { Text } from '@component/Text';

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

  const handleYearPress = (month?: number, day?: number, year?: number) => {
    if (selectedYear === year) {
      setSelectedYear(null);
    } else {
      setSelectedYear(year!);
    }
  };

  return (
    <View className="w-full h-full" style={{overflow: 'visible'}}>
      <View className="w-full justify-center items-center my-4">
        <Text text="일생 화면" type="title1" />
        {birthDate && (
          <Text 
            text={`현재 ${currentAge}살 (80년 중)`}
            type="body2"
          />
        )}
      </View>
      <ScrollView 
        contentContainerStyle={{paddingBottom: 20}}
        showsVerticalScrollIndicator={false}
        style={{overflow: 'visible'}}
      >
        <View className="flex-row flex-wrap justify-center" style={{overflow: 'visible'}}>
          {years.map((year) => (
            <Dot
              key={year.key}
              item={year}
              currentAge={currentAge}
              selectedYear={selectedYear}
              onPress={handleYearPress}
              type="lifetime"
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};