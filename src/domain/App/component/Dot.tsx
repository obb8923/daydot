import { View } from 'react-native';
import React, { useEffect, memo, useState } from 'react';
import { DateMessage } from '@domain/App/component/DateMessage';
import { useColorStore } from '@store/colorStore';
import {Colors} from '@constant/Colors';
import {todayMonth, todayDay} from '@constant/Date';
import { useBirthDateStore } from '@store/birthDateStore';
import { Gesture,GestureDetector } from 'react-native-gesture-handler';
import { useSharedValue, useDerivedValue, runOnJS } from 'react-native-reanimated';
import Animated from 'react-native-reanimated';
import { HapticService } from '@service/hapticService';
import { ScreenType } from '@constant/normal';
interface DotProps {
  item: {
    id: string | number;
    month?: number;
    day?: number;
    year?: number;
    key: string;
  };
  // onPress: (month?: number, day?: number, year?: number) => void;
  type: ScreenType;
  // isSelected?: boolean; // 외부에서 선택 여부를 직접 전달하는 최적화용
}

export const Dot = memo(({ item, type }: DotProps) => {
  const selectedColors = useColorStore((state) => state.selectedColors);
  const { getCurrentAge } = useBirthDateStore();
  const currentAge = getCurrentAge();
  const isPressed = useSharedValue(false);
  const [showDateMessage, setShowDateMessage] = useState(false);

  // 햅틱 피드백을 위한 함수 래핑
  const triggerHaptic = () => {
    HapticService.light();
  };

  const gesture = Gesture.Tap()
    .onBegin(() => {
      'worklet';
      console.log('began:', item.key);
      isPressed.value = true;
      runOnJS(setShowDateMessage)(true);
      runOnJS(triggerHaptic)();
    })
    .onEnd(() => {
      'worklet';
      console.log('ended:', item.key);
      isPressed.value = false;
    })
    .onFinalize(() => {
      'worklet';
      console.log('finalized:', item.key);
      isPressed.value = false;
    })
    .shouldCancelWhenOutside(true)

  // Animated 스타일을 위한 derived values
  const animatedOpacity = useDerivedValue(() => {
    return isPressed.value ? 0.3 : 1;
  }, []);

  let isPast, isCurrent, backgroundColor;
  
  if (type === 'yearly') {
    // 연간 화면 로직
    isPast = item.month! < todayMonth! || (item.month === todayMonth && item.day! < todayDay!);
    isCurrent = item.month === todayMonth && item.day === todayDay;
  } else {
    // 일생 화면 로직
    isPast = item.year! <= currentAge;
    isCurrent = item.year === currentAge;
  }

  // 색상 로직 사용
  backgroundColor = isCurrent 
    ? selectedColors?.primary // 현재/오늘은 primary 색상
    : isPast 
      ? Colors.gray700 // 과거는 회색
      : selectedColors?.primary; // 미래는 primary 색상
  
  return (
    <GestureDetector gesture={gesture}>
      <Animated.View key={item.key} className="relative overflow-visible">
        <Animated.View 
          className="w-6 h-6 items-center justify-center"
         
        >
          <Animated.View 
            className="w-1.5 h-1.5 rounded-full"
            style={{ 
              backgroundColor,
              shadowColor: selectedColors?.primary,
              shadowOffset: { width: 1, height: 1 },
              shadowOpacity: 0.2,
              shadowRadius: 3.84,
              elevation: 3,
              opacity: animatedOpacity,
            }}
          />
        </Animated.View>
        
        {showDateMessage && (
          <DateMessage 
            month={item.month} 
            day={item.day} 
            year={item.year}
            visible={showDateMessage}
            setShowDateMessage={setShowDateMessage}
          />
        )}
      </Animated.View>
    </GestureDetector>
  );
});
