import {View, ScrollView} from 'react-native';
import React, {useEffect, useMemo} from 'react';
import {useBirthDateStore} from '@store/birthDateStore';
import { useSelectedYear } from '@store/selectedDateStore';
import { Dot } from '@domain/App/component/Dot';
import { Text } from '@component/Text';
import { Colors } from '@constant/Colors';
import { LIFE_EXPECTANCY, generateYearsFromBirthDate } from '@constant/normal';
import { useTranslation } from 'react-i18next';

export const LifetimeScreen = () => {
  const { t } = useTranslation();
  const { birthDate, loadBirthDate, getCurrentAge } = useBirthDateStore();
  const selectedYear = useSelectedYear();
  const quote = useMemo(() => {
    const quotes = t('quotes', { returnObjects: true }) as string[];
    return quotes[Math.floor(Math.random() * quotes.length)];
  }, [t]);
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
            text={t('lifetimeScreen.remainingYearsCount', { years: LIFE_EXPECTANCY - currentAge })}
            type="title4"
          />
          <Text 
          text={t('lifetimeScreen.remainingYearsSuffix')}
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