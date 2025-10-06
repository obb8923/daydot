import React from 'react';
import { View } from 'react-native';
import { Text } from '@component/Text';
import { Colors } from '@/shared/constant/Colors';
import { currentYear } from '@constant/Date';

interface RemainingDaysHeaderProps {
  value: number;
}

export const RemainingDaysHeader = React.memo(({ value }: RemainingDaysHeaderProps) => (
  <View className="flex-row w-full justify-center items-end my-8">
    <Text
      text={`${currentYear}년이 `}
      type="body3"
      style={{color: Colors.gray700}}
    />
    <Text
      text={`${value}일`}
      type="title4"
    />
    <Text
      text={` 남았습니다.`}
      type="body3"
      style={{color: Colors.gray700}}
    />
  </View>
));

RemainingDaysHeader.displayName = 'RemainingDaysHeader';


