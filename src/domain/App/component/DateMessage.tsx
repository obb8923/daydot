import React from 'react';
import {LiquidGlassView} from '@component/LiquidGlassView';
import { useColorStore } from '@store/colorStore';
import {Text} from '@component/Text';

interface DateMessageProps {
  month?: number;
  day?: number;
  year?: number;
  text?: string;
}

export const DateMessage = ({month, day, year, text}: DateMessageProps) => {
  // 텍스트가 직접 제공되면 그것을 사용, 아니면 날짜/연도 조합
  const messageText = text || (year ? `${year}살` : `${month}월 ${day}일`);
  const selectedColors = useColorStore((state) => state.selectedColors);
  return (
    <LiquidGlassView 
      style={{
        position: 'absolute',
        bottom: 18,
        padding: 8,
        borderRadius: 10,
        left: -30, // 왼쪽으로 더 넓게 펼쳐지게 위치 조정
        zIndex: 10,
        width: '500%', 
      }}
    >
      <Text 
      text={messageText} 
      type="body3" 
      className=""  
      style={{textAlign: 'center', color: 'white'}}/>
    </LiquidGlassView>
  );
};
