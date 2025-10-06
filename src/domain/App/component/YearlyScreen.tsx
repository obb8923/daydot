import { View } from 'react-native';
import React, { useState, useMemo } from 'react';
import { Text } from '@component/Text';
import { Dot } from '@domain/App/component/Dot';
import { Colors } from '@/shared/constant/Colors';
import { MemoButton } from '@/domain/App/component/MemoButton';
import { currentYear, todayMonth, todayDay, getDaysLeftInYear} from '@constant/Date';
import { StorageService } from '@service/storageService';
import { MemoModal } from '@domain/App/component/MemoModal';
import {dots} from '@constant/normal';
import { HapticService } from '@service/hapticService';
import { useSelectedMonth, useSelectedDay, useSetSelectedDate } from '@store/selectedDateStore';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { runOnJS, useSharedValue } from 'react-native-reanimated';
import { useHaptic } from '@/shared/hooks/useHaptic';

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
    // 여유 패딩 허용
    const hitPadding = 8;
    let hitKey: string | null = null;
    const entries = Array.from(dotLayoutsRef.current.entries());
    console.log('dotLayouts size', entries.length);
    for (const [key, info] of entries) {
      if (info.absoluteX == null || info.absoluteY == null) continue;
      const baseX = info.absoluteX;
      const baseY = info.absoluteY;
      const withinX = x >= (baseX - hitPadding) && x <= (baseX + (info.width ?? 0) + hitPadding);
      const withinY = y >= (baseY - hitPadding) && y <= (baseY + (info.height ?? 0) + hitPadding);
      // 디버그 로그
      // console.log('withinX', withinX, 'withinY', withinY, 'baseX', baseX, 'baseY', baseY, 'info', info);
      if (withinX && withinY) { hitKey = key; break; }
    }
    if (hitKey) {
      const info = dotLayoutsRef.current.get(hitKey);
      console.log('hit info', info);
      if (info && info.month && info.day) {
        setSelectedDate(undefined, info.month, info.day);
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
      // 절대 좌표 우선, JS로 히트 테스트 위임
      const x = (e as any).absoluteX;
      const y = (e as any).absoluteY;
      console.log('pointer', { x, y });
      runOnJS(hitTestOnJS)(x, y);
    }
  });


  return (
    <View className="w-full h-full" style={{overflow: 'visible'}}>

      {/* 남은 일 수 */}
      <View className="flex-row w-full justify-center items-end my-8">
        <Text
        text={`${currentYear}년이 `}
        type="body3"
        style={{color: Colors.gray700}}
        />
        <Text
        text={`${daysLeftInYear}일`}
        type="title4"
        />
        <Text
        text={` 남았습니다.`}
        type="body3"  
        style={{color: Colors.gray700}}
        />
        </View>
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