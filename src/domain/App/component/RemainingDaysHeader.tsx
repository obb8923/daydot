import React from 'react';
import { View } from 'react-native';
import { Text } from '@component/Text';
import { Colors } from '@/shared/constant/Colors';
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
        style={{color: Colors.gray700}}
      />
      <Text
        text={t('yearlyScreen.remainingDaysCount', { days: value })}
        type="title4"
      />
      <Text
        text={t('yearlyScreen.remainingDaysSuffix',{year: currentYear})}
        type="body3"
        style={{color: Colors.gray700}}
      />
    </View>
  );
});

RemainingDaysHeader.displayName = 'RemainingDaysHeader';


