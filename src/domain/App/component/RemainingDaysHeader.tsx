import React from 'react';
import { View } from 'react-native';
import { Text } from '@component/Text';
import { currentYear } from '@constant/Date';
import { useTranslation } from 'react-i18next';

interface RemainingDaysHeaderProps {
  value: number;
}

export const RemainingDaysHeader = React.memo(({ value }: RemainingDaysHeaderProps) => {
  const { t } = useTranslation();
  
  return (
    <View className="flex-row w-full justify-center items-end my-8">
      <Text
        text={t('yearlyScreen.remainingDaysPrefix', { year: currentYear })}
        type="body3"
        className="text-caption"
      />
      <Text
        text={t('yearlyScreen.remainingDaysCount', { days: value })}
        type="title4" className="text-text"
      />
      <Text
        text={t('yearlyScreen.remainingDaysSuffix',{year: currentYear})}
        type="body3"
        className="text-caption"
      />
    </View>
  );
});

RemainingDaysHeader.displayName = 'RemainingDaysHeader';


