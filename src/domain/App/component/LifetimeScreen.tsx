import {View, ScrollView} from 'react-native';
import React, {useEffect, useMemo} from 'react';
import {useBirthDateStore} from '@store/birthDateStore';
import { useSelectedYear } from '@store/selectedDateStore';
import { Dot } from '@domain/App/component/Dot';
import { Text } from '@component/Text';
import { Colors } from '@constant/Colors';
import { Quotes } from '@constant/Quotes';
import { LIFE_EXPECTANCY, generateYearsFromBirthDate } from '@constant/normal';

export const LifetimeScreen = () => {
  const { birthDate, loadBirthDate, getCurrentAge } = useBirthDateStore();
  const selectedYear = useSelectedYear();
  const quote = useMemo(() => {
    return Quotes[Math.floor(Math.random() * Quotes.length)];
  }, []);
  // 생일 데이터 로드
  useEffect(() => {
    loadBirthDate();
  }, [loadBirthDate]);

  const currentAge = getCurrentAge();

  // birthDate를 기반으로 연도 배열 생성 (birthDate 년도부터 80개)
  const years = useMemo(() => {
    return generateYearsFromBirthDate(birthDate);
  }, [birthDate]);

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
          {years.map((year) => {
            const isSelected = selectedYear === year.year;
            const currentYear = new Date().getFullYear();
            const isPast = year.year < currentYear;
            return(
            <Dot
              key={year.key}
              item={year}
              isSelected={isSelected}
              isPast={isPast}
            />
          )}
          )}
        </View>
        <View className="w-full justify-center items-center">
        <Text text={"\""+quote+"\""} type="body3" className="mt-16 text-center" style={{color: Colors.gray200}}/>
        </View>
      </ScrollView>
    </View>
  );
};