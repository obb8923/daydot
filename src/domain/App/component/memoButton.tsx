import { View, TouchableOpacity } from 'react-native';
import React from 'react';
import { Text } from '@component/Text';
import {LiquidGlassView} from '@component/LiquidGlassView';
import {todayMonth, todayDay} from '@constant/Date';
interface MemoButtonProps {
  onPress: () => void;
  date: {month: number, day: number} | null;
}

export const MemoButton = ({ onPress, date }: MemoButtonProps) => {
  return (
    <LiquidGlassView style={{borderRadius: 1000}}>
      <TouchableOpacity onPress={onPress} className="px-4 py-2 justify-center items-center">
        <Text text={`${date?.month === todayMonth && date?.day === todayDay ? '오늘' : `${date?.month}월 ${date?.day}일`}의 기록`} type="body3" />
      </TouchableOpacity>
    </LiquidGlassView>
  );
};
