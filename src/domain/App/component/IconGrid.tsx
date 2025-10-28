import { View } from 'react-native';
import React from 'react';
import { Icon } from '@domain/App/component/Icon';
import { todayMonth, todayDay } from '@constant/Date';
import { dots } from '@constant/normal';
import { GestureDetector } from 'react-native-gesture-handler';
import { useGridSelection } from '@/shared/hooks/useGridSelection';
import { useGridGesture } from '@/shared/hooks/useGridGesture';
import { getForestIconByIndex, getOffsetByIndex } from './forestIcons';
import { Colors } from '@/shared/constant/Colors';
import { useThemeIndex } from '@store/themeStore';

interface IconGridProps {
  selectedMonth?: number;
  selectedDay?: number;
  onDateSelect: (month: number, day: number) => void;
}

export const IconGrid = React.memo(({ selectedMonth, selectedDay, onDateSelect }: IconGridProps) => {
  const themeIndex = useThemeIndex();
  const primary = (Colors as any)[`p${themeIndex}`] ?? Colors.p0;
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
        {dots.map((dot, index) => {
          const isSelected = selectedMonth === dot.month && selectedDay === dot.day;
          const isPast = dot.month < todayMonth || (dot.month === todayMonth && dot.day < todayDay);
          const IconComponent = getForestIconByIndex(index);
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
        })}
      </View>
    </GestureDetector>
  );
});
