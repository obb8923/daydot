import { View } from 'react-native';
import React, { useState, useMemo } from 'react';
import { Dot } from '@domain/App/component/Dot';
import { MemoButton } from '@domain/App/component/MemoButton';
import { todayMonth, todayDay, getDaysLeftInYear} from '@constant/Date';
import { StorageService } from '@service/storageService';
import { MemoModal } from '@domain/App/component/MemoModal';
import {dots} from '@constant/normal';
import { HapticService } from '@service/hapticService';
import { useSelectedMonth, useSelectedDay, useSetSelectedDate } from '@store/selectedDateStore';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { runOnJS, useSharedValue } from 'react-native-reanimated';
import { useHaptic } from '@/shared/hooks/useHaptic';
import { RemainingDaysHeader } from '@domain/App/component/RemainingDaysHeader';
export const YearlyScreen = () => {
  const daysLeftInYear = useMemo(() => getDaysLeftInYear(), []);
  // 선택된 날짜 상태 (store에서 가져오기)
  const selectedMonth = useSelectedMonth();
  const selectedDay = useSelectedDay();
  const setSelectedDate = useSetSelectedDate();
  const [isMemoOpen, setIsMemoOpen] = useState(false);
  const [memoText, setMemoText] = useState('');
  const { light, soft } = useHaptic();
  // Dot 레이아웃 맵: key -> {layout, meta}
  const dotLayoutsRef = React.useRef(new Map<string, { width: number; height: number; absoluteX?: number; absoluteY?: number; month?: number; day?: number }>());

  const openMemo = async () => {
    const month = selectedMonth ?? todayMonth;
    const day = selectedDay ?? todayDay;
    try {
      const existing = await StorageService.getMemoByMonthDay(month, day);
      setMemoText(existing ?? '');
      setIsMemoOpen(true);
    } finally {
    }
  };

  const saveMemo = async () => {
    const month = selectedMonth ?? todayMonth;
    const day = selectedDay ?? todayDay;
    if (!memoText.trim()) {
      // 빈 문자열이면 삭제 처리
      await StorageService.removeMemoByMonthDay(month, day);
      HapticService.soft(); // 부드러운 햅틱으로 삭제 완료 표시
      setIsMemoOpen(false);
      return;
    }
    await StorageService.setMemoByMonthDay(month, day, memoText);
    HapticService.soft(); // 부드러운 햅틱으로 저장 완료 표시
    setIsMemoOpen(false);
  };
  const lastRun = useSharedValue(0);

  // 각 Dot의 onLayout 핸들러를 안정적으로 유지하기 위한 메모이제이션
  const layoutHandlers = React.useMemo(() => {
    const map = new Map<string, (layout: { width: number; height: number; absoluteX?: number; absoluteY?: number }) => void>();
    dots.forEach((d) => {
      map.set(d.key, (layout) => {
        dotLayoutsRef.current.set(d.key, { ...layout, month: d.month, day: d.day });
      });
    });
    return map;
  }, []);

  const hitTestOnJS = (x: number, y: number) => {
    let hitKey: string | null = null; // hit 저장
    const entries = Array.from(dotLayoutsRef.current.entries()); // dots
    for (const [key, info] of entries) { // dot 정보 순회
      if (info.absoluteX == null || info.absoluteY == null || info.width == null || info.height == null) continue; // dot 정보가 없으면 스킵
      const baseX = info.absoluteX; // dot 절대 좌표
      const baseY = info.absoluteY; // dot 절대 좌표
      const withinX = x >= baseX && x <= (baseX + (info.width)); // x 좌표 범위 확인
      const withinY = y >= baseY && y <= (baseY + (info.height)); // y 좌표 범위 확인
      if (withinX && withinY) { hitKey = key; break; } // 범위 내에 있으면 저장 후 종료
    }
    if (hitKey) {
      const info = dotLayoutsRef.current.get(hitKey); // dot 정보 가져오기
      if (info && info.month && info.day) { // dot 정보가 있으면 선택
        setSelectedDate(undefined, info.month, info.day); // 선택된 날짜에 값 저장하기
      }
    }
  };

  const panGesture = Gesture.Pan()
  .onBegin((e) => {
    runOnJS(soft)();
  })
  .onUpdate((e) => {
    const now = Date.now();
    if (now - lastRun.value > 250) {
      lastRun.value = now;
      // 햅틱
      runOnJS(soft)();
      // 날짜 저장 로직
      const x = (e as any).absoluteX;
      const y = (e as any).absoluteY;
      runOnJS(hitTestOnJS)(x, y);
    }
  });


  return (
    <View className="w-full h-full" style={{overflow: 'visible'}}>

      {/* 남은 일 수 */}
      <RemainingDaysHeader value={daysLeftInYear} />
      {/* dot 그리드 */}
      <GestureDetector gesture={panGesture}>

        <View className="flex-row flex-wrap justify-center mb-8" style={{overflow: 'visible'}}>
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
          )})}
        </View>
        </GestureDetector>
        {/* 메모 버튼 */}
        <MemoButton 
        onPress={openMemo} 
        date={{
          month: selectedMonth ?? todayMonth,
          day: selectedDay ?? todayDay
        }}/>
        {/* 메모 모달 */}
      <MemoModal
        visible={isMemoOpen}
        onClose={() => setIsMemoOpen(false)}
        text={memoText}
        onChangeText={setMemoText}
        onSave={saveMemo}
        date={{
          month: selectedMonth ?? todayMonth,
          day: selectedDay ?? todayDay
        }}
      />
    </View>
  );
};