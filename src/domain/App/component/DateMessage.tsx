import {Text} from 'react-native';
import React from 'react';
import {LiquidGlassView} from '@callstack/liquid-glass';

interface DateMessageProps {
  month: number;
  day: number;
}

export const DateMessage = ({month, day}: DateMessageProps) => {
  return (
    <LiquidGlassView 
      style={{
        position: 'absolute',
        bottom: 18,
        padding: 8,
        borderRadius: 4,
        left: -30, // 왼쪽으로 더 넓게 펼쳐지게 위치 조정
        zIndex: 10,
        width: '500%', // dots보다 크도록 아예 width 키워보세요 (필요시)
      }}
    >
      <Text className="text-black font-medium" style={{textAlign: 'center'}}>
        {month}월 {day}일
      </Text>
    </LiquidGlassView>
  );
};
