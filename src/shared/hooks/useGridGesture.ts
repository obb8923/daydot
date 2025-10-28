import { useSharedValue } from 'react-native-reanimated';
import { Gesture } from 'react-native-gesture-handler';
import { runOnJS } from 'react-native-reanimated';
import { useHaptic } from './useHaptic';

interface UseGridGestureProps<T> {
  hitTest: (x: number, y: number) => T | null;
  onItemSelected: (item: T) => void;
  throttleMs?: number;
}

export const useGridGesture = <T,>({
  hitTest,
  onItemSelected,
  throttleMs = 250,
}: UseGridGestureProps<T>) => {
  const lastRun = useSharedValue(0);
  const { soft } = useHaptic();

  const handleHitTest = (x: number, y: number) => {
    const item = hitTest(x, y);
    if (item) {
      onItemSelected(item);
    }
  };

  const panGesture = Gesture.Pan()
    .onBegin(() => {
      runOnJS(soft)();
    })
    .onUpdate((e) => {
      const now = Date.now();
      if (now - lastRun.value > throttleMs) {
        lastRun.value = now;
        runOnJS(soft)();
        runOnJS(handleHitTest)((e as any).absoluteX, (e as any).absoluteY);
      }
    });

  return panGesture;
};
