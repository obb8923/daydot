import { TouchableOpacity } from 'react-native';
import React from 'react';
import Animated, { LinearTransition } from 'react-native-reanimated';
import { Text } from '@component/Text';
import {LiquidGlassView} from '@component/LiquidGlassView';
import {todayMonth, todayDay} from '@constant/Date';
// import FileIcon from '@assets/svg/File.svg';
import { useTranslation } from 'react-i18next';
import { useMonthName } from '@/shared/hooks/useMonthName';
interface MemoButtonProps {
  onPress: () => void;
  date: {month: number, day: number} | null;
}

export const MemoButton = ({ onPress, date }: MemoButtonProps) => {
  const { t } = useTranslation();
  const getMonthName = useMonthName();
  const isToday = date?.month === todayMonth && date?.day === todayDay;
  

  
  const buttonText = isToday 
    ? t('yearlyScreen.memoButtonToday')
    : t('yearlyScreen.memoButton', { 
        month: date?.month, 
        day: date?.day,
        monthName: date?.month ? getMonthName(date.month) : ''
      });
  
  return (
      <AnimatedLiquidGlassView layout={LinearTransition.springify()} style={{borderRadius: 1000, alignSelf: 'center',justifyContent: 'center',alignItems: 'center'}}>
        <TouchableOpacity onPress={onPress} className="flex-row px-4 py-2 justify-center items-center">
          <Text text={buttonText} type="body3" className="text-center text-text" />
          {/* <FileIcon width={14} height={16} color={'white'}/> */}
        </TouchableOpacity>
      </AnimatedLiquidGlassView>
  );
};

const AnimatedLiquidGlassView = Animated.createAnimatedComponent(LiquidGlassView);
