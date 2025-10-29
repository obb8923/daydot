import { View } from 'react-native';
import React from 'react';
import { Icon } from '@domain/App/component/Icon';
import { todayMonth, todayDay } from '@constant/Date';
import { dots } from '@constant/normal';
import { GestureDetector } from 'react-native-gesture-handler';
import { useGridSelection } from '@/shared/hooks/useGridSelection';
import { useGridGesture } from '@/shared/hooks/useGridGesture';
import { getForestIconByIndex, getOffsetByIndex } from '../constant/forestIcons';
import { useThemeColors } from '@store/themeStore';
import { useBirthDateStore } from '@store/birthDateStore';
import BirthdayCake from '@assets/svg/BirthdayCake.svg';

interface IconGridProps {
  selectedMonth?: number;
  selectedDay?: number;
  onDateSelect: (month: number, day: number) => void;
}

export const IconGrid = React.memo(({ selectedMonth, selectedDay, onDateSelect }: IconGridProps) => {
  const { primary } = useThemeColors();
  const { layoutHandlers, hitTest } = useGridSelection({
    items: dots,
    getItemKey: (dot) => dot.key,
    extractMetadata: (dot) => ({ month: dot.month, day: dot.day }),
    onItemSelect: (dot, metadata) => {
      onDateSelect(metadata.month, metadata.day);
    },
  });

  const panGesture = useGridGesture({
    hitTest,
    onItemSelected: (dot) => {
      onDateSelect(dot.month, dot.day);
    },
  });

  return (
    <GestureDetector gesture={panGesture}>
      <View className="flex-row flex-wrap justify-center mb-8" style={{ overflow: 'visible' }}>
        {(() => {
          const birthDate = useBirthDateStore.getState().birthDate;
          const birthMonth = birthDate ? new Date(birthDate).getMonth() + 1 : undefined;
          const birthDay = birthDate ? new Date(birthDate).getDate() : undefined;

          return dots.map((dot, index) => {
          const isSelected = selectedMonth === dot.month && selectedDay === dot.day;
          const isPast = dot.month < todayMonth || (dot.month === todayMonth && dot.day < todayDay);
          const isBirthday = birthMonth === dot.month && birthDay === dot.day;
          const IconComponent = isBirthday ? BirthdayCake : getForestIconByIndex(index);
          const { dx, dy } = getOffsetByIndex(index);

          return (
            <Icon
              key={dot.key}
              item={dot}
              isSelected={isSelected}
              isPast={isPast}
              onLayout={layoutHandlers.get(dot.key)}
              iconComponent={IconComponent}
              offset={{ dx, dy }}
              iconStyle={{ color: primary }}
            />
          );
          });
        })()}
      </View>
    </GestureDetector>
  );
});
