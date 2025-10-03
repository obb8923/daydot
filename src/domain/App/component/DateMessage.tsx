import {Text} from 'react-native';
import React from 'react';
import {LiquidGlassView} from '@component/LiquidGlassView';

interface DateMessageProps {
  month?: number;
  day?: number;
  year?: number;
  text?: string;
}

export const DateMessage = ({month, day, year, text}: DateMessageProps) => {
  // 텍스트가 직접 제공되면 그것을 사용, 아니면 날짜/연도 조합
  const messageText = text || (year ? `${year}살` : `${month}월 ${day}일`);

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
        {messageText}
      </Text>
    </LiquidGlassView>
  );
};
