import React, { useEffect, useState, memo } from 'react';
import { LiquidGlassView } from '@component/LiquidGlassView';
import { Text } from '@component/Text';
import Animated, { useSharedValue, withTiming, useAnimatedStyle, Easing, runOnJS } from 'react-native-reanimated';
import { DATE_MESSAGE_DURATION } from '@/shared/constant/normal';
import { useSelectedYear, useSelectedMonth, useSelectedDay } from '@store/selectedDateStore';
import { useTranslation } from 'react-i18next';
import { useMonthName } from '@/shared/hooks/useMonthName';
import { useThemeColors } from '@store/themeStore';
interface DateMessageProps {
  visible: boolean; // 부모에서 표시 여부 제어
}

export const DateMessage = memo(({ visible}: DateMessageProps) => {
  const { t } = useTranslation();
  const getMonthName = useMonthName();
  const selectedYear = useSelectedYear();
  const selectedMonth = useSelectedMonth();
  const selectedDay = useSelectedDay();
  const { text } = useThemeColors();
  
  // 표시 규칙
  // - year가 undefined: "MM월 DD일"만 표시
  // - year가 정의됨: "YYYY년"만 표시
  const messageText = selectedYear === undefined
    ? (selectedMonth && selectedDay ? t('dateFormat.monthDay', { monthName: selectedMonth ? getMonthName(selectedMonth) : '', month: selectedMonth, day: selectedDay }) : '')
    : t('dateFormat.year', { year: selectedYear });
  const [effect, setEffect] = useState<'none' | 'clear'>('none');
  const opacity = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  }, []);

  useEffect(() => {
    if (visible) {
      setEffect('clear');
      opacity.value = withTiming(1, { duration: 250, easing: Easing.out(Easing.cubic) });

      const timeoutId = setTimeout(() => {
        opacity.value = withTiming(0, { duration: 250, easing: Easing.in(Easing.cubic) }, () => {
          runOnJS(setEffect)('none');
        });
      }, DATE_MESSAGE_DURATION);
      
      return () => {
        clearTimeout(timeoutId);
      };
    } else {
      setEffect(prev => 'none');
      // opacity.value = withTiming(0, { duration: 150 });
    }
  }, [visible]);

  return (
    <LiquidGlassView
      style={{
        position: 'absolute',
        bottom: 18,
        padding: 8,
        borderRadius: 10,
        left: -40,
        zIndex: 10,
        width: '500%',
      }}
      effect={effect}
    >
      <Animated.View style={animatedStyle}>
        <Text
          text={messageText}
          type="body3"
          style={{ textAlign: 'center', color: text }}
        />
      </Animated.View>
    </LiquidGlassView>
  );
});
