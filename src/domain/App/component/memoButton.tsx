import { TouchableOpacity } from 'react-native';
import React from 'react';
import { Text } from '@component/Text';
import {LiquidGlassView} from '@component/LiquidGlassView';
import {todayMonth, todayDay} from '@constant/Date';
import FileIcon from '@assets/svg/File.svg';
interface MemoButtonProps {
  onPress: () => void;
  date: {month: number, day: number} | null;
}

export const MemoButton = ({ onPress, date }: MemoButtonProps) => {
  return (
    <LiquidGlassView style={{borderRadius: 1000}}>
      <TouchableOpacity onPress={onPress} className="flex-row px-4 py-2 justify-center items-center">
        <Text text={`${date?.month === todayMonth && date?.day === todayDay ? '오늘' : `${date?.month}월 ${date?.day}일`}의 기록`} type="body3" className="mr-2" />
        <FileIcon width={14} height={16} color={'white'}/>
      </TouchableOpacity>
    </LiquidGlassView>
  );
};
