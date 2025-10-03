import {View, ScrollView} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useBirthDateStore} from '@store/birthDateStore';
import { Dot } from '@domain/App/component/Dot';
import { Text } from '@component/Text';
import { Colors } from '@constant/Colors';

// 80살 상수
const LIFE_EXPECTANCY = 80;

export const LifetimeScreen = () => {
  const { birthDate, loadBirthDate, getCurrentAge } = useBirthDateStore();
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

  const currentAge = getCurrentAge();


  return (
    <View className="w-full h-full" style={{overflow: 'visible'}}>
      <View className="flex-row w-full justify-center items-end my-4">
          <Text 
            text={`${LIFE_EXPECTANCY - currentAge}년 `}
            type="title4"
          />
          <Text 
          text={`남았습니다.`}
          type="body3"
          style={{color: Colors.gray700}}
          />
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
              selectedDate={null}
              selectedYear={selectedYear}
              onPress={(month, day, year) => setSelectedYear(year!)}
              type="lifetime"
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};