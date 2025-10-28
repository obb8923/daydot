import { View } from 'react-native';
import React from 'react';
import { Dot } from '@domain/App/component/Dot';
import { todayMonth, todayDay } from '@constant/Date';
import { dots } from '@constant/normal';
import { GestureDetector } from 'react-native-gesture-handler';
import { useGridSelection } from '@/shared/hooks/useGridSelection';
import { useGridGesture } from '@/shared/hooks/useGridGesture';

interface DotGridProps {
  selectedMonth?: number;
  selectedDay?: number;
  onDateSelect: (month: number, day: number) => void;
}

export const DotGrid = React.memo(({ selectedMonth, selectedDay, onDateSelect }: DotGridProps) => {
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
        {dots.map((dot) => {
          const isSelected = selectedMonth === dot.month && selectedDay === dot.day;
          const isPast = dot.month < todayMonth || (dot.month === todayMonth && dot.day < todayDay);
          
          return (
            <Dot
              key={dot.key}
              item={dot}
              isSelected={isSelected}
              isPast={isPast}
              onLayout={layoutHandlers.get(dot.key)}
            />
          );
        })}
      </View>
    </GestureDetector>
  );
});
